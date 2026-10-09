/* =====================================================================
   conjugaison.js -- Conjugaison française (L'Atelier du Prof, professeurs de français et des écoles).

   Demandé : « Conjugaison ? Grammaire sous forme de jeux / exerciseurs », puis « go pour la conjugaison ».
   Comme les verbes irréguliers anglais (listes.js) : dans l'éditeur d'une interrogation, le professeur coche
   les verbes et les temps vus en classe, choisit les formes de questions, et les questions s'ajoutent à
   l'interrogation (devoir, entraînement, séance en direct, cartes A/B/C/D pour les QCM, correction, notes).

   Moteur : 1er groupe par règles (ç / ge, è, consonne doublée, y → i), 2e groupe par règles, 3e groupe et
   auxiliaires par tables (avec les verbes formés sur un modèle : devenir sur venir, construire sur
   conduire…). Temps simples et composés (accord du participe avec être). Variantes acceptées : orthographe
   rectifiée de 1990 (il connait, je préfèrerai), paie / paye, accord au féminin avec être.
   Contrôlé contre le Lefff (lexique des formes fléchies du français, build 1038) : accord complet sur tous les
   verbes de la liste, et sur 7 396 des 7 420 verbes en -er / 2e groupe du lexique (écarts : verbes rares dont
   l'orthographe varie selon les dictionnaires, ou erreurs du lexique).
   ===================================================================== */

const CJ_PERS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const CJ_TEMPS = [
  { id: 'P', nom: 'présent', mode: 'indicatif' },
  { id: 'I', nom: 'imparfait', mode: 'indicatif' },
  { id: 'F', nom: 'futur simple', mode: 'indicatif' },
  { id: 'J', nom: 'passé simple', mode: 'indicatif' },
  { id: 'PC', nom: 'passé composé', mode: 'indicatif', aux: 'P' },
  { id: 'PQ', nom: 'plus-que-parfait', mode: 'indicatif', aux: 'I' },
  { id: 'FA', nom: 'futur antérieur', mode: 'indicatif', aux: 'F' },
  { id: 'PA', nom: 'passé antérieur', mode: 'indicatif', aux: 'J' },
  { id: 'C', nom: 'conditionnel présent', mode: 'conditionnel' },
  { id: 'CP', nom: 'conditionnel passé', mode: 'conditionnel', aux: 'C' },
  { id: 'S', nom: 'subjonctif présent', mode: 'subjonctif' },
  { id: 'SP', nom: 'subjonctif passé', mode: 'subjonctif', aux: 'S' },
  { id: 'Y', nom: 'impératif présent', mode: 'impératif' },
];
const cjTemps = id => CJ_TEMPS.find(t => t.id === id);

/* ---------- Catalogue ---------- */
// 1er et 2e groupes : par règles. Auxiliaire être : liste ci-dessous.
const CJ_1 = ('aimer chanter parler jouer marcher regarder écouter travailler danser donner trouver penser demander porter '
  + 'laisser habiter fermer sauter tourner couper pleurer rêver dessiner colorier crier oublier étudier copier plier '
  + 'remercier créer continuer arriver entrer rester tomber monter rentrer retourner manger nager ranger partager voyager '
  + 'bouger changer plonger commencer avancer lancer placer prononcer effacer appeler rappeler jeter acheter lever enlever '
  + 'mener amener emmener promener peser geler préférer espérer répéter compléter posséder céder protéger régler payer '
  + 'essayer nettoyer employer envoyer essuyer ennuyer appuyer').split(' ');
const CJ_2 = ('finir choisir réussir grandir obéir réfléchir remplir rougir punir applaudir agir bâtir nourrir guérir saisir '
  + 'atterrir ralentir vieillir maigrir grossir avertir bondir salir unir définir envahir établir').split(' ');
const CJ_ETRE = new Set(['arriver', 'entrer', 'rester', 'tomber', 'monter', 'rentrer', 'retourner']);
// -eler / -eter qui doublent la consonne (appelle, jette) ; les autres prennent un accent grave (gèle, achète).
const CJ_DOUBLE = new Set(['appeler', 'rappeler', 'jeter', 'rejeter', 'projeter', 'interjeter']);
// -eler / -eter qui prennent un accent grave (achète, gèle). Les autres doublent traditionnellement la consonne
// (épelle, feuillette), l'accent grave étant admis par l'orthographe de 1990 (épèle) : les deux sont acceptés.
const CJ_EGRAVE_ELER = new Set(['acheter', 'racheter', 'geler', 'dégeler', 'congeler', 'décongeler', 'surgeler', 'peler', 'modeler',
  'remodeler', 'marteler', 'harceler', 'ciseler', 'démanteler', 'écarteler', 'crocheter', 'fureter', 'haleter', 'celer', 'déceler',
  'receler', 'corseter', 'encasteler', 'bégueter', 'becqueter', 'craqueter', 'décliqueter', 'recarreler']);
const CJ_H_ASPIRE = new Set(['hacher', 'hanter', 'harceler', 'hausser', 'heurter', 'hisser', 'hurler', 'huer', 'hocher', 'hâter',
  'hasarder', 'harponner', 'houspiller', 'hérisser', 'hiérarchiser', 'heurter', 'hacher', 'haleter', 'hennir', 'honnir', 'hair']);

