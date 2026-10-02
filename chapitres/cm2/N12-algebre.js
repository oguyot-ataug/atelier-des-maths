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
${cm1Regle('Le signe <b>=</b> relie deux écritures qui ont la <b>même valeur</b>, pas seulement une opération et son résultat.')}
${cm1Exemple(`Complète : 178 − ${Q} = 6 × 8.`)}
${cm1Redac('Nombre manquant', { suite: ['6 × 8 = 48', `178 − ${Q} = 48`, `${Q} = 178 − 48`, `${Q} = 130`] }, 'Le nombre manquant est 130, car 178 − 130 = 48.')}
${cm1Exemple('Autres exemples :', [`${Q} + 25 = 100 − 15, donc ${Q} + 25 = 85, et ${Q} = 60 ;`, `4 × ${Q} = 30 + 6, donc 4 × ${Q} = 36, et ${Q} = 9.`])}
${ce2AnimBalance('c2-al-balance-anim', { presets: [{ nom: '■ + 25 = 85', g: ['■ + 25', 85, '#E35D3A', '■ + 25'], d: ['85', 85, '#2EA8C9', '85'], montrer: true }], legende: 'Le signe = est comme une balance en équilibre : les deux membres ont la même valeur. Ici ■ + 25 vaut 85, donc ■ vaut 85 − 25, c\'est-à-dire 60.' })}

${cm1Lecon(2, 'Des lettres pour des nombres')}
${cm1Def('On peut désigner un nombre qu\'on ne connaît pas (ou qui peut changer) par une <b>lettre</b>.')}
${cm1Exemple('Des t-shirts coûtent 12 € chacun ; la livraison coûte 5 €. Si on achète N t-shirts, le prix à payer en euros est <b>(N × 12) + 5</b>.')}
${cm1Redac('Prix de 3 t-shirts', ['(3 × 12) + 5', '36 + 5', '41'], '3 t-shirts coûtent 41 €.')}
${cm1Redac('Prix de 10 t-shirts', { nom: 'B', lignes: ['(10 × 12) + 5', '120 + 5', '125'] }, '10 t-shirts coûtent 125 €.')}
${cm1Rem('La même écriture sert pour <b>n\'importe quel</b> nombre de t-shirts : on remplace seulement N.')}

${cm1Lecon(3, 'Résoudre un problème algébrique')}
${cm1Exemple('2 paires de ciseaux et 3 stylos coûtent 20 €. Une paire de ciseaux coûte 4 €. Combien coûte un stylo ?', ['On note C le prix d\'une paire de ciseaux et S celui d\'un stylo : (2 × C) + (3 × S) = 20.'])}
${cm1Redac('Prix des 3 stylos', { suite: ['2 × 4 = 8', '20 − 8 = 12'] }, 'Les 3 stylos coûtent 12 €.')}
${cm1Redac('Prix d\'un stylo', '12 ÷ 3 = 4', 'Un stylo coûte 4 €. On vérifie : 8 + 12 donne bien 20.')}
${cm1Exemple('Deux nombres ont pour somme 50 ; l\'un vaut 8 de plus que l\'autre. Quels sont-ils ?')}
${ce2AnimBarres('c2-al-barres', { unite: 2, lignes: [['Petit', [[60, '?', '#2EA8C9', 'Le petit nombre : on ne le connaît pas.']]], ['Grand', [[60, '?', '#2EA8C9', 'Le grand nombre, c\'est le petit…'], [24, '8', '#E9C46A', '… et encore 8.']]]], total: '50', totalTexte: 'En tout, 50. Sans les 8, il reste 50 − 8 = 42, soit deux fois le petit nombre : le petit vaut <b>21</b>, le grand <b>29</b>.' })}
${cm1Redac('Les deux nombres', { suite: ['50 − 8 = 42', '42 ÷ 2 = 21', '21 + 8 = 29'] }, 'Les deux nombres sont 21 et 29.')}

${cm1Lecon(4, 'Suites évolutives')}
${cm1Exemple('Suite de nombres : 7 ; 15 ; 31 ; 63 ; 127 ; …', ['Règle : on multiplie par 2 et on ajoute 1.'])}
${cm1Redac('Terme suivant', ['127 × 2 + 1', '254 + 1', '255'], 'Le terme suivant est 255.')}
<div class="figure-wrap" style="text-align:center;">${carres(1)}${carres(2)}${carres(3)}${carres(4)}<div class="hint" style="margin-top:6px;">Étape 1 : 1 carré — étape 2 : 4 carrés — étape 3 : 9 carrés — étape 4 : 16 carrés</div></div>
${cm1Regle('À l\'étape n, la pyramide a n rangées de 1, 3, 5… carrés : il y a <b>n × n</b> carrés. On peut aussi remarquer qu\'on ajoute 3, puis 5, puis 7… (les nombres impairs).', 'Nombre d\'éléments pour une étape donnée')}
${cm1Redac('Carrés à l\'étape 10', '10 × 10 = 100', 'À l\'étape 10, il y a 100 carrés.')}

