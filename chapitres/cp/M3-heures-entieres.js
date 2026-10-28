/* ============================================================
   CHAPITRE : Lire l'heure : les heures entières (CP, M3, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, grandeurs et mesures : se repérer
   dans la journée (matin, midi, après-midi, soir, nuit), lire l'heure en heures entières sur une
   horloge à aiguilles (la petite aiguille montre l'heure, la grande est sur le 12), placer les
   aiguilles, une heure qui passe. Pour aller plus loin (Questionner le monde) : les jours de la semaine.
   Pensé pour être projeté : l'horloge dont la grande aiguille fait un tour.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Une horloge avec sa légende.
const H = (h, leg, px) => `<span style="display:inline-block;text-align:center;">${cpHorloge(h, px || 120)}<br><b>${leg || h + ' h'}</b></span>`;
const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

cm1Chapitre({
  niveau: 'cp', titre: 'Lire l\'heure : les heures entières', slug: 'heures-entieres',
  cours: `
${cm1Lecon(1, 'Les moments de la journée')}
${cm1Def(`${cm1Liste(['le <b>matin</b> : on se lève, on va à l\'école ;', 'à <b>midi</b> : on déjeune ;', 'l\'<b>après-midi</b> : la classe reprend, puis le goûter ;', 'le <b>soir</b> : on dîne ;', 'la <b>nuit</b> : on dort. À <b>minuit</b>, c\'est le milieu de la nuit.'])}`, 'La journée')}
${cm1Rem('Au tableau : afficher l\'emploi du temps de la journée avec des images (accueil, récréation, cantine…), et le relire chaque matin.')}

${cm1Lecon(2, 'L\'horloge et ses aiguilles')}
${cm1Def(`${lig(H(3, 'Il est 3 heures.', 150))}${cm1Liste(['La <b>petite aiguille</b> (rouge) montre l\'<b>heure</b> : ici, le 3.', 'La <b>grande aiguille</b> (bleue) est sur le <b>12</b> : c\'est une heure « pile », une heure entière.'])}`, 'Lire l\'heure')}
${cpAnimHeure('cp-m3-heure', { h: 8 })}
${cm1Astuce('Petite aiguille, petit mot : l\'<b>heure</b>. Grande aiguille, grand mot : les <b>minutes</b> (on les apprendra au CE1). Quand la grande aiguille est sur le 12, on lit seulement la petite.')}

${cm1Lecon(3, 'Lire et dessiner des heures entières')}
${cm1Def(`${lig(H(7, '7 h'), H(10, '10 h'), H(12, 'midi'), H(4, '4 h'))}`, 'Exemples')}
${cm1Regle('Pour dessiner une heure entière : je mets la <b>grande aiguille sur le 12</b>, puis la <b>petite aiguille sur le nombre de l\'heure</b>.')}
${cm1Rem('L\'après-midi, 2 heures s\'appelle aussi 14 heures : la petite aiguille fait deux fois le tour dans une journée. Au CP, on lit surtout les heures de 1 h à 12 h.')}

${cpPlusLoin('les jours de la semaine (Questionner le monde)')}
${cm1Def(`Une semaine a <b>7 jours</b> :${lig(`<span class="cpn-cartes">${JOURS.map(j => `<span style="font-size:.95rem;">${j}</span>`).join('')}</span>`)}`, 'La semaine')}
${cm1Regle('Après dimanche, une nouvelle semaine commence : lundi. Hier, aujourd\'hui, demain : si aujourd\'hui c\'est mardi, hier c\'était lundi et demain ce sera mercredi.')}
`,
  methode: `
${cm1Demo('cp-m3-m-lire', 'Lire l\'heure sur une horloge', 'Quelle heure est-il ?')}
${cm1Demo('cp-m3-m-placer', 'Dessiner 9 heures', 'Dessine les aiguilles pour qu\'il soit 9 heures.')}
`,
  demos: [
    ['cp-m3-m-lire', [
      { expr: 'Je regarde la grande aiguille : elle est sur le 12.', note: 'C\'est une heure entière.', fig: cpHorloge(5, 120) },
      { expr: 'Je regarde la petite aiguille : elle est sur le 5.', note: 'C\'est elle qui donne l\'heure.' },
      { expr: 'Il est 5 heures.', note: 'On écrit aussi 5 h.' },
    ]],
    ['cp-m3-m-placer', [
      { expr: 'La grande aiguille sur le 12.', note: 'Une heure entière.', fig: cpSvg(160, 160, ce2Horloge(80, 80, 74, 0).replace(/<line x1="80" y1="80"[^>]*stroke="#E35D3A"[^>]*\/>/, ''), 120) },
      { expr: 'La petite aiguille sur le 9.', note: 'Plus courte, elle montre l\'heure.', fig: cpHorloge(9, 120) },
      { expr: 'Il est 9 heures.', note: '9 h.' },
    ]],
  ],
  exos: cm1Exos('cp-m3', [
    [`Quelle heure est-il ?${lig(cpHorloge(2, 120))}`,
      cm1Redac('L\'heure', '', 'La grande aiguille est sur le 12 et la petite sur le 2 : il est 2 heures.')],
    [`Quelle heure est-il ?${lig(cpHorloge(11, 120))}`,
      cm1Redac('L\'heure', '', 'Il est 11 heures.')],
    ['Où faut-il mettre les aiguilles pour qu\'il soit 6 heures ?',
      cm1Redac('6 heures', '', 'La grande aiguille sur le 12, la petite aiguille sur le 6.', cpHorloge(6, 100))],
    ['Il est 8 heures. Quelle heure sera-t-il dans une heure ?',
      cm1Redac('Une heure plus tard', '8 + 1 = 9', 'Dans une heure, il sera 9 heures.', lig(cpHorloge(8, 80), cpHorloge(9, 80)))],
    ['La récréation commence à 10 heures. Le film commence 2 heures plus tard. À quelle heure commence le film ?',
      cm1Redac('Heure du film', '10 + 2 = 12', 'Le film commence à 12 heures, à midi.', cpHorloge(12, 90))],
    ['Pour aller plus loin : aujourd\'hui, c\'est jeudi. Quel jour serons-nous demain ? Et quel jour était-ce hier ?',
      cm1Redac('Les jours', '', 'Demain, ce sera vendredi. Hier, c\'était mercredi.')],
    ['Range ces moments dans l\'ordre de la journée : le goûter, le petit-déjeuner, le dîner, le déjeuner.',
      cm1Redac('L\'ordre de la journée', '', 'Le petit-déjeuner (le matin), le déjeuner (à midi), le goûter (l\'après-midi), le dîner (le soir).')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : lire l\'heure avec le soleil', [
    'Il y a plus de 3 000 ans, les Égyptiens lisaient l\'heure avec l\'<b>ombre</b> d\'un bâton planté au soleil : c\'est le <b>cadran solaire</b>. Mais la nuit, ou quand il pleut, il ne marche pas !',
    'On a aussi utilisé des sabliers et des horloges à eau. Les premières horloges à aiguilles, dans les clochers des églises, sont apparues il y a environ 700 ans. Elles n\'avaient souvent… qu\'une seule aiguille : celle des heures !',
  ]),
  quiz: [
    { q: `Quelle heure est-il ?${lig(cpHorloge(4, 100))}`, opts: ['12 heures', '4 heures', '5 heures'], correct: 1 },
    { q: 'La petite aiguille montre…', opts: ['les heures', 'les minutes', 'les jours'], correct: 0 },
    { q: 'Il est 3 h. Dans une heure, il sera…', opts: ['2 h', '4 h', '13 h'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'On déjeune à…', r: ['minuit', 'midi', 'matin', 'soir'], ok: 1 },
    { l: 2, q: `Quelle heure ?${lig(cpHorloge(9, 90))}`, r: ['9 h', '12 h', '3 h', '10 h'], ok: 0 },
    { l: 2, q: `Quelle heure ?${lig(cpHorloge(1, 90))}`, r: ['12 h', '1 h', '2 h', '11 h'], ok: 1 },
    { l: 3, q: 'Pour une heure entière, la grande aiguille est sur…', r: ['le 6', 'le 12', 'le 1', 'l\'heure'], ok: 1 },
    { l: 3, q: 'Il est 3 h. Dans une heure, il sera…', r: ['2 h', '4 h', '13 h', '3 h'], ok: 1 },
  ],
});
})();
