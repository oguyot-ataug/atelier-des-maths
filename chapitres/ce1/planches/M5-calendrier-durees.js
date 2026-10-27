/* CE1 · Planches : Le calendrier et les durées (M5). */
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
PLANCHES['ce1|Le calendrier et les durées'] = [
  { titre: 'Les jours et les mois', duree: '20 min',
    attendus: ['Connaître l\'ordre des jours de la semaine et des mois de l\'année'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète la suite des jours.', ...P3.rmp([['lundi, mardi, @, jeudi', 'mercredi'], ['vendredi, @, dimanche', 'samedi'], ['dimanche, @, mardi', 'lundi']], 5) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Le mois après mars : @', 'avril'], ['Le mois avant janvier : @', 'décembre'], ['Le mois entre juillet et septembre : @', 'août'], ['Une année a @ mois.', 12]], 5) },
    ] },
  { titre: 'Lire un calendrier', duree: '20 min',
    attendus: ['Trouver le jour d\'une date', 'Compter des jours sur un calendrier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Regarde le calendrier et complète.', ...avecCal([17, 25], P3.rmp([['Le 17 mars 2027 est un @.', 'mercredi'], ['Le 25 mars 2027 est un @.', 'jeudi'], ['Mars a @ jours.', 31]], 4)) },
      { etoiles: 2, col: 1, consigne: 'Regarde le calendrier et complète.', ...avecCal([3, 10, 17, 24, 31], P3.rmp([['En mars 2027, il y a @ mercredis.', 5], ['Le mercredi après le 10 mars, c\'est le @ mars.', 17]], 2)) },
    ] },
  { titre: 'Les durées', duree: '25 min',
    attendus: ['Connaître les relations entre les unités de durée', 'Calculer une durée en jours'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 semaine = @ jours', 7], ['1 jour = @ heures', 24], ['1 heure = @ minutes', 60]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Léa part en colonie pour 2 semaines. Combien de jours dure la colonie ?', corr: cm1Redac('Durée de la colonie', '7 + 7 = 14', 'La colonie dure 14 jours.') },
      { etoiles: 3, cahier: true, consigne: 'Nous sommes le 25 mars. L\'anniversaire de Tom est le 2 avril. Dans combien de jours est-ce ? (Mars a 31 jours.)', corr: cm1Redac('Jours avant l\'anniversaire', { suite: ['31 − 25 = 6', '6 + 2 = 8'] }, 'L\'anniversaire de Tom est dans 8 jours.') },
    ] },
];
})();
