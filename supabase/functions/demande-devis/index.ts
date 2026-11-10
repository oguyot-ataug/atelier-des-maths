// supabase/functions/demande-devis/index.ts
//
// Formulaire « Demander un devis » de la page des tarifs (demandé le 10/11/2026 : « Demander un devis doit faire apparaître un
// formulaire simple à remplir (profs seul, établissement, famille, profs particuliers...) et s'adapter en fonction »).
// Reçoit la demande (sans compte : verify_jwt non), la vérifie, la range dans demandes_devis et l'envoie à
// contact@latelierdesmaths.fr (réponse directe au demandeur : reply_to) ; SMS à l'administrateur pour un établissement.
// Aucun e-mail n'est envoyé au demandeur (un robot pourrait sinon faire écrire le site à n'importe qui) : la page affiche la
// confirmation. Garde-fous contre les robots (spams reçus le 10/11/2026 sur un autre formulaire) : champ piège invisible,
// délai minimal de remplissage, pas de lien dans le message, 3 demandes par heure et par adresse IP (empreinte SHA-256),
// 40 par jour en tout.
//
// Secrets : SUPABASE_*, RESEND_API_KEY, ALERTE_CLE (SMS, facultatif).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const ADMIN_EMAIL = "contact@latelierdesmaths.fr";
const PROFILS: Record<string, string> = { seul: "Professeur de collège", ecole: "Professeur des écoles", particulier: "Professeur particulier", etablissement: "Établissement", famille: "Famille" };
const NIVEAUX = ["cm1", "cm2", "6e", "5e", "4e", "3e"];
const COLLEGE = ["6e", "5e", "4e", "3e"];
const lib = (n: string) => /^cm/.test(n) ? n.toUpperCase() : n;
const coupe = (s: unknown, n: number) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const entier = (v: unknown, max: number) => Math.max(0, Math.min(max, parseInt(String(v ?? ""), 10) || 0));
const eur = (c: number) => (c / 100).toLocaleString("fr-FR", { minimumFractionDigits: c % 100 ? 2 : 0, maximumFractionDigits: 2 }) + " €";

