// supabase/functions/devis-signature/index.ts
//
// Signature en ligne des devis (signature électronique simple : lien personnel + code à
// 6 chiffres envoyé par e-mail à l'adresse de l'établissement).
//
//   send  (administrateur, jeton de session) : crée un lien de signature et l'envoie par e-mail.
//   view  (public, jeton du lien)            : contenu du devis à afficher sur la page de signature.
//   code  (public, jeton du lien)            : envoie un code à 6 chiffres (15 min, 5 envois par lien).
//   sign  (public, jeton du lien + code)     : vérifie le code (5 essais), enregistre la preuve
//                                              (nom, qualité, date, IP, navigateur, empreinte du devis),
//                                              passe le devis en « Commande reçue » et ouvre la licence.
//
// Le jeton du lien n'est jamais stocké en clair (empreinte SHA-256), le code non plus.
// Secrets : RESEND_API_KEY ; SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY (fournis).
// verify_jwt = false : la page publique de signature l'appelle sans compte ; l'action
// « send » vérifie elle-même que l'appelant est administrateur.

import { createClient } from "npm:@supabase/supabase-js@2";

// Envoi Resend : expéditeur en @latelierdesmaths.fr (demandé le 31/10/2026 : « Tout ce qui concerne l'atelier des maths doit
// avoir comme domaine latelierdesmaths.fr, y compris mailing »). Tant que ce domaine n'est pas vérifié chez Resend, l'envoi
// est refusé : on renvoie alors depuis l'ancien domaine, pour ne perdre aucun e-mail.
async function envoiResend(init: RequestInit): Promise<Response> {
  const res = await fetch("https://api.resend.com/emails", init);
  if (res.ok || ![403, 422].includes(res.status)) return res;
  const err = await res.clone().text();
  if (!/domain/i.test(err)) return res;
  console.warn("Resend : domaine latelierdesmaths.fr refusé, repli sur latelieraugmente.fr", err);
  return fetch("https://api.resend.com/emails", { ...init, body: String(init.body).replace(/@latelierdesmaths\.fr>/g, "@latelieraugmente.fr>") });
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const SITE = "https://latelierdesmaths.fr";
const FROM = "L'Atelier des Maths <devis@latelierdesmaths.fr>";
const CODE_TTL_MIN = 15, MAX_CODE_SENDS = 5, MAX_ATTEMPTS = 5;

function serviceKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { return JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}")["default"]; } catch { return ""; }
}
const admin = () => createClient(Deno.env.get("SUPABASE_URL")!, serviceKey(), { auth: { persistSession: false } });

