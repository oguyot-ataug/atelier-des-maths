// supabase/functions/prof-offre/index.ts
//
// Offres professeur « manuel numérique » -- demandé : "limiter l'accès à un niveau / 1 classe
// (30 élèves) pour 39 €", "le prof particulier (fixe + abonnement par élève) -> permet de faire des
// cours en groupe", et la classe et les comptes élèves créés par le professeur lui-même, dans ses
// limites (vérifiées ici, côté serveur).
//
//  - devis / paiement : Professeur seul (39 € le premier niveau, 29 € par niveau en plus ; 1 classe de
//    30 élèves par niveau, + 15 € par classe en plus d'un niveau payé -- demandé : "et si un prof seul a
//    deux classes de 6e ?") ou Professeur particulier (39 € + 20 € par élève, groupes libres). Paiement
//    unique Stripe Checkout jusqu'au 31/08 de l'année scolaire (à partir de juin : l'année suivante),
//    compléments à la différence ; l'activation et la facture sont faites par stripe-webhook.
//    École (demandé : « Un peu moins cher je pense non ? », tarifs validés) : pour un professeur des
//    écoles, CM1 et CM2 sont vendus ensemble (classes à double niveau) : 29 € par an pour une classe
//    de 30 élèves, + 10 € par classe en plus (ecole_base / ecole_classe, modifiables par l'administrateur).
//  - classe-creer / classe-renommer / classe-supprimer, eleve-creer / eleve-supprimer : classes du
//    professeur (classes.creee_par) et comptes élèves identifiant@mathcollege.local.
//    Pendant l'essai de 15 jours : 1 classe de 30 élèves au plus.
//
// Secrets : SUPABASE_*, STRIPE_SECRET_KEY, STRIPE_TEST_SECRET_KEY (professeur marqué « test »).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
const NIVEAUX_DISPONIBLES = ["cm1", "cm2", "6e", "5e", "4e", "3e"];
const ORDRE = ["cm1", "cm2", "6e", "5e", "4e", "3e"];
const ECOLE = ["cm1", "cm2"]; // vendus ensemble : une seule formule « école »
const PRIX_DEFAUT = { seul_base: 3900, seul_niveau: 2900, seul_classe: 1500, ecole_base: 2900, ecole_classe: 1000, part_base: 3900, part_eleve: 2000, seul_eleves_max: 30 };
// Libellé d'un niveau : « cm1 » → « CM1 ».
const lib = (n: string) => /^cm/.test(n) ? n.toUpperCase() : n;
// Classes comprises dans une offre Professeur seul : une par niveau de collège, une pour l'école (CM1 + CM2), plus les classes en plus.
function classesComprises(niveaux: string[], sup: number): number {
  return niveaux.filter((n) => !ECOLE.includes(n)).length + (niveaux.some((n) => ECOLE.includes(n)) ? 1 : 0) + (sup || 0);
}
const MAX_GROUPES = 40, MAX_PLACES = 200, MAX_CLASSES_SUP = 12;

