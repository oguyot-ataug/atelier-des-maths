// supabase/functions/rdv/index.ts
//
// Outil de prise de rendez-vous du site -- demandé le 30/10/2026 : « Est-il possible de créer son propre outil de
// réservation ? », puis « Oui, lance-le avec les mêmes plages que Cal.com » (Cal.com envoyait ses propres e-mails, sans
// le logo ni la charte du site). Appelée par la page « Prendre rendez-vous » (rdv.js), sans jeton obligatoire
// (verify_jwt désactivé) : les visiteurs, les parents et les professeurs réservent.
//
// Actions (POST JSON) :
//  - creneaux { de, a }                 : créneaux libres (AAAA-MM-JJ, heures de Paris), d'après rdv_reglages,
//                                         les rendez-vous déjà pris et, si l'agenda Google est relié, ses moments occupés.
//  - reserver { debut, nom, email, etablissement, objet, message } : réserve, crée l'événement Google Agenda avec son
//                                         lien Meet (sans invitation Google : c'est notre e-mail qui part), envoie l'e-mail
//                                         de confirmation aux couleurs du site (+ fichier .ics) et un SMS à l'administrateur.
//  - voir / annuler / deplacer { jeton [, debut] } : lien « Modifier ou annuler » de l'e-mail.
//  - rappels                            : e-mail de rappel la veille (appelée toutes les heures par pg_cron ; sans effet
//                                         si rien n'est dû, donc sans clé).
//  - admin-annuler { id }               : annulation par l'administrateur (jeton de session d'un compte admin).
//
// Secrets : SUPABASE_*, RESEND_API_KEY, ALERTE_CLE (SMS par la fonction alerte-sms). Agenda Google (facultatif) :
// GOOGLE_RDV_CLE (clé JSON d'un compte de service avec délégation au niveau du domaine Workspace) et GOOGLE_RDV_COMPTE
// (adresse du compte dont l'agenda reçoit les rendez-vous). Sans eux : pas de lecture de l'agenda, pas de lien Meet
// automatique (lien de secours rdv_reglages.lien_visio), et l'administrateur reçoit le rendez-vous par e-mail (.ics).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { creneauxLibres, enParis, type Intervalle } from "./creneaux.ts";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const SITE = "https://latelierdesmaths.fr";
const ADMIN_EMAIL = "contact@latelieraugmente.fr";
const OBJETS = ["Présentation du site", "Question sur mon compte", "Projet pour mon établissement", "Autre"];
const JOUR = /^\d{4}-\d{2}-\d{2}$/;
const coupe = (s: unknown, n: number) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------- Dates ----------
const FR = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long", year: "numeric" });
const dateLongue = (ms: number) => FR.format(new Date(ms));
const heure = (ms: number) => { const [h, m] = enParis(ms).heure.split(":").map(Number); return h + " h" + (m ? " " + String(m).padStart(2, "0") : ""); }; // « 8 h », « 18 h 40 »
const quand = (ms: number, fin: number) => `${dateLongue(ms)}, de ${heure(ms)} à ${heure(fin)}`;
const jourPlus = (jour: string, n: number) => { const [y, m, d] = jour.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };

