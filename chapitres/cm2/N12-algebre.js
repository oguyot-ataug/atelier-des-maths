/* ============================================================
   CHAPITRE : Algèbre (CM2, N12, période 5)
   Programme du cycle 3 (CM2) : désigner des nombres inconnus par des symboles ou des LETTRES et
   raisonner avec eux ; nombre manquant dans une égalité à trous (« 178 − … = 6 × 8 ») ; problèmes
   algébriques (2 paires de ciseaux et 3 stylos coûtent 20 €…) ; symbole générique :
   prix = (N × 12) + 5 ; programmes de calcul ; suites de nombres et de motifs évolutives, nombre
   d'éléments pour une étape donnée ; schémas en barres.
   ============================================================ */
(() => {
const Q = '<b style="color:#E35D3A;">■</b>';
function carres(n){
  const k = 14; let s = `<svg viewBox="0 0 ${(2 * n + 1) * k + 4} ${(n + 1) * k + 4}" style="height:${(n + 1) * k + 4}px;display:inline-block;vertical-align:bottom;margin:0 10px;">`;
  // motif en « escalier double » : étape n → n² + … ; ici : étape n = pyramide de n rangées
  for(let r = 0; r < n; r++){ const w = 2 * r + 1, x0 = (n - 1 - r) * k; for(let i = 0; i < w; i++) s += `<rect x="${2 + x0 + i * k}" y="${2 + r * k}" width="${k}" height="${k}" fill="#2EA8C9" fill-opacity=".55" stroke="#1F3A5C" stroke-width="1"/>`; }
  return s + '</svg>';
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Algèbre', slug: 'algebre',
  cours: `
${cm1Lecon(1, 'Le signe = et les égalités à trous')}
${cm1Regle(`Le signe <b>=</b> relie deux écritures qui ont la <b>même valeur</b>, pas seulement une opération et son résultat.<br>
Dans 178 − ${Q} = 6 × 8 : le membre de droite vaut 48, donc 178 − ${Q} = 48, et ${Q} = 178 − 48 = <b>130</b>.`)}
${cm1Exemple('Autres exemples :', [`${Q} + 25 = 100 − 15 → ${Q} + 25 = 85 → ${Q} = 60.`, `4 × ${Q} = 30 + 6 → 4 × ${Q} = 36 → ${Q} = 9.`])}

${cm1Lecon(2, 'Des lettres pour des nombres')}
${cm1Def('On peut désigner un nombre qu\'on ne connaît pas (ou qui peut changer) par une <b>lettre</b>.')}
${cm1Exemple('Des t-shirts coûtent 12 € chacun ; la livraison coûte 5 €. Si on achète N t-shirts, le prix à payer en euros est :', ['<b>(N × 12) + 5</b>.', 'Pour 3 t-shirts : (3 × 12) + 5 = 41 €. Pour 10 t-shirts : (10 × 12) + 5 = 125 €.', 'La même écriture sert pour <b>n\'importe quel</b> nombre de t-shirts.'])}

${cm1Lecon(3, 'Résoudre un problème algébrique')}
${cm1Exemple('2 paires de ciseaux et 3 stylos coûtent 20 €. Une paire de ciseaux coûte 4 €. Combien coûte un stylo ?', ['On note C le prix d\'une paire de ciseaux et S celui d\'un stylo : (2 × C) + (3 × S) = 20.', 'C = 4, donc 8 + (3 × S) = 20, donc 3 × S = 12 et <b>S = 4 €</b>.', 'Vérification : 2 × 4 + 3 × 4 = 8 + 12 = 20. ✔'])}
${cm1Exemple('Deux nombres ont pour somme 50 ; l\'un vaut 8 de plus que l\'autre. Quels sont-ils ?', ['Schéma : le petit nombre + (le petit nombre + 8) = 50.', 'Deux fois le petit nombre = 50 − 8 = 42, donc le petit nombre est 21 et le grand 29.'])}

${cm1Lecon(4, 'Suites évolutives')}
${cm1Exemple('Suite de nombres : 7 · 15 · 31 · 63 · 127 · …', ['Règle : on multiplie par 2 et on ajoute 1. Terme suivant : 127 × 2 + 1 = <b>255</b>.'])}
<div class="figure-wrap" style="text-align:center;">${carres(1)}${carres(2)}${carres(3)}${carres(4)}<div class="hint" style="margin-top:6px;">Étape 1 : 1 carré · Étape 2 : 4 · Étape 3 : 9 · Étape 4 : 16</div></div>
${cm1Regle('À l\'étape n, la pyramide a n rangées de 1, 3, 5… carrés : il y a <b>n × n</b> carrés. Étape 10 : 10 × 10 = <b>100 carrés</b>. On peut aussi remarquer qu\'on ajoute 3, puis 5, puis 7… (les nombres impairs).', 'Nombre d\'éléments pour une étape donnée')}

${cm1Lecon(5, 'Programmes de calcul')}
${cm1Exemple('Programme : choisir un nombre · ajouter 2 · multiplier le résultat par 4 · retirer 3.', ['Avec 5 : 5 + 2 = 7 ; 7 × 4 = 28 ; 28 − 3 = <b>25</b>.', 'En une seule écriture : ((5 + 2) × 4) − 3 = 25. Avec une lettre n : ((n + 2) × 4) − 3.', 'On a obtenu 37 : on remonte. 37 + 3 = 40 ; 40 ÷ 4 = 10 ; 10 − 2 = <b>8</b>.'])}
`,
  methode: `
${cm1Demo('c2-al-trou', 'Trouver le nombre manquant', 'Complète : 250 − … = 9 × 12.')}
${cm1Demo('c2-al-balance', 'Raisonner avec deux inconnues simples', '3 cahiers et 1 classeur coûtent 11 €. 1 cahier et 1 classeur coûtent 5 €. Prix d\'un cahier ?')}
`,
  demos: [
    ['c2-al-trou', [
      { expr: '9 × 12 = 108', note: 'On calcule d\'abord le membre qui est complet.' },
      { expr: `250 − ${Q} = 108`, note: 'Le signe = veut dire « vaut autant que ».' },
      { expr: `${Q} = 250 − 108 = 142`, note: 'Ce qu\'on enlève à 250 pour obtenir 108.' },
      { expr: '250 − 142 = 108 ✔', note: 'Vérification.' },
    ]],
    ['c2-al-balance', [
      { expr: '3 cahiers + 1 classeur = 11 €', note: 'On écrit les deux informations.' },
      { expr: '1 cahier + 1 classeur = 5 €', note: 'La deuxième contient aussi 1 classeur.' },
      { expr: '2 cahiers = 11 € − 5 € = 6 €', note: 'La différence entre les deux achats, ce sont 2 cahiers.' },
      { expr: '1 cahier = 3 € (et 1 classeur = 2 €)', note: 'Vérification : 3 × 3 + 2 = 11 ✔ et 3 + 2 = 5 ✔.' },
    ]],
  ],
  exos: cm1Exos('c2al', [
    [`Trouve le nombre manquant : 45 + ${Q} = 8 × 9 · ${Q} × 7 = 100 − 16 · 300 − ${Q} = 25 × 4`, '27 · 12 · 200'],
    ['Vrai ou faux ? 15 + 25 = 50 − 10 · 6 × 7 = 40 + 3 · 100 ÷ 4 = 5 × 5', 'Vrai · Faux (42 et 43) · Vrai.'],
    ['Un taxi coûte 4 € de prise en charge plus 2 € par km. Écris le prix pour K km. Combien pour 15 km ?', '(K × 2) + 4 ; pour 15 km : 34 €.'],
    ['Suite : 3 · 7 · 15 · 31 · … Trouve la règle et les deux termes suivants.', '× 2 + 1 : 63, 127.'],
    ['Avec la pyramide de carrés du cours, combien de carrés à l\'étape 7 ? À quelle étape y a-t-il 144 carrés ?', '49 carrés ; étape 12 (12 × 12 = 144).'],
    ['Programme : choisir un nombre · le multiplier par 3 · ajouter 5 · multiplier par 2. Que donne-t-il avec 4 ? Quel nombre a été choisi si on obtient 52 ?', 'Avec 4 : 12, 17, 34. Remonter 52 : 26, 21, 7 → 7.'],
    ['La somme de deux nombres est 100 ; l\'un vaut 3 fois l\'autre. Quels sont-ils ?', 'Le petit + 3 fois le petit = 4 fois le petit = 100 : le petit vaut 25, le grand 75.'],
    ['Un sac de billes et 3 billes pèsent autant que 45 billes (le sac est plein, toutes les billes identiques). Combien de billes dans le sac ?', 'Sac + 3 = 45, donc le sac contient 42 billes.'],
  ], { titre: 'Rédaction type : « Égalité à trou »', lignes: [['6 × 8 = 48', 'Je calcule le membre complet.'], ['178 − ■ = 48, donc ■ = 178 − 48 = 130', 'Je cherche le nombre manquant.'], ['178 − 130 = 48 ✔', 'Je vérifie.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : François Viète et les lettres', [
    'Pendant des siècles, les problèmes d\'algèbre s\'écrivaient avec des phrases : « une chose plus cinq égale douze »… En 1591, le mathématicien français <b>François Viète</b> a l\'idée d\'utiliser des <b>lettres</b> pour désigner les nombres inconnus et les nombres donnés.',
    'Viète était aussi conseiller du roi Henri IV : il savait déchiffrer les messages secrets de l\'armée espagnole ! Les Espagnols croyaient qu\'il utilisait la magie.',
  ]),
  quiz: [
    { q: '50 − … = 4 × 10. Le nombre manquant est…', opts: ['10', '40', '90'], correct: 0 },
    { q: 'Prix de N cahiers à 3 € : …', opts: ['N + 3', 'N × 3', '3 − N'], correct: 1 },
    { q: 'Suite 2 · 5 · 11 · 23 · … (× 2 + 1). Terme suivant ?', opts: ['46', '47', '35'], correct: 1 },
  ],
});
})();
