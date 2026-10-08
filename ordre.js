/* ============================================================
   JEU « REMETTRE DANS L'ORDRE » (définitions, règles, propriétés) -- demandé : « nouveau jeu
   d'apprentissage des définitions et propriétés : Remettre dans l'ordre. Un petit shaker et voilà
   que les mots sont mélangés. À l'élève de les remettre dans l'ordre... »

   Un bouton shaker sur chaque encadré .def-box (à côté du micro du mode apprentissage, même point
   d'entrée : injectLearnButtons). Au clic, le shaker s'agite, le texte de l'encadré disparaît et
   ses mots retombent en vrac dans une réserve ; l'élève les touche dans l'ordre pour reconstruire
   la phrase. Les formules et notations restent des étiquettes entières ; la ponctuation reste
   collée au mot qui la précède. Deux mots identiques (« de », « la »…) sont interchangeables.

   Trois niveaux :
   - facile    : étiquettes de quelques mots, un mot mal choisi rebondit dans la réserve ;
   - normal    : mot à mot, un mot mal choisi rebondit ;
   - difficile : mot à mot, sans aide : on place tout, puis « Vérifier » garde le début juste et
                 renvoie le reste dans la réserve ;
   - très difficile (demandé : « En niveau très difficile, c'est à l'élève d'écrire les mots ») :
                 plus de réserve, l'élève tape chaque mot (Espace ou Entrée pour le valider) ; les
                 formules, notations et la ponctuation s'écrivent seules ; accents et majuscules ne
                 sont pas exigés ; l'indice donne une lettre de plus.
   Le contenu d'origine de l'encadré est mis de côté (nœuds déplacés, pas recopiés) et remis tel
   quel en quittant.
   ============================================================ */