async function envoiResend(init: RequestInit): Promise<Response> {
  const res = await fetch("https://api.resend.com/emails", init);
  if (res.ok || ![403, 422].includes(res.status)) return res;
  const err = await res.clone().text();
  if (!/domain/i.test(err)) return res;
  console.warn("Resend : domaine latelierdesmaths.fr refusé, repli sur latelieraugmente.fr", err);
  return fetch("https://api.resend.com/emails", { ...init, body: String(init.body).replace(/@latelierdesmaths\.fr>/g, "@latelieraugmente.fr>") });
}
async function sha256(s: string): Promise<string> {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Estimation indicative, mêmes règles que la page des tarifs (prix professeur lus dans prof_parametres).
function estimer(profil: string, d: any, P: Record<string, number>): number {
  if (profil === "seul") {
    const n = (d.niveaux || []).filter((x: string) => COLLEGE.includes(x)).length;
    if (!n) return 0;
    const base = Math.min(P.seul_base + P.seul_niveau * (n - 1), P.seul_plafond || Infinity);
    return base + P.seul_classe * Math.max(0, (d.classes || 0) - (P.seul_classes || 6));
  }
  if (profil === "ecole") return P.ecole_base + P.ecole_classe * Math.max(0, (d.classes || 1) - 1);
  if (profil === "particulier") return d.eleves ? P.part_base + P.part_eleve * d.eleves : 0;
  if (profil === "famille") {
    const c = (d.niveaux || []).filter((x: string) => COLLEGE.includes(x)).length, e = (d.niveaux || []).filter((x: string) => !COLLEGE.includes(x)).length;
    return (c >= 3 ? 6900 : c === 2 ? 5500 : c === 1 ? 3500 : 0) + (e >= 2 ? 3900 : e === 1 ? 2500 : 0);
  }
  if (profil === "etablissement") {
    const eff = d.effectifs || {};
    const nc = COLLEGE.filter((n) => eff[n] > 0), ec = ["cm1", "cm2"].filter((n) => eff[n] > 0);
    const pu = nc.length >= 4 ? 300 : nc.length >= 2 ? 350 : 400;
    return nc.reduce((s, n) => s + eff[n] * pu, 0) + ec.reduce((s, n) => s + eff[n] * 250, 0);
  }
  return 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Méthode non permise." }, 405);
  try {
    const b = await req.json().catch(() => ({}));
    // Robots : champ piège rempli, ou formulaire envoyé trop vite. Réponse « ok » pour ne rien leur apprendre.
    if (coupe(b.site_web, 200) || (Number(b.duree_ms) || 0) < 4000) return json({ ok: true });

    const profil = String(b.profil || "");
    if (!PROFILS[profil]) return json({ error: "Choisissez votre profil." }, 400);
    const nom = coupe(b.nom, 80), email = coupe(b.email, 120).toLowerCase(), message = String(b.message ?? "").trim().slice(0, 1500);
    if (nom.length < 2) return json({ error: "Indiquez votre nom." }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return json({ error: "Adresse e-mail invalide." }, 400);
    if (/https?:\/\/|www\.|\[url|<a\s/i.test(message + " " + nom)) return json({ error: "Les liens ne sont pas acceptés dans le message : décrivez simplement votre besoin." }, 400);

    const niveaux = (Array.isArray(b.niveaux) ? b.niveaux : []).map((x: unknown) => String(x).toLowerCase()).filter((x: string) => NIVEAUX.includes(x));
    const d: any = {};
    if (profil === "seul") { d.niveaux = niveaux.filter((x: string) => COLLEGE.includes(x)); d.classes = entier(b.classes, 30); d.etablissement = coupe(b.etablissement, 120);
      if (!d.niveaux.length) return json({ error: "Cochez au moins un niveau." }, 400); }
    if (profil === "ecole") { d.classes = Math.max(1, entier(b.classes, 20)); d.etablissement = coupe(b.etablissement, 120); }
    if (profil === "particulier") { d.eleves = entier(b.eleves, 200); if (!d.eleves) return json({ error: "Indiquez le nombre d'élèves." }, 400); }
    if (profil === "famille") { d.niveaux = niveaux; d.enfants = Math.max(1, entier(b.enfants, 4)); if (!niveaux.length) return json({ error: "Cochez au moins un niveau." }, 400); }
    if (profil === "etablissement") {
      d.etablissement = coupe(b.etablissement, 120); d.commune = coupe(b.commune, 80); d.statut = b.statut === "prive" ? "prive" : "public";
      d.uai = coupe(b.uai, 8).toUpperCase(); d.fonction = coupe(b.fonction, 60); d.telephone = coupe(b.telephone, 20);
      d.effectifs = {}; NIVEAUX.forEach((n) => { const v = entier(b.effectifs?.[n], 2000); if (v) d.effectifs[n] = v; });
      if (d.etablissement.length < 3) return json({ error: "Indiquez le nom de l'établissement." }, 400);
      if (d.uai && !/^\d{7}[A-Z]$/.test(d.uai)) return json({ error: "Le numéro UAI compte 7 chiffres et une lettre (ex. 0751234A)." }, 400);
      if (!Object.keys(d.effectifs).length) return json({ error: "Indiquez l'effectif d'au moins un niveau." }, 400);
    }

    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const ip = (req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "").split(",")[0].trim();
    const ipHash = ip ? await sha256("devis|" + ip) : null;
    const heure = new Date(Date.now() - 3600e3).toISOString(), jour = new Date(Date.now() - 86400e3).toISOString();
    if (ipHash) {
      const { count } = await db.from("demandes_devis").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", heure);
      if ((count || 0) >= 3) return json({ error: "Plusieurs demandes viennent d'être envoyées : réessayez dans une heure, ou écrivez à contact@latelierdesmaths.fr." }, 429);
    }
    const { count: total } = await db.from("demandes_devis").select("id", { count: "exact", head: true }).gte("created_at", jour);
    if ((total || 0) >= 40) return json({ error: "Le formulaire est momentanément saturé : écrivez à contact@latelierdesmaths.fr." }, 429);

    const { data: param } = await db.from("prof_parametres").select("prix").eq("id", 1).maybeSingle();
    const P = Object.assign({ seul_base: 3900, seul_niveau: 1500, seul_plafond: 6900, seul_classes: 6, seul_classe: 1000, ecole_base: 2900, ecole_classe: 1000, part_base: 3900, part_eleve: 2000 }, param?.prix || {});
    const estimation = estimer(profil, d, P);
    const { error } = await db.from("demandes_devis").insert({ profil, nom, email, details: d, estimation_centimes: estimation || null, message: message || null, ip_hash: ipHash });
    if (error) return json({ error: "La demande n'a pas pu être enregistrée. Écrivez à contact@latelierdesmaths.fr." }, 500);

    // E-mail à l'administrateur : « Répondre » écrit directement au demandeur.
    const lignes: [string, string][] = [["Profil", PROFILS[profil]], ["Nom", nom], ["E-mail", email]];
    if (d.etablissement) lignes.push(["Établissement", d.etablissement + (d.commune ? " (" + d.commune + ")" : "")]);
    if (profil === "etablissement") { lignes.push(["Statut", d.statut === "prive" ? "Privé" : "Public"]); if (d.uai) lignes.push(["UAI", d.uai]); if (d.fonction) lignes.push(["Fonction", d.fonction]); if (d.telephone) lignes.push(["Téléphone", d.telephone]);
      lignes.push(["Effectifs", Object.entries(d.effectifs).map(([n, v]) => lib(n) + " : " + v).join(" · ")]); }
    if (d.niveaux) lignes.push(["Niveaux", d.niveaux.map(lib).join(", ")]);
    if (d.classes) lignes.push(["Classes", String(d.classes)]);
    if (d.eleves) lignes.push(["Élèves", String(d.eleves)]);
    if (d.enfants) lignes.push(["Enfants", String(d.enfants)]);
    if (estimation) lignes.push(["Estimation affichée", eur(estimation) + " par an"]);
    const titre = profil === "etablissement" ? d.etablissement : nom;
    const html = `<div style="font-family:Arial,sans-serif;color:#1C1B2E;max-width:600px;">
      <div style="background:#0C5BA0;color:#fff;padding:16px 20px;border-radius:10px 10px 0 0;"><div style="font-size:13px;opacity:.85;">latelierdesmaths.fr · page des tarifs</div>
      <div style="font-size:20px;font-weight:bold;">Demande de devis : ${esc(PROFILS[profil])}</div></div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E3E7EE;border-top:0;">${lignes.map(([k, v]) => `<tr><td style="padding:8px 14px;color:#5B6472;width:150px;border-bottom:1px solid #F0F2F6;">${esc(k)}</td><td style="padding:8px 14px;border-bottom:1px solid #F0F2F6;"><b>${esc(v)}</b></td></tr>`).join("")}</table>
      ${message ? `<div style="margin:14px 0;padding:12px 14px;background:#FFF6EC;border-left:4px solid #F29A1F;border-radius:6px;white-space:pre-wrap;">${esc(message)}</div>` : ""}
      <p style="font-size:13px;color:#5B6472;">Pour répondre, cliquez sur « Répondre » : le message partira vers ${esc(email)}.</p></div>`;
    const texte = lignes.map(([k, v]) => k + " : " + v).join("\n") + (message ? "\n\n" + message : "");
    const key = Deno.env.get("RESEND_API_KEY");
    if (key) {
      try {
        await envoiResend({ method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
          body: JSON.stringify({ from: "L'Atelier des Maths <contact@latelierdesmaths.fr>", to: [ADMIN_EMAIL], reply_to: email,
            subject: "Demande de devis – " + PROFILS[profil] + " – " + titre, html, text: texte }) });
      } catch (e) { console.error("Resend", String(e)); }
    }
    if (profil === "etablissement") {
      const cle = Deno.env.get("ALERTE_CLE");
      if (cle) {
        try {
          await fetch(Deno.env.get("SUPABASE_URL") + "/functions/v1/alerte-sms", { method: "POST", headers: { "Content-Type": "application/json", "x-alerte-cle": cle },
            body: JSON.stringify({ type: "devis", message: "Demande de devis : " + d.etablissement + (d.uai ? " (" + d.uai + ")" : "") + (estimation ? ", environ " + eur(estimation) : ""), sans_limite: true }) });
        } catch (_e) { /* la demande reste enregistrée et envoyée par e-mail */ }
      }
    }
    return json({ ok: true, estimation });
  } catch (e) {
    console.error(String(e));
    return json({ error: "Erreur inattendue. Écrivez à contact@latelierdesmaths.fr." }, 500);
  }
});
