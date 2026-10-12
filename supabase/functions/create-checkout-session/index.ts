// supabase/functions/create-checkout-session/index.ts
//
// Ancien abonnement annuel Stripe (mode « subscription », prix STRIPE_PRICE_ID), remplacé par
// les offres prof-offre et famille. Le site ne l'appelle plus, mais la fonction restait déployée
// et pouvait encore créer un vrai paiement. Désactivée le 12/10/2026 (demandé : « bloque
// l'ouverture des ventes ») : elle refuse désormais toute demande.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve((req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  return new Response(JSON.stringify({ error: "Ce mode de paiement n'existe plus : voir « Mon abonnement »." }), {
    status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
