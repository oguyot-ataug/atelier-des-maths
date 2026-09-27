/* =====================================================================
   programmation.js -- Programmation par blocs, façon Scratch.

   Demandé : "Il ne manque plus qu'une chose sur le site, c'est l'apprentissage à la programmation
   par blocs" -- style Scratch (lutin qui se déplace et dessine), outil libre + défis vérifiés
   automatiquement + devoirs.

   - Éditeur : Blockly (bibliothèque libre, Apache 2.0), chargé à la première ouverture depuis
     cdn.jsdelivr.net, rendu « zelos » (blocs arrondis façon Scratch), couleurs des catégories de
     Scratch 3, blocs en français (événements, mouvement, stylo, apparence, contrôle, capteurs,
     opérateurs, variables).
   - Scène : 480 × 360 comme Scratch, origine au centre, direction 90 = vers la droite, 0 = vers le
     haut ; grille et axes facultatifs ; bulle « dire », question « demander ».
   - Interpréteur maison (pas d'eval) : parcourt les blocs, anime le lutin (lent / normal / turbo),
     surligne le bloc en cours, arrête un programme qui tourne sans fin. Il enregistre aussi les
     segments tracés et les phrases dites : c'est ce que les défis (prog-defis.js) vérifient.

   Dépend de app.js (sb, currentUser, showView, niceAlert, nicePrompt, escapeHtml).
   ===================================================================== */

const PROG_BLOCKLY = 'https://cdn.jsdelivr.net/npm/blockly@13.3.0/';
let progPret = null;
function progChargerBlockly(){
  if(window.Blockly && window.Blockly.inject && window.__progBlocs) return Promise.resolve();
  if(progPret) return progPret;
  const js = src => new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => ko(new Error('Chargement impossible : ' + src)); document.head.appendChild(s); });
  progPret = (window.Blockly && window.Blockly.inject ? Promise.resolve() : js(PROG_BLOCKLY + 'blockly.min.js'))
    .then(() => js(PROG_BLOCKLY + 'msg/fr.js')).then(progDefinirBlocs).catch(e => { progPret = null; throw e; });
  return progPret;
}

/* ---------------------------------------------------------------------
   Blocs
   --------------------------------------------------------------------- */