const cjPS = (t, s) => ({
  i: ['is', 'is', 'it', 'îmes', 'îtes', 'irent'], u: ['us', 'us', 'ut', 'ûmes', 'ûtes', 'urent'],
  in: ['ins', 'ins', 'int', 'înmes', 'întes', 'inrent'],
}[t]).map(e => s + e).join(' ');
const cjIr3 = (sg, pl, pp, aux) => ({ P: `${sg}s ${sg}s ${sg}t ${pl}ons ${pl}ez ${pl}ent`, J: cjPS('i', pl), F: pl + 'ir', pp, aux });
const cjDre = s => ({ P: `${s}s ${s}s ${s} ${s}ons ${s}ez ${s}ent`, J: cjPS('i', s), F: s + 'r', pp: s + 'u' });
const cjNdre = (s, pp) => ({ P: `${s}ns ${s}ns ${s}nt ${s}gnons ${s}gnez ${s}gnent`, J: cjPS('i', s + 'gn'), F: s + 'ndr', pp });

// 3e groupe et auxiliaires. P : présent (« | » = variantes) ; J : passé simple ; F : radical du futur ;
// I : radical de l'imparfait (sinon celui de « nous » au présent) ; S : subjonctif (sinon radical de « ils »
// au présent + celui de l'imparfait pour nous / vous) ; Y : impératif (sinon le présent, « es » → « e ») ;
// m / a / b : verbe formé sur le modèle m, en remplaçant le début a par b.
const CJ_3 = {
  'être': { P: 'suis es est sommes êtes sont', I: 'ét', J: cjPS('u', 'f'), F: 'ser', S: 'sois sois soit soyons soyez soient', Y: 'sois soyons soyez', pp: 'été' },
  'avoir': { P: 'ai as a avons avez ont', J: cjPS('u', 'e'), F: 'aur', S: 'aie aies ait ayons ayez aient', Y: 'aie ayons ayez', pp: 'eu' },
  'aller': { P: 'vais vas va allons allez vont', J: 'allai allas alla allâmes allâtes allèrent', F: 'ir', S: 'aille ailles aille allions alliez aillent', Y: 'va allons allez', pp: 'allé', aux: 'être' },
  'faire': { P: 'fais fais fait faisons faites font', J: cjPS('i', 'f'), F: 'fer', S: 'fasse fasses fasse fassions fassiez fassent', pp: 'fait' },
  'dire': { P: 'dis dis dit disons dites disent', J: cjPS('i', 'd'), F: 'dir', pp: 'dit' },
  'interdire': { P: 'interdis interdis interdit interdisons interdisez interdisent', J: cjPS('i', 'interd'), F: 'interdir', pp: 'interdit' },
  'pouvoir': { P: 'peux|puis peux peut pouvons pouvez peuvent', J: cjPS('u', 'p'), F: 'pourr', S: 'puisse puisses puisse puissions puissiez puissent', Y: '', pp: 'pu' },
  'vouloir': { P: 'veux veux veut voulons voulez veulent', J: cjPS('u', 'voul'), F: 'voudr', S: 'veuille veuilles veuille voulions vouliez veuillent', Y: 'veuille|veux veuillons|voulons veuillez|voulez', pp: 'voulu' },
  'savoir': { P: 'sais sais sait savons savez savent', J: cjPS('u', 's'), F: 'saur', S: 'sache saches sache sachions sachiez sachent', Y: 'sache sachons sachez', pp: 'su' },
  'voir': { P: 'vois vois voit voyons voyez voient', J: cjPS('i', 'v'), F: 'verr', pp: 'vu' },
  'devoir': { P: 'dois dois doit devons devez doivent', J: cjPS('u', 'd'), F: 'devr', pp: 'dû' },
  'recevoir': { P: 'reçois reçois reçoit recevons recevez reçoivent', J: cjPS('u', 'reç'), F: 'recevr', pp: 'reçu' },
  'apercevoir': { m: 'recevoir', a: 're', b: 'aper' },
  'venir': { P: 'viens viens vient venons venez viennent', J: cjPS('in', 'v'), F: 'viendr', pp: 'venu', aux: 'être' },
  'devenir': { m: 'venir', a: '', b: 'de' },
  'revenir': { m: 'venir', a: '', b: 're' },
  'tenir': { P: 'tiens tiens tient tenons tenez tiennent', J: cjPS('in', 't'), F: 'tiendr', pp: 'tenu' },
  'obtenir': { m: 'tenir', a: '', b: 'ob' },
  'prendre': { P: 'prends prends prend prenons prenez prennent', J: cjPS('i', 'pr'), F: 'prendr', pp: 'pris' },
  'apprendre': { m: 'prendre', a: '', b: 'ap' },
  'comprendre': { m: 'prendre', a: '', b: 'com' },
  'mettre': { P: 'mets mets met mettons mettez mettent', J: cjPS('i', 'm'), F: 'mettr', pp: 'mis' },
  'permettre': { m: 'mettre', a: '', b: 'per' },
  'promettre': { m: 'mettre', a: '', b: 'pro' },
  'partir': cjIr3('par', 'part', 'parti', 'être'),
  'sortir': cjIr3('sor', 'sort', 'sorti', 'être'),
  'dormir': cjIr3('dor', 'dorm', 'dormi'),
  'sentir': cjIr3('sen', 'sent', 'senti'),
  'mentir': cjIr3('men', 'ment', 'menti'),
  'servir': cjIr3('ser', 'serv', 'servi'),
  'courir': { P: 'cours cours court courons courez courent', J: cjPS('u', 'cour'), F: 'courr', pp: 'couru' },
  'mourir': { P: 'meurs meurs meurt mourons mourez meurent', J: cjPS('u', 'mour'), F: 'mourr', pp: 'mort', aux: 'être' },
  'ouvrir': { P: 'ouvre ouvres ouvre ouvrons ouvrez ouvrent', J: cjPS('i', 'ouvr'), F: 'ouvrir', pp: 'ouvert' },
  'couvrir': { m: 'ouvrir', a: '', b: 'c' },
  'découvrir': { m: 'ouvrir', a: '', b: 'déc' },
  'offrir': { m: 'ouvrir', a: 'ouv', b: 'off' },
  'souffrir': { m: 'ouvrir', a: 'ouv', b: 'souff' },
  'cueillir': { P: 'cueille cueilles cueille cueillons cueillez cueillent', J: cjPS('i', 'cueill'), F: 'cueiller', pp: 'cueilli' },
  'accueillir': { m: 'cueillir', a: '', b: 'ac' },
  'croire': { P: 'crois crois croit croyons croyez croient', J: cjPS('u', 'cr'), F: 'croir', pp: 'cru' },
  'boire': { P: 'bois bois boit buvons buvez boivent', J: cjPS('u', 'b'), F: 'boir', pp: 'bu' },
  'lire': { P: 'lis lis lit lisons lisez lisent', J: cjPS('u', 'l'), F: 'lir', pp: 'lu' },
  'écrire': { P: 'écris écris écrit écrivons écrivez écrivent', J: cjPS('i', 'écriv'), F: 'écrir', pp: 'écrit' },
  'décrire': { m: 'écrire', a: 'é', b: 'dé' },
  'vivre': { P: 'vis vis vit vivons vivez vivent', J: cjPS('u', 'véc'), F: 'vivr', pp: 'vécu' },
  'suivre': { P: 'suis suis suit suivons suivez suivent', J: cjPS('i', 'suiv'), F: 'suivr', pp: 'suivi' },
  'connaître': { P: 'connais connais connaît connaissons connaissez connaissent', J: cjPS('u', 'conn'), F: 'connaîtr', pp: 'connu' },
  'reconnaître': { m: 'connaître', a: '', b: 're' },
  'paraître': { m: 'connaître', a: 'conn', b: 'par' },
  'apparaître': { m: 'connaître', a: 'conn', b: 'appar', aux: 'être' },
  'disparaître': { m: 'connaître', a: 'conn', b: 'dispar' },
  'naître': { P: 'nais nais naît naissons naissez naissent', J: cjPS('i', 'naqu'), F: 'naîtr', pp: 'né', aux: 'être' },
  'plaire': { P: 'plais plais plaît plaisons plaisez plaisent', J: cjPS('u', 'pl'), F: 'plair', pp: 'plu' },
  'rire': { P: 'ris ris rit rions riez rient', J: cjPS('i', 'r'), F: 'rir', pp: 'ri' },
  'sourire': { m: 'rire', a: '', b: 'sou' },
  'conduire': { P: 'conduis conduis conduit conduisons conduisez conduisent', J: cjPS('i', 'conduis'), F: 'conduir', pp: 'conduit' },
  'construire': { m: 'conduire', a: 'cond', b: 'constr' },
  'détruire': { m: 'conduire', a: 'cond', b: 'détr' },
  'produire': { m: 'conduire', a: 'cond', b: 'prod' },
  'traduire': { m: 'conduire', a: 'cond', b: 'trad' },
  'attendre': cjDre('attend'), 'entendre': cjDre('entend'), 'rendre': cjDre('rend'), 'répondre': cjDre('répond'),
  'vendre': cjDre('vend'), 'perdre': cjDre('perd'), 'descendre': Object.assign(cjDre('descend'), { aux: 'être' }),
  'défendre': cjDre('défend'), 'mordre': cjDre('mord'), 'tendre': cjDre('tend'), 'fondre': cjDre('fond'),
  'battre': { P: 'bats bats bat battons battez battent', J: cjPS('i', 'batt'), F: 'battr', pp: 'battu' },
  'combattre': { m: 'battre', a: '', b: 'com' },
  'rompre': { P: 'romps romps rompt rompons rompez rompent', J: cjPS('i', 'romp'), F: 'rompr', pp: 'rompu' },
  'peindre': cjNdre('pei', 'peint'),
  'éteindre': cjNdre('étei', 'éteint'),
  'craindre': cjNdre('crai', 'craint'),
  'plaindre': cjNdre('plai', 'plaint'),
  'joindre': cjNdre('joi', 'joint'),
  'valoir': { P: 'vaux vaux vaut valons valez valent', J: cjPS('u', 'val'), F: 'vaudr', S: 'vaille vailles vaille valions valiez vaillent', pp: 'valu' },
  'falloir': { imp: 1, P: '- - faut - - -', I: 'fall', J: '- - fallut - - -', F: 'faudr', S: '- - faille - - -', Y: '', pp: 'fallu' },
  'pleuvoir': { imp: 1, P: '- - pleut - - -', I: 'pleuv', J: '- - plut - - -', F: 'pleuvr', S: '- - pleuve - - -', Y: '', pp: 'plu' },
};
// Ordre d'affichage du 3e groupe : auxiliaires d'abord.
const CJ_3_LISTE = Object.keys(CJ_3).filter(v => v !== 'être' && v !== 'avoir');

