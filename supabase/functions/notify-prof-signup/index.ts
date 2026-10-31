// supabase/functions/notify-prof-signup/index.ts
//
// Envoie un e-mail à contact@latelierdesmaths.fr à chaque nouvelle demande
// d'inscription prof (appelé par le déclencheur inscription_prof_auto à la confirmation de l'adresse, et par le site en
// secours : submitProfSignup() dans app.js).
//
// Utilise Resend (https://resend.com) comme service d'envoi. Nécessite le secret
// RESEND_API_KEY (Dashboard Supabase > Edge Functions > Secrets).
// Code récupéré du projet le 31/10/2026 (il n'était pas dans le dépôt) pour passer au domaine latelierdesmaths.fr.
//
// Tant que ce secret n'est pas configuré, la fonction répond simplement une
// erreur -- volontairement NON bloquante côté client (l'inscription elle-même
// réussit dans tous les cas, seule la notification échoue silencieusement).
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}
// Envoi Resend : expéditeur en @latelierdesmaths.fr (demandé le 31/10/2026 : « Tout ce qui concerne l'atelier des maths doit
// avoir comme domaine latelierdesmaths.fr, y compris mailing »). Tant que ce domaine n'est pas vérifié chez Resend, l'envoi
// est refusé : on renvoie alors depuis l'ancien domaine, pour ne perdre aucun e-mail.
async function envoiResend(init) {
  const res = await fetch("https://api.resend.com/emails", init);
  if (res.ok || ![403, 422].includes(res.status)) return res;
  const err = await res.clone().text();
  if (!/domain/i.test(err)) return res;
  console.warn("Resend : domaine latelierdesmaths.fr refusé, repli sur latelieraugmente.fr", err);
  return fetch("https://api.resend.com/emails", { ...init, body: String(init.body).replace(/@latelierdesmaths\.fr>/g, "@latelieraugmente.fr>") });
}
const DEST_EMAIL = "contact@latelierdesmaths.fr";
serve(async (req)=>{
  if (req.method === "OPTIONS") return new Response("ok", {
    headers: corsHeaders
  });
  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return json({
        error: "RESEND_API_KEY non configurée sur le projet Supabase (Edge Functions > Secrets)."
      }, 500);
    }
    const body = await req.json();
    const { nom, prenom, email, uai } = body;
    if (!nom || !prenom || !email || !uai) {
      return json({
        error: "nom, prenom, email et uai sont requis"
      }, 400);
    }
    const subject = `Nouvelle inscription prof : ${prenom} ${nom}`;
    const text = [
      "Nouvelle demande d'inscription sur L'Atelier des Maths.",
      "",
      `Nom : ${nom}`,
      `Prénom : ${prenom}`,
      `Email académique : ${email}`,
      `UAI établissement : ${uai}`,
      "",
      "À valider depuis le site : Administration > 📝 Inscriptions."
    ].join("\n");
    const res = await envoiResend({
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "L'Atelier des Maths <notifications@latelierdesmaths.fr>",
        to: DEST_EMAIL,
        reply_to: email,
        subject,
        text
      })
    });
    if (!res.ok) {
      const errText = await res.text();
      return json({
        error: `Échec de l'envoi (Resend) : ${errText}`
      }, 502);
    }
    return json({
      success: true
    });
  } catch (e) {
    return json({
      error: String(e)
    }, 500);
  }
});
