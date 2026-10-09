// supabase/functions/alerte-sms/index.ts
//
// Alertes par SMS à l'administrateur, par l'API de notification de Free Mobile (elle n'envoie qu'au
// numéro du titulaire de la ligne). Demandé : « J'ai une clé API free mobile qui pourrait m'être utile
// en tant qu'administrateur », puis « go pour 1 + 3 + 4 + 5 » : nouveaux comptes et demandes, erreurs,
// surveillance du site (workflow GitHub surveillance.yml), résumé quotidien.
//
// Secrets (Edge Functions > Secrets) : FREE_SMS_USER (identifiant Free), FREE_SMS_PASS (clé API),
// ALERTE_CLE (mot de passe partagé avec le workflow GitHub et ai-proxy). Facultatif : ALERTE_IA_SEUIL
// (appels IA payés par la clé du site dans la journée avant alerte, 300 par défaut).
// La clé Free n'est jamais dans le code du site : seule cette fonction la lit.
//
// Appels (POST, en-tête x-alerte-cle: ALERTE_CLE) :
//  - { type, message }      : envoie un SMS ; au plus un par type toutes les 30 minutes (limiteur).
//  - { action: 'veille' }   : toutes les 15 minutes (surveillance.yml) -- nouveaux comptes professeur ou
//                             parent, signalements et suggestions, devis signés depuis la dernière veille ;
//                             appels IA du jour au-delà du seuil ; à partir de 18 h (Paris), le résumé de
//                             la journée, une fois par jour.
//  - { action: 'test' }     : envoie « Alertes SMS : ça marche ».
// Les noms d'élèves ne sont jamais envoyés : seuls les comptes professeur et parent sont signalés.
//
// État (dernière veille, dernier résumé, limiteur) : table alertes_etat, lue et écrite par cette
// fonction seulement (clé de service).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
const coupe = (s: unknown, n: number) => { const t = String(s ?? "").replace(/\s+/g, " ").trim(); return t.length > n ? t.slice(0, n - 1) + "…" : t; };
const LIMITE_MIN = 30;

async function envoyerSms(message: string): Promise<{ ok: boolean; status: number }> {
  const user = Deno.env.get("FREE_SMS_USER"), pass = Deno.env.get("FREE_SMS_PASS");
  if (!user || !pass) return { ok: false, status: 0 };
  const url = "https://smsapi.free-mobile.fr/sendmsg?user=" + encodeURIComponent(user) + "&pass=" + encodeURIComponent(pass) + "&msg=" + encodeURIComponent(coupe(message, 600));
  const r = await fetch(url);
  return { ok: r.status === 200, status: r.status };
}

// Date et heure à Paris.
function paris(d = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(d).map((x) => [x.type, x.value]));
  return { jour: `${p.year}-${p.month}-${p.day}`, jourFr: `${p.day}/${p.month}`, heure: +p.hour, minute: +p.minute };
}