const PROG_COULEURS = {
  evenements: ['#FFBF00', '#E6AC00', '#CC9900'], mouvement: ['#4C97FF', '#4280D7', '#3373CC'], apparence: ['#9966FF', '#855CD6', '#774DCB'],
  stylo: ['#0FBD8C', '#0DA57A', '#0B8E69'], controle: ['#FFAB19', '#EC9C13', '#CF8B17'], capteurs: ['#5CB1D6', '#47A8D1', '#2E8EB8'],
  operateurs: ['#59C059', '#46B946', '#389438'], variables: ['#FF8C1A', '#FF8000', '#DB6E00'],
};
const PROG_STYLO = [['noir', '#1C2230'], ['bleu', '#1F6FEB'], ['rouge', '#D93025'], ['vert', '#1E7B34'], ['orange', '#FF8208'], ['violet', '#7E3FBF']];
function progDefinirBlocs(){
  const Bk = window.Blockly;
  if(window.__progBlocs) return;
  const N = name => ({ type: 'input_value', name, check: ['Number', 'String'] });
  const T = name => ({ type: 'input_value', name });
  const C = name => ({ type: 'input_value', name, check: 'Boolean' });
  const D = { type: 'input_dummy' }, DO = name => ({ type: 'input_statement', name });
  const st = { previousStatement: null, nextStatement: null };
  const b = (type, message0, args0, style, extra) => Object.assign({ type, message0, args0: args0 || [], style, inputsInline: true }, extra || st);
  Bk.defineBlocksWithJsonArray([
    b('sc_drapeau', 'quand %1 est cliqué', [{ type: 'field_label', text: '🏁' }], 'evenements', { nextStatement: null, tooltip: 'Le programme commence ici quand on clique sur le drapeau vert.' }),
    b('sc_avancer', 'avancer de %1 pas', [N('N')], 'mouvement'),
    b('sc_tourner_d', 'tourner ↻ de %1 degrés', [N('N')], 'mouvement'),
    b('sc_tourner_g', 'tourner ↺ de %1 degrés', [N('N')], 'mouvement'),
    b('sc_aller', 'aller à x : %1 y : %2', [N('X'), N('Y')], 'mouvement'),
    b('sc_orienter', 's\'orienter à %1 degrés', [N('N')], 'mouvement', Object.assign({ tooltip: '90 : vers la droite, 0 : vers le haut, -90 : vers la gauche, 180 : vers le bas' }, st)),
    b('sc_x', 'abscisse x', [], 'mouvement', { output: 'Number' }),
    b('sc_y', 'ordonnée y', [], 'mouvement', { output: 'Number' }),
    b('sc_direction', 'direction', [], 'mouvement', { output: 'Number' }),
    b('sc_stylo_bas', 'stylo en position d\'écriture', [], 'stylo'),
    b('sc_stylo_haut', 'relever le stylo', [], 'stylo'),
    b('sc_stylo_couleur', 'mettre la couleur du stylo à %1', [{ type: 'field_dropdown', name: 'COULEUR', options: PROG_STYLO }], 'stylo'),
    b('sc_stylo_taille', 'mettre la taille du stylo à %1', [N('N')], 'stylo'),
    b('sc_effacer', 'effacer tout', [], 'stylo'),
    b('sc_dire', 'dire %1', [T('T')], 'apparence'),
    b('sc_dire_sec', 'dire %1 pendant %2 secondes', [T('T'), N('N')], 'apparence'),
    b('sc_attendre', 'attendre %1 secondes', [N('N')], 'controle'),
    b('sc_repeter', 'répéter %1 fois %2 %3', [N('N'), D, DO('DO')], 'controle', Object.assign({ inputsInline: true }, st)),
    b('sc_toujours', 'répéter indéfiniment %1 %2', [D, DO('DO')], 'controle', { previousStatement: null }),
    b('sc_si', 'si %1 alors %2 %3', [C('C'), D, DO('DO')], 'controle'),
    b('sc_si_sinon', 'si %1 alors %2 %3 sinon %4 %5', [C('C'), D, DO('DO'), D, DO('ELSE')], 'controle'),
    b('sc_jusqua', 'répéter jusqu\'à ce que %1 %2 %3', [C('C'), D, DO('DO')], 'controle'),
    b('sc_demander', 'demander %1 et attendre', [T('T')], 'capteurs'),
    b('sc_reponse', 'réponse', [], 'capteurs', { output: null }),
    b('sc_plus', '%1 + %2', [N('A'), N('B')], 'operateurs', { output: 'Number' }),
    b('sc_moins', '%1 − %2', [N('A'), N('B')], 'operateurs', { output: 'Number' }),
    b('sc_fois', '%1 × %2', [N('A'), N('B')], 'operateurs', { output: 'Number' }),
    b('sc_div', '%1 ÷ %2', [N('A'), N('B')], 'operateurs', { output: 'Number' }),
    b('sc_hasard', 'nombre aléatoire entre %1 et %2', [N('A'), N('B')], 'operateurs', { output: 'Number' }),
    b('sc_inf', '%1 < %2', [T('A'), T('B')], 'operateurs', { output: 'Boolean' }),
    b('sc_egal', '%1 = %2', [T('A'), T('B')], 'operateurs', { output: 'Boolean' }),
    b('sc_sup', '%1 > %2', [T('A'), T('B')], 'operateurs', { output: 'Boolean' }),
    b('sc_et', '%1 et %2', [C('A'), C('B')], 'operateurs', { output: 'Boolean' }),
    b('sc_ou', '%1 ou %2', [C('A'), C('B')], 'operateurs', { output: 'Boolean' }),
    b('sc_non', 'non %1', [C('A')], 'operateurs', { output: 'Boolean' }),
    b('sc_modulo', 'reste de %1 ÷ %2', [N('A'), N('B')], 'operateurs', { output: 'Number' }),
    b('sc_arrondi', 'arrondi de %1', [N('A')], 'operateurs', { output: 'Number' }),
    b('sc_regrouper', 'regrouper %1 et %2', [T('A'), T('B')], 'operateurs', { output: 'String' }),
    b('sc_var_set', 'mettre %1 à %2', [{ type: 'field_variable', name: 'VAR', variable: 'ma variable' }, T('V')], 'variables'),
    b('sc_var_change', 'ajouter %1 à %2', [N('V'), { type: 'field_variable', name: 'VAR', variable: 'ma variable' }], 'variables'),
  ]);
  const styles = {};
  Object.entries(PROG_COULEURS).forEach(([k, [p, s, t]]) => { styles[k] = { colourPrimary: p, colourSecondary: s, colourTertiary: t }; });
  styles.variable_blocks = styles.variables; styles.math_blocks = styles.operateurs; styles.text_blocks = styles.operateurs; styles.logic_blocks = styles.operateurs;
  const cats = {}; Object.entries(PROG_COULEURS).forEach(([k, [p]]) => { cats[k] = { colour: p }; });
  window.__progTheme = Bk.Theme.defineTheme('progScratch', {
    base: Bk.Themes.Classic, blockStyles: styles, categoryStyles: cats, startHats: true,
    componentStyles: { workspaceBackgroundColour: '#F9F9FB', toolboxBackgroundColour: '#FFFFFF', toolboxForegroundColour: '#575E75', flyoutBackgroundColour: '#F4F5F9', flyoutOpacity: 1, scrollbarColour: '#CECDCE' },
    fontStyle: { family: 'Inter, "Helvetica Neue", Arial, sans-serif', weight: '600', size: 11 },
  });
  // Questions de Blockly (nommer une variable…) : fenêtres du site plutôt que celles du navigateur.
  if(Bk.dialog && typeof nicePrompt === 'function'){
    Bk.dialog.setPrompt((msg, def, cb) => { nicePrompt(msg, def).then(v => cb(v === undefined ? null : v)); });
    if(typeof niceConfirm === 'function') Bk.dialog.setConfirm((msg, cb) => { niceConfirm(msg).then(cb); });
    if(typeof niceAlert === 'function') Bk.dialog.setAlert((msg, cb) => { niceAlert(msg).then(() => cb && cb()); });
  }
  window.__progBlocs = true;
}
const PROG_NUM = v => ({ shadow: { type: 'math_number', fields: { NUM: v } } });
const PROG_TXT = v => ({ shadow: { type: 'text', fields: { TEXT: v } } });
// Boîte à outils ; « blocs » : liste des types autorisés (défi), sinon tout.
function progToolbox(blocs){
  const ok = t => !blocs || blocs.includes(t);
  const bl = (type, inputs) => ok(type) ? [Object.assign({ kind: 'block', type }, inputs ? { inputs } : {})] : [];
  const cat = (name, style, items) => items.length ? [{ kind: 'category', name, categorystyle: style, contents: items }] : [];
  return { kind: 'categoryToolbox', contents: [
    ...cat('Événements', 'evenements', bl('sc_drapeau')),
    ...cat('Mouvement', 'mouvement', [...bl('sc_avancer', { N: PROG_NUM(50) }), ...bl('sc_tourner_d', { N: PROG_NUM(90) }), ...bl('sc_tourner_g', { N: PROG_NUM(90) }),
      ...bl('sc_aller', { X: PROG_NUM(0), Y: PROG_NUM(0) }), ...bl('sc_orienter', { N: PROG_NUM(90) }), ...bl('sc_x'), ...bl('sc_y'), ...bl('sc_direction')]),
    ...cat('Stylo', 'stylo', [...bl('sc_effacer'), ...bl('sc_stylo_bas'), ...bl('sc_stylo_haut'), ...bl('sc_stylo_couleur'), ...bl('sc_stylo_taille', { N: PROG_NUM(2) })]),
    ...cat('Apparence', 'apparence', [...bl('sc_dire', { T: PROG_TXT('Bonjour !') }), ...bl('sc_dire_sec', { T: PROG_TXT('Bonjour !'), N: PROG_NUM(2) })]),
    ...cat('Contrôle', 'controle', [...bl('sc_attendre', { N: PROG_NUM(1) }), ...bl('sc_repeter', { N: PROG_NUM(4) }), ...bl('sc_toujours'), ...bl('sc_si'), ...bl('sc_si_sinon'), ...bl('sc_jusqua')]),
    ...cat('Capteurs', 'capteurs', [...bl('sc_demander', { T: PROG_TXT('Choisis un nombre.') }), ...bl('sc_reponse')]),
    ...cat('Opérateurs', 'operateurs', [...bl('sc_plus', { A: PROG_NUM(''), B: PROG_NUM('') }), ...bl('sc_moins', { A: PROG_NUM(''), B: PROG_NUM('') }), ...bl('sc_fois', { A: PROG_NUM(''), B: PROG_NUM('') }),
      ...bl('sc_div', { A: PROG_NUM(''), B: PROG_NUM('') }), ...bl('sc_hasard', { A: PROG_NUM(1), B: PROG_NUM(10) }),
      ...bl('sc_sup', { A: PROG_TXT(''), B: PROG_NUM(50) }), ...bl('sc_inf', { A: PROG_TXT(''), B: PROG_NUM(50) }), ...bl('sc_egal', { A: PROG_TXT(''), B: PROG_NUM(50) }),
      ...bl('sc_et'), ...bl('sc_ou'), ...bl('sc_non'), ...bl('sc_modulo', { A: PROG_NUM(''), B: PROG_NUM(2) }), ...bl('sc_arrondi', { A: PROG_NUM('') }),
      ...bl('sc_regrouper', { A: PROG_TXT('le résultat est '), B: PROG_TXT('') })]),
    ...(!blocs || blocs.includes('variables') ? [{ kind: 'category', name: 'Variables', categorystyle: 'variables', custom: 'PROG_VARIABLES' }] : []),
  ] };
}
function progVariablesFlyout(ws){
  const items = [{ kind: 'button', text: 'Créer une variable', callbackkey: 'PROG_NOUVELLE_VAR' }];
  const vars = ws.getVariableMap().getAllVariables().sort((a, b) => a.getName().localeCompare(b.getName(), 'fr'));
  if(vars.length){
    const v0 = vars[0];
    vars.forEach(v => items.push({ kind: 'block', type: 'variables_get', fields: { VAR: { id: v.getId() } } }));
    items.push({ kind: 'block', type: 'sc_var_set', fields: { VAR: { id: v0.getId() } }, inputs: { V: PROG_NUM(0) } });
    items.push({ kind: 'block', type: 'sc_var_change', fields: { VAR: { id: v0.getId() } }, inputs: { V: PROG_NUM(1) } });
  }
  return items;
}

