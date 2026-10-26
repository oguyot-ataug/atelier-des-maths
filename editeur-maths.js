/* =====================================================================
   editeur-maths.js -- Éditeur de formules visuel (sans code LaTeX)

   Demandé : « améliorer l'outil d'écriture mathématique, avec des raccourcis type arc de cercle,
   angle… bref un éditeur complet pour que les profs n'aient pas à saisir du code LaTeX. Permettre
   aussi d'écrire des … pour des choses à compléter. »

   - mxOuvrir(cible) : fenêtre « Écrire une formule » (MathLive, licence MIT, chargé à la première
     ouverture depuis le CDN, comme Blockly). On tape comme sur une calculatrice (/ fraction,
     ^ puissance, * ×, flèches pour se déplacer), ou on clique dans la palette (calculs, géométrie,
     comparaisons, à compléter). La formule est insérée dans le champ cible entre $…$, la notation
     que tous les rendus du site comprennent (renderMathText, cours personnalisés, questionnaires).
     Curseur posé dans une formule $…$ déjà écrite : elle est rouverte pour être modifiée.
   - mxBlanc(cible) : insère des pointillés « à compléter » (une suite de points, affichée comme
     une ligne pointillée par mathBlancs, app.js).
   - Barre réutilisable : mxBarreHtml() juste AVANT un textarea ; ses boutons visent ce textarea.
   ===================================================================== */
const MX_CDN = 'https://cdn.jsdelivr.net/npm/mathlive@0.110.0/';
let mxPret = null, mxEtat = null;

function mxCharger(){
  if(window.MathfieldElement) return Promise.resolve();
  if(mxPret) return mxPret;
  mxPret = new Promise((ok, ko) => {
    const s = document.createElement('script'); s.src = MX_CDN + 'mathlive.min.js';
    s.onload = ok; s.onerror = () => { mxPret = null; ko(new Error('L\'éditeur de formules n\'a pas pu être chargé (connexion ?).')); };
    document.head.appendChild(s);
  }).then(() => {
    MathfieldElement.fontsDirectory = MX_CDN + 'fonts/';
    MathfieldElement.soundsDirectory = null;
    MathfieldElement.decimalSeparator = ',';
    MathfieldElement.locale = 'fr';
  });
  return mxPret;
}

/* Palette : [étiquette (LaTeX rendu par KaTeX), LaTeX inséré (#? = case à remplir, #@ = ce qui
   précède le curseur), info-bulle]. */