// ---------- Agenda Google (compte de service, délégation au niveau du domaine) ----------
const b64url = (octets: Uint8Array) => { let s = ""; for (const o of octets) s += String.fromCharCode(o); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const b64 = (texte: string) => { let s = ""; for (const o of new TextEncoder().encode(texte)) s += String.fromCharCode(o); return btoa(s); };
let jetonGoogle: { valeur: string; expire: number } | null = null;
async function google(): Promise<string | null> {
  const brut = Deno.env.get("GOOGLE_RDV_CLE"), compte = Deno.env.get("GOOGLE_RDV_COMPTE");
  if (!brut || !compte) return null;
  if (jetonGoogle && jetonGoogle.expire > Date.now() + 60000) return jetonGoogle.valeur;
  try {
    const cle = JSON.parse(brut), maintenant = Math.floor(Date.now() / 1000);
    const enc = (o: unknown) => b64url(new TextEncoder().encode(JSON.stringify(o)));
    const signe = enc({ alg: "RS256", typ: "JWT" }) + "." + enc({ iss: cle.client_email, sub: compte, scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token", iat: maintenant, exp: maintenant + 3600 });
    const der = Uint8Array.from(atob(String(cle.private_key).replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")), (c) => c.charCodeAt(0));
    const k = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
    const sig = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", k, new TextEncoder().encode(signe)));
    const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: signe + "." + b64url(sig) }) });
    const j = await r.json();
    if (!j.access_token) { console.error("Google : jeton refusé", j.error || r.status); return null; }
    jetonGoogle = { valeur: j.access_token, expire: Date.now() + (j.expires_in || 3600) * 1000 };
    return j.access_token;
  } catch (e) { console.error("Google : clé illisible", String(e)); return null; }
}
const AGENDA = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
async function googleOccupe(jeton: string, de: number, a: number): Promise<Intervalle[]> {
  const r = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", { method: "POST", headers: { Authorization: "Bearer " + jeton, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin: new Date(de).toISOString(), timeMax: new Date(a).toISOString(), items: [{ id: "primary" }] }) });
  const j = await r.json();
  return ((j.calendars && j.calendars.primary && j.calendars.primary.busy) || []).map((b: any) => ({ debut: Date.parse(b.start), fin: Date.parse(b.end) }));
}
function evenement(res: any) {
  return {
    summary: `Rendez-vous L'Atelier des Maths – ${res.nom}${res.etablissement ? " (" + res.etablissement + ")" : ""}`,
    description: [`Objet : ${res.objet}`, `E-mail : ${res.email}`, res.etablissement ? `Établissement : ${res.etablissement}` : "", res.message ? `Message : ${res.message}` : "",
      `Gérer : ${SITE}/?rdv=${res.jeton}#/rendez-vous`].filter(Boolean).join("\n"),
    start: { dateTime: new Date(res.debut).toISOString(), timeZone: "Europe/Paris" },
    end: { dateTime: new Date(res.fin).toISOString(), timeZone: "Europe/Paris" },
  };
}
async function googleCreer(jeton: string, res: any): Promise<{ id: string; meet: string } | null> {
  const r = await fetch(AGENDA + "?conferenceDataVersion=1&sendUpdates=none", { method: "POST", headers: { Authorization: "Bearer " + jeton, "Content-Type": "application/json" },
    body: JSON.stringify({ ...evenement(res), conferenceData: { createRequest: { requestId: res.id, conferenceSolutionKey: { type: "hangoutsMeet" } } } }) });
  const j = await r.json();
  if (!r.ok) { console.error("Google : événement non créé", r.status, j.error && j.error.message); return null; }
  return { id: j.id, meet: j.hangoutLink || "" };
}
async function googleModifier(jeton: string, res: any) {
  await fetch(AGENDA + "/" + encodeURIComponent(res.google_event_id) + "?sendUpdates=none", { method: "PATCH", headers: { Authorization: "Bearer " + jeton, "Content-Type": "application/json" },
    body: JSON.stringify(evenement(res)) });
}
async function googleSupprimer(jeton: string, id: string) {
  await fetch(AGENDA + "/" + encodeURIComponent(id) + "?sendUpdates=none", { method: "DELETE", headers: { Authorization: "Bearer " + jeton } });
}

// ---------- E-mails (Resend) et SMS ----------
function ics(res: any, annule = false): string {
  const t = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const e = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const visio = res.meet_url || res.lien_visio || "";
  const lignes = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//L'Atelier des Maths//Rendez-vous//FR", "CALSCALE:GREGORIAN", `METHOD:${annule ? "CANCEL" : "PUBLISH"}`,
    "BEGIN:VEVENT", `UID:${res.id}@latelierdesmaths.fr`, `SEQUENCE:${Math.floor(Date.now() / 1000)}`, `DTSTAMP:${t(Date.now())}`,
    `DTSTART:${t(Date.parse(res.debut))}`, `DTEND:${t(Date.parse(res.fin))}`, `SUMMARY:${e("Rendez-vous L'Atelier des Maths")}`,
    `DESCRIPTION:${e((visio ? "Visio : " + visio + "\n" : "") + "Modifier ou annuler : " + SITE + "/?rdv=" + res.jeton + "#/rendez-vous")}`,
    `LOCATION:${e(visio || "Visio (lien envoyé par e-mail)")}`, `STATUS:${annule ? "CANCELLED" : "CONFIRMED"}`, "END:VEVENT", "END:VCALENDAR"];
  // Lignes de 75 octets au plus (RFC 5545) : repli à 70 caractères.
  return lignes.map((l) => { let o = ""; while (l.length > 70) { o += l.slice(0, 70) + "\r\n "; l = l.slice(70); } return o + l; }).join("\r\n") + "\r\n";
}
const bouton = (href: string, texte: string, fond = "#FF8208") =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 8px 6px 0;display:inline-table;"><tr><td style="background:${fond};border-radius:999px;"><a href="${esc(href)}" style="display:inline-block;padding:12px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#FFFFFF;text-decoration:none;border-radius:999px;">${texte}</a></td></tr></table>`;
function gabarit(contenu: string): string {
  return `<div style="background:#F3F6FA;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1F2A37;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto;background:#FFFFFF;border-radius:14px;border:1px solid #E1E7EF;overflow:hidden;">
    <tr><td style="padding:20px 28px 14px 28px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;"><img src="${SITE}/assets/logo-header-pdf.png" alt="L'Atelier des Maths" height="58" style="display:block;height:58px;border:0;"></td>
      <td style="vertical-align:middle;padding-left:14px;"><div style="font-size:20px;font-weight:bold;color:#1F3A5C;">L'Atelier des Maths</div><div style="font-size:13px;color:#5B6472;">Les mathématiques du CP à la 3e</div></td>
    </tr></table></td></tr>
    <tr><td style="height:5px;background:#FF8208;font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="padding:26px 28px 22px 28px;font-size:15px;line-height:1.6;">${contenu}</td></tr>
    <tr><td style="background:#F7F9FC;border-top:1px solid #E1E7EF;padding:14px 28px;font-size:12px;line-height:1.5;color:#5B6472;">
      <a href="${SITE}" style="color:#1F3A5C;font-weight:bold;text-decoration:none;">latelierdesmaths.fr</a> · Une question ? Répondez simplement à cet e-mail.</td></tr>
  </table></div>`;
}
function encadre(res: any, visio: string): string {
  const l = (icone: string, txt: string) => `<tr><td style="padding:4px 10px 4px 0;vertical-align:top;font-size:16px;">${icone}</td><td style="padding:4px 0;color:#1F3A5C;">${txt}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF4FB;border-left:5px solid #2EA8C9;border-radius:8px;margin:6px 0 16px 0;"><tr><td style="padding:12px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5;">
      ${l("&#128197;", `<b>${esc(quand(Date.parse(res.debut), Date.parse(res.fin)))}</b> <span style="color:#5B6472;">(heure de Paris)</span>`)}
      ${l("&#128172;", esc(res.objet))}
      ${l("&#127909;", visio ? "Visio Google Meet" : "Visio : le lien vous sera envoyé avant le rendez-vous")}
    </table></td></tr></table>`;
}
async function envoyerMail(a: string, sujet: string, html: string, texte: string, piece?: string, annule = false) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key || !a || /@mathcollege\.local$/i.test(a)) return;
  try {
    await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "L'Atelier des Maths <rendez-vous@latelieraugmente.fr>", to: [a], reply_to: ADMIN_EMAIL, subject: sujet, html, text: texte,
        ...(piece ? { attachments: [{ filename: annule ? "rendez-vous-annule.ics" : "rendez-vous.ics", content: b64(piece), content_type: `text/calendar; method=${annule ? "CANCEL" : "PUBLISH"}` }] } : {}) }) });
  } catch (e) { console.error("Resend", String(e)); }
}
const gerer = (res: any) => `${SITE}/?rdv=${res.jeton}#/rendez-vous`;
function lienGoogleAgenda(res: any, visio: string) {
  const t = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Rendez-vous L'Atelier des Maths") +
    "&dates=" + t(Date.parse(res.debut)) + "/" + t(Date.parse(res.fin)) + "&details=" + encodeURIComponent((visio ? "Visio : " + visio + "\n" : "") + "Modifier ou annuler : " + gerer(res));
}
async function mailConfirmation(res: any, visio: string, deplace = false) {
  const prenom = esc(String(res.nom).split(" ")[0]);
  const html = gabarit(`<p style="font-size:20px;font-weight:bold;color:#1F3A5C;margin:0 0 12px 0;">${deplace ? "Votre rendez-vous est déplacé" : "Votre rendez-vous est confirmé"}</p>
    <p style="margin:0 0 12px 0;">Bonjour ${prenom},</p>
    <p style="margin:0 0 6px 0;">${deplace ? "Voici le nouvel horaire de notre rendez-vous :" : "Merci pour votre réservation : à bientôt en visio !"}</p>
    ${encadre(res, visio)}
    ${visio ? bouton(visio, "&#127909; Rejoindre la visio") : ""}${bouton(lienGoogleAgenda(res, visio), "Ajouter à Google Agenda", "#1F3A5C")}
    <p style="font-size:13px;color:#5B6472;margin:10px 0 14px 0;">Outlook, Apple Calendrier : ouvrez le fichier joint pour ajouter le rendez-vous à votre agenda.</p>
    <p style="margin:0 0 4px 0;">Un empêchement ? <a href="${esc(gerer(res))}" style="color:#0C5BA0;font-weight:bold;">Modifier l'horaire ou annuler</a>.</p>
    <p style="margin:16px 0 0 0;">À bientôt,<br><b>L'Atelier des Maths</b></p>`);
  const texte = `${deplace ? "Votre rendez-vous est déplacé" : "Votre rendez-vous est confirmé"} : ${quand(Date.parse(res.debut), Date.parse(res.fin))} (heure de Paris). ` +
    (visio ? "Visio : " + visio + ". " : "Le lien de la visio vous sera envoyé avant le rendez-vous. ") + "Modifier ou annuler : " + gerer(res);
  await envoyerMail(res.email, (deplace ? "Rendez-vous déplacé" : "Rendez-vous confirmé") + " – " + dateLongue(Date.parse(res.debut)) + " à " + heure(Date.parse(res.debut)), html, texte, ics(res));
}
async function mailAnnulation(res: any, parAdmin: boolean) {
  const html = gabarit(`<p style="font-size:20px;font-weight:bold;color:#1F3A5C;margin:0 0 12px 0;">Rendez-vous annulé</p>
    <p style="margin:0 0 12px 0;">Bonjour ${esc(String(res.nom).split(" ")[0])},</p>
    <p style="margin:0 0 12px 0;">${parAdmin ? "Nous sommes désolés : nous devons annuler notre rendez-vous du" : "Votre rendez-vous du"} <b>${esc(quand(Date.parse(res.debut), Date.parse(res.fin)))}</b>${parAdmin ? "." : " est bien annulé."}</p>
    <p style="margin:0 0 14px 0;">${parAdmin ? "Choisissez un autre créneau quand vous le souhaitez :" : "Vous pouvez en réserver un autre à tout moment :"}</p>
    ${bouton(SITE + "/#/rendez-vous", "Prendre un nouveau rendez-vous")}
    <p style="margin:16px 0 0 0;">À bientôt,<br><b>L'Atelier des Maths</b></p>`);
  await envoyerMail(res.email, "Rendez-vous annulé – " + dateLongue(Date.parse(res.debut)), html,
    `Rendez-vous du ${quand(Date.parse(res.debut), Date.parse(res.fin))} annulé. Nouveau rendez-vous : ${SITE}/#/rendez-vous`, ics(res, true), true);
}
async function mailRappel(res: any, visio: string) {
  const html = gabarit(`<p style="font-size:20px;font-weight:bold;color:#1F3A5C;margin:0 0 12px 0;">Rappel : rendez-vous demain</p>
    <p style="margin:0 0 12px 0;">Bonjour ${esc(String(res.nom).split(" ")[0])},</p>
    <p style="margin:0 0 6px 0;">Petit rappel de notre rendez-vous :</p>
    ${encadre(res, visio)}
    ${visio ? bouton(visio, "&#127909; Rejoindre la visio") : ""}
    <p style="margin:10px 0 0 0;">Un empêchement ? <a href="${esc(gerer(res))}" style="color:#0C5BA0;font-weight:bold;">Modifier l'horaire ou annuler</a>.</p>
    <p style="margin:16px 0 0 0;">À demain,<br><b>L'Atelier des Maths</b></p>`);
  await envoyerMail(res.email, "Rappel : rendez-vous demain à " + heure(Date.parse(res.debut)), html,
    `Rappel : rendez-vous ${quand(Date.parse(res.debut), Date.parse(res.fin))}. ${visio ? "Visio : " + visio + ". " : ""}Modifier ou annuler : ${gerer(res)}`);
}
// Administrateur : SMS (fonction alerte-sms) ; e-mail avec le fichier .ics quand l'agenda Google n'est pas relié.
async function prevenirAdmin(message: string, res?: any, annule = false) {
  const cle = Deno.env.get("ALERTE_CLE");
  if (cle) {
    try {
      await fetch(Deno.env.get("SUPABASE_URL") + "/functions/v1/alerte-sms", { method: "POST", headers: { "Content-Type": "application/json", "x-alerte-cle": cle },
        body: JSON.stringify({ type: "rdv", message, sans_limite: true }) });
    } catch (_e) { /* le rendez-vous reste enregistré */ }
  }
  if (res && !res.google_event_id) {
    await envoyerMail(ADMIN_EMAIL, (annule ? "Rendez-vous annulé : " : "Nouveau rendez-vous : ") + res.nom, gabarit(`<p><b>${esc(message)}</b></p>
      <p>${esc(res.email)}${res.etablissement ? " · " + esc(res.etablissement) : ""}<br>${esc(res.objet)}${res.message ? "<br>« " + esc(res.message) + " »" : ""}</p>
      <p style="font-size:13px;color:#5B6472;">L'agenda Google n'est pas relié : ouvrez le fichier joint pour ${annule ? "retirer" : "ajouter"} le rendez-vous de votre agenda.</p>`),
      message, ics(res, annule), annule);
  }
}

