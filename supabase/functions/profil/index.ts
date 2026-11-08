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
//   bienvenue (public)    : { user_id } e-mail de bienvenue au professeur dont l'inscription vient d'être approuvée
//                           (appelée par le déclencheur bienvenue_prof_auto sur profiles). Une seule fois par compte
//                           (profil_contact.bienvenue_at), et seulement dans les 3 jours qui suivent l'approbation.
//   Élèves (demandé le 08/11/2026 : « Pour les élèves, il serait intéressant d'avoir une "option email" […] les emails de
//   l'établissement […] celui de l'enseignant […] envoi direct des mots de passes oubliés ») :
//   domaines     (prof)  : { domaines? } lit / enregistre les domaines d'adresses élèves de son établissement (jamais Gmail…).
//   eleves-emails (prof) : { class_id } adresses des élèves d'une de ses classes (confirmée, en attente, aucune).
//   eleve-email  (prof)  : { student_id, email } adresse d'un de ses élèves, d'un domaine déclaré ; lien de confirmation
//                          envoyé à l'élève (48 h) ; elle ne sert qu'une fois confirmée. { email: "" } la retire.
//   confirmer             : pour un élève jamais connecté, renvoie aussi un lien de première connexion (invitation).
//   oubli                 : élève avec adresse confirmée -> lien à l'élève ; sinon lien de 7 jours envoyé à ses professeurs
//                           (adresse de récupération ou de connexion), à lui transmettre.
//   oubli     (public)    : { identifiant } identifiant, adresse de connexion ou adresse de récupération : envoie un
//                           lien de réinitialisation (Supabase generateLink « recovery ») à l'adresse confirmée, ou à
//                           l'adresse de connexion si elle est réelle. Réponse identique dans tous les cas (on ne
//                           révèle pas quels comptes existent) ; un lien au plus toutes les 2 minutes par compte.
//
// Le jeton de confirmation n'est jamais stocké en clair (empreinte SHA-256).
// Secrets : RESEND_API_KEY ; SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY (fournis).
// verify_jwt = false : « oubli » et « confirmer » sont appelées sans compte ; les autres actions vérifient le jeton.

import { createClient } from "npm:@supabase/supabase-js@2";
import { mailBienvenue } from "./bienvenue.ts";

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
// Adresses d'où l'on peut revenir (règles de redirection de Supabase Auth) : le site, l'Atelier du Prof, et l'ancienne adresse.
const ORIGINES = ["https://latelierdesmaths.fr", "https://adp.latelieraugmente.fr", "https://maths.latelieraugmente.fr"];
// Une seule adresse d'envoi, contact@ (demandé le 01/11/2026 : « Pourquoi compte ? et pas simplement contact qui existe ? »,
// « ne multiplie pas les adresses à l'avenir », puis « contact » pour tous les e-mails).
const FROM = "L'Atelier des Maths <contact@latelierdesmaths.fr>";
const REPLY = "contact@latelierdesmaths.fr";
const CONFIRM_HEURES = 48, OUBLI_MINUTES = 2;
const FICTIF = /@mathcollege\.local$/i;
// Messageries publiques : jamais acceptées comme domaine d'adresses élèves (adresses personnelles de mineurs).
const WEBMAIL = new Set(["gmail.com", "googlemail.com", "outlook.com", "outlook.fr", "hotmail.com", "hotmail.fr", "live.com", "live.fr", "msn.com",
  "yahoo.com", "yahoo.fr", "ymail.com", "icloud.com", "me.com", "mac.com", "orange.fr", "wanadoo.fr", "free.fr", "laposte.net", "sfr.fr", "neuf.fr",
  "bbox.fr", "aol.com", "gmx.fr", "gmx.com", "gmx.net", "protonmail.com", "proton.me", "mail.com", "yandex.com", "zoho.com", "tutanota.com"]);