/* ---------------------------------------------------------------------
   Tortue (géométrie commune au lutin et aux figures de référence des défis)
   --------------------------------------------------------------------- */
class ProgTortue {
  constructor(){ this.x = 0; this.y = 0; this.dir = 90; this.stylo = false; this.couleur = '#1C2230'; this.taille = 2; this.segments = []; }
  pas(d){ const r = this.dir * Math.PI / 180; return [this.x + d * Math.sin(r), this.y + d * Math.cos(r)]; }
  av(d){ const [x, y] = this.pas(d); this.vers(x, y); return this; }
  vers(x, y){ if(this.stylo && (x !== this.x || y !== this.y)) this.segments.push({ x1: this.x, y1: this.y, x2: x, y2: y, c: this.couleur, t: this.taille }); this.x = x; this.y = y; return this; }
  td(a){ this.dir = ((this.dir + a) % 360 + 360) % 360; return this; }
  tg(a){ return this.td(-a); }
  bas(){ this.stylo = true; return this; }
  haut(){ this.stylo = false; return this; }
}

/* ---------------------------------------------------------------------
   Scène
   --------------------------------------------------------------------- */
const PROG_W = 480, PROG_H = 360, PROG_R = 2; // résolution ×2 pour un trait net
class ProgScene {
  constructor(root){
    this.root = root;
    root.innerHTML = `<div class="prog-scene"><canvas class="fond"></canvas><canvas class="stylo"></canvas><canvas class="lutin"></canvas>
      <div class="prog-bulle" hidden></div><form class="prog-demande" hidden><span></span><div><input type="text" autocomplete="off"><button type="submit" class="btn">OK</button></div></form></div>`;
    [this.cFond, this.cStylo, this.cLutin] = root.querySelectorAll('canvas');
    [this.cFond, this.cStylo, this.cLutin].forEach(c => { c.width = PROG_W * PROG_R; c.height = PROG_H * PROG_R; });
    this.bulleEl = root.querySelector('.prog-bulle'); this.demandeEl = root.querySelector('.prog-demande');
    this.grille = false; this.modele = null; this.t = new ProgTortue();
    this.fond(); this.lutin();
  }
  ctx(c){ const x = c.getContext('2d'); x.setTransform(PROG_R, 0, 0, -PROG_R, PROG_W / 2 * PROG_R, PROG_H / 2 * PROG_R); return x; }
  fond(){
    const x = this.ctx(this.cFond); x.clearRect(-PROG_W, -PROG_H, 2 * PROG_W, 2 * PROG_H);
    if(this.grille){
      x.lineWidth = 0.5; x.strokeStyle = 'rgba(28,43,57,.1)';
      for(let i = -240; i <= 240; i += 20){ x.beginPath(); x.moveTo(i, -180); x.lineTo(i, 180); x.stroke(); }
      for(let j = -180; j <= 180; j += 20){ x.beginPath(); x.moveTo(-240, j); x.lineTo(240, j); x.stroke(); }
      x.lineWidth = 1; x.strokeStyle = 'rgba(28,43,57,.35)';
      x.beginPath(); x.moveTo(-240, 0); x.lineTo(240, 0); x.moveTo(0, -180); x.lineTo(0, 180); x.stroke();
      x.save(); x.scale(1, -1); x.fillStyle = 'rgba(28,43,57,.55)'; x.font = '9px Inter, sans-serif';
      for(let i = -200; i <= 200; i += 100) if(i) x.fillText(String(i), i + 2, 11);
      for(let j = -100; j <= 100; j += 100) if(j) x.fillText(String(j), 3, -j - 3);
      x.restore();
    }
    if(this.modele){
      x.setLineDash([6, 5]); x.lineWidth = 3; x.strokeStyle = 'rgba(255,130,8,.45)'; x.lineCap = 'round';
      this.modele.forEach(s => { x.beginPath(); x.moveTo(s.x1, s.y1); x.lineTo(s.x2, s.y2); x.stroke(); });
      x.setLineDash([]);
    }
  }
  effacer(){ const x = this.ctx(this.cStylo); x.clearRect(-PROG_W, -PROG_H, 2 * PROG_W, 2 * PROG_H); }
  trait(s){ const x = this.ctx(this.cStylo); x.lineCap = 'round'; x.strokeStyle = s.c; x.lineWidth = s.t; x.beginPath(); x.moveTo(s.x1, s.y1); x.lineTo(s.x2, s.y2); x.stroke(); }
  // Lutin : une flèche-crayon orange, pointe dans la direction.
  lutin(){
    const x = this.ctx(this.cLutin), t = this.t; x.clearRect(-PROG_W, -PROG_H, 2 * PROG_W, 2 * PROG_H);
    x.save(); x.translate(t.x, t.y); x.rotate(-t.dir * Math.PI / 180);
    x.beginPath(); x.moveTo(0, 16); x.lineTo(10, -10); x.lineTo(0, -4); x.lineTo(-10, -10); x.closePath();
    x.fillStyle = '#FF8208'; x.strokeStyle = '#B8511F'; x.lineWidth = 1.5; x.fill(); x.stroke();
    x.beginPath(); x.arc(0, 0, 2.6, 0, 2 * Math.PI); x.fillStyle = t.stylo ? t.couleur : '#fff'; x.fill(); x.strokeStyle = '#B8511F'; x.lineWidth = 1; x.stroke();
    x.restore();
    this.placerBulle();
  }
  placerBulle(){
    if(this.bulleEl.hidden) return;
    const px = (this.t.x + PROG_W / 2) / PROG_W * 100, py = (PROG_H / 2 - this.t.y) / PROG_H * 100;
    this.bulleEl.style.left = Math.min(70, Math.max(2, px + 3)) + '%'; this.bulleEl.style.top = Math.max(2, py - 22) + '%';
  }
  bulle(txt){ if(txt === null || txt === ''){ this.bulleEl.hidden = true; return; } this.bulleEl.textContent = String(txt); this.bulleEl.hidden = false; this.placerBulle(); }
  demander(q){
    return new Promise(ok => {
      const f = this.demandeEl, inp = f.querySelector('input');
      f.querySelector('span').textContent = q; inp.value = ''; f.hidden = false; setTimeout(() => inp.focus(), 30);
      f.onsubmit = e => { e.preventDefault(); f.hidden = true; ok(inp.value); };
      this.annulerDemande = () => { f.hidden = true; ok(''); };
    });
  }
  reset(){ this.t = new ProgTortue(); this.effacer(); this.bulle(null); if(this.annulerDemande){ this.annulerDemande(); this.annulerDemande = null; } this.lutin(); }
}