const MX_PALETTE = [
  { t: 'Calculs', b: [
    ['\\dfrac{a}{b}', '\\dfrac{#@}{#?}', 'Fraction (touche /)'],
    ['a^{n}', '#@^{#?}', 'Puissance (touche ^)'],
    ['a^{2}', '#@^2', 'Au carré'],
    ['\\sqrt{a}', '\\sqrt{#?}', 'Racine carrée (taper « racine »)'],
    ['\\times', '\\times', 'Multiplier (touche *)'],
    ['\\div', '\\div', 'Diviser'],
    ['\\pm', '\\pm', 'Plus ou moins'],
    ['(\\;)', '\\left(#?\\right)', 'Parenthèses'],
    ['\\pi', '\\pi', 'Pi (taper « pi »)'],
    ['\\%', '\\%', 'Pourcentage'],
    ['a_{n}', '#@_{#?}', 'Indice'],
    ['10^{-n}', '10^{-#?}', 'Puissance de 10 négative'],
  ] },
  { t: 'Géométrie', b: [
    ['[AB]', '[#?]', 'Segment'],
    ['(AB)', '(#?)', 'Droite'],
    ['[AB)', '[#?)', 'Demi-droite'],
    ['\\widehat{ABC}', '\\widehat{#?}', 'Angle (taper « angle »)'],
    ['\\overgroup{AB}', '\\overgroup{#?}', 'Arc de cercle (taper « arc »)'],
    ['\\overrightarrow{AB}', '\\overrightarrow{#?}', 'Vecteur (taper « vecteur »)'],
    ['\\parallel', '\\parallel', 'Parallèle'],
    ['\\perp', '\\perp', 'Perpendiculaire'],
    ['60^{\\circ}', '^{\\circ}', 'Degré (taper « degre »)'],
    ['\\triangle', '\\triangle ', 'Triangle'],
    ['\\mathscr{C}', '\\mathscr{C}', 'Cercle 𝒞'],
    ['\\in', '\\in', 'Appartient à'],
    ['\\notin', '\\notin', 'N\'appartient pas à'],
    ['\\text{cm}^{2}', '\\text{ cm}^2', 'Centimètre carré'],
    ['\\text{cm}^{3}', '\\text{ cm}^3', 'Centimètre cube'],
  ] },
  { t: 'Comparer', b: [
    ['=', '=', 'Égal'],
    ['\\neq', '\\neq', 'Différent (taper !=)'],
    ['<', '<', 'Inférieur'],
    ['>', '>', 'Supérieur'],
    ['\\leqslant', '\\leqslant', 'Inférieur ou égal (taper <=)'],
    ['\\geqslant', '\\geqslant', 'Supérieur ou égal (taper >=)'],
    ['\\approx', '\\approx', 'Environ (taper « environ »)'],
    ['\\infty', '\\infty', 'Infini'],
    ['f(x)', 'f(x)', 'Fonction'],
    ['x\\mapsto', '#?\\mapsto #?', 'Fonction : x ↦ …'],
    ['P(A)', 'P(#?)', 'Probabilité'],
    ['\\overline{A}', '\\overline{#?}', 'Événement contraire'],
  ] },
  { t: 'Lycée', b: [
    ['\\sum', '\\sum_{#?}^{#?}', 'Somme'],
    ['\\int', '\\int_{#?}^{#?}', 'Intégrale'],
    ['\\lim', '\\lim_{#?\\to#?}', 'Limite'],
    ['\\ln', '\\ln', 'Logarithme népérien'],
    ['e^{x}', 'e^{#?}', 'Exponentielle'],
    ['\\vec{u}', '\\vec{#?}', 'Vecteur u'],
  ] },
  { t: 'À compléter', b: [
    ['\\text{.........}', '\\text{..........}', 'Pointillés à compléter'],
    ['\\boxed{\\phantom{00}}', '\\boxed{\\phantom{00}}', 'Case vide à compléter'],
    ['\\ldots', '\\ldots', 'Points de suspension'],
  ] },
];
// Raccourcis tapés au clavier dans la formule. Ils REMPLACENT ceux de MathLive (259, pensés pour le
// supérieur : « in » devenait ∈ au milieu de « racine », « xx » un ×, « EE » un ∃…).
const MX_RACCOURCIS = {
  '*': '\\times', fois: '\\times', pi: '\\pi', sqrt: '\\sqrt{#?}',
  '<=': '\\leqslant', '>=': '\\geqslant', '!=': '\\neq', '+-': '\\pm',
  angle: '\\widehat{#?}', arc: '\\overgroup{#?}', vecteur: '\\overrightarrow{#?}',
  racine: '\\sqrt{#?}', environ: '\\approx', degre: '^{\\circ}', infini: '\\infty',
  parallele: '\\parallel', perp: '\\perp', appartient: '\\in',
};

function mxLabel(tex){ try{ return katex.renderToString(tex, { throwOnError: false }); }catch(e){ return tex; } }