const domaineOk = (d: string) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d) && d.length <= 120 && !WEBMAIL.has(d);
const OUBLI_PROFS_MINUTES = 10;

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
  const res = await envoiResend({
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

// Lien d'invitation (invitation.html) : un seul en attente par élève ; jours = 60 (première connexion) ou 7 (oubli).
async function invitation(db: ReturnType<typeof admin>, userId: string, jours: number): Promise<string> {
  await db.from("invitations").delete().eq("user_id", userId).is("used_at", null);
  const token = crypto.randomUUID();
  const { error } = await db.from("invitations").insert({ token, user_id: userId, expires_at: new Date(Date.now() + jours * 864e5).toISOString() });
  if (error) throw new Error(error.message);
  return token;
}

// Mot de passe oublié d'un élève : à son adresse confirmée, sinon à ses professeurs (lien de 7 jours à lui transmettre).
async function oubliEleve(db: ReturnType<typeof admin>, c: { user_id: string; email_connexion: string; email_recuperation: string | null }, origine: string) {
  const { data: ct } = await db.from("profil_contact").select("lien_envoye_at").eq("user_id", c.user_id).maybeSingle();
  const ident = identifiantDe(c.email_connexion);
  const { data: pe } = await db.from("profiles").select("prenom, nom").eq("id", c.user_id).maybeSingle();
  const marquer = () => db.from("profil_contact").upsert({ user_id: c.user_id, lien_envoye_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  const depuis = ct?.lien_envoye_at ? Date.now() - new Date(ct.lien_envoye_at).getTime() : Infinity;
  if (c.email_recuperation) {
    if (depuis < OUBLI_MINUTES * 60000) return;
    const { data: lien, error } = await db.auth.admin.generateLink({ type: "recovery", email: c.email_connexion, options: { redirectTo: origine + "/?reinit=1" } });
    if (error || !lien?.properties?.action_link) { console.error("generateLink élève", error?.message); return; }
    await marquer();
    const bonjour = `Bonjour${pe?.prenom ? " " + pe.prenom : ""},`;
    await sendMail(c.email_recuperation, "Choisis un nouveau mot de passe – L'Atelier des Maths",
      `${bonjour}

Tu as demandé un nouveau mot de passe pour ton compte « ${ident} » sur L'Atelier des Maths.
Ouvre ce lien (valable une heure) pour en choisir un :
${lien.properties.action_link}

Si tu n'as rien demandé, ignore ce message : ton mot de passe actuel reste valable.

L'Atelier des Maths – latelierdesmaths.fr`,
      mailHtml("Choisis un nouveau mot de passe", [esc(bonjour), `Tu as demandé un nouveau mot de passe pour ton compte <b>${esc(ident)}</b>.`, `Clique sur le bouton : le site s'ouvrira et te proposera d'en choisir un.`],
        { href: lien.properties.action_link, label: "Choisir un nouveau mot de passe" },
        [`Ce lien est valable une heure et ne sert qu'une fois.`, `Si tu n'as rien demandé, ignore ce message : ton mot de passe actuel reste valable.`])).catch((e) => console.error("oubli élève", (e as Error).message));
    return;
  }
  // Pas d'adresse : ses professeurs reçoivent un lien de 7 jours, au plus toutes les 10 minutes.
  if (depuis < OUBLI_PROFS_MINUTES * 60000) return;
  const { data: cs } = await db.from("class_students").select("class_id").eq("student_id", c.user_id);
  const classes = (cs || []).map((r: { class_id: string }) => r.class_id);
  if (!classes.length) return;
  const { data: tt } = await db.from("class_teachers").select("teacher_id").in("class_id", classes);
  const profs = [...new Set((tt || []).map((r: { teacher_id: string }) => r.teacher_id))];
  const dests: string[] = [];
  for (const id of profs) {
    const { data: cp } = await db.from("profil_contact").select("email_recuperation").eq("user_id", id).maybeSingle();
    let d = cp?.email_recuperation || null;
    if (!d) { const { data: up } = await db.auth.admin.getUserById(id); const e = up?.user?.email || ""; d = FICTIF.test(e) ? null : e; }
    if (d && !dests.includes(d)) dests.push(d);
  }
  if (!dests.length) return;
  await marquer();
  const token = await invitation(db, c.user_id, 7);
  const lien = `${origine}/invitation.html?reinit=1&invite=${token}`;
  const nom = [pe?.prenom, pe?.nom].filter(Boolean).join(" ") || ident;
  for (const d of dests) {
    await sendMail(d, `Mot de passe oublié : ${nom} – L'Atelier des Maths`,
      `Bonjour,

Votre élève ${nom} (identifiant « ${ident} ») a demandé un nouveau mot de passe sur L'Atelier des Maths.
Voici un lien à lui transmettre (valable 7 jours, une seule fois) : il pourra y choisir un nouveau mot de passe.
${lien}

Son ancien mot de passe reste valable tant qu'il n'en a pas choisi un autre. Si la demande ne vient pas de lui, ne transmettez rien.
Astuce : une adresse e-mail de l'établissement, confirmée par l'élève, lui permet de recevoir ce lien directement (Mes classes › Élèves › Adresses e-mail).

L'Atelier des Maths – latelierdesmaths.fr`,
      mailHtml("Mot de passe oublié", [`Bonjour,`, `Votre élève <b>${esc(nom)}</b> (identifiant <b>${esc(ident)}</b>) a demandé un nouveau mot de passe sur L'Atelier des Maths.`,
        `Transmettez-lui ce lien (ENT, messagerie de l'établissement…) : il pourra y choisir un nouveau mot de passe.`],
        { href: lien, label: "Lien à transmettre à l'élève" },
        [`Le lien est valable 7 jours et ne sert qu'une fois ; son ancien mot de passe reste valable d'ici là. Si la demande ne vient pas de lui, ne transmettez rien.`,
         `Adresse du lien : <span style="word-break:break-all;">${esc(lien)}</span>`,
         `Astuce : une adresse e-mail de l'établissement, confirmée par l'élève, lui permet de recevoir ce lien directement (Mes classes › Élèves › Adresses e-mail).`])).catch((e) => console.error("oubli profs", (e as Error).message));
  }
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
        if (c.role === "eleve") { await oubliEleve(db, c, origine); continue; }
        const dest = c.email_recuperation || (FICTIF.test(c.email_connexion) ? null : c.email_connexion);
        if (!dest) continue; // pas d'adresse : adulte qui n'a pas encore renseigné son adresse
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

    /* ---------- Bienvenue (public, appelée par la base à l'approbation d'un professeur) ---------- */
    if (body.action === "bienvenue") {
      const id = String(body.user_id ?? "");
      if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "Compte inconnu." }, 400);
      const { data: p } = await db.from("profiles").select("role, prenom, signup_status, trial_started_at, subscription_expires_at").eq("id", id).maybeSingle();
      if (!p || p.role !== "prof" || p.signup_status !== "approved") return json({ ok: false, raison: "pas un professeur approuvé" });
      if (!p.trial_started_at || Date.now() - new Date(p.trial_started_at).getTime() > 3 * 86400000) return json({ ok: false, raison: "approbation trop ancienne" });
      const { data: ct } = await db.from("profil_contact").select("email_recuperation, bienvenue_at").eq("user_id", id).maybeSingle();
      if (ct?.bienvenue_at) return json({ ok: false, raison: "déjà envoyé" });
      const { data: u } = await db.auth.admin.getUserById(id);
      const connexion = u?.user?.email || "";
      const dest = FICTIF.test(connexion) ? ct?.email_recuperation : connexion;
      if (!dest) return json({ ok: false, raison: "aucune adresse" });
      // Marqué AVANT l'envoi : deux appels simultanés n'envoient pas deux e-mails.
      await db.from("profil_contact").upsert({ user_id: id, bienvenue_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      const m = mailBienvenue({ prenom: p.prenom, identifiant: identifiantDe(connexion), finEssai: p.subscription_expires_at ? new Date(p.subscription_expires_at) : null });
      try { await sendMail(dest, m.sujet, m.texte, m.html); }
      catch (e) {
        await db.from("profil_contact").update({ bienvenue_at: null }).eq("user_id", id);
        throw e;
      }
      return json({ ok: true });
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
      // Élève jamais connecté : il choisit tout de suite son mot de passe (lien de première connexion).
      const { data: pc } = await db.from("profiles").select("role").eq("id", c.user_id).maybeSingle();
      if (pc?.role === "eleve") {
        const { data: ua } = await db.auth.admin.getUserById(c.user_id);
        if (ua?.user && !ua.user.last_sign_in_at) return json({ ok: true, email: c.email_attente, eleve: true, invitation: await invitation(db, c.user_id, 60) });
        return json({ ok: true, email: c.email_attente, eleve: true });
      }
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

    /* ---------- Adresses des élèves (professeur) ---------- */
    if (["domaines", "eleves-emails", "eleve-email"].includes(body.action)) {
      if (role !== "prof" && role !== "admin") return json({ error: "Réservé aux professeurs." }, 403);
      const { data: moi } = await db.from("profiles").select("uai").eq("id", user.id).maybeSingle();
      const uai = moi?.uai || null;
      const { data: etab } = uai ? await db.from("etablissements").select("uai, nom, domaines_eleves").eq("uai", uai).maybeSingle() : { data: null };
      const domaines: string[] = etab?.domaines_eleves || [];

      if (body.action === "domaines") {
        if (Array.isArray(body.domaines)) {
          if (!etab) return json({ error: "Votre compte n'est rattaché à aucun établissement : écrivez à contact@latelierdesmaths.fr." }, 400);
          const liste = [...new Set((body.domaines as unknown[]).map((d) => String(d).trim().toLowerCase().replace(/^@/, "")).filter(Boolean))];
          const refus = liste.filter((d) => !domaineOk(d));
          if (refus.length) return json({ error: `Domaine refusé : ${refus.join(", ")}. Seuls les domaines de l'établissement sont acceptés (jamais une messagerie publique comme gmail.com).` }, 400);
          if (liste.length > 10) return json({ error: "10 domaines au plus." }, 400);
          await db.from("etablissements").update({ domaines_eleves: liste }).eq("uai", uai);
          return json({ ok: true, domaines: liste, etablissement: etab.nom });
        }
        const { data: ct } = await db.from("profil_contact").select("email_recuperation").eq("user_id", user.id).maybeSingle();
        return json({ ok: true, domaines, etablissement: etab?.nom || null,
          adresse_prof: ct?.email_recuperation || (FICTIF.test(user.email || "") ? null : user.email) });
      }

      // Élèves des classes du professeur (l'administrateur voit tout).
      const mesEleves = async (ids: string[]) => {
        if (role === "admin") return new Set(ids);
        const { data: ct } = await db.from("class_teachers").select("class_id").eq("teacher_id", user.id);
        const classes = (ct || []).map((r: { class_id: string }) => r.class_id);
        if (!classes.length) return new Set<string>();
        const { data: cs } = await db.from("class_students").select("student_id").in("class_id", classes).in("student_id", ids);
        return new Set((cs || []).map((r: { student_id: string }) => r.student_id));
      };

      if (body.action === "eleves-emails") {
        const classId = String(body.class_id ?? "");
        if (role !== "admin") {
          const { data: t } = await db.from("class_teachers").select("class_id").eq("class_id", classId).eq("teacher_id", user.id).maybeSingle();
          if (!t) return json({ error: "Cette classe n'est pas la vôtre." }, 403);
        }
        const { data: cs } = await db.from("class_students").select("student_id").eq("class_id", classId);
        const ids = (cs || []).map((r: { student_id: string }) => r.student_id);
        const { data: cts } = ids.length ? await db.from("profil_contact").select("user_id, email_recuperation, email_attente, jeton_at").in("user_id", ids) : { data: [] };
        const eleves = (cts || []).map((r: { user_id: string; email_recuperation: string | null; email_attente: string | null; jeton_at: string | null }) => ({
          id: r.user_id, email: r.email_recuperation,
          attente: r.email_attente && r.jeton_at && Date.now() - new Date(r.jeton_at).getTime() <= CONFIRM_HEURES * 3600000 ? r.email_attente : null,
          expiree: !!(r.email_attente && r.jeton_at && Date.now() - new Date(r.jeton_at).getTime() > CONFIRM_HEURES * 3600000),
        })).filter((r) => r.email || r.attente || r.expiree);
        return json({ ok: true, eleves, domaines });
      }

      // eleve-email
      const sid = String(body.student_id ?? "");
      if (!/^[0-9a-f-]{36}$/i.test(sid) || !(await mesEleves([sid])).has(sid)) return json({ error: "Cet élève n'est pas dans vos classes." }, 403);
      const { data: pe } = await db.from("profiles").select("role, prenom").eq("id", sid).maybeSingle();
      if (pe?.role !== "eleve") return json({ error: "Ce compte n'est pas un compte élève." }, 400);
      const email = String(body.email ?? "").trim().toLowerCase();
      const now = new Date().toISOString();
      if (!email) {
        await db.from("profil_contact").upsert({ user_id: sid, email_recuperation: null, email_verifie_at: null, email_attente: null, jeton_hash: null, jeton_at: null, saisi_par: user.id, updated_at: now }, { onConflict: "user_id" });
        return json({ ok: true, retire: true });
      }
      if (!emailOk(email)) return json({ error: `Adresse invalide : ${email}` }, 400);
      const dom = email.split("@")[1];
      if (!domaines.includes(dom)) return json({ error: domaines.length
        ? `Domaine non accepté : ${dom}. Domaines déclarés pour votre établissement : ${domaines.join(", ")}.`
        : "Déclarez d'abord le domaine des adresses de votre établissement (ex. eleves.college-x.fr)." }, 400);
      const { data: c } = await db.from("profil_contact").select("jeton_at, email_attente, email_recuperation").eq("user_id", sid).maybeSingle();
      if (c?.email_recuperation === email) return json({ ok: true, deja: true });
      if (c?.jeton_at && c.email_attente === email && Date.now() - new Date(c.jeton_at).getTime() < 60000)
        return json({ error: "Un lien vient d'être envoyé à cette adresse : patientez une minute." }, 429);
      const jeton = randomToken();
      await db.from("profil_contact").upsert({ user_id: sid, email_attente: email, jeton_hash: await sha256(jeton), jeton_at: now, saisi_par: user.id, updated_at: now }, { onConflict: "user_id" });
      const { data: ue } = await db.auth.admin.getUserById(sid);
      const ident = identifiantDe(ue?.user?.email || "");
      const jamais = !ue?.user?.last_sign_in_at;
      const lien = `${origineDe(body.origine)}/?confirmer-email=${encodeURIComponent(jeton)}`;
      const bonjour = `Bonjour${pe?.prenom ? " " + pe.prenom : ""},`;
      const suite = jamais ? "Ensuite, tu choisiras ton mot de passe pour te connecter la première fois." : "Si un jour tu oublies ton mot de passe, le lien pour en choisir un nouveau arrivera ici.";
      await sendMail(email, "Confirme ton adresse e-mail – L'Atelier des Maths",
        `${bonjour}

Ton professeur a indiqué cette adresse pour ton compte « ${ident} » sur L'Atelier des Maths.
Pour la confirmer, ouvre ce lien (valable ${CONFIRM_HEURES} heures) :
${lien}

${suite}
Si ce compte n'est pas le tien, ignore ce message.

L'Atelier des Maths – latelierdesmaths.fr`,
        mailHtml("Confirme ton adresse e-mail", [
          esc(bonjour),
          `Ton professeur a indiqué cette adresse pour ton compte <b>${esc(ident)}</b> sur L'Atelier des Maths.`,
          esc(suite),
        ], { href: lien, label: "Confirmer mon adresse" }, [
          `Ce lien est valable ${CONFIRM_HEURES} heures.`,
          `Si ce compte n'est pas le tien, ignore ce message : rien ne sera enregistré.`,
        ]));
      return json({ ok: true, attente: email });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    console.error(e);
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
