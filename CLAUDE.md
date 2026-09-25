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

## Référencement : régénérer les pages statiques après toute modification d'un chapitre

Les pages indexables par Google (`6e/<chapitre>/`, `5e/<chapitre>/`, `6e/`, `5e/`, `professeurs/`),
`sitemap.xml` et `robots.txt` sont GÉNÉRÉES à partir du vrai contenu des chapitres par
`tools/build-seo.js` (ne pas les modifier à la main). Après toute modification d'un fichier de
`chapitres/`, d'un titre de chapitre (CH6/CH5 dans app.js) ou de la page professeurs, relancer :

```
(cd tools && npm install)   # une fois par session : KaTeX pour rendre les formules
NODE_PATH=/opt/node22/lib/node_modules node tools/build-seo.js
```

et committer les fichiers produits avec le reste. Un chapitre sans vrai cours (« Cours en
construction ») n'a pas de page : elle apparaît automatiquement dès que son cours existe.
