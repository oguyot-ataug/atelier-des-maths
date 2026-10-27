/* ============================================================
   CHAPITRE : Les solides (CP, G4, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, espace et géométrie : reconnaître,
   trier et nommer quelques solides (cube, pavé, boule, cylindre, cône, pyramide) ; les décrire
   (surfaces planes ou arrondies, il roule ou il ne roule pas) ; les faces du cube sont des carrés ;
   l'empreinte d'une face ; assembler des cubes ; voir le cube se replier à partir de son patron.
   Pensé pour être projeté : les solides qui roulent (ou glissent) sur une pente, le cube qui se plie.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const T = 'stroke="#1F3A5C" stroke-width="2" fill="none"', PT = 'stroke="#1F3A5C" stroke-width="1.6" fill="none" stroke-dasharray="5 4"';
function boite(x, y, w, h, dx, dy, c){
  return `<polygon points="${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}" fill="${c}" fill-opacity=".35"/><polygon points="${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" fill="${c}" fill-opacity=".55"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity=".25"/>`
    + `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${T}/><polyline points="${x},${y} ${x + dx},${y - dy} ${x + w + dx},${y - dy} ${x + w},${y}" ${T}/><polyline points="${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" ${T}/>`;
}
// Les six solides, dessinés dans un cadre de 120 × 110.
const SOL = {
  cube: { nom: 'le cube', svg: boite(20, 42, 55, 55, 26, 22, '#2EA8C9'), roule: false },
  pave: { nom: 'le pavé', svg: boite(10, 52, 78, 42, 24, 20, '#2E9C6A'), roule: false },
  boule: { nom: 'la boule', svg: `<circle cx="60" cy="58" r="40" fill="#E35D3A" fill-opacity=".35" ${T}/><ellipse cx="46" cy="44" rx="10" ry="7" fill="#fff" opacity=".6"/>`, roule: true },
  cylindre: { nom: 'le cylindre', svg: `<rect x="28" y="25" width="64" height="62" fill="#E9C46A" fill-opacity=".4"/><ellipse cx="60" cy="25" rx="32" ry="10" fill="#E9C46A" fill-opacity=".6" ${T}/><line x1="28" y1="25" x2="28" y2="87" stroke="#1F3A5C" stroke-width="2"/><line x1="92" y1="25" x2="92" y2="87" stroke="#1F3A5C" stroke-width="2"/><path d="M28 87 A32 10 0 0 0 92 87" ${T}/>`, roule: true },
  cone: { nom: 'le cône', svg: `<polygon points="26,86 94,86 60,12" fill="#7A4FC0" fill-opacity=".3"/><line x1="26" y1="86" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><line x1="94" y1="86" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><path d="M26 86 A34 10 0 0 0 94 86" ${T}/><path d="M26 86 A34 10 0 0 1 94 86" ${PT}/>`, roule: true },
  pyramide: { nom: 'la pyramide', svg: `<polygon points="15,90 75,90 60,15" fill="#C2185B" fill-opacity=".25"/><polygon points="75,90 100,72 60,15" fill="#C2185B" fill-opacity=".4"/><polyline points="15,90 75,90 100,72 60,15 15,90" ${T}/><line x1="75" y1="90" x2="60" y2="15" stroke="#1F3A5C" stroke-width="2"/>`, roule: false },
};
const sol = (k, px, nom) => `<span style="display:inline-block;text-align:center;">${cpSvg(120, 110, SOL[k].svg, px || 96)}${nom === false ? '' : `<br><b>${SOL[k].nom}</b>`}</span>`;

/* ---- Sur la pente : ce qui roule, ce qui glisse ---- */
function animPente(id){
  const K = ['boule', 'cylindre', 'cube', 'pyramide', 'cone', 'pave'], PR = K.map(k => ({ nom: SOL[k].nom.replace(/^l[ea] |^l'/, '') }));
  return cmAnim(id, {
    etat: { p: 0 }, duree: 6000, legende: 'On pose le solide en haut de la pente et on le lâche. Faites deviner avant : va-t-il rouler ?',
    controles: a => ce2Choix(id, PR, a),
    dessin: (t, a) => {
      const k = K[a.etat.p], S = SOL[k], ang = 20, L = 360;
      const f = S.roule ? cmPhase(t, .15, .8) ** 1.6 : k === 'cube' || k === 'pave' ? cmPhase(t, .15, .9) * .35 : 0;
      const d = f * L, A = ang * Math.PI / 180, px = 20 + (34 + d) * Math.cos(A), py = 70 + (34 + d) * Math.sin(A), x = px + Math.sin(A) * 34, y = py - Math.cos(A) * 34;
      const rot = S.roule && k !== 'cone' ? d / 40 * 180 / Math.PI : 0;
      const s = `<polygon points="20,${70} ${20 + 400 * Math.cos(ang * Math.PI / 180)},${70 + 400 * Math.sin(ang * Math.PI / 180)} 20,${70 + 400 * Math.sin(ang * Math.PI / 180)}" fill="#EFE6D6" stroke="#C9B48A" stroke-width="2"/>`
        + `<g transform="translate(${x} ${y}) rotate(${ang}) rotate(${rot} 0 0) translate(-34 -34) scale(.57)">${S.svg}</g>`;
      const texte = t < .15 ? `Que va faire <b>${S.nom}</b> sur la pente ?`
        : S.roule ? (t < .82 ? 'Il roule…' : `${S.nom[0].toUpperCase() + S.nom.slice(1)} <b>roule</b> : ${k === 'boule' ? 'elle est toute arrondie' : k === 'cone' ? 'il a une surface arrondie (couché, il roule en tournant en rond)' : 'il a une surface arrondie'}.`)
        : k === 'pyramide' ? 'La pyramide <b>ne roule pas</b> : toutes ses faces sont plates. Elle reste en place.'
        : t < .9 ? 'Il glisse un peu…' : `${S.nom[0].toUpperCase() + S.nom.slice(1)} <b>ne roule pas</b> : toutes ses faces sont plates. Il peut seulement glisser.`;
      return { scene: `<svg viewBox="0 0 440 230" class="cma-svg" style="max-width:480px;">${s}</svg>`, texte };
    } });
}
// Empreinte d'une face : la forme qu'on obtient en traçant le contour.
const empreinte = (forme, c) => cpSvg(80, 80, forme === 'carre' ? `<rect x="14" y="14" width="52" height="52" fill="${c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.5"/>` : forme === 'rect' ? `<rect x="6" y="24" width="68" height="34" fill="${c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.5"/>` : forme === 'tri' ? `<polygon points="40,10 72,70 8,70" fill="${c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.5"/>` : `<circle cx="40" cy="40" r="30" fill="${c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.5"/>`, 64);

cm1Chapitre({
  niveau: 'cp', titre: 'Les solides', slug: 'solides',
  cours: `
${cm1Lecon(1, 'Six solides à connaître')}
${cm1Def(`${lig(sol('cube'), sol('pave'), sol('pyramide'))}${lig(sol('boule'), sol('cylindre'), sol('cone'))}`, 'Les solides')}
${cm1Rem('Un solide, on peut le tenir dans sa main et tourner autour : ce n\'est pas un dessin plat. Au tableau : un sac à solides, un élève en touche un sans le voir et le décrit.')}

${cm1Lecon(2, 'Il roule ou il ne roule pas')}
${animPente('cp-g4-pente')}
${cm1Regle(`${cm1Liste(['La <b>boule</b>, le <b>cylindre</b> et le <b>cône</b> ont une surface arrondie : ils peuvent <b>rouler</b>.', 'Le <b>cube</b>, le <b>pavé</b> et la <b>pyramide</b> n\'ont que des faces plates : ils <b>ne roulent pas</b>.'])}`, 'Trier')}

${cm1Lecon(3, 'Les faces et les empreintes')}
${cm1Def(`Les surfaces plates d'un solide s'appellent ses <b>faces</b>. Le <b>cube</b> a <b>6 faces</b>, toutes des <b>carrés</b> pareils.${lig(sol('cube', 90, false), '<b style="font-size:1.4rem;">→</b>', empreinte('carre', '#2EA8C9'))}${P('Si on trace le contour d\'une face du cube, on obtient un carré.')}`, 'Les faces')}
${cm1Liste(['une face du pavé laisse un rectangle (ou un carré) ;', 'une face de la pyramide laisse un triangle (ou un carré, pour sa base) ;', 'le cylindre et le cône posés debout laissent un disque.'])}
${cm1Pliage('cp-g4-cube', { modeles: [{ nom: 'Le patron du cube', faces: cmCube([[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]]) }], legende: 'Six carrés pareils se replient pour former un cube : cliquez sur « Plier ». Faites glisser le dessin pour tourner autour.' })}

${cm1Lecon(4, 'Assembler des cubes')}
${cm1Def(`${lig(cpSvg(170, 100, boite(10, 52, 40, 40, 18, 15, '#2EA8C9') + boite(50, 52, 40, 40, 18, 15, '#2EA8C9') + boite(90, 52, 40, 40, 18, 15, '#2EA8C9'), 150))}${P('Trois cubes collés en ligne forment un <b>pavé</b>.')}`, 'Construire')}
${cm1Astuce('Avec des cubes emboîtables, on peut construire une tour, un escalier, un mur… et compter les cubes utilisés, même ceux qu\'on ne voit pas.')}
`,
  methode: `
${cm1Demo('cp-g4-m-reconnaitre', 'Reconnaître un solide', 'Quel est ce solide ?')}
${cm1Demo('cp-g4-m-trier', 'Trier des objets', 'Trie : une balle, une boîte de mouchoirs, une boîte de conserve, un dé.')}
`,
  demos: [
    ['cp-g4-m-reconnaitre', [
      { expr: 'Je regarde s\'il est arrondi.', note: 'Il a une partie arrondie et deux faces plates en forme de disque.', fig: sol('cylindre', 90, false) },
      { expr: 'Il peut rouler, et tenir debout.', note: 'Comme une boîte de conserve.' },
      { expr: 'C\'est un cylindre.', note: 'La boule, elle, n\'a pas de face plate.' },
    ]],
    ['cp-g4-m-trier', [
      { expr: 'La balle : une boule.', note: 'Elle roule.' },
      { expr: 'La boîte de conserve : un cylindre.', note: 'Elle roule (couchée).' },
      { expr: 'La boîte de mouchoirs : un pavé. Le dé : un cube.', note: 'Ils ne roulent pas.', fig: lig(sol('pave', 70), sol('cube', 70)) },
    ]],
  ],
  exos: cm1Exos('cp-g4', [
    [`Nomme ces solides.${lig(sol('cone', 80, false), sol('cube', 80, false), sol('boule', 80, false))}`,
      cm1Redac('Les solides', '', 'Un cône, un cube, une boule.')],
    ['Quels solides peuvent rouler : le cube, la boule, le cylindre, la pyramide ?',
      cm1Redac('Ceux qui roulent', '', 'La boule et le cylindre peuvent rouler : ils ont une surface arrondie.')],
    ['Combien de faces a un cube ? Quelle est leur forme ?',
      cm1Redac('Les faces du cube', '', 'Un cube a 6 faces : ce sont des carrés, tous pareils.')],
    ['À quel solide ressemble un ballon de football ? Une boîte à chaussures ? Un cornet de glace ?',
      cm1Redac('Les objets', '', 'Le ballon : une boule. La boîte à chaussures : un pavé. Le cornet de glace : un cône.')],
    [`Quel solide a laissé cette empreinte : le cube ou le cylindre ?${lig(empreinte('disque', '#E9C46A'))}`,
      cm1Redac('L\'empreinte', '', 'Un disque : c\'est la face du cylindre (le cube ne laisse que des carrés).')],
    [`Combien de cubes faut-il pour construire cette tour ?${lig(cpSvg(90, 150, boite(14, 112, 34, 34, 15, 12, '#2EA8C9') + boite(14, 78, 34, 34, 15, 12, '#2EA8C9') + boite(14, 44, 34, 34, 15, 12, '#2EA8C9') + boite(14, 10, 34, 34, 15, 12, '#2EA8C9'), 80))}`,
      cm1Redac('La tour', '', 'La tour est faite de 4 cubes empilés.')],
    ['Je suis un solide. J\'ai une pointe et une base ronde. Je peux rouler. Qui suis-je ?',
      cm1Redac('Devinette', '', 'Je suis un cône.', sol('cone', 70, false))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les pyramides d\'Égypte', [
    'Il y a environ 4 500 ans, les Égyptiens ont construit d\'immenses <b>pyramides</b> pour leurs rois, les pharaons. La plus grande, celle de <b>Khéops</b>, est faite de plus de 2 millions de blocs de pierre !',
    'Ces blocs ont presque la forme de <b>pavés</b>. Pour les déplacer, les ouvriers les posaient peut-être sur des rondins de bois… qui sont des <b>cylindres</b>, et qui roulent !',
  ]),
  quiz: [
    { q: 'Quel solide roule ?', opts: ['Le cube', 'La boule', 'La pyramide'], correct: 1 },
    { q: 'Combien de faces a un cube ?', opts: ['4', '6', '8'], correct: 1 },
    { q: 'Une boîte de conserve a la forme…', opts: ['d\'un cylindre', 'd\'un cône', 'd\'un cube'], correct: 0 },
  ],
  flash: [
    { l: 1, q: `Quel solide ?${lig(sol('pyramide', 70, false))}`, r: ['Une pyramide', 'Un cône', 'Un cube', 'Une boule'], ok: 0 },
    { l: 1, q: `Quel solide ?${lig(sol('cylindre', 70, false))}`, r: ['Un cône', 'Un cylindre', 'Un pavé', 'Une boule'], ok: 1 },
    { l: 2, q: 'Le pavé roule-t-il ?', r: ['Oui', 'Non', 'Seulement debout', 'Seulement dans l\'eau'], ok: 1 },
    { l: 3, q: 'Les faces d\'un cube sont des…', r: ['carrés', 'triangles', 'disques', 'rectangles longs'], ok: 0 },
    { l: 3, q: 'Un dé à jouer a la forme…', r: ['d\'un cube', 'd\'une boule', 'd\'un cône', 'd\'une pyramide'], ok: 0 },
    { l: 4, q: 'Trois cubes en ligne forment…', r: ['un pavé', 'une boule', 'un cône', 'un cylindre'], ok: 0 },
  ],
});
})();
