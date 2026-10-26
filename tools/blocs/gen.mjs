/* =====================================================================
   tools/blocs/gen.mjs -- Images des programmes par blocs des cours (img/blocs/*.svg)

   Demandé : « corrige les cours avec des images Blockly également ». Les programmes illustrés dans les cours
   de 6e (Initiation à la pensée informatique) et de 5e (Pensée informatique et programmation) sont dessinés
   par Blockly, avec le rendu de l'éditeur du site (« zelos », thème de programmation.js), puis enregistrés en
   images SVG autonomes : elles s'affichent sans charger Blockly, s'impriment, et servent aussi aux pages
   statiques (tools/build-seo.js).
   Les blocs du robot de 6e (« avancer de 3 » cases, « tourner à gauche ↺ »…) n'existent pas dans l'éditeur :
   ils sont définis ici, aux couleurs des catégories de l'éditeur.
   Police : Arial (mesurée et dessinée avec la même police, disponible partout, y compris dans une <img>).

   Usage (une fois les programmes modifiés ci-dessous) :
     (cd tools/blocs && npm install blockly@13.3.0)
     NODE_PATH=/opt/node22/lib/node_modules node tools/blocs/gen.mjs
   puis committer img/blocs/.
   ===================================================================== */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ICI = path.dirname(fileURLToPath(import.meta.url)), RACINE = path.resolve(ICI, '../..'), SORTIE = path.join(RACINE, 'img/blocs');
const BK = path.join(ICI, 'node_modules/blockly');

