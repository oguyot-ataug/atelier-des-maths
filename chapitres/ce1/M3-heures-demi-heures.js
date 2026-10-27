/* ============================================================
   CHAPITRE : Lire l'heure : heures et demi-heures (CE1, M3, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, grandeurs et mesures : lire
   l'heure sur une horloge à aiguilles (heures entières et demi-heures : « 3 h 30 », « trois heures et
   demie »), le rôle des deux aiguilles, une heure = 60 minutes, une demi-heure = 30 minutes ; les
   heures de l'après-midi (14 h = 2 h de l'après-midi) ; calculer une durée simple en heures.
   Pensé pour être projeté : la grande aiguille qui fait un demi-tour, puis un tour.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Horloge à h heures et m minutes (m = 0 ou 30).
const horloge = (h, m, px) => cpSvg(160, 160, ce2Horloge(80, 80, 74, h * 60 + (m || 0)), px || 120);
const H = (h, m, leg) => `<span style="display:inline-block;text-align:center;">${horloge(h, m, 110)}<br><b>${leg}</b></span>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Lire l\'heure : heures et demi-heures', slug: 'heures-demi-heures',
  cours: `
${cm1Lecon(1, 'Les deux aiguilles')}
${cm1Def(`${lig(H(4, 0, '4 h'))}${cm1Liste(['La <b>petite aiguille</b> (rouge) montre les <b>heures</b>.', 'La <b>grande aiguille</b> montre les <b>minutes</b>. Quand elle est sur le 12, c\'est une heure « pile ».'])}`, 'L\'horloge')}
${ce2AnimHorloge('ce1-m3-horloge', { legende: 'La grande aiguille tourne : un demi-tour, c\'est une demi-heure ; un tour complet, c\'est une heure.', presets: [
  { nom: 'Une demi-heure', de: [3, 0], a: [3, 30], fin: 'Un demi-tour de la grande aiguille : <b>une demi-heure = 30 minutes</b>. Il est 3 h 30, trois heures et demie.' },
  { nom: 'Une heure', de: [3, 0], a: [4, 0], fin: 'Un tour complet de la grande aiguille : <b>1 heure = 60 minutes</b>. La petite aiguille est passée du 3 au 4.' },
  { nom: 'De 8 h 30 à 10 h', de: [8, 30], a: [10, 0] }] })}

${cm1Lecon(2, 'Les demi-heures')}
${cm1Def(`${lig(H(7, 30, '7 h 30'), H(11, 30, '11 h 30'))}${P('La grande aiguille est sur le <b>6</b> : c\'est la demie. La petite aiguille est <b>entre deux nombres</b> : 7 h 30 se lit « sept heures trente » ou « sept heures et demie ».')}`, 'Et demie')}
${cm1Astuce('À 7 h 30, la petite aiguille a déjà fait la moitié du chemin entre le 7 et le 8 : on lit le nombre qu\'elle a <b>dépassé</b>, le 7.')}

${cm1Lecon(3, 'Le matin et l\'après-midi')}
${cm1Regle(`La petite aiguille fait <b>2 tours</b> par jour. Une journée dure <b>24 heures</b>.${cm1Liste(['2 h de l\'après-midi, c\'est 14 h ;', '6 h du soir, c\'est 18 h ;', 'midi, c\'est 12 h ; minuit, c\'est 0 h (ou 24 h).'])}`, '24 heures')}
${cm1Rem('Pour passer de l\'heure du cadran à l\'heure de l\'après-midi, on ajoute 12 : 3 h de l\'après-midi, c\'est 3 + 12 = 15 h.')}

${cm1Lecon(4, 'Calculer une durée')}
${cm1Exemple('Exemple', [`Le film commence à 2 h et finit à 4 h 30. Combien de temps dure-t-il ?${cm1Redac('Durée du film', { suite: ['De 2 h à 4 h : 2 heures', 'De 4 h à 4 h 30 : 30 minutes'] }, 'Le film dure 2 heures et demie.')}`])}
`,
  methode: `
${cm1Demo('ce1-m3-m-lire', 'Lire 9 h 30', 'Quelle heure est-il ?')}
${cm1Demo('ce1-m3-m-duree', 'Calculer une durée', 'La récréation commence à 10 h et finit à 10 h 30. Combien de temps dure-t-elle ?')}
`,
  demos: [
    ['ce1-m3-m-lire', [
      { expr: 'La grande aiguille est sur le 6.', note: 'C\'est la demie : 30 minutes.', fig: horloge(9, 30) },
      { expr: 'La petite aiguille est entre le 9 et le 10.', note: 'Elle a dépassé le 9.' },
      { expr: 'Il est 9 h 30.', note: 'Neuf heures et demie.' },
    ]],
    ['ce1-m3-m-duree', [
      { expr: 'La grande aiguille fait un demi-tour.', note: 'Du 12 au 6.', fig: lig(horloge(10, 0, 90), horloge(10, 30, 90)) },
      { expr: 'Un demi-tour = une demi-heure', note: '30 minutes.' },
      { expr: 'La récréation dure 30 minutes.', note: 'Une demi-heure.' },
    ]],
  ],
  exos: cm1Exos('ce1-m3', [
    [`Quelle heure est-il ?${lig(horloge(5, 0))}`,
      cm1Redac('L\'heure', '', 'Il est 5 h.')],
    [`Quelle heure est-il ?${lig(horloge(2, 30))}`,
      cm1Redac('L\'heure', '', 'La grande aiguille est sur le 6 et la petite entre le 2 et le 3 : il est 2 h 30.')],
    ['Dessine les aiguilles pour 8 h 30.',
      cm1Redac('8 h 30', '', 'La grande aiguille sur le 6, la petite entre le 8 et le 9.', horloge(8, 30, 100))],
    ['Combien de minutes dans une demi-heure ? Dans une heure ?',
      cm1Redac('Les minutes', { suite: ['1 demi-heure = 30 minutes', '1 heure = 60 minutes'] }, 'Une demi-heure dure 30 minutes, une heure dure 60 minutes.')],
    ['Il est 4 h de l\'après-midi. Comment l\'écrit-on avec les heures de 0 à 24 ?',
      cm1Redac('4 h de l\'après-midi', '4 + 12 = 16', '4 h de l\'après-midi, c\'est 16 h.')],
    ['L\'école commence à 8 h 30 et la récréation à 10 h. Combien de temps entre les deux ?',
      cm1Redac('Avant la récréation', { suite: ['De 8 h 30 à 9 h : 30 minutes', 'De 9 h à 10 h : 1 heure'] }, 'Il s\'écoule 1 heure et demie.')],
    ['Le gâteau doit cuire 1 heure. On l\'enfourne à 3 h 30. À quelle heure faut-il le sortir ?',
      cm1Redac('Sortie du gâteau', '3 h 30 + 1 h = 4 h 30', 'Il faut le sortir à 4 h 30.', horloge(4, 30, 90))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi 60 minutes ?', [
    'Il y a plus de 4 000 ans, les <b>Babyloniens</b> comptaient par paquets de <b>60</b> (et pas par paquets de 10 comme nous). C\'est d\'eux que nous viennent les 60 minutes d\'une heure et les 60 secondes d\'une minute !',
    'Les 24 heures de la journée viennent des Égyptiens, qui partageaient le jour en 12 heures et la nuit en 12 heures.',
  ]),
  quiz: [
    { q: `Quelle heure ?${lig(horloge(6, 30, 100))}`, opts: ['6 h 30', '6 h', '12 h 30'], correct: 0 },
    { q: 'Une demi-heure, c\'est…', opts: ['30 minutes', '50 minutes', '60 minutes'], correct: 0 },
    { q: '3 h de l\'après-midi, c\'est…', opts: ['15 h', '13 h', '3 h'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'La petite aiguille montre…', r: ['les heures', 'les minutes', 'les jours', 'les secondes'], ok: 0 },
    { l: 2, q: `Quelle heure ?${lig(horloge(10, 30, 90))}`, r: ['10 h 30', '6 h 50', '10 h', '11 h 30'], ok: 0 },
    { l: 2, q: `Quelle heure ?${lig(horloge(1, 0, 90))}`, r: ['1 h', '12 h', '12 h 05', '1 h 30'], ok: 0 },
    { l: 3, q: '20 h, c\'est…', r: ['8 h du soir', '2 h du matin', '10 h du soir', 'midi'], ok: 0 },
    { l: 4, q: 'De 2 h à 3 h 30 : …', r: ['1 h 30', '1 h', '2 h', '30 min'], ok: 0 },
  ],
});
})();
