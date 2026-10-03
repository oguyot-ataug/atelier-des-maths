// supabase/functions/simulateur/index.ts
//
// Simulateur de classe (L'Atelier du prof › Simulateur) : chaque professeur a jusqu'à trois élèves
// fictifs (Élève A, B, C) qu'il rattache à une de ses classes pour tester ses outils avant la classe.
// Les élèves fictifs sont marqués dans public.eleves_test (exclus des bilans, moyennes, décomptes).
//
// Actions (professeur ou administrateur connecté) :
//  - etat      : ses élèves fictifs et leur classe ;
//  - preparer  : { class_id, nb } crée ceux qui manquent (1 à 3) et les rattache à cette classe
//                (une de SES classes), en les retirant de toute autre classe ;
//  - session   : { student_id } ouvre la session d'un de SES élèves fictifs (nouveau mot de passe
//                aléatoire jamais transmis, connexion côté serveur) et renvoie les jetons de session ;
//  - supprimer : supprime ses élèves fictifs (et tout ce qu'ils ont fait).
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

    if (action === "etat") return json({ eleves: await mesEleves() });

    if (action === "preparer") {
      const classe = body.class_id, nb = Math.max(1, Math.min(3, Number(body.nb) || 3));
      if (!classe) return json({ error: "Choisissez une classe." }, 400);
      if (prof.role !== "admin") {
        const { data: lien } = await admin.from("class_teachers").select("class_id").eq("class_id", classe).eq("teacher_id", moi.id).maybeSingle();
        if (!lien) return json({ error: "Cette classe n'est pas une de vos classes." }, 403);
      }
      const existants = await mesEleves();
      for (const lettre of LETTRES.slice(0, nb)) {
        if (existants.some((e) => e.lettre === lettre)) continue;
        const email = `simu-${moi.id.slice(0, 8)}-${lettre.toLowerCase()}@mathcollege.local`;
        const { data: cree, error } = await admin.auth.admin.createUser({ email, password: motDePasse(), email_confirm: true });
        if (error || !cree?.user) return json({ error: "Création impossible : " + (error?.message || "?") }, 500);
        const { error: e2 } = await admin.from("profiles").insert({ id: cree.user.id, role: "eleve", nom: "Élève", prenom: lettre + " (test)", email, uai: prof.uai || null });
        if (e2) { await admin.auth.admin.deleteUser(cree.user.id); return json({ error: "Profil impossible : " + e2.message }, 500); }
        await admin.from("eleves_test").insert({ student_id: cree.user.id, owner_id: moi.id, lettre });
      }
      const tous = await mesEleves(), ids = tous.map((e) => e.student_id);
      // Un seul rattachement à la fois : la classe choisie.
      if (ids.length) await admin.from("class_students").delete().in("student_id", ids).neq("class_id", classe);
      for (const e of tous) {
        if (!e.classes.some((c: any) => c.id === classe)) await admin.from("class_students").insert({ class_id: classe, student_id: e.student_id });
      }
      return json({ eleves: await mesEleves() });
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
      return json({ ok: true, supprimes: n });
    }
    return json({ error: "Action inconnue." }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