async function sha256(s: string): Promise<string> {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function randomToken(): string {
  const a = new Uint8Array(32); crypto.getRandomValues(a);
  return btoa(String.fromCharCode(...a)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function randomCode(): string {
  const a = new Uint32Array(1); crypto.getRandomValues(a);
  return String(a[0] % 1000000).padStart(6, "0");
}
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n: number) => (Number(n) || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const frDate = (d: string | null) => d ? new Date(d + (d.length === 10 ? "T00:00:00" : "")).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" }) : "";
const frDateTime = (d: string) => new Date(d).toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "long", timeStyle: "short" });
function maskEmail(e: string) {
  const [u, d] = e.split("@"); if (!d) return e;
  return (u.length <= 2 ? u[0] + "…" : u.slice(0, 2) + "…" + u.slice(-1)) + "@" + d;
}

async function sendMail(to: string, subject: string, text: string, html: string, replyTo: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY non configurée.");
  const res = await envoiResend({
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text, html, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Envoi de l'e-mail impossible (${res.status}) : ${await res.text()}`);
}
function mailHtml(title: string, paragraphs: string[], button?: { href: string; label: string }) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#1c2330;max-width:560px;margin:0 auto;line-height:1.5;">
    <div style="border-bottom:3px solid #0C5BA0;padding:0 0 10px;margin-bottom:16px;font-weight:bold;color:#0C5BA0;font-size:18px;">L'Atelier des Maths</div>
    <h2 style="font-size:18px;margin:0 0 12px;">${title}</h2>
    ${paragraphs.map((p) => `<p style="margin:0 0 12px;">${p}</p>`).join("")}
    ${button ? `<p style="margin:20px 0;"><a href="${button.href}" style="background:#0C5BA0;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold;display:inline-block;">${button.label}</a></p>` : ""}
    <p style="font-size:12px;color:#6b7482;margin-top:24px;border-top:1px solid #e3e7ec;padding-top:10px;">L'Atelier des Maths · latelierdesmaths.fr · une production de L'Atelier Augmenté</p>
  </div>`;
}

async function docHash(d: Record<string, unknown>) {
  return await sha256(JSON.stringify({ numero: d.numero, date_emission: d.date_emission, total: d.total, lignes: d.lignes, client: d.client, emetteur: d.emetteur }));
}
function publicDoc(d: any) {
  const em = d.emetteur || {}, cl = d.client || {};
  return {
    numero: d.numero, date_emission: d.date_emission, date_validite: d.date_validite, periode_debut: d.periode_debut, periode_fin: d.periode_fin,
    niveaux: d.niveaux, lignes: d.lignes, total: d.total, notes: d.notes, statut: d.statut, signature: d.signature,
    client: { nom: cl.nom, organisme: cl.organisme, adresse: cl.adresse, statut: cl.statut, uai: cl.uai, siret: cl.siret },
    emetteur: { nom: em.nom, enseigne: em.enseigne, adresse: em.adresse, siret: em.siret, rcs: em.rcs, email: em.email, telephone: em.telephone,
      mention_tva: em.mention_tva, iban: em.iban, bic: em.bic, delai_paiement_jours: em.delai_paiement_jours },
  };
}
async function loadByToken(db: any, token: string) {
  if (!token || token.length < 30) return null;
  const { data: sig } = await db.from("facturation_signatures").select("*").eq("token_hash", await sha256(token)).maybeSingle();
  if (!sig) return null;
  const { data: doc } = await db.from("facturation_documents").select("*").eq("id", sig.document_id).single();
  return doc ? { sig, doc } : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action;
    const db = admin();

    /* ---------- Envoi du lien (administrateur) ---------- */
    if (action === "send") {
      const user = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
      });
      const { data: isAdmin } = await user.rpc("is_admin");
      if (!isAdmin) return json({ error: "Réservé à l'administrateur." }, 403);
      const email = String(body.email || "").trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Adresse e-mail invalide." }, 400);
      const { data: doc } = await db.from("facturation_documents").select("*").eq("id", body.document_id).single();
      if (!doc || doc.type !== "devis") return json({ error: "Devis introuvable." }, 404);
      if (doc.statut !== "emis") return json({ error: "Ce devis n'est plus en attente (déjà accepté, refusé ou annulé)." }, 400);
      const today = new Date().toISOString().slice(0, 10);
      if (doc.date_validite && doc.date_validite < today) return json({ error: "Ce devis a dépassé sa date de validité : émettez-en un nouveau." }, 400);
      // Un seul lien actif par devis : les précédents non signés sont révoqués.
      await db.from("facturation_signatures").update({ revoked: true }).eq("document_id", doc.id).is("signed_at", null);
      const token = randomToken();
      const expires = doc.date_validite ? new Date(doc.date_validite + "T23:59:59+01:00") : new Date(Date.now() + 30 * 864e5);
      const jwt = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
      const { data: me } = await user.auth.getUser(jwt);
      const { error: e2 } = await db.from("facturation_signatures").insert({
        document_id: doc.id, token_hash: await sha256(token), email, expires_at: expires.toISOString(), created_by: me?.user?.id ?? null,
        revoked: false, code_sends: 0, code_attempts: 0,
      });
      if (e2) throw e2;
      const link = `${SITE}/signature/?t=${token}`;
      const em = doc.emetteur || {}, cl = doc.client || {};
      const dest = cl.statut === "prive" && cl.organisme ? `${cl.organisme} (${cl.nom})` : cl.nom;
      const text = `Bonjour,\n\nVoici le devis ${doc.numero} de L'Atelier des Maths pour ${dest}, d'un montant de ${money(doc.total)}, valable jusqu'au ${frDate(doc.date_validite)}.\n\nPour le consulter et le signer en ligne : ${link}\n\nLa signature se fait en deux minutes : vous indiquez votre nom et votre qualité, puis vous recevez à cette adresse un code à 6 chiffres qui valide la signature.\n\nPour toute question, répondez simplement à cet e-mail.\n\n${em.nom || ""}\nL'Atelier des Maths`;
      const html = mailHtml(`Devis ${esc(doc.numero)} à signer`, [
        "Bonjour,",
        `Voici le devis <b>${esc(doc.numero)}</b> de L'Atelier des Maths pour <b>${esc(dest)}</b>, d'un montant de <b>${money(doc.total)}</b>, valable jusqu'au ${frDate(doc.date_validite)}.`,
        "La signature se fait en deux minutes : vous indiquez votre nom et votre qualité, puis vous recevez à cette adresse un code à 6 chiffres qui valide la signature.",
      ], { href: link, label: "Consulter et signer le devis" }) +
        `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;font-size:13px;color:#1c2330;">Pour toute question, répondez simplement à cet e-mail.<br><br>${esc(em.nom)}</div>`;
      await sendMail(email, `Devis ${doc.numero} à signer – L'Atelier des Maths`, text, html, em.email || "contact@latelierdesmaths.fr");
      return json({ ok: true, email, expires_at: expires.toISOString() });
    }

    /* ---------- Page publique ---------- */
    const found = await loadByToken(db, String(body.token || ""));
    if (!found) return json({ error: "Lien de signature invalide." }, 404);
    const { sig, doc } = found;
    const now = new Date();
    const expired = new Date(sig.expires_at) < now;

    if (action === "view") {
      return json({ doc: publicDoc(doc), email: maskEmail(sig.email), signed: !!sig.signed_at, revoked: sig.revoked && !sig.signed_at,
        expired: expired && !sig.signed_at, expires_at: sig.expires_at });
    }

    if (sig.signed_at) return json({ error: "Ce devis a déjà été signé.", signed: true }, 409);
    if (sig.revoked) return json({ error: "Ce lien n'est plus valable : un lien plus récent a été envoyé." }, 410);
    if (expired) return json({ error: "Ce devis a dépassé sa date de validité. Contactez-nous pour en recevoir un nouveau." }, 410);
    if (doc.statut !== "emis") return json({ error: "Ce devis n'est plus en attente de signature." }, 409);

    if (action === "code") {
      if ((sig.code_sends || 0) >= MAX_CODE_SENDS) return json({ error: "Nombre maximal de codes atteint pour ce lien. Contactez-nous." }, 429);
      const code = randomCode();
      await db.from("facturation_signatures").update({
        code_hash: await sha256(code + ":" + sig.id), code_expires_at: new Date(Date.now() + CODE_TTL_MIN * 60000).toISOString(),
        code_attempts: 0, code_sends: (sig.code_sends || 0) + 1,
      }).eq("id", sig.id);
      const text = `Votre code de signature du devis ${doc.numero} : ${code}\n\nIl est valable ${CODE_TTL_MIN} minutes. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.\n\nL'Atelier des Maths`;
      const html = mailHtml(`Code de signature du devis ${esc(doc.numero)}`, [
        "Votre code de signature :",
        `<span style="font-size:30px;font-weight:bold;letter-spacing:6px;color:#0C5BA0;">${code}</span>`,
        `Il est valable ${CODE_TTL_MIN} minutes. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.`,
      ]);
      await sendMail(sig.email, `${code} : code de signature du devis ${doc.numero}`, text, html, (doc.emetteur || {}).email || "contact@latelierdesmaths.fr");
      return json({ ok: true, email: maskEmail(sig.email), minutes: CODE_TTL_MIN });
    }

    if (action === "sign") {
      const nom = String(body.nom || "").trim().slice(0, 120), qualite = String(body.qualite || "").trim().slice(0, 120);
      if (nom.length < 3 || qualite.length < 2) return json({ error: "Indiquez votre nom et votre qualité." }, 400);
      if (!body.accord) return json({ error: "Cochez « Bon pour accord »." }, 400);
      if (!sig.code_hash || !sig.code_expires_at) return json({ error: "Demandez d'abord un code." }, 400);
      if (new Date(sig.code_expires_at) < now) return json({ error: "Ce code a expiré : demandez-en un nouveau." }, 400);
      if (sig.code_attempts >= MAX_ATTEMPTS) return json({ error: "Trop d'essais : demandez un nouveau code." }, 429);
      const ok = (await sha256(String(body.code || "").replace(/\D/g, "") + ":" + sig.id)) === sig.code_hash;
      if (!ok) {
        await db.from("facturation_signatures").update({ code_attempts: sig.code_attempts + 1 }).eq("id", sig.id);
        const left = MAX_ATTEMPTS - sig.code_attempts - 1;
        return json({ error: left > 0 ? `Code incorrect (encore ${left} essai${left > 1 ? "s" : ""}).` : "Code incorrect : demandez un nouveau code." }, 400);
      }
      const signedAt = now.toISOString();
      const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null;
      const ua = (req.headers.get("user-agent") || "").slice(0, 300);
      const hash = await docHash(doc);
      const { error: e3 } = await db.from("facturation_signatures").update({
        signed_at: signedAt, signataire_nom: nom, signataire_qualite: qualite, signed_ip: ip, signed_ua: ua, doc_hash: hash, code_hash: null,
      }).eq("id", sig.id).is("signed_at", null);
      if (e3) throw e3;
      const signature = { nom, qualite, signed_at: signedAt, email: sig.email, doc_hash: hash, ip };
      const cl = doc.client || {}, em = doc.emetteur || {};
      const lic = cl.uai && doc.periode_fin ? doc.periode_fin : null;
      const ref = `Devis signé en ligne le ${frDate(signedAt.slice(0, 10))}`;
      await db.from("facturation_documents").update({
        statut: "accepte", signature, numero_engagement: doc.numero_engagement || ref, licence_until: lic,
      }).eq("id", doc.id);
      if (lic) {
        const note = `Devis ${doc.numero} · ${ref}`;
        const { data: et } = await db.from("etablissements").select("uai").eq("uai", cl.uai).maybeSingle();
        if (et) await db.from("etablissements").update({ licence_until: lic, licence_note: note }).eq("uai", cl.uai);
        else await db.from("etablissements").insert({ uai: cl.uai, nom: cl.nom, licence_until: lic, licence_note: note });
      }
      const quand = frDateTime(signedAt);
      // Confirmation au signataire et alerte à l'émetteur (un échec d'e-mail n'annule pas la signature).
      const mails = [
        sendMail(sig.email, `Devis ${doc.numero} signé – L'Atelier des Maths`,
          `Bonjour ${nom},\n\nLe devis ${doc.numero} (${money(doc.total)}) a bien été signé le ${quand}. Merci !\n\n${lic ? `L'accès de l'établissement est ouvert jusqu'au ${frDate(lic)}.\n\n` : ""}Le devis signé reste consultable ici : ${SITE}/signature/?t=${body.token}\n\nL'Atelier des Maths`,
          mailHtml(`Devis ${esc(doc.numero)} signé`, [`Bonjour ${esc(nom)},`, `Le devis <b>${esc(doc.numero)}</b> (${money(doc.total)}) a bien été signé le ${esc(quand)}. Merci !`,
            lic ? `L'accès de l'établissement à L'Atelier des Maths est ouvert jusqu'au <b>${frDate(lic)}</b>.` : ""].filter(Boolean),
            { href: `${SITE}/signature/?t=${body.token}`, label: "Voir le devis signé" }),
          em.email || "contact@latelierdesmaths.fr"),
      ];
      if (em.email) mails.push(sendMail(em.email, `✓ Devis ${doc.numero} signé en ligne – ${cl.nom}`,
        `Le devis ${doc.numero} (${cl.nom}, ${money(doc.total)}) a été signé en ligne le ${quand} par ${nom} (${qualite}), code envoyé à ${sig.email}.\n\nIl est passé en « Commande reçue »${lic ? ` et la licence de l'établissement est ouverte jusqu'au ${frDate(lic)}` : ""}. Il reste à émettre la facture : Administration > Facturation.`,
        mailHtml(`Devis ${esc(doc.numero)} signé en ligne`, [`<b>${esc(cl.nom)}</b> · ${money(doc.total)}`, `Signé le ${esc(quand)} par <b>${esc(nom)}</b> (${esc(qualite)}), code envoyé à ${esc(sig.email)}.`,
          `Le devis est passé en « Commande reçue »${lic ? ` et la licence de l'établissement est ouverte jusqu'au ${frDate(lic)}` : ""}. Il reste à émettre la facture : Administration › Facturation.`],
          { href: SITE + "/", label: "Ouvrir L'Atelier des Maths" }), em.email));
      await Promise.allSettled(mails);
      return json({ ok: true, signed_at: signedAt, licence_until: lic });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String((e as Error).message || e) }, 500);
  }
});
