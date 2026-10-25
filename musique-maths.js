/* =====================================================================
   musique-maths.js -- Maths et musique : deux méthodes animées, sonores et ludiques.
   Demandé : « faire le lien entre maths et musique… un truc ludique » ; choix : « En méthode animée… 1 et 3 ».

   1. « Remplis la mesure » (CM2, 6e) : la durée d'une note est une fraction de la mesure (ronde 1,
      blanche 1/2, noire 1/4, croche 1/8) ; une mesure à 4 temps doit faire exactement 1. On compose et
      on écoute, on relève des défis, ou on reproduit un rythme mystère (dictée de rythme).
   3. « Canon miroir » (5e, 4e) : une mélodie sur un quadrillage (temps en abscisse, hauteur en ordonnée).
      Translation = mélodie répétée (ou transposée) ; symétrie d'axe vertical = jouée à l'envers ; symétrie
      d'axe horizontal = renversée (miroir) ; symétrie centrale = les deux. On regarde, on écoute, on devine.

   Placement dans le HTML d'un chapitre (méthode) :
     <div class="mm-mesure" data-mm="id"></div>
     <div class="mm-canon" data-mm="id" data-transf="rep,transp,axeV,axeH,centre"></div>
   mmInitTout(conteneur) construit ce qui s'y trouve (appelé à l'ouverture du chapitre).
   Son : Web Audio du navigateur (aucune bibliothèque), démarré au premier clic.
   ===================================================================== */

/* ---------- Son ---------- */
let mmCtx = null;
function mmAudio(){
  if(!mmCtx){ const C = window.AudioContext || window.webkitAudioContext; if(!C) return null; mmCtx = new C(); }
  if(mmCtx.state === 'suspended') mmCtx.resume();
  return mmCtx;
}
function mmSon(freq, t, dur, vol){
  const c = mmAudio(); if(!c) return;
  const o = c.createOscillator(), g = c.createGain(), v = vol || 0.2;
  o.type = 'triangle'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(v, t + 0.015);
  g.gain.exponentialRampToValueAtTime(v * 0.55, t + Math.min(0.15, dur * 0.4));
  g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.06, dur * 0.95));
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
function mmClic(t, fort){ // battement du métronome
  const c = mmAudio(); if(!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = 'square'; o.frequency.value = fort ? 1650 : 1150;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(fort ? 0.09 : 0.05, t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.06);
}
// Gamme de do majeur, du do grave au sol aigu (indices = hauteur sur le quadrillage).
const MM_FREQ = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99];
const MM_NOMS = ['do', 'ré', 'mi', 'fa', 'sol', 'la', 'si', 'do', 'ré', 'mi', 'fa', 'sol'];
const mmEsc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
function mmTex(el){ if(el && typeof renderStaticMath === 'function') renderStaticMath(el); }

/* =====================================================================
   1. Remplis la mesure
   ===================================================================== */
// Durées en croches (une mesure = 8 croches = 1 ronde).
const MM_NOTES = [
  { d: 8, nom: 'ronde', art: 'une' }, { d: 4, nom: 'blanche', art: 'une' },
  { d: 2, nom: 'noire', art: 'une' }, { d: 1, nom: 'croche', art: 'une' }];
const MM_MELO = [0, 2, 4, 2, 4, 5, 4, 2, 0, 1, 2, 4, 7, 4, 2, 1]; // hauteurs données aux notes dans l'ordre où on les pose
const MM_DEFIS = [
  { t: 'Remplis la mesure avec exactement <b>3 notes</b>.', ok: m => m.length === 3 },
  { t: 'Remplis la mesure avec exactement <b>5 notes</b>.', ok: m => m.length === 5 },
  { t: 'Remplis la mesure avec <b>3 sortes de notes</b> différentes.', ok: m => new Set(m.map(n => n.d)).size === 3 },
  { t: 'Remplis la mesure <b>sans aucune noire</b>, avec au moins 2 notes.', ok: m => m.length >= 2 && !m.some(n => n.d === 2) },
  { t: 'Remplis la mesure avec exactement <b>6 notes</b>.', ok: m => m.length === 6 },
  { t: 'Remplis la mesure avec exactement <b>7 notes</b>.', ok: m => m.length === 7 },
  { t: 'Remplis la mesure avec <b>une blanche</b> et <b>des croches</b> seulement.', ok: m => m.filter(n => n.d === 4).length === 1 && m.every(n => n.d === 4 || n.d === 1) }];
const MM_DICTEES = [[4, 4], [2, 2, 4], [4, 2, 2], [2, 2, 2, 2], [1, 1, 2, 4], [2, 1, 1, 2, 2], [1, 1, 1, 1, 4], [4, 1, 1, 2], [2, 4, 2], [1, 1, 2, 1, 1, 2], [2, 2, 1, 1, 1, 1], [1, 1, 1, 1, 2, 2]];
const MM_CROCHE = 0.25; // durée d'une croche en secondes (noire = une demi-seconde)

function mmGlyphe(d, c){
  c = c || '#1C1B2E';
  const plein = d <= 2, tige = d < 8, drapeau = d === 1;
  return `<svg viewBox="0 0 26 42" width="20" height="32" aria-hidden="true"><ellipse cx="10" cy="32" rx="7.5" ry="5.2" transform="rotate(-20 10 32)" fill="${plein ? c : 'none'}" stroke="${c}" stroke-width="2.2"/>`
    + (tige ? `<line x1="16.6" y1="30" x2="16.6" y2="4" stroke="${c}" stroke-width="2"/>` : '')
    + (drapeau ? `<path d="M16.6,4 q2,8 8.5,11 q-3.5,-1.5 -8.5,-4" fill="${c}" stroke="${c}" stroke-width="1.4"/>` : '') + '</svg>';
}
const mmPgcd = (a, b) => b ? mmPgcd(b, a % b) : a;
const mmFracNote = d => d === 8 ? '1' : `\\dfrac{1}{${8 / d}}`;
function mmFracHuitiemes(s){
  if(s === 0) return '0';
  if(s === 8) return '\\dfrac{8}{8} = 1';
  const g = mmPgcd(s, 8);
  return g > 1 ? `\\dfrac{${s}}{8} = \\dfrac{${s / g}}{${8 / g}}` : `\\dfrac{${s}}{8}`;
}
function mmSomme(m){ return m.reduce((a, n) => a + n.d, 0); }

