#!/usr/bin/env bash
# Migration vers Paris : nombre de lignes par table (aucune donnée affichée), ancien et nouveau projet côte à côte.
set -u
REQ="select n.nspname||'.'||c.relname, (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', n.nspname, c.relname), false, true, '')))[1]::text
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where c.relkind = 'r' and (n.nspname = 'public' or (n.nspname, c.relname) in (('auth','users'),('auth','identities'),('storage','buckets'),('storage','objects')))
order by 1"
compte() { psql --quiet --no-psqlrc -At -F ' ' --dbname "$1" -c "$REQ" 2>/dev/null || echo "(connexion impossible)"; }
compte "$OLD_DB" > /tmp/ancien.txt; compte "$NEW_DB" > /tmp/nouveau.txt
T=$( { echo "table | Dublin | Paris"; join -a1 -a2 -e '-' -o 0,1.2,2.2 <(sort /tmp/ancien.txt) <(sort /tmp/nouveau.txt) | awk '{ m = ($2 == $3) ? "" : "  <-- différent"; print $1 " | " $2 " | " $3 m }'; } )
echo "$T"
# Aussi en annotation (lisible par l'API GitHub, contrairement aux journaux) : une seule note, retours à la ligne encodés.
T="${T//'%'/'%25'}"; T="${T//$'\n'/'%0A'}"
echo "::notice title=Comptages ${1:-}::$T"
rm -f /tmp/ancien.txt /tmp/nouveau.txt
