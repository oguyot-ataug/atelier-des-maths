# Notes pour Claude (conventions du projet)

## Supabase : GRANT explicite obligatoire pour toute nouvelle table (à partir du 30/10/2026)

Depuis le 30 octobre 2026, Supabase ne donne plus automatiquement accès à la Data API
(supabase-js / PostgREST / GraphQL) aux nouvelles tables du schéma `public`. Les tables déjà
créées avant cette date gardent leurs droits actuels -- rien à changer sur l'existant.

**Toute migration qui crée une nouvelle table doit donc inclure explicitement, dans la MÊME
migration**, en plus des policies RLS habituelles :

```sql
grant select on public.ma_table to anon;
grant select, insert, update, delete on public.ma_table to authenticated;
grant select, insert, update, delete on public.ma_table to service_role;
```

Adapter les verbes accordés au besoin réel de la table (RLS reste la vraie barrière de sécurité
qui décide QUELLES lignes sont visibles -- ces GRANT autorisent seulement l'accès à la Data API
elle-même). Sans ce GRANT, la table se crée sans erreur mais devient inaccessible via le client
("permission denied" côté PostgREST), y compris sur un nouveau projet, une preview branch, ou un
`supabase db reset` local. Source : mail Supabase du 23/09/2026.

Project ID Supabase de ce dépôt : `rngzubhnypmistjsumpz`.
