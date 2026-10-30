// supabase/functions/profil/index.ts
//
// Page « Mon profil » et « Mot de passe oublié » -- demandé le 30/10/2026 : « Il serait bien d'avoir une page votre
// profil qui permet de modifier certaines données nous concernant. Le champ email n'est pas présent. Donc pour
// récupérer son mot de passe oublié, ça pose problème. »
//
// Les comptes se connectent par identifiant (adresse fictive identifiant@mathcollege.local, voir app.js) : Supabase
// ne peut rien leur envoyer. Chaque adulte (professeur, parent, administrateur) peut donc enregistrer une adresse
// e-mail de récupération, confirmée par un lien ; le lien « mot de passe oublié » part vers cette adresse.
// Les élèves n'en ont pas : leur professeur (ou leurs parents) leur donne un nouveau mot de passe.
//
//   lire      (connecté)  : identifiant, adresse de connexion réelle ou non, adresse de récupération et son état.
//   email     (connecté)  : { email } enregistre l'adresse en attente et envoie le lien de confirmation (48 h) ;
//                           { email: "" } retire l'adresse de récupération.
//   confirmer (public)    : { jeton } confirme l'adresse (lien reçu par e-mail).
//   oubli     (public)    : { identifiant } identifiant, adresse de connexion ou adresse de récupération : envoie un
//                           lien de réinitialisation (Supabase generateLink « recovery ») à l'adresse confirmée, ou à
//                           l'adresse de connexion si elle est réelle. Réponse identique dans tous les cas (on ne
//                           révèle pas quels comptes existent) ; un lien au plus toutes les 2 minutes par compte.
//
// Le jeton de confirmation n'est jamais stocké en clair (empreinte SHA-256).
// Secrets : RESEND_API_KEY ; SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY (fournis).
// verify_jwt = false : « oubli » et « confirmer » sont appelées sans compte ; les autres actions vérifient le jeton.

import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const SITE = "https://latelierdesmaths.fr";
// Adresses d'où l'on peut revenir (règles de redirection de Supabase Auth) : le site, l'Atelier du Prof, et l'ancienne adresse.
const ORIGINES = ["https://latelierdesmaths.fr", "https://adp.latelieraugmente.fr", "https://maths.latelieraugmente.fr"];
const FROM = "L'Atelier des Maths <compte@latelieraugmente.fr>";
const REPLY = "contact@latelieraugmente.fr";
const CONFIRM_HEURES = 48, OUBLI_MINUTES = 2;
const FICTIF = /@mathcollege\.local$/i;

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
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e) && e.length <= 254 && !FICTIF.test(e);
const identifiantDe = (email: string) => FICTIF.test(email) ? email.replace(FICTIF, "") : email;
const origineDe = (o: unknown) => ORIGINES.includes(String(o)) ? String(o) : SITE;

