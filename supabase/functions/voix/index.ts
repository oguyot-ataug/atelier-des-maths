// supabase/functions/voix/index.ts
//
// Voix naturelles pour la lecture à voix haute (Azure AI Speech, voix neuronales françaises) -- demandé le 02/11/2026
// (« Pour les voix sur le site… », puis « essayons ») : les mêmes voix agréables sur tous les appareils, au lieu des
// voix installées dans chaque navigateur.
//
//   etat  (public)   : { actif } les voix en ligne sont-elles disponibles (clé Azure configurée, plafond du mois non atteint).
//   lire  (public si l'audio existe déjà, sinon compte connecté) : { texte, voix } → { url } du fichier MP3.
//
// Chaque texte n'est synthétisé qu'UNE fois par voix : le fichier est rangé dans le stockage public « voix »
// (empreinte SHA-256 de la voix et du texte) ; les lectures suivantes, par n'importe qui, le réutilisent sans rien payer.
// On n'envoie à Azure que des textes de cours et d'exercices (jamais de nom d'élève) ; région France (francecentral).
// Plafonds : VOIX_MAX_MOIS caractères synthétisés par mois pour tout le site (450 000 par défaut, sous l'offre gratuite
// d'Azure), VOIX_MAX_JOUR par compte et par jour (20 000 par défaut). Au-delà : le site reprend les voix de l'appareil.
// Secrets : AZURE_SPEECH_KEY (clé de la ressource Speech), AZURE_SPEECH_REGION (francecentral par défaut) ;
// SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY (fournis).
// verify_jwt = false : l'état et les fichiers déjà prêts sont publics ; la synthèse vérifie le jeton de session.

import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

// Voix proposées (fr-FR, neuronales) : le site les affiche sous ces noms.
const VOIX = new Set(["fr-FR-DeniseNeural", "fr-FR-HenriNeural", "fr-FR-EloiseNeural", "fr-FR-VivienneMultilingualNeural", "fr-FR-RemyMultilingualNeural"]);
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
const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const maxMois = () => Number(Deno.env.get("VOIX_MAX_MOIS")) || 450000;
const maxJour = () => Number(Deno.env.get("VOIX_MAX_JOUR")) || 20000;
const jourParis = () => new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(new Date()); // AAAA-MM-JJ

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
    const cle = Deno.env.get("AZURE_SPEECH_KEY") || "";
    const region = (Deno.env.get("AZURE_SPEECH_REGION") || "francecentral").replace(/[^a-z0-9]/gi, "");

    if (body.action === "etat") {
      if (!cle) return json({ actif: false, raison: "non configuré" });
      return json({ actif: (await utiliseCeMois(db)) < maxMois() });
    }

    if (body.action !== "lire") return json({ error: "Action inconnue." }, 400);
    const voix = String(body.voix ?? "");
    const texte = String(body.texte ?? "").replace(/\s+/g, " ").trim();
    if (!VOIX.has(voix)) return json({ error: "Voix inconnue." }, 400);
    if (!texte) return json({ error: "Texte vide." }, 400);
    if (texte.length > MAX_TEXTE) return json({ error: "Texte trop long." }, 413);

    // Déjà synthétisé : le fichier public sert à tout le monde.
    const chemin = `${voix}/${await sha256(voix + "|" + texte)}.mp3`;
    const url = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/${BUCKET}/${chemin}`;
    const deja = await fetch(url, { method: "HEAD" }).catch(() => null);
    if (deja && deja.ok) return json({ url, cache: true });

    // Nouvelle synthèse : compte connecté, clé configurée, plafonds respectés.
    if (!cle) return json({ error: "Voix en ligne non configurées." }, 503);
    const jeton = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await db.auth.getUser(jeton);
    const uid = u?.user?.id;
    if (!uid) return json({ error: "Connectez-vous pour utiliser les voix en ligne." }, 401);
    if ((await utiliseCeMois(db)) + texte.length > maxMois()) return json({ error: "Plafond du mois atteint." }, 429);
    const jour = jourParis();
    const { data: lu } = await db.from("voix_usage").select("caracteres").eq("jour", jour).eq("user_id", uid).maybeSingle();
    const dejaJour = lu?.caracteres || 0;
    if (dejaJour + texte.length > maxJour()) return json({ error: "Plafond du jour atteint." }, 429);

    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fr-FR"><voice name="${voix}">${xml(texte)}</voice></speak>`;
    const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": cle,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "latelierdesmaths",
      },
      body: ssml,
    });
    if (!res.ok) {
      console.error("Azure TTS", res.status, (await res.text()).slice(0, 300));
      return json({ error: "Synthèse impossible pour le moment." }, 502);
    }
    const audio = new Uint8Array(await res.arrayBuffer());
    const { error: eUp } = await db.storage.from(BUCKET).upload(chemin, audio, { contentType: "audio/mpeg", cacheControl: "31536000", upsert: true });
    if (eUp) { console.error("stockage", eUp.message); return json({ error: "Enregistrement impossible." }, 500); }
    await db.from("voix_usage").upsert({ jour, user_id: uid, caracteres: dejaJour + texte.length }, { onConflict: "jour,user_id" });
    return json({ url, cache: false });
  } catch (e) {
    console.error("voix", (e as Error).message);
    return json({ error: "Erreur du serveur." }, 500);
  }
});
