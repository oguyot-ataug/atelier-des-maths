/* =====================================================================
   lexique.js -- Lexique : le vocabulaire des programmes, du CP à la 3e, avec sa définition (menu L'Atelier, visible par tous).

   Demandé le 02/11/2026 : « Et si on faisait un lexique avec tout le vocabulaire par niveau à savoir et sa définition »,
   pour les élèves et pour les professeurs (« Les deux ! »), « dans L'Atelier, visible par tous ».
   Données : assets/lexique/donnees.js (chargé à la première ouverture). Chaque mot : définition pour l'élève, exemple,
   et précision pour le professeur (masquée pour les comptes élèves).
   Filtres : niveaux à cocher (et raccourcis École, Collège, Tous), « avec les niveaux précédents » (tout ce qu'il faut
   savoir à un niveau), domaine, recherche. Lecture à voix haute d'un mot (voixParler, app.js).
   ===================================================================== */
const LEX_NIV = [['cp', 'CP'], ['ce1', 'CE1'], ['ce2', 'CE2'], ['cm1', 'CM1'], ['cm2', 'CM2'], ['6e', '6e'], ['5e', '5e'], ['4e', '4e'], ['3e', '3e']];
const LEX_CYCLE = { cp: 'c2', ce1: 'c2', ce2: 'c2', cm1: 'c3', cm2: 'c3', '6e': 'c3', '5e': 'c4', '4e': 'c4', '3e': 'c4' };
const LEX_DOM = { N: 'Nombres et calcul', G: 'Grandeurs et mesures', E: 'Espace et géométrie', D: 'Données et probabilités', P: 'Proportionnalité et fonctions', I: 'Pensée informatique', R: 'Raisonner et justifier' };
const LEX_RACC = { tous: LEX_NIV.map(n => n[0]), ecole: ['cp', 'ce1', 'ce2', 'cm1', 'cm2'], college: ['6e', '5e', '4e', '3e'] };
let lexEtat = { niv: null, prec: false, dom: 'all', q: '', prof: true };
try{ Object.assign(lexEtat, JSON.parse(localStorage.getItem('lexique') || '{}'), { q: '' }); }catch(e){}
const lexSauver = () => { try{ localStorage.setItem('lexique', JSON.stringify({ niv: lexEtat.niv, prec: lexEtat.prec, dom: lexEtat.dom, prof: lexEtat.prof })); }catch(e){} };

