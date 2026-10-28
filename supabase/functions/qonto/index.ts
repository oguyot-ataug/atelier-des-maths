// supabase/functions/qonto/index.ts
//
// Facturation électronique par Qonto (plateforme agréée) -- demandé : « je suis chez Qonto, je prends
// Qonto. Vois s'il y a une API », puis « d'accord pour A et B, vas-y » (27/10/2026) :
//   A. la facture créée dans Qonto (Factur-X) est la pièce officielle ; le PDF du site en est la copie
//      à l'identique (même numéro, mêmes dates, mêmes lignes, même total) ;
//   B. pas d'essai à blanc : la première facture envoyée est une vraie facture (le bac à sable de Qonto
//      ne gère pas la facturation électronique).
//
// Actions (administrateur uniquement, jeton de session) :
//   etat    : vérifie la connexion (organisation, comptes, réglages de facturation électronique).
//   envoyer : { document_id } facture d'un établissement privé → client Qonto (retrouvé par SIRET ou
//             créé), facture brouillon portant NOTRE numéro, finalisation, puis envoi par le réseau de
//             facturation électronique si le client y est joignable. Reprend là où un essai précédent
//             s'est arrêté (brouillon déjà créé, finalisation déjà faite).
//   suivre  : { document_id } relit la facture dans Qonto : statut, cycle de vie (déposée, émise,
//             reçue, refusée…), lien vers la page publique de la facture.
// Secrets : QONTO_LOGIN et QONTO_SECRET_KEY (Qonto › Intégrations et partenariats › Clé API),
// enregistrés dans Supabase › Edge Functions › Secrets, jamais dans le code.
// verify_jwt = false comme devis-signature : l'appel vérifie lui-même que l'utilisateur est administrateur.

import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const API = "https://thirdparty.qonto.com/v2";
// Cycle de vie de la facture électronique (codes de la plateforme, doc « Retrieve a client invoice »).
const CYCLE: Record<number, string> = {
  200: "Déposée", 201: "Émise par la plateforme", 202: "Reçue par la plateforme du client", 203: "Mise à disposition du client",
  204: "Prise en charge", 205: "Approuvée", 206: "Approuvée partiellement", 207: "En litige", 208: "Suspendue",
  209: "Complétée", 210: "Refusée", 211: "Paiement transmis", 212: "Encaissée", 213: "Rejetée", 214: "Visée",
};

function serviceKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { return JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}")["default"]; } catch { return ""; }
}
const admin = () => createClient(Deno.env.get("SUPABASE_URL")!, serviceKey(), { auth: { persistSession: false } });