${cm1Lecon(5, 'Programmes de calcul')}
${cm1Exemple(`Programme :${cm1Liste(['choisir un nombre', 'ajouter 2', 'multiplier le résultat par 4', 'retirer 3'])}`)}
${cm1Redac('Avec 5', { suite: ['5 + 2 = 7', '7 × 4 = 28', '28 − 3 = 25'] }, 'Avec 5, le programme donne 25.')}
${cm1Rem('En une seule écriture : ((5 + 2) × 4) − 3. Avec une lettre n : ((n + 2) × 4) − 3.')}
${cm1Redac('Nombre choisi si on obtient 37', { suite: ['37 + 3 = 40', '40 ÷ 4 = 10', '10 − 2 = 8'] }, 'On remonte le programme en faisant les opérations inverses : le nombre choisi était 8.')}
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
    [`Trouve le nombre manquant.${cm1Liste([`45 + ${Q} = 8 × 9`, `${Q} × 7 = 100 − 16`, `300 − ${Q} = 25 × 4`])}`,
      cm1Redac(`45 + ${Q} = 8 × 9`, { suite: ['8 × 9 = 72', `${Q} = 72 − 45`, `${Q} = 27`] }, 'Le nombre manquant est 27.')
      + cm1Redac(`${Q} × 7 = 100 − 16`, { suite: ['100 − 16 = 84', `${Q} = 84 ÷ 7`, `${Q} = 12`] }, 'Le nombre manquant est 12.')
      + cm1Redac(`300 − ${Q} = 25 × 4`, { suite: ['25 × 4 = 100', `${Q} = 300 − 100`, `${Q} = 200`] }, 'Le nombre manquant est 200.')],
    [`Vrai ou faux ?${cm1Liste(['15 + 25 = 50 − 10', '6 × 7 = 40 + 3', '100 ÷ 4 = 5 × 5'])}`,
      cm1Redac('15 + 25 = 50 − 10', { suite: ['15 + 25 = 40', '50 − 10 = 40'] }, 'C\'est vrai : les deux membres valent 40.')
      + cm1Redac('6 × 7 = 40 + 3', { suite: ['6 × 7 = 42', '40 + 3 = 43'] }, 'C\'est faux : 42 et 43 sont différents.')
      + cm1Redac('100 ÷ 4 = 5 × 5', { suite: ['100 ÷ 4 = 25', '5 × 5 = 25'] }, 'C\'est vrai : les deux membres valent 25.')],
    ['Un taxi coûte 4 € de prise en charge plus 2 € par km. Écris le prix pour K km. Combien pour 15 km ?',
      cm1Redac('Prix pour K km', '(K × 2) + 4', 'Le prix en euros est (K × 2) + 4.')
      + cm1Redac('Prix pour 15 km', ['(15 × 2) + 4', '30 + 4', '34'], 'Pour 15 km, on paie 34 €.')],
    ['Suite : 3 ; 7 ; 15 ; 31 ; … Trouve la règle et les deux termes suivants.',
      cm1Redac('Règle', { suite: ['3 × 2 + 1 = 7', '7 × 2 + 1 = 15'] }, 'On multiplie par 2 et on ajoute 1.')
      + cm1Redac('Termes suivants', { suite: ['31 × 2 + 1 = 63', '63 × 2 + 1 = 127'] }, 'Les deux termes suivants sont 63 et 127.')],
    ['Avec la pyramide de carrés du cours, combien de carrés à l\'étape 7 ? À quelle étape y a-t-il 144 carrés ?',
      cm1Redac('Carrés à l\'étape 7', '7 × 7 = 49', 'À l\'étape 7, il y a 49 carrés.')
      + cm1Redac('Étape à 144 carrés', '12 × 12 = 144', 'Il y a 144 carrés à l\'étape 12.')],
    [`Programme de calcul :${cm1Liste(['choisir un nombre', 'le multiplier par 3', 'ajouter 5', 'multiplier par 2'])}Que donne-t-il avec 4 ? Quel nombre a été choisi si on obtient 52 ?`,
      cm1Redac('Avec 4', { suite: ['4 × 3 = 12', '12 + 5 = 17', '17 × 2 = 34'] }, 'Avec 4, le programme donne 34.')
      + cm1Redac('Nombre choisi pour obtenir 52', { suite: ['52 ÷ 2 = 26', '26 − 5 = 21', '21 ÷ 3 = 7'] }, 'En remontant le programme, on trouve que le nombre choisi était 7.')],
    ['La somme de deux nombres est 100 ; l\'un vaut 3 fois l\'autre. Quels sont-ils ?',
      cm1Redac('Les deux nombres', { suite: ['1 + 3 = 4 parts égales', '100 ÷ 4 = 25', '25 × 3 = 75'] }, 'Les deux nombres sont 25 et 75.')],
    ['Un sac de billes et 3 billes pèsent autant que 45 billes (le sac est plein, toutes les billes identiques). Combien de billes dans le sac ?',
      cm1Redac('Billes dans le sac', '45 − 3 = 42', 'Le sac contient 42 billes.')],
  ], { titre: 'Rédaction type : « Égalité à trou »', lignes: [['6 × 8 = 48', 'Je calcule le membre complet.'], ['■ = 178 − 48 = 130', 'Je cherche le nombre manquant.'], ['178 − 130 = 48 ✔', 'Je vérifie.']] }),
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