function cjGroupe(inf){
  if(inf === 'être' || inf === 'avoir') return 0;
  if(CJ_3[inf]) return 3;
  if(CJ_2.includes(inf)) return 2;
  if(/er$/.test(inf)) return 1;
  return /ir$/.test(inf) ? 2 : 3;
}

/* ---------- Moteur ---------- */
const CJ_VOY = 'aeiouyàâäéèêëîïôöûüù';
// Modification du radical du 1er groupe devant un e muet : 'egrave' (lève), 'eaigu' (préfère), 'double' (appelle),
// 'double90' (épelle / épèle), 'oy' (nettoie), 'ay' (paie / paye), ou ''.
function cj1Type(inf){
  const r = inf.slice(0, -2);
  if(CJ_DOUBLE.has(inf)) return { t: 'double' };
  if(/[ou]y$/.test(r)) return { t: 'oy' };
  if(/ay$/.test(r)) return { t: 'ay' };
  const s = r.replace(/([gq])u/g, '$1_');   // le u de gu / qu n'est pas une voyelle (lègue, banquette)
  const m = s.match(new RegExp(`([${CJ_VOY}]+)([^${CJ_VOY}]+)$`));
  if(!m || !/^([bcdfgjklmnpqrstvz]|[bcdfgptv][rl]|gn|ch|ph|th|g_|q_)$/.test(m[2])) return { t: '' };
  const pos = s.length - m[2].length - 1, v = m[1];
  if(v.slice(-1) === 'é') return { t: 'eaigu', pos };
  if(v === 'e') return /^[lt]$/.test(m[2]) && !CJ_EGRAVE_ELER.has(inf) ? { t: 'double90', pos } : { t: 'egrave', pos };
  return { t: '' };
}
// Radical(aux) du 1er groupe devant une terminaison ; muet = la terminaison commence par un e muet.
function cj1Rad(inf, ty, muet, futur){
  const r = inf.slice(0, -2), acc = (s, p) => s.slice(0, p) + 'è' + s.slice(p + 1);
  if(!muet) return [r];
  switch(ty.t){
    case 'egrave': return [acc(r, ty.pos)];
    case 'eaigu': return futur ? [r, acc(r, ty.pos)] : [acc(r, ty.pos)];
    case 'double': return [r + r.slice(-1)];
    case 'double90': return [r + r.slice(-1), acc(r, ty.pos)];
    case 'oy': return [r.slice(0, -1) + 'i'];
    case 'ay': return [r.slice(0, -1) + 'i', r];
  }
  return [r];
}
// c → ç et g → ge devant a, o.
const cjOrtho = (rad, term) => /^[aoâ]/.test(term) ? rad.replace(/c$/, 'ç').replace(/g$/, 'ge') : rad;
const cj1 = (inf, term, muet, futur) => { const ty = cj1Type(inf); return cj1Rad(inf, ty, muet, futur).map(r => cjOrtho(r, term) + term); };