async function sendMail(to: string, subject: string, text: string, html: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY non configurée.");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text, html, reply_to: REPLY }),
  });
  if (!res.ok) throw new Error(`Envoi de l'e-mail impossible (${res.status}) : ${await res.text()}`);
}
// Même présentation que les autres mails du site (bandeau bleu marine, liseré orange, bouton).
function mailHtml(titre: string, paragraphes: string[], bouton: { href: string; label: string }, apres: string[] = []) {
  const p = (t: string) => `<p style="margin:0 0 14px 0;">${t}</p>`;
  return `<div style="background:#F3F6FA;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1F2A37;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E1E7EF;border-radius:14px;overflow:hidden;">
    <div style="background:#1F3A5C;padding:20px 28px;color:#FFFFFF;font-size:20px;font-weight:bold;">L'Atelier des Maths</div>
    <div style="height:5px;background:#FF8208;font-size:0;line-height:0;">&nbsp;</div>
    <div style="padding:26px 28px 8px 28px;font-size:15px;line-height:1.6;">
      <h2 style="font-size:18px;margin:0 0 14px 0;color:#1F3A5C;">${titre}</h2>
      ${paragraphes.map(p).join("")}
      <p style="margin:22px 0;text-align:center;"><a href="${bouton.href}" style="background:#FF8208;color:#FFFFFF;text-decoration:none;padding:12px 26px;border-radius:999px;font-weight:bold;display:inline-block;">${bouton.label}</a></p>
      ${apres.map((t) => `<p style="margin:0 0 12px 0;font-size:13px;color:#5B6472;">${t}</p>`).join("")}
    </div>
    <div style="background:#F7F9FC;border-top:1px solid #E1E7EF;padding:14px 28px;font-size:12px;color:#5B6472;">latelierdesmaths.fr · une production de L'Atelier Augmenté</div>
  </div></div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = await req.json().catch(() => ({}));
    const db = admin();

    /* ---------- Mot de passe oublié (public) ---------- */
    if (body.action === "oubli") {
      const saisie = String(body.identifiant ?? "").trim().slice(0, 254);
      const reponse = { ok: true };
      if (!saisie) return json(reponse);
      const { data: comptes } = await db.rpc("profil_trouver", { p: saisie });
      const origine = origineDe(body.origine);
      for (const c of (comptes || []) as { user_id: string; email_connexion: string; email_recuperation: string | null; role: string | null }[]) {
        const dest = c.email_recuperation || (FICTIF.test(c.email_connexion) ? null : c.email_connexion);
        if (!dest) continue; // pas d'adresse : élève, ou adulte qui n'a pas encore renseigné son adresse
        const { data: ct } = await db.from("profil_contact").select("lien_envoye_at").eq("user_id", c.user_id).maybeSingle();
        if (ct?.lien_envoye_at && Date.now() - new Date(ct.lien_envoye_at).getTime() < OUBLI_MINUTES * 60000) continue;
        const { data: lien, error } = await db.auth.admin.generateLink({ type: "recovery", email: c.email_connexion, options: { redirectTo: origine + "/?reinit=1" } });
        if (error || !lien?.properties?.action_link) { console.error("generateLink", error?.message); continue; }
        await db.from("profil_contact").upsert({ user_id: c.user_id, lien_envoye_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
        const ident = identifiantDe(c.email_connexion);
        // Un échec d'envoi n'est pas signalé à l'appelant (même réponse dans tous les cas) : il reste dans les journaux.
        await sendMail(dest, "Choisir un nouveau mot de passe – L'Atelier des Maths",
          `Bonjour,\n\nUne demande de nouveau mot de passe a été faite pour le compte « ${ident} » sur L'Atelier des Maths.\nPour choisir un nouveau mot de passe, ouvrez ce lien (valable une heure) :\n${lien.properties.action_link}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message : votre mot de passe actuel reste valable.\n\nL'Atelier des Maths – latelierdesmaths.fr`,
          mailHtml("Choisir un nouveau mot de passe", [
            `Bonjour,`,
            `Une demande de nouveau mot de passe a été faite pour le compte <b>${esc(ident)}</b> sur L'Atelier des Maths.`,
            `Cliquez sur le bouton ci-dessous : le site s'ouvrira et vous proposera de choisir un nouveau mot de passe.`,
          ], { href: lien.properties.action_link, label: "Choisir un nouveau mot de passe" }, [
            `Ce lien est valable une heure et ne sert qu'une fois.`,
            `Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : votre mot de passe actuel reste valable.`,
          ])).catch((e) => console.error("oubli", (e as Error).message));
      }
      return json(reponse);
    }

    /* ---------- Confirmation de l'adresse (public, lien reçu par e-mail) ---------- */
    if (body.action === "confirmer") {
      const jeton = String(body.jeton ?? "");
      if (jeton.length < 20) return json({ error: "Lien de confirmation invalide." }, 400);
      const { data: c } = await db.from("profil_contact").select("user_id, email_attente, jeton_at").eq("jeton_hash", await sha256(jeton)).maybeSingle();
      if (!c || !c.email_attente) return json({ error: "Ce lien de confirmation n'est plus valable (déjà utilisé ou remplacé par un autre)." }, 400);
      if (!c.jeton_at || Date.now() - new Date(c.jeton_at).getTime() > CONFIRM_HEURES * 3600000)
        return json({ error: "Ce lien de confirmation a expiré : enregistrez de nouveau votre adresse dans « Mon profil »." }, 400);
      const now = new Date().toISOString();
      await db.from("profil_contact").update({ email_recuperation: c.email_attente, email_verifie_at: now, email_attente: null, jeton_hash: null, jeton_at: null, updated_at: now }).eq("user_id", c.user_id);
      return json({ ok: true, email: c.email_attente });
    }

    /* ---------- Actions de l'utilisateur connecté ---------- */
    const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await db.auth.getUser(jwt);
    const user = u?.user;
    if (!user) return json({ error: "Connectez-vous d'abord." }, 401);
    const { data: prof } = await db.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role = prof?.role || null;

    if (body.action === "lire") {
      const { data: c } = await db.from("profil_contact").select("email_recuperation, email_verifie_at, email_attente, jeton_at").eq("user_id", user.id).maybeSingle();
      const attente = c?.email_attente && c?.jeton_at && Date.now() - new Date(c.jeton_at).getTime() <= CONFIRM_HEURES * 3600000 ? c.email_attente : null;
      return json({
        ok: true, role, identifiant: identifiantDe(user.email || ""),
        email_connexion: FICTIF.test(user.email || "") ? null : user.email,
        email_recuperation: c?.email_recuperation || null, email_verifie_at: c?.email_verifie_at || null, email_attente: attente,
        peut_email: role !== "eleve",
      });
    }

    if (body.action === "email") {
      if (role === "eleve") return json({ error: "Les comptes élèves n'ont pas d'adresse e-mail : ton professeur peut te donner un nouveau mot de passe." }, 403);
      const email = String(body.email ?? "").trim().toLowerCase();
      const now = new Date().toISOString();
      if (!email) {
        await db.from("profil_contact").upsert({ user_id: user.id, email_recuperation: null, email_verifie_at: null, email_attente: null, jeton_hash: null, jeton_at: null, updated_at: now }, { onConflict: "user_id" });
        return json({ ok: true, retire: true });
      }
      if (!emailOk(email)) return json({ error: "Adresse e-mail invalide." }, 400);
      const { data: c } = await db.from("profil_contact").select("jeton_at, email_attente").eq("user_id", user.id).maybeSingle();
      if (c?.jeton_at && c.email_attente === email && Date.now() - new Date(c.jeton_at).getTime() < 60000)
        return json({ error: "Un lien vient d'être envoyé à cette adresse : patientez une minute avant d'en demander un autre." }, 429);
      const jeton = randomToken();
      await db.from("profil_contact").upsert({ user_id: user.id, email_attente: email, jeton_hash: await sha256(jeton), jeton_at: now, updated_at: now }, { onConflict: "user_id" });
      const lien = `${origineDe(body.origine)}/?confirmer-email=${encodeURIComponent(jeton)}`;
      const ident = identifiantDe(user.email || "");
      await sendMail(email, "Confirmez votre adresse e-mail – L'Atelier des Maths",
        `Bonjour,\n\nVous avez indiqué cette adresse comme adresse de récupération du compte « ${ident} » sur L'Atelier des Maths.\nPour la confirmer, ouvrez ce lien (valable ${CONFIRM_HEURES} heures) :\n${lien}\n\nElle servira uniquement à vous envoyer un lien si vous oubliez votre mot de passe.\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message.\n\nL'Atelier des Maths – latelierdesmaths.fr`,
        mailHtml("Confirmez votre adresse e-mail", [
          `Bonjour,`,
          `Vous avez indiqué cette adresse comme <b>adresse de récupération</b> du compte <b>${esc(ident)}</b> sur L'Atelier des Maths.`,
          `Elle servira uniquement à vous envoyer un lien si vous oubliez votre mot de passe.`,
        ], { href: lien, label: "Confirmer mon adresse" }, [
          `Ce lien est valable ${CONFIRM_HEURES} heures.`,
          `Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : rien ne sera enregistré.`,
        ]));
      return json({ ok: true, attente: email });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    console.error(e);
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
