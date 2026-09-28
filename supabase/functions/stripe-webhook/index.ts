// supabase/functions/stripe-webhook/index.ts
//
// Reçoit les événements Stripe (paiement réussi, abonnement modifié/annulé) et met à
// jour la table profiles en conséquence. Appelé directement par Stripe, PAS par le
// site (donc verify_jwt désactivé -- la sécurité vient ici de la vérification de
// signature Stripe elle-même, pas d'un jeton Supabase).
//
// Offre Famille (v4) : une session Checkout dont metadata.kind = "famille" est un paiement
// unique ; elle active l'accès de la famille (RPC famille_activer, idempotente) et ne touche
// JAMAIS aux champs d'abonnement professeur de profiles.
// MODE TEST (v5) : un événement signé avec STRIPE_TEST_WEBHOOK_SECRET (webhook créé dans le mode
// test de Stripe) ne sert QU'AUX offres Famille et professeur, et n'ouvre l'accès que d'un compte
// marqué stripe_test par l'administrateur (contrôlé dans famille_activer / prof_activer).
//
// FACTURE (v9) : après l'activation, la facture est émise dans la série de L'Atelier Augmenté
// (famille_facturer : F-AAAA-NNN, ou TEST-AAAA-NNN pour un paiement test) avec le nom et l'adresse
// saisis sur Stripe, puis un e-mail part de factures@latelieraugmente.fr (Resend) vers le parent.
//
// OFFRES PROFESSEUR (v10) : metadata.kind = "prof" (fonction prof-offre) : Professeur seul ou
// Professeur particulier, paiement unique pour l'année scolaire ; prof_activer puis prof_facturer,
// e-mail vers le professeur (facture dans « Mon abonnement »).
//
// Secrets nécessaires (Project Settings > Edge Functions > Secrets) :
//   STRIPE_WEBHOOK_SECRET  (whsec_..., donné par Stripe à la création du webhook)
//   SUPABASE_SERVICE_ROLE_KEY (déjà configuré, utilisé par admin-create-user)
//
// Configuration côté Stripe (Dashboard > Développeurs > Webhooks) :
//   URL : https://rngzubhnypmistjsumpz.supabase.co/functions/v1/stripe-webhook
//   Événements à écouter : checkout.session.completed,
//     customer.subscription.updated, customer.subscription.deleted

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function esc(s: unknown): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function euros(n: number): string { return Number(n).toFixed(2).replace(".", ",") + " €"; }