serve(async (req) => {
  if (req.method !== "POST") return json({ error: "POST attendu" }, 405);
  const cle = Deno.env.get("ALERTE_CLE");
  if (!cle || req.headers.get("x-alerte-cle") !== cle) return json({ error: "non autorisé" }, 401);
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const lire = async (k: string) => { const { data } = await db.from("alertes_etat").select("valeur").eq("cle", k).maybeSingle(); return data?.valeur ?? null; };
  const ecrire = (k: string, v: unknown) => db.from("alertes_etat").upsert({ cle: k, valeur: v, updated_at: new Date().toISOString() });
  // Limiteur : un SMS par type toutes les LIMITE_MIN minutes.
  const envoyer = async (type: string, message: string, sansLimite = false) => {
    if (!sansLimite) {
      const der = await lire("sms:" + type);
      if (der && Date.now() - Date.parse(String(der)) < LIMITE_MIN * 60000) return { ok: false, limite: true };
    }
    const r = await envoyerSms(message);
    if (r.ok) await ecrire("sms:" + type, new Date().toISOString());
    return r;
  };

  let body: any = {};
  try { body = await req.json(); } catch (_e) { /* corps vide */ }
  try {
    if (body.action === "test") return json(await envoyer("test", "Alertes SMS de L'Atelier : ça marche !", true));

    if (body.type && body.message) return json(await envoyer(String(body.type).slice(0, 40), "Atelier · " + String(body.message)));

    if (body.action !== "veille") return json({ error: "action inconnue" }, 400);
    const maintenant = new Date().toISOString(), envois: string[] = [];
    const depuis = await lire("veille");
    if (!depuis) { await ecrire("veille", maintenant); return json({ ok: true, premiere: true }); }

    // 1. Nouveaux comptes professeur ou parent (jamais les élèves).
    const { data: comptes } = await db.from("profiles").select("role,nom,prenom,email,uai").in("role", ["prof", "parent"]).gt("created_at", depuis).order("created_at");
    if (comptes && comptes.length) {
      const l = comptes.slice(0, 4).map((c: any) => `${c.role === "prof" ? "prof" : "parent"} ${coupe(`${c.prenom || ""} ${c.nom || ""}`, 40)}${c.email ? " (" + c.email + ")" : ""}${c.uai ? " " + c.uai : ""}`);
      const m = `Atelier · ${comptes.length} nouveau${comptes.length > 1 ? "x" : ""} compte${comptes.length > 1 ? "s" : ""} : ${l.join(" ; ")}${comptes.length > 4 ? " ; …" : ""}`;
      if ((await envoyer("comptes", m, true)).ok) envois.push("comptes");
    }
    // 2. Signalements et suggestions.
    const { data: sig } = await db.from("bug_reports").select("report_type,section,message").gt("created_at", depuis).order("created_at");
    if (sig && sig.length) {
      const l = sig.slice(0, 3).map((s: any) => `${s.report_type === "suggestion" ? "suggestion" : "bug"}${s.section ? " (" + coupe(s.section, 30) + ")" : ""} : ${coupe(s.message, 120)}`);
      if ((await envoyer("signalements", `Atelier · ${sig.length} signalement${sig.length > 1 ? "s" : ""} : ${l.join(" | ")}${sig.length > 3 ? " | …" : ""}`, true)).ok) envois.push("signalements");
    }
    // 3. Devis signés en ligne.
    const { data: signes } = await db.from("facturation_signatures").select("signataire_nom,document_id,facturation_documents(numero,client,total)").gt("signed_at", depuis);
    for (const s of (signes || []).slice(0, 3) as any[]) {
      const d = s.facturation_documents || {}, client = typeof d.client === "object" && d.client ? (d.client.nom || "") : String(d.client || "");
      if ((await envoyer("devis", `Atelier · Devis ${d.numero || ""} signé par ${coupe(s.signataire_nom, 40)}${client ? " (" + coupe(client, 50) + ")" : ""}${d.total ? " : " + d.total + " €" : ""}`, true)).ok) envois.push("devis");
    }
    await ecrire("veille", maintenant);

    // 4. Appels IA payés par la clé du site aujourd'hui.
    const P = paris(), debutJour = new Date(Date.now() - (P.heure * 60 + P.minute + 1) * 60000).toISOString(); // depuis minuit, heure de Paris
    const seuil = Number(Deno.env.get("ALERTE_IA_SEUIL") || 300);
    const { count: iaSite } = await db.from("ai_usage_log").select("id", { count: "exact", head: true }).eq("key_source", "site").gte("created_at", debutJour);
    if ((iaSite || 0) > seuil && (await lire("ia-seuil")) !== P.jour) {
      if ((await envoyer("ia-seuil", `Atelier · IA : ${iaSite} appels payés par la clé du site aujourd'hui (seuil ${seuil}). À surveiller sur console.anthropic.com.`, true)).ok) { await ecrire("ia-seuil", P.jour); envois.push("ia-seuil"); }
    }

    // 5. Résumé de la journée, à partir de 18 h, une fois.
    if (P.heure >= 18 && (await lire("resume")) !== P.jour) {
      const n = async (t: string, col: string, f?: (q: any) => any) => { let q = db.from(t).select(col, { count: "exact", head: true }).gte(col === "id" ? "created_at" : col, debutJour); if (f) q = f(q); const { count } = await q; return count || 0; };
      const [profs, eleves, sessions, rendus, copies, ia, remarques, sigNouv] = await Promise.all([
        n("profiles", "id", (q) => q.in("role", ["prof", "parent"])),
        n("profiles", "id", (q) => q.eq("role", "eleve")),
        db.from("cours_direct").select("id", { count: "exact", head: true }).gte("created_at", debutJour).then((r: any) => r.count || 0),
        db.from("devoirs_rendus").select("id", { count: "exact", head: true }).gte("submitted_at", debutJour).then((r: any) => r.count || 0),
        db.from("qz_copies").select("id", { count: "exact", head: true }).gte("submitted_at", debutJour).then((r: any) => r.count || 0),
        n("ai_usage_log", "id"),
        db.from("relecture_exercices").select("cle", { count: "exact", head: true }).eq("statut", "com").then((r: any) => r.count || 0),
        db.from("bug_reports").select("id", { count: "exact", head: true }).eq("status", "nouveau").then((r: any) => r.count || 0),
      ]);
      const m = `Atelier · Journée du ${P.jourFr} : ${profs} nouveau(x) compte(s) prof/parent, ${eleves} élève(s) créé(s) ; ${sessions} session(s) COURS ; ${rendus} devoir(s) et ${copies} interrogation(s) rendus ; ${ia} appel(s) IA (${iaSite || 0} sur la clé du site). À traiter : ${sigNouv} signalement(s) nouveau(x), ${remarques} remarque(s) de relecture.`;
      if ((await envoyer("resume", m, true)).ok) { await ecrire("resume", P.jour); envois.push("resume"); }
    }
    return json({ ok: true, envois });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
