/* CE1 · Planches : Les durées : heures et minutes (M5) ; le calendrier en « Pour aller plus loin » (Questionner le monde). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
// Le calendrier d'un mois (même dessin que dans le cours).
function calendrier(a, m, on, px){
  const c = 34, d0 = (new Date(a, m, 1).getDay() + 6) % 7, nj = new Date(a, m + 1, 0).getDate();
  let s = ce2T(7 * c / 2 + 3, 18, `${MOIS[m]} ${a}`, { t: 15, g: 700 });
  ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach((j, i) => { s += ce2T(3 + i * c + c / 2, 40, j, { t: 12, g: 700, c: i > 4 ? CE2C.rouge : CE2C.gris }); });
  for(let j = 1; j <= nj; j++){ const k = d0 + j - 1, x = 3 + (k % 7) * c, y = 48 + Math.floor(k / 7) * c, sel = (on || []).includes(j);
    s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${sel ? '#FDE3D2' : k % 7 > 4 ? '#F7F3EC' : '#fff'}" stroke="#C7D2DE"/>` + ce2T(x + c / 2, y + c / 2 + 5, j, { t: 13, g: sel ? 700 : 500, c: sel ? CPC.jeton : CPC.bord }); }
  return cpSvg(7 * c + 6, 48 + Math.ceil((d0 + nj) / 7) * c + 4, s, px || 230);
}
const avecCal = (on, q) => ({ eleve: lig(calendrier(2027, 2, [])) + q.eleve, corr: lig(calendrier(2027, 2, on)) + q.corr });
PLANCHES['ce1|Les durées : heures et minutes'] = [
  { titre: 'Heures et minutes', duree: '20 min',
    attendus: ['Connaître 1 h = 60 min, 1 demi-heure = 30 min, 1 quart d\'heure = 15 min', 'Choisir l\'unité adaptée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 heure = @ minutes', 60], ['1 demi-heure = @ minutes', 30], ['1 quart d\'heure = @ minutes', 15]], 2) },
      { etoiles: 1, col: 1, consigne: 'Entoure l\'unité qui convient.', ...P3.chx([['Je suis resté 2 … à la piscine.', 'heures', 'heures · minutes'], ['J\'ai mis 5 … pour faire cet exercice.', 'minutes', 'heures · minutes'], ['Nous sommes restés 4 … au musée.', 'heures', 'heures · minutes']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['2 quarts d\'heure = @ demi-heure', 1], ['4 quarts d\'heure = @ heure', 1], ['3 quarts d\'heure = @ minutes', 45], ['2 heures = @ minutes', 120]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la durée qui convient.', ...P3.chx([['Une nuit de sommeil :', '10 heures', '10 minutes · 10 heures'], ['Se brosser les dents :', '3 minutes', '3 minutes · 3 heures'], ['Une récréation :', '15 minutes', '15 minutes · 15 heures']]) },
    ] },
  { titre: 'Calculer et comparer des durées', duree: '25 min',
    attendus: ['Calculer la durée entre deux instants d\'une même journée', 'Ajouter et comparer des durées'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Combien de temps ?', ...P3.rmp([['de 8 h 30 à 8 h 45 : @', '15 min'], ['de 10 h à 10 h 30 : @', '30 min'], ['de midi à 20 h : @', '8 h']], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien de temps ?', ...P3.rmp([['de 15 h 45 à 16 h 15 : @', '30 min'], ['de 9 h 15 à 10 h : @', '45 min'], ['de 13 h 30 à 15 h : @', '1 h 30 min']], 4) },
      { etoiles: 2, col: 1, consigne: 'Entoure la durée la plus longue.', ...P3.chx([['', '130 minutes', '2 heures · 130 minutes'], ['', '1 heure', '50 minutes · 1 heure'], ['', '1 h 30 min', '1 h 30 min · 80 minutes']]) },
      { etoiles: 2, cahier: true, consigne: 'Mamie a passé un quart d\'heure à tailler ses rosiers et une demi-heure à bêcher son potager. Combien de temps est-elle restée dans le jardin ?', corr: cm1Redac('Temps au jardin', '15 min + 30 min = 45 min', 'Mamie est restée 45 minutes dans le jardin.') },
      { etoiles: 3, cahier: true, consigne: 'Le film commence à 14 h 30 et finit à 16 h 15. Combien de temps dure-t-il ?', corr: cm1Redac('Durée du film', { suite: ['De 14 h 30 à 15 h : 30 min', 'De 15 h à 16 h : 1 h', 'De 16 h à 16 h 15 : 15 min'] }, 'Le film dure 1 h 45 min.') },
    ] },
  { titre: 'Pour aller plus loin : les jours et les mois', duree: '20 min',
    attendus: ['Connaître l\'ordre des jours de la semaine et des mois de l\'année'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète la suite des jours.', ...P3.rmp([['lundi, mardi, @, jeudi', 'mercredi'], ['vendredi, @, dimanche', 'samedi'], ['dimanche, @, mardi', 'lundi']], 5) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Le mois après mars : @', 'avril'], ['Le mois avant janvier : @', 'décembre'], ['Le mois entre juillet et septembre : @', 'août'], ['Une année a @ mois.', 12]], 5) },
      { etoiles: 1, col: 1, consigne: 'Complète la suite des mois.', ...P3.rmp([['janvier, février, @, avril', 'mars'], ['juin, @, août', 'juillet'], ['octobre, novembre, @', 'décembre']], 5) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Une semaine a @ jours.', 7], ['Le premier jour de la semaine : @', 'lundi'], ['Le premier mois de l\'année : @', 'janvier']], 5) },
      { etoiles: 3, col: 1, consigne: 'Aujourd\'hui, c\'est jeudi. Quel jour sera-t-on… ?', ...P3.rmp([['demain : @', 'vendredi'], ['après-demain : @', 'samedi'], ['dans une semaine : @', 'jeudi']], 5) },
      { etoiles: 2, col: 1, consigne: 'Quel jour était-ce ? Aujourd\'hui, c\'est mardi.', ...P3.rmp([['hier : @', 'lundi'], ['avant-hier : @', 'dimanche']], 5) },
      { etoiles: 3, col: 1, consigne: 'Écris les mois qui ont 31 jours.', eleve: plLignes(2), corr: plListe(['janvier, mars, mai, juillet, août, octobre, décembre']) },
    ] },
  { titre: 'Pour aller plus loin : lire un calendrier', duree: '20 min',
    attendus: ['Trouver le jour d\'une date', 'Compter des jours sur un calendrier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Regarde le calendrier et complète.', ...avecCal([17, 25], P3.rmp([['Le 17 mars 2027 est un @.', 'mercredi'], ['Le 25 mars 2027 est un @.', 'jeudi'], ['Mars a @ jours.', 31]], 4)) },
      { etoiles: 2, col: 1, consigne: 'Regarde le calendrier et complète.', ...avecCal([3, 10, 17, 24, 31], P3.rmp([['En mars 2027, il y a @ mercredis.', 5], ['Le mercredi après le 10 mars, c\'est le @ mars.', 17]], 2)) },
      { etoiles: 2, col: 1, consigne: 'Regarde le calendrier de mars 2027. Complète.', ...avecCal([1, 8, 21], P3.rmp([['Le 1er mars est un @.', 'lundi'], ['Le lundi après le 1er mars : le @ mars', 8], ['Le 21 mars est un @.', 'dimanche']], 4)) },
      { etoiles: 3, col: 1, consigne: 'Regarde le calendrier de mars 2027. Combien de jours… ?', ...avecCal([10, 11, 12, 13, 14, 15, 16, 17], P3.rmp([['du 10 au 17 mars : @ jours', 7], ['de samedis en mars 2027 : @', 4]], 2)) },
    ] },
  { titre: 'Pour aller plus loin : jours et semaines', duree: '25 min',
    attendus: ['Connaître les relations entre jour, semaine, mois et année', 'Calculer une durée en jours'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 semaine = @ jours', 7], ['1 jour = @ heures', 24], ['1 heure = @ minutes', 60]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Léa part en colonie pour 2 semaines. Combien de jours dure la colonie ?', corr: cm1Redac('Durée de la colonie', '7 + 7 = 14', 'La colonie dure 14 jours.') },
      { etoiles: 3, cahier: true, consigne: 'Nous sommes le 25 mars. L\'anniversaire de Tom est le 2 avril. Dans combien de jours est-ce ? (Mars a 31 jours.)', corr: cm1Redac('Jours avant l\'anniversaire', { suite: ['31 − 25 = 6', '6 + 2 = 8'] }, 'L\'anniversaire de Tom est dans 8 jours.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 an = @ mois', 12], ['2 semaines = @ jours', 14], ['1 demi-heure = @ minutes', 30]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la durée qui convient.', ...P3.chx([['Une nuit de sommeil :', '10 heures', '10 minutes · 10 heures'], ['Se brosser les dents :', '3 minutes', '3 minutes · 3 heures'], ['Les grandes vacances :', '8 semaines', '8 jours · 8 semaines']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Du lundi au vendredi : @ jours d\'école', 5], ['Du samedi au dimanche : @ jours', 2]], 2) },
    ] },
];
})();