// Petit serveur de fichiers sur la racine du dépôt.
const TYPES = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
const serveur = http.createServer((req, res) => {
  const f = path.join(RACINE, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'));
  if(!f.startsWith(RACINE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
await new Promise(r => serveur.listen(0, r));
const port = serveur.address().port;

const navigateur = await chromium.launch(), page = await navigateur.newPage({ viewport: { width: 1400, height: 1000 } });
await page.route(/supabase\.co|googleapis|gstatic/, r => r.abort());
await page.route('**/npm/blockly@13.3.0/blockly.min.js', r => r.fulfill({ path: path.join(BK, 'blockly.min.js'), contentType: 'application/javascript' }));
await page.route('**/npm/blockly@13.3.0/msg/fr.js', r => r.fulfill({ path: path.join(BK, 'msg/fr.js'), contentType: 'application/javascript' }));
await page.goto(`http://localhost:${port}/`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => typeof progChargerBlockly === 'function' && typeof progBlocsSvg === 'function', null, { timeout: 30000 });

const images = await page.evaluate(async () => {
  await progChargerBlockly();
  window.__progTheme.fontStyle = { family: 'Arial, Helvetica, sans-serif', weight: 'bold', size: 11 };
  // Noms de variables des cours (menu déroulant d'un seul choix : même aspect que les variables de l'éditeur).
  const NOMS = ['nombre', 'total', 'L', 'l', 'P', 'x', 'y', 'n', 'b', 'h'].map(n => [n, n]);
  const N = name => ({ type: 'input_value', name, check: ['Number', 'String'] }), T = name => ({ type: 'input_value', name });
  const st = { previousStatement: null, nextStatement: null };
  const b = (type, message0, args0, style, extra) => Object.assign({ type, message0, args0: args0 || [], style, inputsInline: true }, extra || st);
  Blockly.defineBlocksWithJsonArray([
    b('pi_avancer', 'avancer de %1', [N('N')], 'mouvement'),
    b('pi_gauche', 'tourner à gauche ↺', [], 'mouvement'),
    b('pi_droite', 'tourner à droite ↻', [], 'mouvement'),
    b('pi_demander', 'demander un nombre (entrée)', [], 'capteurs'),
    b('pi_afficher_res', 'afficher le résultat (sortie)', [], 'apparence'),
    b('pi_ajouter', 'ajouter %1', [N('N')], 'operateurs'),
    b('pi_multiplier', 'multiplier par %1', [N('N')], 'operateurs'),
    b('pi_retirer', 'retirer %1', [N('N')], 'operateurs'),
    b('pi_afficher', 'afficher %1', [T('V')], 'apparence'),
    b('pi_mettre', 'mettre %1 à %2', [{ type: 'field_dropdown', name: 'NOM', options: NOMS }, T('V')], 'variables'),
    b('pi_ajouter_a', 'ajouter %1 à %2', [N('V'), { type: 'field_dropdown', name: 'NOM', options: NOMS }], 'variables'),
    b('pi_mult_var', 'multiplier %1 par %2', [{ type: 'field_dropdown', name: 'NOM', options: NOMS }, N('N')], 'variables'),
    b('pi_var', '%1', [{ type: 'field_dropdown', name: 'NOM', options: NOMS }], 'variables', { output: null }),
  ]);
  // Petite notation : [type, { entrées }, { champs }] ; une liste = une suite de blocs ; nombre / texte = valeur.
  const val = v => typeof v === 'number' ? { shadow: { type: 'math_number', fields: { NUM: v } } } : typeof v === 'string' ? { shadow: { type: 'text', fields: { TEXT: v } } } : { block: bloc(v) };
  function bloc([type, ins, champs]){
    const o = { type };
    if(champs) o.fields = champs;
    if(ins){ o.inputs = {}; for(const [k, v] of Object.entries(ins)) o.inputs[k] = Array.isArray(v) && Array.isArray(v[0]) ? { block: suite(v) } : val(v); }
    return o;
  }
  function suite(l){ const bs = l.map(bloc); for(let i = 0; i < bs.length - 1; i++) bs[i].next = { block: bs[i + 1] }; return bs[0]; }
  const prog = (l, drapeau) => ({ blocks: { languageVersion: 0, blocks: [Object.assign(suite(drapeau ? [['sc_drapeau']].concat(l) : l), { x: 10, y: 10 })] } });
  const V = nom => ['pi_var', null, { NOM: nom }], R = ['sc_reponse'], OP = (t, a, c) => [t, { A: a, B: c }];
  const av = n => ['pi_avancer', { N: n }], G = ['pi_gauche'], D = ['pi_droite'], rep = (n, l) => ['sc_repeter', { N: n, DO: l }];
  const mettre = (nom, v) => ['pi_mettre', { V: v }, { NOM: nom }], dire = v => ['sc_dire', { T: v }], demander = t => ['sc_demander', { T: t }];
  const P = {
    // 6e -- cours
    '6e-robot-sequence': prog([av(3), G, av(2)], true),
    '6e-calcul': prog([['pi_demander'], ['pi_ajouter', { N: 2 }], ['pi_multiplier', { N: 4 }], ['pi_retirer', { N: 3 }], ['pi_afficher_res']]),
    '6e-carre-sans-boucle': prog([av(3), D, av(3), D, av(3), D, av(3), D]),
    '6e-carre-boucle': prog([rep(4, [av(3), D])]),
    '6e-suivi': prog([mettre('nombre', 1), rep(4, [['pi_mult_var', { N: 3 }, { NOM: 'nombre' }]]), ['pi_afficher', { V: V('nombre') }]]),
    '6e-ex3': prog([mettre('nombre', 2), rep(3, [['pi_ajouter_a', { V: 5 }, { NOM: 'nombre' }]]), ['pi_afficher', { V: V('nombre') }]]),
    '6e-ex4-sans-boucle': prog([av(4), G, av(2), G, av(4), G, av(2), G]),
    '6e-ex4-boucle': prog([rep(2, [av(4), G, av(2), G])]),
    '6e-ex5': prog([rep(3, [av(1), G, av(1), G])]),
    '6e-ex5-corrige': prog([rep(3, [av(1), G, av(1), D])]),
    // 5e -- cours
    '5e-age': prog([demander('Quel est ton âge ?'), dire(OP('sc_plus', R, 10))], true),
    '5e-perimetre': prog([demander('Longueur ?'), mettre('L', R), demander('Largeur ?'), mettre('l', R), mettre('P', OP('sc_fois', 2, OP('sc_plus', V('L'), V('l')))), dire(V('P'))]),
    '5e-total': prog([mettre('total', 0), rep(4, [['pi_ajouter_a', { V: 5 }, { NOM: 'total' }]]), dire(V('total'))]),
    // 5e -- exercices et corrections
    '5e-ex1': prog([demander('Choisis un nombre'), mettre('x', R), mettre('y', OP('sc_moins', OP('sc_fois', V('x'), 3), 4)), dire(V('y'))]),
    '5e-ex2-corrige': prog([demander('Base ?'), mettre('b', R), demander('Hauteur ?'), mettre('h', R), dire(OP('sc_div', OP('sc_fois', V('b'), V('h')), 2))], true),
    '5e-ex3': prog([mettre('n', 3), rep(4, [mettre('n', OP('sc_fois', V('n'), 2))]), dire(V('n'))]),
    '5e-ex4-erreur': prog([dire(OP('sc_fois', R, 2))]),
    '5e-ex4-corrige': prog([dire(OP('sc_fois', R, R))]),
    '5e-ex5-carre': prog([['sc_stylo_bas'], rep(4, [['sc_avancer', { N: 100 }], ['sc_tourner_d', { N: 90 }]])], true),
    '5e-ex5-hexagone': prog([['sc_stylo_bas'], rep(6, [['sc_avancer', { N: 100 }], ['sc_tourner_d', { N: 60 }]])], true),
  };
  const out = {};
  for(const [nom, json] of Object.entries(P)){
    const svg = await progBlocsSvg(json, 0.9);
    if(!svg) throw new Error('Image impossible : ' + nom);
    // Fichier autonome : largeur et hauteur en attributs (taille naturelle de l'image).
    const [, , w, h] = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
    out[nom] = svg.replace(/ style="width:[^"]*"/, ` width="${Math.round(w * 0.9)}" height="${Math.round(h * 0.9)}"`);
  }
  return out;
});
fs.mkdirSync(SORTIE, { recursive: true });
for(const [nom, svg] of Object.entries(images)) fs.writeFileSync(path.join(SORTIE, nom + '.svg'), '<?xml version="1.0" encoding="UTF-8"?>\n' + svg + '\n');
console.log(Object.keys(images).length + ' images dans img/blocs/ :', Object.keys(images).join(', '));
await navigateur.close(); serveur.close();
