/* ============================================================
   MODE APPRENTISSAGE des définitions, règles et propriétés -- demandé : "un mode apprentissage
   (nouvel icône). L'idée est de masquer la définition et de l'afficher progressivement à la
   dictée vocale si le mot est le bon. Si hésitation ou mot faux, ça cache à nouveau la
   définition."

   Principe : un bouton micro sur chaque encadré .def-box (même point d'entrée que les boutons
   « écouter » et « loupe » : injectCourseAddButtons). En mode apprentissage, chaque mot de
   l'encadré est remplacé par un cache de la même largeur ; l'élève récite, la reconnaissance
   vocale du navigateur (Web Speech API) transcrit, et chaque mot juste se dévoile. Ce qui se
   passe sur un mot faux ou une hésitation dépend du niveau choisi (voir LRN_LEVELS).

   Tolérances (la reconnaissance vocale n'est pas parfaite) :
   - les notations (points, segments, formules, lettres isolées) et la ponctuation ne sont pas à
     réciter : elles se dévoilent seules quand on les atteint, et quelques mots prononcés à leur
     place (« A B », « égal »...) sont ignorés ;
   - accents, apostrophes (« l'angle » = « angle »), singulier/pluriel, masculin/féminin et
     homophones fréquents (et/est, son/sont, ces/ses...) sont confondus ; chiffres et nombres
     en lettres aussi (« 2 » = « deux ») ;
   - un petit mot (le, de, et...) « avalé » par la reconnaissance est accepté ;
   - une dictée n'est jugée qu'une fois confirmée par le navigateur (il corrige souvent ses mots
     en cours de route) ; redire le début de sa phrase n'est pas une faute.
   ============================================================ */

/* Trois niveaux (signalé : "c'est trop compliqué à réciter, ça revient toujours au début") :
   - facile    : un mot faux est signalé mais rien ne se recache ; pas de limite de temps ;
   - normal    : un mot faux ou 10 s d'hésitation recachent la PHRASE en cours ;
   - difficile : un mot faux, un « euh » ou 6 s d'hésitation recachent TOUT (le principe d'origine). */
const LRN_LEVELS = {
  facile:    { label: 'Facile',    hesitationMs: 0,     scope: 'none' },
  normal:    { label: 'Normal',    hesitationMs: 10000, scope: 'sentence' },
  difficile: { label: 'Difficile', hesitationMs: 6000,  scope: 'all' },
};
function lrnGetLevel(){ try { const l = localStorage.getItem('lrnLevel'); if (LRN_LEVELS[l]) return l; } catch (e) {} return 'facile'; }
function lrnSetLevel(l){ try { localStorage.setItem('lrnLevel', l); } catch (e) {} }
const LRN_FILLERS = new Set(['euh', 'heu', 'hum', 'hmm', 'bah', 'ben', 'euuh', 'heuu']);
const LRN_HOMOPHONES = [
  ['et', 'est', 'ai', 'es', 'e', 'eh'], ['a', 'as', 'ah'], ['ce', 'se', 'ceux'], ['ces', 'ses', 'sait', 'sais'],
  ['son', 'sont'], ['on', 'ont'], ['ou', 'hou'], ['la', 'las', 'lat'], ['leur', 'leurs'], ['mais', 'mes', 'met', 'mets', 'mai'],
  ['cet', 'cette', 'sept', 'set'], ['sa', 'ca'], ['peut', 'peu', 'peux'], ['quel', 'quelle', 'quels', 'quelles'],
  ['un', 'hein', 'in'], ['une', 'hune'], ['si', 'ci', 'scie'], ['vers', 'vert', 'verre', 'ver'], ['cent', 'sans', 'sang', '100'],
  ['du', 'de'], ['des', 'de'], ['tout', 'tous', 'toute', 'toutes'], ['meme', 'memes'], ['point', 'points', 'poing'],
];
const LRN_NUMBERS = { zero: 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
  onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30, quarante: 40, cinquante: 50,
  soixante: 60, cent: 100, mille: 1000 };

let lrnState = null; // session d'apprentissage en cours (une seule à la fois)

