// supabase/functions/admin-create-user/index.ts
//
// Permet de gérer les comptes prof/élève depuis le site, sans jamais exposer la clé privée
// (service_role) au navigateur : elle ne vit que côté serveur, ici.
//
// Qui peut quoi :
//  - administrateur général : tout ;
//  - RÉFÉRENT D'ÉTABLISSEMENT (etablissements.referent_id) : créer des comptes prof/élève dans
//    SON établissement (UAI imposé), et, pour les comptes de son établissement uniquement
//    (jamais un administrateur, jamais lui-même pour la suppression) : lien d'invitation,
//    mot de passe, identifiant, suppression ;
//  - professeur : lien d'invitation / mot de passe des élèves de SES classes.
//
// Déploiement (depuis un terminal, une fois) :
//   supabase functions deploy admin-create-user --project-ref rngzubhnypmistjsumpz

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Mot de passe aléatoire fort, généré côté serveur, que personne ne connaît jamais -- utilisé
// uniquement en attendant que l'élève définisse le sien via son lien d'invitation personnel.
function randomStrongPassword(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Jeton d'invitation non utilisé et non expiré déjà existant (réutilisé), sinon nouveau.
async function getOrCreateInvitationToken(adminClient: any, userId: string): Promise<string> {
  const { data: existing } = await adminClient
    .from("invitations").select("token")
    .eq("user_id", userId).is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (existing) return existing.token;
  const token = crypto.randomUUID();
  await adminClient.from("invitations").insert({ token, user_id: userId });
  return token;
}

function loginIdentifiant(email: string | null | undefined): string {
  if (!email) return "(inconnu)";
  return email.endsWith("@mathcollege.local") ? email.slice(0, -"@mathcollege.local".length) : email;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceKey);

    const body = await req.json();
    const action = body.action || "create";

    // ---- Actions PUBLIQUES (l'élève qui clique sur son lien n'est pas encore connecté) ----
    if (action === "check-invitation") {
      const { token } = body;
      if (!token) return json({ error: "token requis" }, 400);
      const { data: invit } = await adminClient
        .from("invitations").select("user_id, expires_at, used_at").eq("token", token).single();
      if (!invit) return json({ error: "Ce lien n'existe pas ou n'est plus valide." }, 404);
      const { data: prof } = await adminClient.from("profiles").select("nom, email").eq("id", invit.user_id).single();
      if (invit.used_at) {
        return json({ alreadyUsed: true, nom: prof?.nom || null, identifiant: loginIdentifiant(prof?.email) });
      }
      if (new Date(invit.expires_at) < new Date()) return json({ error: "Ce lien a expiré. Contactez votre professeur pour en obtenir un nouveau." }, 400);
      return json({ success: true, nom: prof?.nom || null });
    }

    if (action === "consume-invitation") {
      const { token, newPassword } = body;
      if (!token || !newPassword) return json({ error: "token et newPassword requis" }, 400);
      if (newPassword.length < 6) return json({ error: "Mot de passe trop court (6 caractères minimum)." }, 400);
      const { data: invit } = await adminClient
        .from("invitations").select("user_id, expires_at, used_at").eq("token", token).single();
      if (!invit) return json({ error: "Ce lien n'existe pas ou n'est plus valide." }, 404);
      if (invit.used_at) return json({ error: "Ce lien a déjà été utilisé." }, 400);
      if (new Date(invit.expires_at) < new Date()) return json({ error: "Ce lien a expiré." }, 400);

      const { error: pwError } = await adminClient.auth.admin.updateUserById(invit.user_id, { password: newPassword });
      if (pwError) return json({ error: pwError.message }, 400);
      await adminClient.from("profiles").update({ must_change_password: false }).eq("id", invit.user_id);
      await adminClient.from("invitations").update({ used_at: new Date().toISOString() }).eq("token", token);

      const { data: userData } = await adminClient.auth.admin.getUserById(invit.user_id);
      return json({ success: true, email: userData.user?.email || null });
    }

    // ---- Actions réservées à un compte authentifié ----
    const authHeader = req.headers.get("Authorization") || "";
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) return json({ error: "unauthorized" }, 401);

    const { data: profile } = await adminClient
      .from("profiles").select("role").eq("id", caller.id).single();
    if (!profile) return json({ error: "profil introuvable" }, 403);
    const isAdmin = profile.role === "admin";
    const isProf = profile.role === "prof";
    if (!isAdmin && !isProf) {
      return json({ error: "forbidden: réservé à l'administrateur ou au professeur responsable" }, 403);
    }
    // Référent d'établissement ?
    let referentUai: string | null = null;
    if (!isAdmin) {
      const { data: etab } = await adminClient.from("etablissements").select("uai").eq("referent_id", caller.id).maybeSingle();
      referentUai = etab?.uai || null;
    }
    const isReferent = !!referentUai;

    if (isReferent) {
      // Le référent gère les comptes prof/élève de SON établissement uniquement.
      if (!["create", "reset-password", "create-invitation", "update-email", "delete"].includes(action)) {
        return json({ error: "forbidden: action réservée à l'administrateur général" }, 403);
      }
      if (action !== "create") {
        const targetUserId = body.userId;
        if (!targetUserId) return json({ error: "userId requis" }, 400);
        const { data: target } = await adminClient.from("profiles").select("role, uai").eq("id", targetUserId).single();
        if (!target || target.role === "admin" || target.uai !== referentUai) {
          return json({ error: "forbidden: ce compte n'appartient pas à votre établissement" }, 403);
        }
        if (action === "delete" && targetUserId === caller.id) {
          return json({ error: "vous ne pouvez pas supprimer votre propre compte." }, 400);
        }
      }
    } else if (isProf) {
      // Professeur simple : lien d'invitation / mot de passe des élèves de SES classes.
      if (!["reset-password", "create-invitation"].includes(action)) {
        return json({ error: "forbidden: action réservée à l'administrateur" }, 403);
      }
      const targetUserId = body.userId;
      if (!targetUserId) return json({ error: "userId requis" }, 400);
      const { data: targetProfile } = await adminClient
        .from("profiles").select("role").eq("id", targetUserId).single();
      if (!targetProfile || targetProfile.role !== "eleve") {
        return json({ error: "forbidden: réservé aux comptes élèves" }, 403);
      }
      const { data: myClasses } = await adminClient
        .from("class_teachers").select("class_id").eq("teacher_id", caller.id);
      const myClassIds = (myClasses || []).map((c: any) => c.class_id);
      if (!myClassIds.length) return json({ error: "forbidden: aucune classe associée à ce compte" }, 403);
      const { data: studentClasses } = await adminClient
        .from("class_students").select("class_id").eq("student_id", targetUserId)
        .in("class_id", myClassIds);
      if (!studentClasses || !studentClasses.length) {
        return json({ error: "forbidden: cet élève n'appartient à aucune de vos classes" }, 403);
      }
    }

    if (action === "create-invitation") {
      const { userId } = body;
      if (!userId) return json({ error: "userId requis" }, 400);
      const token = await getOrCreateInvitationToken(adminClient, userId);
      return json({ success: true, token });
    }

    if (action === "reset-password") {
      const { userId, newPassword } = body;
      if (!userId || !newPassword) return json({ error: "userId et newPassword requis" }, 400);
      const { error } = await adminClient.auth.admin.updateUserById(userId, { password: newPassword });
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    if (action === "update-email") {
      const { userId, newEmail } = body;
      if (!userId || !newEmail) return json({ error: "userId et newEmail requis" }, 400);
      const { error } = await adminClient.auth.admin.updateUserById(userId, { email: newEmail, email_confirm: true });
      if (error) return json({ error: error.message }, 400);
      const { error: profileError } = await adminClient.from("profiles").update({ email: newEmail }).eq("id", userId);
      if (profileError) return json({ error: profileError.message }, 400);
      return json({ success: true });
    }

    if (action === "delete") {
      const { userId } = body;
      if (!userId) return json({ error: "userId requis" }, 400);
      if (userId === caller.id) return json({ error: "vous ne pouvez pas supprimer votre propre compte." }, 400);
      const { error } = await adminClient.auth.admin.deleteUser(userId);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    if (action === "sync-emails") {
      if (!isAdmin) return json({ error: "forbidden: action réservée à l'administrateur général" }, 403);
      const { data: usersList, error: listError } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
      if (listError) return json({ error: listError.message }, 400);
      let updated = 0;
      for (const u of usersList.users) {
        if (!u.email) continue;
        const { error: updateError } = await adminClient.from("profiles").update({ email: u.email }).eq("id", u.id);
        if (!updateError) updated++;
      }
      return json({ success: true, updated });
    }

    // action === "create" : password facultatif (sinon lien d'invitation). prenom et uai
    // enregistrés directement ; pour un référent, l'UAI est TOUJOURS le sien et le rôle
    // prof ou élève uniquement.
    if (action !== "create") return json({ error: "action inconnue" }, 400);
    if (!isAdmin && !isReferent) return json({ error: "forbidden" }, 403);
    const { email, password, role, nom, prenom } = body;
    if (!email || !role) {
      return json({ error: "email et role sont requis" }, 400);
    }
    const allowedRoles = isAdmin ? ["prof", "eleve", "admin"] : ["prof", "eleve"];
    if (!allowedRoles.includes(role)) {
      return json({ error: "role invalide" }, 400);
    }
    const uai = isReferent ? referentUai : (body.uai ? String(body.uai).trim().toUpperCase() : null);
    // Établissement pas encore connu (UAI tapé pour la première fois par l'administrateur) :
    // on le crée, comme le fait l'import en masse. Sans ça, le profil était refusé (clé
    // étrangère profiles_uai_fkey) APRÈS la création du compte de connexion, qui restait orphelin.
    if (uai) {
      const { data: etab } = await adminClient.from("etablissements").select("uai").eq("uai", uai).maybeSingle();
      if (!etab) {
        const { error: etabError } = await adminClient.from("etablissements").insert({ uai, nom: "Établissement " + uai });
        if (etabError) return json({ error: "Établissement " + uai + " impossible à créer : " + etabError.message }, 400);
      }
    }
    const finalPassword = password || randomStrongPassword();

    const { data: created, error } = await adminClient.auth.admin.createUser({
      email, password: finalPassword, email_confirm: true,
    });
    if (error) {
      const msg = /already been registered|email_exists/i.test(error.message)
        ? "Cet identifiant est déjà utilisé par un autre compte."
        : error.message;
      return json({ error: msg }, 400);
    }

    const { error: profileError } = await adminClient.from("profiles").insert({
      id: created.user!.id, role, nom: nom || null, prenom: prenom || null, email, uai: uai || null,
    });
    if (profileError) {
      // Pas de compte de connexion sans profil : on annule, pour pouvoir réessayer.
      await adminClient.auth.admin.deleteUser(created.user!.id);
      return json({ error: "Profil non enregistré (le compte n'a pas été créé) : " + profileError.message }, 400);
    }

    let inviteToken: string | null = null;
    if (!password) {
      inviteToken = await getOrCreateInvitationToken(adminClient, created.user!.id);
    }

    return json({ success: true, id: created.user!.id, inviteToken, uai });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