const ORD_NIVEAUX = {
  facile:    { label: 'Facile',    groupe: 3, aide: true },
  normal:    { label: 'Normal',    groupe: 1, aide: true },
  difficile: { label: 'Difficile', groupe: 1, aide: false },
  ecrire:    { label: 'Très difficile', groupe: 1, aide: true, ecrire: true },
};
// Comparaison d'un mot tapé : sans accents, majuscules, apostrophes ni ponctuation.
const ordNorm = t => String(t || '').toLowerCase().replace(/<[^>]*>/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/œ/g, 'oe').replace(/[^a-z0-9]/g, '');
// Étiquette qui s'écrit seule au niveau « très difficile » : formule, notation ([AB], (d), A, AB'), ponctuation.
const ordLibre = x => x.cle.startsWith('f:') || /[\[(][A-Za-z0-9'’]{1,4}[\])]/.test(x.cle) || /^[^a-zà-ÿœ]*[A-Z][^a-zà-ÿœ]*$/.test(x.cle) || !ordNorm(x.cle);
function ordNiveau(){ try { const n = localStorage.getItem('ordNiveau'); if (ORD_NIVEAUX[n]) return n; } catch (e) {} return 'facile'; }
const ORD_SHAKER = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M9.5 2.5h5l-.6 2.5h-3.8z"/><path d="M7.5 6.5h9l-1.6 13.6a1.5 1.5 0 0 1-1.5 1.4h-2.8a1.5 1.5 0 0 1-1.5-1.4z"/><path d="M8.4 11h7.2"/><path d="M3 8l1.6 1M3 12h1.8M21 8l-1.6 1M21 12h-1.8"/></svg>';
let ordEtat = null; // partie en cours (une seule à la fois)

function injectOrdreButtons(container){
  if (!container) return;
  container.querySelectorAll('.def-box').forEach(box => {
    if (box.querySelector(':scope > .ord-btn')) return;
    if (ordUnites(box).length < 4) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ord-btn';
    btn.title = 'Remettre dans l\'ordre : les mots sont mélangés, à toi de reconstruire la phrase';
    btn.setAttribute('aria-label', 'Jeu : remettre les mots dans l\'ordre');
    btn.innerHTML = ORD_SHAKER;
    btn.onclick = e => { e.stopPropagation(); ordBasculer(box); };
    box.appendChild(btn);
  });
}

/* Mots de l'encadré dans l'ordre de lecture (lecture seule) : { html, cle }. */
function ordUnites(box){
  const out = [];
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const walk = node => [...node.childNodes].forEach(ch => {
    if (ch.nodeType === Node.TEXT_NODE) {
      ch.nodeValue.split(/\s+/).filter(Boolean).forEach(w => out.push({ html: esc(w), cle: w }));
    } else if (ch.nodeType === Node.ELEMENT_NODE) {
      if (ch.matches('button, .lrn-bar, .ord-jeu, .ord-cache')) return;
      if (ch.matches('.tex, .katex, .katex-display, svg, img, math')) { out.push({ html: ch.outerHTML, cle: 'f:' + ch.textContent.replace(/\s+/g, '') }); return; }
      walk(ch);
    }
  });
  walk(box);
  // Ponctuation isolée (« : », « ; », « ! » à la française) collée au mot précédent ; « « » au suivant.
  const res = [];
  out.forEach(u => {
    if (/^[.,;:!?»)\]]+$/.test(u.cle) && res.length) { const p = res[res.length - 1]; p.html += ' ' + u.html; p.cle += ' ' + u.cle; return; }
    res.push(u);
  });
  for (let i = res.length - 2; i >= 0; i--) if (/^[«(\[]+$/.test(res[i].cle)) { res[i + 1].html = res[i].html + ' ' + res[i + 1].html; res[i + 1].cle = res[i].cle + ' ' + res[i + 1].cle; res.splice(i, 1); }
  return res;
}
// Étiquettes : mot à mot, ou groupes de n mots (sans franchir la fin d'une phrase).
function ordEtiquettes(unites, n){
  if (n <= 1) return unites.map(u => ({ ...u }));
  const out = []; let cur = null;
  unites.forEach(u => {
    if (!cur) cur = { html: u.html, cle: u.cle, k: 1 };
    else { cur.html += ' ' + u.html; cur.cle += '|' + u.cle; cur.k++; }
    if (cur.k >= n || /[.;:!?]$/.test(u.cle)) { out.push(cur); cur = null; }
  });
  if (cur) out.push(cur);
  return out;
}
function ordMelanger(arr){
  const a = arr.slice();
  for (let essai = 0; essai < 8; essai++) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (a.length < 3 || a.some((x, i) => x !== arr[i])) break;
  }
  return a;
}

function ordBasculer(box){
  if (ordEtat && ordEtat.box === box) { ordQuitter(); return; }
  if (ordEtat) ordQuitter();
  if (typeof lrnState !== 'undefined' && lrnState && typeof lrnStop === 'function') lrnStop();
  ordDemarrer(box);
}

function ordDemarrer(box){
  const unites = ordUnites(box);
  // Le contenu d'origine est mis de côté tel quel (formules rendues, figures…) et remis en quittant.
  const cache = document.createElement('div');
  cache.className = 'ord-cache'; cache.hidden = true;
  [...box.childNodes].filter(n => !(n.nodeType === Node.ELEMENT_NODE && n.matches('button'))).forEach(n => cache.appendChild(n));
  box.insertBefore(cache, box.firstChild);
  const jeu = document.createElement('div');
  jeu.className = 'ord-jeu';
  jeu.innerHTML = `
    <div class="ord-tete"><span class="ord-shaker">${ORD_SHAKER.replace(/width="17" height="17"/, 'width="30" height="30"')}</span>
      <b>Remets les mots dans l'ordre</b><span class="ord-prog"></span></div>
    <div class="ord-phrase" aria-live="polite"></div>
    <div class="ord-reserve"></div>
    <div class="ord-saisie"><input type="text" class="ord-champ" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Mot suivant"><button type="button" class="ord-ok"><span class=gicon>keyboard_return</span> OK</button></div>
    <div class="ord-msg"></div>
    <div class="ord-actions">
      <span class="ord-niveaux" role="group" aria-label="Niveau">${Object.entries(ORD_NIVEAUX).map(([k, v]) => `<button type="button" data-niveau="${k}">${v.label}</button>`).join('')}</span>
      <button type="button" class="ord-verif"><span class=gicon>task_alt</span> Vérifier</button>
      <button type="button" class="ord-indice"><span class=gicon>lightbulb</span> Indice</button>
      <button type="button" class="ord-secouer"><span class=gicon>shuffle</span> Secouer</button>
      <button type="button" class="ord-stop"><span class=gicon>close</span> Quitter</button>
    </div>`;
  box.insertBefore(jeu, cache.nextSibling);
  box.classList.add('ord-active');
  ordEtat = { box, jeu, cache, unites, niveau: ordNiveau() };
  jeu.addEventListener('click', e => e.stopPropagation());
  jeu.querySelectorAll('.ord-niveaux button').forEach(b => b.onclick = () => {
    ordEtat.niveau = b.dataset.niveau; try { localStorage.setItem('ordNiveau', b.dataset.niveau); } catch (e) {}
    ordNouvellePartie();
  });
  jeu.querySelector('.ord-verif').onclick = ordVerifier;
  jeu.querySelector('.ord-indice').onclick = ordIndice;
  jeu.querySelector('.ord-secouer').onclick = () => ordEtat.gagne ? ordNouvellePartie() : ordSecouer();
  jeu.querySelector('.ord-stop').onclick = ordQuitter;
  const champ = jeu.querySelector('.ord-champ');
  champ.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); ordEcrire(); } });
  champ.addEventListener('input', () => { champ.classList.remove('ord-non'); if (/\s$/.test(champ.value)) ordEcrire(); });
  jeu.querySelector('.ord-ok').onclick = () => { ordEcrire(); champ.focus(); };
  ordNouvellePartie();
}

