/* ============================================================
   CHAPITRE : Résolution de problèmes (CM1, N9, période 4)
   Programme du cycle 3 (CM1) : résoudre des problèmes additifs, multiplicatifs, de partage et de
   groupement, en une ou plusieurs étapes, en mobilisant des modélisations (schémas en barres) ;
   passer du texte au schéma, du schéma au calcul, du calcul à la phrase réponse ; contrôler la
   vraisemblance du résultat. Nombres entiers jusqu'à 999 999 et décimaux (période 4).
   ============================================================ */
(() => {
// Schéma en barres : lignes = [[[texte, largeur, couleur]...]], accolade = texte du tout (au-dessus), inconnue en pointillés si couleur 'x'.
function schema(lignes, tout, largeurTotale){
  const k = 3.2, W = (largeurTotale || 100) * k + 20; let y = tout ? 36 : 6;
  let s = `<svg viewBox="0 0 ${W} ${y + lignes.length * 44}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">`;
  if(tout) s += `<path d="M10 30 Q10 18 22 18 L${W / 2 - 10} 18 Q${W / 2} 18 ${W / 2} 8 Q${W / 2} 18 ${W / 2 + 10} 18 L${W - 22} 18 Q${W - 10} 18 ${W - 10} 30" fill="none" stroke="#1F3A5C" stroke-width="1.5"/><text x="${W / 2}" y="2" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${tout}</text>`;
  lignes.forEach(l => { let x = 10;
    l.forEach(([t, w, c]) => { const inc = c === 'x';
      s += `<rect x="${x}" y="${y}" width="${w * k}" height="32" fill="${inc ? '#fff' : c}" fill-opacity="${inc ? 1 : .35}" stroke="${inc ? '#E35D3A' : '#1F3A5C'}" stroke-width="1.6" ${inc ? 'stroke-dasharray="6 4"' : ''}/><text x="${x + w * k / 2}" y="${y + 21}" font-size="13" text-anchor="middle" fill="${inc ? '#E35D3A' : '#1F3A5C'}" font-family="Space Grotesk" font-weight="700">${t}</text>`;
      x += w * k; });
    y += 44; });
  return s.replace(/viewBox="0 0 (\S+) (\S+)"/, (m, a) => `viewBox="0 -14 ${a} ${y + 14}"`) + '</svg>';
}
const BL = '#2EA8C9', VE = '#2E9C6A', VI = '#7A4FC0';
cm1Chapitre({
  titre: 'Résolution de problèmes', slug: 'resolution-problemes',
  cours: `
${cm1Lecon(1, 'Les étapes pour résoudre un problème')}
${cm1Regle(`<ol style="margin:0;padding-left:20px;line-height:1.9;">
<li><b>Je lis</b> l'énoncé en entier, deux fois, et je l'explique avec mes mots.</li>
<li><b>Je repère la question</b> : qu'est-ce que je cherche ?</li>
<li><b>Je trie les données</b> : quelles informations sont utiles ?</li>
<li><b>Je fais un schéma</b> (en barres) pour voir ce que je connais et ce que je cherche.</li>
<li><b>Je calcule</b>, en écrivant l'opération.</li>
<li><b>Je vérifie</b> que le résultat est possible, puis <b>j'écris une phrase réponse</b>.</li></ol>`, 'Méthode')}

${cm1Lecon(2, 'Chercher un tout ou une partie')}
${cm1Exemple('Une école a 128 filles et 115 garçons. Combien y a-t-il d\'élèves ?')}
${schema([[['128', 52, BL], ['115', 48, VE]]], '? élèves')}
<ul class="example-list"><li>On connaît les deux parties, on cherche le tout : <b>addition</b>. 128 + 115 = 243. Il y a 243 élèves.</li></ul>
${cm1Exemple('Un livre a 250 pages. Nina en a lu 175. Combien lui en reste-t-il à lire ?')}
${schema([[['175 lues', 70, BL], ['?', 30, 'x']]], '250 pages')}
<ul class="example-list"><li>On connaît le tout et une partie, on cherche l'autre partie : <b>soustraction</b>. 250 − 175 = 75. Il lui reste 75 pages.</li></ul>

${cm1Lecon(3, 'Comparer deux quantités')}
${cm1Exemple('Paul a 36 cartes. Léa en a 18 de plus que Paul. Combien Léa a-t-elle de cartes ?')}
${ce2AnimBarres('cm1-rp-comp', { unite: 3, lignes: [['Paul', [[36, '36', BL, 'Paul a 36 cartes.']]], ['Léa', [[36, '36', VE, 'Léa en a autant que Paul…'], [18, '18', VI, '… et encore 18.']]]], total: '? cartes', totalTexte: 'Léa a 36 + 18 = <b>54 cartes</b>.' })}
<ul class="example-list"><li>Léa a « autant que Paul, et 18 de plus » : 36 + 18 = 54. Léa a 54 cartes.</li></ul>
${cm1Astuce('« De plus » ne veut pas toujours dire addition ! « Paul a 36 cartes, il en a 18 de plus que Léa » : c\'est Léa qui en a moins, 36 − 18 = 18. Le schéma évite ce piège.')}

${cm1Lecon(4, 'Problèmes de multiplication et de division')}
${cm1Exemple('Plusieurs fois la même quantité : 6 boîtes de 24 crayons. Combien de crayons ?')}
${schema([[['24', 16, BL], ['24', 16, BL], ['24', 16, BL], ['24', 16, BL], ['24', 16, BL], ['24', 16, BL]]], '? crayons', 96)}
<ul class="example-list"><li>6 fois 24 : <b>multiplication</b>. 6 × 24 = 144. Il y a 144 crayons.</li></ul>
${cm1Exemple('Partage : on partage 96 billes entre 4 enfants. Combien chacun en reçoit-il ?')}
${schema([[['?', 24, 'x'], ['?', 24, 'x'], ['?', 24, 'x'], ['?', 24, 'x']]], '96 billes', 96)}
<ul class="example-list"><li>On cherche la valeur d'une part : <b>division</b>. 96 ÷ 4 = 24. Chacun reçoit 24 billes.</li></ul>
${ce2AnimPartage('cm1-rp-partage', { legende: 'Un partage équitable, avec de plus petits nombres : 24 billes entre 4 enfants.', presets: [{ nom: '24 billes, 4 enfants', total: 24, parts: 4, etiq: 'enfant', objets: 'billes', fin: 'Chaque enfant reçoit <b>6 billes</b> : 24 ÷ 4 = 6.' }] })}
${cm1Exemple('Groupement : 150 œufs à ranger dans des boîtes de 6. Combien de boîtes ?', ['On cherche combien de fois 6 il y a dans 150 : <b>division</b>. 150 ÷ 6 = 25. Il faut 25 boîtes.'])}

${cm1Lecon(5, 'Problèmes à plusieurs étapes')}
${cm1Regle('Certains problèmes demandent <b>plusieurs calculs</b>. On cherche d\'abord une <b>question intermédiaire</b> utile, puis on répond à la question posée.')}
${cm1Exemple('Tom achète 3 cahiers à 2 € et un stylo à 4 €. Il paie avec un billet de 20 €. Combien lui rend-on ?', ['Question intermédiaire : combien coûtent les cahiers ? 3 × 2 = 6 €.', 'Combien dépense-t-il en tout ? 6 + 4 = 10 €.', 'Combien lui rend-on ? 20 − 10 = 10 €. On lui rend 10 €.'])}
`,
  methode: `
${cm1Demo('rp-etapes', 'Résoudre un problème en suivant les étapes', 'Un club de sport a 1 250 adhérents. 480 font du foot, 325 du basket, les autres du tennis. Combien font du tennis ?')}
${cm1Demo('rp-division', 'Division avec reste : interpréter le résultat', '100 élèves partent en sortie. Un minibus transporte 8 élèves. Combien faut-il de minibus ?')}
`,
  demos: [
    ['rp-etapes', [
      { expr: 'Je cherche : le nombre de joueurs de tennis.', note: 'On repère la question.' },
      { expr: 'Tout : 1 250 ; foot : 480 ; basket : 325', note: 'On trie les données utiles.' },
      { expr: schema([[['480', 38, BL], ['325', 26, VE], ['? tennis', 36, 'x']]], '1 250 adhérents'), note: 'Le schéma montre qu\'on connaît le tout et deux parties.' },
      { expr: '480 + 325 = 805', note: 'Question intermédiaire : combien font du foot ou du basket ?' },
      { expr: '1 250 − 805 = 445', note: 'On enlève cette partie du tout.' },
      { expr: '445 adhérents font du tennis.', note: 'Vérification : 480 + 325 + 445 = 1 250. ✔' },
    ]],
    ['rp-division', [
      { expr: '100 ÷ 8', note: 'On cherche combien de groupes de 8 on peut faire avec 100 élèves : c\'est une division.' },
      { expr: '100 = 8 × 12 + 4', note: '12 minibus transportent 96 élèves ; il reste 4 élèves.' },
      { expr: '12 + 1 = 13', note: 'Les 4 élèves restants ont besoin d\'un minibus de plus !' },
      { expr: 'Il faut 13 minibus.', note: 'Le reste de la division change la réponse : il faut toujours relire la question.' },
    ]],
  ],
  exos: cm1Exos('rp', [
    ['Un fermier a 245 poules et 78 canards. Combien a-t-il de volailles ?',
      cm1Redac('Nombre de volailles', '245 + 78 = 323', 'Le fermier a 323 volailles.')],
    ['Un avion peut transporter 186 passagers. 159 places sont occupées. Combien de places sont libres ?',
      cm1Redac('Places libres', '186 − 159 = 27', 'Il reste 27 places libres.')],
    ['Emma a 1 450 €. Elle a 380 € de moins que son frère. Combien a son frère ?',
      cm1Redac('Argent du frère', '1 450 + 380 = 1 830', 'Emma a moins que son frère, donc son frère a plus : il a 1 830 €.')],
    ['Une boîte contient 12 œufs. Combien d\'œufs y a-t-il dans 25 boîtes ?',
      cm1Redac('Nombre d\'œufs', '25 × 12 = 300', 'Il y a 300 œufs dans 25 boîtes.')],
    ['On range 84 livres sur 7 étagères, autant sur chacune. Combien de livres y a-t-il par étagère ?',
      cm1Redac('Livres par étagère', '84 ÷ 7 = 12', 'Il y a 12 livres sur chaque étagère.')],
    ['Pour une fête, on prévoit 3 gâteaux pour 8 personnes. Il y a 40 invités. Combien de gâteaux faut-il ?',
      cm1Redac('Groupes de 8 personnes', '40 ÷ 8 = 5', '40 personnes, c\'est 5 groupes de 8 personnes.') + cm1Redac('Nombre de gâteaux', '5 × 3 = 15', 'Il faut 15 gâteaux.')],
    ['Au cinéma, une place adulte coûte 9 € et une place enfant 6 €. Combien paie une famille de 2 adultes et 3 enfants ?',
      cm1Redac('Prix total', ['2 × 9 + 3 × 6', '18 + 18', '36'], 'La famille paie 36 €.')],
    ['On a 75 photos à coller dans un album, 6 par page. Combien de pages faut-il ?',
      cm1Redac('Pages pleines', '75 = 6 × 12 + 3', 'On remplit 12 pages et il reste 3 photos.') + cm1Redac('Nombre de pages', '12 + 1 = 13', 'Il faut une page de plus pour les 3 dernières photos : il faut 13 pages.')],
  ], { titre: 'Rédaction type d\'un problème', lignes: [['Je cherche…', 'J\'écris ce que je cherche.'], ['Calcul : 6 × 24 = 144', 'J\'écris l\'opération et son résultat.'], ['Il y a 144 crayons.', 'Je réponds par une phrase, avec l\'unité.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : Polya et l\'art de résoudre', [
    'Les plus anciens problèmes de mathématiques connus ont près de 4 000 ans : ils sont écrits sur des tablettes d\'argile en Mésopotamie et sur des papyrus en Égypte. On y partage du pain, on calcule des récoltes, on mesure des champs.',
    'En 1945, le mathématicien hongrois <b>George Pólya</b> publie un livre célèbre, <i>Comment poser et résoudre un problème</i>. Il y propose 4 étapes : comprendre le problème, trouver un plan, le mettre en œuvre, vérifier. Ce sont presque les mêmes que dans ce chapitre !',
    'Les <b>schémas en barres</b> sont très utilisés à Singapour, dont les élèves sont parmi les meilleurs du monde en résolution de problèmes.',
  ]),
  quiz: [
    { q: 'On connaît le tout et une partie ; on cherche l\'autre partie. On fait…', opts: ['une addition', 'une soustraction', 'une multiplication'], correct: 1 },
    { q: '5 paquets de 8 biscuits : combien de biscuits ?', opts: ['13', '40', '3'], correct: 1 },
    { q: '30 élèves, des tables de 4 places. Combien de tables faut-il au minimum ?', opts: ['7', '8', '120'], correct: 1 },
  ],
});
})();

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const OPS = '+ · − · × · ÷';
const op = items => ({ eleve: '<div class="pl-col1">' + plListe(items.map(([t]) => `${t} <b>${OPS}</b>`)) + '</div>', corr: plListe(items.map(([t, r]) => `${t} ${plEntoure(r)}`)) });
const P = (parts, o) => cm1Paquets(parts, Object.assign({ L: 260, xt: 70 }, o || {}));
const petit = h => `<div style="max-width:240px;">${h}</div>`;
const lettre = t => `<div style="font:700 13px 'Space Grotesk',sans-serif;color:#1F3A5C;margin-top:4px;">${t}</div>`;
PLANCHES['cm1|Résolution de problèmes'] = [
  { titre: 'Chercher un tout, une partie, comparer', duree: '40 min',
    attendus: ['Comprendre l\'énoncé et choisir l\'opération', 'Représenter un problème par un schéma en barres', 'Rédiger la réponse : calcul et phrase'],
    exos: [
      { etoiles: 1, consigne: 'Entoure l\'opération qui permet de répondre.',
        ...op([['J\'ai 45 billes, j\'en gagne 18. Combien en ai-je ?', '+'], ['Le car a 52 places ; 37 sont occupées. Combien sont libres ?', '−'], ['6 boîtes de 12 œufs. Combien d\'œufs ?', '×'], ['48 bonbons pour 6 enfants. Combien chacun ?', '÷']]) },
      { etoiles: 2, consigne: `Quel schéma va avec chaque problème ?
        <div class="pl-col1">${plListe(['<b>Problème 1</b> : Léo a 35 €. Il dépense 12 €. Combien lui reste-t-il ?', '<b>Problème 2</b> : Léa a 12 € de plus que Léo, qui a 35 €. Combien a Léa ?', '<b>Problème 3</b> : Léo a 12 € et Léa a 35 €. Combien ont-ils ensemble ?'])}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px 12px;align-items:start;"><div>${lettre('A') + petit(P([[12, '12'], [35, '35']], { titre: '?', L: 160, xt: 34 }))}</div><div>${lettre('B') + petit(P([[12, '12'], [23, '?']], { titre: '35', L: 160, xt: 34, echelle: 47 }))}</div><div>${lettre('C') + petit(P([[35, '35']], { titre: 'Léo', L: 160, xt: 34, echelle: 47 }) + P([[35, '35'], [12, '12']], { titre: 'Léa', L: 160, xt: 34, echelle: 47 }))}</div></div>`,
        eleve: plGrille(['Problème 1 : schéma ' + B(2), 'Problème 2 : schéma ' + B(2), 'Problème 3 : schéma ' + B(2)], 3),
        corr: plGrille(['Problème 1 : schéma ' + R('B'), 'Problème 2 : schéma ' + R('C'), 'Problème 3 : schéma ' + R('A')], 3) },
      { etoiles: 1, col: 1, consigne: 'Une classe a 28 élèves, dont 13 filles. Combien y a-t-il de garçons ? Complète.',
        eleve: P([[13, 'filles : 13'], [15, 'garçons : ?']], { titre: '28 élèves' }) + plListe(['Calcul : 28 − 13 = ' + B(3), 'Il y a ' + B(3) + ' garçons.']),
        corr: P([[13, 'filles : 13'], [15, 'garçons : ?']], { titre: '28 élèves' }) + plListe(['Calcul : 28 − 13 = ' + R(15), 'Il y a ' + R(15) + ' garçons.']) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un pin mesure 18 m. Un chêne mesure 7 m de moins que le pin. Combien mesure le chêne ?',
        corr: cm1Redac('Hauteur du chêne', '18 m − 7 m = 11 m', 'Le chêne mesure 11 m.', P([[18, '18 m']], { titre: 'pin', echelle: 18, L: 200, xt: 50 }) + P([[11, '?'], [7, '7 m de moins']], { titre: 'chêne', echelle: 18, L: 200, xt: 50 })) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une bibliothèque a 1 250 livres. 486 sont des bandes dessinées. Combien de livres ne sont pas des bandes dessinées ?',
        corr: cm1Redac('Livres qui ne sont pas des BD', '1 250 − 486 = 764', '764 livres ne sont pas des bandes dessinées.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Inès a 15 ans de plus que son frère, qui a 9 ans. Quel âge aura Inès dans 5 ans ?',
        corr: cm1Redac('Âge d\'Inès aujourd\'hui', '9 + 15 = 24', 'Inès a 24 ans.') + cm1Redac('Âge d\'Inès dans 5 ans', '24 + 5 = 29', 'Dans 5 ans, Inès aura 29 ans.') },
    ] },
  { titre: 'Multiplier, diviser, problèmes à étapes', duree: '40 min',
    attendus: ['Résoudre des problèmes de multiplication et de division', 'Résoudre un problème à plusieurs étapes', 'Trier les informations utiles'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'opération qui permet de répondre.',
        ...op([['5 paquets de 8 gâteaux. Combien de gâteaux ?', '×'], ['72 élèves en équipes de 6. Combien d\'équipes ?', '÷'], ['Une place coûte 9 € ; on en achète 7. Prix ?', '×'], ['On partage 96 cartes entre 4 joueurs.', '÷']]) },
      { etoiles: 1, col: 1, consigne: 'Barre l\'information qui ne sert à rien pour répondre.',
        eleve: plListe(['Jeanne a 9 ans. Elle achète 4 cahiers à 3 € chacun. Combien paie-t-elle ?', 'Le train part à 8 h avec 120 voyageurs. À la gare, 35 voyageurs descendent. Combien en reste-t-il ?']),
        corr: plListe([plBarre('Jeanne a 9 ans.') + ' Elle achète 4 cahiers à 3 € chacun. Combien paie-t-elle ?', 'Le train part ' + plBarre('à 8 h') + ' avec 120 voyageurs. À la gare, 35 voyageurs descendent. Combien en reste-t-il ?']) },
      { etoiles: 2, consigne: 'Complète chaque schéma, puis le calcul.',
        eleve: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 16px;"><div>${P([[8, '8'], [8, '8'], [8, '8'], [8, '8'], [8, '8']], { titre: '?', L: 220, xt: 30 })}<div>5 paquets de 8 : 5 × 8 = ${B(3)}</div></div><div>${P([[1, '?'], [1, '?'], [1, '?'], [1, '?']], { titre: '36', L: 220, xt: 30 })}<div>36 partagé en 4 : 36 ÷ 4 = ${B(3)}</div></div></div>`,
        corr: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 16px;"><div>${P([[8, '8'], [8, '8'], [8, '8'], [8, '8'], [8, '8']], { titre: '40', L: 220, xt: 30 })}<div>5 paquets de 8 : 5 × 8 = ${R(40)}</div></div><div>${P([[1, '9'], [1, '9'], [1, '9'], [1, '9']], { titre: '36', L: 220, xt: 30 })}<div>36 partagé en 4 : 36 ÷ 4 = ${R(9)}</div></div></div>` },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une place de cinéma coûte 8 €. Combien paie l\'école pour 27 élèves ?',
        corr: cm1Redac('Prix des places', '27 × 8 € = 216 €', 'L\'école paie 216 €.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un fleuriste fait des bouquets de 7 roses. Il a 85 roses. Combien de bouquets fait-il ? Combien de roses restent ?',
        corr: cm1Redac('Division de 85 par 7', '85 = (7 × 12) + 1', 'Le fleuriste fait 12 bouquets ; il reste 1 rose.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Maman achète 3 kg de pommes à 2 € le kilo et un melon à 4 €. Elle paie avec un billet de 20 €. Combien lui rend-on ?',
        corr: cm1Redac('Prix des pommes', '3 × 2 € = 6 €', 'Les pommes coûtent 6 €.') + cm1Redac('Prix des achats', '6 € + 4 € = 10 €', 'Les achats coûtent 10 €.') + cm1Redac('Monnaie rendue', '20 € − 10 € = 10 €', 'On lui rend 10 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pour une sortie, le car coûte 312 € et l\'entrée au musée 4 € par élève. Il y a 26 élèves. La coopérative scolaire donne 100 €. Combien reste-t-il à payer ?',
        corr: cm1Redac('Prix des entrées', '26 × 4 € = 104 €', 'Les entrées coûtent 104 €.') + cm1Redac('Prix de la sortie', '312 € + 104 € = 416 €', 'La sortie coûte 416 €.') + cm1Redac('Reste à payer', '416 € − 100 € = 316 €', 'Il reste 316 € à payer.') },
    ] },
];
})();