const cjCache = {};
// Toutes les formes simples d'un verbe : { P, I, F, C, J, S, Y : 6 cases (tableau de variantes, ou null), pp, aux }.
function cjConj(inf){
  if(cjCache[inf]) return cjCache[inf];
  const six = f => [0, 1, 2, 3, 4, 5].map(f);
  const T = { pp: null, aux: CJ_ETRE.has(inf) ? 'être' : 'avoir' };
  const g = cjGroupe(inf);
  const decoupe = s => s.split(' ').map(x => x === '-' ? null : x.split('|'));
  if(g === 1){
    const P = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
    T.P = six(i => cj1(inf, P[i], [0, 1, 2, 5].includes(i)));
    T.I = six(i => cj1(inf, ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][i]));
    T.J = six(i => cj1(inf, ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'][i]));
    const fut = (inf === 'envoyer' || inf === 'renvoyer') ? [inf.slice(0, -5) + 'verr'] : cj1(inf, 'er', true, true);
    T.F = six(i => fut.map(r => r + ['ai', 'as', 'a', 'ons', 'ez', 'ont'][i]));
    T.C = six(i => fut.map(r => r + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][i]));
    T.S = six(i => cj1(inf, ['e', 'es', 'e', 'ions', 'iez', 'ent'][i], [0, 1, 2, 5].includes(i)));
    T.pp = [inf.slice(0, -2) + 'é'];
  }else if(g === 2){
    const r = inf.slice(0, -2);
    T.P = six(i => [r + ['is', 'is', 'it', 'issons', 'issez', 'issent'][i]]);
    T.I = six(i => [r + 'iss' + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][i]]);
    T.J = six(i => [r + ['is', 'is', 'it', 'îmes', 'îtes', 'irent'][i]]);
    T.F = six(i => [r + 'ir' + ['ai', 'as', 'a', 'ons', 'ez', 'ont'][i]]);
    T.C = six(i => [r + 'ir' + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][i]]);
    T.S = six(i => [r + 'iss' + ['e', 'es', 'e', 'ions', 'iez', 'ent'][i]]);
    T.pp = [r + 'i'];
  }else{
    let d = CJ_3[inf], rep = s => s;
    if(d.m){ const a = d.a, b = d.b; rep = s => s.replace(new RegExp('^' + a), b); d = Object.assign({}, CJ_3[d.m], { aux: d.aux || CJ_3[d.m].aux }); }
    const R = s => s == null ? null : s.map(rep);
    T.aux = d.aux || 'avoir';
    T.P = decoupe(d.P).map(R);
    const I = d.I ? rep(d.I) : T.P[3][0].slice(0, -3);
    T.I = six(i => d.imp && i !== 2 ? null : [I + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][i]]);
    T.J = decoupe(d.J).map(R);
    const F = rep(d.F);
    T.F = six(i => d.imp && i !== 2 ? null : [F + ['ai', 'as', 'a', 'ons', 'ez', 'ont'][i]]);
    T.C = six(i => d.imp && i !== 2 ? null : [F + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][i]]);
    if(d.S) T.S = decoupe(d.S).map(R);
    else { const rs = T.P[5][0].slice(0, -3); T.S = six(i => [i === 3 || i === 4 ? I + ['ions', 'iez'][i - 3] : rs + ['e', 'es', 'e', '', '', 'ent'][i]]); }
    if(d.Y !== undefined){ const y = d.Y.split(' ').map(x => x.split('|').map(rep)); T.Y = d.Y ? [null, y[0], null, y[1], y[2], null] : null; }
    T.pp = [rep(d.pp)];
    if(d.imp) T.imp = 1;
  }
  // Impératif : le présent, « es » → « e » (chante, ouvre), sauf tables propres.
  if(T.Y === undefined) T.Y = [null, T.P[1].map(f => f.replace(/es$/, 'e')), null, T.P[3], T.P[4], null];
  // Orthographe rectifiée de 1990 : connait, nait, plait (accent circonflexe facultatif sur i devant t).
  ['P', 'F', 'C'].forEach(k => T[k] = T[k].map(c => c && [...new Set([...c, ...c.filter(f => /[aou]ît/.test(f)).map(f => f.replace(/([aou])ît/g, '$1it'))])]));
  return cjCache[inf] = T;
}