function mxConstruire(){
  let ov = document.getElementById('mxOverlay');
  if(ov) return ov;
  ov = document.createElement('div');
  ov.id = 'mxOverlay'; ov.className = 'modal-overlay'; ov.style.display = 'none';
  ov.innerHTML = `<div class="modal-card mx-card" role="dialog" aria-label="Écrire une formule">
    <div class="mx-tete"><strong><span class="gicon">function</span> Écrire une formule</strong>
      <button type="button" class="modal-close" data-mx-act="fermer" title="Fermer"><span class="gicon">close</span></button></div>
    <div class="mx-zone"><p class="hint" style="margin:0;">Chargement de l'éditeur…</p></div>
    <div class="mx-onglets">${MX_PALETTE.map((g, i) => `<button type="button" class="mx-onglet${i ? '' : ' on'}" data-mx-tab="${i}">${g.t}</button>`).join('')}</div>
    ${MX_PALETTE.map((g, i) => `<div class="mx-palette" data-mx-pal="${i}"${i ? ' hidden' : ''}>${g.b.map(([lab, , tit], j) =>
      `<button type="button" class="mx-touche" data-mx-ins="${i}.${j}" title="${tit}">${mxLabel(lab)}</button>`).join('')}</div>`).join('')}
    <p class="hint mx-astuce">Tape comme sur une calculatrice : <b>/</b> fraction, <b>^</b> puissance, <b>*</b> multiplication, flèches pour sortir d'une case.
      Raccourcis : <b>angle</b>, <b>arc</b>, <b>vecteur</b>, <b>racine</b>, <b>pi</b>, <b>environ</b>, <b>degre</b>, <b>&lt;=</b>, <b>&gt;=</b>, <b>!=</b>.</p>
    <div class="mx-pied"><button type="button" class="btn" data-mx-act="ok"><span class="gicon">check</span> Insérer</button>
      <button type="button" class="btn secondary" data-mx-act="fermer">Annuler</button></div>
  </div>`;
  ov.addEventListener('click', e => {
    if(e.target === ov) return mxFermer();
    const t = e.target.closest('[data-mx-tab]'), k = e.target.closest('[data-mx-ins]'), a = e.target.closest('[data-mx-act]');
    if(t){
      ov.querySelectorAll('.mx-onglet').forEach(x => x.classList.toggle('on', x === t));
      ov.querySelectorAll('[data-mx-pal]').forEach(p => { p.hidden = p.dataset.mxPal !== t.dataset.mxTab; });
      const mf = ov.querySelector('math-field'); if(mf) mf.focus();
    }
    if(k){
      const [i, j] = k.dataset.mxIns.split('.').map(Number), mf = ov.querySelector('math-field');
      if(mf){ mf.insert(MX_PALETTE[i].b[j][1], { focus: true, selectionMode: 'placeholder', format: 'latex' }); }
    }
    if(a) a.dataset.mxAct === 'ok' ? mxValider() : mxFermer();
  });
  ov.addEventListener('keydown', e => { if(e.key === 'Escape'){ e.preventDefault(); mxFermer(); } });
  document.body.appendChild(ov);
  return ov;
}

/* Formule $…$ qui contient la position pos dans le texte (ou null). */
function mxFormuleEn(txt, pos){
  const re = /\$([^$\n]+)\$/g; let m;
  while((m = re.exec(txt))) if(pos >= m.index && pos <= m.index + m[0].length) return { d: m.index, f: m.index + m[0].length, tex: m[1] };
  return null;
}

async function mxOuvrir(cible){
  if(typeof cible === 'string') cible = document.getElementById(cible);
  if(!cible) return;
  const s = cible.selectionStart ?? cible.value.length, e = cible.selectionEnd ?? s;
  const f = s === e ? mxFormuleEn(cible.value, s) : null;
  mxEtat = { cible, d: f ? f.d : s, f: f ? f.f : e, tex: f ? f.tex : '' };
  const ov = mxConstruire();
  const parent = document.fullscreenElement || document.body;
  if(ov.parentNode !== parent) parent.appendChild(ov); // (déplacer le champ le remonte, avec les réglages par défaut)
  ov.style.display = 'flex';
  ov.querySelector('[data-mx-act="ok"]').innerHTML = `<span class="gicon">check</span> ${f ? 'Modifier la formule' : 'Insérer'}`;
  const zone = ov.querySelector('.mx-zone');
  try{ await mxCharger(); }
  catch(err){ zone.innerHTML = `<p class="hint" style="margin:0;color:#a83c1f;">${escapeHtml(err.message)}</p>`; return; }
  if(!mxEtat || mxEtat.cible !== cible) return; // refermé pendant le chargement
  let mf = zone.querySelector('math-field');
  if(!mf){
    zone.innerHTML = '';
    // Réglages passés à la création : avant que le champ ne soit monté dans la page, ses propriétés ne
    // peuvent pas encore être modifiées.
    mf = new MathfieldElement({ inlineShortcuts: MX_RACCOURCIS, mathVirtualKeyboardPolicy: 'manual', letterShapeStyle: 'tex' });
    mf.className = 'mx-champ';
    mf.addEventListener('keydown', ev => { if(ev.key === 'Enter' && !ev.shiftKey){ ev.preventDefault(); mxValider(); } });
    zone.appendChild(mf);
  }
  else try{ mf.inlineShortcuts = MX_RACCOURCIS; mf.mathVirtualKeyboardPolicy = 'manual'; mf.letterShapeStyle = 'tex'; }catch(e){} // réglages réappliqués (champ remonté)
  mf.value = mxEtat.tex;
  setTimeout(() => { mf.focus(); mf.executeCommand('moveToMathfieldEnd'); }, 30);
}