/* ---------------------------------------------------------------------
   Interpréteur
   --------------------------------------------------------------------- */
class ProgErreur extends Error {}
const PROG_STOP = new Error('arrêt');
const PROG_VITESSES = { lent: { px: 3, deg: 5, pause: 220 }, normal: { px: 10, deg: 30, pause: 60 }, turbo: null };
class ProgMachine {
  // opts : { scene, vitesse, ws (surbrillance), reponses (tableau : réponses automatiques aux « demander »), max }
  constructor(opts){
    Object.assign(this, { scene: null, vitesse: 'normal', ws: null, reponses: null, max: 300000 }, opts);
    this.t = this.scene ? this.scene.t : new ProgTortue();
    this.dits = []; this.questions = []; this.reponse = ''; this.nb = 0; this.arrete = false; this.vars = {};
  }
  arreter(){ this.arrete = true; if(this.scene && this.scene.annulerDemande) this.scene.annulerDemande(); }
  get anime(){ return !!(this.scene && PROG_VITESSES[this.vitesse]); }
  attendre(ms){ return new Promise(r => setTimeout(r, ms)); }
  image(){ return new Promise(r => requestAnimationFrame(() => r())); }
  async tic(b){
    if(this.arrete) throw PROG_STOP;
    if(++this.nb > this.max) throw new ProgErreur('Le programme a exécuté trop d\'instructions : il tourne peut-être sans fin (une boucle « répéter indéfiniment » ?).');
    if(this.anime){ if(this.ws) this.ws.highlightBlock(b.id); await this.attendre(PROG_VITESSES[this.vitesse].pause); }
    else if(this.nb % 400 === 0 && this.scene) await this.image();
  }
  async lancer(ws){
    const tops = ws.getTopBlocks(true), hats = tops.filter(b => b.type === 'sc_drapeau');
    if(!hats.length) throw new ProgErreur('Ajoute le bloc « quand 🏁 est cliqué » (catégorie Événements) au début de ton programme.');
    try{ for(const h of hats) await this.suite(h.getNextBlock()); }
    finally{ if(this.ws) this.ws.highlightBlock(null); }
  }
  async suite(b){ while(b){ await this.exec(b); b = b.getNextBlock(); } }
  num(v){ if(typeof v === 'number') return v; if(typeof v === 'boolean') return v ? 1 : 0; const n = parseFloat(String(v).trim().replace(',', '.')); return isNaN(n) ? 0 : n; }
  async val(b, nom){ const c = b.getInputTargetBlock(nom); return c ? await this.ev(c) : ''; }
  async n(b, nom){ return this.num(await this.val(b, nom)); }
  async cond(b, nom){ const c = b.getInputTargetBlock(nom); return c ? !!(await this.ev(c)) : false; }
  varNom(b){ const f = b.getField('VAR'); return f ? (f.getVariable ? f.getVariable().getName() : f.getText()) : ''; }
  comparer(a, b){ // comme Scratch : nombres comparés en nombres, sinon textes sans tenir compte de la casse
    const na = parseFloat(String(a).replace(',', '.')), nb = parseFloat(String(b).replace(',', '.'));
    if(String(a).trim() !== '' && String(b).trim() !== '' && !isNaN(na) && !isNaN(nb) && isFinite(String(a).replace(',', '.')) && isFinite(String(b).replace(',', '.'))) return na === nb ? 0 : na < nb ? -1 : 1;
    const x = String(a).toLowerCase(), y = String(b).toLowerCase(); return x === y ? 0 : x < y ? -1 : 1;
  }
  texte(v){ if(typeof v === 'number'){ if(!isFinite(v)) return v > 0 ? 'Infini' : v < 0 ? '-Infini' : 'NaN'; return String(Math.round(v * 1e10) / 1e10).replace('.', ','); } return String(v); }
  async ev(b){
    switch(b.type){
      case 'math_number': return this.num(b.getFieldValue('NUM'));
      case 'text': return b.getFieldValue('TEXT');
      case 'variables_get': { const k = this.varNom(b); return k in this.vars ? this.vars[k] : 0; }
      case 'sc_x': return Math.round(this.t.x * 1e6) / 1e6;
      case 'sc_y': return Math.round(this.t.y * 1e6) / 1e6;
      case 'sc_direction': return this.t.dir > 180 ? this.t.dir - 360 : this.t.dir;
      case 'sc_reponse': return this.reponse;
      case 'sc_plus': return (await this.n(b, 'A')) + (await this.n(b, 'B'));
      case 'sc_moins': return (await this.n(b, 'A')) - (await this.n(b, 'B'));
      case 'sc_fois': return (await this.n(b, 'A')) * (await this.n(b, 'B'));
      case 'sc_div': return (await this.n(b, 'A')) / (await this.n(b, 'B'));
      case 'sc_hasard': { let a = await this.n(b, 'A'), c = await this.n(b, 'B'); if(a > c) [a, c] = [c, a];
        return Number.isInteger(a) && Number.isInteger(c) ? a + Math.floor(Math.random() * (c - a + 1)) : a + Math.random() * (c - a); }
      case 'sc_inf': return this.comparer(await this.val(b, 'A'), await this.val(b, 'B')) < 0;
      case 'sc_egal': return this.comparer(await this.val(b, 'A'), await this.val(b, 'B')) === 0;
      case 'sc_sup': return this.comparer(await this.val(b, 'A'), await this.val(b, 'B')) > 0;
      case 'sc_et': return (await this.cond(b, 'A')) && (await this.cond(b, 'B'));
      case 'sc_ou': return (await this.cond(b, 'A')) || (await this.cond(b, 'B'));
      case 'sc_non': return !(await this.cond(b, 'A'));
      case 'sc_modulo': { const a = await this.n(b, 'A'), m = await this.n(b, 'B'); return m ? ((a % m) + m) % m : NaN; }
      case 'sc_arrondi': return Math.round(await this.n(b, 'A'));
      case 'sc_regrouper': return this.texte(await this.val(b, 'A')) + this.texte(await this.val(b, 'B'));
      default: return '';
    }
  }
  async bouger(x, y){
    const t = this.t, v = PROG_VITESSES[this.vitesse];
    if(this.anime && this.scene){
      const x0 = t.x, y0 = t.y, d = Math.hypot(x - x0, y - y0), n = Math.max(1, Math.ceil(d / v.px));
      for(let i = 1; i <= n; i++){
        if(this.arrete) throw PROG_STOP;
        const xi = x0 + (x - x0) * i / n, yi = y0 + (y - y0) * i / n;
        const avant = t.segments.length; t.vers(xi, yi);
        if(t.segments.length > avant) this.scene.trait(t.segments[t.segments.length - 1]);
        this.scene.lutin(); await this.image();
      }
      // segments animés fusionnés en un seul (même tracé, vérification plus simple)
      const k = t.segments.length - n;
      if(t.stylo && n > 1 && k >= 0){ const s = t.segments.slice(k); t.segments.splice(k, n, { x1: s[0].x1, y1: s[0].y1, x2: x, y2: y, c: s[0].c, t: s[0].t }); }
    } else {
      const avant = t.segments.length; t.vers(x, y);
      if(this.scene){ if(t.segments.length > avant) this.scene.trait(t.segments[t.segments.length - 1]); this.scene.lutin(); }
    }
  }
  async tourner(a){
    const v = PROG_VITESSES[this.vitesse];
    if(this.anime && this.scene && Math.abs(a) > v.deg){
      const n = Math.ceil(Math.abs(a) / v.deg);
      for(let i = 0; i < n; i++){ if(this.arrete) throw PROG_STOP; this.t.td(a / n); this.scene.lutin(); await this.image(); }
      this.t.dir = Math.round(this.t.dir * 1e9) / 1e9;
    } else { this.t.td(a); if(this.scene) this.scene.lutin(); }
  }
  async dire(v){ const s = this.texte(v); this.dits.push(s); if(this.scene) this.scene.bulle(s); if(this.surDire) this.surDire(s); }
  async exec(b){
    await this.tic(b);
    const t = this.t;
    switch(b.type){
      case 'sc_avancer': { const [x, y] = t.pas(await this.n(b, 'N')); await this.bouger(x, y); break; }
      case 'sc_tourner_d': await this.tourner(await this.n(b, 'N')); break;
      case 'sc_tourner_g': await this.tourner(-(await this.n(b, 'N'))); break;
      case 'sc_aller': { const x = await this.n(b, 'X'), y = await this.n(b, 'Y'); await this.bouger(x, y); break; }
      case 'sc_orienter': t.dir = (((await this.n(b, 'N')) % 360) + 360) % 360; if(this.scene) this.scene.lutin(); break;
      case 'sc_stylo_bas': t.stylo = true; if(this.scene) this.scene.lutin(); break;
      case 'sc_stylo_haut': t.stylo = false; if(this.scene) this.scene.lutin(); break;
      case 'sc_stylo_couleur': t.couleur = b.getFieldValue('COULEUR'); if(this.scene) this.scene.lutin(); break;
      case 'sc_stylo_taille': t.taille = Math.max(0.5, Math.min(40, await this.n(b, 'N'))); break;
      case 'sc_effacer': t.segments = []; if(this.scene) this.scene.effacer(); break;
      case 'sc_dire': await this.dire(await this.val(b, 'T')); break;
      case 'sc_dire_sec': { await this.dire(await this.val(b, 'T')); const s = await this.n(b, 'N'); if(this.scene) await this.attendre(Math.min(30, Math.max(0, s)) * 1000); if(this.scene) this.scene.bulle(null); break; }
      case 'sc_attendre': { const s = await this.n(b, 'N'); if(this.scene) await this.attendre(Math.min(30, Math.max(0, s)) * 1000); break; }
      case 'sc_repeter': { const n = Math.floor(await this.n(b, 'N')); for(let i = 0; i < n; i++){ await this.suite(b.getInputTargetBlock('DO')); if(!b.getInputTargetBlock('DO')) await this.tic(b); } break; }
      case 'sc_toujours': for(;;){ await this.suite(b.getInputTargetBlock('DO')); await this.tic(b); }
      case 'sc_si': if(await this.cond(b, 'C')) await this.suite(b.getInputTargetBlock('DO')); break;
      case 'sc_si_sinon': await this.suite(b.getInputTargetBlock((await this.cond(b, 'C')) ? 'DO' : 'ELSE')); break;
      case 'sc_jusqua': while(!(await this.cond(b, 'C'))){ await this.suite(b.getInputTargetBlock('DO')); await this.tic(b); } break;
      case 'sc_demander': {
        const q = this.texte(await this.val(b, 'T')); this.questions.push(q);
        if(this.reponses) this.reponse = this.reponses.length ? String(this.reponses.shift()) : '';
        else if(this.scene){ if(this.scene) this.scene.bulle(null); this.reponse = await this.scene.demander(q); if(this.arrete) throw PROG_STOP; }
        else this.reponse = '';
        break;
      }
      case 'sc_var_set': this.vars[this.varNom(b)] = await this.val(b, 'V'); break;
      case 'sc_var_change': { const k = this.varNom(b); this.vars[k] = this.num(k in this.vars ? this.vars[k] : 0) + (await this.n(b, 'V')); break; }
      default: break; // blocs de valeur posés seuls : ignorés
    }
  }
}