/* ---------- Formes conjuguées, temps composés, affichage ---------- */
// Réponses acceptées (la première est la forme affichée au corrigé) pour un verbe, un temps, une personne.
function cjForme(inf, tid, p){
  const T = cjConj(inf), t = cjTemps(tid);
  if(T.imp && p !== 2) return null;
  if(!t.aux) return (T[tid] && T[tid][p]) ? T[tid][p] : null;
  const aux = cjConj(T.aux)[t.aux][p];
  const pl = s => /[sx]$/.test(s) ? s : s + 's';
  let pp = T.pp;
  if(T.aux === 'être'){
    // Accord avec le sujet (masculin d'abord) ; vous de politesse : singulier ou pluriel.
    const accords = [['ms', 'fs'], ['ms', 'fs'], ['ms'], ['mp', 'fp'], ['mp', 'fp', 'ms', 'fs'], ['mp']][p];
    pp = T.pp.flatMap(f => accords.map(a => ({ ms: f, fs: f + 'e', mp: pl(f), fp: f + 'es' }[a])));
  }
  return aux.flatMap(a => pp.map(f => a + ' ' + f));
}
const cjVoyelle = (inf, f) => /^[aeiouyàâäéèêëîïôöûüh]/i.test(f) && !(f[0] === 'h' && CJ_H_ASPIRE.has(inf));
// Ce qui précède la forme : pronom (j' devant une voyelle), « que » au subjonctif, rien à l'impératif.
function cjPronom(inf, tid, p, f){
  const t = cjTemps(tid);
  if(t.mode === 'impératif') return '';
  const pr = cjVoyelle(inf, f) && p === 0 ? "j'" : CJ_PERS[p] + ' ';
  if(t.mode !== 'subjonctif') return pr;
  return (p === 2 || p === 5) ? "qu'" + pr : 'que ' + pr;
}
function cjAffiche(inf, tid, p){
  const f = cjForme(inf, tid, p); if(!f) return null;
  return cjTemps(tid).mode === 'impératif' ? f[0].charAt(0).toUpperCase() + f[0].slice(1) + ' !' : cjPronom(inf, tid, p, f[0]) + f[0];
}
const cjNomComplet = t => t.mode === 'indicatif' ? `${t.nom} de l'indicatif` : t.nom;
const cjAu = t => (t.mode === 'impératif' ? "à l'" : 'au ') + cjNomComplet(t);
const cjPersonnes = (inf, tid) => [0, 1, 2, 3, 4, 5].filter(p => cjForme(inf, tid, p));

