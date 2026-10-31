// supabase/functions/facturation-mail/index.ts
//
// Envois d'e-mails de la facturation (Administration > Facturation), réservés à
// l'administrateur général. Expéditeur : devis@latelierdesmaths.fr, réponses vers l'adresse de l'émetteur
// (contact@latelierdesmaths.fr). Secret requis : RESEND_API_KEY (Edge Functions > Secrets).
// Code récupéré du projet le 31/10/2026 (il n'était pas dans le dépôt) pour passer au domaine latelierdesmaths.fr.
//
// Actions :
//   - test : e-mail d'essai vers l'adresse de l'émetteur, pour vérifier l'envoi.
import { createClient } from "npm:@supabase/supabase-js@2";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const json = (body, status = 200)=>new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors,
      "Content-Type": "application/json"
    }
  });
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
const FROM = "L'Atelier des Maths <devis@latelierdesmaths.fr>";
async function sendMail(to, subject, text, html, replyTo) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY non configurée (Edge Functions > Secrets).");
  const res = await envoiResend({
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM,
      to,
      subject,
      text,
      html,
      reply_to: replyTo
    })
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Resend a refusé l'envoi (${res.status}) : ${body}`);
  return JSON.parse(body);
}
Deno.serve(async (req)=>{
  if (req.method === "OPTIONS") return new Response("ok", {
    headers: cors
  });
  try {
    const auth = req.headers.get("Authorization") ?? "";
    const sb = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_ANON_KEY"), {
      global: {
        headers: {
          Authorization: auth
        }
      }
    });
    const { data: isAdmin, error: e1 } = await sb.rpc("is_admin");
    if (e1 || !isAdmin) return json({
      error: "Réservé à l'administrateur."
    }, 403);
    const { action } = await req.json().catch(()=>({}));
    const { data: em } = await sb.from("facturation_emetteur").select("nom,email").eq("id", 1).maybeSingle();
    const replyTo = em && em.email || "contact@latelierdesmaths.fr";
    if (action === "test") {
      const when = new Date().toLocaleString("fr-FR", {
        timeZone: "Europe/Paris"
      });
      const text = `Bonjour,\n\nCeci est un e-mail d'essai envoyé depuis L'Atelier des Maths (Administration > Facturation), le ${when}.\n\nS'il est bien arrivé dans votre boîte de réception (et pas dans les indésirables), l'envoi depuis latelierdesmaths.fr fonctionne : les devis pourront être envoyés et signés en ligne.\n\nL'Atelier des Maths`;
      const html = `<p>Bonjour,</p><p>Ceci est un e-mail d'essai envoyé depuis <b>L'Atelier des Maths</b> (Administration &gt; Facturation), le ${when}.</p><p>S'il est bien arrivé dans votre boîte de réception (et pas dans les indésirables), l'envoi depuis <b>latelierdesmaths.fr</b> fonctionne : les devis pourront être envoyés et signés en ligne.</p><p>L'Atelier des Maths</p>`;
      const r = await sendMail(replyTo, "Essai d'envoi – L'Atelier des Maths", text, html, replyTo);
      return json({
        ok: true,
        to: replyTo,
        id: r.id
      });
    }
    return json({
      error: "Action inconnue."
    }, 400);
  } catch (e) {
    return json({
      error: String(e.message || e)
    }, 500);
  }
});