function finAnneeScolaire(d = new Date()): string {
  const y = d.getUTCFullYear(), m = d.getUTCMonth() + 1;
  return (m >= 6 ? y + 1 : y) + "-08-31";
}
function eur(c: number): string { return (c / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €"; }
function normIdent(s: string): string {
  return String(s || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const admin = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const authHeader = req.headers.get("Authorization") || "";
    const caller = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await caller.auth.getUser(authHeader.replace(/^Bearer\s+/i, ""));
    if (!user) return json({ error: "Connectez-vous d'abord." }, 401);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "");
    const { data: profile } = await admin.from("profiles")
      .select("id, role, nom, prenom, email, uai, signup_status, subscription_status, subscription_expires_at").eq("id", user.id).maybeSingle();
    if (!profile || profile.role !== "prof") return json({ error: "Réservé aux comptes professeur." }, 403);
    if (profile.signup_status !== "approved") return json({ error: "Votre inscription n'est pas encore validée." }, 403);

    const today = new Date().toISOString().slice(0, 10);
    const { data: offre } = await admin.from("prof_offres").select("*").eq("prof_id", user.id).maybeSingle();
    const { data: param } = await admin.from("prof_parametres").select("prix").eq("id", 1).maybeSingle();
    const P = Object.assign({}, PRIX_DEFAUT, param?.prix || {});
    const payee = !!(offre && offre.offre && offre.acces_until && offre.acces_until >= today);
    const essai = !payee && profile.subscription_status === "trial" && !!profile.subscription_expires_at && new Date(profile.subscription_expires_at) > new Date();

    // ---------- Devis / paiement ----------
    if (action === "devis" || action === "paiement") {
      const type = body.offre === "particulier" ? "particulier" : "seul";
      const fin = finAnneeScolaire();
      const memePeriode = payee && offre.acces_until === fin;
      if (memePeriode && offre.offre !== type) {
        return json({ error: "Vous avez déjà l'offre " + (offre.offre === "seul" ? "Professeur seul" : "Professeur particulier") + " pour cette année : pour en changer, écrivez à contact@latelieraugmente.fr." }, 400);
      }
      const deja = memePeriode ? offre.montant_paye_centimes || 0 : 0;
      let niveaux: string[] = [], places = 0, classesSup = 0, prix = 0, lignes: string[] = [];
      if (type === "seul") {
        const demandes: string[] = Array.isArray(body.niveaux) ? body.niveaux.map((n: unknown) => String(n).toLowerCase()) : [];
        if (demandes.some((n) => ECOLE.includes(n))) demandes.push(...ECOLE); // CM1 et CM2 : toujours ensemble
        const actuels: string[] = memePeriode ? offre.niveaux || [] : [];
        niveaux = ORDRE.filter((n) => (demandes.includes(n) && NIVEAUX_DISPONIBLES.includes(n)) || actuels.includes(n));
        const college = niveaux.filter((n) => !ECOLE.includes(n)), ecole = niveaux.some((n) => ECOLE.includes(n));
        const supActuelles = memePeriode ? offre.classes_sup || 0 : 0;
        classesSup = niveaux.length ? Math.max(supActuelles, Math.min(MAX_CLASSES_SUP, parseInt(body.classes_sup, 10) || 0)) : 0;
        const prixClasse = college.length ? P.seul_classe : P.ecole_classe; // classe en plus : tarif école si l'offre n'a que l'école
        prix = (college.length ? P.seul_base + P.seul_niveau * (college.length - 1) : 0) + (ecole ? P.ecole_base : 0) + prixClasse * classesSup;
        lignes = (ecole ? ["CM1 et CM2 (école) : " + eur(P.ecole_base)] : []).concat(college.map((n, i) => n + " : " + eur(i ? P.seul_niveau : P.seul_base)));
        if (classesSup) lignes.push(classesSup + " classe" + (classesSup > 1 ? "s" : "") + " en plus × " + eur(prixClasse));
      } else {
        const actuelles = memePeriode ? offre.places || 0 : 0;
        places = Math.max(actuelles, Math.min(MAX_PLACES, parseInt(body.places, 10) || 0));
        prix = places ? P.part_base + P.part_eleve * places : 0;
        lignes = ["forfait : " + eur(P.part_base), places + " élève" + (places > 1 ? "s" : "") + " × " + eur(P.part_eleve)];
      }
      const montant = Math.max(0, prix - deja);
      const annee = "année " + (parseInt(fin.slice(0, 4), 10) - 1) + "-" + fin.slice(0, 4);
      if (action === "devis") return json({ ok: true, offre: type, niveaux, places, classes_sup: classesSup, prix, deja, montant, acces_until: fin, annee, lignes, grille: P });
      if (type === "seul" && !niveaux.length) return json({ error: "Choisissez au moins un niveau." }, 400);
      if (type === "particulier" && places < 1) return json({ error: "Indiquez le nombre d'élèves." }, 400);
      if (montant <= 0) return json({ error: "C'est déjà compris dans votre offre." }, 400);
      if (body.renonciation !== true) return json({ error: "Pour un accès immédiat, merci de cocher la renonciation au délai de rétractation." }, 400);
      if (body.engagement !== true) return json({ error: "Merci de cocher l'engagement d'utilisation." }, 400);

      const test = !!offre?.stripe_test;
      const stripeKey = Deno.env.get(test ? "STRIPE_TEST_SECRET_KEY" : "STRIPE_SECRET_KEY");
      if (!stripeKey) return json({ error: test ? "Mode test : STRIPE_TEST_SECRET_KEY n'est pas enregistré." : "Paiement indisponible pour le moment." }, 500);
      if (test && !stripeKey.startsWith("sk_test_")) return json({ error: "Mode test : STRIPE_TEST_SECRET_KEY doit être une clé de test (sk_test_…)." }, 500);
      const origin = /^https:\/\/[a-z0-9.-]+$/i.test(String(body.origin || "")) || /^http:\/\/localhost(:\d+)?$/.test(String(body.origin || ""))
        ? String(body.origin) : "https://maths.latelieraugmente.fr";
      const nbClasses = classesComprises(niveaux, classesSup);
      const nomOffre = type === "seul" ? "Professeur seul " + niveaux.map(lib).join(", ") + (classesSup ? " (" + nbClasses + " classes)" : "") : "Professeur particulier, " + places + " élève" + (places > 1 ? "s" : "");
      const libelleFacture = "L'Atelier des Maths – " + nomOffre + " – " + annee + (deja ? " (complément)" : "");
      const detail = (type === "seul"
        ? "Cours, outils du professeur et comptes élèves pour " + niveaux.map(lib).join(", ") + " (" + nbClasses + " classe" + (nbClasses > 1 ? "s" : "") + " de " + P.seul_eleves_max + " élèves au plus)"
        : "Cours et outils du professeur, groupes d'élèves (" + places + " élève" + (places > 1 ? "s" : "") + " au plus)") +
        " du " + today.split("-").reverse().join("/") + " au " + fin.split("-").reverse().join("/") + ". Paiement unique, sans reconduction." +
        (deja ? " Complément : " + eur(prix) + " − " + eur(deja) + " déjà payés." : "");
      const p = new URLSearchParams();
      p.set("mode", "payment"); p.set("locale", "fr");
      p.set("client_reference_id", user.id);
      p.set("customer_email", user.email || "");
      p.set("customer_creation", "always");
      p.set("line_items[0][quantity]", "1");
      p.set("line_items[0][price_data][currency]", "eur");
      p.set("line_items[0][price_data][unit_amount]", String(montant));
      p.set("line_items[0][price_data][product_data][name]", (test ? "[TEST] " : "") + libelleFacture);
      p.set("line_items[0][price_data][product_data][description]", detail.slice(0, 500));
      const meta: Record<string, string> = { kind: "prof", prof_id: user.id, offre: type, niveaux: niveaux.join(","), places: String(places), classes_sup: String(classesSup),
        montant: String(montant), acces_until: fin, test: test ? "1" : "0", libelle: libelleFacture.slice(0, 480), detail: detail.slice(0, 480),
        renonciation: new Date().toISOString() };
      for (const [k, v] of Object.entries(meta)) { p.set("metadata[" + k + "]", v); p.set("payment_intent_data[metadata][" + k + "]", v); }
      p.set("billing_address_collection", "required");
      p.set("custom_text[submit][message]", "Accès immédiat : vous avez demandé à accéder au service dès le paiement et renoncé à votre droit de rétractation. Sans reconduction automatique.");
      p.set("success_url", origin + "/?abonnement=succes#/abonnement");
      p.set("cancel_url", origin + "/#/abonnement");
      const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST", headers: { "Authorization": "Bearer " + stripeKey, "Content-Type": "application/x-www-form-urlencoded" }, body: p.toString(),
      });
      const sess = await res.json();
      if (!res.ok || !sess.url) return json({ error: "Stripe : " + (sess?.error?.message || res.status) }, 502);
      return json({ ok: true, url: sess.url });
    }

    // ---------- Classes et élèves en libre-service ----------
    if (!payee && !essai) return json({ error: "Votre essai est terminé : choisissez une offre pour créer vos classes." }, 403);
    const regime = payee ? offre.offre : "essai";
    const { data: mesClasses } = await admin.from("classes").select("id, nom, niveau, uai").eq("creee_par", user.id);
    const classes = mesClasses || [];
    const idsClasses = classes.map((c: any) => c.id);
    const { data: inscrits } = idsClasses.length
      ? await admin.from("class_students").select("class_id, student_id").in("class_id", idsClasses) : { data: [] };
    const effectif = (cid: string) => (inscrits || []).filter((r: any) => r.class_id === cid).length;
    const elevesDistincts = new Set((inscrits || []).map((r: any) => r.student_id)).size;
    const maClasse = (cid: string) => classes.find((c: any) => c.id === cid) || null;

    if (action === "classe-creer") {
      const nom = String(body.nom || "").trim().slice(0, 40);
      const demande = String(body.niveau || "").toLowerCase();
      const niveau = ORDRE.includes(demande) ? demande : null;
      if (!nom) return json({ error: "Donnez un nom à la classe (ex. 6e B)." }, 400);
      if (!niveau || !NIVEAUX_DISPONIBLES.includes(niveau)) return json({ error: "Choisissez le niveau (" + NIVEAUX_DISPONIBLES.map(lib).join(", ") + ")." }, 400);
      if (regime === "essai" && classes.length >= 1) return json({ error: "Pendant l'essai : une classe. Choisissez une offre pour en créer d'autres." }, 400);
      if (regime === "seul") {
        if (!(offre.niveaux || []).includes(niveau)) return json({ error: "Votre offre ne comprend pas le niveau " + lib(niveau) + " : ajoutez-le dans « Mon abonnement »." }, 400);
        const permises = classesComprises(offre.niveaux || [], offre.classes_sup || 0);
        const prixClasse = (offre.niveaux || []).some((n: string) => !ECOLE.includes(n)) ? P.seul_classe : P.ecole_classe;
        if (classes.length >= permises) return json({ error: "Votre offre comprend " + permises + " classe" + (permises > 1 ? "s" : "") + " : ajoutez une classe dans « Mon abonnement » (" + eur(prixClasse) + ")." }, 400);
      }
      if (regime === "particulier" && classes.length >= MAX_GROUPES) return json({ error: "Nombre maximal de groupes atteint." }, 400);
      const { data: c, error } = await admin.from("classes").insert({ nom, niveau: lib(niveau), uai: regime === "particulier" ? null : profile.uai, creee_par: user.id }).select("id").single();
      if (error) return json({ error: error.message }, 400);
      const { error: e2 } = await admin.from("class_teachers").insert({ class_id: c.id, teacher_id: user.id });
      if (e2) { await admin.from("classes").delete().eq("id", c.id); return json({ error: e2.message }, 400); }
      return json({ ok: true, id: c.id });
    }

    if (action === "classe-renommer") {
      const c = maClasse(String(body.class_id || ""));
      if (!c) return json({ error: "Cette classe n'est pas l'une des vôtres." }, 403);
      const nom = String(body.nom || "").trim().slice(0, 40);
      if (!nom) return json({ error: "Nom requis." }, 400);
      const { error } = await admin.from("classes").update({ nom }).eq("id", c.id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    if (action === "classe-supprimer") {
      const c = maClasse(String(body.class_id || ""));
      if (!c) return json({ error: "Cette classe n'est pas l'une des vôtres." }, 403);
      if (effectif(c.id)) return json({ error: "Supprimez d'abord les comptes élèves de cette classe." }, 400);
      await admin.from("class_teachers").delete().eq("class_id", c.id);
      const { error } = await admin.from("classes").delete().eq("id", c.id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    if (action === "eleve-creer") {
      const c = maClasse(String(body.class_id || ""));
      if (!c) return json({ error: "Cette classe n'est pas l'une des vôtres." }, 403);
      if (regime !== "particulier" && effectif(c.id) >= P.seul_eleves_max) return json({ error: "Une classe compte " + P.seul_eleves_max + " élèves au plus." }, 400);
      if (regime === "particulier" && elevesDistincts >= (offre.places || 0)) return json({ error: "Vous avez atteint les " + offre.places + " élèves de votre offre : ajoutez des places dans « Mon abonnement »." }, 400);
      const prenom = String(body.prenom || "").trim().slice(0, 60), nom = String(body.nom || "").trim().slice(0, 60);
      if (!prenom) return json({ error: "Prénom de l'élève requis." }, 400);
      const ident = normIdent(body.identifiant || (prenom + "." + nom));
      if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(ident)) return json({ error: "Identifiant : 3 à 30 caractères (lettres, chiffres, point, tiret), sans espace ni @." }, 400);
      const password = String(body.password || "");
      if (password.length < 6) return json({ error: "Mot de passe : 6 caractères minimum." }, 400);
      const email = ident + "@mathcollege.local";
      const { data: created, error: cErr } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
      if (cErr) return json({ error: /already|exists|registered/i.test(cErr.message) ? "L'identifiant « " + ident + " » est déjà pris : choisissez-en un autre (ex. " + ident + "2)." : cErr.message }, 400);
      const id = created.user!.id;
      const { error: pErr } = await admin.from("profiles").insert({ id, role: "eleve", prenom, nom: nom || null, email, uai: c.uai || null,
        signup_status: "approved", subscription_status: "active", must_change_password: false });
      const { error: sErr } = pErr ? { error: pErr } : await admin.from("class_students").insert({ class_id: c.id, student_id: id });
      if (pErr || sErr) { await admin.auth.admin.deleteUser(id); return json({ error: (pErr || sErr)!.message }, 400); }
      return json({ ok: true, id, identifiant: ident });
    }

    if (action === "eleve-supprimer") {
      const sid = String(body.student_id || "");
      const { data: sesClasses } = await admin.from("class_students").select("class_id").eq("student_id", sid);
      const ids = (sesClasses || []).map((r: any) => r.class_id);
      if (!ids.length || !ids.every((cid: string) => idsClasses.includes(cid))) return json({ error: "Cet élève n'appartient pas uniquement à vos classes." }, 403);
      for (const t of [["ceb_results", "student_id"], ["cm_results", "student_id"], ["figures_sauvegardees", "user_id"], ["devoirs_rendus", "student_id"],
        ["permis_rapporteur_resultats", "eleve_id"], ["bug_reports", "reporter_id"], ["class_students", "student_id"]]) {
        await admin.from(t[0]).delete().eq(t[1], sid);
      }
      const { error } = await admin.auth.admin.deleteUser(sid);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
