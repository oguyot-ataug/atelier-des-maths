// supabase/functions/voix/index.ts
//
// Voix naturelles pour la lecture à voix haute (Google Cloud Text-to-Speech, voix françaises) -- demandé le 02/11/2026
// (« Pour les voix sur le site… », « essayons », puis « ok on part sur cloud text-to-speech » : Microsoft Azure bloquait
// à la création du compte) : les mêmes voix agréables sur tous les appareils, au lieu des voix installées dans chaque navigateur.
//
//   etat  (public)   : { actif, voix: [{ id, genre }] } voix françaises disponibles (les plus naturelles : Chirp 3 HD, sinon
//                      Neural2, sinon WaveNet ; deux voix de femme et deux d'homme), si le plafond du mois n'est pas atteint.
//   lire  (public si l'audio existe déjà, sinon compte connecté) : { texte, voix } → { url } du fichier MP3.
//
// Chaque texte n'est synthétisé qu'UNE fois par voix : le fichier est rangé dans le stockage public « voix »
// (empreinte SHA-256 de la voix et du texte) ; les lectures suivantes, par n'importe qui, le réutilisent sans rien payer.
// On n'envoie à Google que des textes de cours et d'exercices (jamais de nom d'élève).
// Plafonds : VOIX_MAX_MOIS caractères synthétisés par mois pour tout le site (450 000 par défaut), VOIX_MAX_JOUR par compte
// et par jour (20 000 par défaut). Au-delà, ou en cas de souci : le site reprend les voix de l'appareil.
// Identification Google : le compte de service déjà utilisé pour l'agenda des rendez-vous (secret GOOGLE_RDV_CLE, clé JSON),
// sans délégation (portée cloud-platform) ; l'API « Cloud Text-to-Speech » doit être activée dans son projet Google Cloud.
// SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY (fournis).
// verify_jwt = false : l'état et les fichiers déjà prêts sont publics ; la synthèse vérifie le jeton de session.

import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const MAX_TEXTE = 2500;
const BUCKET = "voix";

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
const maxMois = () => Number(Deno.env.get("VOIX_MAX_MOIS")) || 450000;
const maxJour = () => Number(Deno.env.get("VOIX_MAX_JOUR")) || 20000;
const jourParis = () => new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(new Date()); // AAAA-MM-JJ

