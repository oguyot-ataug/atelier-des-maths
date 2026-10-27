/* ============================================================
   CHAPITRE : Les nombres jusqu'à 20 (CP, N3, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : dénombrer des collections
   jusqu'à 20 en faisant des paquets de dix, la dizaine (dix unités), décomposer « 10 et encore… »,
   lire et écrire les nombres en chiffres et en lettres (onze à vingt), la file des nombres (le
   suivant, le précédent), comparer deux nombres.
   Pensé pour être projeté : le paquet de dix et la bande des nombres sont animés.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const MOTS = CP_MOTS.concat(['onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt']);
// Deux boîtes de dix : la première pleine, la seconde avec n − 10 jetons.
const boites = (n, c) => lig(cpBoiteDix(Math.min(10, n), { c: c || 26 }), cpBoiteDix(Math.max(0, n - 10), { c: c || 26, couleurs: Array(10).fill(CPC.jeton2) }));
const cubes = cpCubes, bande = cpBande;
// Une fiche par nombre : chiffres, mot, « 10 et … », deux boîtes de dix.
const fiche = n => `<div class="cpn-fiche"><div class="cpn-fiche-n">${n}</div><div class="cpn-fiche-mot">${MOTS[n]}</div>
  <div style="font-size:.9rem;margin-bottom:4px;">${n === 20 ? '10 et 10' : `10 et ${n - 10}`}</div>${cubes(n, { q: 11 })}</div>`;

/* ---- La bande des nombres : on avance (ou on recule) d'une case à la fois ---- */
function animBande(id){
  const PRESETS = [{ nom: 'De 0 à 20', de: 0, a: 20, pas: 1 }, { nom: 'De 20 à 0', de: 20, a: 0, pas: -1 }, { nom: 'De 2 en 2', de: 0, a: 20, pas: 2 }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 1500 + (Math.abs(PRESETS[a.etat.p].a - PRESETS[a.etat.p].de) / Math.abs(PRESETS[a.etat.p].pas)) * 650,
    legende: 'La classe compte à voix haute avec la grenouille. Faites pause et demandez : « Quel est le nombre d\'après ? Et celui d\'avant ? »',
    controles: a => `<div class="cmp-modeles">${PRESETS.map((p, i) => cmBtn(id, 'p', i, p.nom, a.etat.p === i)).join('')}</div>`,
    dessin: (t, a) => {
      const P = PRESETS[a.etat.p], N = Math.abs(P.a - P.de) / Math.abs(P.pas), c = 28, X = v => 8 + v * c + c / 2;
      const f = cmPhase(t, .08, .96) * N, i = Math.min(N, Math.floor(f)), k = cmDoux(Math.min(1, (f - i) * 2.2));
      const v0 = P.de + i * P.pas, v1 = i < N ? v0 + P.pas : v0, x = X(v0) + (X(v1) - X(v0)) * (i < N ? k : 0), h = Math.sin(Math.PI * (i < N ? k : 0)) * 26;
      const dits = []; for(let q = 0; q <= i; q++) dits.push(P.de + q * P.pas);
      let s = '';
      for(let v = 0; v <= 20; v++) s += `<rect x="${8 + v * c}" y="70" width="${c}" height="${c}" fill="${dits.includes(v) ? '#FDE3D2' : v === 10 || v === 20 ? '#E7F5EE' : '#fff'}" stroke="${CPC.bord}" stroke-width="1.4"/>` + ce2T(8 + v * c + c / 2, 89, v, { t: 13, g: 700, c: v === v0 ? CPC.jeton : CPC.bord });
      // La grenouille.
      const y = 52 - h;
      s += `<ellipse cx="${x}" cy="${y + 6}" rx="13" ry="9" fill="#3E9B4F" stroke="#1F5C2E" stroke-width="1.3"/><circle cx="${x - 6}" cy="${y - 3}" r="5" fill="#3E9B4F" stroke="#1F5C2E"/><circle cx="${x + 6}" cy="${y - 3}" r="5" fill="#3E9B4F" stroke="#1F5C2E"/><circle cx="${x - 6}" cy="${y - 4}" r="2" fill="#1F3A5C"/><circle cx="${x + 6}" cy="${y - 4}" r="2" fill="#1F3A5C"/><path d="M${x - 5} ${y + 7} q5 4 10 0" fill="none" stroke="#1F5C2E" stroke-width="1.3"/>`;
      s += ce2T(306, 130, `${v0} : ${MOTS[v0]}`, { t: 20, g: 700, c: CPC.jeton });
      const texte = t < .08 ? 'La grenouille est prête à sauter. On compte avec elle !'
        : t < .96 ? dits.map(v => MOTS[v]).join(', ') + '…'
        : P.pas === 2 ? 'De 2 en 2 : 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20. On saute une case à chaque fois.' : P.pas > 0 ? 'On est arrivé à <b>vingt</b> : 20, c\'est <b>2 dizaines</b>.' : 'On est revenu à <b>zéro</b> en comptant à rebours.';
      return { scene: `<svg viewBox="0 0 612 142" class="cma-svg" style="max-width:640px;">${s}</svg>`, texte };
    } });
}

