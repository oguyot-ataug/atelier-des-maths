-- « Mes évaluations » comme un gestionnaire de fichiers (demandé le 10/11/2026 : « je trouve le menu un peu grossier. Le faire
-- ressembler à un vrai éditeur de fichier, permettre de faire des dossiers, de déplacer les fichiers, ne pas faire de répétition des
-- fichiers quand ils sont partagés, montrer le propriétaire »).
-- Dossiers PERSONNELS : chaque professeur range à sa façon, y compris les évaluations qu'on lui partage ; ses dossiers ne sont
-- visibles que par lui. Une évaluation sans ligne de rangement est à la racine.

create table if not exists public.eval_dossiers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nom text not null check (char_length(nom) between 1 and 80),
  parent_id uuid references public.eval_dossiers(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists eval_dossiers_user_idx on public.eval_dossiers (user_id);

create table if not exists public.eval_rangement (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  evaluation_id uuid not null references public.evaluations(id) on delete cascade,
  dossier_id uuid not null references public.eval_dossiers(id) on delete cascade,
  primary key (user_id, evaluation_id)
);

alter table public.eval_dossiers enable row level security;
alter table public.eval_rangement enable row level security;
-- Le dossier parent (ou de rangement) doit être à moi. Vérifié par une fonction SECURITY DEFINER : une policy qui relit
-- eval_dossiers dans sa propre condition déclenchait « infinite recursion detected in policy » (signalé le 10/11/2026).
create or replace function public.eval_dossier_a_moi(p_id uuid)
 returns boolean
 language sql
 stable
 security definer
 set search_path to 'public'
as $function$
  select exists (select 1 from public.eval_dossiers where id = p_id and user_id = auth.uid());
$function$;
revoke all on function public.eval_dossier_a_moi(uuid) from public, anon;
grant execute on function public.eval_dossier_a_moi(uuid) to authenticated;
drop policy if exists eval_dossiers_moi on public.eval_dossiers;
create policy eval_dossiers_moi on public.eval_dossiers for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and (parent_id is null or public.eval_dossier_a_moi(parent_id)));
drop policy if exists eval_rangement_moi on public.eval_rangement;
create policy eval_rangement_moi on public.eval_rangement for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and public.eval_dossier_a_moi(dossier_id));
-- GRANT explicites (obligatoires pour toute nouvelle table depuis le 30/10/2026, voir CLAUDE.md) ; rien pour anon.
grant select, insert, update, delete on public.eval_dossiers to authenticated;
grant select, insert, update, delete on public.eval_dossiers to service_role;
grant select, insert, update, delete on public.eval_rangement to authenticated;
grant select, insert, update, delete on public.eval_rangement to service_role;

-- Propriétaires des évaluations que je vois (miennes ou partagées avec moi) : nom et prénom seulement.
create or replace function public.evaluations_proprietaires()
 returns table(id uuid, nom text, prenom text)
 language sql
 stable
 security definer
 set search_path to 'public'
as $function$
  select distinct p.id, p.nom, p.prenom
  from public.evaluations e join public.profiles p on p.id = e.owner_id
  where e.owner_id = auth.uid() or auth.uid() = any(coalesce(e.collaborators, '{}')) or auth.uid() = any(coalesce(e.viewers, '{}'));
$function$;
revoke all on function public.evaluations_proprietaires() from public, anon;
grant execute on function public.evaluations_proprietaires() to authenticated;