function ordNouvellePartie(){
  const st = ordEtat; if (!st) return;
  const niv = ORD_NIVEAUX[st.niveau];
  st.solution = ordEtiquettes(st.unites, niv.groupe).map((x, i) => ({ ...x, id: i }));
  st.places = []; st.erreurs = 0; st.indices = 0; st.gagne = false; st.debut = Date.now(); st.lettres = 0;
  st.reserve = niv.ecrire ? [] : ordMelanger(st.solution);
  const champ = st.jeu.querySelector('.ord-champ'); champ.value = '';
  if (niv.ecrire) {
    ordMessage('Écris la phrase de mémoire, mot à mot : tape un mot puis Espace ou Entrée. Les formules et notations s\'écrivent seules ; accents et majuscules ne sont pas exigés.');
    ordAvancerLibres(); ordRendre(true); setTimeout(() => champ.focus(), 60); return;
  }
  st.jeu.querySelectorAll('.ord-niveaux button').forEach(b => b.classList.toggle('on', b.dataset.niveau === st.niveau));
  st.box.classList.remove('ord-gagne');
  ordMessage(niv.aide ? 'Touche les mots dans l\'ordre de la phrase. Un mot mal choisi retourne dans le shaker.'
    : 'Place tous les mots (touche un mot placé pour le retirer), puis « Vérifier ».');
  ordRendre(true);
}

function ordRendre(chute){
  const st = ordEtat; if (!st) return;
  const niv = ORD_NIVEAUX[st.niveau];
  const phrase = st.jeu.querySelector('.ord-phrase'), reserve = st.jeu.querySelector('.ord-reserve');
  phrase.innerHTML = st.places.map((x, i) => `<button type="button" class="ord-p ord-place${x.ok ? ' ok' : ''}" data-i="${i}" ${x.ok || niv.aide ? 'tabindex="-1"' : ''}>${x.html}</button>`).join('')
    + (st.gagne ? '' : '<span class="ord-curseur"></span>');
  if (niv.ecrire && !st.gagne) phrase.innerHTML = phrase.innerHTML.replace('<span class="ord-curseur"></span>', '') + '<span class="ord-curseur"></span>' + st.solution.slice(st.places.length).map(() => '<span class="ord-trou"></span>').join('');
  reserve.style.display = niv.ecrire ? 'none' : '';
  st.jeu.querySelector('.ord-tete b').textContent = niv.ecrire ? 'Écris la phrase de mémoire' : 'Remets les mots dans l\'ordre';
  st.jeu.querySelector('.ord-saisie').style.display = niv.ecrire && !st.gagne ? '' : 'none';
  reserve.innerHTML = st.reserve.map((x, i) => `<button type="button" class="ord-p${chute ? ' ord-chute' : ''}" data-r="${i}" style="--d:${(Math.random() * .35).toFixed(2)}s;--x:${Math.round(Math.random() * 120 - 60)}px;--y:${Math.round(-60 - Math.random() * 60)}px;--a:${Math.round(Math.random() * 120 - 60)}deg">${x.html}</button>`).join('');
  reserve.querySelectorAll('[data-r]').forEach(b => b.onclick = () => ordChoisir(Number(b.dataset.r), b));
  if (!niv.aide) phrase.querySelectorAll('.ord-place:not(.ok)').forEach(b => b.onclick = () => ordRetirer(Number(b.dataset.i)));
  st.jeu.querySelector('.ord-prog').textContent = `${st.places.filter(x => x.ok || niv.aide).length} / ${st.solution.length}`;
  const verif = st.jeu.querySelector('.ord-verif');
  verif.style.display = niv.aide || st.gagne ? 'none' : '';
  verif.disabled = st.reserve.length > 0;
  st.jeu.querySelector('.ord-indice').style.display = st.gagne ? 'none' : '';
  st.jeu.querySelector('.ord-secouer').style.display = niv.ecrire && !st.gagne ? 'none' : '';
  st.jeu.querySelector('.ord-secouer').innerHTML = st.gagne ? '<span class=gicon>replay</span> Rejouer' : '<span class=gicon>shuffle</span> Secouer';
  if (chute) { const sh = st.jeu.querySelector('.ord-shaker'); sh.classList.remove('agite'); void sh.offsetWidth; sh.classList.add('agite'); }
}

