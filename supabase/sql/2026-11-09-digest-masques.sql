-- Accueil du professeur, encadré « Ce qui mérite votre attention » (demandé le 09/11/2026 : « Pourquoi j'ai toujours cet
-- affichage ? », puis « Oui, fais les deux ») :
--   1. seuls les devoirs dont la date limite est passée depuis moins de 15 jours (ou arrive dans les 3 jours) y figurent ;
--      même règle pour les « à reprendre » (devoir sans date limite : toujours signalé) ;
--   2. bouton « Masquer » par ligne : table digest_masques (un choix par professeur, devoir et type de ligne). La ligne
--      revient si la situation s'aggrave : plus d'élèves en attente qu'au moment du masquage, ou un nouvel élève « à reprendre ».

create table if not exists public.digest_masques (
  teacher_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  devoir_id uuid not null references public.devoirs(id) on delete cascade,
  type text not null check (type in ('attente', 'reprendre')),
  nb int not null default 0,                 -- 'attente' : élèves en attente au moment du masquage
  eleves uuid[] not null default '{}',       -- 'reprendre' : élèves « à reprendre » au moment du masquage
  created_at timestamptz not null default now(),
  primary key (teacher_id, devoir_id, type)
);
alter table public.digest_masques enable row level security;
drop policy if exists digest_masques_moi on public.digest_masques;
create policy digest_masques_moi on public.digest_masques for all to authenticated
  using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());
-- GRANT explicites (obligatoires pour toute nouvelle table depuis le 30/10/2026, voir CLAUDE.md) ; rien pour anon.
grant select, insert, update, delete on public.digest_masques to authenticated;
grant select, insert, update, delete on public.digest_masques to service_role;

create or replace function public.get_teacher_pending_digest()
 returns table(devoir_id uuid, devoir_titre text, class_id uuid, date_limite timestamp with time zone, nb_en_attente integer, nb_total integer)
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  return query
  with mes_devoirs as (
    select d.id, d.titre, d.class_id, d.date_limite, d.student_ids
    from devoirs d
    where d.teacher_id = auth.uid()
      and d.date_limite is not null
      and d.date_limite <= now() + interval '3 days'
      and d.date_limite >= now() - interval '15 days'
      and d.date_depot is not null and d.date_depot <= now()
  ),
  eligibles as (
    select md.id as devoir_id, md.titre, md.class_id, md.date_limite, cs.student_id
    from mes_devoirs md
    join class_students cs on cs.class_id = md.class_id
      and (md.student_ids is null or cs.student_id = any(md.student_ids))
  ),
  bilan as (
    select e.devoir_id, e.titre, e.class_id, e.date_limite,
      count(*) filter (where coalesce(dr.est_rendu,false) = false)::int as nb_en_attente,
      count(*)::int as nb_total
    from eligibles e
    left join devoirs_rendus dr on dr.devoir_id = e.devoir_id and dr.student_id = e.student_id
    group by e.devoir_id, e.titre, e.class_id, e.date_limite
  )
  select b.devoir_id, b.titre, b.class_id, b.date_limite, b.nb_en_attente, b.nb_total
  from bilan b
  where b.nb_en_attente > 0
    and not exists (select 1 from digest_masques m
                    where m.teacher_id = auth.uid() and m.devoir_id = b.devoir_id and m.type = 'attente' and b.nb_en_attente <= m.nb)
  order by b.date_limite asc;
end;
$function$;

create or replace function public.get_teacher_a_reprendre_digest()
 returns table(devoir_id uuid, devoir_titre text, class_id uuid, student_id uuid, student_nom text, student_prenom text)
 language sql
 security definer
 set search_path to 'public'
as $function$
  select d.id, d.titre, d.class_id, p.id, p.nom, p.prenom
  from devoirs_rendus dr
  join devoirs d on d.id = dr.devoir_id
  join profiles p on p.id = dr.student_id
  where d.teacher_id = auth.uid() and dr.a_reprendre = true
    and (d.date_limite is null or d.date_limite >= now() - interval '15 days')
    and not exists (select 1 from digest_masques m
                    where m.teacher_id = auth.uid() and m.devoir_id = d.id and m.type = 'reprendre' and dr.student_id = any(m.eleves));
$function$;
