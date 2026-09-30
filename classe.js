/* =====================================================================
   classe.js -- Outils de classe (menu Outils prof)

   Demandé : « Dans les outils du prof, créer un nouveau menu avec des blocs qui permettent :
   - la roue de la chance : tirage au sort d'un élève. S'il a été tiré, il disparaît de la roue.
     Réinitialisation possible ;
   - un compte à rebours déplaçable ou seul à l'écran sous forme de sablier par exemple. »

   - Roue : élèves de la classe choisie (ou une liste libre), absents à décocher. Chaque élève tiré
     sort de la roue et s'ajoute à « Déjà passés » (remettre un élève, ou tout réinitialiser). Tirage
     équitable (crypto.getRandomValues), mémorisé par classe sur cet appareil (localStorage).
   - Compte à rebours : un seul minuteur, affiché au choix dans une petite fenêtre flottante
     déplaçable -- qui reste à l'écran quand on change de page (cours, géométrie...) -- ou seul à
     l'écran, en plein écran, sous forme de sablier. Fin : chiffres qui clignotent et petit carillon.

   Dépend d'app.js (sb, currentUser, currentClassId, accountClassesList, showView, niceAlert).
   ===================================================================== */

const CL_COULEURS = ['#0C5BA0', '#E07B00', '#1F7A4D', '#7B3FA0', '#C62828', '#00838F', '#8B5E34', '#AD1457'];
let clRoue = { classe: '', noms: [], tires: [], absents: [], angle: 0, tourne: false };

function clEsc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function clAlea(n){ const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }

function renderClasseOutils(){
  const root = document.getElementById('classeRoot'); if(!root) return;
  const classes = (typeof accountClassesList !== 'undefined' ? accountClassesList : []);
  const sel = clRoue.classe || (typeof currentClassId !== 'undefined' && currentClassId) || (classes[0] && classes[0].id) || 'libre';
  root.innerHTML = `
  <div class="cl-grille">
    <section class="cl-bloc" id="clBlocRoue">
      <h2><span class="gicon">casino</span> La roue de la chance</h2>
      <p class="hint" style="margin:0 0 10px;">Tirage au sort d'un élève : une fois tiré, il sort de la roue.</p>
      <div class="cl-ligne">
        <select id="clRoueClasse" onchange="clRoueCharger(this.value)">
          ${classes.map(c => `<option value="${c.id}" ${c.id === sel ? 'selected' : ''}>${clEsc(c.label)}</option>`).join('')}
          <option value="libre" ${sel === 'libre' ? 'selected' : ''}>Liste libre (noms, équipes…)</option>
        </select>
        <button type="button" class="btn secondary" onclick="clRoueReinit()" title="Remettre tous les élèves dans la roue"><span class="gicon">restart_alt</span> Réinitialiser</button>
        <button type="button" class="btn secondary" onclick="clPleinEcran('clBlocRoue')" title="Plein écran (à projeter)"><span class="gicon">fullscreen</span></button>
      </div>
      <textarea id="clRoueLibre" rows="3" placeholder="Un nom par ligne (ou séparés par des virgules)" style="display:none;" oninput="clRoueLibreMaj()"></textarea>
      <div class="cl-roue-zone">
        <div class="cl-roue-cadre">
          <svg id="clRoueSvg" viewBox="-160 -160 320 320"></svg>
          <div class="cl-roue-fleche"></div>
          <button type="button" class="cl-roue-lancer" id="clRoueLancer" onclick="clRoueLancer()">Lancer</button>
        </div>
        <div class="cl-roue-listes">
          <div id="clRoueResultat" class="cl-roue-resultat"></div>
          <details><summary>Absents (<span id="clAbsN">0</span>)</summary><div id="clRoueAbsents" class="cl-roue-abs"></div></details>
          <div><b>Déjà passés</b> <span class="hint" id="clTiresN" style="margin:0;"></span><ol id="clRoueTires" class="cl-roue-tires"></ol></div>
        </div>
      </div>
    </section>

    <section class="cl-bloc" id="clBlocMinuteur">
      <h2><span class="gicon">hourglass_top</span> Compte à rebours</h2>
      <p class="hint" style="margin:0 0 10px;">Dans une petite fenêtre qu'on déplace (elle reste affichée quand on change de page), ou seul à l'écran en sablier.</p>
      <div class="cl-ligne">
        ${[1, 2, 3, 5, 10, 15].map(m => `<button type="button" class="btn secondary cl-preset" onclick="clMinRegler(${m * 60})">${m} min</button>`).join('')}
      </div>
      <div class="cl-ligne">
        <label>Durée <input type="number" id="clMinM" min="0" max="180" value="${Math.floor(clMin.duree / 60)}" style="width:70px;"> min</label>
        <input type="number" id="clMinS" min="0" max="59" value="${clMin.duree % 60}" style="width:70px;"> s
        <label class="hint" style="margin:0;display:flex;gap:6px;align-items:center;"><input type="checkbox" id="clMinSon" ${clMin.son ? 'checked' : ''} onchange="clMin.son=this.checked"> Son à la fin</label>
      </div>
      <div class="cl-min-apercu"><div id="clMinApercu">${clMinTexte(clMin.duree)}</div></div>
      <div class="cl-ligne">
        <button type="button" class="btn" onclick="clMinLancer('flottant')"><span class="gicon">picture_in_picture</span> Fenêtre déplaçable</button>
        <button type="button" class="btn" onclick="clMinLancer('sablier')"><span class="gicon">hourglass_bottom</span> Sablier plein écran</button>
      </div>
    </section>
  </div>`;
  clRoueCharger(sel);
}

