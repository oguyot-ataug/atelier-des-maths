// supabase/functions/simulateur/index.ts
//
// Simulateur de classe (L'Atelier du prof › Simulateur) : chaque professeur a jusqu'à trois élèves
// fictifs (Élève A, B, C) qu'il rattache à une de ses classes pour tester ses outils avant la classe.
// Les élèves fictifs sont marqués dans public.eleves_test (exclus des bilans, moyennes, décomptes).
//
// Actions (professeur ou administrateur connecté) :
//  - etat      : ses élèves fictifs et leur classe ;
//  - preparer  : { niveau, nb } crée (ou met au niveau) SA classe de simulation « Simulation »
//                (public.classes_test : cachée hors du simulateur), crée les élèves fictifs qui
//                manquent (1 à 3) et les rattache à cette classe seulement ;
//  - session   : { student_id } ouvre la session d'un de SES élèves fictifs (nouveau mot de passe
//                aléatoire jamais transmis, connexion côté serveur) et renvoie les jetons de session ;
//  - supprimer : supprime ses élèves fictifs, sa classe de simulation et tout ce qui s'y trouve.
// Jamais pour un vrai élève : tout passe par eleves_test.owner_id = l'appelant.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const motDePasse = () => { const b = new Uint8Array(24); crypto.getRandomValues(b); return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join(""); };
const LETTRES = ["A", "B", "C"];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!, anon = Deno.env.get("SUPABASE_ANON_KEY")!, service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, service, { auth: { persistSession: false } });
    const jwt = (req.headers.get("Authorization") || "").replace("Bearer ", "");
    const { data: { user: moi } } = await admin.auth.getUser(jwt);
    if (!moi) return json({ error: "Connectez-vous d'abord." }, 401);
    const { data: prof } = await admin.from("profiles").select("role, uai").eq("id", moi.id).single();
    if (!prof || (prof.role !== "prof" && prof.role !== "admin")) return json({ error: "Réservé aux professeurs." }, 403);

    const body = await req.json().catch(() => ({}));
    const action = body.action || "etat";
    const mesEleves = async () => {
      const { data } = await admin.from("eleves_test").select("student_id, lettre").eq("owner_id", moi.id).order("lettre");
      const ids = (data || []).map((x) => x.student_id);
      const { data: liens } = ids.length ? await admin.from("class_students").select("student_id, class_id, classes(nom)").in("student_id", ids) : { data: [] };
      return (data || []).map((x) => ({ ...x, classes: (liens || []).filter((l: any) => l.student_id === x.student_id).map((l: any) => ({ id: l.class_id, nom: l.classes?.nom })) }));
    };

    const maClasse = async () => {
      const { data } = await admin.from("classes_test").select("class_id, classes(id, nom, niveau)").eq("owner_id", moi.id).maybeSingle();
      return data?.classes || null;
    };
    if (action === "etat") return json({ eleves: await mesEleves(), classe: await maClasse() });

    if (action === "preparer") {
      const niveau = String(body.niveau || "6e"), nb = Math.max(1, Math.min(3, Number(body.nb) || 3));
      // Classe de simulation du professeur (une seule), au niveau choisi.
      let cl = await maClasse();
      if (!cl) {
        const { data: c, error } = await admin.from("classes").insert({ nom: "Simulation", niveau, uai: prof.uai || null, creee_par: moi.id }).select("id, nom, niveau").single();
        if (error || !c) return json({ error: "Classe de simulation impossible : " + (error?.message || "?") }, 500);
        await admin.from("class_teachers").insert({ class_id: c.id, teacher_id: moi.id });
        await admin.from("classes_test").insert({ class_id: c.id, owner_id: moi.id });
        cl = c;
      } else if (cl.niveau !== niveau) {
        await admin.from("classes").update({ niveau }).eq("id", cl.id); cl.niveau = niveau;
      }
      const existants = await mesEleves();
      for (const lettre of LETTRES.slice(0, nb)) {
        if (existants.some((e) => e.lettre === lettre)) continue;
        const email = `simu-${moi.id.slice(0, 8)}-${lettre.toLowerCase()}@mathcollege.local`;
        const { data: cree, error } = await admin.auth.admin.createUser({ email, password: motDePasse(), email_confirm: true });
        if (error || !cree?.user) return json({ error: "Création impossible : " + (error?.message || "?") }, 500);
        const { error: e2 } = await admin.from("profiles").insert({ id: cree.user.id, role: "eleve", nom: "Élève", prenom: lettre + " (test)", email, uai: prof.uai || null, must_change_password: false }); // pas d'écran « choisis ton mot de passe »
        if (e2) { await admin.auth.admin.deleteUser(cree.user.id); return json({ error: "Profil impossible : " + e2.message }, 500); }
        await admin.from("eleves_test").insert({ student_id: cree.user.id, owner_id: moi.id, lettre });
      }
      const tous = await mesEleves(), ids = tous.map((e) => e.student_id);
      // Les élèves fictifs ne sont que dans la classe de simulation (jamais dans une vraie classe).
      if (ids.length) await admin.from("class_students").delete().in("student_id", ids).neq("class_id", cl.id);
      for (const e of tous) {
        if (!e.classes.some((c: any) => c.id === cl.id)) await admin.from("class_students").insert({ class_id: cl.id, student_id: e.student_id });
      }
      return json({ eleves: await mesEleves(), classe: cl });
    }

    if (action === "session") {
      const { data: t } = await admin.from("eleves_test").select("student_id").eq("student_id", body.student_id).eq("owner_id", moi.id).maybeSingle();
      if (!t) return json({ error: "Cet élève fictif n'est pas à vous." }, 403);
      const { data: u } = await admin.auth.admin.getUserById(t.student_id);
      const mdp = motDePasse();
      const { error: e1 } = await admin.auth.admin.updateUserById(t.student_id, { password: mdp });
      if (e1 || !u?.user?.email) return json({ error: "Session impossible : " + (e1?.message || "compte introuvable") }, 500);
      const client = createClient(url, anon, { auth: { persistSession: false } });
      const { data: s, error: e2 } = await client.auth.signInWithPassword({ email: u.user.email, password: mdp });
      if (e2 || !s?.session) return json({ error: "Connexion impossible : " + (e2?.message || "?") }, 500);
      return json({ access_token: s.session.access_token, refresh_token: s.session.refresh_token });
    }

    if (action === "supprimer") {
      const tous = await mesEleves();
      let n = 0;
      for (const e of tous) { const { error } = await admin.auth.admin.deleteUser(e.student_id); if (!error) n++; } // profil, travaux… suivent (cascade)
      // Classe de simulation : ses devoirs, interrogations, séances… partent avec elle.
      const cl = await maClasse();
      if (cl) {
        const { data: dv } = await admin.from("devoirs").select("id").eq("class_id", cl.id);
        const dIds = (dv || []).map((d) => d.id);
        if (dIds.length) {
          await admin.from("devoirs_rendus").delete().in("devoir_id", dIds);
          await admin.from("qz_copies").delete().in("devoir_id", dIds);
          await admin.from("devoir_sessions").delete().in("devoir_id", dIds);
          await admin.from("devoirs").delete().in("id", dIds);
        }
        await admin.from("ceb_results").delete().eq("class_id", cl.id);
        await admin.from("permis_rapporteur_resultats").delete().eq("classe_id", cl.id);
        await admin.from("permis_rapporteur_sessions").delete().eq("classe_id", cl.id);
        const { error } = await admin.from("classes").delete().eq("id", cl.id);
        if (error) return json({ ok: true, supprimes: n, classe: "non supprimée : " + error.message });
      }
      return json({ ok: true, supprimes: n });
    }
    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