function ordChoisir(r, el){
  const st = ordEtat; if (!st || st.gagne) return;
  const niv = ORD_NIVEAUX[st.niveau], x = st.reserve[r];
  if (niv.aide) {
    const attendu = st.solution[st.places.length];
    if (x.cle !== attendu.cle) { // mauvais mot : il rebondit
      st.erreurs++;
      el.classList.remove('ord-non'); void el.offsetWidth; el.classList.add('ord-non');
      ordMessage('Pas encore ce mot-là… relis le début de la phrase.', 'err');
      return;
    }
    st.places.push({ ...x, ok: true });
  } else st.places.push({ ...x });
  st.reserve.splice(r, 1);
  if (niv.aide) ordMessage('');
  ordRendre(false);
  if (niv.aide && !st.reserve.length) ordGagne();
}
// Niveau « très difficile » : les étiquettes qui s'écrivent seules sont placées dès qu'on les atteint.
function ordAvancerLibres(){
  const st = ordEtat;
  while (st.places.length < st.solution.length && ordLibre(st.solution[st.places.length])) st.places.push({ ...st.solution[st.places.length], ok: true });
}
function ordEcrire(){
  const st = ordEtat; if (!st || st.gagne || !ORD_NIVEAUX[st.niveau].ecrire) return;
  const champ = st.jeu.querySelector('.ord-champ'), tape = champ.value.trim();
  if (!tape) { champ.value = ''; return; }
  const attendu = st.solution[st.places.length]; if (!attendu) return;
  if (ordNorm(tape) !== ordNorm(attendu.cle)) {
    st.erreurs++;
    champ.value = tape;
    champ.classList.remove('ord-non'); void champ.offsetWidth; champ.classList.add('ord-non');
    ordMessage(`« ${tape} » n'est pas le mot attendu. Corrige-le, ou demande un indice.`, 'err');
    champ.select();
    return;
  }
  st.places.push({ ...attendu, ok: true }); st.lettres = 0;
  champ.value = '';
  ordAvancerLibres();
  ordMessage('');
  if (st.places.length === st.solution.length) { ordGagne(); return; }
  ordRendre(false);
  champ.focus();
}
function ordRetirer(i){
  const st = ordEtat; if (!st) return;
  const [x] = st.places.splice(i, 1);
  st.reserve.push({ ...x, ok: false });
  ordRendre(false);
}
// Niveau difficile : le début juste reste en place, le reste retourne dans la réserve.
function ordVerifier(){
  const st = ordEtat; if (!st || st.reserve.length) return;
  let k = 0;
  while (k < st.places.length && st.places[k].cle === st.solution[k].cle) k++;
  if (k === st.solution.length) { st.places.forEach(x => x.ok = true); ordRendre(false); ordGagne(); return; }
  st.erreurs++;
  const phrase = st.jeu.querySelector('.ord-phrase');
  phrase.querySelectorAll('.ord-place').forEach((b, i) => b.classList.add(i < k ? 'ok' : 'faux'));
  ordMessage(k ? `Les ${k} premier${k > 1 ? 's' : ''} mot${k > 1 ? 's sont' : ' est'} bien placé${k > 1 ? 's' : ''}. La suite retourne dans le shaker !` : 'Le premier mot n\'est pas le bon : tout retourne dans le shaker !', 'err');
  setTimeout(() => {
    if (ordEtat !== st) return;
    const reste = st.places.splice(k).map(x => ({ ...x, ok: false }));
    st.places.forEach(x => x.ok = true);
    st.reserve = ordMelanger(reste);
    ordRendre(true);
  }, 1300);
}
function ordIndice(){
  const st = ordEtat; if (!st || st.gagne) return;
  const niv = ORD_NIVEAUX[st.niveau];
  if (niv.ecrire) { // une lettre de plus du mot attendu
    const attendu = st.solution[st.places.length]; if (!attendu) return;
    const mot = attendu.cle.replace(/[.,;:!?»)\]]+$/g, '').replace(/^[«(\[]+/, '').trim();
    st.indices++; st.lettres = Math.min(mot.length, (st.lettres || 0) + 1);
    const champ = st.jeu.querySelector('.ord-champ');
    champ.value = mot.slice(0, st.lettres); champ.focus();
    ordMessage(st.lettres >= mot.length ? 'Indice : voici le mot entier, valide-le.' : `Indice : le mot commence par « ${mot.slice(0, st.lettres)} ».`);
    return;
  }
  // Mot attendu après le début juste de la phrase.
  let k = 0;
  while (k < st.places.length && st.places[k].cle === st.solution[k].cle) k++;
  if (!niv.aide && k < st.places.length) { ordMessage('Indice : la phrase est juste jusqu\'au mot n° ' + k + '. Retire les mots suivants.', ''); st.indices++; return; }
  const attendu = st.solution[k]; if (!attendu) return;
  const r = st.reserve.findIndex(x => x.cle === attendu.cle);
  const b = st.jeu.querySelector(`.ord-reserve [data-r="${r}"]`);
  if (!b) return;
  st.indices++;
  b.classList.remove('ord-indice-on'); void b.offsetWidth; b.classList.add('ord-indice-on');
  ordMessage('Indice : le mot qui clignote vient ensuite.');
}
function ordSecouer(){
  const st = ordEtat; if (!st) return;
  st.reserve = ordMelanger(st.reserve);
  st.box.classList.remove('ord-secoue'); void st.box.offsetWidth; st.box.classList.add('ord-secoue');
  ordRendre(true);
}
function ordGagne(){
  const st = ordEtat;
  st.gagne = true;
  const s = Math.round((Date.now() - st.debut) / 1000), e = st.erreurs, h = st.indices;
  const duree = s >= 60 ? `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s` : `${s} s`;
  st.box.classList.add('ord-gagne');
  ordMessage(`Bravo ! Phrase reconstituée en ${duree}${e ? `, ${e} erreur${e > 1 ? 's' : ''}` : ', sans erreur'}${h ? `, ${h} indice${h > 1 ? 's' : ''}` : ''} (niveau ${ORD_NIVEAUX[st.niveau].label.toLowerCase()}).${st.niveau !== 'ecrire' ? ' Essaie le niveau au-dessus !' : ''}`, 'ok');
  ordRendre(false);
}
function ordMessage(msg, type){
  const st = ordEtat; if (!st) return;
  const el = st.jeu.querySelector('.ord-msg');
  el.textContent = msg; el.className = 'ord-msg' + (type ? ' ' + type : '');
}
function ordQuitter(){
  const st = ordEtat; if (!st) return;
  ordEtat = null;
  st.jeu.remove();
  [...st.cache.childNodes].forEach(n => st.box.insertBefore(n, st.cache));
  st.cache.remove();
  st.box.classList.remove('ord-active', 'ord-gagne', 'ord-secoue');
}
window.addEventListener('hashchange', () => { if (ordEtat) ordQuitter(); });
// Copie d'un cours (PDF, cahier, cours personnalisé) : un jeu en cours laisse place au texte d'origine.
function ordNettoyer(root){
  if (!root) return;
  root.querySelectorAll('.ord-jeu').forEach(j => j.remove());
  root.querySelectorAll('.ord-cache').forEach(c => { [...c.childNodes].forEach(n => c.parentNode.insertBefore(n, c)); c.remove(); });
  root.querySelectorAll('.ord-active, .ord-gagne, .ord-secoue').forEach(b => b.classList.remove('ord-active', 'ord-gagne', 'ord-secoue'));
}