/* ---------------------------------------------------------------------
   Page « Programmation »
   --------------------------------------------------------------------- */
let prog = null; // { mode:'defis'|'libre', ws, scene, machine, defi, devoir, vitesse, grille, modele }
function progEsc(s){ return escapeHtml(String(s ?? '')); }
async function progOuvrir(opts){
  opts = opts || {};
  showView('view-programmation'); if(typeof setActiveTopnav === 'function') setActiveTopnav('programmation');
  const root = document.getElementById('progRoot');
  if(!prog || !prog.ws || !document.getElementById('progBlocs')){
    root.innerHTML = '<p class="hint">Chargement de l\'éditeur de blocs…</p>';
    try{ await progChargerBlockly(); }catch(e){ root.innerHTML = `<p class="hint">L'éditeur de blocs n'a pas pu être chargé (connexion ?). ${progEsc(e.message)}</p>`; return; }
    progConstruire(root);
  }
  prog.devoir = opts.devoir || null; prog.lecture = opts.lecture || null;
  document.getElementById('progTabs').hidden = false;
  if(typeof progDefisInit === 'function') await progDefisInit(opts);
  else progMode('libre');
}
function progConstruire(root){
  let pref = {}; try{ pref = JSON.parse(localStorage.getItem('progPref') || '{}') || {}; }catch(e){}
  root.innerHTML = `<div class="prog">
    <div class="prog-top">
      <h1><span class="gicon">extension</span> Programmation</h1>
      <div class="prog-tabs" id="progTabs"><button type="button" data-m="defis" onclick="progMode('defis')"><span class="gicon">emoji_events</span> Défis</button>
        <button type="button" data-m="libre" onclick="progMode('libre')"><span class="gicon">palette</span> Création libre</button></div>
      <span id="progDevoirBandeau" class="prog-devoir" hidden></span>
    </div>
    <div class="prog-body">
      <aside class="prog-liste" id="progListe"></aside>
      <div class="prog-main">
        <div class="prog-consigne" id="progConsigne" hidden></div>
        <div class="prog-zone">
          <div class="prog-blocs-wrap"><div class="prog-blocs" id="progBlocs"></div></div>
          <div class="prog-droite">
            <div class="prog-barre">
              <button type="button" class="prog-go" id="progGo" onclick="progLancer()" title="Lancer le programme"><span>🏁</span></button>
              <button type="button" class="prog-stop" onclick="progArreter()" title="Arrêter"><span class="gicon">stop</span></button>
              <select id="progVitesse" onchange="progPrefs()" title="Vitesse du lutin"><option value="lent">Lent</option><option value="normal">Normal</option><option value="turbo">Turbo</option></select>
              <label class="prog-chk" title="Afficher le repère (x, y)"><input type="checkbox" id="progGrille" onchange="progPrefs()"> Repère</label>
              <label class="prog-chk" id="progModeleLbl" title="Afficher en pointillés la figure à obtenir" hidden><input type="checkbox" id="progModele" onchange="progPrefs()"> Modèle</label>
            </div>
            <div id="progScene"></div>
            <div class="prog-infos"><span id="progPos"></span></div>
            <div class="prog-sortie" id="progSortie" hidden></div>
            <div class="prog-verif" id="progVerif" hidden></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  const ws = Blockly.inject('progBlocs', {
    toolbox: progToolbox(null), renderer: 'zelos', media: PROG_BLOCKLY + 'media/', theme: window.__progTheme, trashcan: true, sounds: false,
    zoom: { controls: true, wheel: false, startScale: 0.72, maxScale: 1.6, minScale: 0.4, scaleSpeed: 1.15 },
    move: { scrollbars: true, drag: true, wheel: true }, grid: { spacing: 40, length: 2, colour: '#E3E6EC', snap: false },
  });
  ws.registerToolboxCategoryCallback('PROG_VARIABLES', progVariablesFlyout);
  ws.registerButtonCallback('PROG_NOUVELLE_VAR', () => Blockly.Variables.createVariableButtonHandler(ws, null, ''));
  const scene = new ProgScene(document.getElementById('progScene'));
  prog = { ws, scene, machine: null, mode: 'libre', vitesse: pref.vitesse || 'normal', grille: !!pref.grille, modele: pref.modele !== false, defi: null, devoir: null };
  document.getElementById('progVitesse').value = prog.vitesse; document.getElementById('progGrille').checked = prog.grille; document.getElementById('progModele').checked = prog.modele;
  scene.grille = prog.grille; scene.fond();
  ws.addChangeListener(e => { if(e.isUiEvent) return; progModifie(); });
  window.addEventListener('resize', () => { if(prog && prog.ws) Blockly.svgResize(prog.ws); });
  progMajPos();
}
function progPrefs(){
  if(!prog) return;
  prog.vitesse = document.getElementById('progVitesse').value;
  prog.grille = document.getElementById('progGrille').checked;
  prog.modele = document.getElementById('progModele').checked;
  try{ localStorage.setItem('progPref', JSON.stringify({ vitesse: prog.vitesse, grille: prog.grille, modele: prog.modele })); }catch(e){}
  prog.scene.grille = prog.grille; prog.scene.modele = prog.modele && prog.defi && typeof progModeleSegments === 'function' ? progModeleSegments(prog.defi) : null; prog.scene.fond();
}
function progMajPos(){
  const el = document.getElementById('progPos'); if(!el || !prog) return;
  const t = prog.scene.t, f = v => String(Math.round(v * 10) / 10).replace('.', ',');
  el.textContent = `x : ${f(t.x)}   y : ${f(t.y)}   direction : ${f(t.dir > 180 ? t.dir - 360 : t.dir)}`;
}
function progMode(m){
  if(!prog) return;
  if(m === 'defis' && typeof progDefisAfficher === 'function') return progDefisAfficher();
  progSauverCourant();
  prog.mode = 'libre'; prog.defi = null;
  document.querySelectorAll('#progTabs button').forEach(b => b.classList.toggle('on', b.dataset.m === 'libre'));
  document.getElementById('progListe').hidden = true; document.getElementById('progConsigne').hidden = true;
  document.getElementById('progVerif').hidden = true; document.getElementById('progModeleLbl').hidden = true;
  prog.ws.updateToolbox(progToolbox(null));
  let json = null; try{ json = JSON.parse(localStorage.getItem('progLibre:' + ((currentUser && currentUser.id) || 'anon')) || 'null'); }catch(e){}
  progCharger(json || progDepartDefaut());
  prog.scene.modele = null; prog.scene.reset(); prog.scene.fond(); progMajPos();
}
function progDepartDefaut(){ return { blocks: { languageVersion: 0, blocks: [{ type: 'sc_drapeau', x: 40, y: 40 }] } }; }
function progCharger(json){
  prog.chargement = true;
  try{ prog.ws.clear(); Blockly.serialization.workspaces.load(json || progDepartDefaut(), prog.ws); }
  catch(e){ console.warn('programme illisible', e); prog.ws.clear(); Blockly.serialization.workspaces.load(progDepartDefaut(), prog.ws); }
  prog.chargement = false;
  setTimeout(() => { if(prog){ Blockly.svgResize(prog.ws); prog.ws.scrollCenter(); } }, 30);
}
function progProgramme(){ return Blockly.serialization.workspaces.save(prog.ws); }
function progModifie(){
  if(!prog || prog.chargement) return;
  clearTimeout(prog.saveT); prog.saveT = setTimeout(progSauverCourant, 1200);
}
function progSauverCourant(){
  if(!prog || !prog.ws || prog.chargement || prog.lecture) return;
  clearTimeout(prog.saveT);
  const json = progProgramme();
  if(prog.mode === 'libre'){ try{ localStorage.setItem('progLibre:' + ((currentUser && currentUser.id) || 'anon'), JSON.stringify(json)); }catch(e){} }
  else if(prog.defi && typeof progDefiSauver === 'function') progDefiSauver(prog.defi, json);
}
async function progLancer(){
  if(!prog) return;
  progArreter();
  const s = prog.scene; s.reset(); progMajPos();
  const sortie = document.getElementById('progSortie'); sortie.innerHTML = ''; sortie.hidden = true;
  const m = new ProgMachine({ scene: s, vitesse: prog.vitesse, ws: prog.ws });
  m.surDire = txt => { sortie.hidden = false; const d = document.createElement('div'); d.textContent = txt; sortie.appendChild(d); sortie.scrollTop = sortie.scrollHeight; };
  prog.machine = m;
  const go = document.getElementById('progGo'); go.classList.add('on');
  const pos = setInterval(progMajPos, 120);
  try{ await m.lancer(prog.ws); }
  catch(e){ if(e !== PROG_STOP){ if(e instanceof ProgErreur) niceAlert(e.message); else { console.error(e); niceAlert('Erreur dans le programme : ' + e.message); } } }
  finally{ clearInterval(pos); progMajPos(); go.classList.remove('on'); if(prog.machine === m) prog.machine = null; }
  return m;
}
function progArreter(){ if(prog && prog.machine){ prog.machine.arreter(); prog.machine = null; } if(prog && prog.ws) prog.ws.highlightBlock(null); }

(function progStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #view-programmation{max-width:none;}
    .prog{max-width:1500px;margin:0 auto;}
    .prog-top{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:0 0 12px;}
    .prog-top h1{margin:0;font-size:1.6rem;display:flex;align-items:center;gap:8px;} .prog-top h1 .gicon{color:#4C97FF;font-size:1.8rem;}
    .prog [hidden]{display:none !important;}
    .prog-tabs{display:inline-flex;background:rgba(28,43,57,.06);border-radius:12px;padding:3px;gap:2px;}
    .prog-tabs button{border:none;background:none;border-radius:9px;padding:7px 14px;font:600 .9rem 'Space Grotesk',sans-serif;color:#5B6472;cursor:pointer;display:inline-flex;align-items:center;gap:6px;}
    .prog-tabs button.on{background:#fff;color:#0C5BA0;box-shadow:0 1px 4px rgba(28,43,57,.18);} .prog-tabs .gicon{font-size:1.1rem;}
    .prog-devoir{display:inline-flex;align-items:center;gap:6px;background:rgba(255,130,8,.12);color:#B8511F;border-radius:999px;padding:5px 12px;font-weight:600;font-size:.88rem;} .prog-devoir[hidden]{display:none;}
    .prog-body{display:flex;gap:14px;align-items:flex-start;}
    .prog-liste{width:250px;flex:none;display:flex;flex-direction:column;gap:6px;max-height:calc(100vh - 150px);overflow:auto;position:sticky;top:70px;}
    .prog-liste[hidden]{display:none;}
    .prog-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;}
    .prog-consigne{background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:14px;padding:12px 16px;box-shadow:0 2px 8px rgba(28,43,57,.04);}
    .prog-zone{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:12px;align-items:start;}
    .prog-blocs-wrap{background:#fff;border:1px solid rgba(28,43,57,.12);border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(28,43,57,.05);}
    .prog-blocs{height:560px;}
    .prog-droite{display:flex;flex-direction:column;gap:8px;position:sticky;top:70px;}
    .prog-barre{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .prog-go,.prog-stop{width:42px;height:42px;border-radius:12px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:1.3rem;}
    .prog-go{background:#E8F7EE;border:2px solid #4CBF56;} .prog-go.on{background:#4CBF56;box-shadow:0 0 0 4px rgba(76,191,86,.25);}
    .prog-stop{background:#FDECEA;border:2px solid #EC5959;color:#EC5959;} .prog-stop .gicon{font-size:1.5rem;}
    .prog-barre select{border:1.5px solid rgba(28,43,57,.15);border-radius:10px;padding:6px 8px;font:600 .85rem Inter,sans-serif;background:#fff;}
    .prog-chk{display:inline-flex;align-items:center;gap:5px;font-size:.85rem;color:#4E5665;cursor:pointer;} .prog-chk[hidden]{display:none;}
    .prog-scene{position:relative;width:100%;aspect-ratio:4/3;background:#fff;border:1px solid rgba(28,43,57,.15);border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(28,43,57,.05);}
    .prog-scene canvas{position:absolute;inset:0;width:100%;height:100%;}
    .prog-bulle{position:absolute;max-width:45%;background:#fff;border:2px solid rgba(28,43,57,.2);border-radius:14px;padding:6px 10px;font:600 .9rem Inter,sans-serif;color:#20242E;box-shadow:0 3px 10px rgba(0,0,0,.08);word-break:break-word;}
    .prog-bulle[hidden]{display:none;}
    .prog-demande{position:absolute;left:8px;right:8px;bottom:8px;background:#fff;border:2px solid #5CB1D6;border-radius:12px;padding:8px 10px;box-shadow:0 4px 14px rgba(0,0,0,.12);}
    .prog-demande[hidden]{display:none;} .prog-demande span{display:block;font-weight:600;font-size:.9rem;margin-bottom:6px;}
    .prog-demande div{display:flex;gap:6px;} .prog-demande input{flex:1;border:1.5px solid rgba(28,43,57,.2);border-radius:8px;padding:6px 10px;font:inherit;}
    .prog-infos{font:500 .78rem 'JetBrains Mono',monospace;color:#5B6472;white-space:pre;}
    .prog-sortie{background:#1C2230;color:#E8EAF0;border-radius:10px;padding:8px 12px;font:500 .85rem 'JetBrains Mono',monospace;max-height:120px;overflow:auto;}
    .prog-sortie[hidden],.prog-verif[hidden],.prog-consigne[hidden]{display:none;}
    .prog-sortie div::before{content:'💬 ';}
    @media (max-width:1000px){ .prog-body{flex-direction:column;} .prog-liste{width:100%;position:static;max-height:none;flex-direction:row;overflow-x:auto;} .prog-zone{grid-template-columns:1fr;} .prog-droite{position:static;} .prog-blocs{height:460px;} }
  `;
  document.head.appendChild(st);
})();