function lexEleve(){ return typeof currentUserRole !== 'undefined' && currentUserRole === 'eleve'; }
function lexEsc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
// Texte avec formules $…$ : le texte est échappé, les formules passent par KaTeX.
function lexTexte(s){
  return String(s || '').split(/(\$[^$]+\$)/).map(p => /^\$[^$]+\$$/.test(p) ? (typeof katexSpan === 'function' ? katexSpan(p.slice(1, -1)) : lexEsc(p.slice(1, -1))) : lexEsc(p)).join('');
}
function lexCharger(){
  if(window.LEXIQUE) return Promise.resolve();
  return new Promise((ok, ko) => {
    const v = ((document.querySelector('script[src*="lexique.js?v="]') || {}).src || '').split('v=')[1] || '';
    const s = document.createElement('script'); s.src = 'assets/lexique/donnees.js' + (v ? '?v=' + v : ''); s.onload = ok; s.onerror = ko; document.head.appendChild(s);
  });
}
async function lexiqueOuvrir(){
  const r = document.getElementById('lexiqueRoot'); if(!r) return;
  if(!window.LEXIQUE){ r.innerHTML = '<p class="hint">Chargement du lexique…</p>'; try{ await lexCharger(); }catch(e){ r.innerHTML = '<p class="hint">Le lexique n\'a pas pu se charger (connexion ?).</p>'; return; } }
  // Par défaut : un élève voit son niveau et ceux d'avant ; les autres, tous les niveaux.
  if(!Array.isArray(lexEtat.niv) || !lexEtat.niv.length){
    if(lexEleve() && typeof currentLevel !== 'undefined' && LEX_CYCLE[currentLevel]){ lexEtat.niv = [currentLevel]; lexEtat.prec = true; }
    else lexEtat.niv = LEX_RACC.tous.slice();
  }
  lexRendre();
}
function lexNiveauxAffiches(){
  const coches = LEX_NIV.map(n => n[0]).filter(k => lexEtat.niv.includes(k));
  if(!lexEtat.prec || !coches.length) return coches;
  const max = Math.max(...coches.map(k => LEX_NIV.findIndex(n => n[0] === k)));
  return LEX_NIV.slice(0, max + 1).map(n => n[0]);
}
function lexCle(m){ return String(m).replace(/^[«\s]+/, '').replace(/[»]/g, '').trim(); }
function lexRendre(){
  const r = document.getElementById('lexiqueRoot'); if(!r || !window.LEXIQUE) return;
  const eleve = lexEleve(), prof = !eleve && lexEtat.prof;
  const nivs = lexNiveauxAffiches();
  const q = lexEtat.q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const sans = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const liste = window.LEXIQUE.filter(w => nivs.includes(w.n) && (lexEtat.dom === 'all' || w.d === lexEtat.dom)
    && (!q || sans(w.m).includes(q) || sans(w.e).includes(q) || (prof && sans(w.p).includes(q))));
  const cmp = typeof nomCmp === 'function' ? nomCmp : (a, b) => a.localeCompare(b, 'fr');
  const parNiv = LEX_NIV.filter(n => nivs.includes(n[0])).map(([k, nom]) => [k, nom, liste.filter(w => w.n === k).sort((a, b) => cmp(lexCle(a.m), lexCle(b.m)))]).filter(x => x[2].length);
  const egal = a => a.length === lexEtat.niv.length && a.every(k => lexEtat.niv.includes(k));
  const outils = `<div class="lex-outils">
    <div class="lex-champ"><span class="lex-lab">Niveaux</span>
      <div class="lex-chips">${LEX_NIV.map(([k, n]) => `<button type="button" class="lex-chip lex-${LEX_CYCLE[k]}" data-niv="${k}" aria-pressed="${lexEtat.niv.includes(k)}">${lexEtat.niv.includes(k) ? '✓ ' : ''}${n}</button>`).join('')}</div>
      <div class="lex-raccs">${[['tous', 'Tous'], ['ecole', 'École'], ['college', 'Collège']].map(([k, n]) => `<button type="button" class="lex-racc" data-racc="${k}" aria-pressed="${egal(LEX_RACC[k])}">${n}</button>`).join('')}
        <label class="lex-case"><input type="checkbox" id="lexPrec" ${lexEtat.prec ? 'checked' : ''}> avec les niveaux précédents (tout ce qu'il faut savoir)</label></div></div>
    <div class="lex-champ"><span class="lex-lab">Domaine</span>
      <div class="lex-chips">${[['all', 'Tous'], ...Object.entries(LEX_DOM)].map(([k, n]) => `<button type="button" class="lex-chip" data-dom="${k}" aria-pressed="${lexEtat.dom === k}">${n}</button>`).join('')}</div></div>
    <div class="lex-ligne">
      <label class="lex-champ" style="flex:1;min-width:200px;"><span class="lex-lab">Rechercher</span><input type="search" id="lexQ" value="${lexEsc(lexEtat.q)}" placeholder="fraction, angle, moyenne…" autocomplete="off"></label>
      ${eleve ? '' : `<label class="lex-case"><input type="checkbox" id="lexProf" ${lexEtat.prof ? 'checked' : ''}> précisions pour le professeur</label>`}
      <span class="lex-compte">${liste.length} mot${liste.length > 1 ? 's' : ''}</span>
    </div></div>`;
  const carte = w => `<article class="lex-carte" data-mot="${lexEsc(w.m)}">
      <div class="lex-tete"><h3 class="lex-mot">${lexTexte(w.m)}</h3><button type="button" class="lex-lire" title="Écouter" aria-label="Écouter la définition de ${lexEsc(w.m)}"><span class="gicon">volume_up</span></button></div>
      <div class="lex-tags"><span class="lex-tag lex-dom-${w.d}">${LEX_DOM[w.d] || ''}</span>${w.nv ? `<span class="lex-tag lex-nv" title="Nouveau programme du cycle 4 : en 4e à la rentrée 2027, en 3e à la rentrée 2028">nouveau programme</span>` : ''}</div>
      <p class="lex-def">${lexTexte(w.e)}</p>
      <p class="lex-ex"><b>Exemple :</b> ${lexTexte(w.x)}</p>
      ${prof ? `<p class="lex-prof"><b>Pour le professeur :</b> ${lexTexte(w.p)}</p>` : ''}
    </article>`;
  const corps = parNiv.length ? parNiv.map(([k, nom, l]) => `<section class="lex-niv"><h2 class="lex-h lex-${LEX_CYCLE[k]}">${nom} <small>${l.length} mot${l.length > 1 ? 's' : ''} ${lexEtat.prec && nivs.length > 1 ? 'vus en ' + nom : 'nouveaux en ' + nom}</small></h2><div class="lex-grille">${l.map(carte).join('')}</div></section>`).join('')
    : '<p class="hint">Aucun mot ne correspond. Essayez un autre mot ou d\'autres niveaux.</p>';
  r.innerHTML = outils + corps;
  // Événements
  r.querySelectorAll('[data-niv]').forEach(b => b.onclick = () => {
    const k = b.dataset.niv, l = lexEtat.niv.slice(), i = l.indexOf(k);
    if(i >= 0){ if(l.length === 1) return; l.splice(i, 1); } else l.push(k);
    lexEtat.niv = LEX_NIV.map(n => n[0]).filter(x => l.includes(x)); lexSauver(); lexRendre(); });
  r.querySelectorAll('[data-racc]').forEach(b => b.onclick = () => { lexEtat.niv = LEX_RACC[b.dataset.racc].slice(); lexSauver(); lexRendre(); });
  r.querySelectorAll('[data-dom]').forEach(b => b.onclick = () => { lexEtat.dom = b.dataset.dom; lexSauver(); lexRendre(); });
  const p = r.querySelector('#lexPrec'); if(p) p.onchange = () => { lexEtat.prec = p.checked; lexSauver(); lexRendre(); };
  const pr = r.querySelector('#lexProf'); if(pr) pr.onchange = () => { lexEtat.prof = pr.checked; lexSauver(); lexRendre(); };
  const qi = r.querySelector('#lexQ'); if(qi) qi.oninput = () => { lexEtat.q = qi.value; const pos = qi.selectionStart; lexRendre(); const n = document.getElementById('lexQ'); if(n){ n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e){} } };
  r.querySelectorAll('.lex-lire').forEach(b => b.onclick = () => {
    const w = window.LEXIQUE.find(x => x.m === b.closest('.lex-carte').dataset.mot); if(!w || typeof voixParler !== 'function') return;
    const parle = s => String(s).replace(/\$([^$]+)\$/g, (m, t) => ' ' + (typeof latexToSpeech === 'function' ? latexToSpeech(t) : t) + ' ');
    const txt = parle(w.m.replace(/[«»]/g, '')) + '. ' + parle(w.e) + ' Par exemple : ' + parle(w.x);
    voixParler(typeof texteToSpeech === 'function' ? (typeof speechFinal === 'function' ? speechFinal(texteToSpeech(txt)) : texteToSpeech(txt)) : txt);
  });
}
