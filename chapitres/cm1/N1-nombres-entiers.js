/* ============================================================
   CHAPITRE : Nombres entiers jusqu'à 9 999 (CM1, N1, période 1)
   Programme du cycle 3 : « pendant les deux premières périodes de l'année, [on se limite] aux
   nombres entiers s'écrivant avec au plus quatre chiffres » ; les nombres de 5 ou 6 chiffres
   sont dans le chapitre « Grands nombres jusqu'à 999 999 » (période 3).
   Objectifs : relations entre unités de numération, valeur des chiffres selon leur position,
   diverses représentations d'un nombre, comparer / encadrer / intercaler / ranger, demi-droite
   graduée.
   ============================================================ */
function cm1neDemiDroite(){
  // Demi-droite graduée de 3 000 à 4 000, de 100 en 100 ; A = 3 400, B = 3 750 (entre deux graduations).
  const x = v => 30 + (v - 3000) * 0.46;
  let s = '<svg viewBox="0 0 520 90" style="width:100%;max-width:560px;display:block;margin:6px auto;"><line x1="20" y1="45" x2="505" y2="45" stroke="#1F3A5C" stroke-width="2"/>';
  for(let v = 3000; v <= 4000; v += 50){ const g = v % 100 === 0; s += `<line x1="${x(v)}" y1="${g ? 36 : 40}" x2="${x(v)}" y2="${g ? 54 : 50}" stroke="#1F3A5C" stroke-width="${g ? 1.6 : 1}"/>`; if(v % 500 === 0) s += `<text x="${x(v)}" y="72" font-size="12" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${v === 3000 ? '3 000' : v === 3500 ? '3 500' : '4 000'}</text>`; }
  [[3400, 'A', '#E35D3A'], [3750, 'B', '#2EA8C9']].forEach(([v, n, c]) => { s += `<circle cx="${x(v)}" cy="45" r="5" fill="${c}"/><text x="${x(v)}" y="24" font-size="14" font-weight="700" text-anchor="middle" fill="${c}" font-family="Space Grotesk">${n}</text>`; });
  return s + '</svg>';
}
cm1Chapitre({
  titre: 'Nombres entiers jusqu\'à 9 999', slug: 'nombres-entiers',
  cours: `
${cm1Lecon(1, 'Chiffres, nombres et unités de numération')}
${cm1Def(`<ul style="margin:0;padding-left:20px;line-height:1.8;"><li>Un <b>chiffre</b> est l'un des dix symboles 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.</li><li>Un <b>nombre</b> s'écrit avec un ou plusieurs chiffres. La <b>position</b> d'un chiffre donne sa valeur.</li></ul>`, 'Vocabulaire')}
${cm1Regle(`${cm1Liste(['<b>10 unités = 1 dizaine</b>', '<b>10 dizaines = 1 centaine</b>', '<b>10 centaines = 1 millier</b>'])}Donc 1 millier = 10 centaines = 100 dizaines = 1 000 unités.`)}
${ce2AnimNumeration('cm1-ne-num', { presets: [{ nom: '7 249', n: 7249 }, { nom: '6 085', n: 6085 }, { nom: '4 730', n: 4730 }] })}
${cm1Exemple('Exemple : le nombre 7 249 dans le tableau de numération.')}
${cm1Tableau(['Unités de mille', 'Centaines', 'Dizaines', 'Unités'], [['<b>7</b>', '<b>2</b>', '<b>4</b>', '<b>9</b>']])}
<ul class="example-list"><li>Il se lit et s'écrit en lettres : <b>sept-mille-deux-cent-quarante-neuf</b> (on met des traits d'union entre tous les mots).</li><li>À partir de 4 chiffres, on laisse un petit espace entre les mille et le reste : 7 249.</li></ul>

${cm1Lecon(2, 'Décomposer un nombre')}
${cm1Regle('Décomposer un nombre, c\'est l\'écrire comme une <b>somme</b> qui montre la valeur de chaque chiffre.')}
${cm1Exemple('Avec 7 249 :', ['7 249 = 7 000 + 200 + 40 + 9', '7 249 = (7 × 1 000) + (2 × 100) + (4 × 10) + 9', '7 249 = 72 centaines et 49 unités', '7 249 = 724 dizaines et 9 unités'])}

${cm1Lecon(3, '« Le chiffre des… » et « le nombre de… »')}
${cm1Regle('<b>Le chiffre des</b> centaines est le seul chiffre écrit à cette place. <b>Le nombre de</b> centaines compte toutes les centaines contenues dans le nombre : on « cache » les chiffres à sa droite.')}
${cm1Exemple('Avec 7 249 :', ['Le <b>chiffre</b> des centaines est <b>2</b>.', 'Le <b>nombre</b> de centaines est <b>72</b> (on cache 4 et 9).', 'Le <b>nombre</b> de dizaines est <b>724</b>.'])}
${cm1Astuce('Attention à ne pas confondre : le chiffre des centaines de 7 249 est 2, mais le nombre de centaines est 72.')}

${cm1Lecon(4, 'Placer des nombres sur une demi-droite graduée')}
${cm1Regle('Sur une demi-droite graduée, les nombres sont rangés du plus petit au plus grand, avec des écarts réguliers. Pour lire un point, on cherche d\'abord <b>la valeur d\'un écart</b> entre deux graduations.')}
<div class="figure-wrap">${cm1neDemiDroite()}</div>
${ce2AnimSauts('cm1-ne-sauts', { legende: 'On avance de graduation en graduation : chaque grand écart vaut 100.', presets: [{ nom: 'Jusqu\'au point A', depart: 3000, sauts: [[100, '+ 100'], [100, '+ 100'], [100, '+ 100'], [100, '+ 100']], min: 2950, max: 3550, fin: '4 écarts de 100 après 3 000 : le point A est à <b>3 400</b>.' }, { nom: 'De 1 000 en 1 000', depart: 2000, sauts: [[1000, '+ 1 000'], [1000, '+ 1 000'], [1000, '+ 1 000']], min: 1500, max: 5500, fin: 'De 1 000 en 1 000, seul le chiffre des milliers change.' }] })}
${cm1Exemple('Lecture de la demi-droite :', ['Entre 3 000 et 3 500, il y a 5 grands écarts : un grand écart vaut 100, un petit écart vaut 50.', 'Le point A est à 4 grands écarts après 3 000 : il est à <b>3 400</b>.', 'Le point B est entre 3 700 et 3 800, au milieu : il est à <b>3 750</b>.'])}

${cm1Lecon(5, 'Comparer, encadrer, intercaler')}
${cm1Regle('Pour comparer deux nombres entiers : celui qui a <b>le plus de chiffres</b> est le plus grand. S\'ils ont autant de chiffres, on compare les chiffres un par un <b>en partant de la gauche</b>.')}
${cm1Def('<b>a &lt; b</b> se lit « a est <b>inférieur à</b> b » (plus petit) ; <b>a &gt; b</b> se lit « a est <b>supérieur à</b> b » (plus grand) ; <b>a = b</b> se lit « a est <b>égal à</b> b ».', 'Symboles')}
${cm1Exemple('Exemples :', ['985 &lt; 1 204 : 985 a 3 chiffres, 1 204 en a 4.', '4 518 &gt; 4 381 : même chiffre des mille (4), puis 5 &gt; 3 aux centaines.', '<b>Encadrer</b> 4 518 entre deux milliers : 4 000 &lt; 4 518 &lt; 5 000.', 'Encadrer 4 518 entre deux centaines : 4 500 &lt; 4 518 &lt; 4 600.', '<b>Intercaler</b> un nombre entre 2 760 et 2 770 : par exemple 2 765, qui est <b>compris entre</b> 2 760 et 2 770.'])}

${cm1Lecon(6, 'Ranger des nombres')}
${cm1Regle('<b>Ordre croissant</b> : du plus petit au plus grand. <b>Ordre décroissant</b> : du plus grand au plus petit.')}
${cm1Exemple('Range dans l\'ordre croissant : 3 061 ; 3 610 ; 360 ; 3 106.', ['360 &lt; 3 061 &lt; 3 106 &lt; 3 610'])}
`,
  methode: `
${cm1Demo('ne-lire', 'Lire et écrire un nombre de 4 chiffres', 'Comment lire 6 085 ? Clique sur « Étape suivante ».')}
${cm1Demo('ne-comparer', 'Comparer deux nombres', 'Entre 5 306 et 5 360, lequel est le plus grand ?')}
${cm1Demo('ne-graduer', 'Trouver le nombre qui correspond à un point sur une demi-droite graduée', 'Sur une demi-droite, 2 000 et 3 000 sont séparés par 10 écarts. Où est le point C, placé à 7 écarts après 2 000 ?')}
`,
  demos: [
    ['ne-lire', [
      { expr: '6085', note: 'On compte les chiffres : il y en a 4. Le premier chiffre (à gauche) est celui des unités de mille.' },
      { expr: '<span class="hl">6</span> 085', note: 'On laisse un espace après les mille : 6 085. On lit d\'abord « six-mille ».' },
      { expr: '6 <span class="hl">0</span>85', note: 'Le chiffre des centaines est 0 : il n\'y a pas de centaines, on ne dit rien.' },
      { expr: '6 0<span class="hl">85</span>', note: 'Il reste 85 : « quatre-vingt-cinq ».' },
      { expr: '6 085 : six-mille-quatre-vingt-cinq', note: 'On lit le nombre en entier. Le 0 est indispensable : sans lui, on lirait 685 !' },
    ]],
    ['ne-comparer', [
      { expr: '5 306   et   5 360', note: 'Les deux nombres ont 4 chiffres : on compare chiffre par chiffre, en partant de la gauche.' },
      { expr: '<span class="hl">5</span> 306   et   <span class="hl">5</span> 360', note: 'Unités de mille : 5 et 5, égalité. On continue.' },
      { expr: '5 <span class="hl">3</span>06   et   5 <span class="hl">3</span>60', note: 'Centaines : 3 et 3, égalité. On continue.' },
      { expr: '5 3<span class="hl">0</span>6   et   5 3<span class="hl">6</span>0', note: 'Dizaines : 0 et 6. 0 est plus petit que 6 : on peut conclure.' },
      { expr: '5 306 &lt; 5 360', note: '5 306 est inférieur à 5 360.' },
    ]],
    ['ne-graduer', [
      { expr: '3 000 − 2 000 = 1 000', note: 'On calcule l\'écart entre les deux nombres écrits : 1 000.' },
      { expr: '1 000 ÷ 10 = 100', note: 'Cet écart est partagé en 10 écarts égaux : chaque écart vaut 100.' },
      { expr: '7 × 100 = 700', note: 'Le point C est 7 écarts après 2 000.' },
      { expr: '2 000 + 700 = 2 700', note: 'Le point C est à 2 700.' },
    ]],
  ],
  exos: cm1Exos('ne', [
    ['Écris en chiffres : cinq-mille-quarante-huit.',
      cm1Redac('Cinq-mille-quarante-huit', '5 milliers, 0 centaine, 4 dizaines et 8 unités', 'Le nombre s\'écrit 5 048 : il n\'y a pas de centaines, on écrit 0 au rang des centaines.')],
    ['Écris en lettres : 3 907.',
      cm1Redac('3 907 en lettres', '3 milliers, 9 centaines et 7 unités', 'On écrit : trois-mille-neuf-cent-sept.')],
    ['Décompose 8 506 de deux façons.',
      cm1Redac('Décompositions de 8 506', { suite: ['8 506 = 8 000 + 500 + 6', '8 506 = (8 × 1 000) + (5 × 100) + 6'] }, 'On a écrit 8 506 de deux façons : avec la valeur de chaque chiffre, puis avec des multiplications.')],
    [`Réponds aux questions sur le nombre 4 730.${cm1Liste(['Quel est son chiffre des dizaines ?', 'Quel est son nombre de dizaines ?', 'Quel est son nombre de centaines ?'])}`,
      cm1Redac('Chiffre des dizaines', cm1Tableau(['M', 'C', 'D', 'U'], [['4', '7', '<b style="color:#E35D3A">3</b>', '0']]), 'Le chiffre des dizaines de 4 730 est 3.')
      + cm1Redac('Nombre de dizaines', '4 730 = 473 dizaines', 'Le nombre de dizaines de 4 730 est 473.')
      + cm1Redac('Nombre de centaines', '4 730 = 47 centaines et 30 unités', 'Le nombre de centaines de 4 730 est 47.')],
    [`Complète avec &lt;, &gt; ou =.${cm1Liste(['6 099 … 6 100', '870 … 1 002', '3 450 … 3 405'])}`,
      cm1Redac('Comparaisons', { suite: ['6 099 &lt; 6 100', '870 &lt; 1 002', '3 450 &gt; 3 405'] }, '6 099 est plus petit que 6 100 ; 870 n\'a que 3 chiffres ; 3 450 a 5 dizaines contre 0 pour 3 405.')],
    ['Encadre 2 836 entre deux milliers, puis entre deux centaines consécutives.',
      cm1Redac('Encadrement au millier', '2 000 &lt; 2 836 &lt; 3 000', '2 836 est compris entre 2 000 et 3 000.')
      + cm1Redac('Encadrement à la centaine', '2 800 &lt; 2 836 &lt; 2 900', '2 836 est compris entre 2 800 et 2 900.')],
    ['Range dans l\'ordre décroissant : 1 570 ; 1 507 ; 7 015 ; 157 ; 5 170.',
      cm1Redac('Ordre décroissant', '7 015 &gt; 5 170 &gt; 1 570 &gt; 1 507 &gt; 157', 'Le plus grand nombre est 7 015 et le plus petit est 157.')],
    ['Sur une demi-droite graduée, 4 000 et 5 000 sont séparés par 10 écarts égaux. Quel nombre correspond à la 6<sup>e</sup> graduation après 4 000 ?',
      cm1Redac('Valeur d\'un écart', '1 000 ÷ 10 = 100', 'Un écart vaut 100.')
      + cm1Redac('Nombre de la 6<sup>e</sup> graduation', ['4 000 + 6 × 100', '4 000 + 600', '4 600'], 'La 6<sup>e</sup> graduation après 4 000 correspond à 4 600.')],
  ], { titre: 'Rédaction type : « Décomposer un nombre »', lignes: [['6 358', 'Je repère le chiffre de chaque rang : 6 mille, 3 centaines, 5 dizaines, 8 unités.'], ['= 6 000 + 300 + 50 + 8', 'J\'écris la valeur de chaque chiffre.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : l\'invention du zéro', [
    'Pour écrire 6 085, on a besoin d\'un chiffre qui veut dire « rien à cette place » : le <b>zéro</b>. Il n\'a pas toujours existé ! Les Babyloniens, il y a près de 4 000 ans, laissaient simplement un espace vide… ce qui créait beaucoup de confusions.',
    'Ce sont des savants de l\'<b>Inde</b> qui, vers le V<sup>e</sup> siècle, ont fait du zéro un vrai chiffre. En 628, le mathématicien <b>Brahmagupta</b> explique même comment calculer avec lui.',
    'Le zéro arrive en Europe grâce aux savants arabes (le mot « zéro » vient de l\'arabe <i>sifr</i>, « le vide ») et au livre de <b>Fibonacci</b> en 1202. Avec dix chiffres et le principe de position, on peut écrire tous les nombres.',
  ]),
  quiz: [
    { q: 'Comment écrit-on en chiffres « deux-mille-trente » ?', opts: ['2 300', '2 030', '203'], correct: 1 },
    { q: 'Dans 5 862, quel est le nombre de centaines ?', opts: ['8', '58', '586'], correct: 1 },
    { q: '1 millier, c\'est…', opts: ['10 dizaines', '100 dizaines', '1 000 dizaines'], correct: 1 },
    { q: 'Quel nombre est compris entre 3 490 et 3 510 ?', opts: ['3 409', '3 500', '3 590'], correct: 1 },
  ],
});

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), C = plCase();
const lt = '&lt;', gt = '&gt;';
PLANCHES['cm1|Nombres entiers jusqu\'à 9 999'] = [
  { titre: 'Écrire, lire et décomposer les nombres', duree: '30 min',
    attendus: ['Connaître les unités de numération et leurs relations', 'Écrire un nombre en chiffres, en lettres, et le décomposer'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        eleve: plListe(['trois-mille-quatre-cent-douze : ' + B(), 'cinq-mille-sept : ' + B(), 'huit-mille-soixante : ' + B(), 'deux-mille-neuf-cent-un : ' + B()]),
        corr: plListe(['trois-mille-quatre-cent-douze : ' + R('3 412'), 'cinq-mille-sept : ' + R('5 007'), 'huit-mille-soixante : ' + R('8 060'), 'deux-mille-neuf-cent-un : ' + R('2 901')]) },
      { etoiles: 1, col: 1, consigne: 'Écris en lettres (n\'oublie pas les traits d\'union).',
        eleve: plListe(['2 048 : ' + B(18), '6 300 : ' + B(18), '9 015 : ' + B(18)]),
        corr: plListe(['2 048 : ' + R('deux-mille-quarante-huit'), '6 300 : ' + R('six-mille-trois-cents'), '9 015 : ' + R('neuf-mille-quinze')]) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['1 millier = ' + B(3) + ' centaines', '1 centaine = ' + B(3) + ' dizaines', '1 millier = ' + B(3) + ' dizaines', '3 milliers = ' + B(3) + ' unités']),
        corr: plListe(['1 millier = ' + R(10) + ' centaines', '1 centaine = ' + R(10) + ' dizaines', '1 millier = ' + R(100) + ' dizaines', '3 milliers = ' + R('3 000') + ' unités']) },
      { etoiles: 2, col: 1, consigne: 'Décompose avec la valeur de chaque chiffre.',
        eleve: plListe(['4 375 = ' + B(3) + ' + ' + B(3) + ' + ' + B(2) + ' + ' + B(2), '6 208 = ' + B(3) + ' + ' + B(3) + ' + ' + B(2), '9 040 = ' + B(3) + ' + ' + B(2)]),
        corr: plListe(['4 375 = ' + R('4 000') + ' + ' + R(300) + ' + ' + R(70) + ' + ' + R(5), '6 208 = ' + R('6 000') + ' + ' + R(200) + ' + ' + R(8), '9 040 = ' + R('9 000') + ' + ' + R(40)]) },
      { etoiles: 2, consigne: 'Complète le tableau : « le chiffre des… » et « le nombre de… ».',
        eleve: `<table class="pl-tab">${'<tr><th>Nombre</th><th>chiffre des dizaines</th><th>nombre de dizaines</th><th>chiffre des centaines</th><th>nombre de centaines</th></tr>'}${['5 846', '3 027', '9 410'].map(n => `<tr><td><b>${n}</b></td>${'<td>' + B(3) + '</td>'}${'<td>' + B(3) + '</td>'}${'<td>' + B(3) + '</td>'}${'<td>' + B(3) + '</td>'}</tr>`).join('')}</table>`,
        corr: `<table class="pl-tab"><tr><th>Nombre</th><th>chiffre des dizaines</th><th>nombre de dizaines</th><th>chiffre des centaines</th><th>nombre de centaines</th></tr>${[['5 846', 4, 584, 8, 58], ['3 027', 2, 302, 0, 30], ['9 410', 1, 941, 4, 94]].map(([n, ...v]) => `<tr><td><b>${n}</b></td>${v.map(x => `<td>${R(x)}</td>`).join('')}</tr>`).join('')}</table>` },
      { etoiles: 2, col: 1, consigne: 'Qui suis-je ?',
        eleve: plListe(['J\'ai 4 milliers, 0 centaine, 7 dizaines et 2 unités : ' + B(), 'J\'ai 25 centaines et 3 unités : ' + B(), 'J\'ai 6 milliers et 14 dizaines : ' + B()]),
        corr: plListe(['J\'ai 4 milliers, 0 centaine, 7 dizaines et 2 unités : ' + R('4 072'), 'J\'ai 25 centaines et 3 unités : ' + R('2 503'), 'J\'ai 6 milliers et 14 dizaines : ' + R('6 140')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Avec les chiffres 3, 0, 8 et 5 (chacun une seule fois), écris le plus grand et le plus petit nombre de 4 chiffres.',
        corr: cm1Redac('Le plus grand nombre', 'Je place les chiffres du plus grand au plus petit : 8 530', 'Le plus grand nombre est 8 530.')
          + cm1Redac('Le plus petit nombre', 'Un nombre de 4 chiffres ne commence pas par 0 : 3 058', 'Le plus petit nombre est 3 058.') },
    ] },
  { titre: 'Comparer, ranger, placer sur une demi-droite graduée', duree: '30 min',
    attendus: ['Comparer, encadrer et intercaler des nombres', 'Ranger des nombres', 'Repérer des nombres sur une demi-droite graduée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`4 506 ${C} 4 560`, `7 099 ${C} 7 100`, `3 000 ${C} 2 999`, `6 040 ${C} 6 040`]),
        corr: plListe([`4 506 ${R(lt)} 4 560`, `7 099 ${R(lt)} 7 100`, `3 000 ${R(gt)} 2 999`, `6 040 ${R('=')} 6 040`]) },
      { etoiles: 1, col: 1, consigne: 'Encadre entre deux milliers qui se suivent.',
        eleve: plListe([`${B()} &lt; 5 372 &lt; ${B()}`, `${B()} &lt; 8 905 &lt; ${B()}`, `${B()} &lt; 1 460 &lt; ${B()}`]),
        corr: plListe([`${R('5 000')} &lt; 5 372 &lt; ${R('6 000')}`, `${R('8 000')} &lt; 8 905 &lt; ${R('9 000')}`, `${R('1 000')} &lt; 1 460 &lt; ${R('2 000')}`]) },
      { etoiles: 2, consigne: 'De 2 000 à 3 000, il y a 10 écarts égaux. Quel nombre correspond à chaque point ?',
        eleve: cm1Axe(2000, 3000, 100, 1000, [[2300, 'A'], [2800, 'B'], [2600, 'C']], { fmt: v => v.toLocaleString('fr-FR') }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${B()}</span><span>B : ${B()}</span><span>C : ${B()}</span></div>`,
        corr: cm1Axe(2000, 3000, 100, 1000, [[2300, 'A'], [2800, 'B'], [2600, 'C']], { fmt: v => v.toLocaleString('fr-FR') }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${R('2 300')}</span><span>B : ${R('2 800')}</span><span>C : ${R('2 600')}</span></div>` },
      { etoiles: 2, col: 1, consigne: 'Range dans l\'ordre croissant : 5 040 ; 4 550 ; 5 400 ; 4 505 ; 504.',
        eleve: `<p>${B(3)} &lt; ${B(3)} &lt; ${B(3)} &lt; ${B(3)} &lt; ${B(3)}</p>`,
        corr: `<p>${R(504)} &lt; ${R('4 505')} &lt; ${R('4 550')} &lt; ${R('5 040')} &lt; ${R('5 400')}</p>` },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe(['le nombre juste après 4 999 : ' + B(), 'le nombre juste avant 7 000 : ' + B(), '100 de plus que 3 950 : ' + B(), '1 000 de moins que 8 024 : ' + B()]),
        corr: plListe(['le nombre juste après 4 999 : ' + R('5 000'), 'le nombre juste avant 7 000 : ' + R('6 999'), '100 de plus que 3 950 : ' + R('4 050'), '1 000 de moins que 8 024 : ' + R('7 024')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le mont Blanc mesure 4 806 m, le mont Rose 4 634 m et le Cervin 4 478 m. Range ces sommets du plus haut au plus bas. Explique comment tu compares.',
        corr: cm1Redac('Comparaison des hauteurs', { suite: ['Les trois nombres ont 4 milliers.', 'Je compare les centaines : 8 &gt; 6 &gt; 4.', '4 806 &gt; 4 634 &gt; 4 478'] }, 'Du plus haut au plus bas : le mont Blanc, le mont Rose, puis le Cervin.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve tous les nombres de 4 chiffres qui s\'écrivent avec deux chiffres 1 et deux chiffres 0.',
        corr: cm1Redac('Les nombres possibles', { suite: ['Le premier chiffre ne peut pas être 0 : c\'est 1.', 'Il reste un 1 à placer : aux centaines, aux dizaines ou aux unités.', '1 100 ; 1 010 ; 1 001'] }, 'Il y a trois nombres : 1 100, 1 010 et 1 001.') },
    ] },
];
})();
