/* ============================================================
   CHAPITRE : Les durées : heures et minutes (CE1, M5, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, repérage dans le temps et durées :
   en mathématiques, au CE1, les temps courts exprimés en heures et en minutes. Les unités heure et
   minute (h, min), 1 h = 60 min, 1 demi-heure = 30 min, 1 quart d'heure = 15 min ; parler d'une durée
   avec l'unité adaptée (« cinq minutes », « deux heures à la piscine ») ; mesurer et comparer des
   durées entre deux instants d'une même journée (de 8 h 30 à 8 h 45, de 15 h 45 à 16 h 15, de midi
   à 20 h ; 2 heures ou 130 minutes ?) ; ajouter et soustraire des durées.
   Pour aller plus loin (en lien avec Questionner le monde) : le calendrier, les jours, les mois.
   Pensé pour être projeté : les sauts sur l'axe du temps, le calendrier où le doigt avance.
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
  niveau: 'ce1', titre: 'Les durées : heures et minutes', slug: 'durees',
  cours: `
${cm1Lecon(1, 'Heures et minutes')}
${cm1Def(`${cm1Liste(['L\'<b>heure</b> (h) sert pour les longues durées : « Je suis resté <b>2 heures</b> à la piscine. »', 'La <b>minute</b> (min) sert pour les durées courtes : « J\'ai mis <b>5 minutes</b> pour faire cet exercice. »'])}`, 'Deux unités de durée')}
${cm1Regle(`${cm1Liste(['1 h = 60 min', '1 demi-heure = 30 min', '1 quart d\'heure = 15 min'])}`, 'À savoir par cœur')}
${cm1Astuce('Deux quarts d\'heure font une demi-heure ; deux demi-heures, ou quatre quarts d\'heure, font une heure.')}

${cm1Lecon(2, 'Calculer une durée')}
${ce2AnimSauts('ce1-m5-sauts', { legende: 'Sur l\'axe du temps : on avance de l\'heure de début à l\'heure de fin, par bonds faciles.', presets: [
  { nom: 'De 8 h 30 à 8 h 45', depart: 510, sauts: [[15, '+ 15 min']], min: 500, max: 535, fmt: ce2Heure, fin: 'De 8 h 30 à 8 h 45, il s\'écoule <b>15 minutes</b>, un quart d\'heure.' },
  { nom: 'De 15 h 45 à 16 h 15', depart: 945, sauts: [[15, '+ 15 min'], [15, '+ 15 min']], min: 930, max: 985, fmt: ce2Heure, fin: 'De 15 h 45 à 16 h, puis de 16 h à 16 h 15 : <b>30 minutes</b>, une demi-heure.' },
  { nom: 'De midi à 20 h', depart: 720, sauts: [[480, '+ 8 h']], min: 660, max: 1260, fmt: ce2Heure, fin: 'De midi à 20 h, il s\'écoule <b>8 heures</b>.' }] })}
${cm1Regle(`De 15 h 45 à 16 h 15 : je passe par l'heure juste.${cm1Liste(['De 15 h 45 à 16 h : 15 min', 'De 16 h à 16 h 15 : 15 min', '15 min + 15 min = 30 min'])}`, 'Passer par l\'heure juste')}

${cm1Lecon(3, 'Ajouter et comparer des durées')}
${cm1Regle(`Mamie a passé un quart d'heure à tailler ses rosiers et une demi-heure à bêcher son potager.${cm1Liste(['15 min + 30 min = 45 min'])}${P('Elle est restée <b>45 minutes</b> au jardin, trois quarts d\'heure.')}`, 'Ajouter des durées')}
${cm1Regle(`Pour comparer, on écrit les deux durées dans la même unité :${cm1Liste(['2 h = 60 min + 60 min = 120 min', '120 min &lt; 130 min'])}${P('130 minutes, c\'est plus long que 2 heures.')}`, 'Comparer des durées')}

${ce1PlusLoin('le calendrier (en lien avec Questionner le monde)')}
${cm1Rem('Le calendrier, les jours et les mois s\'apprennent en « Questionner le monde ». Voici de quoi s\'entraîner.')}
${cm1Def(`Une <b>semaine</b> a <b>7 jours</b> : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.<br>Une <b>année</b> a <b>12 mois</b> : ${MOIS.join(', ')}.`, 'Semaine et année')}
${cm1Def(`${lig(calendrier(2027, 4, [14]))}${P('Le <b>vendredi 14 mai 2027</b> : on lit le jour en haut de la colonne. Mai a 31 jours.')}`, 'Le calendrier')}
${cm1Regle(`${cm1Liste(['1 jour = 24 heures', '1 semaine = 7 jours', '1 mois = 28, 29, 30 ou 31 jours', '1 an = 12 mois'])}`, 'Jours, semaines, mois')}
${animJours('ce1-m5-jours')}
`,
  methode: `
${cm1Demo('ce1-m5-m-heures', 'Calculer une durée en heures et minutes', 'Le film commence à 14 h 30 et finit à 16 h 15. Combien de temps dure-t-il ?')}
${cm1Demo('ce1-m5-m-date', 'Pour aller plus loin : trouver le jour d\'une date', 'Quel jour de la semaine est le 20 mai 2027 ?')}
`,
  demos: [
    ['ce1-m5-m-date', [
      { expr: 'Je cherche le 20 dans le calendrier de mai 2027.', note: 'Les jours sont rangés par semaines.', fig: calendrier(2027, 4, [20], { px: 220 }) },
      { expr: 'Je remonte la colonne : J.', note: 'C\'est la colonne du jeudi.' },
      { expr: 'Le 20 mai 2027 est un jeudi.', note: 'Jeudi 20 mai 2027.' },
    ]],
    ['ce1-m5-m-heures', [
      { expr: 'De 14 h 30 à 15 h : 30 min', note: 'Jusqu\'à l\'heure juste.' },
      { expr: 'De 15 h à 16 h : 1 h', note: 'Les heures entières.' },
      { expr: 'De 16 h à 16 h 15 : 15 min', note: 'Le reste.' },
      { expr: '1 h + 30 min + 15 min = 1 h 45 min', note: 'Le film dure 1 h 45 min.' },
    ]],
  ],
  exos: cm1Exos('ce1-m5', [
    ['Pour dire combien de temps dure une récréation, choisis l\'unité : heure ou minute ?',
      cm1Redac('La récréation', '', 'Une récréation dure environ 15 minutes : on utilise la minute.')],
    ['Combien de temps entre 8 h 30 et 8 h 45 ?',
      cm1Redac('Durée', '8 h 30 + 15 min = 8 h 45', 'Il s\'écoule 15 minutes, un quart d\'heure.')],
    ['Combien de temps entre 15 h 45 et 16 h 15 ?',
      cm1Redac('Durée', { suite: ['De 15 h 45 à 16 h : 15 min', 'De 16 h à 16 h 15 : 15 min', '15 min + 15 min = 30 min'] }, 'Il s\'écoule 30 minutes, une demi-heure.')],
    ['Qu\'est-ce qui est le plus long : 2 heures ou 130 minutes ?',
      cm1Redac('Le plus long', { suite: ['2 h = 120 min', '120 min &lt; 130 min'] }, '130 minutes, c\'est plus long que 2 heures.')],
    ['Léa lit 20 minutes le matin et un quart d\'heure le soir. Combien de temps lit-elle dans la journée ?',
      cm1Redac('Temps de lecture', '20 min + 15 min = 35 min', 'Léa lit 35 minutes dans la journée.')],
    [`Pour aller plus loin : quel jour de la semaine est le 26 mai 2027 ?${lig(calendrier(2027, 4, [26], { px: 210 }))}`,
      cm1Redac('Le 26 mai', '', 'Le 26 mai 2027 est un mercredi.')],
    ['Pour aller plus loin : combien de jours dans 3 semaines ?',
      cm1Redac('Jours dans 3 semaines', '3 × 7 = 21', 'Il y a 21 jours dans 3 semaines.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les noms des mois', [
    'Nos mois viennent du calendrier des Romains. Juillet porte le nom de <b>Jules César</b>, et août celui de l\'empereur <b>Auguste</b> !',
    'Septembre, octobre, novembre et décembre veulent dire « septième, huitième, neuvième et dixième » mois, car l\'année romaine commençait autrefois en mars. Les noms sont restés, même si l\'année commence maintenant en janvier.',
  ]),
  quiz: [
    { q: '1 h = …', opts: ['60 min', '100 min', '30 min'], correct: 0 },
    { q: 'De 8 h 30 à 8 h 45 : …', opts: ['15 min', '45 min', '1 h 15'], correct: 0 },
    { q: 'Le plus long :', opts: ['130 min', '2 h', 'pareil'], correct: 0 },
    { q: 'Un quart d\'heure + une demi-heure = …', opts: ['45 min', '1 h', '30 min'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '1 demi-heure = …', r: ['30 min', '50 min', '15 min', '60 min'], ok: 0 },
    { l: 1, q: 'Un film dure environ 2…', r: ['heures', 'minutes', 'jours', 'secondes'], ok: 0 },
    { l: 1, q: 'Se brosser les dents dure environ 3…', r: ['minutes', 'heures', 'jours', 'semaines'], ok: 0 },
    { l: 2, q: 'De 10 h 15 à 10 h 45 : …', r: ['30 min', '45 min', '15 min', '1 h'], ok: 0 },
    { l: 2, q: 'De midi à 20 h : …', r: ['8 h', '20 h', '12 h', '32 h'], ok: 0 },
    { l: 3, q: '2 h = … min', r: ['120', '200', '60', '100'], ok: 0 },
    { l: 3, q: '30 min + 15 min = …', r: ['45 min', '1 h', '35 min', '3 quarts'], ok: 0 },
  ],
});
})();
