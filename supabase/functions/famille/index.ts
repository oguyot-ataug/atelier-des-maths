// supabase/functions/famille/index.ts
//
// Offre Famille : tout ce qu'un parent fait passe par ici (clé service_role côté serveur
// uniquement ; le navigateur n'a qu'un droit de LECTURE sur les tables familles).
//
//  - inscription     : crée le profil parent + la déclaration (texte certifié, date, IP, navigateur) ;
//  - enfant-creer    : compte enfant (identifiant@mathcollege.local), 4 au plus, collège déclaré
//                      refusé s'il figure dans famille_exclusions ;
//  - enfant-mdp, enfant-supprimer, enfant-reglages (niveau, IA, quota) ;
//  - ia-parent       : le parent utilise lui-même l'IA avec sa clé ;
//  - paiement        : session Stripe Checkout (paiement unique, accès jusqu'au 31/08 de l'année
//                      scolaire, sans reconduction) ; l'activation est faite par stripe-webhook ;
//  - supprimer-compte: supprime le compte parent ET les comptes enfants.
//
// Secrets : SUPABASE_*, STRIPE_SECRET_KEY (déjà utilisés par les autres fonctions).
// MODE TEST : une famille marquée stripe_test par l'administrateur paie avec
// STRIPE_TEST_SECRET_KEY (cartes fictives Stripe) ; toutes les autres, en paiement réel.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

// Niveaux actuellement en ligne sur le site (la 3e est en vente depuis le build 818).
const NIVEAUX_DISPONIBLES = ["6e", "5e", "4e", "3e"];
const ORDRE = ["6e", "5e", "4e", "3e"];
// Prix TTC en centimes selon le nombre de niveaux choisis (3 et plus : collège complet), lus dans
// famille_parametres (modifiables par l'administrateur) ; un code promo peut fixer d'autres prix.
function prixDe(grille: Record<string, number>, n: number): number {
  if (n <= 0) return 0;
  return Number(grille[String(Math.min(n, 3))] ?? 0);
}

// Accès payé jusqu'au 31 août de l'année scolaire ; à partir de juin, on paie l'année suivante.
function finAnneeScolaire(d = new Date()): string {
  const y = d.getUTCFullYear(), m = d.getUTCMonth() + 1;
  return (m >= 6 ? y + 1 : y) + "-08-31";
}

const CERTIFICATION_VERSION = "2026-09-27";
const CERTIFICATION_TEXTE =
  "Je certifie qu'aucun de mes enfants inscrits sur L'Atelier des Maths n'est scolarisé à l'Ensemble scolaire La Malgrange (Jarville-la-Malgrange), " +
  "établissement où enseigne le concepteur du site, " +
  "et je m'engage à ne pas créer de compte pour un enfant qui y serait scolarisé. Je reconnais qu'une fausse déclaration entraîne la fermeture " +
  "des comptes sans remboursement.";

