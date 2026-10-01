/* ============================================================
   CHAPITRE : Le périmètre (CE2, M5, période 5)
   Programme du cycle 2 (CE2) : le périmètre d'une figure plane est la longueur de son contour ;
   comparer des périmètres sans règle graduée en reportant au compas les côtés sur une droite ;
   déterminer le périmètre d'un polygone en mesurant chaque côté. Carré et rectangle : aucune
   formule, mais on sait qu'il n'est pas nécessaire de mesurer tous les côtés.
   ============================================================ */
(() => {
// Report des côtés d'un triangle bout à bout sur une demi-droite.
const COTES = [[90, '#E35D3A', 'a'], [120, '#2EA8C9', 'b'], [70, '#2E9C6A', 'c']];
const TRI = `<svg viewBox="0 0 190 140" style="width:190px;max-width:100%;display:inline-block;vertical-align:middle;"><line x1="20" y1="120" x2="140" y2="120" stroke="#2EA8C9" stroke-width="3"/><line x1="140" y1="120" x2="90" y2="70" stroke="#2E9C6A" stroke-width="3"/><line x1="90" y1="70" x2="20" y2="120" stroke="#E35D3A" stroke-width="3"/>
<text x="80" y="136" font-size="13" fill="#2EA8C9" font-weight="700">b</text><text x="122" y="88" font-size="13" fill="#2E9C6A" font-weight="700">c</text><text x="44" y="88" font-size="13" fill="#E35D3A" font-weight="700">a</text></svg>`;
function report(){
  let x = 20, s = `<line x1="10" y1="40" x2="330" y2="40" stroke="#1F3A5C" stroke-width="1.5"/>`;
  COTES.forEach(([l, c, n]) => { const L = l * 0.86; s += `<line x1="${x}" y1="40" x2="${x + L}" y2="40" stroke="${c}" stroke-width="5"/><path d="M${x} 34 v12" stroke="#1F3A5C" stroke-width="2"/><text x="${x + L / 2}" y="30" font-size="13" text-anchor="middle" fill="${c}" font-weight="700">${n}</text><path d="M${x} 40 A${L / 2} ${L / 2} 0 0 1 ${x + L} 40" fill="none" stroke="#5B6472" stroke-dasharray="3 3"/>`; x += L; });
  s += `<path d="M${x} 34 v12" stroke="#1F3A5C" stroke-width="2"/><text x="${(20 + x) / 2}" y="68" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">périmètre = a + b + c</text>`;
  return `<svg viewBox="0 -20 340 96" style="width:340px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Le périmètre', slug: 'perimetre',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce que le périmètre ?')}
${cm1Def('Le <b>périmètre</b> d\'une figure, c\'est la <b>longueur de son contour</b> : la longueur d\'une ficelle qui ferait exactement le tour de la figure.')}
${cm1AnimPerimetre('ce2-perim')}

${cm1Lecon(2, 'Comparer des périmètres avec un compas')}
${cm1Regle('Sans règle graduée, on <b>reporte</b> chaque côté au compas, <b>bout à bout</b>, sur une droite. On obtient un segment qui a <b>la même longueur que le périmètre</b>. On peut alors comparer deux périmètres en comparant les deux segments.')}
<div class="figure-wrap" style="text-align:center;">${TRI}${report()}</div>

${cm1Lecon(3, 'Calculer le périmètre d\'un polygone')}
${cm1Regle('On <b>mesure chaque côté</b> avec la règle graduée, puis on <b>additionne</b> toutes les longueurs.')}
${cm1Exemple('Un triangle a des côtés de 3 cm, 4 cm et 5 cm :', ['périmètre = 3 cm + 4 cm + 5 cm = <b>12 cm</b>.'])}
${cm1Astuce('Pour un <b>carré</b>, les 4 côtés ont la même longueur : il suffit d\'en mesurer <b>un seul</b>. Pour un <b>rectangle</b>, il suffit de mesurer la <b>longueur</b> et la <b>largeur</b>, car les côtés opposés sont égaux.')}
${cm1Exemple('Un rectangle de 6 cm sur 2 cm :', ['périmètre = 6 cm + 2 cm + 6 cm + 2 cm = <b>16 cm</b>.'])}
`,
  methode: `
${cm1Demo('ce2-pe-carre', 'Trouver le périmètre d\'un carré', 'Un carré a un côté de 7 cm. Quel est son périmètre ?')}
${cm1Demo('ce2-pe-jardin', 'Résoudre un problème de clôture', 'Un jardin rectangulaire mesure 25 m de long et 10 m de large. Quelle longueur de grillage faut-il pour en faire le tour ?')}
`,
  demos: [
    ['ce2-pe-carre', [
      { expr: 'Un carré a 4 côtés de même longueur.', note: 'Il suffit d\'en mesurer un.' },
      { expr: '7 + 7 + 7 + 7 = 28', note: 'Ou 4 × 7 = 28.' },
      { expr: 'Le périmètre du carré est 28 cm.', note: '' },
    ]],
    ['ce2-pe-jardin', [
      { expr: 'Faire le tour : c\'est le périmètre.', note: '' },
      { expr: '25 + 10 + 25 + 10 = 70', note: 'Deux longueurs et deux largeurs.' },
      { expr: 'Il faut 70 m de grillage.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-pe', [
    ['Calcule le périmètre d\'un triangle de côtés 6 cm, 8 cm et 10 cm.', '24 cm.'],
    ['Calcule le périmètre d\'un carré de 5 cm de côté.', '20 cm.'],
    ['Calcule le périmètre d\'un rectangle de 9 cm sur 4 cm.', '9 + 4 + 9 + 4 = 26 cm.'],
    ['Un pentagone a 5 côtés de 3 cm. Quel est son périmètre ?', '15 cm.'],
    ['Faut-il mesurer les 4 côtés d\'un rectangle pour trouver son périmètre ? Pourquoi ?', 'Non : les côtés opposés ont la même longueur, il suffit de mesurer la longueur et la largeur.'],
    ['Une table carrée a un périmètre de 4 m. Quelle est la longueur d\'un côté ?', '1 m (4 côtés égaux).'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le mot « périmètre »', [
    'Le mot <b>périmètre</b> vient du grec : <i>péri</i> veut dire « autour » et <i>métron</i> « mesure ». C\'est donc « la mesure du tour ». On retrouve <i>péri</i> dans le mot <b>périphérique</b>, la route qui fait le tour d\'une ville.',
  ]),
  quiz: [
    { q: 'Le périmètre, c\'est…', opts: ['la longueur du contour', 'la surface intérieure', 'le nombre de côtés'], correct: 0 },
    { q: 'Le périmètre d\'un carré de 3 cm de côté est…', opts: ['9 cm', '12 cm', '6 cm'], correct: 1 },
    { q: 'Un rectangle de 5 cm sur 2 cm a pour périmètre…', opts: ['7 cm', '10 cm', '14 cm'], correct: 2 },
  ],
  flash: [
    { q: 'Périmètre d\'un carré de 4 cm de côté ?', r: ['8 cm', '12 cm', '16 cm', '20 cm'], ok: 2 },
    { q: 'Périmètre d\'un rectangle de 6 cm sur 3 cm ?', r: ['9 cm', '18 cm', '12 cm', '15 cm'], ok: 1 },
    { q: 'Périmètre d\'un triangle de côtés 2 cm, 3 cm, 4 cm ?', r: ['7 cm', '9 cm', '24 cm', '10 cm'], ok: 1 },
    { q: 'Le périmètre d\'une figure, c\'est…', r: ['son intérieur', 'la longueur de son contour', 'son plus grand côté', 'son nombre de sommets'], ok: 1 },
    { q: 'Pour comparer des périmètres sans règle graduée, on utilise…', r: ['le compas', 'la balance', 'l\'équerre seule', 'le verre gradué'], ok: 0 },
    { q: 'Un carré a un périmètre de 20 cm. Son côté mesure…', r: ['4 cm', '5 cm', '10 cm', '80 cm'], ok: 1 },
  ],
});
})();
