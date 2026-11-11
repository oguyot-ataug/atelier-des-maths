-- Figures enregistrées rangées dans les mêmes dossiers que « Mes évaluations » (demandé le 11/11/2026 : « Est-ce que lorsqu'on
-- enregistre nos figures, on a accès au même répertoire de dossier ? », choix 1 : un seul arbre de dossiers pour tout).
-- Une figure est personnelle (user_id) : son dossier est une simple colonne. Un dossier supprimé laisse la figure à la racine.
alter table public.figures_sauvegardees
  add column if not exists dossier_id uuid references public.eval_dossiers(id) on delete set null;
create index if not exists figures_sauvegardees_dossier_idx on public.figures_sauvegardees (dossier_id);

-- Le dossier d'une figure appartient forcément au propriétaire de la figure.
create or replace function public.figures_dossier_controle()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if new.dossier_id is not null and not exists (select 1 from public.eval_dossiers d where d.id = new.dossier_id and d.user_id = new.user_id) then
    raise exception 'Ce dossier n''est pas à vous.';
  end if;
  return new;
end;
$function$;
revoke all on function public.figures_dossier_controle() from public, anon, authenticated;
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'figures_dossier_controle') then
    create trigger figures_dossier_controle before insert or update of dossier_id on public.figures_sauvegardees
      for each row execute function public.figures_dossier_controle();
  end if;
end $$;