class QontoErreur extends Error { constructor(m: string, public status = 0) { super(m); } }
async function qonto(method: string, chemin: string, body?: unknown) {
  const login = Deno.env.get("QONTO_LOGIN"), cle = Deno.env.get("QONTO_SECRET_KEY");
  if (!login || !cle) throw new QontoErreur("Secrets QONTO_LOGIN et QONTO_SECRET_KEY non configurés dans Supabase.");
  const r = await fetch(API + chemin, {
    method,
    // Pas de Basic : « login:clé » tel quel (doc Qonto « API key »).
    headers: { Authorization: `${login}:${cle}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const txt = await r.text();
  let data: any = null; try { data = txt ? JSON.parse(txt) : null; } catch { data = null; }
  if (!r.ok) {
    const det = (data?.errors || []).map((e: any) => [e.detail || e.code, e.source?.pointer].filter(Boolean).join(" ")).join(" ; ");
    const sens: Record<number, string> = {
      401: "clé API refusée (vérifiez QONTO_LOGIN et QONTO_SECRET_KEY)",
      403: "Qonto refuse l'opération (facturation électronique non activée, SIREN absent de l'annuaire ou vérification du compte incomplète)",
    };
    throw new QontoErreur(`Qonto ${r.status} : ${sens[r.status] ? sens[r.status] + (det ? " – " + det : "") : det || txt.slice(0, 300) || "erreur"}`, r.status);
  }
  return data;
}

const chiffres = (s: unknown) => String(s ?? "").replace(/\D/g, "");
const ibanNet = (s: unknown) => String(s ?? "").replace(/\s+/g, "").toUpperCase();
const montant = (n: number) => (Math.round(Number(n) * 100) / 100).toFixed(2);
const coupe = (s: string, n: number) => s.length <= n ? s : s.slice(0, n - 1).trimEnd() + "…";

// Adresse saisie en texte libre (« 12 rue …\n54000 Nancy ») → adresse de facturation Qonto.
function adresseQonto(txt: string) {
  const lignes = String(txt || "").split(/\n|,(?=\s*\d{5}\s)/).map((l) => l.trim()).filter(Boolean);
  const k = lignes.findLastIndex((l) => /\b\d{5}\b\s+\S/.test(l));
  if (k < 0) return null;
  const m = lignes[k].match(/^(.*?)\s*\b(\d{5})\b\s+(.+)$/)!;
  const rue = [...lignes.slice(0, k), m[1]].map((l) => l.replace(/,\s*$/, "")).filter(Boolean).join(", ");
  if (!rue) return null;
  return { street_address: coupe(rue, 250), zip_code: m[2], city: coupe(m[3], 50), country_code: "FR" };
}

// Lignes du site → lignes Qonto (TVA 0 %, franchise en base art. 293 B). Les lignes négatives (remise
// « établissement pilote »…) deviennent une remise globale : Qonto n'accepte pas de prix unitaire négatif.
function lignesQonto(lignes: any[]) {
  const items: any[] = [], remises: any[] = [];
  for (const l of lignes || []) {
    const pu = Number(l.pu) || 0, qte = Number(l.qte) || 0;
    if (pu < 0 || qte < 0) { remises.push(l); continue; }
    const des = String(l.designation || "").trim();
    // Titre limité à 40 caractères : « Licence 2026-2027 – niveau 6e », la désignation complète en description.
    const lic = des.match(/^Licence établissement L'Atelier des Maths (\S+) – (niveau .+)$/);
    const titre = lic ? `Licence ${lic[1]} – ${lic[2]}` : des;
    const desc = [titre.length > 40 || titre !== des ? des : "", String(l.detail || "").trim()].filter(Boolean).join("\n");
    items.push({
      title: coupe(titre, 40), ...(desc ? { description: coupe(desc, 1800) } : {}),
      quantity: String(qte), ...(l.unite ? { unit: coupe(String(l.unite), 20) } : {}),
      unit_price: { value: montant(pu), currency: "EUR" }, vat_rate: "0", vat_exemption_reason: "S293B",
    });
  }
  const remise = remises.reduce((t, l) => t + Math.abs(Math.round(Number(l.qte) * Number(l.pu) * 100) / 100), 0);
  return { items, remise, remisesTxt: remises.map((l) => `${l.designation} : −${montant(Math.abs(Number(l.qte) * Number(l.pu))).replace(".", ",")} €`).join(" ; ") };
}

async function clientQonto(cli: any) {
  const siret = chiffres(cli.siret);
  if (siret.length !== 14) throw new QontoErreur("SIRET de l'organisme de gestion manquant ou invalide (14 chiffres) : complétez la fiche de l'établissement puis émettez une facture corrigée.");
  const trouve = await qonto("GET", `/clients?filter[tax_identification_number]=${siret}&per_page=10`);
  if (trouve?.clients?.length) return trouve.clients[0];
  const adr = adresseQonto(cli.adresse);
  if (!adr) throw new QontoErreur("Adresse de l'établissement illisible : il faut une ligne « code postal + ville » (ex. 54000 Nancy).");
  const base = {
    kind: "company", name: coupe(String(cli.organisme || cli.nom || "").trim(), 250), currency: "EUR", locale: "fr",
    tax_identification_number: siret, billing_address: adr, ...(cli.email ? { email: cli.email } : {}),
  };
  try {
    // Adresse de facturation électronique : le SIREN (adresse principale de l'annuaire).
    return (await qonto("POST", "/clients", { ...base, e_invoicing_address: siret.slice(0, 9) })).client;
  } catch (e) {
    // SIREN pas (encore) dans l'annuaire : client créé sans adresse électronique (facture envoyée par e-mail).
    if ((e as QontoErreur).status !== 422 && (e as QontoErreur).status !== 400) throw e;
    return (await qonto("POST", "/clients", base)).client;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const user = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: isAdmin } = await user.rpc("is_admin");
    if (!isAdmin) return json({ error: "Réservé à l'administrateur." }, 403);
    const body = await req.json().catch(() => ({}));
    const db = admin();

    /* ---------- Test de la connexion ---------- */
    if (body.action === "etat") {
      const [org, reg, em] = await Promise.all([
        qonto("GET", "/organization"),
        qonto("GET", "/einvoicing/settings").catch((e) => ({ erreur: (e as Error).message })),
        db.from("facturation_emetteur").select("iban").eq("id", 1).maybeSingle(),
      ]);
      const o = org?.organization || {};
      const comptes = (o.bank_accounts || []).map((b: any) => ({ nom: b.name, iban: b.iban, principal: !!b.main }));
      return json({
        ok: true, organisation: o.legal_name || o.name || o.slug, comptes,
        iban_site_qonto: comptes.some((c: any) => ibanNet(c.iban) === ibanNet(em.data?.iban)),
        envoi: reg?.sending_status || null, reception: reg?.receiving_status || null, reglages_erreur: reg?.erreur || null,
      });
    }

    const { data: d } = await db.from("facturation_documents").select("*").eq("id", body.document_id).maybeSingle();
    if (!d) return json({ error: "Document introuvable." }, 404);
    const maj = async (champs: Record<string, unknown>) => { await db.from("facturation_documents").update(champs).eq("id", d.id); Object.assign(d, champs); };

    /* ---------- Envoi d'une facture ---------- */
    if (body.action === "envoyer") {
      const cli = d.client || {}, em = d.emetteur || {};
      if (d.type !== "facture") return json({ error: "Seules les factures passent par Qonto." }, 400);
      if (d.test) return json({ error: "Facture de test : jamais envoyée à Qonto." }, 400);
      if (cli.statut !== "prive") return json({ error: "Établissement public : la facture se dépose sur Chorus Pro." }, 400);
      if (d.statut === "annule") return json({ error: "Facture annulée par un avoir." }, 400);
      if (["envoyee", "email"].includes(d.qonto_statut) || /^\d{3}$/.test(d.qonto_statut || "")) return json({ error: "Facture déjà transmise par Qonto." }, 400);
      try {
        const client = await clientQonto(cli);
        let inv: any = null;
        if (!d.qonto_id) {
          const org = (await qonto("GET", "/organization"))?.organization || {};
          const comptes = (org.bank_accounts || []).filter((b: any) => b.iban);
          const compte = comptes.find((b: any) => ibanNet(b.iban) === ibanNet(em.iban));
          // A : la copie du site doit montrer le même IBAN que la facture Qonto.
          if (!compte) throw new QontoErreur(`L'IBAN imprimé sur la facture (${em.iban || "vide"}) n'est pas un compte Qonto. Comptes Qonto : ${comptes.map((b: any) => b.iban).join(", ") || "aucun"}.`);
          const { items, remise, remisesTxt } = lignesQonto(d.lignes);
          if (!items.length) throw new QontoErreur("Aucune ligne facturable.");
          const objet = `L'Atelier des Maths (latelierdesmaths.fr) – licence établissement`
            + (d.periode_debut && d.periode_fin ? `, du ${fr(d.periode_debut)} au ${fr(d.periode_fin)}` : "")
            + (cli.organisme && cli.nom ? ` – pour ${cli.nom}` : "") + (cli.uai ? ` (UAI ${cli.uai})` : "");
          const conditions = [
            "Paiement par virement en indiquant la référence " + d.numero + ".",
            "En cas de retard de paiement : pénalités au taux de trois fois le taux d'intérêt légal et indemnité forfaitaire pour frais de recouvrement de 40 € (art. L441-10 du code de commerce). Pas d'escompte pour paiement anticipé.",
            em.mention_tva || "TVA non applicable, art. 293 B du CGI.",
          ].join("\n");
          const notes = [remisesTxt, d.notes].filter(Boolean).join("\n");
          const payload: Record<string, unknown> = {
            client_id: client.id, status: "draft", number: coupe(d.numero, 40),
            issue_date: d.date_emission, due_date: d.date_echeance || d.date_emission, currency: "EUR",
            ...(d.periode_debut && d.periode_fin ? { performance_start_date: d.periode_debut, performance_end_date: d.periode_fin } : {}),
            ...(d.numero_engagement ? { purchase_order: coupe(String(d.numero_engagement), 40) } : {}),
            header: coupe("Objet : " + objet, 500), terms_and_conditions: coupe(conditions, 525),
            ...(notes ? { footer: coupe(notes, 500) } : {}),
            payment_methods: { iban: ibanNet(compte.iban) }, items,
            ...(remise > 0 ? { discount: { type: "absolute", value: montant(remise) } } : {}),
          };
          inv = (await qonto("POST", "/client_invoices", payload)).client_invoice;
          await maj({ qonto_id: inv.id, qonto_statut: "brouillon", qonto_erreur: null });
          // Garde-fou A : le total calculé par Qonto doit être celui de la facture du site.
          const tq = Number(inv?.total_amount?.value ?? inv?.amount?.value ?? NaN);
          if (isFinite(tq) && Math.abs(tq - Number(d.total)) > 0.005) {
            await qonto("DELETE", `/client_invoices/${inv.id}`).catch(() => {});
            await maj({ qonto_id: null, qonto_statut: null });
            throw new QontoErreur(`Total différent dans Qonto (${montant(tq)} € au lieu de ${montant(d.total)} €) : brouillon supprimé, rien n'a été émis.`);
          }
        }
        if (d.qonto_statut === "brouillon") {
          inv = (await qonto("POST", `/client_invoices/${d.qonto_id}/finalize`)).client_invoice;
          await maj({ qonto_statut: "finalisee", qonto_erreur: null });
        }
        // Envoi par le réseau de facturation électronique (sinon : à envoyer par e-mail depuis Qonto).
        if (client.e_invoicing_reachable) {
          await qonto("POST", `/client_invoices/${d.qonto_id}/send_by_einvoice`);
          await maj({ qonto_statut: "envoyee", qonto_envoye_at: new Date().toISOString(), qonto_erreur: null });
        }
        return json({ ok: true, statut: d.qonto_statut, joignable: !!client.e_invoicing_reachable, invoice_url: inv?.invoice_url || null });
      } catch (e) {
        await maj({ qonto_erreur: String((e as Error).message).slice(0, 1000) });
        throw e;
      }
    }

    /* ---------- Suivi ---------- */
    if (body.action === "suivre") {
      if (!d.qonto_id) return json({ error: "Facture pas encore créée dans Qonto." }, 400);
      const inv = (await qonto("GET", `/client_invoices/${d.qonto_id}`)).client_invoice || {};
      const ev = (inv.einvoicing_lifecycle_events || []).slice().sort((a: any, b: any) => String(a.timestamp).localeCompare(String(b.timestamp)));
      const evenements = ev.map((x: any) => ({ code: x.status_code, libelle: CYCLE[x.status_code] || String(x.status_code), date: x.timestamp, motif: [x.reason, x.reason_message].filter(Boolean).join(" – ") }));
      if (ev.length) await maj({ qonto_statut: String(ev[ev.length - 1].status_code) });
      else if (inv.status && inv.status !== "draft" && d.qonto_statut === "brouillon") await maj({ qonto_statut: "finalisee" });
      return json({ ok: true, statut: d.qonto_statut, qonto: inv.status, invoice_url: inv.invoice_url || null, evenements });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});

function fr(d: string) { const [y, m, j] = String(d).split("-"); return `${j}/${m}/${y}`; }
