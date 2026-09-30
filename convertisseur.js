/* =====================================================================
   convertisseur.js -- S'entraîner › Convertisseur

   Demandé : « On va créer un autre menu dans s'entraîner. Convertisseur. Dedans on aura plusieurs
   tuiles de conversion, avec des outils pour comprendre, genre déplace la virgule au bon endroit. Ou
   encore multiplier par 10, 100, 1000... ; on repère le chiffre des unités en rouge et on a des flèches
   droite gauche pour faire glisser le nombre à droite ou à gauche afin de l'amener sur la dizaine, la
   centaine (ça évite de réfléchir avec je déplace la virgule d'un rang ou deux rangs vers la droite ou
   la gauche). On peut le faire en s'adaptant au niveau de classe. Les tuiles de conversions simples pour
   les unités (au choix m, L...) : on a les préfixes en couleur. Conversions aire, conversions volumes. »

   - Tuile « × et ÷ par 10, 100, 1000 » : tableau de numération, virgule FIXE ; le nombre glisse avec
     les flèches (ou les touches ← →). Le chiffre des unités du nombre de départ est en rouge : pour
     « × 100 », on l'amène dans la colonne des centaines. Les zéros à ajouter apparaissent en orange,
     les zéros devenus inutiles s'estompent.
   - Tuiles « Unités » (longueurs, masses, contenances), « Aires » (2 colonnes par unité), « Volumes »
     (3 colonnes par unité, avec les litres sous les dm³ et cm³) : le nombre est placé avec son chiffre
     des unités (rouge) dans la colonne de son unité ; on déplace la VIRGULE avec les flèches jusqu'à
     la colonne de l'unité voulue. Préfixes en couleur (k rouge, h orange, da jaune, d vert, c bleu,
     m violet).
   - Chaque outil : mode libre (on choisit le nombre, l'opération, les unités) et mode exercice (tiré au
     hasard selon le niveau choisi en haut : CM1, CM2, 6e... ; score de la série).
   Calculs exacts sur les décimaux (chiffres + puissance de 10), jamais en virgule flottante.
   ===================================================================== */

const CV_NIVEAUX = ['CM1', 'CM2', '6e', '5e', '4e', '3e'];
const CV_PREF_COUL = { k: '#D32F2F', h: '#E07B00', da: '#B08A00', '': '#20242E', d: '#1F7A4D', c: '#0C5BA0', m: '#7B3FA0' };
let cv = { niveau: null, outil: null, ga: null, tc: null };

