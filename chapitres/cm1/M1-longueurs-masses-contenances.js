/* ============================================================
   CHAPITRE : Longueurs, masses, contenances (CM1, M1, période 1)
   Programme du cycle 3 (CM1) : comparer, estimer, mesurer des longueurs, des masses, des
   contenances ; unités usuelles et relations entre elles (km, m, dm, cm, mm ; t, kg, g ; L, dL,
   cL, mL) ; sens des préfixes kilo, déci, centi, milli. Le programme demande de NE PAS utiliser
   de tableau de conversion : chaque conversion est justifiée par une phrase (« 1 m = 100 cm, donc
   3 m = 3 × 100 cm = 300 cm »). Nombres entiers d'au plus 4 chiffres (périodes 1-2).
   ============================================================ */
(() => {
// Règle graduée en cm et mm avec le segment [AB] de 7 cm 4 mm.
function regle(){
  const u = 52, x0 = 20; let s = `<svg viewBox="0 0 ${x0 * 2 + 9 * u} 110" style="width:100%;max-width:520px;display:block;margin:6px auto;">`;
  s += `<line x1="${x0}" y1="18" x2="${x0 + 7.4 * u}" y2="18" stroke="#E35D3A" stroke-width="3"/><circle cx="${x0}" cy="18" r="3.5" fill="#E35D3A"/><circle cx="${x0 + 7.4 * u}" cy="18" r="3.5" fill="#E35D3A"/>
  <text x="${x0}" y="12" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk" text-anchor="middle">A</text><text x="${x0 + 7.4 * u}" y="12" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk" text-anchor="middle">B</text>`;
  s += `<rect x="${x0 - 12}" y="28" width="${9 * u + 24}" height="64" rx="5" fill="#FFF6D6" stroke="#B8962E"/>`;
  for(let i = 0; i <= 90; i++){ const x = x0 + i * u / 10, h = i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 9;
    s += `<line x1="${x}" y1="28" x2="${x}" y2="${28 + h}" stroke="#5B4A12" stroke-width="${i % 10 === 0 ? 1.4 : .8}"/>`;
    if(i % 10 === 0) s += `<text x="${x}" y="66" font-size="12" text-anchor="middle" fill="#5B4A12" font-family="Space Grotesk">${i / 10}</text>`; }
  return s + `<text x="${x0 + 8.7 * u}" y="84" font-size="11" text-anchor="end" fill="#5B4A12" font-family="Space Grotesk">cm</text></svg>`;
}
const P = (t, c) => `<b style="color:${c};">${t}</b>`;
// Planches : une case à remplir (pointillés) et la réponse du corrigé.
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const regleExo = (mm, nom, rep) => `<span style="display:flex;flex-direction:column;align-items:center;width:100%;">${cm1RegleGraduee(mm, nom, { n: 8 })}<span>Le segment [${nom}] mesure ${rep ? R(Math.floor(mm / 10)) : B(2)} cm ${rep ? R(mm % 10) : B(2)} mm, soit ${rep ? R(mm) : B(3)} mm.</span></span>`;
const balExo = (obj, masses, coul, rep, tot) => `<span style="display:flex;flex-direction:column;align-items:center;">${cm1Balance(obj, masses, { coul, largeur: 200 })}<span>${obj} : ${rep ? R(tot) : B(4)} g</span></span>`;
const KILO = P('kilo', '#7A4FC0'), DECI = P('déci', '#2EA8C9'), CENTI = P('centi', '#2E9C6A'), MILLI = P('milli', '#E35D3A');
cm1Chapitre({
  titre: 'Longueurs, masses, contenances', slug: 'longueurs-masses-contenances',
  cours: `
${cm1Lecon(1, 'Mesurer une longueur')}
${cm1Regle('Pour mesurer un segment avec une règle, on place le <b>0 de la règle</b> sur une extrémité du segment et on lit la graduation à l\'autre extrémité.')}
<div class="figure-wrap">${regle()}</div>
${ce2AnimRegle('cm1-lmc-regle', { presets: [{ nom: '7 cm 4 mm', cm: 7, mm: 4 }, { nom: '6 cm 5 mm', cm: 6, mm: 5 }, { nom: '9 cm', cm: 9, mm: 0 }] })}
${cm1Exemple('Le segment [AB] (le segment d\'extrémités A et B) mesure :', ['7 cm et 4 mm, qu\'on écrit <b>7 cm 4 mm</b> ;', 'ou encore <b>74 mm</b> : 7 cm = 70 mm,', 'et 70 mm + 4 mm = 74 mm.'])}

${cm1Lecon(2, 'Les unités de longueur')}
${cm1Def(`L'unité principale est le <b>mètre (m)</b>. Les autres unités se forment avec des <b>préfixes</b> :<ul style="margin:6px 0 0;padding-left:18px;line-height:1.9;">
<li>${KILO} veut dire « <b>1 000 fois plus grand</b> » : 1 <b>k</b>m = 1 000 m ;</li>
<li>${DECI} veut dire « <b>10 fois plus petit</b> » : 1 m = 10 <b>d</b>m ;</li>
<li>${CENTI} veut dire « <b>100 fois plus petit</b> » : 1 m = 100 <b>c</b>m ;</li>
<li>${MILLI} veut dire « <b>1 000 fois plus petit</b> » : 1 m = 1 000 <b>m</b>m.</li></ul>`, 'Unités')}
${cm1Regle(cm1Liste(['1 cm = 10 mm', '1 dm = 10 cm', '1 m = 100 cm', '1 km = 1 000 m']), 'À retenir')}
${cm1Exemple('Ordres de grandeur :', ['l\'épaisseur d\'une pièce de monnaie : environ 2 mm ;', 'la largeur d\'un doigt : environ 1 cm ;', 'la hauteur d\'une porte : environ 2 m ;', 'la distance parcourue en 15 minutes de marche : environ 1 km.'])}

${cm1Lecon(3, 'Les unités de masse')}
${cm1Def(`L'unité principale est le <b>gramme (g)</b>. On utilise aussi le <b>kilogramme (kg)</b> et la <b>tonne (t)</b>.${cm1Liste(['1 kg = 1 000 g', '1 t = 1 000 kg'])}`, 'Unités')}
${ce2AnimBalance('cm1-lmc-balance', { presets: [{ nom: '2 kg 500 g et 2 050 g', g: ['sac A', 2500, '#C9A24A', '2 kg 500 g'], d: ['sac B', 2050, '#8E9AA8', '2 050 g'], montrer: true, fin: '2 kg 500 g = 2 500 g, et 2 500 g &gt; 2 050 g.' }, { nom: '1 kg et 1 000 g', g: ['farine', 1000, '#C9A24A', '1 kg'], d: ['sucre', 1000, '#8E9AA8', '1 000 g'], montrer: true }] })}
${cm1Exemple('Ordres de grandeur :', ['un trombone : environ 1 g ;', 'une tablette de chocolat : 100 g ;', 'un paquet de sucre : 1 kg ;', 'une voiture : environ 1 t.'])}
${cm1Rem('On mesure une masse avec une <b>balance</b>. Dans la vie courante, on dit souvent « poids », mais en mathématiques on parle de <b>masse</b>.')}

${cm1Lecon(4, 'Les unités de contenance')}
${cm1Def(`La <b>contenance</b> d'un récipient, c'est la quantité de liquide qu'il peut contenir. L'unité principale est le <b>litre (L)</b>.<br>
1 L = 10 ${DECI}litres (dL) = 100 ${CENTI}litres (cL) = 1 000 ${MILLI}litres (mL)`, 'Unités')}
${ce2AnimVerser('cm1-lmc-verser', {})}
${cm1Exemple('Ordres de grandeur :', ['une cuillère à café : 5 mL ;', 'une canette : 33 cL ;', 'une bouteille d\'eau : 1 L ou 1,5 L ;', 'un seau : 10 L.'])}

${cm1Lecon(5, 'Convertir sans tableau : on raisonne avec une phrase')}
${cm1Regle('Pour changer d\'unité, on part d\'une <b>relation connue</b> (par exemple 1 m = 100 cm) et on multiplie.')}
${cm1Exemple('Exemples :', ['4 m = 4 × 100 cm = <b>400 cm</b>, car 1 m = 100 cm.', '3 kg = 3 × 1 000 g = <b>3 000 g</b>, car 1 kg = 1 000 g.', '2 L = 2 × 100 cL = <b>200 cL</b>, car 1 L = 100 cL.', '2 km 350 m = 2 000 m + 350 m = <b>2 350 m</b>.', 'Dans l\'autre sens : 5 000 g, c\'est 5 fois 1 000 g, donc <b>5 kg</b>.'])}
${cm1Astuce(`Pour comparer deux mesures, on les exprime d'abord <b>dans la même unité</b>. Pour 1 m 20 cm et 125 cm :${cm1Liste(['1 m 20 cm = 120 cm', '120 cm &lt; 125 cm'])}`)}
`,
  methode: `
${cm1Demo('lmc-conv', 'Convertir une longueur', 'Combien de centimètres y a-t-il dans 3 m 45 cm ?')}
${cm1Demo('lmc-comp', 'Comparer deux masses', 'Qu\'est-ce qui est le plus lourd : un sac de 2 kg 500 g ou un sac de 2 050 g ?')}
${cm1Demo('lmc-cont', 'Résoudre un problème de contenance', 'Une bouteille contient 1 L de jus. On remplit des verres de 20 cL. Combien de verres peut-on remplir ?')}
`,
  demos: [
    ['lmc-conv', [
      { expr: '1 m = 100 cm', note: 'On part de la relation connue entre le mètre et le centimètre.' },
      { expr: '3 m = 3 × 100 cm = 300 cm', note: 'Il y a 3 mètres, donc 3 fois 100 cm.' },
      { expr: '300 cm + 45 cm = 345 cm', note: 'On ajoute les 45 cm.' },
      { expr: '3 m 45 cm = 345 cm', note: 'On conclut.' },
    ]],
    ['lmc-comp', [
      { expr: '2 kg 500 g   et   2 050 g', note: 'Les deux masses ne sont pas écrites dans la même unité : on convertit la première en grammes.' },
      { expr: '2 kg = 2 × 1 000 g = 2 000 g', note: 'Car 1 kg = 1 000 g.' },
      { expr: '2 kg 500 g = 2 000 g + 500 g = 2 500 g', note: 'On ajoute les 500 g.' },
      { expr: '2 500 g &gt; 2 050 g', note: 'On compare deux nombres entiers : le sac de 2 kg 500 g est le plus lourd.' },
    ]],
    ['lmc-cont', [
      { expr: '1 L = 100 cL', note: 'On exprime la contenance de la bouteille dans la même unité que celle des verres.' },
      { expr: '5 × 20 cL = 100 cL', note: 'On cherche combien de fois 20 cL il y a dans 100 cL.' },
      { expr: 'On peut remplir 5 verres.', note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('lmc', [
    [`Quelle unité choisir (km, m, cm ou mm) ?${cm1Liste(['la longueur d\'un crayon', 'la distance de Paris à Lyon', 'l\'épaisseur d\'un livre', 'la longueur de la cour'])}`,
      cm1Redac('Choix des unités', { suite: ['un crayon : cm (environ 15 cm)', 'Paris-Lyon : km (environ 470 km)', 'un livre : mm (environ 20 mm)', 'la cour : m (environ 40 m)'] }, 'On choisit l\'unité qui donne un nombre facile à lire.')],
    [`Convertis.${cm1Liste(['6 m en cm', '8 cm en mm', '3 km en m', '5 dm en cm'])}`,
      cm1Redac('Conversions de longueurs', { suite: ['6 m = 6 × 100 cm = 600 cm', '8 cm = 8 × 10 mm = 80 mm', '3 km = 3 × 1 000 m = 3 000 m', '5 dm = 5 × 10 cm = 50 cm'] }, 'On part chaque fois d\'une relation connue, puis on multiplie.')],
    [`Convertis.${cm1Liste(['7 kg en g', '4 000 g en kg', '2 t en kg'])}`,
      cm1Redac('Conversions de masses', { suite: ['7 kg = 7 × 1 000 g = 7 000 g', '4 000 g = 4 × 1 000 g = 4 kg', '2 t = 2 × 1 000 kg = 2 000 kg'] }, '7 kg font 7 000 g, 4 000 g font 4 kg et 2 t font 2 000 kg.')],
    [`Convertis.${cm1Liste(['3 L en cL', '2 L en mL', '4 dL en cL'])}`,
      cm1Redac('Conversions de contenances', { suite: ['3 L = 3 × 100 cL = 300 cL', '2 L = 2 × 1 000 mL = 2 000 mL', '4 dL = 4 × 10 cL = 40 cL'] }, '3 L font 300 cL, 2 L font 2 000 mL et 4 dL font 40 cL.')],
    [`Convertis.${cm1Liste(['1 m 75 cm en cm', '4 kg 250 g en g', '6 cm 3 mm en mm'])}`,
      cm1Redac('1 m 75 cm en cm', ['100 cm + 75 cm', '175 cm'], '1 m 75 cm, c\'est 175 cm.', cm1Paquets([[100, '1 m', '100 cm'], [75, '75 cm', '75 cm']], { titre: '1 m 75 cm', L: 300 }))
      + cm1Redac('4 kg 250 g en g', { nom: 'B', lignes: ['4 000 g + 250 g', '4 250 g'] }, '4 kg 250 g, c\'est 4 250 g.', cm1Paquets([[1000, '1 kg', '1 000 g'], [1000, '1 kg', '1 000 g'], [1000, '1 kg', '1 000 g'], [1000, '1 kg', '1 000 g'], [250, '', '250 g']], { titre: '4 kg 250 g', L: 380 }))
      + cm1Redac('6 cm 3 mm en mm', { nom: 'C', lignes: ['60 mm + 3 mm', '63 mm'] }, '6 cm 3 mm, c\'est 63 mm.', cm1RegleGraduee(63, 'EF', { largeur: '300px' }))],
    ['Range du plus léger au plus lourd : 1 kg 200 g ; 1 020 g ; 2 kg ; 1 002 g.',
      cm1Redac('Les masses en grammes', { suite: ['1 kg 200 g = 1 200 g', '2 kg = 2 000 g'] }, 'Du plus léger au plus lourd : 1 002 g, 1 020 g, 1 kg 200 g, 2 kg.', cm1Axe(1000, 2000, 50, 200, [[1002, '1 002 g'], [1200, '1 kg 200 g'], [2000, '2 kg']], { fmt: v => (v + ' g').replace(/(\d)(\d{3}) g/, '$1 $2 g') }) + '<div class="hint" style="margin:0;">1 020 g est juste à droite de 1 002 g : tous deux sont un tout petit peu plus que 1 kg.</div>')],
    ['Trace un segment [CD] de 6 cm 5 mm. Combien mesure-t-il en millimètres ?',
      cm1Redac('Longueur du segment [CD] en mm', ['60 mm + 5 mm', '65 mm'], 'Le segment [CD] mesure 65 mm.', cm1RegleGraduee(65, 'CD', { largeur: '300px' }))],
    ['Un cycliste parcourt 2 km 800 m le matin et 1 km 500 m l\'après-midi. Quelle distance a-t-il parcourue, en mètres ?',
      cm1Redac('Distance parcourue', ['2 800 m + 1 500 m', '4 300 m'], 'Le cycliste a parcouru 4 300 m, c\'est-à-dire 4 km 300 m.', cm1Paquets([[2800, 'matin', '2 800 m'], [1500, 'après-midi', '1 500 m']], { L: 400, accolade: '4 300 m' }))],
  ], { titre: 'Rédaction type : « Convertir »', lignes: [['1 kg = 1 000 g', 'J\'écris la relation connue.'], ['5 kg = 5 × 1 000 g = 5 000 g', 'Je multiplie et je conclus.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : la naissance du mètre', [
    'Autrefois, chaque région avait ses propres mesures : le <b>pied</b>, le <b>pouce</b>, la <b>toise</b>, la <b>livre</b>… et elles changeaient d\'une ville à l\'autre ! Il était très difficile de commercer.',
    'Pendant la Révolution française, en 1791, on décide de créer une mesure « pour tous les temps, pour tous les peuples » : le <b>mètre</b>. Deux savants, <b>Delambre</b> et <b>Méchain</b>, mesurent pendant 6 ans la distance entre Dunkerque et Barcelone pour le définir à partir de la taille de la Terre.',
    'On invente en même temps le <b>gramme</b> et le <b>litre</b>, avec les préfixes kilo, déci, centi, milli. C\'est le <b>système métrique</b>, utilisé aujourd\'hui presque partout dans le monde.',
  ]),
  // Planches d'exercices imprimables (planches.js), aussi faisables à l'écran (planches-num.js).
  planches: [
    { titre: 'Mesurer et convertir des longueurs', duree: '35 min',
      attendus: ['Mesurer une longueur avec une règle graduée', 'Connaître les unités de longueur et convertir en raisonnant, sans tableau'],
      exos: [
        { etoiles: 1, consigne: 'Lis la longueur de chaque segment posé sur la règle.',
          eleve: plGrille([regleExo(65, 'AB'), regleExo(48, 'CD')], 2),
          corr: plGrille([regleExo(65, 'AB', 1), regleExo(48, 'CD', 1)], 2) },
        { etoiles: 1, col: 1, consigne: 'Complète.',
          eleve: plListe(['1 cm = %1 mm', '1 dm = %1 cm', '1 m = %1 cm', '1 m = %1 mm', '1 km = %1 m', '1 m = %1 dm'].map(t => t.replace('%1', B()))),
          corr: plListe([['1 cm = ', 10, ' mm'], ['1 dm = ', 10, ' cm'], ['1 m = ', 100, ' cm'], ['1 m = ', '1 000', ' mm'], ['1 km = ', '1 000', ' m'], ['1 m = ', 10, ' dm']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 1, col: 1, consigne: 'Choisis l\'unité qui convient. Entoure.',
          eleve: plListe(['Un stylo mesure 14 <b>cm · m</b>', 'Une porte mesure 2 <b>m · km</b>', 'De Paris à Marseille : 775 <b>m · km</b>', 'Une pièce de 1 € est épaisse de 2 <b>mm · cm</b>']),
          corr: plListe([['Un stylo mesure 14 ', 'cm'], ['Une porte mesure 2 ', 'm'], ['De Paris à Marseille : 775 ', 'km'], ['Une pièce de 1 € est épaisse de 2 ', 'mm']].map(([t, u]) => t + plEntoure(u))) },
        { etoiles: 2, col: 1, consigne: 'Convertis.',
          eleve: plListe(['4 m = %1 cm', '7 cm = %1 mm', '3 km = %1 m', '6 dm = %1 cm', '2 m 35 cm = %1 cm', '5 cm 8 mm = %1 mm'].map(t => t.replace('%1', B()))),
          corr: plListe([['4 m = ', 400, ' cm'], ['7 cm = ', 70, ' mm'], ['3 km = ', '3 000', ' m'], ['6 dm = ', 60, ' cm'], ['2 m 35 cm = ', 235, ' cm'], ['5 cm 8 mm = ', 58, ' mm']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 2, col: 1, consigne: 'Complète avec <, = ou >.',
          eleve: plGrille(['2 m %1 150 cm', '45 mm %1 4 cm 5 mm', '1 km %1 999 m', '3 dm %1 30 cm', '1 m 5 cm %1 150 cm', '80 mm %1 9 cm'].map(t => t.replace('%1', plCase())), 1),
          corr: plGrille([['2 m', '&gt;', '150 cm'], ['45 mm', '=', '4 cm 5 mm'], ['1 km', '&gt;', '999 m'], ['3 dm', '=', '30 cm'], ['1 m 5 cm', '&lt;', '150 cm'], ['80 mm', '&lt;', '9 cm']].map(([a, o, b]) => `${a} ${plRep(o)} ${b}`), 1) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Léo mesure 1 m 32 cm. Sa sœur Jade mesure 128 cm. Qui est le plus grand ? De combien ?',
          corr: cm1Redac('Taille de Léo en cm', '100 cm + 32 cm = 132 cm', '') + cm1Redac('Différence', '132 cm − 128 cm = 4 cm', 'Léo est le plus grand, de 4 cm.', cm1Paquets([[100, '1 m'], [32, '32 cm']], { titre: 'Léo', xt: 46, L: 250, echelle: 132, uni: true }) + cm1Paquets([[128, '128 cm'], [4, '', '4', '#FBE0D6']], { titre: 'Jade', xt: 46, L: 250, echelle: 132 })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Une ficelle mesure 3 m. Max en coupe 4 morceaux de 60 cm. Quelle longueur de ficelle reste-t-il ?',
          corr: cm1Redac('Longueur coupée', '4 × 60 cm = 240 cm', '') + cm1Redac('Longueur restante', { suite: ['3 m = 300 cm', '300 cm − 240 cm = 60 cm'] }, 'Il reste 60 cm de ficelle.', cm1Paquets([[60, '60'], [60, '60'], [60, '60'], [60, '60'], [60, 'reste', '', '#FBE0D6']], { L: 290, accolade: '3 m = 300 cm' })) },
      ] },
    { titre: 'Masses et contenances', duree: '35 min',
      attendus: ['Connaître les unités de masse (t, kg, g) et de contenance (L, dL, cL, mL)', 'Convertir et comparer des masses et des contenances'],
      exos: [
        { etoiles: 1, consigne: 'La balance est en équilibre. Quelle est la masse de chaque fruit, en grammes ?',
          eleve: plGrille([['melon', ['1 kg', '200 g', '50 g'], '#E9C46A', 1250], ['ananas', ['1 kg', '500 g'], '#C9A24A', 1500], ['pomme', ['100 g', '50 g', '20 g'], '#E35D3A', 170]].map(([o, m, c]) => balExo(o, m, c)), 3),
          corr: plGrille([['melon', ['1 kg', '200 g', '50 g'], '#E9C46A', 1250], ['ananas', ['1 kg', '500 g'], '#C9A24A', 1500], ['pomme', ['100 g', '50 g', '20 g'], '#E35D3A', 170]].map(([o, m, c, t]) => balExo(o, m, c, 1, t)), 3) },
        { etoiles: 1, col: 1, consigne: 'Complète.',
          eleve: plListe(['1 kg = %1 g', '1 t = %1 kg', '1 L = %1 cL', '1 L = %1 mL', '1 L = %1 dL', '1 dL = %1 cL'].map(t => t.replace('%1', B()))),
          corr: plListe([['1 kg = ', '1 000', ' g'], ['1 t = ', '1 000', ' kg'], ['1 L = ', 100, ' cL'], ['1 L = ', '1 000', ' mL'], ['1 L = ', 10, ' dL'], ['1 dL = ', 10, ' cL']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 1, col: 1, consigne: 'Choisis l\'unité qui convient. Entoure.',
          eleve: plListe(['Un sac de pommes : 2 <b>kg · g</b>', 'Une baignoire : 150 <b>L · cL</b>', 'Une canette : 33 <b>cL · L</b>', 'Un éléphant : 5 <b>kg · t</b>']),
          corr: plListe([['Un sac de pommes : 2 ', 'kg'], ['Une baignoire : 150 ', 'L'], ['Une canette : 33 ', 'cL'], ['Un éléphant : 5 ', 't']].map(([t, u]) => t + plEntoure(u))) },
        { etoiles: 2, col: 1, consigne: 'Convertis.',
          eleve: plListe(['3 kg = %1 g', '5 000 g = %1 kg', '2 kg 400 g = %1 g', '1 kg 50 g = %1 g', '4 t = %1 kg'].map(t => t.replace('%1', B()))),
          corr: plListe([['3 kg = ', '3 000', ' g'], ['5 000 g = ', 5, ' kg'], ['2 kg 400 g = ', '2 400', ' g'], ['1 kg 50 g = ', '1 050', ' g'], ['4 t = ', '4 000', ' kg']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 2, col: 1, consigne: 'Convertis.',
          eleve: plListe(['2 L = %1 cL', '3 L = %1 mL', '5 dL = %1 cL', '300 cL = %1 L', '1 L 25 cL = %1 cL'].map(t => t.replace('%1', B()))),
          corr: plListe([['2 L = ', 200, ' cL'], ['3 L = ', '3 000', ' mL'], ['5 dL = ', 50, ' cL'], ['300 cL = ', 3, ' L'], ['1 L 25 cL = ', 125, ' cL']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 2, consigne: 'Range ces paquets du plus léger au plus lourd (écris les lettres).<div style="margin:3px 0;"><b>A</b> : 1 kg 200 g &nbsp;·&nbsp; <b>B</b> : 1 050 g &nbsp;·&nbsp; <b>C</b> : 2 kg &nbsp;·&nbsp; <b>D</b> : 980 g</div>',
          eleve: `<div>${B(2)} &lt; ${B(2)} &lt; ${B(2)} &lt; ${B(2)}</div>`,
          corr: `<div>${R('D')} &lt; ${R('B')} &lt; ${R('A')} &lt; ${R('C')}</div>` },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Une bouteille contient 1 L 50 cL de jus. On remplit des verres de 25 cL. Combien de verres peut-on remplir ?',
          corr: cm1Redac('Contenance en cL', '100 cL + 50 cL = 150 cL', '') + cm1Redac('Nombre de verres', '6 × 25 cL = 150 cL', 'On peut remplir 6 verres.', cm1Paquets(Array.from({ length: 6 }, () => [25, '25']), { uni: true, L: 300, accolade: '1 L 50 cL = 150 cL' })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un camion pèse 3 t à vide. On le charge de 1 200 kg de sable. Quelle est sa masse, en kilogrammes ?',
          corr: cm1Redac('Masse du camion vide', '3 t = 3 × 1 000 kg = 3 000 kg', '') + cm1Redac('Masse du camion chargé', '3 000 kg + 1 200 kg = 4 200 kg', 'Le camion chargé pèse 4 200 kg.', cm1Paquets([[3000, 'camion', '3 000 kg'], [1200, 'sable', '1 200 kg']], { L: 300, accolade: '4 200 kg' })) },
      ] },
    { titre: 'Problèmes de mesures', duree: '35 min',
      attendus: ['Calculer avec des longueurs, des masses, des contenances', 'Résoudre des problèmes en mettant les mesures dans la même unité'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Calcule. Donne le résultat en centimètres.',
          eleve: plListe(['1 m + 25 cm', '2 m − 50 cm', '3 × 40 cm', '1 m 20 cm + 80 cm'].map(t => `${t} = ${B()} cm`)),
          corr: plListe([['1 m + 25 cm', 125], ['2 m − 50 cm', 150], ['3 × 40 cm', 120], ['1 m 20 cm + 80 cm', 200]].map(([t, v]) => `${t} = ${R(v)} cm`)) },
        { etoiles: 1, col: 1, consigne: 'Calcule. Donne le résultat en grammes.',
          eleve: plListe(['1 kg − 300 g', '500 g + 750 g', '4 × 250 g', 'la moitié de 3 kg'].map(t => `${t} = ${B()} g`)),
          corr: plListe([['1 kg − 300 g', 700], ['500 g + 750 g', '1 250'], ['4 × 250 g', '1 000'], ['la moitié de 3 kg', '1 500']].map(([t, v]) => `${t} = ${R(v)} g`)) },
        { etoiles: 2, consigne: 'Une planche de 1 m est coupée en trois morceaux. Combien mesure le morceau du milieu ?',
          eleve: cm1Paquets([[35, '35 cm'], [25, '?'], [40, '40 cm']], { L: 420, uni: true, accolade: '1 m' }) + `<div>Le morceau du milieu mesure ${B()} cm.</div>`,
          corr: cm1Paquets([[35, '35 cm'], [25, '?'], [40, '40 cm']], { L: 420, uni: true, accolade: '1 m' }) + `<div>Le morceau du milieu mesure ${R(25)} cm.</div>` },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Maman achète 3 paquets de farine de 500 g et un sac de sucre de 1 kg. Quelle masse porte-t-elle ?',
          corr: cm1Redac('Masse de farine', '3 × 500 g = 1 500 g', '') + cm1Redac('Masse totale', '1 500 g + 1 000 g = 2 500 g', 'Elle porte 2 500 g, soit 2 kg 500 g.', cm1Paquets([[500, '500 g'], [500, '500 g'], [500, '500 g'], [1000, 'sucre 1 kg', '', '#FBE0D6']], { L: 300, accolade: '2 500 g' })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Une randonnée fait 12 km. Le matin, on a marché 7 km 500 m. Combien de mètres reste-t-il à parcourir ?',
          corr: cm1Redac('Distances en mètres', { suite: ['12 km = 12 000 m', '7 km 500 m = 7 500 m'] }, '') + cm1Redac('Distance restante', '12 000 m − 7 500 m = 4 500 m', 'Il reste 4 500 m, soit 4 km 500 m.', cm1Paquets([[7500, 'matin', '7 500 m'], [4500, '?', '4 500 m']], { L: 300, accolade: '12 km = 12 000 m' })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'On remplit un aquarium de 30 L avec un seau de 5 L. Combien de seaux faut-il verser ?',
          corr: cm1Redac('Nombre de seaux', '6 × 5 L = 30 L', 'Il faut verser 6 seaux.', cm1Paquets(Array.from({ length: 6 }, () => [5, '5 L']), { uni: true, L: 300, accolade: '30 L' })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un rouleau de ruban mesure 5 m. On coupe des morceaux de 50 cm. Combien de morceaux obtient-on ?',
          corr: cm1Redac('Longueur en cm', '5 m = 500 cm', '') + cm1Redac('Nombre de morceaux', '10 × 50 cm = 500 cm', 'On obtient 10 morceaux.', cm1Paquets(Array.from({ length: 10 }, () => [50, '50']), { uni: true, L: 300, accolade: '5 m = 500 cm' })) },
      ] },
  ],
  quiz: [
    { q: '1 km = …', opts: ['100 m', '1 000 m', '10 000 m'], correct: 1 },
    { q: '3 kg = …', opts: ['300 g', '3 000 g', '30 g'], correct: 1 },
    { q: 'Quelle est la contenance d\'une canette ?', opts: ['33 mL', '33 cL', '33 L'], correct: 1 },
    { q: '5 cm 2 mm = …', opts: ['52 mm', '502 mm', '7 mm'], correct: 0 },
  ],
});
})();
