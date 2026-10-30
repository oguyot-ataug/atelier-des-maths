-- Inscription d'un professeur terminée PAR LA BASE à la confirmation de son adresse (et non plus seulement par son
-- navigateur au retour du lien) -- signalé le 30/10/2026 : « ça fait déjà deux fois en deux jours que l'inscription pose
-- problème » (comptes confirmés restés sans profil, donc invisibles dans Administration › Inscriptions). Mêmes règles
-- que le site : adresse académique, UAI valide, profil « pending », établissement provisoire s'il est inconnu. Puis SMS
-- (alerte-sms, action « inscription ») et e-mail (notify-prof-signup) à l'administrateur. N'empêche jamais la connexion.
create or replace function public.inscription_prof_auto()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_uai text := upper(trim(coalesce(m->>'uai', '')));
  v_nom text := left(trim(coalesce(m->>'nom', '')), 80);
  v_prenom text := left(trim(coalesce(m->>'prenom', '')), 60);
  site constant text := 'https://tdsdwbsvduitgrrrfjrp.supabase.co/functions/v1/';
  -- clé publique (anon) du site, la même que dans app.js : elle n'est pas secrète
  anon constant text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkc2R3YnN2ZHVpdGdycnJmanJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNTg4NjksImV4cCI6MjEwODgzNDg2OX0.hrbj6tWi6U8IupaYjN0ccVeNdpHk1CsxykMKNQVxK7s';
begin
  if new.email_confirmed_at is null or m->>'inscription' is distinct from 'prof' then return new; end if;
  if exists (select 1 from public.profiles where id = new.id) then return new; end if;
  if v_uai !~ '^[0-9]{7}[A-Z]$' or new.email !~* '^[^[:space:]@]+@ac-[a-z-]+\.(fr|nc|pf|wf)$' then return new; end if;
  begin
    insert into public.etablissements (uai, nom) values (v_uai, 'À vérifier par l''administrateur') on conflict (uai) do nothing;
    insert into public.profiles (id, role, nom, prenom, email, uai, signup_status, subscription_status)
      values (new.id, 'prof', nullif(v_nom, ''), nullif(v_prenom, ''), new.email, v_uai, 'pending', 'trial') on conflict (id) do nothing;
    perform net.http_post(url := site || 'alerte-sms', body := '{"action":"inscription"}'::jsonb,
      headers := '{"Content-Type":"application/json"}'::jsonb);
    perform net.http_post(url := site || 'notify-prof-signup',
      body := jsonb_build_object('nom', v_nom, 'prenom', v_prenom, 'email', new.email, 'uai', v_uai),
      headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || anon));
  exception when others then
    raise warning 'inscription_prof_auto (%): %', new.id, sqlerrm;
  end;
  return new;
end $$;
revoke all on function public.inscription_prof_auto() from public, anon, authenticated;
drop trigger if exists trg_inscription_prof_auto on auth.users;
create trigger trg_inscription_prof_auto after insert or update of email_confirmed_at on auth.users
  for each row execute function public.inscription_prof_auto();

-- « Dernière connexion » = dernière activité (migration derniere_connexion_avec_sessions) -- signalé le 30/10/2026 :
-- « Hélène s'est connectée en octobre, j'étais avec elle ! » (affiché : 21/09 ; sa session restée ouverte avait servi
-- jusqu'au 16/10, sans nouvelle saisie du mot de passe).
create or replace function public.derniere_activite(p_user uuid)
returns timestamptz language sql stable security definer set search_path = '' as $$
  select greatest(
    (select au.last_sign_in_at from auth.users au where au.id = p_user),
    (select max(s.updated_at) from auth.sessions s where s.user_id = p_user)
  );
$$;
revoke all on function public.derniere_activite(uuid) from public, anon, authenticated;
-- get_last_sign_in_times() et get_my_students_last_sign_in() renvoient public.derniere_activite(au.id) au lieu de
-- au.last_sign_in_at (même filtre d'accès qu'avant).
-- Fonctions de « dernière connexion » réservées aux comptes connectés (migration derniere_connexion_sans_anon).
revoke execute on function public.get_last_sign_in_times() from anon, public;
revoke execute on function public.get_my_students_last_sign_in() from anon, public;
grant execute on function public.get_last_sign_in_times() to authenticated;
grant execute on function public.get_my_students_last_sign_in() to authenticated;