function cvEsc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function cvRang(){ return Math.max(0, CV_NIVEAUX.indexOf(cv.niveau)); }
function cvAlea(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
function cvPioche(t){ return t[Math.floor(Math.random() * t.length)]; }

/* ------------------------- Décimaux exacts : { d: chiffres, e: puissance de 10 } ------------------------- */
function cvLire(s){
  s = String(s == null ? '' : s).trim().replace(/[\s  ]/g, '').replace('.', ',');
  if(!/^\d+(,\d+)?$/.test(s)) return null;
  const [a, b = ''] = s.split(',');
  let d = (a + b).replace(/^0+/, ''), e = -b.length;
  if(!d) return { d: '0', e: 0 };
  while(d.length > 1 && d.endsWith('0')){ d = d.slice(0, -1); e++; }
  return { d, e };
}
function cvDecaler(n, k){ return n.d === '0' ? n : { d: n.d, e: n.e + k }; }
function cvEcrire(n){
  if(!n || n.d === '0') return '0';
  const L = n.d.length, pos = L + n.e; let ent, dec = '';
  if(n.e >= 0) ent = n.d + '0'.repeat(n.e);
  else if(pos > 0){ ent = n.d.slice(0, pos); dec = n.d.slice(pos); }
  else { ent = '0'; dec = '0'.repeat(-pos) + n.d; }
  return ent.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (dec ? ',' + dec : '');
}
function cvEgal(a, b){ return !!(a && b && a.d === b.d && a.e === b.e); }
// Chiffres de l'écriture usuelle du nombre, avec leur rang (0 = unités, 1 = dizaines, -1 = dixièmes...).
function cvChiffres(n){
  const s = cvEcrire(n).replace(/ /g, ''), [ent, dec = ''] = s.split(','), t = [];
  for(let i = 0; i < ent.length; i++) t.push({ c: ent[i], p: ent.length - 1 - i });
  for(let i = 0; i < dec.length; i++) t.push({ c: dec[i], p: -(i + 1) });
  return t;
}
// Nombre au hasard : entre 1 et max, avec au plus `dec` décimales (sans zéro final inutile).
// Programme : au CM1, décimaux jusqu'aux centièmes ; au CM2, jusqu'aux millièmes.
function cvDecOk(n){ const r = cvRang(), max = r === 0 ? 2 : r === 1 ? 3 : 6; return n.d === '0' || n.e >= -max; }
function cvNombreAlea(max, dec){
  const nd = cvAlea(0, dec), ent = cvAlea(nd ? 0 : 1, max);
  let frac = ''; for(let i = 0; i < nd; i++) frac += String(i === nd - 1 ? cvAlea(1, 9) : cvAlea(0, 9));
  return cvLire(ent + (frac ? ',' + frac : ''));
}

/* ----------------------------------------- Page ----------------------------------------- */
const CV_OUTILS = [
  { id: 'glisse', titre: '× et ÷ par 10, 100, 1000', icone: 'swap_horiz', coul: '#D32F2F', des: 'Le chiffre des unités est en rouge : fais glisser le nombre pour l\'amener sur la dizaine, la centaine…', des6: true, des2: 'CM1' },
  { id: 'unites', titre: 'Unités : m, g, L', icone: 'straighten', coul: '#0C5BA0', des: 'Longueurs, masses, contenances. Au CM : on part de la relation entre les unités (1 m = 100 cm). Au collège : on déplace la virgule dans le tableau.', des2: 'CM1' },
  { id: 'aires', titre: 'Aires', icone: 'crop_square', coul: '#1F7A4D', des: 'm², cm², ha… Deux colonnes par unité : la virgule saute de deux en deux.', des2: '6e' },
  { id: 'volumes', titre: 'Volumes', icone: 'view_in_ar', coul: '#7B3FA0', des: 'm³, dm³, cm³ et les litres. Trois colonnes par unité.', des2: '5e' },
];
function cvNiveauDefaut(){
  try{ const s = localStorage.getItem('cvNiveau'); if(CV_NIVEAUX.includes(s)) return s; }catch(e){}
  try{
    const l = (typeof accountClassesList !== 'undefined' && accountClassesList) || [];
    const c = l.find(x => typeof currentClassId !== 'undefined' && x.id === currentClassId) || l[0];
    const n = c && String(c.niveau || '');
    const m = CV_NIVEAUX.find(x => x.toLowerCase() === n.toLowerCase());
    if(m) return m;
  }catch(e){}
  return 'CM2';
}
function renderConvertisseur(){
  const root = document.getElementById('convertisseurRoot'); if(!root) return;
  if(!cv.niveau) cv.niveau = cvNiveauDefaut();
  const niv = `<div class="cv-niv"><span>Niveau</span>${CV_NIVEAUX.map(n => `<button type="button" class="${n === cv.niveau ? 'on' : ''}" onclick="cvChoisirNiveau('${n}')">${n}</button>`).join('')}</div>`;
  if(!cv.outil){
    root.innerHTML = `${niv}<div class="cv-tuiles">${CV_OUTILS.map(o => {
      const tot = CV_NIVEAUX.indexOf(o.des2) > cvRang();
      return `<button type="button" class="cv-tuile" style="--c:${o.coul}" onclick="cvOuvrir('${o.id}')"><span class="gicon">${o.icone}</span><b>${o.titre}</b><small>${o.des}</small>${tot ? `<em>à partir de la ${o.des2}</em>` : ''}</button>`; }).join('')}</div>`;
    return;
  }
  const o = CV_OUTILS.find(x => x.id === cv.outil);
  root.innerHTML = `${niv}<div id="cvPlein"><div class="cv-tete"><button type="button" class="btn secondary cv-hors-plein" onclick="cvOuvrir(null)"><span class="gicon">arrow_back</span> Tous les convertisseurs</button>
    <h2 style="--c:${o.coul}"><span class="gicon">${o.icone}</span> ${o.titre}</h2>
    <button type="button" class="btn secondary cv-plein-btn" onclick="cvPleinEcran()" title="Plein écran (vidéoprojecteur) -- Échap pour sortir"><span class="gicon" id="cvPleinIco">fullscreen</span> <span id="cvPleinTxt">Plein écran</span></button></div><div id="cvOutil"></div></div>`;
  if(cv.outil === 'glisse') gaRendre(); else tcRendre();
}
// Demandé : « Permettre le plein écran. » L'outil ouvert (titre, tableau, flèches) occupe tout l'écran
// et grossit pour être lu au fond de la classe ; Échap ou le bouton pour sortir.
function cvPleinEcran(){
  const el = document.getElementById('cvPlein'); if(!el) return;
  if(document.fullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  else { const f = el.requestFullscreen || el.webkitRequestFullscreen; if(f) f.call(el); }
}
document.addEventListener('fullscreenchange', () => {
  const on = !!(document.fullscreenElement && document.fullscreenElement.id === 'cvPlein');
  const i = document.getElementById('cvPleinIco'), t = document.getElementById('cvPleinTxt');
  if(i) i.textContent = on ? 'fullscreen_exit' : 'fullscreen'; if(t) t.textContent = on ? 'Quitter le plein écran' : 'Plein écran';
});
function cvChoisirNiveau(n){
  cv.niveau = n; try{ localStorage.setItem('cvNiveau', n); }catch(e){}
  if(cv.ga) cv.ga.ex = null; if(cv.tc) cv.tc.ex = null;
  if(cv.outil === 'glisse' && cv.ga && !gaOps().some(op => op.k === cv.ga.k)) cv.ga.k = 1;
  renderConvertisseur();
}
function cvOuvrir(id){
  cv.outil = id;
  if(id === 'unites' || id === 'aires' || id === 'volumes'){
    const g = id === 'aires' ? 'aire' : id === 'volumes' ? 'volume' : ((cv.tc && CV_TABLES[cv.tc.g] && !['aire', 'volume'].includes(cv.tc.g)) ? cv.tc.g : 'longueur');
    tcInit(g);
  }
  if(id === 'glisse' && (!cv.ga || cv.ga.embed)) cv.ga = { n: cvLire('34,5'), k: 2, s: 0, ex: null, score: [0, 0] };
  renderConvertisseur();
  document.getElementById('convertisseurRoot')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

/* ------------------------- Outil 1 : × et ÷ par 10, 100, 1000 (le nombre glisse) ------------------------- */
const GA_PMAX = 5, GA_PMIN = -4, GA_W = 62;
const GA_RANGS = { 5: ['CM', 'centaines de mille'], 4: ['DM', 'dizaines de mille'], 3: ['UM', 'unités de mille'], 2: ['C', 'centaines'], 1: ['D', 'dizaines'], 0: ['U', 'unités'],
  '-1': ['d', 'dixièmes'], '-2': ['c', 'centièmes'], '-3': ['m', 'millièmes'], '-4': ['dm', 'dix-millièmes'] };
// Programme du cycle 3 (BO) : CM1 « multiplier un nombre entier par 10, 100 ou 1 000, multiplier un
// nombre décimal par 10, diviser un nombre décimal par 10 » ; CM2 : × et ÷ par 10, 100, 1 000 des
// décimaux ; 6e : « multiplier par 0,1, par 0,01 et par 0,001 ».
function gaOps(){
  const l = [1, 2, 3].map(k => ({ k, txt: '× ' + '1' + '0'.repeat(k) })).concat((cvRang() === 0 ? [1] : [1, 2, 3]).map(k => ({ k: -k, txt: '÷ ' + '1' + '0'.repeat(k) })));
  if(cvRang() >= 2) [1, 2, 3].forEach(k => l.push({ k: -k, txt: '× 0,' + '0'.repeat(k - 1) + '1', mul: true }));
  return l;
}
function gaOpTxt(g){ return g.op ? g.op.txt : (g.k > 0 ? '× 1' + '0'.repeat(g.k) : '÷ 1' + '0'.repeat(-g.k)); }
function gaCol(p){ return GA_PMAX - p; }
function gaTient(n, s){ return cvChiffres(n).every(t => t.p + s <= GA_PMAX && t.p + s >= GA_PMIN); }
function gaRendre(){
  const g = cv.ga, box = document.getElementById(g.embed ? 'tcGlisse' : 'cvOutil'); if(!box) return;
  const ex = g.ex;
  const ops = gaOps();
  box.innerHTML = `<div class="${g.embed ? 'cv-integre' : 'cv-carte'}">
    ${g.embed ? '' : `<div class="cv-mode">${ex ? `<span class="cv-ex-t"><span class="gicon">fitness_center</span> Exercice</span> <span class="cv-score">${g.score[0]} / ${g.score[1]}</span>
        <button type="button" class="btn secondary" onclick="gaLibre()">Mode libre</button>`
      : `<label>Nombre <input type="text" inputmode="decimal" id="gaNombre" value="${cvEcrire(g.n).replace(/ /g, '')}" onchange="gaNombre(this.value)" style="width:120px;"></label>
        <span class="cv-ops">${ops.map(op => `<button type="button" class="${gaOpTxt(g) === op.txt ? 'on' : ''}" onclick="gaOp(${op.k},'${op.txt}')">${op.txt}</button>`).join('')}</span>
        <button type="button" class="btn" onclick="gaExercice()"><span class="gicon">fitness_center</span> Exercice</button>`}</div>`}
    <p class="cv-consigne" id="gaConsigne"></p>
    <div class="cv-glisse"><button type="button" class="cv-fleche" onclick="gaBouger(1)" title="Faire glisser vers la gauche (× 10)" aria-label="Glisser à gauche">◀</button>
      <div class="cv-defil"><div class="cv-ga-tab" id="gaTab" style="width:${(GA_PMAX - GA_PMIN + 1) * GA_W}px"></div></div>
      <button type="button" class="cv-fleche" onclick="gaBouger(-1)" title="Faire glisser vers la droite (÷ 10)" aria-label="Glisser à droite">▶</button></div>
    <p class="cv-aide">Flèches ◀ ▶ (ou touches ← → du clavier) : le nombre glisse d'une colonne. La virgule, elle, ne bouge jamais.</p>
    <div class="cv-res" id="gaRes"></div>
    ${ex && !g.embed ? `<div class="cv-rep"><label>${cvEcrire(g.n)} ${gaOpTxt(g)} = <input type="text" inputmode="decimal" id="gaRep" style="width:140px;" onkeydown="if(event.key==='Enter')gaVerifier()" ${ex.fait ? 'disabled' : ''}></label>
      ${ex.fait ? `<button type="button" class="btn" onclick="gaExercice()">Suivant <span class="gicon">arrow_forward</span></button>` : `<button type="button" class="btn" onclick="gaVerifier()">Vérifier</button>`}<span id="gaVerdict" class="cv-verdict ${ex.ok === true ? 'ok' : ex.ok === false ? 'ko' : ''}">${ex.msg || ''}</span></div>` : ''}
  </div>`;
  gaTableau(true);
}
function gaTableau(init){
  const tab = document.getElementById('gaTab'); if(!tab) return;
  const g = cv.ga, toks = cvChiffres(g.n).map(t => ({ c: t.c, p: t.p, q: t.p + g.s })), cible = g.k;
  if(init){
    let h = '';
    for(let p = GA_PMAX; p >= GA_PMIN; p--){
      const [ab, nom] = GA_RANGS[p], cls = p >= 3 ? 'mille' : p >= 0 ? 'simple' : 'dec';
      h += `<div class="cv-ga-col ${cls}${p === 0 ? ' u' : ''}" data-p="${p}" style="left:${gaCol(p) * GA_W}px;width:${GA_W}px"><div class="cv-ga-h" title="${nom}">${ab}</div></div>`;
    }
    h += `<div class="cv-ga-virg" style="left:${gaCol(0) * GA_W + GA_W - 7}px">,</div><div id="gaCases"></div><div id="gaToks"></div>`;
    tab.innerHTML = h;
    tab.querySelector('#gaToks').innerHTML = cvChiffres(g.n).map((t, i) => `<span class="cv-tok${t.p === 0 ? ' rouge' : ''}" data-i="${i}">${t.c}</span>`).join('');
  }
  tab.querySelectorAll('.cv-ga-col').forEach(c => c.classList.toggle('cible', Number(c.dataset.p) === cible));
  // zéros utiles à ajouter (orange) et zéros devenus inutiles (estompés)
  const qs = toks.map(t => t.q), nz = toks.filter(t => t.c !== '0').map(t => t.q);
  const hi = Math.max(...qs, 0), lo = Math.min(...qs, 0), hiNz = nz.length ? Math.max(...nz) : 0, loNz = nz.length ? Math.min(...nz) : 0;
  let cases = '';
  for(let q = hi; q >= lo; q--) if(!qs.includes(q) && q <= GA_PMAX && q >= GA_PMIN){
    const inutile = (q > Math.max(hiNz, 0)) || (q < 0 && q < loNz);
    if(!inutile) cases += `<span class="cv-tok ajout" style="left:${gaCol(q) * GA_W}px">0</span>`;
  }
  tab.querySelector('#gaCases').innerHTML = cases;
  tab.querySelectorAll('#gaToks .cv-tok').forEach(el => {
    const t = toks[Number(el.dataset.i)];
    el.style.left = gaCol(t.q) * GA_W + 'px';
    el.classList.toggle('inutile', t.c === '0' && ((t.q > Math.max(hiNz, 0)) || (t.q < 0 && t.q < loNz)));
  });
  const val = cvDecaler(g.n, g.s), rang = GA_RANGS[cible] ? GA_RANGS[cible][1] : '';
  const c = document.getElementById('gaConsigne');
  if(c) c.innerHTML = `<b>${cvEcrire(g.n)} ${gaOpTxt(g)}</b> : amène le chiffre des unités <span class="cv-rouge">en rouge</span> dans la colonne des <b>${cvEsc(rang)}</b> (${g.k > 0 ? 'le nombre devient plus grand : il glisse vers la gauche' : 'le nombre devient plus petit : il glisse vers la droite'}).`;
  const r = document.getElementById('gaRes');
  if(r){
    const ok = g.s === g.k;
    r.className = 'cv-res' + (ok ? ' ok' : '');
    r.innerHTML = ok ? (g.cache ? '<span class="gicon">check_circle</span> Le chiffre rouge est à la bonne place : lis le nombre obtenu et écris la conversion ci-dessous.' : g.ex && !g.ex.fait ? '<span class="gicon">check_circle</span> Le chiffre rouge est à la bonne place : lis le nombre obtenu et écris-le ci-dessous.'
        : `<span class="gicon">check_circle</span> ${cvEcrire(g.n)} ${gaOpTxt(g)} = <b>${cvEcrire(val)}</b>${g.suite ? g.suite(val) : ''}`)
      : g.s === 0 ? 'Utilise les flèches pour faire glisser le nombre.'
      : `Le chiffre rouge est dans la colonne des ${cvEsc(GA_RANGS[g.s] ? GA_RANGS[g.s][1] : '')}${(g.ex && !g.ex.fait) || g.cache ? '' : ` : le nombre vaut maintenant ${cvEcrire(val)}`}. ${Math.abs(g.s) > Math.abs(g.k) || Math.sign(g.s) !== Math.sign(g.k) ? 'Trop loin ou mauvais sens !' : 'Continue…'}`;
  }
}
function gaBouger(d){
  const g = cv.ga; if(!g) return;
  if(!gaTient(g.n, g.s + d)) return;
  g.s += d; gaTableau(false);
}
function gaNombre(v){
  const n = cvLire(v), g = cv.ga;
  if(!n || !gaTient(n, 0) || !gaTient(n, g.k)){ const r = document.getElementById('gaRes'); if(r) r.textContent = 'Nombre non valable (ou trop long pour le tableau) : écris par exemple 34,5 ou 1 250.'; return; }
  g.n = n; g.s = 0; gaRendre();
}
function gaOp(k, txt){ const g = cv.ga; if(!gaTient(g.n, k)){ const r = document.getElementById('gaRes'); if(r) r.textContent = 'Ce nombre sortirait du tableau : choisis un nombre plus court.'; return; } g.k = k; g.op = gaOps().find(o => o.txt === txt); g.s = 0; gaRendre(); }
function gaLibre(){ cv.ga.ex = null; cv.ga.s = 0; gaRendre(); }
function gaExercice(){
  const g = cv.ga, r = cvRang();
  for(let essai = 0; essai < 50; essai++){
    const op = cvPioche(gaOps());
    // CM1 : × 10, 100, 1 000 sur des entiers ; × 10 et ÷ 10 aussi sur des décimaux (un chiffre après la virgule).
    const n = r === 0 ? (op.k > 1 ? cvNombreAlea(999, 0) : cvNombreAlea(99, 1)) : r === 1 ? cvNombreAlea(999, 2) : cvNombreAlea(9999, 3);
    if(n.d === '0' || !gaTient(n, 0) || !gaTient(n, op.k) || !cvDecOk(n) || !cvDecOk(cvDecaler(n, op.k))) continue;
    Object.assign(g, { n, k: op.k, op, s: 0, ex: { fait: false } });
    gaRendre(); document.getElementById('gaRep')?.focus(); return;
  }
}
function gaVerifier(){
  const g = cv.ga, ex = g.ex; if(!ex || ex.fait) return;
  const rep = cvLire(document.getElementById('gaRep').value), att = cvDecaler(g.n, g.k);
  if(!rep){ ex.ok = null; ex.msg = 'Écris un nombre (avec une virgule si besoin).'; gaRendre(); return; }
  ex.fait = true; ex.ok = cvEgal(rep, att); g.score[1]++; if(ex.ok) g.score[0]++;
  ex.msg = ex.ok ? '✔ Bravo !' : `✘ La bonne réponse est ${cvEcrire(att)}.`;
  g.s = g.k; gaRendre();
  const i = document.getElementById('gaRep'); if(i) i.value = cvEcrire(rep);
}
document.addEventListener('keydown', e => {
  if(!document.getElementById('gaTab') || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '')) return;
  if(e.key === 'ArrowLeft'){ e.preventDefault(); gaBouger(1); }
  if(e.key === 'ArrowRight'){ e.preventDefault(); gaBouger(-1); }
});

/* ----------------------- Outils 2 à 4 : tableaux de conversion (la virgule se déplace) ----------------------- */
// Colonnes de gauche à droite. `u` : unité dont le chiffre des unités va dans cette colonne ;
// `g` : unité du groupe (aires : 2 colonnes, volumes : 3) ; `x` : libellé en dessous (ha, a, ca, hL...).
function cvTableSimple(units){ return units.map(u => ({ u, g: u })); }
function cvTableGroupes(groupes, n, extra){
  const cols = [];
  groupes.forEach(gr => { for(let i = 0; i < n; i++) cols.push({ g: gr, u: i === n - 1 ? gr : null, x: (extra && extra[gr] && extra[gr][i]) || null, debut: i === 0 }); });
  return cols;
}
const CV_TABLES = {
  longueur: { nom: 'Longueurs', cols: cvTableSimple(['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']) },
  masse: { nom: 'Masses', cols: [{ u: 't', g: 't' }, { u: null, g: '' }, { u: null, g: '' }].concat(cvTableSimple(['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg'])) },
  contenance: { nom: 'Contenances', cols: cvTableSimple(['hL', 'daL', 'L', 'dL', 'cL', 'mL']) },
  aire: { nom: 'Aires', cols: cvTableGroupes(['km²', 'hm²', 'dam²', 'm²', 'dm²', 'cm²', 'mm²'], 2, { 'hm²': [null, 'ha'], 'dam²': [null, 'a'], 'm²': [null, 'ca'] }), alias: { ha: 'hm²', a: 'dam²', ca: 'm²' } },
  volume: { nom: 'Volumes', cols: cvTableGroupes(['m³', 'dm³', 'cm³', 'mm³'], 3, { 'dm³': ['hL', 'daL', 'L'], 'cm³': ['dL', 'cL', 'mL'] }) },
};
// Unités proposées dans les listes, et colonne de leur chiffre des unités.
function cvUnites(g){
  const t = CV_TABLES[g], l = [];
  t.cols.forEach((c, i) => { if(c.u) l.push([c.u, i]); if(c.x && g === 'volume') l.push([c.x, i]); if(c.x && g === 'aire') l.push([c.x, i]); });
  return l;
}
function cvColUnite(g, u){ const f = cvUnites(g).find(x => x[0] === u); return f ? f[1] : -1; }
// Unité colorée : préfixe en couleur, unité de base en noir.
function cvUniteHtml(u){
  if(!u) return '';
  const m = /^(da|k|h|d|c|m)?(m|g|L|a)([²³]?)$/.exec(u);
  if(!m || u === 't' || u === 'q') return `<span class="cv-u">${cvEsc(u)}</span>`;
  const pre = m[1] || '';
  return `<span class="cv-u">${pre ? `<b style="color:${CV_PREF_COUL[pre]}">${pre}</b>` : ''}${m[2]}${m[3]}</span>`;
}
function tcInit(g){
  const t = CV_TABLES[g], u = cvUnites(g), d = { longueur: ['m', 'cm'], masse: ['kg', 'g'], contenance: ['L', 'cL'], aire: ['m²', 'dm²'], volume: ['dm³', 'cm³'] }[g];
  cv.tc = { g, n: cvLire(g === 'volume' ? '2,5' : '3,45'), src: d[0], tgt: d[1], v: cvColUnite(g, d[0]), ex: null, score: (cv.tc && cv.tc.score) || [0, 0] };
  void t; void u;
}
/* Programme du cycle 3 : « au cours moyen, les élèves n'utilisent pas de tableaux pour effectuer des
   conversions ; ils s'appuient sur les relations connues entre les unités en jeu, comme par exemple :
   3,5 mètres est égal à 350 centimètres, car 1 mètre est égal à 100 centimètres. » Au CM1 et au CM2,
   l'outil Unités présente donc les unités (préfixes en couleur, × 10 d'une unité à la suivante), écrit la
   relation (1 m = 100 cm, donc 3,45 m = 3,45 × 100 cm) et fait le calcul avec le glisse-nombre. Le
   tableau où l'on déplace la virgule est réservé au collège. */
function tcCoursMoyen(){ return cvRang() <= 1 && !['aire', 'volume'].includes(cv.tc.g); }
function tcRelation(){
  const tc = cv.tc, a = cvColUnite(tc.g, tc.src), b = cvColUnite(tc.g, tc.tgt), k = b - a, p = '1' + '0'.repeat(Math.abs(k));
  const P = x => x.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
  if(k === 0) return { k, html: 'Les deux unités sont les mêmes.' };
  return { k, html: k > 0
    ? `<b>1 ${cvUniteHtml(tc.src)} = ${P(p)} ${cvUniteHtml(tc.tgt)}</b>, donc ${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)} = ${cvEcrire(tc.n)} × ${P(p)} ${cvUniteHtml(tc.tgt)}.`
    : `<b>${P(p)} ${cvUniteHtml(tc.src)} = 1 ${cvUniteHtml(tc.tgt)}</b>, donc ${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)} = ${cvEcrire(tc.n)} ÷ ${P(p)} ${cvUniteHtml(tc.tgt)}.` };
}
function tcRendreCM(){
  const box = document.getElementById('cvOutil'); if(!box) return;
  const tc = cv.tc, ex = tc.ex, us = cvUnites(tc.g);
  const opt = sel => us.map(([u]) => `<option value="${cvEsc(u)}" ${u === sel ? 'selected' : ''}>${cvEsc(u)}</option>`).join('');
  const rel = tcRelation(), unites = CV_TABLES[tc.g].cols.filter(c => c.u);
  box.innerHTML = `<div class="cv-carte">
    <div class="cv-onglets">${['longueur', 'masse', 'contenance'].map(g => `<button type="button" class="${g === tc.g ? 'on' : ''}" onclick="tcGrandeur('${g}')">${CV_TABLES[g].nom} (${{ longueur: 'm', masse: 'g', contenance: 'L' }[g]})</button>`).join('')}</div>
    <div class="cv-mode">${ex ? `<span class="cv-ex-t"><span class="gicon">fitness_center</span> Exercice</span> <span class="cv-score">${tc.score[0]} / ${tc.score[1]}</span>
        <button type="button" class="btn secondary" onclick="tcLibre()">Mode libre</button>`
      : `<label>Convertir <input type="text" inputmode="decimal" id="tcNombre" value="${cvEcrire(tc.n).replace(/\u202f/g, '')}" onchange="tcNombre(this.value)" style="width:110px;"></label>
        <select onchange="tcUnite('src',this.value)">${opt(tc.src)}</select> <span>en</span> <select onchange="tcUnite('tgt',this.value)">${opt(tc.tgt)}</select>
        <button type="button" class="btn" onclick="tcExercice()"><span class="gicon">fitness_center</span> Exercice</button>`}</div>
    <p class="cv-consigne">Convertir <b>${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)}</b> en <b>${cvUniteHtml(tc.tgt)}</b>.</p>
    <div class="cv-chaine">${unites.map((c, i) => `${i ? '<span class="cv-fois">× 10 ▸</span>' : ''}<span class="cv-maillon${c.u === tc.src ? ' src' : ''}${c.u === tc.tgt ? ' tgt' : ''}">${cvUniteHtml(c.u)}</span>`).join('')}</div>
    <p class="cv-aide" style="margin-top:2px;">D'une unité à la suivante (vers la droite), on multiplie par 10. Les préfixes : <b style="color:${CV_PREF_COUL.k}">kilo</b> = 1 000, <b style="color:${CV_PREF_COUL.h}">hecto</b> = 100, <b style="color:${CV_PREF_COUL.da}">déca</b> = 10, <b style="color:${CV_PREF_COUL.d}">déci</b> = un dixième, <b style="color:${CV_PREF_COUL.c}">centi</b> = un centième, <b style="color:${CV_PREF_COUL.m}">milli</b> = un millième.</p>
    <div class="cv-relation"><span class="gicon">lightbulb</span> <span>${rel.html}</span></div>
    ${rel.k ? '<div id="tcGlisse"></div>' : ''}
    ${ex ? `<div class="cv-rep"><label>${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)} = <input type="text" inputmode="decimal" id="tcRep" style="width:140px;" onkeydown="if(event.key==='Enter')tcVerifier()" ${ex.fait ? 'disabled' : ''}> ${cvUniteHtml(tc.tgt)}</label>
      ${ex.fait ? `<button type="button" class="btn" onclick="tcExercice()">Suivant <span class="gicon">arrow_forward</span></button>` : `<button type="button" class="btn" onclick="tcVerifier()">Vérifier</button>`}<span class="cv-verdict ${ex.ok === true ? 'ok' : ex.ok === false ? 'ko' : ''}">${ex.msg || ''}</span></div>` : ''}
  </div>`;
  if(rel.k){
    const src = tc.src, tgt = tc.tgt, n = tc.n;
    cv.ga = { embed: true, n, k: rel.k, s: 0, ex: null, score: [0, 0], cache: !!(ex && !ex.fait),
      op: { k: rel.k, txt: (rel.k > 0 ? '× 1' : '÷ 1') + '0'.repeat(Math.abs(rel.k)) },
      suite: v => `, donc ${cvEcrire(n)} ${cvUniteHtml(src)} = <b>${cvEcrire(v)}</b> ${cvUniteHtml(tgt)}` };
    if(gaTient(n, 0) && gaTient(n, rel.k)) gaRendre();
    else document.getElementById('tcGlisse').innerHTML = `<div class="cv-res ok">${cvEcrire(n)} ${cvUniteHtml(src)} = <b>${cvEcrire(cvDecaler(n, rel.k))}</b> ${cvUniteHtml(tgt)}</div>`;
  }
}
function tcRendre(){
  if(tcCoursMoyen()) return tcRendreCM();
  const box = document.getElementById('cvOutil'); if(!box) return;
  const tc = cv.tc, ex = tc.ex, us = cvUnites(tc.g);
  const opt = sel => us.map(([u]) => `<option value="${cvEsc(u)}" ${u === sel ? 'selected' : ''}>${cvEsc(u)}</option>`).join('');
  box.innerHTML = `<div class="cv-carte">
    ${cv.outil === 'unites' ? `<div class="cv-onglets">${['longueur', 'masse', 'contenance'].map(g => `<button type="button" class="${g === tc.g ? 'on' : ''}" onclick="tcGrandeur('${g}')">${CV_TABLES[g].nom} (${{ longueur: 'm', masse: 'g', contenance: 'L' }[g]})</button>`).join('')}</div>` : ''}
    <div class="cv-mode">${ex ? `<span class="cv-ex-t"><span class="gicon">fitness_center</span> Exercice</span> <span class="cv-score">${tc.score[0]} / ${tc.score[1]}</span>
        <button type="button" class="btn secondary" onclick="tcLibre()">Mode libre</button>`
      : `<label>Convertir <input type="text" inputmode="decimal" id="tcNombre" value="${cvEcrire(tc.n).replace(/ /g, '')}" onchange="tcNombre(this.value)" style="width:110px;"></label>
        <select onchange="tcUnite('src',this.value)">${opt(tc.src)}</select> <span>en</span> <select onchange="tcUnite('tgt',this.value)">${opt(tc.tgt)}</select>
        <button type="button" class="btn" onclick="tcExercice()"><span class="gicon">fitness_center</span> Exercice</button>`}</div>
    <p class="cv-consigne" id="tcConsigne"></p>
    ${tc.g === 'aire' || tc.g === 'volume' ? '' : `<div class="cv-relation"><span class="gicon">lightbulb</span> <span>${tcRelation().html}</span></div>`}
    <div class="cv-glisse"><button type="button" class="cv-fleche" onclick="tcBouger(-1)" title="Virgule vers la gauche" aria-label="Virgule à gauche">◀</button>
      <div class="cv-defil"><div class="cv-tc" id="tcTab"></div></div>
      <button type="button" class="cv-fleche" onclick="tcBouger(1)" title="Virgule vers la droite" aria-label="Virgule à droite">▶</button></div>
    <p class="cv-aide">Le chiffre des unités (en rouge) est dans la colonne de l'unité de départ. Déplace la <b>virgule</b> avec les flèches ◀ ▶ (ou ← →) : elle doit se placer juste après la colonne de l'unité voulue${tc.g === 'aire' ? ' (2 colonnes par unité d\'aire)' : tc.g === 'volume' ? ' (3 colonnes par unité de volume)' : ''}. Les zéros à ajouter apparaissent en orange.</p>
    <div class="cv-res" id="tcRes"></div>
    ${ex ? `<div class="cv-rep"><label>${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)} = <input type="text" inputmode="decimal" id="tcRep" style="width:140px;" onkeydown="if(event.key==='Enter')tcVerifier()" ${ex.fait ? 'disabled' : ''}> ${cvUniteHtml(tc.tgt)}</label>
      ${ex.fait ? `<button type="button" class="btn" onclick="tcExercice()">Suivant <span class="gicon">arrow_forward</span></button>` : `<button type="button" class="btn" onclick="tcVerifier()">Vérifier</button>`}<span class="cv-verdict ${ex.ok === true ? 'ok' : ex.ok === false ? 'ko' : ''}">${ex.msg || ''}</span></div>`
      : `<div class="cv-rep"><button type="button" class="btn secondary" onclick="tcMontrer()"><span class="gicon">play_arrow</span> Montrer</button></div>`}
  </div>`;
  tcTableau();
}
function tcCols(){
  // Colonnes affichées : celles du tableau, plus des colonnes vides si le nombre déborde.
  const tc = cv.tc, t = CV_TABLES[tc.g], s = cvColUnite(tc.g, tc.src), toks = cvChiffres(tc.n).map(x => s - x.p);
  const lo = Math.min(0, ...toks, tc.v, cvColUnite(tc.g, tc.tgt)), hi = Math.max(t.cols.length - 1, ...toks, tc.v + 1);
  return { lo, hi, s };
}
function tcTableau(){
  const tab = document.getElementById('tcTab'); if(!tab) return;
  const tc = cv.tc, t = CV_TABLES[tc.g], { lo, hi, s } = tcCols(), W = tc.g === 'longueur' || tc.g === 'contenance' ? 66 : tc.g === 'masse' ? 58 : 48;
  const cible = cvColUnite(tc.g, tc.tgt), x = i => (i - lo) * W, n = hi - lo + 1, groupes = tc.g === 'aire' || tc.g === 'volume';
  const toks = cvChiffres(tc.n).map(k => ({ c: k.c, col: s - k.p, rouge: k.p === 0 }));
  // lecture avec la virgule après la colonne v : rang q = v - col
  const qs = toks.map(k => tc.v - k.col), nz = toks.filter(k => k.c !== '0').map(k => tc.v - k.col);
  const hiQ = Math.max(...qs, 0), loQ = Math.min(...qs, 0), hiNz = nz.length ? Math.max(...nz) : 0, loNz = nz.length ? Math.min(...nz) : 0;
  const inutile = q => q > Math.max(hiNz, 0) || (q < 0 && q < loNz);
  let h = '';
  for(let i = lo; i <= hi; i++){
    const c = t.cols[i] || { g: '', u: null };
    const pre = c.g ? (/^(da|k|h|d|c|m)?(m|g|L)/.exec(c.g) || [])[1] || '' : '';
    const fond = c.g && CV_PREF_COUL[pre] !== undefined && c.g !== 't' && c.g !== 'q' ? CV_PREF_COUL[pre] : '#8A919C';
    h += `<div class="cv-tc-col${c.debut || !groupes ? ' debut' : ''}${i === cible ? ' cible' : ''}${i === s ? ' source' : ''}" style="left:${x(i)}px;width:${W}px;--f:${fond}">${!groupes ? `<div class="cv-tc-h">${cvUniteHtml(c.u)}</div>` : ''}${c.x ? `<div class="cv-tc-x">${cvUniteHtml(c.x)}</div>` : groupes && t.cols.some(k => k.x) ? '<div class="cv-tc-x"></div>' : ''}</div>`;
  }
  if(groupes){ // en-têtes de groupe (m², dm²... sur 2 ou 3 colonnes)
    const per = tc.g === 'aire' ? 2 : 3;
    t.cols.forEach((c, i) => { if(c.debut && i >= lo && i + per - 1 <= hi) h += `<div class="cv-tc-gh" style="left:${x(i)}px;width:${W * per}px">${cvUniteHtml(c.g)}</div>`; });
  }
  for(let q = hiQ; q >= loQ; q--){ const col = tc.v - q; if(!qs.includes(q) && !inutile(q)) h += `<span class="cv-tok ajout tc" style="left:${x(col)}px;width:${W}px">0</span>`; }
  toks.forEach((k, j) => { h += `<span class="cv-tok tc${k.rouge ? ' rouge' : ''}${k.c === '0' && inutile(qs[j]) ? ' inutile' : ''}" style="left:${x(k.col)}px;width:${W}px">${k.c}</span>`; });
  h += `<div class="cv-tc-virg" style="left:${x(tc.v) + W - 8}px">,</div>`;
  tab.style.width = n * W + 'px'; tab.classList.toggle('groupes', groupes); tab.classList.toggle('lignex', groupes && t.cols.some(k => k.x));
  tab.innerHTML = h;
  const val = cvDecaler(tc.n, tc.v - s), ok = tc.v === cible, cu = (t.cols[tc.v] || {});
  const lu = cu.u || cu.x;
  const c = document.getElementById('tcConsigne');
  if(c) c.innerHTML = `Convertir <b>${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)}</b> en <b>${cvUniteHtml(tc.tgt)}</b> : place la virgule juste après la colonne des ${cvUniteHtml(tc.tgt)} <span class="cv-cible-ex">(colonne encadrée)</span>.`;
  const r = document.getElementById('tcRes');
  if(r){
    r.className = 'cv-res' + (ok ? ' ok' : '');
    r.innerHTML = ok ? (tc.ex && !tc.ex.fait ? '<span class="gicon">check_circle</span> La virgule est au bon endroit : lis le nombre et écris-le ci-dessous.'
        : `<span class="gicon">check_circle</span> ${cvEcrire(tc.n)} ${cvUniteHtml(tc.src)} = <b>${cvEcrire(val)}</b> ${cvUniteHtml(tc.tgt)}`)
      : lu && !(tc.ex && !tc.ex.fait) ? `Virgule après la colonne des ${cvUniteHtml(lu)} : ${cvEcrire(val)} ${cvUniteHtml(lu)}. Continue jusqu'aux ${cvUniteHtml(tc.tgt)}.`
      : 'Déplace la virgule avec les flèches.';
  }
}
function tcBouger(d){
  const tc = cv.tc; if(!tc) return;
  const nv = tc.v + d, t = CV_TABLES[tc.g];
  if(nv < -6 || nv > t.cols.length + 5) return;
  tc.v = nv; tcTableau();
}
function tcMontrer(){
  const tc = cv.tc, cible = cvColUnite(tc.g, tc.tgt);
  clearInterval(tc.anim);
  tc.anim = setInterval(() => { if(!cv.tc || cv.tc !== tc || tc.v === cible){ clearInterval(tc.anim); return; } tc.v += Math.sign(cible - tc.v); tcTableau(); }, 450);
}
function tcGrandeur(g){ tcInit(g); tcRendre(); }
function tcNombre(v){ const n = cvLire(v); if(!n){ const r = document.getElementById('tcRes'); if(r) r.textContent = 'Nombre non valable : écris par exemple 3,45 ou 1 250.'; return; } cv.tc.n = n; cv.tc.v = cvColUnite(cv.tc.g, cv.tc.src); tcRendre(); }
function tcUnite(k, u){ const tc = cv.tc; tc[k] = u; tc.v = cvColUnite(tc.g, tc.src); tcRendre(); }
function tcLibre(){ cv.tc.ex = null; tcRendre(); }
// Exercices selon le niveau.
const CV_POOLS = {
  longueur: [['km', 'm', 'cm', 'mm'], ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']],
  masse: [['kg', 'g'], ['t', 'kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg']],
  contenance: [['L', 'cL', 'mL'], ['hL', 'daL', 'L', 'dL', 'cL', 'mL']],
  aire: [['m²', 'dm²', 'cm²'], ['km²', 'hm²', 'dam²', 'm²', 'dm²', 'cm²', 'mm²', 'ha', 'a']],
  volume: [['m³', 'dm³', 'cm³', 'L', 'mL'], ['m³', 'dm³', 'cm³', 'mm³', 'hL', 'L', 'dL', 'cL', 'mL']],
};
function tcExercice(){
  const tc = cv.tc, r = cvRang(), avance = tc.g === 'aire' ? r >= 3 : tc.g === 'volume' ? r >= 4 : r >= 1;
  const pool = CV_POOLS[tc.g][avance ? 1 : 0];
  for(let essai = 0; essai < 80; essai++){
    const a = cvPioche(pool), b = cvPioche(pool); if(a === b) continue;
    const ca = cvColUnite(tc.g, a), cb = cvColUnite(tc.g, b), ecart = Math.abs(ca - cb);
    if(ecart > (tc.g === 'volume' ? 6 : tc.g === 'aire' ? 4 : r <= 1 ? 3 : 6)) continue;
    const n = r === 0 ? cvNombreAlea(ca < cb ? 99 : 9999, ca < cb ? 1 : 0) : cvNombreAlea(999, r >= 2 ? 3 : 2);
    if(n.d === '0') continue;
    const res = cvDecaler(n, cb - ca), txt = cvEcrire(res).replace(/[^\d]/g, '');
    if(txt.length > 9 || !cvDecOk(n) || !cvDecOk(res)) continue;
    if(r <= 1 && !['aire', 'volume'].includes(tc.g) && (!gaTient(n, 0) || !gaTient(n, cb - ca))) continue;
    Object.assign(tc, { n, src: a, tgt: b, v: ca, ex: { fait: false } });
    tcRendre(); document.getElementById('tcRep')?.focus(); return;
  }
}
function tcVerifier(){
  const tc = cv.tc, ex = tc.ex; if(!ex || ex.fait) return;
  const rep = cvLire(document.getElementById('tcRep').value), att = cvDecaler(tc.n, cvColUnite(tc.g, tc.tgt) - cvColUnite(tc.g, tc.src));
  if(!rep){ ex.ok = null; ex.msg = 'Écris un nombre (avec une virgule si besoin).'; tcRendre(); return; }
  ex.fait = true; ex.ok = cvEgal(rep, att); tc.score[1]++; if(ex.ok) tc.score[0]++;
  ex.msg = ex.ok ? '✔ Bravo !' : `✘ La bonne réponse est ${cvEcrire(att)} ${cvEsc(tc.tgt)}.`;
  tc.v = cvColUnite(tc.g, tc.tgt); tcRendre();
  if(tcCoursMoyen() && cv.ga && cv.ga.embed){ cv.ga.s = cv.ga.k; gaTableau(false); }
  const i = document.getElementById('tcRep'); if(i) i.value = cvEcrire(rep);
}
document.addEventListener('keydown', e => {
  if(!document.getElementById('tcTab') || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '')) return;
  if(e.key === 'ArrowLeft'){ e.preventDefault(); tcBouger(-1); }
  if(e.key === 'ArrowRight'){ e.preventDefault(); tcBouger(1); }
});

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .cv-niv{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:10px 0 14px;}
    .cv-niv span{font:600 .8rem 'Space Grotesk',sans-serif;text-transform:uppercase;letter-spacing:.05em;color:#5B6472;margin-right:4px;}
    .cv-niv button{border:1.5px solid rgba(28,43,57,.18);background:#fff;border-radius:999px;padding:5px 14px;font:600 .9rem 'Space Grotesk',sans-serif;cursor:pointer;color:#4E5665;}
    .cv-niv button.on{background:#1C2B39;border-color:#1C2B39;color:#fff;}
    .cv-tuiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;}
    .cv-tuile{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;background:#fff;border:1px solid rgba(28,43,57,.12);border-top:5px solid var(--c);border-radius:16px;padding:16px 18px;cursor:pointer;font:inherit;color:#20242E;transition:transform .15s,box-shadow .15s;}
    .cv-tuile:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(28,43,57,.12);}
    .cv-tuile > .gicon{font-size:2rem;color:var(--c);} .cv-tuile b{font:700 1.15rem 'Space Grotesk',sans-serif;} .cv-tuile small{color:#5B6472;line-height:1.4;}
    .cv-tuile em{position:absolute;top:10px;right:12px;font-style:normal;font-size:.72rem;background:rgba(28,43,57,.07);border-radius:999px;padding:2px 8px;color:#5B6472;}
    .cv-tete{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:10px;}
    .cv-tete h2{margin:0;display:flex;align-items:center;gap:8px;font-family:'Space Grotesk',sans-serif;} .cv-tete h2 .gicon{color:var(--c);}
    .cv-carte{background:#fff;border:1px solid rgba(28,43,57,.12);border-radius:16px;padding:16px 18px;}
    .cv-mode{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;}
    .cv-mode input,.cv-mode select,.cv-rep input{padding:7px 10px;border-radius:9px;border:1.5px solid rgba(28,43,57,.2);font:600 1.05rem 'Space Grotesk',sans-serif;}
    .cv-ops{display:flex;flex-wrap:wrap;gap:5px;}
    .cv-ops button,.cv-onglets button{border:1.5px solid rgba(28,43,57,.15);background:#fff;border-radius:9px;padding:6px 11px;font:700 .95rem 'Space Grotesk',sans-serif;cursor:pointer;color:#20242E;}
    .cv-ops button.on,.cv-onglets button.on{background:#0C5BA0;border-color:#0C5BA0;color:#fff;}
    .cv-onglets{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
    .cv-ex-t{display:inline-flex;align-items:center;gap:5px;font-weight:700;color:#E07B00;} .cv-score{font:700 1.1rem 'Space Grotesk',sans-serif;background:rgba(224,123,0,.1);color:#B05F00;border-radius:999px;padding:2px 12px;}
    .cv-consigne{font-size:1.08rem;margin:14px 0 6px;} .cv-rouge{color:#D32F2F;font-weight:700;} .cv-cible-ex{color:#5B6472;font-size:.9rem;}
    .cv-glisse{display:flex;align-items:center;gap:10px;}
    .cv-fleche{flex:none;width:54px;height:54px;border-radius:50%;border:0;background:#1C2B39;color:#fff;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 10px rgba(28,43,57,.25);}
    .cv-fleche:active{transform:scale(.94);}
    .cv-defil{flex:1;min-width:0;overflow-x:auto;padding:4px 2px 8px;}
    .cv-ga-tab,.cv-tc{position:relative;height:124px;margin:0 auto;}
    .cv-ga-col{position:absolute;top:0;bottom:0;border-left:1px solid rgba(28,43,57,.15);box-sizing:border-box;}
    .cv-ga-col:last-child{border-right:1px solid rgba(28,43,57,.15);}
    .cv-ga-h{height:34px;display:flex;align-items:center;justify-content:center;font:700 .95rem 'Space Grotesk',sans-serif;color:#fff;background:#6B8BB5;cursor:help;}
    .cv-ga-col.mille .cv-ga-h{background:#8A6BB5;} .cv-ga-col.dec .cv-ga-h{background:#4E9A8A;}
    .cv-ga-col.u .cv-ga-h{background:#D32F2F;}
    .cv-ga-col.cible{background:rgba(255,193,7,.16);box-shadow:inset 0 0 0 3px #F2A900;}
    .cv-ga-virg,.cv-tc-virg{position:absolute;top:44px;font:900 3.4rem/1 Arial,sans-serif;color:#D32F2F;pointer-events:none;z-index:3;}
    .cv-tc-virg{transition:left .35s ease;}
    .cv-tok{position:absolute;top:50px;width:62px;text-align:center;font:700 2.6rem/1.3 'Space Grotesk',sans-serif;color:#20242E;transition:left .35s ease,opacity .3s;z-index:2;}
    .cv-tok.rouge{color:#D32F2F;} .cv-tok.ajout{color:#F08C00;animation:cvApparait .35s ease-out;} .cv-tok.inutile{opacity:.25;}
    @keyframes cvApparait{from{opacity:0;transform:scale(1.4);}to{opacity:1;transform:none;}}
    .cv-aide{color:#5B6472;font-size:.88rem;margin:4px 0 0;}
    .cv-res{margin:12px 0 0;padding:10px 14px;border-radius:12px;background:rgba(28,43,57,.05);font-size:1.1rem;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .cv-res.ok{background:#E8F5EA;color:#1E6B34;} .cv-res.ok .gicon{color:#1E7B34;} .cv-res b{font:700 1.35rem 'Space Grotesk',sans-serif;}
    .cv-rep{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px;font-size:1.1rem;}
    .cv-verdict{font-weight:700;} .cv-verdict.ok{color:#1E7B34;} .cv-verdict.ko{color:#C62828;}
    .cv-u{font-weight:700;}
    .cv-tc{height:130px;} .cv-tc.groupes{height:150px;} .cv-tc.lignex{height:176px;}
    .cv-tc-col{position:absolute;top:0;bottom:0;border-left:1px dashed rgba(28,43,57,.18);box-sizing:border-box;}
    .cv-tc-col.debut{border-left:2px solid rgba(28,43,57,.45);}
    .cv-tc-h{height:38px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;background:color-mix(in srgb,var(--f) 12%,#fff);border-bottom:3px solid var(--f);}
    .cv-tc.groupes .cv-tc-col{padding-top:38px;}
    .cv-tc-gh{position:absolute;top:0;height:38px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;background:#F4F6F9;border-left:2px solid rgba(28,43,57,.45);border-bottom:2px solid rgba(28,43,57,.2);box-sizing:border-box;}
    .cv-tc-x{height:26px;display:flex;align-items:center;justify-content:center;font-size:.85rem;background:#FAFBFC;border-bottom:1px solid rgba(28,43,57,.1);}
    .cv-tc-col.cible{background:rgba(255,193,7,.16);box-shadow:inset 0 0 0 3px #F2A900;}
    .cv-tc-col.source .cv-tc-h{box-shadow:inset 0 -3px 0 #D32F2F;}
    .cv-tok.tc{top:52px;font-size:2.2rem;} .cv-tc.groupes .cv-tok.tc{top:60px;} .cv-tc.lignex .cv-tok.tc{top:84px;}
    .cv-tc.groupes .cv-tc-virg{top:52px;} .cv-tc.lignex .cv-tc-virg{top:76px;} .cv-tc-virg{top:46px;}
    @media (max-width:640px){ .cv-fleche{width:44px;height:44px;} }
    .cv-plein-btn{margin-left:auto;}
    #cvPlein:fullscreen{background:#FBF8F3;overflow:auto;padding:2vh 3vw;box-sizing:border-box;}
    #cvPlein:fullscreen .cv-hors-plein{display:none;}
    #cvPlein:fullscreen #cvOutil{zoom:1.35;} @media (min-width:1600px){ #cvPlein:fullscreen #cvOutil{zoom:1.7;} } @media (min-width:2200px){ #cvPlein:fullscreen #cvOutil{zoom:2.2;} }
    .cv-chaine{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:6px 0;}
    .cv-maillon{border:2px solid rgba(28,43,57,.15);border-radius:10px;padding:5px 12px;font-size:1.15rem;background:#fff;}
    .cv-maillon.src{border-color:#D32F2F;box-shadow:0 0 0 3px rgba(211,47,47,.15);} .cv-maillon.tgt{border-color:#F2A900;background:rgba(255,193,7,.16);}
    .cv-fois{font-size:.72rem;color:#8A919C;white-space:nowrap;}
    .cv-relation{display:flex;align-items:center;gap:8px;background:rgba(12,91,160,.06);border-left:4px solid #0C5BA0;border-radius:10px;padding:10px 14px;margin:10px 0;font-size:1.08rem;}
    .cv-relation .gicon{color:#E0A100;}
    .cv-integre{border-top:1px dashed rgba(28,43,57,.15);margin-top:6px;padding-top:4px;}
  `;
  document.head.appendChild(st);
})();