function mmMesureMonter(el){
  const id = el.dataset.mm || ('mm' + Math.random().toString(36).slice(2, 7));
  const st = { mes: [[], []], cur: 0, mode: 'libre', defi: 0, mystere: null, score: 0, joue: 0, timers: [] };
  el.innerHTML = `<div class="mm-box">
    <div class="mm-modes" role="tablist">
      <button type="button" data-mode="libre" class="on"><span class="gicon">music_note</span> Composer</button>
      <button type="button" data-mode="defi"><span class="gicon">emoji_events</span> Défis</button>
      <button type="button" data-mode="dictee"><span class="gicon">hearing</span> Rythme mystère</button>
      <span class="mm-score" title="Défis réussis"></span></div>
    <div class="mm-consigne"></div>
    <div class="mm-palette">${MM_NOTES.map(n => `<button type="button" data-d="${n.d}" title="Ajouter ${n.art} ${n.nom}">${mmGlyphe(n.d)}<span class="mm-pn">${n.nom}</span><span class="tex">${mmFracNote(n.d)}</span></button>`).join('')}</div>
    <div class="mm-mesures"></div>
    <div class="mm-calc"></div>
    <div class="mm-msg" aria-live="polite"></div>
    <div class="mm-actions"><button type="button" class="btn" data-a="jouer"><span class="gicon">play_arrow</span> Écouter</button>
      <button type="button" class="btn secondary" data-a="mystere" hidden><span class="gicon">hearing</span> Écouter le rythme mystère</button>
      <button type="button" class="btn secondary" data-a="effacer"><span class="gicon">backspace</span> Effacer la mesure</button>
      <button type="button" class="btn secondary" data-a="suivant" hidden><span class="gicon">arrow_forward</span> <span>Défi suivant</span></button></div>
  </div>`;
  const $ = s => el.querySelector(s);
  mmTex($('.mm-palette'));
  const mesures = () => st.mode === 'libre' ? st.mes : [st.mes[0]];
  const dire = (h, cls) => { const m = $('.mm-msg'); m.className = 'mm-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; mmTex(m); };
  const stop = () => { st.timers.forEach(clearTimeout); st.timers = []; el.querySelectorAll('.mm-n.joue').forEach(x => x.classList.remove('joue')); };

  function consigne(){
    const c = $('.mm-consigne');
    if(st.mode === 'libre') c.innerHTML = `Une mesure à 4 temps dure <b>une ronde</b> : elle doit faire exactement <b>1</b>. Clique sur les notes pour remplir les mesures, puis écoute ta composition. Clique sur une note posée pour l'enlever.`;
    else if(st.mode === 'defi') c.innerHTML = `<b>Défi ${st.defi + 1} / ${MM_DEFIS.length}</b> : ${MM_DEFIS[st.defi].t}`;
    else c.innerHTML = `Écoute le <b>rythme mystère</b> (le métronome compte 4 temps avant), puis reproduis-le dans la mesure. Quand la mesure est pleine, on vérifie !`;
    $('[data-a="mystere"]').hidden = st.mode !== 'dictee';
    $('[data-a="suivant"]').hidden = true;
    $('.mm-score').textContent = st.score ? '⭐ ' + st.score : '';
  }
  function rendre(){
    const ms = mesures();
    $('.mm-mesures').innerHTML = ms.map((m, k) => {
      const s = mmSomme(m), reste = 8 - s;
      return `<div class="mm-mes${k === st.cur ? ' cur' : ''}${s === 8 ? ' pleine' : ''}" data-k="${k}">
        <span class="mm-cle">${ms.length > 1 ? 'Mesure ' + (k + 1) : 'Mesure'}</span>
        <div class="mm-barre">${[1, 2, 3].map(b => `<i class="mm-temps" style="left:${b * 25}%"></i>`).join('')}
          ${m.map((n, j) => `<button type="button" class="mm-n mm-d${n.d}" data-j="${j}" style="width:${n.d / 8 * 100}%" title="Enlever cette ${MM_NOTES.find(x => x.d === n.d).nom}">${mmGlyphe(n.d, '#fff')}<span class="tex">${mmFracNote(n.d)}</span></button>`).join('')}
          ${reste ? `<span class="mm-vide" style="width:${reste / 8 * 100}%">${s ? 'il reste <span class="tex">' + mmFracHuitiemes(reste).split(' = ').pop() + '</span>' : 'mesure vide'}</span>` : ''}</div></div>`;
    }).join('');
    const m = ms[st.cur] || [], s = mmSomme(m);
    let calc = '';
    if(m.length){
      const termes = m.map(n => mmFracNote(n.d)).join(' + ');
      const conv = m.length > 1 && m.some(n => n.d !== 1) ? ' = ' + m.map(n => `\\dfrac{${n.d}}{8}`).join(' + ') : '';
      calc = `<span class="tex">${termes}${conv} = ${mmFracHuitiemes(s)}</span>`;
    }
    $('.mm-calc').innerHTML = calc || '<span class="hint" style="margin:0;">Le calcul de la mesure s\'écrit ici.</span>';
    mmTex($('.mm-mesures')); mmTex($('.mm-calc'));
    el.querySelectorAll('.mm-mes').forEach(b => b.onclick = e => { if(e.target.closest('.mm-n')) return; st.cur = +b.dataset.k; rendre(); });
    el.querySelectorAll('.mm-n').forEach(b => b.onclick = e => {
      e.stopPropagation(); stop();
      const k = +b.closest('.mm-mes').dataset.k; mesures()[k].splice(+b.dataset.j, 1); st.cur = k; dire(''); rendre();
    });
  }
  function verifier(){
    const m = st.mes[0];
    if(mmSomme(m) !== 8) return;
    if(st.mode === 'defi'){
      if(MM_DEFIS[st.defi].ok(m)){
        st.score++; dire('<span class="gicon">celebration</span> Bravo, défi réussi ! Écoute ton rythme, puis passe au défi suivant.', 'ok');
        const b = $('[data-a="suivant"]'); b.hidden = false; b.querySelector('span:last-child').textContent = st.defi < MM_DEFIS.length - 1 ? 'Défi suivant' : 'Recommencer les défis';
        $('.mm-score').textContent = '⭐ ' + st.score;
      } else dire('La mesure est complète, mais ce n\'est pas tout à fait le défi. Clique sur une note pour l\'enlever et essaie autrement.', 'ko');
    } else if(st.mode === 'dictee' && st.mystere){
      const ok = m.length === st.mystere.length && m.every((n, j) => n.d === st.mystere[j]);
      if(ok){ st.score++; $('.mm-score').textContent = '⭐ ' + st.score; dire('<span class="gicon">celebration</span> Exactement le rythme mystère ! Un nouveau rythme t\'attend.', 'ok'); const b = $('[data-a="suivant"]'); b.hidden = false; b.querySelector('span:last-child').textContent = 'Nouveau rythme'; }
      else dire('Ta mesure est complète, mais ce n\'est pas le même rythme. Réécoute le rythme mystère et compare avec le tien (bouton « Écouter »).', 'ko');
    } else dire('<span class="gicon">check_circle</span> Mesure complète : la somme fait exactement 1 !', 'ok');
  }
  function ajouter(d){
    stop();
    const ms = mesures(); let m = ms[st.cur];
    if(mmSomme(m) === 8){ const k = ms.findIndex(x => mmSomme(x) < 8); if(k < 0){ dire('Toutes les mesures sont pleines : clique sur une note pour l\'enlever, ou efface une mesure.', 'ko'); return; } st.cur = k; m = ms[k]; }
    const reste = 8 - mmSomme(m);
    if(d > reste){ dire(`Trop long ! Une ${MM_NOTES.find(x => x.d === d).nom} vaut <span class="tex">${mmFracNote(d)}</span>, mais il ne reste que <span class="tex">${mmFracHuitiemes(reste).split(' = ').pop()}</span> dans la mesure.`, 'ko'); el.querySelector(`.mm-mes[data-k="${st.cur}"]`)?.classList.add('trop'); setTimeout(() => el.querySelector('.mm-mes.trop')?.classList.remove('trop'), 450); return; }
    const total = st.mes.reduce((a, x) => a + x.length, 0);
    m.push({ d, h: MM_MELO[total % MM_MELO.length] });
    mmSon(MM_FREQ[m[m.length - 1].h], mmAudio() ? mmCtx.currentTime + 0.01 : 0, d * MM_CROCHE * 0.9);
    dire('');
    rendre();
    if(mmSomme(m) === 8) verifier(); // la mesure suivante prend le relais à la prochaine note (le calcul de celle-ci reste affiché)
  }
  // Joue une suite de mesures : métronome sur chaque temps, notes à leur hauteur, note jouée surlignée.
  function jouer(liste, opts){
    stop(); const c = mmAudio(); if(!c){ dire('Le son n\'est pas disponible sur ce navigateur.', 'ko'); return; }
    opts = opts || {};
    const t0 = c.currentTime + 0.12, temps = 2 * MM_CROCHE, avant = opts.decompte ? 4 * temps : 0;
    if(opts.decompte) for(let b = 0; b < 4; b++) mmClic(t0 + b * temps, b === 0);
    liste.forEach((m, k) => {
      const debut = t0 + avant + k * 8 * MM_CROCHE;
      for(let b = 0; b < 4; b++) mmClic(debut + b * temps, b === 0);
      let x = 0;
      m.forEach((n, j) => {
        const t = debut + x * MM_CROCHE; x += n.d;
        mmSon(opts.hauteur != null ? MM_FREQ[opts.hauteur] : MM_FREQ[n.h], t, n.d * MM_CROCHE * 0.92);
        if(!opts.cache){
          const ms = (t - c.currentTime) * 1000;
          st.timers.push(setTimeout(() => { el.querySelectorAll('.mm-n.joue').forEach(z => z.classList.remove('joue')); const b = el.querySelector(`.mm-mes[data-k="${k}"] .mm-n[data-j="${j}"]`); if(b) b.classList.add('joue'); }, ms));
        }
      });
    });
    st.timers.push(setTimeout(() => el.querySelectorAll('.mm-n.joue').forEach(z => z.classList.remove('joue')), (t0 + avant + liste.length * 8 * MM_CROCHE - c.currentTime) * 1000 + 100));
  }
  function nouveauMystere(){
    let p; do { p = MM_DICTEES[Math.floor(Math.random() * MM_DICTEES.length)]; } while(st.mystere && p.join() === st.mystere.join() && MM_DICTEES.length > 1);
    st.mystere = p; st.mes[0] = []; st.cur = 0;
  }
  el.querySelectorAll('.mm-modes [data-mode]').forEach(b => b.onclick = () => {
    stop(); st.mode = b.dataset.mode; st.cur = 0; st.mes = [[], []];
    el.querySelectorAll('.mm-modes [data-mode]').forEach(x => x.classList.toggle('on', x === b));
    if(st.mode === 'dictee') nouveauMystere();
    dire(''); consigne(); rendre();
  });
  el.querySelectorAll('.mm-palette [data-d]').forEach(b => b.onclick = () => ajouter(+b.dataset.d));
  $('[data-a="jouer"]').onclick = () => { const l = mesures().filter(m => m.length); if(!l.length){ dire('Ajoute d\'abord des notes dans la mesure.', 'ko'); return; } jouer(l); };
  $('[data-a="mystere"]').onclick = () => { if(!st.mystere) nouveauMystere(); jouer([st.mystere.map(d => ({ d, h: 5 }))], { decompte: true, cache: true, hauteur: 5 }); };
  $('[data-a="effacer"]').onclick = () => { stop(); mesures()[st.cur].length = 0; dire(''); rendre(); };
  $('[data-a="suivant"]').onclick = () => {
    stop();
    if(st.mode === 'defi') st.defi = (st.defi + 1) % MM_DEFIS.length; else nouveauMystere();
    st.mes = [[], []]; st.cur = 0; dire(''); consigne(); rendre();
  };
  consigne(); rendre();
}

/* =====================================================================
   3. Canon miroir : transformations d'une mélodie
   ===================================================================== */
const MM_C = { cols: 16, rows: 10, cw: 27, ch: 19, gx: 40, gy: 12 };
const MM_TRANSF = {
  rep: { nom: 'Translation', sous: 'mélodie répétée', f: (t, h) => [t + 8, h],
    expl: 'Translation de 8 temps vers la droite : chaque note glisse de 8 cases, sans changer de hauteur. On entend la mélodie <b>répétée</b>, comme un refrain.' },
  transp: { nom: 'Translation', sous: 'répétée plus haut', f: (t, h) => [t + 8, h + 2],
    expl: 'Translation de 8 temps vers la droite et de 2 notes vers le haut : la mélodie est répétée <b>plus aiguë</b>. En musique, on dit qu\'elle est <b>transposée</b>.' },
  axeV: { nom: 'Symétrie d\'axe vertical', sous: 'jouée à l\'envers', f: (t, h) => [15 - t, h],
    expl: 'Symétrie par rapport à l\'axe vertical rouge : la première note devient la dernière, la deuxième l\'avant-dernière… La mélodie est jouée <b>à l\'envers</b> (en musique : le <b>rétrograde</b>).' },
  axeH: { nom: 'Symétrie d\'axe horizontal', sous: 'renversée, en même temps', f: (t, h) => [t, 7 - h],
    expl: 'Symétrie par rapport à l\'axe horizontal rouge : quand la mélodie monte, son image descend d\'autant, au même moment. Les deux voix sonnent ensemble, comme dans un <b>miroir</b> (en musique : le <b>renversement</b>, que Bach utilisait dans ses canons).' },
  centre: { nom: 'Symétrie centrale', sous: 'à l\'envers et renversée', f: (t, h) => [15 - t, 7 - h],
    expl: 'Symétrie de centre O : chaque note passe de l\'autre côté de O, à la même distance. La mélodie est jouée <b>à l\'envers et renversée</b> : c\'est comme enchaîner les deux symétries axiales.' } };
const MM_MOTIFS = [[0, 1, 2, 0, 2, 3, 4, null], [4, 4, 5, 4, 7, 6, null, 4], [0, 2, 4, 7, 5, 4, 2, null], [2, 2, 3, 4, 4, 3, 2, 1], [0, 0, 4, 4, 5, 5, 4, null], [4, 2, 2, 3, 1, 1, 0, null]];
const MM_TEMPS_CANON = 0.3;

function mmCanonMonter(el){
  const liste = (el.dataset.transf || 'rep,transp,axeV,axeH,centre').split(',').filter(k => MM_TRANSF[k]);
  const st = { motif: MM_MOTIFS[0].slice(), k: liste[0], u: 1, raf: 0, quiz: null, score: 0, timers: [] };
  el.innerHTML = `<div class="mm-box">
    <div class="mm-consigne">Chaque case est une note : le <b>temps</b> est en abscisse (on lit de gauche à droite), la <b>hauteur</b> en ordonnée (plus haut = plus aigu). La mélodie bleue est le modèle ; clique dans la partie gauche pour la changer.</div>
    <div class="mm-tr">${liste.map(k => `<button type="button" data-k="${k}"><b>${MM_TRANSF[k].nom}</b><small>${MM_TRANSF[k].sous}</small></button>`).join('')}</div>
    <svg class="mm-svg" viewBox="0 0 ${MM_C.gx + MM_C.cols * MM_C.cw + 10} ${MM_C.gy + MM_C.rows * MM_C.ch + 26}"></svg>
    <div class="mm-msg" aria-live="polite"></div>
    <div class="mm-actions"><button type="button" class="btn" data-a="jouer"><span class="gicon">play_arrow</span> Écouter</button>
      <button type="button" class="btn" data-a="quiz" style="background:#7A4FC0;"><span class="gicon">quiz</span> Devine la transformation</button>
      <button type="button" class="btn secondary" data-a="hasard"><span class="gicon">casino</span> Autre mélodie</button>
      <button type="button" class="btn secondary" data-a="vider"><span class="gicon">edit</span> Composer</button>
      <span class="mm-score" title="Bonnes réponses"></span></div>
  </div>`;
  const $ = s => el.querySelector(s), svg = $('.mm-svg');
  const X = t => MM_C.gx + t * MM_C.cw, Y = r => MM_C.gy + (MM_C.rows - r) * MM_C.ch; // t, r : coordonnées continues (bords de cases)
  const dire = (h, cls) => { const m = $('.mm-msg'); m.className = 'mm-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; };
  const stop = () => { st.timers.forEach(clearTimeout); st.timers = []; const l = svg.querySelector('.mm-tete'); if(l) l.remove(); };
  const notes = () => st.motif.map((h, t) => h == null ? null : [t, h]).filter(Boolean);
  // Position d'une note image pendant l'animation (u de 0 à 1) : glissement, retournement autour de l'axe, demi-tour autour de O.
  function enMouvement(k, t, h, u){
    const cx = t + .5, cy = h + .5, [ti, hi] = MM_TRANSF[k].f(t, h), fx = ti + .5, fy = hi + .5;
    if(k === 'axeV') return [8 + (cx - 8) * (1 - 2 * u), cy];
    if(k === 'axeH') return [cx, 4 + (cy - 4) * (1 - 2 * u)];
    if(k === 'centre'){ const a = Math.PI * u, dx = cx - 8, dy = cy - 4; return [8 + dx * Math.cos(a) - dy * Math.sin(a), 4 + dx * Math.sin(a) + dy * Math.cos(a)]; }
    return [cx + (fx - cx) * u, cy + (fy - cy) * u];
  }
  function dessiner(){
    const { cols, rows, cw, ch } = MM_C, k = st.k, cache = st.quiz && !st.quiz.vu;
    let h = `<rect x="${X(0)}" y="${Y(rows)}" width="${8 * cw}" height="${rows * ch}" fill="#EEF4FB"/><rect x="${X(8)}" y="${Y(rows)}" width="${8 * cw}" height="${rows * ch}" fill="#FBF6EE"/>`;
    for(let r = 0; r <= rows; r++) h += `<line x1="${X(0)}" y1="${Y(r)}" x2="${X(cols)}" y2="${Y(r)}" stroke="#D5DEE9" stroke-width="${r === 0 || r === 7 ? 1.2 : .7}"/>`;
    for(let t = 0; t <= cols; t++) h += `<line x1="${X(t)}" y1="${Y(0)}" x2="${X(t)}" y2="${Y(rows)}" stroke="#D5DEE9" stroke-width="${t % 4 ? .7 : 1.3}"/>`;
    for(let r = 0; r < rows; r++) h += `<text x="${X(0) - 6}" y="${Y(r + .5) + 4}" text-anchor="end" font-size="10.5" font-family="Inter,sans-serif" fill="#5B6472">${MM_NOMS[r]}</text>`;
    for(let t = 0; t < cols; t++) h += `<text x="${X(t + .5)}" y="${Y(0) + 13}" text-anchor="middle" font-size="9" font-family="JetBrains Mono,monospace" fill="#8A93A2">${t + 1}</text>`;
    h += `<text x="${X(cols)}" y="${Y(0) + 24}" text-anchor="end" font-size="9.5" font-family="Inter,sans-serif" fill="#5B6472">temps →</text>`;
    // Élément de la transformation : axe, centre ou vecteur.
    if(!cache){
      if(k === 'axeV') h += `<line x1="${X(8)}" y1="${Y(rows) - 4}" x2="${X(8)}" y2="${Y(0) + 4}" stroke="#D3302F" stroke-width="2.2" stroke-dasharray="7 4"/>`;
      if(k === 'axeH') h += `<line x1="${X(0) - 2}" y1="${Y(4)}" x2="${X(cols) + 2}" y2="${Y(4)}" stroke="#D3302F" stroke-width="2.2" stroke-dasharray="7 4"/>`;
      if(k === 'centre') h += `<circle cx="${X(8)}" cy="${Y(4)}" r="4.5" fill="#D3302F"/><text x="${X(8) + 7}" y="${Y(4) - 6}" font-size="13" font-weight="700" font-family="Space Grotesk,sans-serif" fill="#D3302F">O</text>`;
      if((k === 'rep' || k === 'transp') && notes().length){
        const [t, r] = notes()[0], [ti, ri] = MM_TRANSF[k].f(t, r), x1 = X(t + .5), y1 = Y(r + .5) - 13, x2 = X(ti + .5), y2 = Y(ri + .5) - 13;
        const a = Math.atan2(y2 - y1, x2 - x1), p = (dx, dy) => `${(x2 + dx).toFixed(1)},${(y2 + dy).toFixed(1)}`;
        h += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#D3302F" stroke-width="2"/><polygon points="${x2},${y2} ${p(-9 * Math.cos(a) + 4 * Math.sin(a), -9 * Math.sin(a) - 4 * Math.cos(a))} ${p(-9 * Math.cos(a) - 4 * Math.sin(a), -9 * Math.sin(a) + 4 * Math.cos(a))}" fill="#D3302F"/>`;
      }
    }
    const pave = (cx, cy, c, txt) => `<rect x="${(X(cx) - cw / 2 + 2).toFixed(1)}" y="${(Y(cy) - ch / 2 + 2).toFixed(1)}" width="${cw - 4}" height="${ch - 4}" rx="5" fill="${c}"/>` + (txt ? `<text x="${X(cx).toFixed(1)}" y="${(Y(cy) + 4).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${txt}</text>` : '');
    notes().forEach(([t, r]) => { h += pave(t + .5, r + .5, '#2F6FB3', MM_NOMS[r]); });
    if(!cache) notes().forEach(([t, r]) => { const [x, y] = enMouvement(k, t, r, st.u); h += pave(x, y, st.u < 1 ? 'rgba(230,126,34,.85)' : '#E67E22', st.u < 1 ? '' : MM_NOMS[MM_TRANSF[k].f(t, r)[1]]); });
    else h += `<text x="${X(8)}" y="${Y(5) + 12}" text-anchor="middle" font-size="34" font-weight="700" fill="#C9B9E6" font-family="Space Grotesk,sans-serif">?</text>`;
    svg.innerHTML = h;
  }
  function animer(){
    cancelAnimationFrame(st.raf); const t0 = performance.now();
    const pas = now => { const t = Math.min(1, (now - t0) / 1300); st.u = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; dessiner(); if(t < 1) st.raf = requestAnimationFrame(pas); };
    st.raf = requestAnimationFrame(pas);
  }
  function choisir(k, anime){
    st.k = k;
    el.querySelectorAll('.mm-tr [data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === k && !(st.quiz && !st.quiz.vu)));
    if(anime){ st.u = 0; animer(); } else { st.u = 1; dessiner(); }
  }
  // Les deux voix : le modèle (bleu) et son image (orange), case par case, avec une tête de lecture.
  function jouer(){
    stop(); const c = mmAudio(); if(!c){ dire('Le son n\'est pas disponible sur ce navigateur.', 'ko'); return; }
    const t0 = c.currentTime + .12, d = MM_TEMPS_CANON;
    notes().forEach(([t, r]) => {
      mmSon(MM_FREQ[r], t0 + t * d, d * .92, .17);
      const [ti, ri] = MM_TRANSF[st.k].f(t, r); mmSon(MM_FREQ[Math.min(MM_FREQ.length - 1, ri)], t0 + ti * d, d * .92, .17);
    });
    for(let t = 0; t <= MM_C.cols; t++) st.timers.push(setTimeout(() => {
      let l = svg.querySelector('.mm-tete'); if(t === MM_C.cols){ if(l) l.remove(); return; }
      if(!l){ l = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); l.setAttribute('class', 'mm-tete'); l.setAttribute('fill', 'rgba(255,206,84,.35)'); svg.insertBefore(l, svg.firstChild.nextSibling); }
      l.setAttribute('x', X(t)); l.setAttribute('y', Y(MM_C.rows)); l.setAttribute('width', MM_C.cw); l.setAttribute('height', MM_C.rows * MM_C.ch);
    }, (t0 - c.currentTime + t * d) * 1000));
  }
  function quiz(){
    stop();
    let k; do { k = liste[Math.floor(Math.random() * liste.length)]; } while(liste.length > 1 && st.quiz && k === st.quiz.k);
    // Une mélodie qui ne se confond pas avec son image (sinon deux réponses seraient justes).
    let m, essais = 0; do { m = MM_MOTIFS[Math.floor(Math.random() * MM_MOTIFS.length)].slice(); essais++; } while(essais < 20 && m.join() === m.slice().reverse().join());
    st.motif = m; st.quiz = { k, vu: false }; st.k = k;
    el.querySelectorAll('.mm-tr [data-k]').forEach(b => b.classList.remove('on'));
    dessiner(); jouer();
    dire('<span class="gicon">hearing</span> Écoute : la mélodie bleue, puis sa transformation (cachée). <b>Quelle transformation a-t-on appliquée ?</b> Clique sur ta réponse. Tu peux réécouter.');
  }
  el.querySelectorAll('.mm-tr [data-k]').forEach(b => b.onclick = () => {
    const k = b.dataset.k;
    if(st.quiz && !st.quiz.vu){
      st.quiz.vu = true; const bon = k === st.quiz.k;
      if(bon) st.score++;
      $('.mm-score').textContent = st.score ? '⭐ ' + st.score : '';
      choisir(st.quiz.k, true);
      dire((bon ? '<span class="gicon">celebration</span> Bonne réponse ! ' : `<span class="gicon">info</span> Non : c'était une <b>${MM_TRANSF[st.quiz.k].nom.toLowerCase()}</b> (${MM_TRANSF[st.quiz.k].sous}). `) + MM_TRANSF[st.quiz.k].expl, bon ? 'ok' : 'ko');
      return;
    }
    st.quiz = null; stop(); choisir(k, true); dire(MM_TRANSF[k].expl);
  });
  svg.onclick = e => {
    if(st.quiz && !st.quiz.vu) return;
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse());
    const t = Math.floor((q.x - MM_C.gx) / MM_C.cw), r = Math.floor(MM_C.rows - (q.y - MM_C.gy) / MM_C.ch);
    if(t < 0 || t > 7 || r < 0 || r > 7){ if(t >= 8 && t < 16) dire('La partie orange est l\'<b>image</b> : elle se calcule toute seule. Change la mélodie bleue, à gauche.'); return; }
    stop(); st.quiz = null;
    st.motif[t] = st.motif[t] === r ? null : r;
    mmSon(MM_FREQ[r], mmAudio() ? mmCtx.currentTime + .01 : 0, .25, .17);
    st.u = 1; dessiner();
  };
  $('[data-a="jouer"]').onclick = jouer;
  $('[data-a="quiz"]').onclick = quiz;
  $('[data-a="hasard"]').onclick = () => { stop(); st.quiz = null; let m; do { m = MM_MOTIFS[Math.floor(Math.random() * MM_MOTIFS.length)].slice(); } while(m.join() === st.motif.join()); st.motif = m; choisir(st.k, true); dire(MM_TRANSF[st.k].expl); };
  $('[data-a="vider"]').onclick = () => { stop(); st.quiz = null; st.motif = Array(8).fill(null); choisir(st.k, false); dire('Clique dans la partie bleue (temps 1 à 8) pour placer une note par temps ; l\'image orange se construit en même temps. Puis écoute !'); };
  choisir(st.k, false); dire(MM_TRANSF[st.k].expl);
}

/* ---------- Construction des méthodes présentes dans un conteneur ---------- */
function mmInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.mm-mesure').forEach(mmMesureMonter);
  racine.querySelectorAll('.mm-canon').forEach(mmCanonMonter);
}

