-- Records du calcul mental tenus à jour par la base (demandé le 10/11/2026 : « Dans tes propositions, fais 1 et 2 », proposition 1
-- du bilan de charge : cm_get_all_records pesait encore 40 % du temps de calcul, 110 ms en moyenne, car elle recalculait les
-- records de toutes les séquences (83) à chaque appel). Désormais :
--   * table cm_records : un record (meilleur temps d'une séquence réussie sans faute) par séquence, pour tout le site
--     (portee 'site'), par classe (portee 'classe', cle = class_id) et par élève (portee 'eleve', cle = student_id) ;
--   * déclencheur sur cm_results : à chaque résultat ajouté, modifié ou supprimé, les trois records concernés sont
--     recalculés (trois lectures d'index) ;
--   * cm_get_all_records lit ces records : mêmes colonnes, mêmes valeurs, mêmes lignes (séquences ayant au moins un
--     résultat parfait chronométré), dans le même ordre.
-- Aucune donnée nominative : des identifiants et des durées. Lecture seulement par les fonctions (SECURITY DEFINER).

create table if not exists public.cm_records (
  portee text not null check (portee in ('site', 'classe', 'eleve')),
  cle uuid not null,               -- '00000000-0000-0000-0000-000000000000' pour le site, sinon class_id ou student_id
  sequence_id text not null,
  duration_ms integer not null,
  primary key (portee, cle, sequence_id)
);
alter table public.cm_records enable row level security;
-- Aucune policy : la table n'est lue et écrite que par les fonctions ci-dessous (SECURITY DEFINER).
-- GRANT explicites (obligatoires pour toute nouvelle table depuis le 30/10/2026, voir CLAUDE.md) : service_role seulement.
revoke all on public.cm_records from anon, authenticated;
grant select, insert, update, delete on public.cm_records to service_role;

-- Recalcule un record (portée, clé, séquence) à partir de cm_results.
create or replace function public.cm_record_maj(p_portee text, p_cle uuid, p_seq text)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v integer;
begin
  if p_seq is null or p_cle is null then return; end if;
  if p_portee = 'site' then
    select min(r.duration_ms) into v from public.cm_results r
      where r.sequence_id = p_seq and r.score = r.total and r.duration_ms is not null;
  elsif p_portee = 'classe' then
    select min(r.duration_ms) into v from public.cm_results r
      where r.class_id = p_cle and r.sequence_id = p_seq and r.score = r.total and r.duration_ms is not null;
  else
    select min(r.duration_ms) into v from public.cm_results r
      where r.student_id = p_cle and r.sequence_id = p_seq and r.score = r.total and r.duration_ms is not null;
  end if;
  if v is null then
    delete from public.cm_records where portee = p_portee and cle = p_cle and sequence_id = p_seq;
  else
    insert into public.cm_records(portee, cle, sequence_id, duration_ms) values (p_portee, p_cle, p_seq, v)
      on conflict (portee, cle, sequence_id) do update set duration_ms = excluded.duration_ms;
  end if;
end;
$function$;
revoke all on function public.cm_record_maj(text, uuid, text) from public, anon, authenticated;

create or replace function public.cm_records_declencheur()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare z constant uuid := '00000000-0000-0000-0000-000000000000';
begin
  if tg_op in ('UPDATE', 'DELETE') then
    perform public.cm_record_maj('site', z, old.sequence_id);
    perform public.cm_record_maj('classe', old.class_id, old.sequence_id);
    perform public.cm_record_maj('eleve', old.student_id, old.sequence_id);
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    -- Un ajout ne peut qu'améliorer un record : rien à faire si le résultat n'est pas parfait et chronométré.
    if new.score = new.total and new.duration_ms is not null then
      perform public.cm_record_maj('site', z, new.sequence_id);
      perform public.cm_record_maj('classe', new.class_id, new.sequence_id);
      perform public.cm_record_maj('eleve', new.student_id, new.sequence_id);
    end if;
  end if;
  return null;
end;
$function$;
revoke all on function public.cm_records_declencheur() from public, anon, authenticated;

drop trigger if exists cm_records_maj on public.cm_results;
create trigger cm_records_maj after insert or update or delete on public.cm_results
  for each row execute function public.cm_records_declencheur();

-- Remplissage initial.
truncate public.cm_records;
insert into public.cm_records(portee, cle, sequence_id, duration_ms)
  select 'site', '00000000-0000-0000-0000-000000000000'::uuid, sequence_id, min(duration_ms) from public.cm_results
   where score = total and duration_ms is not null and sequence_id is not null group by sequence_id
  union all
  select 'classe', class_id, sequence_id, min(duration_ms) from public.cm_results
   where score = total and duration_ms is not null and sequence_id is not null and class_id is not null group by class_id, sequence_id
  union all
  select 'eleve', student_id, sequence_id, min(duration_ms) from public.cm_results
   where score = total and duration_ms is not null and sequence_id is not null group by student_id, sequence_id;

-- Même signature, mêmes résultats, lecture des records tenus à jour.
create or replace function public.cm_get_all_records(p_class_id uuid)
 returns table(sequence_id text, my_best integer, class_best integer, global_best integer)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select g.sequence_id, e.duration_ms, c.duration_ms, g.duration_ms
  from public.cm_records g
  left join public.cm_records c on c.portee = 'classe' and c.cle = p_class_id and c.sequence_id = g.sequence_id
  left join public.cm_records e on e.portee = 'eleve' and e.cle = auth.uid() and e.sequence_id = g.sequence_id
  where g.portee = 'site' and g.cle = '00000000-0000-0000-0000-000000000000'::uuid
  order by g.sequence_id
$function$;