// E-mail d'envoi de la facture (aux couleurs du site) ; la facture elle-même se consulte et se
// télécharge dans l'Espace famille (ou « Mon abonnement » pour un professeur).
async function envoyerFacture(f: any, prof = false): Promise<void> {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key || !f?.email) return;
  const lien = prof ? "https://maths.latelieraugmente.fr/#/abonnement" : "https://maths.latelieraugmente.fr/#/famille";
  const ouvert = prof ? "votre offre est active" : "l'accès de votre famille est ouvert";
  const ou = prof ? "dans « Mon abonnement »" : "dans votre Espace famille, rubrique « Mes factures »";
  const html = `<div style="background:#f6f4f0;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1c2b39;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6e2da;">
    <tr><td style="background:#0c5ba0;padding:20px 24px;color:#fff;"><div style="font-size:22px;font-weight:bold;">L'Atelier des Maths</div><div style="font-size:13px;opacity:.85;margin-top:2px;">L'Atelier Augmenté · maths.latelieraugmente.fr</div></td></tr>
    <tr><td style="padding:24px;">
      ${f.test ? '<p style="background:#efe9fb;color:#4b2c91;border-radius:8px;padding:8px 12px;font-size:13px;margin:0 0 14px;"><b>Paiement de test</b> : facture sans valeur, aucun argent n\'a été prélevé.</p>' : ""}
      <p style="font-size:17px;font-weight:bold;margin:0 0 12px;">Merci${f.prenom ? " " + esc(f.prenom) : ""} !</p>
      <p style="font-size:15px;line-height:1.55;margin:0 0 16px;">Votre paiement de <b>${euros(f.total)}</b> est bien reçu et ${ouvert}. Votre facture <b>${esc(f.numero)}</b> est disponible ${ou} : vous pouvez la consulter et la télécharger à tout moment.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 18px;"><tr><td style="background:#ff8208;border-radius:10px;"><a href="${lien}" style="display:inline-block;padding:14px 28px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;">Voir ma facture</a></td></tr></table>
      <p style="font-size:13px;color:#6b7785;line-height:1.5;margin:0;">Rappel : paiement unique, sans reconduction automatique. Une question ? Répondez simplement à cet e-mail.</p>
    </td></tr>
    <tr><td style="padding:14px 24px;background:#faf9f7;border-top:1px solid #eeeae3;font-size:12px;color:#6b7785;">L'Atelier Augmenté · contact@latelieraugmente.fr</td></tr>
  </table></div>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "L'Atelier Augmenté <factures@latelieraugmente.fr>", to: [f.email], reply_to: "contact@latelieraugmente.fr",
        subject: (f.test ? "[TEST] " : "") + "Votre facture " + f.numero + " – L'Atelier des Maths",
        html,
        text: "Merci ! Votre paiement de " + euros(f.total) + " est bien reçu. Votre facture " + f.numero + " est disponible " + ou + " : " + lien,
      }),
    });
  } catch (_e) { /* la facture reste consultable sur le site */ }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

// Vérification manuelle de la signature Stripe (HMAC SHA-256), sans SDK, pour rester
// simple et fiable en environnement Deno. Voir https://stripe.com/docs/webhooks#verify-manually
async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  const parts: Record<string, string> = {};
  for (const kv of sigHeader.split(",")) {
    const [k, v] = kv.split("=");
    parts[k] = v;
  }
  if (!parts.t || !parts.v1) return false;
  const signedPayload = `${parts.t}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const expected = Array.from(new Uint8Array(sigBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
  return expected === parts.v1;
}

// Nom et adresse saisis sur la page de paiement Stripe (pour la facture).
function clientDe(session: any) {
  const cd = session.customer_details || {};
  const a = cd.address || {};
  const adresse = [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(" "), a.country && a.country !== "FR" ? a.country : ""]
    .filter((x: string) => x && String(x).trim()).join("\n");
  return { nom: cd.name || "", adresse, email: cd.email || session.customer_email || "" };
}

serve(async (req) => {
  try {
    const sig = req.headers.get("stripe-signature") || "";
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const rawBody = await req.text();

    const testSecret = Deno.env.get("STRIPE_TEST_WEBHOOK_SECRET");
    if (!webhookSecret && !testSecret) return json({ error: "STRIPE_WEBHOOK_SECRET non configuré." }, 500);

    // Secret réel d'abord ; sinon secret de test (fonctionne même si le secret réel n'est pas
    // encore enregistré).
    let isTest = false;
    if (!(webhookSecret && await verifyStripeSignature(rawBody, sig, webhookSecret))) {
      if (!testSecret || !(await verifyStripeSignature(rawBody, sig, testSecret))) return json({ error: "signature invalide" }, 400);
      isTest = true;
    }

    const event = JSON.parse(rawBody);
    if (isTest && event.livemode !== false) return json({ error: "événement réel signé avec le secret de test" }, 400);
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceKey);

    if (event.type === "checkout.session.completed" && event.data.object?.metadata?.kind === "famille") {
      const session = event.data.object;
      const m = session.metadata;
      if (session.payment_status !== "paid") return json({ received: true, famille: "non payé" });
      const niveaux = String(m.niveaux || "").split(",").filter((n: string) => ["6e", "5e", "4e", "3e"].includes(n));
      const { error } = await adminClient.rpc("famille_activer", {
        p_session: session.id,
        p_parent: m.parent_id,
        p_niveaux: niveaux,
        p_montant: session.amount_total ?? parseInt(m.montant, 10),
        p_until: m.acces_until,
        p_renonciation: { date: m.renonciation, texte: "Accès immédiat demandé ; renonciation au droit de rétractation (art. L221-28 13° C. conso.)" },
        p_test: isTest,
        p_details: { promo: m.promo || "", libelle: m.libelle || "", detail: m.detail || "" },
      });
      if (error) return json({ error: error.message }, 500);
      // Facture (idempotente : si Stripe renvoie l'événement, la même facture est retrouvée).
      const { data: fac, error: fErr } = await adminClient.rpc("famille_facturer", { p_session: session.id, p_client: clientDe(session) });
      if (fErr) return json({ error: fErr.message }, 500);
      if (fac?.created) await envoyerFacture(fac);
      return json({ received: true, famille: true, facture: fac?.numero || null });
    }

    if (event.type === "checkout.session.completed" && event.data.object?.metadata?.kind === "prof") {
      const session = event.data.object;
      const m = session.metadata;
      if (session.payment_status !== "paid") return json({ received: true, prof: "non payé" });
      const niveaux = String(m.niveaux || "").split(",").filter((n: string) => ["6e", "5e", "4e", "3e"].includes(n));
      const { error } = await adminClient.rpc("prof_activer", {
        p_session: session.id,
        p_prof: m.prof_id,
        p_offre: m.offre,
        p_niveaux: niveaux,
        p_places: parseInt(m.places, 10) || 0,
        p_montant: session.amount_total ?? parseInt(m.montant, 10),
        p_until: m.acces_until,
        p_test: isTest,
        p_details: { libelle: m.libelle || "", detail: m.detail || "", renonciation: m.renonciation || "" },
        p_classes_sup: parseInt(m.classes_sup, 10) || 0,
      });
      if (error) return json({ error: error.message }, 500);
      const { data: fac, error: fErr } = await adminClient.rpc("prof_facturer", { p_session: session.id, p_client: clientDe(session) });
      if (fErr) return json({ error: fErr.message }, 500);
      if (fac?.created) await envoyerFacture(fac, true);
      return json({ received: true, prof: true, facture: fac?.numero || null });
    }

    // Mode test : rien d'autre (jamais les abonnements professeurs).
    if (isTest) return json({ received: true, test: true });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.client_reference_id;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      if (userId) {
        // Récupère la date de fin de période courante pour fixer subscription_expires_at.
        let expiresAt: string | null = null;
        if (subscriptionId) {
          const subRes = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
            headers: { "Authorization": `Bearer ${Deno.env.get("STRIPE_SECRET_KEY")}` },
          });
          const sub = await subRes.json();
          if (sub.current_period_end) expiresAt = new Date(sub.current_period_end * 1000).toISOString();
        }
        await adminClient.from("profiles").update({
          subscription_status: "active",
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          subscription_expires_at: expiresAt,
        }).eq("id", userId);
      }
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const customerId = sub.customer as string;
      const status = event.type === "customer.subscription.deleted" ? "cancelled"
        : (sub.status === "active" ? "active" : sub.status === "past_due" ? "active" : "expired");
      const expiresAt = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
      await adminClient.from("profiles").update({
        subscription_status: status,
        subscription_expires_at: expiresAt,
      }).eq("stripe_customer_id", customerId);
    }

    return json({ received: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
