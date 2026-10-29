#!/usr/bin/env bash
# Migration vers Paris : réglages du service de connexion (Auth) de Dublin recopiés à Paris, via l'API de gestion
# Supabase (GET puis PATCH /v1/projects/{ref}/config/auth). Valeurs nulles et valeurs masquées laissées de côté ;
# toute mention de l'ancien projet est remplacée par le nouveau. Dépôt public : n'affiche que des NOMS de réglages
# (et l'adresse du site, qui est publique), jamais une valeur.
set -euo pipefail
API=https://api.supabase.com/v1/projects
H=(-sS -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" -H "Content-Type: application/json")
lire() { curl "${H[@]}" -w '\n%{http_code}' "$API/$1/config/auth"; }
note() { local T="$1"; T="${T//'%'/'%25'}"; T="${T//$'\n'/'%0A'}"; echo "::notice title=Auth::$T"; }
R=$(lire "$OLD_REF"); C=${R##*$'\n'}; ANC=${R%$'\n'*}
[ "$C" = 200 ] || { note "Lecture des réglages de Dublin impossible (HTTP $C) : le jeton a-t-il Auth en lecture ?"; exit 1; }
R=$(lire "$NEW_REF"); C=${R##*$'\n'}; NEU=${R%$'\n'*}
[ "$C" = 200 ] || { note "Lecture des réglages de Paris impossible (HTTP $C)"; exit 1; }
# Corps du PATCH : réglages de Dublin non nuls, sans valeur masquée, ancien projet remplacé par le nouveau.
echo "$ANC" | jq --arg o "$OLD_REF" --arg n "$NEW_REF" '
  with_entries(select(.value != null))
  | with_entries(select((.value | type) != "string" or (.value | test("^\\*+$") | not)))
  | walk(if type == "string" then gsub($o; $n) else . end)' > /tmp/corps.json
DIFF_AVANT=$(jq -rn --slurpfile a /tmp/corps.json --argjson b "$NEU" '$a[0] | to_entries | map(select($b[.key] != .value)) | map(.key) | join(" ")')
MASQUES=$(echo "$ANC" | jq -r 'to_entries | map(select((.value | type) == "string" and (.value | test("^\\*+$")))) | map(.key) | join(" ")')
envoyer() { curl "${H[@]}" -X PATCH -d @/tmp/corps.json -w '\n%{http_code}' "$API/$NEW_REF/config/auth"; }
R=$(envoyer); C=${R##*$'\n'}; B=${R%$'\n'*}
# Champs refusés par le PATCH (lecture seule ou inconnus) : retirés un à un d'après le message d'erreur, 15 essais au plus.
RETIRES=""
for i in $(seq 1 15); do
  # 402 : crochets (hooks) réservés aux offres Team/Enterprise (HOOK_PASSWORD_VERIFICATION_ATTEMPT…) : retirés
  # de la copie, avec une mention s'ils étaient activés à Dublin (impossible en offre Pro, donc normalement non).
  if [ "$C" = 402 ]; then
    P=$(echo "$B" | grep -oE 'HOOK_[A-Z_]+' | tr 'A-Z' 'a-z' | sort -u)
    [ -n "$P" ] || break
    for h in $P; do
      [ "$(jq -r --arg h "$h" '.[$h + "_enabled"] // false' /tmp/corps.json)" = true ] && RETIRES="$RETIRES (${h} était ACTIVÉ)"
      jq --arg h "$h" 'with_entries(select(.key | startswith($h) | not))' /tmp/corps.json > /tmp/c2.json && mv /tmp/c2.json /tmp/corps.json; RETIRES="$RETIRES $h*"
    done
    R=$(envoyer); C=${R##*$'\n'}; B=${R%$'\n'*}; continue
  fi
  [ "$C" = 400 ] || break
  K=$(echo "$B" | grep -oE '"[a-z0-9_]+"' | tr -d '"' | while read -r k; do jq -e --arg k "$k" 'has($k)' /tmp/corps.json > /dev/null && { echo "$k"; break; }; done || true)
  [ -n "$K" ] || break
  jq --arg k "$K" 'del(.[$k])' /tmp/corps.json > /tmp/c2.json && mv /tmp/c2.json /tmp/corps.json; RETIRES="$RETIRES $K"
  R=$(envoyer); C=${R##*$'\n'}; B=${R%$'\n'*}
done
# Message d'erreur de l'API : clés et textes (noms de droits ou de réglages, pas de valeurs du projet).
if [ "$C" != 200 ]; then note "Écriture refusée à Paris (HTTP $C) : $(echo "$B" | jq -c '.' 2>/dev/null | head -c 600)"; exit 1; fi
R=$(lire "$NEW_REF"); NEU2=${R%$'\n'*}
DIFF_APRES=$(jq -rn --slurpfile a /tmp/corps.json --argjson b "$NEU2" '$a[0] | to_entries | map(select($b[.key] != .value)) | map(.key) | join(" ")')
SITE=$(echo "$NEU2" | jq -r '.site_url // ""'); LISTE=$(echo "$NEU2" | jq -r '.uri_allow_list // ""')
note "Réglages recopiés : $(jq 'length' /tmp/corps.json)
Différaient avant la copie : ${DIFF_AVANT:-aucun}
Différents après la copie : ${DIFF_APRES:-aucun}
Valeurs masquées par Supabase (à ressaisir à la main) : ${MASQUES:-aucune}
Refusés par l'API : ${RETIRES:- aucun}
Adresse du site à Paris : $SITE
Adresses de retour à Paris : $LISTE"
rm -f /tmp/corps.json
