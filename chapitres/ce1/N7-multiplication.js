/* ============================================================
   CHAPITRE : La multiplication : le signe × (CE1, N7, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : passer de l'addition répétée à
   la multiplication (4 + 4 + 4 = 3 × 4, « 3 fois 4 ») ; lire et écrire le signe × ; représenter par
   des groupes et des rangées de jetons ; 3 × 4 = 4 × 3 (on tourne le rectangle) ; multiplier par
   1, 2, 10 ; résoudre des problèmes de groupes égaux.
   Pensé pour être projeté : les rangées de jetons qui apparaissent, puis la feuille qui tourne.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'La multiplication : le signe ×', slug: 'multiplication',
  cours: `
${cm1Lecon(1, 'Des groupes égaux')}
${cpAnimGroupes('ce1-n7-groupes', { g: 3, n: 4, legende: '3 paquets de 4 : on peut écrire une addition… ou une multiplication.' })}
${cm1Def(`${cm1Liste(['4 + 4 + 4 = 12', '3 × 4 = 12'])}${P('On lit « <b>3 fois 4</b> égale 12 ». Le signe <b>×</b> se lit « fois ».')}`, 'Le signe ×')}
${cm1Regle('Quand on ajoute plusieurs fois le <b>même nombre</b>, on peut écrire une multiplication : c\'est plus court !')}

${cm1Lecon(2, 'Des rangées de jetons')}
${ce2AnimJetons('ce1-n7-jetons', { l: 3, c: 5, legende: 'Choisissez le nombre de rangées et de jetons par rangée. À la fin, on tourne la feuille : le nombre de jetons ne change pas.' })}
${cm1Def(`${lig(ce1Rangees(3, 5))}${P('3 rangées de 5 jetons : <b>3 × 5 = 15</b>.')}`, 'En rangées')}
${cm1Regle(`On peut tourner le rectangle de jetons :${cm1Liste(['3 × 5 = 15', '5 × 3 = 15'])}${P('L\'ordre ne change pas le résultat.')}`, 'Dans les deux sens')}

${cm1Lecon(3, 'Multiplier par 1, par 2, par 10')}
${cm1Regle(`${cm1Liste(['× 1 : le nombre ne change pas. 1 × 7 = 7.', '× 2 : c\'est le double. 2 × 7 = 14.', '× 10 : on ajoute un 0. 10 × 7 = 70 (7 dizaines).'])}`, 'À savoir')}
${cm1Astuce('2 × 8, c\'est le double de 8 : 8 + 8 = 16. Les doubles du CP servent encore !')}

${cm1Lecon(4, 'Problèmes de multiplication')}
${cm1Exemple('Exemple', [`Une boîte contient 6 œufs. Combien d\'œufs dans 4 boîtes ?${cm1Redac('Œufs dans 4 boîtes', { suite: ['6 + 6 + 6 + 6 = 24', '4 × 6 = 24'] }, 'Il y a 24 œufs dans 4 boîtes.')}`])}
`,
  methode: `
${cm1Demo('ce1-n7-m-ecrire', 'Écrire une multiplication', 'Écris 5 + 5 + 5 + 5 avec le signe ×.')}
${cm1Demo('ce1-n7-m-pb', 'Résoudre un problème', 'Un vélo a 2 roues. Combien de roues ont 7 vélos ?')}
`,
  demos: [
    ['ce1-n7-m-ecrire', [
      { expr: '5 + 5 + 5 + 5', note: 'Je compte combien de fois j\'ajoute 5 : 4 fois.' },
      { expr: '4 × 5', note: '« 4 fois 5 ».', fig: ce1Rangees(4, 5, { p: 22 }) },
      { expr: '4 × 5 = 20', note: 'Je compte de 5 en 5 : 5, 10, 15, 20.' },
    ]],
    ['ce1-n7-m-pb', [
      { expr: '7 vélos de 2 roues', note: '7 groupes égaux de 2.' },
      { expr: '7 × 2', note: 'C\'est le double de 7.' },
      { expr: '7 × 2 = 14', note: 'Les 7 vélos ont <b>14 roues</b>.' },
    ]],
  ],
  exos: cm1Exos('ce1-n7', [
    ['Écris avec le signe × : 3 + 3 + 3 + 3 + 3.',
      cm1Redac('Avec le signe ×', '5 × 3 = 15', 'On ajoute 5 fois le nombre 3 : 5 × 3 = 15.')],
    [`Écris la multiplication qui donne le nombre de jetons.${lig(ce1Rangees(4, 6, { p: 22 }))}`,
      cm1Redac('Les jetons', '4 × 6 = 24', '4 rangées de 6 jetons : il y a 24 jetons.')],
    ['Calcule : 2 × 9.',
      cm1Redac('2 × 9', '9 + 9 = 18', '2 × 9 = 18, c\'est le double de 9.')],
    ['Calcule : 10 × 6.',
      cm1Redac('10 × 6', '10 × 6 = 60', '10 fois 6, c\'est 6 dizaines : 60.')],
    ['Calcule : 5 × 4, puis 4 × 5.',
      cm1Redac('5 × 4 et 4 × 5', { suite: ['5 × 4 = 20', '4 × 5 = 20'] }, 'Les deux donnent 20 : l\'ordre ne change pas le résultat.')],
    ['Une table a 4 pieds. Combien de pieds ont 6 tables ?',
      cm1Redac('Pieds des tables', '6 × 4 = 24', '6 tables ont 24 pieds.')],
    ['Dans un jardin, il y a 3 rangées de 10 salades. Combien de salades en tout ?',
      cm1Redac('Les salades', '3 × 10 = 30', 'Il y a 30 salades.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le signe ×', [
    'Le signe <b>×</b> a été utilisé pour la première fois dans un livre de l\'Anglais <b>William Oughtred</b>, en 1631. Avant, on écrivait la multiplication avec des mots.',
    'Le savant allemand <b>Leibniz</b> n\'aimait pas ce signe, qui ressemble trop à la lettre x : il préférait un point. Aujourd\'hui, on utilise les deux, mais à l\'école, on garde la croix.',
  ]),
  quiz: [
    { q: '6 + 6 + 6 = …', opts: ['3 × 6', '6 × 6', '3 + 6'], correct: 0 },
    { q: '2 × 8 = …', opts: ['16', '10', '28'], correct: 0 },
    { q: '10 × 4 = …', opts: ['40', '14', '104'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '« 3 fois 5 » s\'écrit…', r: ['3 × 5', '3 + 5', '35', '5 − 3'], ok: 0 },
    { l: 1, q: '4 + 4 + 4 + 4 = …', r: ['4 × 4', '4 × 3', '4 + 3', '44'], ok: 0 },
    { l: 2, q: `Combien ?${lig(ce1Rangees(2, 6, { p: 18 }))}`, r: ['12', '8', '10', '26'], ok: 0 },
    { l: 3, q: '1 × 9 = …', r: ['9', '10', '1', '19'], ok: 0 },
    { l: 3, q: '2 × 6 = …', r: ['12', '8', '26', '3'], ok: 0 },
    { l: 3, q: '10 × 3 = …', r: ['30', '13', '103', '7'], ok: 0 },
    { l: 4, q: '5 sacs de 2 billes : …', r: ['10 billes', '7 billes', '25 billes', '52 billes'], ok: 0 },
  ],
});
})();