// ---------- Serveur ----------
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "POST attendu" }, 405);
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  let body: any = {};
  try { body = await req.json(); } catch (_e) { /* corps vide */ }
  try {
    const { data: r } = await db.from("rdv_reglages").select("*").eq("id", 1).single();
    if (!r) return json({ error: "Prise de rendez-vous indisponible." }, 503);
    const now = Date.now();
    const visioDe = (res: any) => res.meet_url || r.lien_visio || "";

    // Créneaux libres d'une journée ou d'une période, en ignorant éventuellement un rendez-vous (déplacement).
    const libres = async (de: string, a: string, sauf?: string) => {
      const debut = Date.parse(jourPlus(de, -1) + "T00:00:00Z"), fin = Date.parse(jourPlus(a, 2) + "T00:00:00Z");
      const { data: pris } = await db.from("rdv_reservations").select("id,debut,fin").eq("statut", "confirme")
        .gte("debut", new Date(debut).toISOString()).lt("debut", new Date(fin).toISOString());
      const occupes: Intervalle[] = (pris || []).filter((p: any) => p.id !== sauf).map((p: any) => ({ debut: Date.parse(p.debut), fin: Date.parse(p.fin) }));
      const g = await google();
      if (g) { try { occupes.push(...(await googleOccupe(g, debut, fin))); } catch (e) { console.error("Google : agenda illisible", String(e)); } }
      // Le rendez-vous déplacé occupe aussi son propre événement Google : on le retire des moments occupés.
      if (sauf) {
        const { data: s } = await db.from("rdv_reservations").select("debut,fin").eq("id", sauf).maybeSingle();
        if (s) { const d = Date.parse(s.debut), f = Date.parse(s.fin); for (let i = occupes.length - 1; i >= 0; i--) if (occupes[i].debut === d && occupes[i].fin === f) occupes.splice(i, 1); }
      }
      return creneauxLibres(r, de, a, now, occupes);
    };
    const creneauLibre = async (debut: string, sauf?: string) => {
      const ms = Date.parse(debut);
      if (!Number.isFinite(ms)) return false;
      const jour = enParis(ms).jour;
      return (await libres(jour, jour, sauf)).some((c) => Date.parse(c.debut) === ms);
    };

    if (body.action === "creneaux") {
      const de = String(body.de || ""), a = String(body.a || "");
      if (!JOUR.test(de) || !JOUR.test(a) || a < de) return json({ error: "Dates invalides." }, 400);
      if (!r.actif) return json({ creneaux: [], ferme: true });
      return json({ creneaux: await libres(de, a), duree: r.duree_min });
    }

    if (body.action === "reserver") {
      if (body.site) return json({ ok: true }); // champ piège rempli par un robot
      if (!r.actif) return json({ error: "La prise de rendez-vous est momentanément fermée." }, 403);
      const nom = coupe(body.nom, 80), email = coupe(body.email, 160).toLowerCase(), etablissement = coupe(body.etablissement, 120);
      const objet = OBJETS.includes(body.objet) ? body.objet : "", message = String(body.message ?? "").trim().slice(0, 1000);
      if (nom.length < 2) return json({ error: "Indiquez votre nom." }, 400);
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || /@mathcollege\.local$/.test(email)) return json({ error: "Indiquez une adresse e-mail valide." }, 400);
      if (!objet) return json({ error: "Choisissez l'objet du rendez-vous." }, 400);
      const { count } = await db.from("rdv_reservations").select("id", { count: "exact", head: true }).eq("email", email).eq("statut", "confirme").gt("debut", new Date(now).toISOString());
      if ((count || 0) >= 2) return json({ error: "Vous avez déjà deux rendez-vous à venir : utilisez le lien reçu par e-mail pour les modifier." }, 400);
      if (!(await creneauLibre(String(body.debut)))) return json({ error: "Ce créneau n'est plus disponible : choisissez-en un autre.", indisponible: true }, 409);
      let user_id: string | null = null;
      const auth = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
      if (auth) { try { const { data } = await db.auth.getUser(auth); user_id = data?.user?.id || null; } catch (_e) { /* visiteur */ } }
      const debut = Date.parse(String(body.debut));
      const { data: res, error } = await db.from("rdv_reservations").insert({ debut: new Date(debut).toISOString(), fin: new Date(debut + r.duree_min * 60000).toISOString(),
        nom, email, etablissement, objet, message, user_id }).select("*").single();
      if (error) return json({ error: /duplicate|unique/i.test(error.message) ? "Ce créneau vient d'être réservé : choisissez-en un autre." : "Réservation impossible pour le moment.", indisponible: true }, 409);
      const g = await google();
      if (g) {
        const ev = await googleCreer(g, res);
        if (ev) { res.google_event_id = ev.id; res.meet_url = ev.meet || null; await db.from("rdv_reservations").update({ google_event_id: ev.id, meet_url: ev.meet || null }).eq("id", res.id); }
      }
      await mailConfirmation(res, visioDe(res));
      await prevenirAdmin(`RDV ${dateLongue(debut)} ${heure(debut)} : ${nom}${etablissement ? " (" + etablissement + ")" : ""}, ${objet}, ${email}`, res);
      return json({ ok: true, debut: res.debut, fin: res.fin, jeton: res.jeton, visio: !!visioDe(res) });
    }

    if (["voir", "annuler", "deplacer"].includes(body.action)) {
      const { data: res } = await db.from("rdv_reservations").select("*").eq("jeton", String(body.jeton || "")).maybeSingle();
      if (!res) return json({ error: "Ce lien de rendez-vous n'est pas valable." }, 404);
      const passe = Date.parse(res.debut) <= now;
      if (body.action === "voir") return json({ rdv: { debut: res.debut, fin: res.fin, nom: res.nom, objet: res.objet, statut: res.statut, passe, visio: visioDe(res) } });
      if (res.statut !== "confirme" || passe) return json({ error: res.statut !== "confirme" ? "Ce rendez-vous est déjà annulé." : "Ce rendez-vous est passé." }, 400);
      if (body.action === "annuler") {
        await db.from("rdv_reservations").update({ statut: "annule", annule_at: new Date().toISOString(), annule_par: "client" }).eq("id", res.id);
        const g = res.google_event_id ? await google() : null;
        if (g) await googleSupprimer(g, res.google_event_id);
        await mailAnnulation(res, false);
        await prevenirAdmin(`RDV annulé ${dateLongue(Date.parse(res.debut))} ${heure(Date.parse(res.debut))} : ${res.nom}`, res, true);
        return json({ ok: true });
      }
      if (!(await creneauLibre(String(body.debut), res.id))) return json({ error: "Ce créneau n'est plus disponible : choisissez-en un autre.", indisponible: true }, 409);
      const debut = Date.parse(String(body.debut)), ancien = res.debut;
      const maj = { debut: new Date(debut).toISOString(), fin: new Date(debut + r.duree_min * 60000).toISOString(), rappel_envoye_at: null };
      const { error } = await db.from("rdv_reservations").update(maj).eq("id", res.id);
      if (error) return json({ error: "Ce créneau vient d'être réservé : choisissez-en un autre.", indisponible: true }, 409);
      Object.assign(res, maj);
      const g = res.google_event_id ? await google() : null;
      if (g) await googleModifier(g, res);
      await mailConfirmation(res, visioDe(res), true);
      await prevenirAdmin(`RDV déplacé : ${res.nom}, du ${dateLongue(Date.parse(ancien))} ${heure(Date.parse(ancien))} au ${dateLongue(debut)} ${heure(debut)}`, res);
      return json({ ok: true, debut: res.debut, fin: res.fin });
    }

    if (body.action === "rappels") {
      if (!r.rappel_veille) return json({ ok: true, envoyes: 0 });
      const { data: dus } = await db.from("rdv_reservations").select("*").eq("statut", "confirme").is("rappel_envoye_at", null)
        .gt("debut", new Date(now + 2 * 3600000).toISOString()).lte("debut", new Date(now + 26 * 3600000).toISOString());
      let n = 0;
      for (const res of dus || []) {
        if (Date.parse(res.created_at) > Date.parse(res.debut) - 20 * 3600000) continue; // réservé la veille : pas de rappel
        await db.from("rdv_reservations").update({ rappel_envoye_at: new Date().toISOString() }).eq("id", res.id);
        await mailRappel(res, visioDe(res)); n++;
      }
      return json({ ok: true, envoyes: n });
    }

    if (body.action === "admin-annuler") {
      const auth = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
      const { data: u } = await db.auth.getUser(auth);
      const { data: p } = u?.user ? await db.from("profiles").select("role").eq("id", u.user.id).maybeSingle() : { data: null };
      if (!p || p.role !== "admin") return json({ error: "Réservé à l'administrateur." }, 403);
      const { data: res } = await db.from("rdv_reservations").select("*").eq("id", String(body.id || "")).maybeSingle();
      if (!res || res.statut !== "confirme") return json({ error: "Rendez-vous introuvable ou déjà annulé." }, 404);
      await db.from("rdv_reservations").update({ statut: "annule", annule_at: new Date().toISOString(), annule_par: "admin" }).eq("id", res.id);
      const g = res.google_event_id ? await google() : null;
      if (g) await googleSupprimer(g, res.google_event_id);
      if (body.prevenir !== false) await mailAnnulation(res, true);
      return json({ ok: true });
    }

    return json({ error: "action inconnue" }, 400);
  } catch (e) {
    console.error("rdv", String(e));
    return json({ error: "Erreur du serveur de rendez-vous." }, 500);
  }
});