function mxFermer(){
  const ov = document.getElementById('mxOverlay');
  if(ov) ov.style.display = 'none';
  const c = mxEtat && mxEtat.cible; mxEtat = null;
  if(c) c.focus();
}

/* Remplace [d, f[ de la cible par txt, place le curseur après, et prévient le champ (aperçus). */
function mxRemplacer(cible, d, f, txt){
  cible.focus();
  cible.setRangeText(txt, d, f, 'end');
  cible.dispatchEvent(new Event('input', { bubbles: true }));
}

function mxValider(){
  const ov = document.getElementById('mxOverlay'), mf = ov && ov.querySelector('math-field');
  if(!mxEtat) return;
  const { cible, d, f } = mxEtat;
  // Fractions en grand (\dfrac), comme les fractions mises en forme automatiquement ailleurs sur le site.
  const tex = mf ? mf.getValue('latex').replace(/\\placeholder(\[[^\]]*\])?\{\}/g, '').replace(/\\frac(?![a-z])/g, '\\dfrac').trim() : '';
  mxEtat = null; ov.style.display = 'none';
  mxRemplacer(cible, d, f, tex ? '$' + tex + '$' : '');
}

function mxBlanc(cible){
  if(typeof cible === 'string') cible = document.getElementById(cible);
  if(!cible) return;
  const s = cible.selectionStart ?? cible.value.length, e = cible.selectionEnd ?? s, v = cible.value;
  const avant = s > 0 && !/\s/.test(v[s - 1]) ? ' ' : '', apres = e < v.length && !/\s/.test(v[e]) ? ' ' : '';
  mxRemplacer(cible, s, e, avant + '..........' + apres);
}

/* Petite barre « Formule / À compléter » à placer juste avant un textarea (ou un input). */
function mxBarreHtml(){
  return `<div class="mx-barre"><button type="button" class="mx-bt" data-mx-barre="f" title="Écrire une formule sans code (fraction, angle, arc, vecteur, racine…)"><span class="gicon">function</span> Formule</button>`
    + `<button type="button" class="mx-bt" data-mx-barre="b" title="Insérer des pointillés à compléter">…… À compléter</button></div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-mx-barre]');
  if(!b) return;
  const barre = b.closest('.mx-barre');
  let cible = barre && barre.nextElementSibling;
  while(cible && !/^(TEXTAREA|INPUT)$/.test(cible.tagName)) cible = cible.querySelector ? cible.querySelector('textarea, input[type=text]') : null;
  if(!cible) return;
  b.dataset.mxBarre === 'f' ? mxOuvrir(cible) : mxBlanc(cible);
});
// Garde la position du curseur du champ quand on clique sur un bouton de la barre (sinon le clic
// lui retire le focus avant que la position ne soit lue -- sans conséquence ici, mais le
// curseur clignotant resterait visible au bon endroit).
document.addEventListener('mousedown', e => { if(e.target.closest('[data-mx-barre], .fmt-btn[data-mx]')) e.preventDefault(); });