/* ---------- Questions (format de l'éditeur d'interrogations) ---------- */
const cjMel = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const cjHasard = a => a[Math.floor(Math.random() * a.length)];
const cjTrou = f => '[[' + f.join('|') + ']]';
const cjNorm = s => String(s).toLowerCase().normalize('NFC');
// Une ligne « pronom [[forme]] » (impératif : « [[forme]] (tu) »).
function cjLigne(inf, tid, p){
  const f = cjForme(inf, tid, p);
  return cjTemps(tid).mode === 'impératif' ? `${cjTrou(f)} (${CJ_PERS[p]})` : cjPronom(inf, tid, p, f[0]) + cjTrou(f);
}
// Le temps est-il reconnaissable sans ambiguïté pour cette personne ? (« je finis » : présent ou passé simple.)
function cjSansAmbiguite(inf, tid, p){
  const s = cjNorm(cjAffiche(inf, tid, p));
  return CJ_TEMPS.every(t => t.id === tid || cjNorm(cjAffiche(inf, t.id, p) || '') !== s);
}
function cjQuestions(inf, tid, formes, tempsChoisis){
  const t = cjTemps(tid), pers = cjPersonnes(inf, tid), qs = [];
  if(!pers.length) return qs;
  const verbe = `**${inf}**`;
  const nouv = type => { const q = qzEdNouvelle(type); q.points = 1; return q; };
  if(formes.tableau){
    const q = nouv('trous');
    q.enonce = `Conjugue le verbe ${verbe} ${cjAu(t)}.`;
    q.trous_source = pers.map(p => cjLigne(inf, tid, p)).join('\n');
    q.casse = 'accents'; q.points = pers.length >= 3 ? 2 : 1; qs.push(q);
  }
  if(formes.personne){
    const p = cjHasard(pers), q = nouv('trous');
    q.enonce = `Conjugue le verbe ${verbe} ${cjAu(t)}.`;
    q.trous_source = cjLigne(inf, tid, p); q.casse = 'accents'; qs.push(q);
  }
  if(formes.qcm){
    const p = cjHasard(pers), justes = cjForme(inf, tid, p), ok = new Set(justes.map(cjNorm));
    // Pièges : le temps qui se confond le plus (futur / conditionnel, présent / passé simple…), puis les autres
    // personnes du même temps, puis les autres temps de même nature (simples ou composés).
    const voisin = { F: 'C', C: 'F', P: 'J', J: 'P', I: 'C', S: 'P', PC: 'PQ', PQ: 'PC', FA: 'CP', CP: 'FA', PA: 'PQ', SP: 'PC', Y: 'P' }[tid];
    const de = (tt, pp) => { const f = cjForme(inf, tt, pp); return f ? f[0] : null; };
    const cands = [de(voisin, p), ...cjMel(pers.filter(x => x !== p)).map(x => de(tid, x)),
      ...cjMel(CJ_TEMPS.filter(x => x.id !== tid && !!x.aux === !!t.aux && x.mode !== 'impératif').map(x => de(x.id, p)))];
    const faux = [];
    cands.forEach(f => { if(f && !ok.has(cjNorm(f)) && !faux.some(x => cjNorm(x) === cjNorm(f)) && faux.length < 3) faux.push(f); });
    if(faux.length >= 2){
      const q = nouv('qcm');
      const avant = t.mode === 'impératif' ? `(${CJ_PERS[p]})` : cjPronom(inf, tid, p, justes[0]).trim();
      q.enonce = `Choisis la bonne forme du verbe ${verbe} ${cjAu(t)} : ${avant} …`;
      q.choix = cjMel([{ id: qzId(), texte: justes[0], correct: true }, ...faux.map(f => ({ id: qzId(), texte: f, correct: false }))]);
      q.multiple = false; qs.push(q);
    }
  }
  if(formes.temps){
    const p = cjMel(pers).find(x => cjSansAmbiguite(inf, tid, x));
    if(p !== undefined){
      // Pièges : les temps de même nature (simples ou composés) vus en classe, puis les autres de même nature.
      const nature = x => x.id !== tid && !!x.aux === !!t.aux;
      const pris = [...cjMel(CJ_TEMPS.filter(x => nature(x) && tempsChoisis.includes(x.id))), ...cjMel(CJ_TEMPS.filter(nature)),
        ...cjMel(CJ_TEMPS.filter(x => x.id !== tid))].filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
      const q = nouv('qcm');
      q.enonce = `À quel temps le verbe ${verbe} est-il conjugué ? « ${cjAffiche(inf, tid, p)} »`;
      q.choix = cjMel([{ id: qzId(), texte: cjNomComplet(t), correct: true }, ...pris.map(x => ({ id: qzId(), texte: cjNomComplet(x), correct: false }))]);
      q.multiple = false; qs.push(q);
    }
  }
  return qs;
}