/* ---------------------------- Roue de la chance ---------------------------- */
function clRoueCle(){ return 'clRoue:' + (currentUser ? currentUser.id : 'anon') + ':' + clRoue.classe; }
function clRoueSauver(){ try{ localStorage.setItem(clRoueCle(), JSON.stringify({ tires: clRoue.tires, absents: clRoue.absents, libre: clRoue.classe === 'libre' ? clRoue.noms : undefined })); }catch(e){} }
async function clRoueCharger(classe){
  clRoue = { classe, noms: [], tires: [], absents: [], angle: 0, tourne: false };
  let memo = {}; try{ memo = JSON.parse(localStorage.getItem(clRoueCle()) || '{}') || {}; }catch(e){}
  const zone = document.getElementById('clRoueLibre');
  if(classe === 'libre'){
    clRoue.noms = Array.isArray(memo.libre) ? memo.libre : [];
    if(zone){ zone.style.display = ''; zone.value = clRoue.noms.join('\n'); }
  } else {
    if(zone) zone.style.display = 'none';
    const { data } = await sb.from('class_students').select('profiles(id,nom,prenom)').eq('class_id', classe);
    const eleves = (data || []).map(r => r.profiles).filter(Boolean).sort((a, b) => (a.prenom || '').localeCompare(b.prenom || '') || (a.nom || '').localeCompare(b.nom || ''));
    // Prénom seul ; initiale du nom si deux élèves ont le même prénom.
    const nbPrenom = {}; eleves.forEach(e => { const p = (e.prenom || e.nom || '?').trim(); nbPrenom[p] = (nbPrenom[p] || 0) + 1; });
    clRoue.noms = eleves.map(e => { const p = (e.prenom || e.nom || '?').trim(); return nbPrenom[p] > 1 && e.nom ? p + ' ' + e.nom.trim()[0] + '.' : p; });
  }
  clRoue.tires = (memo.tires || []).filter(n => clRoue.noms.includes(n));
  clRoue.absents = (memo.absents || []).filter(n => clRoue.noms.includes(n));
  clRoueDessiner();
}
function clRoueLibreMaj(){
  clRoue.noms = [...new Set(document.getElementById('clRoueLibre').value.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean))];
  clRoue.tires = clRoue.tires.filter(n => clRoue.noms.includes(n)); clRoue.absents = clRoue.absents.filter(n => clRoue.noms.includes(n));
  clRoueSauver(); clRoueDessiner();
}
function clRoueRestants(){ return clRoue.noms.filter(n => !clRoue.tires.includes(n) && !clRoue.absents.includes(n)); }
function clRoueDessiner(){
  const svg = document.getElementById('clRoueSvg'); if(!svg) return;
  const r = clRoueRestants(), n = r.length, R = 150;
  let h = `<g id="clRoueRot" style="transform:rotate(${clRoue.angle}deg);">`;
  if(!n) h += `<circle r="${R}" fill="#F4F5F8" stroke="#C9CED6" stroke-width="3"/><text y="6" text-anchor="middle" font-size="16" fill="#5B6472" font-family="Space Grotesk, Arial">${clRoue.noms.length ? 'Tout le monde est passé !' : 'Aucun élève'}</text>`;
  else if(n === 1) h += `<circle r="${R}" fill="${CL_COULEURS[0]}"/><text y="7" text-anchor="middle" font-size="22" font-weight="700" fill="#fff" font-family="Space Grotesk, Arial">${clEsc(r[0])}</text>`;
  else {
    const pas = 360 / n, fs = Math.max(9, Math.min(18, 260 / n + 6));
    r.forEach((nom, i) => {
      const a0 = (i * pas - 90) * Math.PI / 180, a1 = ((i + 1) * pas - 90) * Math.PI / 180;
      const x0 = R * Math.cos(a0), y0 = R * Math.sin(a0), x1 = R * Math.cos(a1), y1 = R * Math.sin(a1);
      const coul = CL_COULEURS[(i + (n % CL_COULEURS.length === 1 && i === n - 1 ? 1 : 0)) % CL_COULEURS.length];
      h += `<path d="M0,0 L${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${pas > 180 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${coul}" stroke="#fff" stroke-width="2"/>`;
      const am = (i + 0.5) * pas - 90, court = nom.length > 14 ? nom.slice(0, 13) + '…' : nom;
      // Moitié gauche de la roue : texte retourné pour rester lisible (jamais la tête en bas).
      const aN = ((am % 360) + 360) % 360, gauche = aN > 90 && aN < 270;
      h += `<text transform="rotate(${(gauche ? am + 180 : am).toFixed(2)}) translate(${gauche ? -(R - 12) : R - 12},0)" text-anchor="${gauche ? 'start' : 'end'}" dominant-baseline="middle" font-size="${fs.toFixed(1)}" font-weight="700" fill="#fff" font-family="Space Grotesk, Arial">${clEsc(court)}</text>`;
    });
  }
  h += `</g><circle r="22" fill="#fff" stroke="#20242E" stroke-width="3"/>`;
  svg.innerHTML = h;
  const tires = document.getElementById('clRoueTires');
  if(tires) tires.innerHTML = clRoue.tires.map(nom => `<li>${clEsc(nom)} <button type="button" class="cl-mini" title="Remettre dans la roue" onclick="clRoueRemettre(${clEsc(JSON.stringify(nom))})"><span class="gicon">undo</span></button></li>`).join('');
  const tn = document.getElementById('clTiresN'); if(tn) tn.textContent = `(${clRoue.tires.length} / ${clRoue.noms.length - clRoue.absents.length})`;
  const abs = document.getElementById('clRoueAbsents');
  if(abs) abs.innerHTML = clRoue.noms.length ? clRoue.noms.map(nom => `<label><input type="checkbox" ${clRoue.absents.includes(nom) ? 'checked' : ''} onchange="clRoueAbsent(${clEsc(JSON.stringify(nom))}, this.checked)"> ${clEsc(nom)}</label>`).join('') : '<span class="hint">Aucun élève.</span>';
  const an = document.getElementById('clAbsN'); if(an) an.textContent = clRoue.absents.length;
  const b = document.getElementById('clRoueLancer'); if(b) b.disabled = !n || clRoue.tourne;
}
function clRoueAbsent(nom, oui){ clRoue.absents = clRoue.absents.filter(x => x !== nom); if(oui) clRoue.absents.push(nom); clRoueSauver(); clRoueDessiner(); }
function clRoueRemettre(nom){ clRoue.tires = clRoue.tires.filter(x => x !== nom); clRoueSauver(); clRoueDessiner(); }
async function clRoueReinit(){
  if(clRoue.tires.length && !(await niceConfirm('Remettre tous les élèves dans la roue ?'))) return;
  clRoue.tires = []; clRoueSauver(); document.getElementById('clRoueResultat').innerHTML = ''; clRoueDessiner();
}
function clRoueLancer(){
  const r = clRoueRestants(), n = r.length; if(!n || clRoue.tourne) return;
  const i = clAlea(n), pas = 360 / n;
  // L'élève i doit finir sous la flèche (en haut) : son milieu à 0°, après 5 à 7 tours complets.
  const cible = -((i + 0.5) * pas) + (Math.random() - 0.5) * pas * 0.6;
  const base = clRoue.angle - (clRoue.angle % 360);
  clRoue.angle = base + 360 * (5 + clAlea(3)) + ((cible % 360) + 360) % 360;
  clRoue.tourne = true;
  const g = document.getElementById('clRoueRot'), res = document.getElementById('clRoueResultat');
  res.innerHTML = '';
  document.getElementById('clRoueLancer').disabled = true;
  g.style.transition = 'transform 5s cubic-bezier(.12,.72,.14,1)';
  requestAnimationFrame(() => { g.style.transform = `rotate(${clRoue.angle}deg)`; });
  clTicTac(5000);
  setTimeout(() => {
    const nom = r[i];
    clRoue.tourne = false; clRoue.tires.push(nom); clRoueSauver();
    res.innerHTML = `<span class="cl-roue-gagnant">${clEsc(nom)}</span>`;
    clCarillon([660, 880]);
    // L'élève sort de la roue un instant après, pour qu'on voie bien sur qui elle s'est arrêtée.
    setTimeout(() => { clRoue.angle = 0; clRoueDessiner(); }, 1600);
  }, 5100);
}