function normIdent(s: string): string {
  return String(s || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    const caller = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await caller.auth.getUser(jwt);
    if (!user) return json({ error: "Connectez-vous d'abord." }, 401);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "");
    const { data: profile } = await admin.from("profiles").select("role, nom, prenom, email").eq("id", user.id).maybeSingle();

    // ---------- Inscription du parent (compte auth déjà créé côté navigateur) ----------
    if (action === "inscription") {
      if (profile) return json({ error: "Ce compte existe déjà sur le site (professeur, élève ou parent)." }, 400);
      const prenom = String(body.prenom || "").trim().slice(0, 60);
      const nom = String(body.nom || "").trim().slice(0, 60);
      if (!prenom || !nom) return json({ error: "Prénom et nom requis." }, 400);
      if (body.certification !== true) return json({ error: "La déclaration sur l'honneur est obligatoire." }, 400);
      if (body.cgv !== true) return json({ error: "Merci d'accepter les conditions générales de vente." }, 400);
      const certification = {
        texte: CERTIFICATION_TEXTE, version: CERTIFICATION_VERSION, cgv_acceptees: true,
        date: new Date().toISOString(),
        ip: (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null,
        navigateur: (req.headers.get("user-agent") || "").slice(0, 300) || null,
      };
      const { error: pErr } = await admin.from("profiles").insert({
        id: user.id, role: "parent", prenom, nom, email: user.email, uai: null,
        signup_status: "approved", subscription_status: "active", must_change_password: false,
      });
      if (pErr) return json({ error: pErr.message }, 400);
      const { error: fErr } = await admin.from("familles").insert({ parent_id: user.id, certification });
      if (fErr) { await admin.from("profiles").delete().eq("id", user.id); return json({ error: fErr.message }, 400); }
      return json({ ok: true });
    }

    if (!profile || profile.role !== "parent") return json({ error: "Réservé aux comptes Famille." }, 403);
    const { data: famille } = await admin.from("familles").select("*").eq("parent_id", user.id).single();
    if (!famille) return json({ error: "Famille introuvable." }, 404);
    const { data: enfants } = await admin.from("famille_enfants").select("enfant_id").eq("parent_id", user.id);
    const mesEnfants = new Set((enfants || []).map((e: any) => e.enfant_id));
    // Tables dont la clé étrangère n'est pas « on delete cascade » : on les vide avant de
    // supprimer le compte (sinon la suppression échoue dès que l'enfant a joué ou enregistré).
    async function supprimerCompte(id: string) {
      await admin.from("ceb_results").delete().eq("student_id", id);
      await admin.from("figures_sauvegardees").delete().eq("user_id", id);
      await admin.from("devoirs_rendus").delete().eq("student_id", id);
      await admin.from("permis_rapporteur_resultats").delete().eq("eleve_id", id);
      await admin.from("bug_reports").delete().eq("reporter_id", id);
      return await admin.auth.admin.deleteUser(id);
    }
    const enfantCible = (): string | null => {
      const id = String(body.enfant_id || "");
      return mesEnfants.has(id) ? id : null;
    };

    // Collège déclaré pour un enfant : UAI valide et non exclu, ou « hors collège ».
    async function verifierCollege(): Promise<{ uai: string | null; hors: boolean } | { error: string }> {
      const hors = body.hors_college === true;
      if (hors) return { uai: null, hors: true };
      const uai = String(body.uai || "").trim().toUpperCase();
      if (!/^[0-9]{7}[A-Z]$/.test(uai)) return { error: "Le code UAI du collège comporte 7 chiffres suivis d'une lettre (ex. 0541234X)." };
      const { data: exclu } = await admin.from("famille_exclusions").select("uai").eq("uai", uai).maybeSingle();
      if (exclu) return { error: "L'offre Famille n'est pas proposée aux élèves de cet établissement. Leur professeur peut leur donner accès au site dans le cadre de la classe." };
      return { uai, hors: false };
    }

    if (action === "enfant-creer") {
      if (mesEnfants.size >= 4) return json({ error: "Une famille peut avoir au plus 4 comptes enfants." }, 400);
      const prenom = String(body.prenom || "").trim().slice(0, 60);
      if (!prenom) return json({ error: "Prénom de l'enfant requis." }, 400);
      const ident = normIdent(body.identifiant);
      if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(ident)) return json({ error: "Identifiant : 3 à 30 caractères (lettres, chiffres, point, tiret), sans espace ni @." }, 400);
      const password = String(body.password || "");
      if (password.length < 6) return json({ error: "Mot de passe de l'enfant : 6 caractères minimum." }, 400);
      const niveau = body.niveau && ORDRE.includes(body.niveau) ? body.niveau : null;
      const college = await verifierCollege();
      if ("error" in college) return json({ error: college.error }, 400);
      const email = ident + "@mathcollege.local";
      const { data: created, error: cErr } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
      if (cErr) {
        return json({ error: /already|exists|registered/i.test(cErr.message) ? "Cet identifiant est déjà pris : choisissez-en un autre (ex. " + ident + ".2026)." : cErr.message }, 400);
      }
      const id = created.user!.id;
      const { error: pErr } = await admin.from("profiles").insert({
        id, role: "eleve", prenom, nom: profile.nom, email, uai: null,
        signup_status: "approved", subscription_status: "active", must_change_password: false,
      });
      const { error: eErr } = pErr ? { error: pErr } : await admin.from("famille_enfants").insert({
        enfant_id: id, parent_id: user.id, niveau, uai: college.uai, hors_college: college.hors,
      });
      if (pErr || eErr) {
        await admin.auth.admin.deleteUser(id);
        return json({ error: (pErr || eErr)!.message }, 400);
      }
      return json({ ok: true, id, identifiant: ident });
    }

    if (action === "enfant-mdp") {
      const id = enfantCible();
      if (!id) return json({ error: "Cet enfant n'appartient pas à votre famille." }, 403);
      const password = String(body.password || "");
      if (password.length < 6) return json({ error: "Mot de passe : 6 caractères minimum." }, 400);
      const { error } = await admin.auth.admin.updateUserById(id, { password });
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    if (action === "enfant-supprimer") {
      const id = enfantCible();
      if (!id) return json({ error: "Cet enfant n'appartient pas à votre famille." }, 403);
      const { error } = await supprimerCompte(id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    if (action === "enfant-reglages") {
      const id = enfantCible();
      if (!id) return json({ error: "Cet enfant n'appartient pas à votre famille." }, 403);
      const upd: Record<string, unknown> = {};
      if ("niveau" in body) upd.niveau = ORDRE.includes(body.niveau) ? body.niveau : null;
      if ("ia_enabled" in body) upd.ia_enabled = body.ia_enabled === true;
      if ("ia_features" in body) {
        const f = body.ia_features || {};
        upd.ia_features = { quiz: f.quiz === true, tableau: f.tableau === true, figure: f.figure === true };
      }
      if ("ia_quota" in body) {
        upd.ia_quota = body.ia_quota === null || body.ia_quota === "" ? null : Math.max(0, Math.min(1000, parseInt(body.ia_quota, 10) || 0));
      }
      if ("uai" in body || "hors_college" in body) {
        const college = await verifierCollege();
        if ("error" in college) return json({ error: college.error }, 400);
        upd.uai = college.uai; upd.hors_college = college.hors;
      }
      if ("prenom" in body) {
        const prenom = String(body.prenom || "").trim().slice(0, 60);
        if (prenom) await admin.from("profiles").update({ prenom }).eq("id", id);
      }
      if (Object.keys(upd).length) {
        const { error } = await admin.from("famille_enfants").update(upd).eq("enfant_id", id);
        if (error) return json({ error: error.message }, 400);
      }
      return json({ ok: true });
    }

    if (action === "ia-parent") {
      const { error } = await admin.from("familles").update({ ia_parent: body.ia_parent === true, updated_at: new Date().toISOString() }).eq("parent_id", user.id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    // ---------- Paiement (Stripe Checkout, paiement unique) ----------
    if (action === "devis" || action === "paiement") {
      const demandes: string[] = Array.isArray(body.niveaux) ? body.niveaux.map(String) : [];
      const choisis = ORDRE.filter((n) => demandes.includes(n) && NIVEAUX_DISPONIBLES.includes(n));
      const today = new Date().toISOString().slice(0, 10);
      const { data: param } = await admin.from("famille_parametres").select("prix").eq("id", 1).maybeSingle();
      const grilleListe: Record<string, number> = param?.prix || { "1": 3500, "2": 5500, "3": 6900 };

      // Code promo : actif, dans ses dates, pas épuisé, une fois par famille (paiements réels).
      const codeSaisi = String(body.code || "").trim().toUpperCase().replace(/\s+/g, "");
      let promo: any = null, codeMsg = "";
      if (codeSaisi) {
        const { data: c } = await admin.from("famille_codes_promo").select("*").eq("code", codeSaisi).maybeSingle();
        if (!c || !c.actif) codeMsg = "Ce code n'existe pas ou n'est plus actif.";
        else if (c.valide_du && today < c.valide_du) codeMsg = "Ce code sera valable à partir du " + c.valide_du.split("-").reverse().join("/") + ".";
        else if (c.valide_au && today > c.valide_au) codeMsg = "Ce code a expiré.";
        else if (c.fin_acces && c.fin_acces < today) codeMsg = "Ce code a expiré.";
        else {
          const { count: dejaUtilise } = c.une_fois_par_famille
            ? await admin.from("famille_paiements").select("stripe_session_id", { count: "exact", head: true }).eq("parent_id", user.id).eq("promo_code", c.code).eq("test", false)
            : { count: 0 };
          const { count: utilisations } = c.max_utilisations
            ? await admin.from("famille_paiements").select("stripe_session_id", { count: "exact", head: true }).eq("promo_code", c.code).eq("test", false)
            : { count: 0 };
          if ((dejaUtilise || 0) > 0 && !famille.stripe_test) codeMsg = "Vous avez déjà utilisé ce code.";
          else if (c.max_utilisations && (utilisations || 0) >= c.max_utilisations) codeMsg = "Ce code a atteint son nombre maximal d'utilisations.";
          else promo = c;
        }
      }
      const fin = promo?.fin_acces || finAnneeScolaire();
      const memePeriode = famille.acces_until && famille.acces_until >= today && famille.acces_until === fin;
      const actuels: string[] = memePeriode ? (famille.niveaux || []) : [];
      const total = ORDRE.filter((n) => choisis.includes(n) || actuels.includes(n));
      const deja = memePeriode ? famille.montant_paye_centimes || 0 : 0;
      const prixListe = prixDe(grilleListe, total.length);
      let prixFormule = prixListe;
      if (promo?.prix) prixFormule = prixDe(promo.prix, total.length);
      else if (promo?.remise_pct) prixFormule = Math.round(prixListe * (100 - promo.remise_pct) / 100);
      const montant = Math.max(0, prixFormule - deja);
      const anneeLabel = promo?.fin_acces ? "jusqu'au " + fin.split("-").reverse().join("/") : "année " + (parseInt(fin.slice(0, 4), 10) - 1) + "-" + fin.slice(0, 4);
      if (action === "devis") {
        return json({ ok: true, niveaux: total, montant, deja, prix_liste: prixListe, prix_formule: prixFormule, acces_until: fin, annee: anneeLabel,
          grille: grilleListe, code: promo ? promo.code : null, code_libelle: promo?.libelle || "", code_msg: codeMsg });
      }
      if (!choisis.length) return json({ error: "Choisissez au moins un niveau." }, 400);
      if (codeSaisi && !promo) return json({ error: codeMsg || "Code promo invalide." }, 400);
      if (montant <= 0) return json({ error: "Ces niveaux sont déjà inclus dans votre accès." }, 400);
      if (montant < 50) return json({ error: "Montant trop faible pour un paiement par carte." }, 400);
      if (body.renonciation !== true) return json({ error: "Pour un accès immédiat, merci de cocher la renonciation au délai de rétractation." }, 400);

      const test = famille.stripe_test === true;
      const stripeKey = Deno.env.get(test ? "STRIPE_TEST_SECRET_KEY" : "STRIPE_SECRET_KEY");
      if (!stripeKey) return json({ error: test ? "Mode test : le secret STRIPE_TEST_SECRET_KEY n'est pas encore enregistré dans Supabase." : "Paiement indisponible pour le moment." }, 500);
      if (test && !stripeKey.startsWith("sk_test_")) return json({ error: "Mode test : STRIPE_TEST_SECRET_KEY doit être une clé de test (sk_test_…)." }, 500);
      const origin = /^https:\/\/[a-z0-9.-]+$/i.test(String(body.origin || "")) || /^http:\/\/localhost(:\d+)?$/.test(String(body.origin || ""))
        ? String(body.origin) : "https://maths.latelieraugmente.fr";
      const libelleFacture = "L'Atelier des Maths – offre Famille " + total.join(", ") + " – " + anneeLabel + (deja ? " (complément)" : "");
      const libelle = (test ? "[TEST] " : "") + libelleFacture;
      const revision = ORDRE.filter((n, i) => !total.includes(n) && i < 3 && total.includes(ORDRE[i + 1]));
      const detailFacture = "Accès aux cours, exercices et suivi pour " + total.join(", ") + (revision.length ? " (+ " + revision.join(", ") + " en révision)" : "") +
        " du " + today.split("-").reverse().join("/") + " au " + fin.split("-").reverse().join("/") + ". Paiement unique, sans reconduction." +
        (deja ? " Complément : formule " + (prixFormule / 100).toFixed(2).replace(".", ",") + " € − " + (deja / 100).toFixed(2).replace(".", ",") + " € déjà payés." : "") +
        (promo ? " Code promo " + promo.code + " (prix habituel " + (prixListe / 100).toFixed(2).replace(".", ",") + " €)." : "");
      const renonciation = new Date().toISOString();
      const p = new URLSearchParams();
      p.set("mode", "payment");
      p.set("locale", "fr");
      p.set("client_reference_id", user.id);
      p.set("customer_email", user.email || "");
      p.set("customer_creation", "always");
      p.set("line_items[0][quantity]", "1");
      p.set("line_items[0][price_data][currency]", "eur");
      p.set("line_items[0][price_data][unit_amount]", String(montant));
      p.set("line_items[0][price_data][product_data][name]", libelle);
      p.set("line_items[0][price_data][product_data][description]",
        "Accès aux cours, exercices et suivi pour " + total.join(", ") + " (et le niveau inférieur en révision) jusqu'au " + fin.split("-").reverse().join("/") + ". Paiement unique, sans reconduction.");
      const meta: Record<string, string> = { kind: "famille", parent_id: user.id, niveaux: total.join(","), montant: String(montant), acces_until: fin, renonciation, test: test ? "1" : "0",
        promo: promo ? promo.code : "", libelle: libelleFacture.slice(0, 480), detail: detailFacture.slice(0, 480) };
      for (const [k, v] of Object.entries(meta)) { p.set("metadata[" + k + "]", v); p.set("payment_intent_data[metadata][" + k + "]", v); }
      // Pas de facture Stripe : la facture est émise par L'Atelier Augmenté (famille_facturer, appelée
      // par stripe-webhook) ; Stripe demande l'adresse de facturation qui y figurera.
      p.set("billing_address_collection", "required");
      p.set("custom_text[submit][message]",
        "Accès immédiat : vous avez demandé à accéder au service dès le paiement et renoncé à votre droit de rétractation (art. L221-28 13° du Code de la consommation). Sans reconduction automatique.");
      p.set("success_url", origin + "/?famille=paye#/famille");
      p.set("cancel_url", origin + "/#/famille");
      const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + stripeKey, "Content-Type": "application/x-www-form-urlencoded" },
        body: p.toString(),
      });
      const sess = await res.json();
      if (!res.ok || !sess.url) return json({ error: "Stripe : " + (sess?.error?.message || res.status) }, 502);
      return json({ ok: true, url: sess.url });
    }

    if (action === "supprimer-compte") {
      if (body.confirmation !== "SUPPRIMER") return json({ error: "Confirmation manquante." }, 400);
      for (const id of mesEnfants) await supprimerCompte(id);
      await admin.rpc("ai_remove_teacher_key", { p_teacher: user.id });
      const { error } = await supprimerCompte(user.id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
