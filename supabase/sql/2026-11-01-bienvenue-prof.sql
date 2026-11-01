-- E-mail de bienvenue au professeur dont l'inscription est approuvée -- demandé le 01/11/2026 : « Est-ce qu'elle a reçu
-- un joli mail ? » puis « Oui, fais les deux ». À l'approbation (profiles.signup_status passe à « approved »), la base
-- appelle la fonction profil (action « bienvenue »), qui envoie l'e-mail une seule fois (profil_contact.bienvenue_at).
-- Pas de nouvelle table : une colonne ajoutée à profil_contact (droits inchangés).
alter table public.profil_contact add column if not exists bienvenue_at timestamptz;

create or replace function public.bienvenue_prof_auto()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.role = 'prof' and new.signup_status = 'approved' and old.signup_status is distinct from 'approved' then
    begin
      perform net.http_post(url := 'https://tdsdwbsvduitgrrrfjrp.supabase.co/functions/v1/profil',
        body := jsonb_build_object('action', 'bienvenue', 'user_id', new.id),
        headers := '{"Content-Type":"application/json"}'::jsonb);
    exception when others then
      raise warning 'bienvenue_prof_auto (%): %', new.id, sqlerrm;
    end;
  end if;
  return new;
end $$;
revoke all on function public.bienvenue_prof_auto() from public, anon, authenticated;
drop trigger if exists trg_bienvenue_prof_auto on public.profiles;
create trigger trg_bienvenue_prof_auto after update of signup_status on public.profiles
  for each row execute function public.bienvenue_prof_auto();
