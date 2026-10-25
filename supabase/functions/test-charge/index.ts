// supabase/functions/test-charge/index.ts
//
// Test de charge -- demandé : « vendre un produit qui bloque, non merci ! » puis « oui, prépare le test de
// charge » (25/10/2026). Crée puis supprime un professeur fictif, ses classes cachées et jusqu'à 200 élèves
// fictifs, joués par tools/charge/charge.mjs depuis GitHub (workflow « Test de charge »).
//
//  - preparer  : { eleves (1-200) } → professeur charge-prof@mathcollege.local, classes « Test de charge n »
//                (30 élèves chacune, cachées : classes_test), élèves charge-001@… (eleves_test : exclus des
//                bilans). Mot de passe aléatoire commun, renvoyé une seule fois au script (jamais affiché).
//  - supprimer : efface tout ce que preparer a créé (et les résultats laissés par le test).
// Autorisation : en-tête x-alerte-cle = secret ALERTE_CLE (déjà partagé avec GitHub pour la surveillance).
// Ne touche qu'aux comptes charge-…@mathcollege.local rattachés au professeur fictif.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });
const PROF = "charge-prof@mathcollege.local";
const eleveEmail = (i: number) => `charge-${String(i).padStart(3, "0")}@mathcollege.local`;
const motDePasse = () => { const b = new Uint8Array(18); crypto.getRandomValues(b); return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join(""); };
const PAR_CLASSE = 30;

serve(async (req) => {
  const cle = Deno.env.get("ALERTE_CLE");
  if (!cle || req.headers.get("x-alerte-cle") !== cle) return json({ error: "non autorisé" }, 401);
  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const body = await req.json().catch(() => ({}));

    const profId = async () => {
      const { data } = await admin.from("profiles").select("id").eq("email", PROF).eq("nom", "Test de charge").maybeSingle();
      return data?.id || null;
    };
    const supprimer = async () => {
      const prof = await profId();
      if (!prof) return { eleves: 0, classes: 0 };
      const { data: et } = await admin.from("eleves_test").select("student_id").eq("owner_id", prof);
      const { data: pr } = await admin.from("profiles").select("id, email").in("id", (et || []).map((e) => e.student_id));
      const ids = (pr || []).filter((p) => /^charge-\d{3}@mathcollege\.local$/.test(p.email || "")).map((p) => p.id);
      const { data: ct } = await admin.from("classes_test").select("class_id").eq("owner_id", prof);
      const cls = (ct || []).map((c) => c.class_id);
      // Résultats laissés par le test (tables sans suppression en cascade), puis classes (séances COURS en cascade).
      for (let i = 0; i < ids.length; i += 50) {
        const lot = ids.slice(i, i + 50);
        await admin.from("cm_results").delete().in("student_id", lot);
        await admin.from("class_students").delete().in("student_id", lot);
      }
      if (cls.length) await admin.from("classes").delete().in("id", cls);
      let n = 0;
      for (let i = 0; i < ids.length; i += 10) {
        const r = await Promise.all(ids.slice(i, i + 10).map((id) => admin.auth.admin.deleteUser(id)));
        n += r.filter((x) => !x.error).length;
      }
      await admin.from("profiles").delete().in("id", ids);
      await admin.auth.admin.deleteUser(prof);
      await admin.from("profiles").delete().eq("id", prof);
      return { eleves: n, classes: cls.length };
    };

    if (body.action === "supprimer") return json({ ok: true, ...(await supprimer()) });

    if (body.action === "preparer") {
      const nb = Math.max(1, Math.min(200, Number(body.eleves) || 30));
      await supprimer(); // reste d'un test interrompu
      const mdp = motDePasse();
      const { data: p, error: e0 } = await admin.auth.admin.createUser({ email: PROF, password: mdp, email_confirm: true });
      if (e0 || !p?.user) return json({ error: "Professeur fictif : " + (e0?.message || "?") }, 500);
      const prof = p.user.id;
      const { error: e1 } = await admin.from("profiles").insert({ id: prof, role: "prof", prenom: "Prof", nom: "Test de charge", email: PROF,
        signup_status: "approved", subscription_status: "active", must_change_password: false });
      if (e1) { await admin.auth.admin.deleteUser(prof); return json({ error: "Profil du professeur : " + e1.message }, 500); }
      const classes: string[] = [];
      for (let k = 0; k < Math.ceil(nb / PAR_CLASSE); k++) {
        const { data: c, error } = await admin.from("classes").insert({ nom: "Test de charge " + (k + 1), niveau: "6e", uai: null, creee_par: prof }).select("id").single();
        if (error || !c) return json({ error: "Classe : " + (error?.message || "?") }, 500);
        await admin.from("class_teachers").insert({ class_id: c.id, teacher_id: prof });
        await admin.from("classes_test").insert({ class_id: c.id, owner_id: prof });
        classes.push(c.id);
      }
      const eleves: { email: string; classe: string }[] = [];
      for (let i = 0; i < nb; i += 10) {
        const lot = Array.from({ length: Math.min(10, nb - i) }, (_, j) => i + j + 1);
        const r = await Promise.all(lot.map(async (n) => {
          const email = eleveEmail(n), classe = classes[Math.floor((n - 1) / PAR_CLASSE)];
          const { data: u, error } = await admin.auth.admin.createUser({ email, password: mdp, email_confirm: true });
          if (error || !u?.user) return "Élève " + n + " : " + (error?.message || "?");
          const id = u.user.id;
          const { error: e2 } = await admin.from("profiles").insert({ id, role: "eleve", prenom: "Élève " + String(n).padStart(3, "0"), nom: "Test de charge",
            email, uai: null, signup_status: "approved", subscription_status: "active", must_change_password: false });
          if (e2) { await admin.auth.admin.deleteUser(id); return "Profil " + n + " : " + e2.message; }
          await admin.from("eleves_test").insert({ student_id: id, owner_id: prof });
          await admin.from("class_students").insert({ class_id: classe, student_id: id });
          eleves.push({ email, classe });
          return null;
        }));
        const err = r.find(Boolean);
        if (err) return json({ error: err }, 500);
      }
      eleves.sort((a, b) => a.email.localeCompare(b.email));
      return json({ ok: true, mdp, prof: PROF, classes, eleves });
    }
    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