(function mmStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .mm-box{ display:flex; flex-direction:column; gap:10px; }
    .mm-consigne{ font-size:.95rem; line-height:1.5; }
    .mm-modes{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
    .mm-modes button, .mm-tr button{ border:1.5px solid rgba(31,58,92,.25); background:#fff; color:#1F3A5C; border-radius:999px; padding:5px 12px; font:600 .85rem Inter,sans-serif; cursor:pointer; display:inline-flex; align-items:center; gap:5px; }
    .mm-modes button.on, .mm-tr button.on{ background:#1F3A5C; color:#fff; border-color:#1F3A5C; }
    .mm-modes .gicon{ font-size:18px; }
    .mm-score{ margin-left:auto; font:700 .95rem 'Space Grotesk',sans-serif; color:#B7791F; }
    .mm-palette{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
    .mm-palette button{ display:flex; flex-direction:column; align-items:center; gap:2px; min-width:76px; padding:6px 8px 8px; border:1.5px solid rgba(31,58,92,.2); border-radius:12px; background:#fff; cursor:pointer; color:#1C1B2E; transition:transform .1s; }
    .mm-palette button:hover{ border-color:#2EA8C9; transform:translateY(-2px); } .mm-palette button:active{ transform:scale(.96); }
    .mm-pn{ font:600 .78rem Inter,sans-serif; color:#4E5665; }
    .mm-mesures{ display:flex; flex-direction:column; gap:8px; }
    .mm-mes{ display:flex; align-items:center; gap:8px; border-radius:12px; padding:4px; cursor:pointer; }
    .mm-mes.cur{ background:rgba(46,168,201,.09); }
    .mm-mes.trop{ animation:mmSecoue .4s; }
    @keyframes mmSecoue{ 0%,100%{ transform:translateX(0); } 25%{ transform:translateX(-6px); } 75%{ transform:translateX(6px); } }
    .mm-cle{ font:700 .78rem 'Space Grotesk',sans-serif; color:#5B6472; min-width:70px; }
    .mm-barre{ position:relative; flex:1; display:flex; height:62px; border:2px solid #1C1B2E; border-radius:6px; background:#fff; overflow:hidden; }
    .mm-mes.pleine .mm-barre{ border-color:#1E7B34; box-shadow:0 0 0 3px rgba(30,123,52,.15); }
    .mm-temps{ position:absolute; top:0; bottom:0; width:0; border-left:1px dashed rgba(28,27,46,.2); pointer-events:none; }
    .mm-n{ position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0; border:0; border-right:2px solid #fff; color:#fff; cursor:pointer; padding:0; min-width:0; overflow:hidden; font-size:.75rem; transition:filter .15s, transform .15s; }
    .mm-n svg{ width:15px; height:24px; } .mm-n .katex{ font-size:.92em; }
    .mm-d8{ background:#7A4FC0; } .mm-d4{ background:#2F6FB3; } .mm-d2{ background:#1E8A6E; } .mm-d1{ background:#E67E22; }
    .mm-n:hover{ filter:brightness(1.15); } .mm-n.joue{ filter:brightness(1.35); transform:scaleY(1.06); box-shadow:inset 0 0 0 3px #FFD45E; }
    .mm-vide{ display:flex; align-items:center; justify-content:center; color:#8A93A2; font-size:.8rem; background:repeating-linear-gradient(135deg,#F6F8FB 0 8px,#EEF2F7 8px 16px); }
    .mm-calc{ text-align:center; min-height:2.2em; font-size:1.05rem; overflow-x:auto; }
    .mm-msg{ min-height:1.4em; text-align:center; font-size:.95rem; } .mm-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .mm-msg.ok{ color:#1E7B34; font-weight:600; } .mm-msg.ko{ color:#B3261E; }
    .mm-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; }
    .mm-tr{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; }
    .mm-tr button{ flex-direction:column; border-radius:12px; padding:5px 12px; line-height:1.2; } .mm-tr small{ font-weight:400; font-size:.74rem; opacity:.85; }
    .mm-svg{ width:100%; max-width:640px; display:block; margin:0 auto; cursor:pointer; touch-action:manipulation; }
  `;
  document.head.appendChild(s);
})();

/* =====================================================================
   Onglet Histoire -- demandé : « fais aussi une page Histoire pour maths et musique ». La même page dans
   les chapitres qui ont les méthodes musicales (CM2 Fractions : comparer et calculer, 6e Fractions :
   comparaison et addition, 5e Symétrie centrale, 4e Translations). Fractions en LaTeX (rendues par le
   chapitre) ; dans les dessins, fractions en étage.
   ===================================================================== */
const mmFr = (a, b) => `<span class="tex">\\dfrac{${a}}{${b}}</span>`;
// Fraction en étage dans un dessin SVG.
const mmFrSvg = (x, y, a, b, c) => `<text x="${x}" y="${y - 3}" text-anchor="middle" font-size="12" font-weight="700" fill="${c}" font-family="Inter,sans-serif">${a}</text><line x1="${x - 7}" y1="${y}" x2="${x + 7}" y2="${y}" stroke="${c}" stroke-width="1.4"/><text x="${x}" y="${y + 12}" text-anchor="middle" font-size="12" font-weight="700" fill="${c}" font-family="Inter,sans-serif">${b}</text>`;
const MM_HISTOIRE_HTML = `
<div class="history-box mm-hist">
  <div class="history-title"><span class="gicon">music_note</span> Maths et musique : une très longue histoire</div>

  <h4 class="mm-hist-h">Pythagore et la corde qui chante (6e siècle av. J.-C.)</h4>
  <div class="mm-hist-fig"><svg viewBox="0 0 540 170" role="img" aria-label="Le monocorde : la corde entière donne un do ; la moitié de la corde donne le do plus aigu (l'octave) ; les deux tiers donnent un sol (la quinte) ; les trois quarts donnent un fa (la quarte).">
    <rect width="540" height="170" fill="#F7F3EA"/>
    <rect x="40" y="128" width="460" height="16" rx="4" fill="#C9A27A" stroke="#7A5530"/>
    <path d="M40,128 l-8,-22 h10 Z M500,128 l8,-22 h-10 Z" fill="#7A5530"/>
    <line x1="40" y1="108" x2="500" y2="108" stroke="#1C1B2E" stroke-width="2"/>
    <text x="270" y="162" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">la corde entière : do</text>
    ${[[270, 1, 2, 'do aigu : l\'octave', '#D3302F'], [347, 2, 3, 'sol : la quinte', '#2F6FB3'], [385, 3, 4, 'fa : la quarte', '#1E8A6E']].map(([x, a, b, n, c], i) => {
      return `<path d="M${x},112 l-6,14 h12 Z" fill="${c}"/><line x1="40" y1="${96 - i * 26}" x2="${x}" y2="${96 - i * 26}" stroke="${c}" stroke-width="2.4"/><line x1="40" y1="${91 - i * 26}" x2="40" y2="${101 - i * 26}" stroke="${c}" stroke-width="2"/><line x1="${x}" y1="${91 - i * 26}" x2="${x}" y2="${101 - i * 26}" stroke="${c}" stroke-width="2"/>`
        + mmFrSvg(x + 18, 94 - i * 26, a, b, c) + `<text x="${x + 32}" y="${100 - i * 26}" font-size="11.5" font-family="Inter,sans-serif" fill="${c}">${n}</text>`;
    }).join('')}
  </svg></div>
  <p>Selon la légende, <b>Pythagore</b> passe devant une forge et remarque que certains marteaux sonnent bien ensemble. Il étudie alors une corde tendue sur une caisse, le <b>monocorde</b>. S'il ne fait vibrer que la moitié de la corde (${mmFr(1, 2)}), il entend la même note, en plus aigu : c'est l'<b>octave</b>. Avec les ${mmFr(2, 3)} de la corde, il obtient la <b>quinte</b> ; avec les ${mmFr(3, 4)}, la <b>quarte</b>. Les sons qui « vont bien ensemble » correspondent à des <b>fractions simples</b> ! Pour les pythagoriciens, « tout est nombre », même la musique.</p>

  <h4 class="mm-hist-h">Au Moyen Âge, la musique est… une matière de maths</h4>
  <p>Dans les universités du Moyen Âge, on apprend quatre sciences des nombres, le <b>quadrivium</b> : l'<b>arithmétique</b> (les nombres), la <b>géométrie</b> (les figures), l'<b>astronomie</b> (les nombres dans le ciel)… et la <b>musique</b> (les nombres dans les sons). Un étudiant en musique calculait des rapports de longueurs de cordes bien plus qu'il ne chantait.</p>

  <h4 class="mm-hist-h">Écrire le rythme avec des fractions</h4>
  <p>Au 13e siècle, les musiciens inventent une façon d'écrire la <b>durée</b> des notes. Notre système vient de là : une ronde vaut deux blanches, une blanche deux noires, une noire deux croches… Chaque note dure la <b>moitié</b> de la précédente. En haut d'une partition, le chiffrage de la mesure s'écrit d'ailleurs comme une fraction : ${mmFr(4, 4)}, ${mmFr(3, 4)}, ${mmFr(6, 8)}… Remplir une mesure, c'est faire une somme de fractions égale au chiffrage, comme dans la méthode « Remplis la mesure ».</p>

  <h4 class="mm-hist-h">Bach, Mozart et les mélodies en miroir</h4>
  <div class="mm-hist-fig"><svg viewBox="0 0 540 120" role="img" aria-label="Un canon à l'écrevisse : la même mélodie jouée en même temps à l'endroit et à l'envers, symétrique par rapport à un axe vertical.">
    <rect width="540" height="120" fill="#F7F3EA"/>
    <line x1="270" y1="8" x2="270" y2="104" stroke="#D3302F" stroke-width="2" stroke-dasharray="6 4"/>
    ${[0, 1, 2, 0, 2, 3, 4].map((h, t) => `<rect x="${40 + t * 30}" y="${86 - h * 16}" width="24" height="12" rx="4" fill="#2F6FB3"/><rect x="${476 - t * 30}" y="${86 - h * 16}" width="24" height="12" rx="4" fill="#E67E22"/>`).join('')}
    <text x="135" y="114" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#2F6FB3">à l'endroit →</text><text x="405" y="114" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#E67E22">← à l'envers</text>
  </svg></div>
  <p><b>Jean-Sébastien Bach</b> (1685-1750) adorait les jeux mathématiques. Dans son <i>Offrande musicale</i> (1747), un <b>canon à l'écrevisse</b> fait entendre la même mélodie jouée en même temps <b>à l'endroit et à l'envers</b> : c'est une <b>symétrie d'axe vertical</b>. Dans <i>L'Art de la fugue</i>, des fugues « en miroir » se jouent aussi <b>renversées</b>, quand la mélodie monte, son image descend : une <b>symétrie d'axe horizontal</b>. On attribue même à Mozart un duo « de table » : les deux musiciens, assis face à face, lisent <b>la même feuille</b>, l'un à l'endroit, l'autre à l'envers, tournée d'un demi-tour : une <b>symétrie centrale</b> ! Et quand une mélodie revient, identique ou plus aiguë, c'est une <b>translation</b>.</p>

  <h4 class="mm-hist-h">Mersenne mesure les sons (1636)</h4>
  <p>Le moine français <b>Marin Mersenne</b>, ami de Descartes, compte les vibrations d'une corde : plus une corde est courte, plus elle vibre vite et plus le son est aigu. Le nombre de vibrations par seconde s'appelle aujourd'hui la <b>fréquence</b>. Le la des musiciens vibre 440 fois par seconde (440 Hz) ; le la de l'octave au-dessus, 880 fois : <b>deux fois plus</b>. On retrouve la moitié de Pythagore : corde deux fois plus courte, fréquence deux fois plus grande.</p>

  <h4 class="mm-hist-h">Fourier et le son numérique</h4>
  <p>En 1822, <b>Joseph Fourier</b> montre que tout son, même celui d'un violon ou d'une voix, est une <b>somme de sons purs</b>. Aujourd'hui, un ordinateur fabrique de la musique avec des nombres : un CD enregistre 44 100 nombres par seconde. Les sons des méthodes animées de ce chapitre sont, eux aussi, calculés par l'ordinateur à partir des fréquences des notes.</p>

  <div class="mm-hist-a-toi"><span class="gicon">science</span> <b>À toi !</b> Pose une règle sur le bord d'une table et fais-la dépasser. Tiens-la fermement sur la table et fais vibrer le bout qui dépasse. Recommence en la faisant dépasser deux fois moins : le son est plus aigu. Tu peux aussi tendre un élastique sur une boîte, le pincer, puis le pincer en bloquant son milieu : tu entends l'octave de Pythagore.</div>
</div>`;
(function mmHistStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .mm-hist p{ margin:6px 0 10px; line-height:1.6; }
    .mm-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#3A2E6E; margin:16px 0 4px; }
    .mm-hist-fig svg{ width:100%; max-width:560px; display:block; margin:6px auto; border-radius:10px; box-shadow:0 1px 4px rgba(28,27,46,.12); }
    .mm-hist-a-toi{ margin-top:14px; background:#F1ECFA; border:1px solid #CDBDEB; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .mm-hist-a-toi .gicon{ color:#7A4FC0; vertical-align:-4px; }`;
  document.head.appendChild(s);
})();
