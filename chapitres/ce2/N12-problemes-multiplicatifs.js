/* ============================================================
   CHAPITRE : Problèmes multiplicatifs (CE2, N12, période 5)
   Programme du cycle 2 (CE2) : problèmes multiplicatifs en une étape (valeur du tout ; partage
   équitable : valeur d'une part avec un schéma en barre, nombre de parts sur un champ réduit) ;
   comparaison multiplicative « fois plus / fois moins », distinguée de « de plus / de moins »
   (la trottinette 4 fois plus chère que le casque à 32 €) ; produits cartésiens : tableau
   (3 pantalons × 7 tee-shirts) ou arbre (le clown : 2 chapeaux, 3 tee-shirts, 2 pantalons).
   ============================================================ */
(() => {
// Barres « fois plus » : une barre de base, une barre faite de n fois la base.
function foisPlus(n, base, lab1, lab2){
  const w = 70; let s = `<text x="70" y="25" font-size="13" text-anchor="end" fill="#1F3A5C" font-weight="600">${lab1}</text><rect x="80" y="8" width="${w}" height="26" fill="#E9C46A" fill-opacity=".5" stroke="#1F3A5C" stroke-width="1.5"/><text x="${80 + w / 2}" y="26" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${base}</text>`;
  s += `<text x="70" y="65" font-size="13" text-anchor="end" fill="#1F3A5C" font-weight="600">${lab2}</text>`;
  for(let i = 0; i < n; i++) s += `<rect x="${80 + i * w}" y="48" width="${w}" height="26" fill="#2EA8C9" fill-opacity=".3" stroke="#1F3A5C" stroke-width="1.5"/><text x="${80 + i * w + w / 2}" y="66" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${base}</text>`;
  return `<svg viewBox="0 0 ${90 + n * w} 80" style="width:100%;max-width:${90 + n * w}px;display:block;margin:6px auto;">${s}</svg>`;
}
// Arbre des costumes du clown : 2 chapeaux × 3 tee-shirts × 2 pantalons.
function arbre(){
  const CH = [['rouge', '#D62828'], ['bleu', '#2E6FD6']], TS = [['violet', '#7A4FC0'], ['noir', '#222'], ['jaune', '#E9B21A']], PA = [['gris', '#888'], ['vert', '#2E9C6A']];
  const H = 12 * 22 + 10; let s = '', y = 16;
  const pt = (x, y, c, t) => `<circle cx="${x}" cy="${y}" r="6" fill="${c}"/><text x="${x + 10}" y="${y + 4}" font-size="12" fill="#1F3A5C">${t}</text>`;
  CH.forEach(([n1, c1], i) => {
    const y1 = 16 + (i * 6 + 2.5) * 22;
    TS.forEach(([n2, c2], j) => {
      const y2 = 16 + (i * 6 + j * 2 + 0.5) * 22;
      PA.forEach(([n3, c3], k) => { const y3 = 16 + (i * 6 + j * 2 + k) * 22; s += `<line x1="300" y1="${y2}" x2="364" y2="${y3}" stroke="#B8C2CE"/>` + pt(370, y3, c3, 'pantalon ' + n3); });
      s += `<line x1="200" y1="${y1}" x2="244" y2="${y2}" stroke="#B8C2CE"/>` + pt(250, y2, c2, n2);
    });
    s += `<line x1="10" y1="${H / 2 - 5}" x2="104" y2="${y1}" stroke="#B8C2CE"/>` + pt(110, y1, c1, 'chapeau ' + n1);
  });
  return `<svg viewBox="0 0 480 ${H}" style="width:100%;max-width:480px;display:block;margin:6px auto;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Problèmes multiplicatifs', slug: 'problemes-multiplicatifs',
  cours: `
${cm1Lecon(1, 'Chercher le tout ou une part')}
${cm1Regle('Quand on connaît <b>le nombre de parts</b> et <b>la valeur d\'une part</b>, on trouve le tout par une <b>multiplication</b>. Quand on connaît le tout et le nombre de parts égales, on trouve une part par une <b>division</b> (en s\'aidant des tables).')}
${cm1Exemple('Exemples :', ['8 paquets de 125 feuilles : 8 × 125 = <b>1 000 feuilles</b>.', '6 dictionnaires coûtent 72 € : 72 ÷ 6 = <b>12 €</b> chacun, car 6 × 12 = 72.'])}

${cm1Lecon(2, '« Fois plus », « fois moins »')}
${cm1Regle('« <b>4 fois plus</b> cher » : on <b>multiplie</b> par 4. « <b>4 fois moins</b> cher » : on <b>divise</b> par 4. Ne pas confondre avec « 4 € <b>de plus</b> » (on ajoute 4) !')}
${cm1Exemple('Une trottinette coûte 4 fois plus cher qu\'un casque. Le casque coûte 32 €.')}
${foisPlus(4, '32 €', 'Casque', 'Trottinette')}
<p class="hint" style="text-align:center;">La trottinette coûte 4 × 32 = <b>128 €</b>. (Si elle coûtait 4 € de plus, elle coûterait 36 €.)</p>

${cm1Lecon(3, 'Compter toutes les possibilités')}
${cm1Regle('Pour compter toutes les façons d\'associer des objets, on fait un <b>tableau</b> (2 sortes d\'objets) ou un <b>arbre</b> (3 sortes ou plus). Le nombre de possibilités s\'obtient par une <b>multiplication</b>.')}
${cm1Exemple('Une poupée a 3 pantalons et 7 tee-shirts : un tableau de 3 lignes et 7 colonnes a 3 × 7 = <b>21 cases</b>, donc 21 tenues.')}
${cm1Exemple('Un clown a 2 chapeaux, 3 tee-shirts et 2 pantalons :')}
${arbre()}
<p class="hint" style="text-align:center;">On compte les branches au bout de l'arbre : 2 × 3 × 2 = <b>12 costumes</b>.</p>
`,
  methode: `
${cm1Demo('ce2-pm-moins', 'Résoudre un problème « fois moins »', 'Un vélo coûte 240 €. Un ballon coûte 8 fois moins cher. Combien coûte le ballon ?')}
${cm1Demo('ce2-pm-tableau', 'Compter des menus avec un tableau', 'À la cantine, on choisit une entrée parmi 3 et un dessert parmi 4. Combien de menus différents ?')}
`,
  demos: [
    ['ce2-pm-moins', [
      { expr: '« 8 fois moins cher » : on divise par 8.', note: 'Le vélo vaut 8 fois le prix du ballon.' },
      { expr: '8 × 30 = 240, donc 240 ÷ 8 = 30', note: 'Je cherche « 8 fois combien font 240 ? »' },
      { expr: 'Le ballon coûte 30 €.', note: 'Vérification : 8 × 30 = 240 ✔' },
    ]],
    ['ce2-pm-tableau', [
      { expr: cm1Tableau(['', 'D1', 'D2', 'D3', 'D4'], [['E1', '✔', '✔', '✔', '✔'], ['E2', '✔', '✔', '✔', '✔'], ['E3', '✔', '✔', '✔', '✔']]), note: 'Une ligne par entrée, une colonne par dessert : chaque case est un menu.' },
      { expr: '3 × 4 = 12', note: '3 lignes de 4 cases.' },
      { expr: 'Il y a 12 menus différents.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-pm', [
    ['Un carnet coûte 3 €. Combien coûtent 25 carnets ?', '25 × 3 = 75 €.'],
    ['Paul a 9 ans. Son grand-père a 7 fois plus. Quel âge a son grand-père ?', '9 × 7 = 63 ans.'],
    ['Un livre coûte 18 €. Un magazine coûte 3 fois moins cher. Combien coûte le magazine ?', '18 ÷ 3 = 6 €.'],
    ['Léa a 12 billes. Tom en a 3 de plus. Hugo en a 3 fois plus que Léa. Combien en ont Tom et Hugo ?', 'Tom : 15 · Hugo : 36.'],
    ['On a 4 sortes de pain et 5 sortes de fromage. Combien de sandwichs différents (un pain, un fromage) ?', '4 × 5 = 20 sandwichs.'],
    ['Une glace : 2 cornets, 3 parfums, 2 sauces. Combien de glaces différentes ?', '2 × 3 × 2 = 12 glaces.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les arbres de choix', [
    'Les <b>arbres</b> servent à compter les possibilités depuis longtemps. Au XVII<sup>e</sup> siècle, les mathématiciens français <b>Blaise Pascal</b> et <b>Pierre de Fermat</b> s\'écrivaient des lettres pour résoudre des problèmes de jeux de dés : ils devaient compter tous les cas possibles. C\'est le début du calcul des probabilités.',
  ]),
  quiz: [
    { q: 'Un casque coûte 20 €. Un vélo coûte 5 fois plus. Le vélo coûte…', opts: ['25 €', '100 €', '4 €'], correct: 1 },
    { q: '2 chapeaux et 4 écharpes : combien de tenues ?', opts: ['6', '8', '16'], correct: 1 },
    { q: 'Un jeu coûte 36 €, une balle 4 fois moins. La balle coûte…', opts: ['9 €', '32 €', '144 €'], correct: 0 },
  ],
  flash: [
    { q: 'Un stylo coûte 2 €. Combien coûtent 15 stylos ?', r: ['17 €', '30 €', '13 €', '25 €'], ok: 1 },
    { q: 'Léa a 6 ans. Sa mère a 6 fois plus. Âge de sa mère ?', r: ['12 ans', '36 ans', '30 ans', '42 ans'], ok: 1 },
    { q: 'Un vélo coûte 200 €, un casque 5 fois moins. Le casque coûte…', r: ['40 €', '195 €', '1 000 €', '50 €'], ok: 0 },
    { q: '3 pantalons et 4 pulls : combien de tenues ?', r: ['7', '12', '10', '34'], ok: 1 },
    { q: '« 3 de plus que 10 », c\'est…', r: ['13', '30', '7', '103'], ok: 0 },
    { q: '« 3 fois plus que 10 », c\'est…', r: ['13', '30', '7', '103'], ok: 1 },
    { q: '6 amis se partagent 42 bonbons. Chacun en a…', r: ['6', '7', '8', '36'], ok: 1 },
  ],
});
})();