// ---------- Google (compte de service, jeton d'une heure) ----------
const b64url = (octets: Uint8Array) => { let s = ""; for (const o of octets) s += String.fromCharCode(o); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
let jetonGoogle: { valeur: string; expire: number } | null = null;
async function google(): Promise<string | null> {
  const brut = Deno.env.get("GOOGLE_TTS_CLE") || Deno.env.get("GOOGLE_RDV_CLE");
  if (!brut) return null;
  if (jetonGoogle && jetonGoogle.expire > Date.now() + 60000) return jetonGoogle.valeur;
  try {
    const cle = JSON.parse(brut), maintenant = Math.floor(Date.now() / 1000);
    const enc = (o: unknown) => b64url(new TextEncoder().encode(JSON.stringify(o)));
    const signe = enc({ alg: "RS256", typ: "JWT" }) + "." + enc({ iss: cle.client_email, scope: "https://www.googleapis.com/auth/cloud-platform",
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
// Voix françaises proposées : deux de femme et deux d'homme, du type le plus naturel disponible. Liste gardée une heure.
type Voix = { id: string; genre: "F" | "M" };
let voixCache: { liste: Voix[]; expire: number } | null = null;
let voixErreur = "";
async function voixDisponibles(tok: string): Promise<Voix[]> {
  if (voixCache && voixCache.expire > Date.now()) return voixCache.liste;
  const r = await fetch("https://texttospeech.googleapis.com/v1/voices?languageCode=fr-FR", { headers: { Authorization: `Bearer ${tok}` } });
  if (!r.ok) { voixErreur = `${r.status} ${(await r.text()).slice(0, 200)}`; console.error("Google TTS voix", voixErreur); return []; }
  voixErreur = "";
  const toutes = ((await r.json()).voices || []) as { name: string; ssmlGender: string }[];
  const fr = toutes.filter((v) => /^fr-FR-/.test(v.name));
  let liste: Voix[] = [];
  for (const type of ["Chirp3-HD", "Neural2", "Wavenet"]) {
    const t = fr.filter((v) => v.name.startsWith(`fr-FR-${type}-`)).sort((a, b) => a.name.localeCompare(b.name));
    const f = t.filter((v) => v.ssmlGender === "FEMALE").slice(0, 2), m = t.filter((v) => v.ssmlGender === "MALE").slice(0, 2);
    if (f.length + m.length >= 2) { liste = [...f.map((v) => ({ id: v.name, genre: "F" as const })), ...m.map((v) => ({ id: v.name, genre: "M" as const }))]; break; }
  }
  voixCache = { liste, expire: Date.now() + 3600000 };
  return liste;
}

async function utiliseCeMois(db: ReturnType<typeof admin>): Promise<number> {
  const debut = jourParis().slice(0, 8) + "01";
  const { data } = await db.from("voix_usage").select("caracteres").gte("jour", debut);
  return (data || []).reduce((s: number, r: { caracteres: number }) => s + (r.caracteres || 0), 0);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = await req.json().catch(() => ({}));
    const db = admin();

    if (body.action === "etat") {
      const tok = await google();
      if (!tok) return json({ actif: false, raison: "non configuré" });
      const liste = await voixDisponibles(tok);
      if (!liste.length) return json({ actif: false, raison: voixErreur ? "API Text-to-Speech inaccessible" : "aucune voix", detail: voixErreur.slice(0, 160) });
      return json({ actif: (await utiliseCeMois(db)) < maxMois(), voix: liste });
    }

    if (body.action !== "lire") return json({ error: "Action inconnue." }, 400);
    const voix = String(body.voix ?? "");
    const texte = String(body.texte ?? "").replace(/\s+/g, " ").trim();
    if (!/^fr-FR-[A-Za-z0-9]+(-[A-Za-z0-9]+)+$/.test(voix)) return json({ error: "Voix inconnue." }, 400);
    if (!texte) return json({ error: "Texte vide." }, 400);
    if (texte.length > MAX_TEXTE) return json({ error: "Texte trop long." }, 413);

    // Déjà synthétisé : le fichier public sert à tout le monde.
    const chemin = `${voix}/${await sha256(voix + "|" + texte)}.mp3`;
    const url = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/${BUCKET}/${chemin}`;
    const deja = await fetch(url, { method: "HEAD" }).catch(() => null);
    if (deja && deja.ok) return json({ url, cache: true });

    // Nouvelle synthèse : compte connecté, Google joignable, voix proposée, plafonds respectés.
    const tok = await google();
    if (!tok) return json({ error: "Voix en ligne non configurées." }, 503);
    if (!(await voixDisponibles(tok)).some((v) => v.id === voix)) return json({ error: "Voix indisponible." }, 503);
    const jeton = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await db.auth.getUser(jeton);
    const uid = u?.user?.id;
    if (!uid) return json({ error: "Connectez-vous pour utiliser les voix en ligne." }, 401);
    if ((await utiliseCeMois(db)) + texte.length > maxMois()) return json({ error: "Plafond du mois atteint." }, 429);
    const jour = jourParis();
    const { data: lu } = await db.from("voix_usage").select("caracteres").eq("jour", jour).eq("user_id", uid).maybeSingle();
    const dejaJour = lu?.caracteres || 0;
    if (dejaJour + texte.length > maxJour()) return json({ error: "Plafond du jour atteint." }, 429);

    const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({ input: { text: texte }, voice: { languageCode: "fr-FR", name: voix }, audioConfig: { audioEncoding: "MP3" } }),
    });
    if (!res.ok) {
      console.error("Google TTS", res.status, (await res.text()).slice(0, 300));
      return json({ error: "Synthèse impossible pour le moment." }, 502);
    }
    const b64 = String((await res.json()).audioContent || "");
    if (!b64) return json({ error: "Synthèse vide." }, 502);
    const audio = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const { error: eUp } = await db.storage.from(BUCKET).upload(chemin, audio, { contentType: "audio/mpeg", cacheControl: "31536000", upsert: true });
    if (eUp) { console.error("stockage", eUp.message); return json({ error: "Enregistrement impossible." }, 500); }
    await db.from("voix_usage").upsert({ jour, user_id: uid, caracteres: dejaJour + texte.length }, { onConflict: "jour,user_id" });
    return json({ url, cache: false });
  } catch (e) {
    console.error("voix", (e as Error).message);
    return json({ error: "Erreur du serveur." }, 500);
  }
});