cm1Chapitre({
  niveau: 'cp', titre: 'Les nombres jusqu\'à 20', slug: 'nombres-20',
  cours: `
${cm1Lecon(1, 'La dizaine')}
${cpAnimDizaine('cp-n3-dizaine', { n: 14 })}
${cm1Def(`Quand on a <b>dix</b> objets, on peut en faire un paquet : c'est <b>une dizaine</b>.${lig(cpBoiteDix(10, { c: 30 }), cubes(10, { q: 18 }))}<p style="text-align:center;margin:2px 0;"><b>10 unités = 1 dizaine</b></p>`, 'Une dizaine')}
${cm1Regle(`Pour compter beaucoup d'objets, on fait d'abord un <b>paquet de dix</b>, puis on compte ceux qui restent.${lig(cubes(13, { q: 18 }))}<p style="text-align:center;margin:2px 0;">1 dizaine et 3 unités : <b>13</b>.</p>`)}
${cm1Rem('Au tableau : faire manipuler de vrais objets (bûchettes, cubes, jetons) avec des élastiques ou des boîtes. La boîte de dix pleine, la barre de dix cubes et le paquet de dix bûchettes, c\'est la même idée : une dizaine.')}

${cm1Lecon(2, 'Les nombres de 11 à 20')}
${cm1Def(`Dans <b>14</b>, le <b>1</b> dit qu'il y a 1 dizaine, le <b>4</b> dit qu'il y a 4 unités.${boites(14, 28)}<p style="text-align:center;margin:2px 0;">14 = 10 + 4</p>`, 'Dizaines et unités')}
<div class="cpn-fiches">${[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(fiche).join('')}</div>
${cm1Rem('<b>Onze, douze, treize, quatorze, quinze, seize</b> ne ressemblent pas à « dix-un, dix-deux… » : il faut les apprendre par cœur. À partir de <b>dix-sept</b>, on entend bien « dix et sept ». <b>Vingt</b>, c\'est 2 dizaines : deux boîtes pleines.')}

${cm1Lecon(3, 'La file des nombres jusqu\'à 20')}
${animBande('cp-n3-bande')}
${cm1Regle(`Le nombre <b>d'après</b>, c'est un de plus. Le nombre <b>d'avant</b>, c'est un de moins.${lig(bande(14, 18, { on: [16], c: 40 }))}<p style="text-align:center;margin:2px 0;">Avant 16, il y a 15. Après 16, il y a 17.</p>`)}
${cm1Astuce('Après 19, on change de dizaine : 19 et encore 1, c\'est 20. Comme après 9 : 9 et encore 1, c\'est 10.')}

${cm1Lecon(4, 'Comparer deux nombres')}
${cm1Regle(`Pour comparer, on regarde <b>d'abord les dizaines</b>, puis les unités.${lig(cubes(12, { q: 14 }), cubes(9, { q: 14 }))}<p style="text-align:center;margin:2px 0;">12 a une dizaine, 9 n'en a pas : <b>12 est plus grand que 9</b>.</p>${lig(cubes(15, { q: 14 }), cubes(18, { q: 14 }))}<p style="text-align:center;margin:2px 0;">15 et 18 ont chacun une dizaine ; 5 unités, c'est moins que 8 : <b>15 est plus petit que 18</b>.</p>`, 'Plus grand, plus petit')}
${cm1Rem('Sur la bande des nombres, le plus grand nombre est toujours le plus loin, à droite.')}
`,
  methode: `
${cm1Demo('cp-n3-m-paquet', 'Compter une grande collection', 'Combien y a-t-il de jetons ? On fait un paquet de dix.')}
${cm1Demo('cp-n3-m-comparer', 'Comparer deux nombres', 'Qui a le plus de billes : Zoé en a 17, Malo en a 13.')}
`,
  demos: [
    ['cp-n3-m-paquet', [
      { expr: 'Il y a beaucoup de jetons : je ne peux pas les voir d\'un coup.', note: 'Je les range dans des boîtes de dix.', fig: cpPommes(16, { W: 360, H: 150, graine: 9 }) },
      { expr: 'Je remplis une boîte de dix.', note: 'Une boîte pleine, c\'est 1 dizaine.', fig: boites(16, 24) },
      { expr: 'Il en reste 6 dans la deuxième boîte.', note: '6 unités.' },
      { expr: '10 + 6 = 16', note: '1 dizaine et 6 unités : il y a <b>16</b> jetons (seize).' },
    ]],
    ['cp-n3-m-comparer', [
      { expr: '17 = 10 + 7', note: 'Zoé : 1 dizaine et 7 unités.', fig: cubes(17, { q: 14 }) },
      { expr: '13 = 10 + 3', note: 'Malo : 1 dizaine et 3 unités.', fig: cubes(13, { q: 14 }) },
      { expr: 'Même nombre de dizaines : je compare les unités.', note: '7 unités, c\'est plus que 3 unités.' },
      { expr: '17 est plus grand que 13.', note: 'C\'est <b>Zoé</b> qui a le plus de billes.' },
    ]],
  ],
  exos: cm1Exos('cp-n3', [
    [`Combien y a-t-il de jetons ?${boites(14)}`,
      cm1Redac('Nombre de jetons', '10 + 4 = 14', 'Une boîte pleine et 4 jetons : il y a 14 jetons.')],
    ['Écris en chiffres : seize.',
      cm1Redac('Seize en chiffres', '10 + 6 = 16', 'Seize s\'écrit 16 : 1 dizaine et 6 unités.', cubes(16, { q: 12 }))],
    ['Dans 17, combien y a-t-il de dizaines ? Combien d\'unités ?',
      cm1Redac('Dizaines et unités de 17', '17 = 10 + 7', '17, c\'est 1 dizaine et 7 unités.', cubes(17, { q: 12 }))],
    ['Quel nombre vient juste après 19 ?',
      cm1Redac('Après 19', '19 + 1 = 20', 'Juste après 19, il y a 20 (vingt) : 2 dizaines.', boites(20, 18))],
    [`Complète la bande des nombres.${lig(bande(10, 16, { trous: [12, 13, 15] }))}`,
      cm1Redac('La bande des nombres', { suite: ['10, 11, 12, 13, 14, 15, 16'] }, 'Les nombres qui manquent sont 12, 13 et 15.', bande(10, 16, { on: [12, 13, 15], c: 26 }))],
    ['Lina a 13 images. Hugo a 11 images. Qui en a le plus ?',
      cm1Redac('Qui a le plus d\'images', { suite: ['13 = 10 + 3', '11 = 10 + 1'] }, '3 unités, c\'est plus que 1 unité : 13 est plus grand que 11. C\'est Lina qui a le plus d\'images.', lig(cubes(13, { q: 11 }), cubes(11, { q: 11 })))],
    ['Paul a une boîte de 10 crayons et encore 5 crayons. Combien a-t-il de crayons ?',
      cm1Redac('Crayons de Paul', '10 + 5 = 15', 'Paul a 15 crayons (quinze).', boites(15, 18))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi « onze » et pas « dix-un » ?', [
    'Nos mots pour compter viennent du <b>latin</b>, la langue des Romains. En latin, onze se disait <b>undecim</b> (« un et dix »), douze <b>duodecim</b> (« deux et dix »)… En s\'usant au fil des siècles, ces mots sont devenus onze, douze, treize, quatorze, quinze, seize.',
    'Dans d\'autres langues, c\'est plus simple : en <b>chinois</b>, on dit « dix-un » pour 11 et « dix-deux » pour 12. Et pour 20 ? « Deux-dix » !',
  ]),
  quiz: [
    { q: `Combien y a-t-il de cubes ?${lig(cubes(15, { q: 14 }))}`, opts: ['14', '15', '51'], correct: 1 },
    { q: 'Treize s\'écrit…', opts: ['31', '13', '3'], correct: 1 },
    { q: 'Quel nombre est le plus grand ?', opts: ['18', '12', '9'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '10 unités, c\'est…', r: ['1 dizaine', '10 dizaines', '1 unité', '100'], ok: 0 },
    { l: 1, q: `Combien de cubes ?${lig(cubes(12, { q: 12 }))}`, r: ['11', '12', '21', '2'], ok: 1 },
    { l: 2, q: '10 + 7 = …', r: ['107', '17', '71', '8'], ok: 1 },
    { l: 2, q: 'Quinze s\'écrit…', r: ['51', '15', '50', '5'], ok: 1 },
    { l: 2, q: 'Dans 18, combien d\'unités ?', r: ['1', '8', '18', '10'], ok: 1 },
    { l: 3, q: 'Juste après 14, il y a…', r: ['13', '15', '41', '16'], ok: 1 },
    { l: 3, q: 'Juste avant 20, il y a…', r: ['21', '19', '10', '18'], ok: 1 },
    { l: 4, q: 'Quel est le plus grand : 16 ou 19 ?', r: ['16', '19', 'Pareil', 'On ne sait pas'], ok: 1 },
    { l: 4, q: 'Quel est le plus petit : 11 ou 9 ?', r: ['11', '9', 'Pareil', 'On ne sait pas'], ok: 1 },
  ],
});
})();
