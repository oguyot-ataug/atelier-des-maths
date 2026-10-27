/* CP · Planches : Les solides (G4). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
const T = 'stroke="#1F3A5C" stroke-width="2" fill="none"', PT = 'stroke="#1F3A5C" stroke-width="1.6" fill="none" stroke-dasharray="5 4"';
const boite = (x, y, w, h, dx, dy, c) => `<polygon points="${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}" fill="${c}" fill-opacity=".35"/><polygon points="${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" fill="${c}" fill-opacity=".55"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity=".25"/><rect x="${x}" y="${y}" width="${w}" height="${h}" ${T}/><polyline points="${x},${y} ${x + dx},${y - dy} ${x + w + dx},${y - dy} ${x + w},${y}" ${T}/><polyline points="${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" ${T}/>`;
const SOL = { cube: boite(20, 42, 55, 55, 26, 22, '#2EA8C9'), pave: boite(10, 52, 78, 42, 24, 20, '#2E9C6A'),
  boule: `<circle cx="60" cy="58" r="40" fill="#E35D3A" fill-opacity=".35" ${T}/>`,
  cylindre: `<rect x="28" y="25" width="64" height="62" fill="#E9C46A" fill-opacity=".4"/><ellipse cx="60" cy="25" rx="32" ry="10" fill="#E9C46A" fill-opacity=".6" ${T}/><line x1="28" y1="25" x2="28" y2="87" stroke="#1F3A5C" stroke-width="2"/><line x1="92" y1="25" x2="92" y2="87" stroke="#1F3A5C" stroke-width="2"/><path d="M28 87 A32 10 0 0 0 92 87" ${T}/>`,
  cone: `<polygon points="26,86 94,86 60,12" fill="#7A4FC0" fill-opacity=".3"/><line x1="26" y1="86" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><line x1="94" y1="86" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><path d="M26 86 A34 10 0 0 0 94 86" ${T}/><path d="M26 86 A34 10 0 0 1 94 86" ${PT}/>`,
  pyramide: `<polygon points="15,90 75,90 60,15" fill="#C2185B" fill-opacity=".25"/><polygon points="75,90 100,72 60,15" fill="#C2185B" fill-opacity=".4"/><polyline points="15,90 75,90 100,72 60,15 15,90" ${T}/><line x1="75" y1="90" x2="60" y2="15" stroke="#1F3A5C" stroke-width="2"/>` };
const sol = (k, px) => cpSvg(120, 110, SOL[k], px || 70);
const NOMS = { cube: 'cube', pave: 'pavé', boule: 'boule', cylindre: 'cylindre', cone: 'cône', pyramide: 'pyramide' };
PLANCHES['cp|Les solides'] = [
  { titre: 'Nommer les solides', duree: '20 min',
    attendus: ['Reconnaître et nommer cube, pavé, boule, cylindre, cône, pyramide'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nom de chaque solide.',
        eleve: plGrille(['cube', 'boule', 'cylindre', 'pyramide', 'pave', 'cone'].map(k => sol(k) + '<br>' + B(6)), 3), corr: plGrille(['cube', 'boule', 'cylindre', 'pyramide', 'pave', 'cone'].map(k => sol(k) + '<br>' + R(NOMS[k])), 3) },
    ] },
  { titre: 'Il roule ou il ne roule pas', duree: '20 min',
    attendus: ['Trier les solides : ceux qui roulent, ceux qui ne roulent pas'],
    exos: [
      { etoiles: 1, consigne: 'Entoure les solides qui peuvent rouler.',
        ...PCP.entoure([['cube', 0], ['boule', 1], ['pave', 0], ['cylindre', 1], ['pyramide', 0], ['cone', 1]].map(([k, ok]) => [sol(k, 60), !!ok]), 6) },
      { etoiles: 2, col: 1, consigne: 'À quel solide ressemble… ?',
        ...P3.rmp([['un dé : @', 'un cube'], ['une balle : @', 'une boule'], ['une boîte de conserve : @', 'un cylindre'], ['un cornet de glace : @', 'un cône']], 6) },
    ] },
  { titre: 'Les faces du cube', duree: '15 min',
    attendus: ['Savoir que le cube a 6 faces carrées'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['Le cube a @ faces.', 6], ['Les faces du cube sont des @.', 'carrés'], ['La boule a @ face plate.', 0]], 4) },
      { etoiles: 3, consigne: 'Combien de cubes dans cette tour ?',
        ...PCP.compte([[cpSvg(90, 150, boite(14, 112, 34, 34, 15, 12, '#2EA8C9') + boite(14, 78, 34, 34, 15, 12, '#2EA8C9') + boite(14, 44, 34, 34, 15, 12, '#2EA8C9') + boite(14, 10, 34, 34, 15, 12, '#2EA8C9'), 60), 4]], 1) },
    ] },
];
})();
