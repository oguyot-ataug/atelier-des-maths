/* ============================================================
   CHAPITRE : Comparer des longueurs (CP, M1, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, grandeurs et mesures : comparer
   des longueurs directement (en alignant un bout), indirectement (avec une bande de papier, une
   ficelle) et en reportant une unité (trombones, carreaux) ; vocabulaire : plus long, plus court,
   aussi long que ; ranger des objets selon leur longueur.
   Pensé pour être projeté : les crayons qu'on aligne, la bande qu'on reporte, les trombones.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Des crayons alignés à gauche (ou décalés) : [[longueur, couleur, décalage], …].
function crayons(L, o){
  o = o || {}; const W = Math.max(...L.map(([l, , d]) => l + (d || 0))) + 20;
  let s = o.repere ? `<line x1="10" y1="4" x2="10" y2="${L.length * 34 + 4}" stroke="${CE2C.vert}" stroke-width="2" stroke-dasharray="5 4"/>` : '';
  L.forEach(([l, c, d], i) => { s += cpCrayon(10 + (d || 0), 22 + i * 34, l, c); if(o.noms) s += ce2T(W + 4, 27 + i * 34, o.noms[i], { t: 14, g: 700, a: 'start', c }); });
  return cpSvg(W + (o.noms ? 60 : 0), L.length * 34 + 8, s, o.px);
}
// Un ruban mesuré avec des trombones ou des carreaux.
function ruban(n, unite, c){
  let s = `<rect x="4" y="4" width="${n * 36}" height="14" fill="${c || '#9BC53D'}" stroke="${CPC.bord}"/>`;
  for(let i = 0; i < n; i++) s += unite === 'carreau' ? `<rect x="${4 + i * 36}" y="26" width="36" height="36" fill="none" stroke="#9FB0C4" stroke-width="1.4"/>` : cpTrombone(4 + i * 36, 30);
  return cpSvg(n * 36 + 10, 66, s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Comparer des longueurs', slug: 'comparer-longueurs',
  cours: `
${cm1Lecon(1, 'Plus long, plus court')}
${cpAnimLongueurs('cp-m1-longueurs')}
${cm1Def(`${lig(crayons([[230, '#E35D3A'], [170, '#2EA8C9']], { repere: true }))}${P('Les deux crayons partent du même point. Le rouge est <b>plus long</b> que le bleu ; le bleu est <b>plus court</b> que le rouge.')}`, 'Comparer')}
${cm1Regle('Pour comparer deux longueurs, on met les deux objets <b>côte à côte</b>, en alignant <b>un bout</b>. Celui qui dépasse est le plus long. Si aucun ne dépasse, ils sont <b>aussi longs</b> l\'un que l\'autre.')}
${cm1Astuce(`Attention aux pièges ! Ici, le bleu a l'air plus long… parce qu'il est décalé.${lig(crayons([[200, '#E35D3A', 0], [180, '#2EA8C9', 60]]))}`)}

${cm1Lecon(2, 'Quand on ne peut pas rapprocher')}
${cm1Def('On ne peut pas déplacer une porte ou une fenêtre ! On prend alors une <b>bande de papier</b> ou une <b>ficelle</b> : on la coupe à la longueur du premier objet, puis on la compare au second.', 'Avec une bande')}
${cm1Rem('Au tableau : comparer la largeur de la porte et la hauteur du tableau avec une ficelle. Les élèves anticipent d\'abord à l\'œil, puis on vérifie.')}

${cm1Lecon(3, 'Mesurer avec une unité')}
${cm1Def(`On peut reporter un même objet bout à bout, sans laisser d'espace : des trombones, des carreaux…${lig(ruban(6, 'trombone'))}${P('Le ruban mesure <b>6 trombones</b>.')}${lig(ruban(4, 'carreau', '#F2A93B'))}${P('Ce ruban mesure <b>4 carreaux</b>.')}`, 'Mesurer')}
${cm1Regle('Pour comparer deux mesures, il faut utiliser <b>la même unité</b> : 6 trombones et 6 crayons, ce n\'est pas la même longueur !')}

${cm1Lecon(4, 'Ranger des longueurs')}
${cm1Def(`${lig(crayons([[120, '#E9C46A'], [180, '#2E9C6A'], [240, '#7A4FC0']], { repere: true, noms: ['jaune', 'vert', 'violet'] }))}${P('Du plus court au plus long : jaune, vert, violet.')}`, 'Ranger')}
`,
  methode: `
${cm1Demo('cp-m1-m-comparer', 'Comparer deux rubans', 'Quel ruban est le plus long ?')}
${cm1Demo('cp-m1-m-mesurer', 'Mesurer avec des trombones', 'Combien de trombones mesure le ruban ?')}
`,
  demos: [
    ['cp-m1-m-comparer', [
      { expr: 'Les rubans ne partent pas du même endroit.', note: 'Je ne peux pas encore conclure.', fig: crayons([[200, '#E35D3A', 0], [180, '#2EA8C9', 60]]) },
      { expr: 'J\'aligne un bout.', note: 'Les deux partent maintenant du même point.', fig: crayons([[200, '#E35D3A'], [180, '#2EA8C9']], { repere: true }) },
      { expr: 'Le rouge dépasse.', note: 'Le ruban rouge est <b>plus long</b> que le bleu.' },
    ]],
    ['cp-m1-m-mesurer', [
      { expr: 'Je pose le premier trombone au début du ruban.', note: 'Bien au bout, sans dépasser.', fig: ruban(1, 'trombone') },
      { expr: 'Je pose les trombones bout à bout.', note: 'Sans espace et sans les superposer.', fig: ruban(5, 'trombone') },
      { expr: 'Je compte : 5 trombones.', note: 'Le ruban mesure <b>5 trombones</b>.' },
    ]],
  ],
  exos: cm1Exos('cp-m1', [
    [`Quel crayon est le plus long ?${lig(crayons([[160, '#E35D3A'], [220, '#2EA8C9']], { repere: true, noms: ['A', 'B'] }))}`,
      cm1Redac('Le plus long', '', 'Les crayons partent du même point et le crayon B dépasse : le crayon B est le plus long.')],
    [`Ces crayons sont décalés. Lequel est le plus long ?${lig(crayons([[210, '#E35D3A', 0], [190, '#2EA8C9', 50]], { noms: ['A', 'B'] }))}`,
      cm1Redac('Le plus long', '', 'Il faut les aligner : le crayon A est le plus long, même si B va plus loin à droite.', crayons([[210, '#E35D3A'], [190, '#2EA8C9']], { repere: true, noms: ['A', 'B'], px: 230 }))],
    [`Combien de trombones mesure ce ruban ?${lig(ruban(7, 'trombone'))}`,
      cm1Redac('Mesure du ruban', '', 'Le ruban mesure 7 trombones.')],
    [`Combien de carreaux mesure ce ruban ?${lig(ruban(5, 'carreau', '#F2A93B'))}`,
      cm1Redac('Mesure du ruban', '', 'Le ruban mesure 5 carreaux.')],
    ['Le ruban rouge mesure 8 trombones. Le ruban bleu mesure 5 trombones. Lequel est le plus long ?',
      cm1Redac('Le ruban le plus long', '8 &gt; 5', 'Le ruban rouge est le plus long.')],
    [`Range ces crayons du plus court au plus long.${lig(crayons([[200, '#2E9C6A'], [110, '#E9C46A'], [250, '#7A4FC0'], [160, '#E35D3A']], { repere: true, noms: ['vert', 'jaune', 'violet', 'rouge'] }))}`,
      cm1Redac('Du plus court au plus long', '', 'Jaune, rouge, vert, violet.', crayons([[110, '#E9C46A'], [160, '#E35D3A'], [200, '#2E9C6A'], [250, '#7A4FC0']], { repere: true, noms: ['jaune', 'rouge', 'vert', 'violet'], px: 230 }))],
    ['Lina mesure une table avec ses mains : 6 mains. Son papa trouve 4 mains. La table a-t-elle changé ?',
      cm1Redac('La table de Lina', '', 'Non : la main du papa est plus grande que celle de Lina, il en faut moins. Pour comparer des mesures, il faut la même unité.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : mesurer avec son corps', [
    'Pendant très longtemps, on mesurait avec son corps : le <b>pouce</b>, le <b>pied</b>, la <b>coudée</b> (du coude au bout des doigts), le <b>pas</b>… Mais tout le monde n\'a pas les mêmes pieds ! Les marchands se disputaient.',
    'Pendant la Révolution française, en 1791, les savants ont décidé de créer une unité pour tout le monde : le <b>mètre</b>. Aujourd\'hui, il sert dans presque tous les pays du monde.',
  ]),
  quiz: [
    { q: 'Pour comparer deux crayons, on les aligne…', opts: ['par le milieu', 'par un bout', 'n\'importe comment'], correct: 1 },
    { q: 'Un ruban mesure 6 carreaux, un autre 9 carreaux. Le plus long mesure…', opts: ['6 carreaux', '9 carreaux', 'On ne sait pas'], correct: 1 },
    { q: 'Pour comparer la largeur d\'une porte et d\'une fenêtre, on peut utiliser…', opts: ['une ficelle', 'une balance', 'une horloge'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Le contraire de « plus long », c\'est…', r: ['plus court', 'plus lourd', 'plus haut', 'plus grand'], ok: 0 },
    { l: 1, q: `Le plus long ?${lig(crayons([[150, '#E35D3A'], [210, '#2EA8C9']], { repere: true, px: 160 }))}`, r: ['Le rouge', 'Le bleu', 'Pareil', 'On ne sait pas'], ok: 1 },
    { l: 2, q: 'On ne peut pas rapprocher deux objets. On utilise…', r: ['une ficelle', 'un verre', 'une pièce', 'rien'], ok: 0 },
    { l: 3, q: `Combien de trombones ?${lig(ruban(4, 'trombone'))}`, r: ['3', '4', '5', '6'], ok: 1 },
    { l: 3, q: 'Pour mesurer, on pose les trombones…', r: ['bout à bout', 'en tas', 'avec des espaces', 'au hasard'], ok: 0 },
    { l: 4, q: 'A mesure 5 carreaux, B 3, C 7. Le plus court ?', r: ['A', 'B', 'C', 'Pareil'], ok: 1 },
  ],
});
})();