/* ------------------------------ Compte à rebours ------------------------------ */
let clMin = { duree: 300, reste: 300, fin: 0, marche: false, mode: null, son: true, t: null, fini: false };
function clMinTexte(s){ s = Math.max(0, Math.ceil(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
function clMinRegler(sec){
  const m = document.getElementById('clMinM'), s = document.getElementById('clMinS');
  if(m) m.value = Math.floor(sec / 60); if(s) s.value = sec % 60;
  clMin.duree = sec; const a = document.getElementById('clMinApercu'); if(a) a.textContent = clMinTexte(sec);
}
function clMinLireDuree(){
  const m = +(document.getElementById('clMinM') || {}).value || 0, s = +(document.getElementById('clMinS') || {}).value || 0;
  return Math.max(1, Math.min(180 * 60, m * 60 + s));
}
function clMinLancer(mode){
  clMin.duree = clMinLireDuree(); clMin.reste = clMin.duree; clMin.fini = false;
  clMin.mode = mode; clMinAfficher(); clMinDemarrer();
}
function clMinDemarrer(){
  if(clMin.reste <= 0) clMin.reste = clMin.duree;
  clMin.fini = false; clMin.marche = true; clMin.fin = Date.now() + clMin.reste * 1000;
  clearInterval(clMin.t); clMin.t = setInterval(clMinTic, 200); clMinTic();
}
function clMinPause(){
  if(clMin.marche){ clMin.reste = Math.max(0, (clMin.fin - Date.now()) / 1000); clMin.marche = false; clearInterval(clMin.t); clMinMaj(); }
  else clMinDemarrer();
}
function clMinRemettre(){ clMin.marche = false; clearInterval(clMin.t); clMin.reste = clMin.duree; clMin.fini = false; clMinMaj(); }
function clMinAjouter(sec){ if(clMin.marche) clMin.fin += sec * 1000; else clMin.reste += sec; clMin.duree = Math.max(clMin.duree, Math.ceil(clMin.marche ? (clMin.fin - Date.now()) / 1000 : clMin.reste)); clMin.fini = false; clMinMaj(); }
function clMinFermer(){ clMin.marche = false; clearInterval(clMin.t); clMin.mode = null; document.getElementById('clMinFlottant')?.remove(); document.getElementById('clMinPlein')?.remove(); if(document.fullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
function clMinTic(){
  if(clMin.marche){
    clMin.reste = Math.max(0, (clMin.fin - Date.now()) / 1000);
    if(clMin.reste <= 0){ clMin.marche = false; clearInterval(clMin.t); clMin.fini = true; if(clMin.son) clCarillon([880, 660, 880, 660]); }
  }
  clMinMaj();
}
function clMinBoutons(){
  return `<button type="button" onclick="clMinPause()" title="Pause / reprendre"><span class="gicon">${clMin.marche ? 'pause' : 'play_arrow'}</span></button>
    <button type="button" onclick="clMinRemettre()" title="Recommencer"><span class="gicon">replay</span></button>
    <button type="button" onclick="clMinAjouter(60)" title="Une minute de plus">+1 min</button>`;
}
function clMinAfficher(){
  document.getElementById('clMinFlottant')?.remove(); document.getElementById('clMinPlein')?.remove();
  if(clMin.mode === 'flottant'){
    const w = document.createElement('div'); w.id = 'clMinFlottant'; w.className = 'cl-min-flottant';
    let pos = null; try{ pos = JSON.parse(localStorage.getItem('clMinPos') || 'null'); }catch(e){}
    if(pos){ w.style.left = Math.min(window.innerWidth - 230, Math.max(0, pos.x)) + 'px'; w.style.top = Math.min(window.innerHeight - 120, Math.max(0, pos.y)) + 'px'; }
    w.innerHTML = `<div class="cl-min-poignee" title="Déplacer"><span class="gicon">drag_indicator</span><span class="cl-min-mini-sablier">${clSablierSvg(1)}</span>
        <button type="button" onclick="clMin.mode='sablier';clMinAfficher()" title="Sablier plein écran"><span class="gicon">fullscreen</span></button>
        <button type="button" onclick="clMinFermer()" title="Fermer"><span class="gicon">close</span></button></div>
      <div class="cl-min-chiffres" id="clMinChiffres"></div><div class="cl-min-btns" id="clMinBtns"></div>`;
    document.body.appendChild(w);
    clDeplacable(w, w.querySelector('.cl-min-poignee'));
  } else if(clMin.mode === 'sablier'){
    const o = document.createElement('div'); o.id = 'clMinPlein'; o.className = 'cl-min-plein';
    o.innerHTML = `<div class="cl-min-plein-sablier" id="clMinSablier"></div><div class="cl-min-chiffres" id="clMinChiffres"></div>
      <div class="cl-min-btns" id="clMinBtns"></div>
      <div class="cl-min-plein-haut"><button type="button" onclick="clMin.mode='flottant';clMinAfficher();if(document.fullscreenElement)(document.exitFullscreen||document.webkitExitFullscreen).call(document)" title="Réduire en petite fenêtre"><span class="gicon">picture_in_picture</span></button>
        <button type="button" onclick="clMinFermer()" title="Fermer (Échap)"><span class="gicon">close</span></button></div>`;
    document.body.appendChild(o);
    const f = o.requestFullscreen || o.webkitRequestFullscreen; if(f) f.call(o).catch(() => {});
  }
  clMinMaj();
}
function clMinMaj(){
  const a = document.getElementById('clMinApercu'); if(a && !clMin.mode) a.textContent = clMinTexte(clMin.duree);
  const c = document.getElementById('clMinChiffres'); if(c){ c.textContent = clMinTexte(clMin.reste); c.classList.toggle('fini', clMin.fini); }
  const b = document.getElementById('clMinBtns'); if(b) b.innerHTML = clMinBoutons();
  const frac = clMin.duree ? Math.max(0, Math.min(1, clMin.reste / clMin.duree)) : 0;
  const s = document.getElementById('clMinSablier'); if(s) s.innerHTML = clSablierSvg(frac, clMin.marche);
  const m = document.querySelector('.cl-min-mini-sablier'); if(m) m.innerHTML = clSablierSvg(frac, clMin.marche);
}
document.addEventListener('keydown', e => { if(e.key === 'Escape' && document.getElementById('clMinPlein')){ clMin.mode = 'flottant'; clMinAfficher(); } });
document.addEventListener('fullscreenchange', () => { if(!document.fullscreenElement && document.getElementById('clMinPlein')){ clMin.mode = 'flottant'; clMinAfficher(); } });

// Sablier : frac = part du temps qui reste (sable en haut) ; le reste est tombé en bas.
let clSabN = 0;
function clSablierSvg(frac, coule){
  const H = 100, verreH = `M20,8 H80 V14 C80,34 58,44 54,50 C58,56 80,66 80,86 V92 H20 V86 C20,66 42,56 46,50 C42,44 20,34 20,14 Z`;
  const yHaut = 16 + (1 - frac) * 32, yBas = 90 - (1 - frac) * 30, id = 'clVerre' + (++clSabN);
  return `<svg viewBox="0 0 100 ${H}" aria-hidden="true">
    <defs><clipPath id="${id}"><path d="${verreH}"/></clipPath></defs>
    <g clip-path="url(#${id})">
      <rect x="0" y="${yHaut.toFixed(1)}" width="100" height="${(48 - yHaut + 2).toFixed(1)}" fill="#F2B84B"/>
      <rect x="0" y="${yBas.toFixed(1)}" width="100" height="${(92 - yBas).toFixed(1)}" fill="#F2B84B"/>
      ${coule && frac > 0 ? '<rect x="48.8" y="48" width="2.4" height="44" fill="#E0A233" class="cl-filet"/>' : ''}
    </g>
    <path d="${verreH}" fill="rgba(180,215,240,.25)" stroke="#8B5E34" stroke-width="2.5"/>
    <rect x="12" y="2" width="76" height="7" rx="3" fill="#8B5E34"/><rect x="12" y="91" width="76" height="7" rx="3" fill="#8B5E34"/>
  </svg>`;
}

/* --------------------------------- Utilitaires --------------------------------- */
function clDeplacable(el, poignee){
  let dx = 0, dy = 0, bouge = false;
  poignee.addEventListener('pointerdown', e => {
    if(e.target.closest('button')) return;
    const r = el.getBoundingClientRect(); dx = e.clientX - r.left; dy = e.clientY - r.top; bouge = true; poignee.setPointerCapture(e.pointerId);
  });
  poignee.addEventListener('pointermove', e => {
    if(!bouge) return;
    const x = Math.min(window.innerWidth - el.offsetWidth, Math.max(0, e.clientX - dx)), y = Math.min(window.innerHeight - el.offsetHeight, Math.max(0, e.clientY - dy));
    el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.right = 'auto'; el.style.bottom = 'auto';
  });
  poignee.addEventListener('pointerup', () => { if(!bouge) return; bouge = false; try{ localStorage.setItem('clMinPos', JSON.stringify({ x: el.offsetLeft, y: el.offsetTop })); }catch(e){} });
}
function clPleinEcran(id){ const el = document.getElementById(id); if(!el) return; if(document.fullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document); else { const f = el.requestFullscreen || el.webkitRequestFullscreen; if(f) f.call(el); } }
let clAudio = null;
function clCtx(){ try{ clAudio = clAudio || new (window.AudioContext || window.webkitAudioContext)(); return clAudio; }catch(e){ return null; } }
function clCarillon(notes){
  const a = clCtx(); if(!a) return;
  notes.forEach((f, k) => { const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + k * 0.28;
    o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.55); });
}
// Petits clics de la roue, de plus en plus espacés.
function clTicTac(duree){
  const a = clCtx(); if(!a) return;
  let t = 0, pas = 0.05;
  while(t < duree / 1000 - 0.3){ const o = a.createOscillator(), g = a.createGain(), d = a.currentTime + t;
    o.type = 'square'; o.frequency.value = 1400; g.gain.setValueAtTime(0.03, d); g.gain.exponentialRampToValueAtTime(0.0001, d + 0.03);
    o.connect(g); g.connect(a.destination); o.start(d); o.stop(d + 0.04); t += pas; pas *= 1.09; }
}
