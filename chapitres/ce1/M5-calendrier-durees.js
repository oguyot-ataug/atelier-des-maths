/* ============================================================
   CHAPITRE : Le calendrier et les durées (CE1, M5, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, grandeurs et mesures : connaître
   les jours de la semaine et les mois de l'année, lire un calendrier (date, jour, nombre de jours
   d'un mois), relations entre unités de durée (1 semaine = 7 jours, 1 jour = 24 heures, 1 an =
   12 mois) ; calculer une durée simple en jours ou en semaines ; se repérer avant, après.
   Pensé pour être projeté : le calendrier du mois, les jours qu'on compte du doigt.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
// Le calendrier d'un mois (m de 0 à 11, année a) ; on : jours colorés ; o.fleche : [de, à] jours reliés.
function calendrier(a, m, on, o){
  o = o || {}; const c = 34, d0 = (new Date(a, m, 1).getDay() + 6) % 7, nj = new Date(a, m + 1, 0).getDate();
  let s = ce2T(7 * c / 2 + 3, 18, `${MOIS[m]} ${a}`, { t: 15, g: 700 });
  ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach((j, i) => { s += ce2T(3 + i * c + c / 2, 40, j, { t: 12, g: 700, c: i > 4 ? CE2C.rouge : CE2C.gris }); });
  for(let j = 1; j <= nj; j++){ const k = d0 + j - 1, x = 3 + (k % 7) * c, y = 48 + Math.floor(k / 7) * c, sel = (on || []).includes(j);
    s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${sel ? '#FDE3D2' : k % 7 > 4 ? '#F7F3EC' : '#fff'}" stroke="#C7D2DE"/>` + ce2T(x + c / 2, y + c / 2 + 5, j, { t: 13, g: sel ? 700 : 500, c: sel ? CPC.jeton : CPC.bord }); }
  const H = 48 + Math.ceil((d0 + nj) / 7) * c + 4;
  return cpSvg(7 * c + 6, H, s, o.px || 250);
}

/* ---- Compter les jours sur le calendrier : on avance d'un jour à la fois ---- */
function animJours(id){
  const PR = [{ nom: 'Du 8 au 15 mai', de: 8, a: 15 }, { nom: 'Du 3 au 21 mai', de: 3, a: 21 }, { nom: 'Du 20 au 31 mai', de: 20, a: 31 }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2000 + (PR[a.etat.p].a - PR[a.etat.p].de) * 450,
    legende: 'Le doigt avance d\'un jour à la fois ; une ligne entière, c\'est une semaine (7 jours).',
    controles: a => ce2Choix(id, PR, a),
    dessin: (t, a) => {
      const p = PR[a.etat.p], n = p.a - p.de, k = Math.min(n, Math.floor(cmPhase(t, .1, .9) * n + 1e-6)), on = [];
      for(let j = p.de; j <= p.de + k; j++) on.push(j);
      const sc = calendrier(2027, 4, on).replace('class="pl-libre"', 'class="pl-libre cma-svg"');
      const sem = Math.floor(n / 7), r = n % 7;
      const texte = t < .1 ? `Combien de jours du <b>${p.de}</b> au <b>${p.a}</b> mai ?` : t < .9 ? `${k} jour${k > 1 ? 's' : ''}…` : `Du ${p.de} au ${p.a} : <b>${n} jours</b>${sem ? ` (${sem} semaine${sem > 1 ? 's' : ''}${r ? ` et ${r} jour${r > 1 ? 's' : ''}` : ''})` : ''}. Calcul : ${p.a} − ${p.de} = ${n}.`;
      return { scene: sc, texte };
    } });
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Le calendrier et les durées', slug: 'calendrier-durees',
  cours: `
${cm1Lecon(1, 'La semaine et les mois')}
${cm1Def(`Une <b>semaine</b> a <b>7 jours</b> : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.<br>Une <b>année</b> a <b>12 mois</b> : ${MOIS.join(', ')}.`, 'Semaine et année')}
${cm1Astuce('Pour savoir si un mois a 31 jours : on compte sur les bosses de ses poings ! Chaque bosse (janvier, mars, mai…) est un mois de 31 jours, chaque creux (février, avril…) un mois plus court.')}

${cm1Lecon(2, 'Lire un calendrier')}
${cm1Def(`${lig(calendrier(2027, 4, [14]))}${P('Le <b>vendredi 14 mai 2027</b> : on lit le jour en haut de la colonne. Mai a 31 jours.')}`, 'Le calendrier')}
${cm1Regle('Une <b>date</b> s\'écrit : le jour de la semaine, le numéro du jour, le mois et l\'année. Par exemple : vendredi 14 mai 2027, ou 14/05/2027.')}

${cm1Lecon(3, 'Les unités de durée')}
${cm1Regle(`${cm1Liste(['1 jour = 24 heures', '1 semaine = 7 jours', '1 mois = 28, 29, 30 ou 31 jours', '1 an = 12 mois = 365 jours (366 les années bissextiles)'])}`, 'À savoir')}
${cm1Rem('Février a 28 jours, et 29 jours une année sur quatre (année bissextile, comme 2028).')}

${cm1Lecon(4, 'Calculer une durée')}
${cm1Def(`${lig(calendrier(2027, 4, [3, 4, 5, 6, 7, 10, 11, 12, 13, 14]))}${P('Du lundi 3 au vendredi 14 mai, sans compter les samedis et les dimanches : 10 jours.')}`, 'Compter les jours')}
${animJours('ce1-m5-jours')}
${cm1Exemple('Exemple', ['Les vacances commencent le samedi 17 avril et durent 2 semaines.', '2 semaines = 14 jours.', 'On reprend l\'école le lundi 3 mai.'])}
`,
  methode: `
${cm1Demo('ce1-m5-m-date', 'Trouver le jour d\'une date', 'Quel jour de la semaine est le 20 mai 2027 ?')}
${cm1Demo('ce1-m5-m-duree', 'Calculer une durée en jours', 'Combien de jours du 8 au 15 mai ?')}
`,
  demos: [
    ['ce1-m5-m-date', [
      { expr: 'Je cherche le 20 dans le calendrier de mai 2027.', note: 'Les jours sont rangés par semaines.', fig: calendrier(2027, 4, [20], { px: 220 }) },
      { expr: 'Je remonte la colonne : J.', note: 'C\'est la colonne du jeudi.' },
      { expr: 'Le 20 mai 2027 est un jeudi.', note: 'Jeudi 20 mai 2027.' },
    ]],
    ['ce1-m5-m-duree', [
      { expr: 'Du 8 au 15 : une semaine plus tard.', note: '8 + 7 = 15.' },
      { expr: '15 − 8 = 7', note: 'Ou bien je calcule l\'écart.' },
      { expr: 'Il y a 7 jours, une semaine.', note: 'Du samedi 8 au samedi 15.' },
    ]],
  ],
  exos: cm1Exos('ce1-m5', [
    ['Quel jour vient après jeudi ? Avant lundi ?',
      cm1Redac('Les jours', '', 'Après jeudi vient vendredi. Avant lundi, il y a dimanche.')],
    ['Quel mois vient après mars ? Avant octobre ?',
      cm1Redac('Les mois', '', 'Après mars vient avril. Avant octobre, il y a septembre.')],
    [`Quel jour de la semaine est le 26 mai 2027 ?${lig(calendrier(2027, 4, [26], { px: 210 }))}`,
      cm1Redac('Le 26 mai', '', 'Le 26 mai 2027 est un mercredi.')],
    ['Combien d\'heures dans 2 jours ?',
      cm1Redac('Heures dans 2 jours', '24 + 24 = 48', 'Il y a 48 heures dans 2 jours.')],
    ['Combien de jours dans 3 semaines ?',
      cm1Redac('Jours dans 3 semaines', '3 × 7 = 21', 'Il y a 21 jours dans 3 semaines.')],
    ['Mon anniversaire est le 12 juin. Aujourd\'hui, c\'est le 5 juin. Dans combien de jours est mon anniversaire ?',
      cm1Redac('L\'anniversaire', '12 − 5 = 7', 'Mon anniversaire est dans 7 jours, une semaine.')],
    ['Léo est né en 2019. Quel âge aura-t-il en 2027 ?',
      cm1Redac('L\'âge de Léo', '2027 − 2019 = 8', 'Léo aura 8 ans en 2027.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les noms des mois', [
    'Nos mois viennent du calendrier des Romains. Juillet porte le nom de <b>Jules César</b>, et août celui de l\'empereur <b>Auguste</b> !',
    'Septembre, octobre, novembre et décembre veulent dire « septième, huitième, neuvième et dixième » mois, car l\'année romaine commençait autrefois en mars. Les noms sont restés, même si l\'année commence maintenant en janvier.',
  ]),
  quiz: [
    { q: 'Une semaine a…', opts: ['7 jours', '5 jours', '10 jours'], correct: 0 },
    { q: 'Une année a…', opts: ['12 mois', '10 mois', '52 mois'], correct: 0 },
    { q: '1 jour = …', opts: ['24 heures', '12 heures', '60 heures'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Après samedi :', r: ['dimanche', 'lundi', 'vendredi', 'mardi'], ok: 0 },
    { l: 1, q: 'Le mois après décembre :', r: ['janvier', 'novembre', 'février', 'mars'], ok: 0 },
    { l: 3, q: '2 semaines = … jours', r: ['14', '12', '7', '21'], ok: 0 },
    { l: 3, q: 'Février a le plus souvent…', r: ['28 jours', '31 jours', '30 jours', '27 jours'], ok: 0 },
    { l: 4, q: 'Du 3 au 10 du mois : …', r: ['7 jours', '13 jours', '3 jours', '10 jours'], ok: 0 },
  ],
});
})();
