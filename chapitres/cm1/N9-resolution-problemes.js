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
${schema([[['Paul : 36', 60, BL]], [['Léa : 36', 60, VE], ['+ 18', 30, VI]]], null, 95)}
<ul class="example-list"><li>Léa a « autant que Paul, et 18 de plus » : 36 + 18 = 54. Léa a 54 cartes.</li></ul>
${cm1Astuce('« De plus » ne veut pas toujours dire addition ! « Paul a 36 cartes, il en a 18 de plus que Léa » : c\'est Léa qui en a moins, 36 − 18 = 18. Le schéma évite ce piège.')}

${cm1Lecon(4, 'Problèmes de multiplication et de division')}
${cm1Exemple('Plusieurs fois la même quantité : 6 boîtes de 24 crayons. Combien de crayons ?')}
${schema([[['24', 16, BL], ['24', 16, BL], ['24', 16, BL], ['24', 16, BL], ['24', 16, BL], ['24', 16, BL]]], '? crayons', 96)}
<ul class="example-list"><li>6 fois 24 : <b>multiplication</b>. 6 × 24 = 144. Il y a 144 crayons.</li></ul>
${cm1Exemple('Partage : on partage 96 billes entre 4 enfants. Combien chacun en reçoit-il ?')}
${schema([[['?', 24, 'x'], ['?', 24, 'x'], ['?', 24, 'x'], ['?', 24, 'x']]], '96 billes', 96)}
<ul class="example-list"><li>On cherche la valeur d'une part : <b>division</b>. 96 ÷ 4 = 24. Chacun reçoit 24 billes.</li></ul>
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
      { expr: 'Tout : 1 250 · foot : 480 · basket : 325', note: 'On trie les données utiles.' },
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
    ['Un fermier a 245 poules et 78 canards. Combien a-t-il de volailles ?', '245 + 78 = 323. Il a 323 volailles.'],
    ['Un avion peut transporter 186 passagers. 159 places sont occupées. Combien de places sont libres ?', '186 − 159 = 27. Il reste 27 places libres.'],
    ['Emma a 1 450 €. Elle a 380 € de moins que son frère. Combien a son frère ?', 'Le frère a plus : 1 450 + 380 = 1 830. Son frère a 1 830 €.'],
    ['Une boîte contient 12 œufs. Combien d\'œufs y a-t-il dans 25 boîtes ?', '25 × 12 = 300. Il y a 300 œufs.'],
    ['On range 84 livres sur 7 étagères, autant sur chacune. Combien de livres par étagère ?', '84 ÷ 7 = 12. Il y a 12 livres par étagère.'],
    ['Pour une fête, on prévoit 3 gâteaux pour 8 personnes. Il y a 40 invités. Combien de gâteaux faut-il ?', '40 personnes, c\'est 5 fois 8 personnes (40 ÷ 8 = 5), donc 5 × 3 = 15 gâteaux.'],
    ['Au cinéma, une place adulte coûte 9 € et une place enfant 6 €. Combien paie une famille de 2 adultes et 3 enfants ?', 'Adultes : 2 × 9 = 18 €. Enfants : 3 × 6 = 18 €. Total : 18 + 18 = 36 €.'],
    ['On a 75 photos à coller dans un album, 6 par page. Combien de pages faut-il ?', '75 = 6 × 12 + 3 : 12 pages pleines et 3 photos restantes, donc il faut 13 pages.'],
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