/* ---------- Fenêtre « Conjugaison », ouverte depuis l'éditeur d'interrogation ---------- */
const CJ_FORMES = [
  ['tableau', 'Conjuguer à toutes les personnes'],
  ['personne', 'Conjuguer à une personne (au hasard)'],
  ['qcm', 'QCM : choisir la bonne forme'],
  ['temps', 'QCM : reconnaître le temps'],
];
const cjEsc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function cjMemo(){ const m = typeof currentUser !== 'undefined' && currentUser && currentUser.user_metadata; return (m && m.conjugaison) || {}; }
async function cjMemoriser(st){
  try{
    const { data } = await sb.auth.updateUser({ data: { conjugaison: { v: [...st.sel], t: [...st.temps], perso: st.perso } } });
    if(data && data.user) currentUser = data.user;
  }catch(e){ /* la sélection reste valable pour cette génération */ }
}
function cjOuvrir(){
  const memo = cjMemo();
  const st = { sel: new Set(memo.v || []), temps: new Set(memo.t || ['P']), perso: (memo.perso || []).filter(v => /(er|ir)$/.test(v)),
    filtre: '', formes: { tableau: true, personne: false, qcm: false, temps: false }, nb: 0, msg: '' };
  let o = document.getElementById('cjOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'cjOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o);
    o.addEventListener('click', ev => { if(ev.target === o) o.style.display = 'none'; }); }
  const tri = l => l.slice().sort((a, b) => a.localeCompare(b, 'fr'));
  const groupes = () => [
    ['aux', 'Auxiliaires', ['être', 'avoir']],
    ['g1', '1er groupe', tri(CJ_1)],
    ['g2', '2e groupe', tri(CJ_2)],
    ['g3', '3e groupe', tri(CJ_3_LISTE)],
    ['perso', 'Mes verbes ajoutés', st.perso],
  ];
  const combien = () => {
    let n = 0;
    st.sel.forEach(v => st.temps.forEach(t => { if(cjPersonnes(v, t).length) n += CJ_FORMES.filter(f => st.formes[f[0]]).length; }));
    return n;
  };
  const rendre = () => {
    const f = st.filtre.trim().toLowerCase(), n = combien();
    const blocs = groupes().map(([id, titre, liste]) => {
      const vis = liste.filter(v => !f || v.includes(f));
      if(!vis.length) return '';
      const tous = liste.length && liste.every(v => st.sel.has(v));
      return `<div class="cj-g"><div class="cj-gt"><b>${titre}</b> <button class="btn secondary td-mini" data-g="${id}">${tous ? 'Aucun' : 'Tous'}</button></div>
        <div class="cj-vs">${vis.map(v => `<label class="cj-v${st.sel.has(v) ? ' on' : ''}"><input type="checkbox" data-v="${cjEsc(v)}"${st.sel.has(v) ? ' checked' : ''}>${cjEsc(v)}</label>`).join('')}</div></div>`;
    }).join('') || '<p class="hint">Aucun verbe ne correspond.</p>';
    const modes = ['indicatif', 'conditionnel', 'subjonctif', 'impératif'];
    o.innerHTML = `<div class="modal-card cj">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon" style="color:#1F5FA8;vertical-align:-4px;">edit_note</span> Conjugaison</b>
        <button class="modal-close" onclick="document.getElementById('cjOverlay').style.display='none'"><span class="gicon">close</span></button></div>
      <p class="hint" style="margin:6px 0 10px;">Cochez les verbes et les temps vus en classe : votre sélection est retenue pour la prochaine fois. Les questions s'ajoutent à l'interrogation ; l'accent est exigé, pas la majuscule. Relisez-les avant de la donner.</p>
      <div class="cj-barre">
        <input type="search" id="cjFiltre" placeholder="Chercher un verbe…" value="${cjEsc(st.filtre)}">
        <input type="text" id="cjAjout" placeholder="Ajouter un verbe en -er ou en -ir (finir)" style="flex:1;min-width:180px;">
        <button class="btn secondary td-mini" id="cjAjoutOk"><span class="gicon">add</span> Ajouter</button>
      </div>
      ${st.msg ? `<p class="hint cj-msg">${st.msg}</p>` : ''}
      <div class="cj-liste">${blocs}</div>
      <div class="cj-temps">${modes.map(m => `<div><b>${m.charAt(0).toUpperCase() + m.slice(1)}</b> ${CJ_TEMPS.filter(t => t.mode === m).map(t =>
        `<label><input type="checkbox" data-t="${t.id}"${st.temps.has(t.id) ? ' checked' : ''}> ${t.nom}</label>`).join('')}</div>`).join('')}</div>
      <div class="cj-formes"><b>Questions :</b> ${CJ_FORMES.map(([k, l]) => `<label><input type="checkbox" data-f="${k}"${st.formes[k] ? ' checked' : ''}> ${l}</label>`).join('')}</div>
      <div class="cj-pied"><label class="hint" style="margin:0;">Tirer au hasard <input type="number" id="cjNb" min="0" max="${n}" value="${st.nb || ''}" placeholder="toutes" style="width:76px;"> question(s)</label>
        <span style="flex:1"></span><span class="hint" style="margin:0;">${st.sel.size} verbe(s) · ${st.temps.size} temps · ${st.nb && st.nb < n ? st.nb : n} question(s)</span>
        <button class="btn" id="cjOk"${n ? '' : ' disabled'}><span class="gicon">add</span> Ajouter les questions</button></div>
    </div>`;
    const filtre = o.querySelector('#cjFiltre');
    filtre.oninput = () => { st.filtre = filtre.value; const p = filtre.selectionStart; rendre(); const e = o.querySelector('#cjFiltre'); e.focus(); e.setSelectionRange(p, p); };
    o.querySelectorAll('[data-v]').forEach(c => c.onchange = () => { if(c.checked) st.sel.add(c.dataset.v); else st.sel.delete(c.dataset.v); rendre(); });
    o.querySelectorAll('[data-t]').forEach(c => c.onchange = () => { if(c.checked) st.temps.add(c.dataset.t); else st.temps.delete(c.dataset.t); rendre(); });
    o.querySelectorAll('[data-f]').forEach(c => c.onchange = () => { st.formes[c.dataset.f] = c.checked; rendre(); });
    o.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
      const l = groupes().find(g => g[0] === b.dataset.g)[2], tous = l.every(v => st.sel.has(v));
      l.forEach(v => tous ? st.sel.delete(v) : st.sel.add(v)); rendre(); });
    const ajout = o.querySelector('#cjAjout');
    const ajouter = () => {
      const v = ajout.value.trim().toLowerCase().replace(/\s+/g, ' ');
      if(!v) return;
      const connu = [...CJ_1, ...CJ_2, 'être', 'avoir', ...CJ_3_LISTE, ...st.perso].includes(v);
      if(connu){ st.sel.add(v); st.msg = `« ${cjEsc(v)} » est déjà dans la liste : il est coché.`; return rendre(); }
      if(/^(se |s')/.test(v) || !/^[a-zàâäçéèêëîïôöûüœæ-]+$/.test(v)){ st.msg = 'Écrivez un seul verbe à l\'infinitif (les verbes pronominaux ne sont pas encore pris en charge).'; return rendre(); }
      if(!/(er|ir)$/.test(v)){ st.msg = `Seuls les verbes en -er et les verbes du 2e groupe peuvent être ajoutés : pour le 3e groupe, choisissez dans la liste (${CJ_3_LISTE.length} verbes).`; return rendre(); }
      st.perso.push(v); st.sel.add(v);
      const ex = ['P', 'F'].map(t => [0, 3].map(p => cjAffiche(v, t, p)).join(', ')).join(' ; ');
      st.msg = `« ${cjEsc(v)} » ajouté comme verbe du ${/er$/.test(v) ? '1er' : '2e'} groupe. Vérifiez : ${cjEsc(ex)}.${/ir$/.test(v) ? ' Si c\'est un verbe du 3e groupe (comme partir), retirez-le.' : ''}`;
      rendre();
    };
    o.querySelector('#cjAjoutOk').onclick = ajouter;
    ajout.onkeydown = ev => { if(ev.key === 'Enter'){ ev.preventDefault(); ajouter(); } };
    const nb = o.querySelector('#cjNb'); nb.onchange = () => { st.nb = Math.max(0, Math.min(n, parseInt(nb.value, 10) || 0)); rendre(); };
    o.querySelector('#cjOk').onclick = async () => {
      const temps = CJ_TEMPS.map(t => t.id).filter(t => st.temps.has(t));
      // Rangées temps par temps, verbe par verbe (« Mélanger l'ordre des questions » les mélange à la passation) ;
      // tirage au hasard en gardant cet ordre.
      const verbes = groupes().flatMap(g => g[2]).filter((v, i, a) => st.sel.has(v) && a.indexOf(v) === i);
      let qs = [];
      temps.forEach(t => verbes.forEach(v => qs.push(...cjQuestions(v, t, st.formes, temps))));
      if(st.nb && st.nb < qs.length){ const garde = new Set(cjMel(qs).slice(0, st.nb)); qs = qs.filter(q => garde.has(q)); }
      if(!qs.length) return;
      if(!qzEd) qzEdReset();
      qzEd.questions.push(...qs);
      qzEdOuverte = null; qzEdRender();
      o.style.display = 'none';
      cjMemoriser(st);
      const ti = document.getElementById('qzfTitre'); if(ti && !ti.value.trim()) ti.value = 'Conjugaison';
      await niceAlert(`${qs.length} question${qs.length > 1 ? 's ajoutées' : ' ajoutée'} à l'interrogation, temps par temps (pour les mélanger : « Mélanger l'ordre des questions »). Relisez-les, puis donnez l'interrogation : en devoir, en entraînement ou en séance en direct.`);
    };
  };
  o.style.display = 'flex'; rendre();
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .cj{ max-width:820px; width:95vw; max-height:92vh; display:flex; flex-direction:column; }
    .cj-barre{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; margin-bottom:6px; } .cj-barre input[type=search]{ flex:1; min-width:160px; }
    .cj-msg{ margin:2px 0 6px; padding:6px 10px; background:#FFF8E6; border-radius:8px; }
    .cj-liste{ overflow:auto; flex:1; min-height:140px; border:1px solid rgba(28,43,57,.12); border-radius:10px; padding:6px 8px; }
    .cj-g + .cj-g{ margin-top:8px; } .cj-gt{ display:flex; align-items:center; gap:8px; margin-bottom:4px; font-size:.9rem; }
    .cj-vs{ display:flex; flex-wrap:wrap; gap:4px; }
    .cj-v{ display:inline-flex; align-items:center; gap:4px; padding:3px 9px 3px 5px; border:1px solid rgba(28,43,57,.15); border-radius:999px; cursor:pointer; font-size:.86rem; }
    .cj-v:hover{ background:#F3F6FA; } .cj-v.on{ background:#EAF1FA; border-color:#1F5FA8; }
    .cj-temps{ display:grid; gap:4px; margin-top:10px; font-size:.88rem; } .cj-temps > div{ display:flex; flex-wrap:wrap; gap:4px 12px; align-items:center; }
    .cj-temps b{ min-width:96px; } .cj-temps label, .cj-formes label{ display:inline-flex; gap:4px; align-items:center; }
    .cj-formes{ display:flex; flex-wrap:wrap; gap:6px 14px; align-items:center; margin:10px 0 0; font-size:.9rem; }
    .cj-pied{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:10px; }
  `;
  document.head.appendChild(st);
})();
