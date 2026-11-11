-- Proposition 2 du bilan de charge du 10/11/2026 (« Dans tes propositions, fais 1 et 2 ») : les 7 règles signalées par Supabase
-- (« auth_rls_initplan ») lisent auth.uid() et is_admin() une seule fois par requête au lieu d'une fois par ligne.
-- Mêmes conditions qu'avant, mot pour mot : seuls auth.uid() et is_admin() sont entourés de (select …).

alter policy bandeaux_lire on public.bandeaux
  using ((auteur = (select auth.uid())) or (select public.is_admin()) or ((portee = 'etablissement') and public.is_referent_of(uai)));

alter policy bandeaux_creer on public.bandeaux
  with check ((select public.is_admin())
    or ((auteur = (select auth.uid())) and (portee = 'etablissement') and public.is_referent_of(uai) and (cibles <@ array['eleve','prof']) and (cardinality(uais) = 0) and (cardinality(class_ids) = 0))
    or ((auteur = (select auth.uid())) and (portee = 'classes') and public.bandeau_classes_ok(class_ids) and (cibles <@ array['eleve','prof']) and (uai is null) and (cardinality(uais) = 0) and (cardinality(niveaux) = 0)));

alter policy bandeaux_modifier on public.bandeaux
  using ((select public.is_admin()) or ((portee = 'etablissement') and public.is_referent_of(uai)) or ((portee = 'classes') and (auteur = (select auth.uid()))))
  with check ((select public.is_admin())
    or ((portee = 'etablissement') and public.is_referent_of(uai) and (cibles <@ array['eleve','prof']) and (cardinality(uais) = 0) and (cardinality(class_ids) = 0))
    or ((portee = 'classes') and (auteur = (select auth.uid())) and public.bandeau_classes_ok(class_ids) and (cibles <@ array['eleve','prof']) and (uai is null) and (cardinality(uais) = 0) and (cardinality(niveaux) = 0)));

alter policy bandeaux_supprimer on public.bandeaux
  using ((select public.is_admin()) or ((portee = 'etablissement') and public.is_referent_of(uai)) or ((portee = 'classes') and (auteur = (select auth.uid()))));

alter policy digest_masques_moi on public.digest_masques
  using (teacher_id = (select auth.uid()))
  with check (teacher_id = (select auth.uid()));

alter policy eval_dossiers_moi on public.eval_dossiers
  using (user_id = (select auth.uid()))
  with check ((user_id = (select auth.uid())) and ((parent_id is null) or public.eval_dossier_a_moi(parent_id)));

alter policy eval_rangement_moi on public.eval_rangement
  using (user_id = (select auth.uid()))
  with check ((user_id = (select auth.uid())) and public.eval_dossier_a_moi(dossier_id));