function lrnSpeechCtor(){ return window.SpeechRecognition || window.webkitSpeechRecognition || null; }

/* Normalise un texte en liste de mots comparables (écrit comme dicté). */
function lrnNormalize(text){
  return String(text || '').toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/\b(?:l|d|j|m|n|s|t|c|qu|jusqu|lorsqu|puisqu)'/g, ' ') // élisions : « l'angle » -> « angle »
    .replace(/°/g, ' degres ')
    .replace(/%/g, ' pourcent ')
    .replace(/(\d)[,.](\d)/g, '$1v$2')                              // 3,5 : un seul mot
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9v]+/g, ' ')
    .trim().split(/\s+/).filter(Boolean);
}
function lrnLev(a, b){
  if (Math.abs(a.length - b.length) > 2) return 3;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const LRN_ABBR = { cm: 'centimetres', mm: 'millimetres', dm: 'decimetres', km: 'kilometres', kg: 'kilogrammes',
  mg: 'milligrammes', min: 'minutes', cm2: 'centimetres carres', m2: 'metres carres', km2: 'kilometres carres', cm3: 'centimetres cubes' };
function lrnNum(w){ return /^\d+$/.test(w) ? Number(w) : (w in LRN_NUMBERS ? LRN_NUMBERS[w] : null); }
function lrnSame(spoken, expected){
  if (spoken === expected) return true;
  if (LRN_ABBR[expected] && lrnSame(spoken, LRN_ABBR[expected].split(' ')[0])) return true;
  const ns = lrnNum(spoken), ne = lrnNum(expected);
  if (ns !== null && ne !== null) return ns === ne;
  if (LRN_HOMOPHONES.some(g => g.includes(spoken) && g.includes(expected))) return true;
  const stem = w => w.replace(/(es|s|x|e)$/, '');
  if (expected.length >= 4 && stem(spoken) === stem(expected)) return true;
  if (expected.length >= 5 && lrnLev(spoken, expected) <= 1) return true;
  if (expected.length >= 8 && lrnLev(spoken, expected) <= 2) return true;
  return false;
}

/* Découpe le contenu d'un encadré en « unités » visibles (un mot tel qu'affiché), chacune avec
   ses mots attendus. Les notations/formules sont des unités « libres » (non récitées). */
function lrnWrap(box){
  const units = [];
  const isFreeWord = raw => {
    if (/[\[(][A-Za-z0-9'’]{1,4}[\])]/.test(raw)) return true; // [AB], (d), (xy), [AB) -- pas « (une » ni « (ou »
    if (/^[^a-zà-ÿœ]*[A-Z][^a-zà-ÿœ]*$/.test(raw)) return true;   // A, AB, OM, B'
    const toks = lrnNormalize(raw);
    return !toks.length || toks.every(t => /^[a-z]$/.test(t) && t !== 'a' && t !== 'y'); // r, x, ponctuation seule
  };
  const walk = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.nodeValue.split(/(\s+)/);
        if (!parts.some(p => p.trim())) return;
        const frag = document.createDocumentFragment();
        parts.forEach(p => {
          if (!p) return;
          if (!p.trim()) { frag.appendChild(document.createTextNode(p)); return; }
          const span = document.createElement('span');
          span.className = 'lrn-w';
          span.textContent = p;
          const free = isFreeWord(p);
          units.push({ el: span, free, toks: free ? [] : lrnNormalize(p), budget: 3 });
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.matches('button, .lrn-bar, .zoom-btn, .read-aloud-btn, .learn-btn')) return;
        if (child.matches('.tex, .katex, svg, img, math')) {
          child.classList.add('lrn-w', 'lrn-block');
          // Mots qu'on peut dire à la place d'une formule : sa lecture à voix haute (« a sur b »).
          const src = child.dataset && child.dataset.texSource !== undefined ? child.dataset.texSource : child.textContent;
          const said = typeof latexToSpeech === 'function' && child.matches('.tex, .katex') ? lrnNormalize(latexToSpeech(src)).length : 2;
          units.push({ el: child, free: true, toks: [], budget: 3 + 2 * said });
          return;
        }
        walk(child);
      }
    });
  };
  walk(box);
  // Mots attendus à plat, chacun rattaché à son unité.
  const expected = [];
  // Numéro de phrase de chaque unité (une phrase se termine par . ; : ! ?) : au niveau « Normal »,
  // une erreur ne recache que la phrase en cours.
  let sent = 0;
  units.forEach(u => { u.sent = sent; if (!u.el.classList.contains('lrn-block') && /[.;:!?]["»)]*$/.test(u.el.textContent)) sent++; });
  units.forEach((u, ui) => { u.toks.forEach(t => expected.push({ t, ui, sent: u.sent })); u.left = u.toks.length; });
  return { units, expected };
}
function lrnUnwrap(box){
  box.querySelectorAll('.lrn-block').forEach(el => el.classList.remove('lrn-w', 'lrn-block', 'lrn-ok', 'lrn-flash'));
  box.querySelectorAll('span.lrn-w').forEach(sp => sp.replaceWith(document.createTextNode(sp.textContent)));
  box.normalize();
}

/* Aligne les mots dictés sur les mots attendus à partir de la position start, avec tolérance
   (mots avalés, mots dits pour une notation, mots coupés en deux, petits mots parasites).
   S'arrête au premier mot qui ne colle pas : { pos, bad (mot fautif), filler (un « euh » dit) }. */
function lrnAlign(words, start, expected, lenient){
  let p = start, skip = 0, filler = false;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (LRN_FILLERS.has(w)) { filler = true; continue; }
    if (p >= expected.length) break;
    if (lrnSame(w, expected[p].t)) { p++; skip = 0; continue; }
    if (i + 1 < words.length && lrnSame(w + words[i + 1], expected[p].t)) { p++; i++; skip = 0; continue; }
    // Un ou deux mots attendus avalés par la reconnaissance (« la longueur segment »).
    let k = 1, found = false;
    for (; k <= 2 && p + k < expected.length; k++) if (lrnSame(w, expected[p + k].t) && w.length >= 3) { found = true; break; }
    if (found) { p += k + 1; skip = 0; continue; }
    if (expected[p].t.length <= 3 && p + 1 < expected.length && lrnSame(w, expected[p + 1].t)) { p += 2; skip = 0; continue; }
    if (skip < expected[p].skipBudget) { skip++; continue; }                    // mots dits pour une notation
    if (w.length <= 2 && i + 1 < words.length && lrnSame(words[i + 1], expected[p].t)) continue; // petit mot parasite
    if (lenient) {
      // Niveau facile : erreurs de la reconnaissance vocale plutôt que de l'élève.
      const nxt = words[i + 1];
      // Un mot mal compris, suivi de mots justes (« se coupe en un seul » pour « se coupent en un seul »).
      if (p + 1 < expected.length && nxt !== undefined && lrnSame(nxt, expected[p + 1].t)
          && (words[i + 2] === undefined || p + 2 >= expected.length || lrnSame(words[i + 2], expected[p + 2].t))) { p++; skip = 0; continue; }
      // Jusqu'à 3 mots attendus manqués, si la suite colle.
      let jumped = false;
      for (let k = 1; k <= 3 && p + k < expected.length; k++) {
        if (lrnSame(w, expected[p + k].t) && (nxt === undefined || p + k + 1 >= expected.length || lrnSame(nxt, expected[p + k + 1].t))) { p += k + 1; jumped = true; break; }
      }
      if (jumped) { skip = 0; continue; }
      if (nxt === undefined && p + 1 < expected.length && w.length >= 4 && lrnLev(w, expected[p].t) <= 2) { p++; continue; } // dernier mot presque juste
    }
    return { pos: p, bad: w, filler };
  }
  return { pos: p, bad: null, filler };
}
/* Meilleur alignement d'une phrase dictée : depuis la position atteinte, ou en reprenant un peu
   plus haut (l'élève qui redit le début de sa phrase n'est pas en faute). */
function lrnBestAlign(words, from, expected, lenient){
  let best = lrnAlign(words, from, expected, lenient);
  if (!words.length) return best;
  for (let s = Math.max(0, from - 20); s < from; s++) {
    if (!lrnSame(words[0], expected[s].t)) continue;
    const r = lrnAlign(words, s, expected, lenient);
    if (r.pos > best.pos || (r.pos === best.pos && best.bad && !r.bad)) best = r;
  }
  return best;
}

function injectLearnButtons(container){
  if (!container) return;
  container.querySelectorAll('.def-box').forEach(box => {
    if (box.querySelector(':scope > .learn-btn')) return;
    const words = lrnNormalize(box.textContent);
    if (words.length < 4) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'learn-btn';
    btn.title = 'Mode apprentissage : récite à voix haute pour dévoiler';
    btn.setAttribute('aria-label', 'Mode apprentissage : récite à voix haute pour dévoiler');
    btn.innerHTML = '<span class=gicon>record_voice_over</span>';
    btn.onclick = e => { e.stopPropagation(); lrnToggle(box); };
    box.appendChild(btn);
  });
}

function lrnToggle(box){
  if (lrnState && lrnState.box === box) { lrnStop(); return; }
  if (lrnState) lrnStop();
  lrnStart(box);
}

function lrnIntro(level){
  return level === 'facile' ? 'Récite à voix haute : chaque mot juste se dévoile. Si un mot ne va pas, redis-le, rien ne se recache.'
    : level === 'normal' ? 'Récite à voix haute : chaque mot juste se dévoile. Un mot faux ou une longue hésitation recache la phrase en cours.'
    : 'Récite à voix haute : chaque mot juste se dévoile. Un mot faux, un « euh » ou une hésitation, et tout se recache !';
}

function lrnStart(box){
  const SR = lrnSpeechCtor();
  const { units, expected } = lrnWrap(box);
  // Mot attendu juste après des notations/formules : les mots dictés pour les lire sont ignorés.
  let prevUnit = -1;
  expected.forEach(e => { e.skipBudget = units.slice(prevUnit + 1, e.ui).filter(u => u.free).reduce((n, u) => n + u.budget, 0); prevUnit = e.ui; });
  const level = lrnGetLevel();
  const bar = document.createElement('div');
  bar.className = 'lrn-bar';
  bar.innerHTML = `
    <div class="lrn-status"><span class="gicon lrn-mic">mic</span> <span class="lrn-msg"></span></div>
    <div class="lrn-timer"><div></div></div>
    <div class="lrn-actions">
      <span class="lrn-levels" role="group" aria-label="Niveau">${Object.entries(LRN_LEVELS).map(([k, v]) => `<button type="button" data-level="${k}" class="${k === level ? 'on' : ''}">${v.label}</button>`).join('')}</span>
      <button type="button" class="lrn-hint"><span class=gicon>lightbulb</span> Indice</button>
      <button type="button" class="lrn-peek"><span class=gicon>visibility</span> Relire</button>
      <button type="button" class="lrn-restart"><span class=gicon>replay</span> Recommencer</button>
      <button type="button" class="lrn-stop"><span class=gicon>close</span> Quitter</button>
    </div>`;
  box.appendChild(bar);
  box.classList.add('lrn-active');
  const st = lrnState = { box, bar, units, expected, level, pos: 0, committed: 0, hints: 0, errors: 0, best: 0,
    rec: null, running: false, done: false, lastProgress: Date.now(), timer: null, listening: false };
  bar.querySelectorAll('.lrn-levels button').forEach(b => b.onclick = e => {
    e.stopPropagation();
    st.level = b.dataset.level; lrnSetLevel(st.level);
    bar.querySelectorAll('.lrn-levels button').forEach(x => x.classList.toggle('on', x === b));
    st.lastProgress = Date.now();
    if (!st.done) lrnSay(lrnIntro(st.level));
  });
  bar.querySelector('.lrn-hint').onclick = e => { e.stopPropagation(); lrnHint(); };
  bar.querySelector('.lrn-restart').onclick = e => { e.stopPropagation(); st.errors = 0; st.hints = 0; lrnHide('all', lrnIntro(st.level), false); };
  bar.querySelector('.lrn-stop').onclick = e => { e.stopPropagation(); lrnStop(); };
  const peek = bar.querySelector('.lrn-peek');
  // « Relire » : dévoile tout tant qu'on appuie ; ensuite, selon le niveau, rien / la phrase / tout se recache.
  const peekOn = e => { e.preventDefault(); e.stopPropagation(); box.classList.add('lrn-peeking'); };
  const peekOff = e => {
    if (!box.classList.contains('lrn-peeking')) return;
    e.stopPropagation(); box.classList.remove('lrn-peeking');
    st.lastProgress = Date.now();
    const scope = LRN_LEVELS[st.level].scope;
    if (scope !== 'none') lrnHide(scope, scope === 'all' ? 'Tu as relu : récite depuis le début.' : 'Tu as relu : reprends la phrase.', false);
  };
  peek.addEventListener('pointerdown', peekOn); peek.addEventListener('pointerup', peekOff); peek.addEventListener('pointerleave', peekOff);
  peek.onclick = e => e.stopPropagation();
  lrnRender();
  if (!SR) {
    lrnSay('La dictée vocale n\'est pas disponible dans ce navigateur : utilisez Chrome, Edge ou Safari (ordinateur, tablette ou téléphone).', 'err');
    bar.querySelector('.lrn-mic').textContent = 'mic_off';
    return;
  }
  lrnSay(lrnIntro(level));
  st.running = true;
  lrnListen();
  st.timer = setInterval(lrnTick, 200);
}

async function lrnListen(){
  const st = lrnState; if (!st || !st.running) return;
  const SR = lrnSpeechCtor();
  const rec = new SR();
  rec.lang = 'fr-FR';
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 3;
  // Reconnaissance sur l'appareil quand le navigateur la propose (rien n'est alors envoyé).
  try {
    if (typeof SR.available === 'function' && 'processLocally' in rec) {
      const av = await SR.available({ langs: ['fr-FR'], processLocally: true });
      if (av === 'available') rec.processLocally = true;
    }
  } catch (e) { /* option récente, facultative */ }
  if (lrnState !== st || !st.running) return;
  st.rec = rec;
  rec.onstart = () => { st.listening = true; lrnRender(); };
  rec.onresult = ev => lrnOnResult(st, ev);
  rec.onerror = ev => {
    if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
      st.running = false;
      lrnSay('Micro refusé : autorisez le micro pour ce site (icône à gauche de l\'adresse), puis recliquez sur le bouton.', 'err');
      st.bar.querySelector('.lrn-mic').textContent = 'mic_off';
    } else if (ev.error === 'audio-capture') {
      st.running = false;
      lrnSay('Aucun micro détecté sur cet appareil.', 'err');
    } else if (ev.error === 'network') {
      st.running = false;
      lrnSay('La dictée vocale a besoin d\'une connexion internet sur ce navigateur.', 'err');
    }
  };
  rec.onend = () => { st.listening = false; if (lrnState === st && st.running && !st.done) setTimeout(() => { if (lrnState === st && st.running) lrnListen(); }, 100); else lrnRender(); };
  try { rec.start(); } catch (e) { setTimeout(() => lrnListen(), 400); }
}

/* Chaque « résultat » du navigateur est un morceau de dictée entre deux pauses. Tant qu'il est
   provisoire, il ne sert qu'à dévoiler (jamais à sanctionner : le navigateur corrige souvent ses
   mots en cours de route) ; une fois confirmé, il est jugé une seule fois. */
function lrnOnResult(st, ev){
  if (lrnState !== st || st.done) return;
  for (let i = ev.resultIndex; i < ev.results.length; i++) {
    const res = ev.results[i];
    let best = null;
    for (let a = 0; a < res.length; a++) {
      const r = lrnBestAlign(lrnNormalize(res[a].transcript), st.committed, st.expected, st.level === 'facile');
      if (!best || r.pos > best.pos || (r.pos === best.pos && best.bad && !r.bad)) best = r;
    }
    if (!best) continue;
    if (!res.isFinal) { if (best.pos > st.pos) lrnSetPos(best.pos); continue; }
    const reached = Math.max(st.committed, best.pos);
    st.committed = reached;
    lrnSetPos(reached);
    if (st.done) return;
    const lvl = LRN_LEVELS[st.level];
    if (best.filler && st.level === 'difficile') { st.errors++; lrnHide('all', 'Hésitation (« euh »)… tout se recache : recommence depuis le début.', true); return; }
    if (best.bad) {
      if (lvl.scope === 'none') {
        st.errors++;
        lrnMarkNext(true);
        lrnSay(`J'ai entendu « ${best.bad} », ce n'est pas le mot attendu. Redis la suite${st.pos ? ` après « ${lrnPrevText(st)} »` : ''}.`, 'err');
      } else {
        st.errors++;
        lrnHide(lvl.scope, `« ${best.bad} » : ce n'est pas le bon mot. ${lvl.scope === 'all' ? 'Tout se recache, recommence depuis le début.' : 'La phrase se recache : reprends-la.'}`, true);
      }
    } else if (best.pos > 0) {
      lrnMarkNext(false);
      if (st.bar.querySelector('.lrn-msg').classList.contains('err')) lrnSay('C\'est reparti, continue !');
    }
  }
}
function lrnPrevText(st){
  const u = st.units[st.expected[st.pos - 1].ui];
  return u.el.textContent.replace(/[.,;:!?»«"]+$/, '');
}
// Souligne le prochain mot à trouver (en rouge juste après une erreur).
function lrnMarkNext(isError){
  const st = lrnState; if (!st) return;
  st.units.forEach(u => u.el.classList.remove('lrn-next', 'lrn-next-err'));
  if (st.pos >= st.expected.length) return;
  const u = st.units[st.expected[st.pos].ui];
  u.el.classList.add(isError ? 'lrn-next-err' : 'lrn-next');
}

function lrnSetPos(pos){
  const st = lrnState;
  if (pos === st.pos) return;
  const before = st.units.map(u => u.left);
  st.units.forEach(u => { u.left = u.toks.length; });
  for (let k = 0; k < pos; k++) st.units[st.expected[k].ui].left--;
  st.units.forEach((u, i) => { if (u.left <= 0 && before[i] > 0) { u.el.classList.add('lrn-flash'); setTimeout(() => u.el.classList.remove('lrn-flash'), 700); } });
  if (pos > st.pos) st.lastProgress = Date.now();
  st.pos = pos;
  st.best = Math.max(st.best, pos);
  lrnRender();
  lrnMarkNext(false);
  if (st.pos >= st.expected.length) lrnSuccess();
}

function lrnHint(){
  const st = lrnState; if (!st || st.done || st.pos >= st.expected.length) return;
  st.hints++;
  const ui = st.expected[st.pos].ui;
  let p = st.pos; while (p < st.expected.length && st.expected[p].ui === ui) p++; // tout le mot affiché
  st.committed = p;
  lrnSetPos(p);
  if (!st.done) lrnSay(`Indice : « ${st.units[ui].el.textContent} ». Continue !`);
}

/* Recache : 'all' = tout, 'sentence' = depuis le début de la phrase en cours. */
function lrnHide(scope, msg, isError){
  const st = lrnState; if (!st) return;
  let to = 0;
  if (scope === 'sentence' && st.pos > 0) {
    const cur = st.pos < st.expected.length ? st.expected[st.pos].sent : st.expected[st.pos - 1].sent;
    to = st.expected.findIndex(e => e.sent === cur);
    if (to < 0) to = 0;
  }
  const wasDone = st.done;
  st.done = false; st.committed = to; st.lastProgress = Date.now();
  st.box.classList.remove('lrn-won');
  if (isError) { st.box.classList.remove('lrn-shake'); void st.box.offsetWidth; st.box.classList.add('lrn-shake'); }
  st.pos = -1; lrnSetPos(to);
  if (msg) lrnSay(msg, isError ? 'err' : '');
  if (wasDone || !st.running) { if (lrnSpeechCtor()) { st.running = true; lrnListen(); } }
  if (!st.timer) st.timer = setInterval(lrnTick, 200);
}

function lrnSuccess(){
  const st = lrnState;
  st.done = true; st.running = false;
  try { st.rec && st.rec.stop(); } catch (e) {}
  st.box.classList.add('lrn-won');
  lrnMarkNext(false);
  const e = st.errors, h = st.hints;
  lrnSay(`Bravo ! Récitée en entier${h ? ` avec ${h} indice${h > 1 ? 's' : ''}` : ' sans indice'}${e ? ` et ${e} erreur${e > 1 ? 's' : ''}` : ' et sans erreur'} (niveau ${LRN_LEVELS[st.level].label.toLowerCase()}). « Recommencer » pour la réciter encore${st.level !== 'difficile' ? ', ou essaie le niveau au-dessus' : ''} !`, 'ok');
}

function lrnTick(){
  const st = lrnState; if (!st) return;
  const bar = st.bar.querySelector('.lrn-timer > div');
  const ms = LRN_LEVELS[st.level].hesitationMs;
  st.bar.querySelector('.lrn-timer').style.visibility = ms ? '' : 'hidden';
  // Hésitation : seulement une fois la récitation commencée (au moins un mot trouvé).
  if (!ms || !st.running || st.done || st.pos === 0 || st.box.classList.contains('lrn-peeking')) { bar.style.width = '0%'; return; }
  const left = Math.max(0, 1 - (Date.now() - st.lastProgress) / ms);
  bar.style.width = (left * 100) + '%';
  bar.style.background = left < .35 ? '#B3261E' : left < .65 ? '#F8AF23' : '#1F7A4D';
  if (left <= 0) {
    st.errors++;
    const scope = LRN_LEVELS[st.level].scope;
    lrnHide(scope, scope === 'all' ? 'Trop long… c\'est une hésitation : tout se recache, recommence depuis le début.' : 'Trop long… la phrase se recache : reprends-la.', true);
  }
}

function lrnRender(){
  const st = lrnState; if (!st) return;
  st.units.forEach((u, i) => {
    const shown = u.free ? lrnFreeShown(st, i) : u.left <= 0;
    u.el.classList.toggle('lrn-ok', shown);
  });
  const total = st.expected.length;
  const mic = st.bar.querySelector('.lrn-mic');
  if (mic.textContent !== 'mic_off') mic.classList.toggle('on', !!st.listening && !st.done);
  const prog = `${st.pos} / ${total} mots` + (st.best > st.pos ? ` · record ${Math.round(100 * st.best / total)} %` : '');
  st.bar.querySelector('.lrn-status').dataset.progress = prog;
}
// Une notation se dévoile quand tous les mots qui la précèdent sont trouvés.
function lrnFreeShown(st, ui){
  const next = st.expected.findIndex(e => e.ui > ui);
  const before = next === -1 ? st.expected.length : next;
  return st.pos >= before;
}
function lrnSay(msg, kind){
  const st = lrnState; if (!st) return;
  const el = st.bar.querySelector('.lrn-msg');
  el.textContent = msg;
  el.className = 'lrn-msg' + (kind ? ' ' + kind : '');
}

function lrnStop(){
  const st = lrnState; if (!st) return;
  lrnState = null;
  st.running = false;
  clearInterval(st.timer);
  try { st.rec && st.rec.abort(); } catch (e) {}
  st.bar.remove();
  st.box.classList.remove('lrn-active', 'lrn-won', 'lrn-shake', 'lrn-peeking');
  st.units.forEach(u => u.el.classList.remove('lrn-next', 'lrn-next-err'));
  lrnUnwrap(st.box);
}
// Quitter la page du chapitre (ou fermer l'onglet) coupe le micro.
window.addEventListener('hashchange', () => { if (lrnState) lrnStop(); });
document.addEventListener('visibilitychange', () => { if (document.hidden && lrnState) lrnStop(); });
