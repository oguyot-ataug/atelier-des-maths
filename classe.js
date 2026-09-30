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
  <div class="cl-barre" id="clBarre"></div>
  <div class="cl-scene" id="clScene">
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

    <section class="cl-bloc" id="clBlocFeu">
      <h2><span class="gicon">traffic</span> Feu de consigne</h2>
      <p class="hint" style="margin:0 0 10px;">Le niveau de voix attendu, à projeter. La jauge de bruit suit la consigne choisie.</p>
      <div class="cl-ligne" id="clFeuChoix"></div>
      <div class="cl-ligne">
        <label class="hint" style="margin:0;display:flex;gap:6px;align-items:center;"><input type="checkbox" id="clFeuMain" onchange="clFeu.main=this.checked;clFeuDessiner()"> ✋ Lever la main pour parler</label>
        <button type="button" class="btn secondary" onclick="clPleinEcran('clBlocFeu')" title="Plein écran (à projeter)"><span class="gicon">fullscreen</span></button>
      </div>
      <div class="cl-feu-affiche" id="clFeuAffiche"></div>
    </section>

    <section class="cl-bloc" id="clBlocBruit">
      <h2><span class="gicon">graphic_eq</span> Jauge de bruit</h2>
      <p class="hint" style="margin:0 0 10px;">Le micro de l'ordinateur mesure le niveau sonore de la classe. <b>Le son est analysé sur cet ordinateur : rien n'est enregistré ni envoyé.</b></p>
      <div class="cl-ligne">
        <button type="button" class="btn" id="clBruitBtn" onclick="clBruitBasculer()"><span class="gicon">mic</span> Activer le micro</button>
        <button type="button" class="btn secondary" onclick="clPleinEcran('clBlocBruit')" title="Plein écran (à projeter)"><span class="gicon">fullscreen</span></button>
      </div>
      <div class="cl-ligne">
        <label class="hint" style="margin:0;display:flex;gap:6px;align-items:center;">Sensibilité du micro <input type="range" id="clBruitSens" min="-20" max="20" value="${clBruit.sens}" oninput="clBruit.sens=+this.value;clBruitSauver()"></label>
        <label class="hint" style="margin:0;display:flex;gap:6px;align-items:center;"><input type="checkbox" id="clBruitSon" ${clBruit.son ? 'checked' : ''} onchange="clBruit.son=this.checked;clBruitSauver()"> Signal sonore si trop fort</label>
      </div>
      <div class="cl-bruit-zone"><svg id="clBruitSvg" viewBox="-120 -112 240 132"></svg>
        <div class="cl-bruit-etat" id="clBruitEtat">Micro éteint</div>
        <div class="hint" id="clBruitSeuilTxt" style="margin:0;text-align:center;"></div>
      </div>
    </section>
  </div>`;
  clRoueCharger(sel);
  clFeuDessiner(); clBruitDessiner(0);
  clDispoInit();
}

/* ------------------------------ Feu de consigne ------------------------------
   Demandé : « Feu de consigne / Jauge de bruit ». Trois niveaux de voix sur un feu tricolore
   (rouge : silence, orange : chuchoter, vert : travail en groupe), plus « Lever la main pour
   parler ». Le seuil de la jauge de bruit dépend de la consigne affichée. */
const CL_CONSIGNES = [
  { cle: 'silence', feu: 0, titre: 'Silence', sous: 'On travaille seul, sans bruit.', icone: 'volume_off', coul: '#C62828', seuil: 35 },
  { cle: 'chuchoter', feu: 1, titre: 'On chuchote', sous: 'Voix très basse, avec son voisin seulement.', icone: 'hearing', coul: '#E08A00', seuil: 55 },
  { cle: 'groupe', feu: 2, titre: 'Travail en groupe', sous: 'Voix normale, sans crier.', icone: 'groups', coul: '#1F7A4D', seuil: 72 },
];
let clFeu = { cle: 'silence', main: false };
try{ Object.assign(clFeu, JSON.parse(localStorage.getItem('clFeu') || '{}') || {}); }catch(e){}
function clConsigne(){ return CL_CONSIGNES.find(c => c.cle === clFeu.cle) || CL_CONSIGNES[0]; }
function clFeuChoisir(cle){ clFeu.cle = cle; try{ localStorage.setItem('clFeu', JSON.stringify(clFeu)); }catch(e){} clFeuDessiner(); clBruitDessiner(clBruit.niveau || 0); }
function clFeuDessiner(){
  const c = clConsigne(), ch = document.getElementById('clFeuChoix');
  if(ch) ch.innerHTML = CL_CONSIGNES.map(k => `<button type="button" class="btn ${k.cle === c.cle ? '' : 'secondary'}" style="${k.cle === c.cle ? 'background:' + k.coul + ';border-color:' + k.coul + ';' : ''}" onclick="clFeuChoisir('${k.cle}')"><span class="gicon">${k.icone}</span> ${k.titre}</button>`).join('');
  const m = document.getElementById('clFeuMain'); if(m) m.checked = clFeu.main;
  const a = document.getElementById('clFeuAffiche'); if(!a) return;
  const lampe = (i, coul) => `<circle cx="40" cy="${40 + i * 70}" r="26" fill="${i === c.feu ? coul : '#2B3440'}" ${i === c.feu ? 'class="cl-feu-allume" style="color:' + coul + '"' : ''}/>`;
  a.innerHTML = `<svg class="cl-feu-svg" viewBox="0 0 80 220" aria-hidden="true"><rect x="4" y="4" width="72" height="212" rx="18" fill="#1C2B39"/>
      ${lampe(0, '#E53935')}${lampe(1, '#FFA000')}${lampe(2, '#43A047')}</svg>
    <div class="cl-feu-texte" style="color:${c.coul};"><span class="gicon">${c.icone}</span><b>${c.titre}</b><small>${c.sous}</small>
      ${clFeu.main ? '<span class="cl-feu-main">✋ Je lève la main pour parler</span>' : ''}</div>`;
}

/* ------------------------------- Jauge de bruit ------------------------------- */
let clBruit = { actif: false, flux: null, ctx: null, an: null, raf: null, niveau: 0, sens: 0, son: true, depuis: 0, alerte: false, dernierBip: 0 };
try{ const m = JSON.parse(localStorage.getItem('clBruit') || '{}') || {}; if(typeof m.sens === 'number') clBruit.sens = m.sens; if(typeof m.son === 'boolean') clBruit.son = m.son; }catch(e){}
function clBruitSauver(){ try{ localStorage.setItem('clBruit', JSON.stringify({ sens: clBruit.sens, son: clBruit.son })); }catch(e){} }
async function clBruitBasculer(){
  if(clBruit.actif){ clBruitArreter(); return; }
  try{
    clBruit.flux = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
  }catch(e){ await niceAlert('Le micro n\'est pas accessible : autorisez-le pour ce site dans le navigateur (icône à gauche de l\'adresse).'); return; }
  clBruit.ctx = new (window.AudioContext || window.webkitAudioContext)();
  const src = clBruit.ctx.createMediaStreamSource(clBruit.flux);
  clBruit.an = clBruit.ctx.createAnalyser(); clBruit.an.fftSize = 2048; src.connect(clBruit.an);
  clBruit.actif = true; clBruit.depuis = 0; clBruit.niveau = 0;
  const b = document.getElementById('clBruitBtn'); if(b) b.innerHTML = '<span class="gicon">mic_off</span> Arrêter le micro';
  const buf = new Float32Array(clBruit.an.fftSize);
  const boucle = () => {
    if(!clBruit.actif) return;
    clBruit.an.getFloatTimeDomainData(buf);
    let q = 0; for(let i = 0; i < buf.length; i++) q += buf[i] * buf[i];
    const db = 20 * Math.log10(Math.sqrt(q / buf.length) + 1e-9);          // environ -90 (silence) à 0 dB
    const brut = Math.max(0, Math.min(100, (db + 70) * 100 / 60 + clBruit.sens * 1.5));
    clBruit.niveau = clBruit.niveau * 0.85 + brut * 0.15;                      // aiguille lissée
    clBruitDessiner(clBruit.niveau);
    clBruit.raf = requestAnimationFrame(boucle);
  };
  boucle();
}
function clBruitArreter(){
  clBruit.actif = false; cancelAnimationFrame(clBruit.raf);
  if(clBruit.flux) clBruit.flux.getTracks().forEach(t => t.stop());
  if(clBruit.ctx) clBruit.ctx.close().catch(() => {});
  clBruit.flux = clBruit.ctx = clBruit.an = null; clBruit.niveau = 0; clBruit.alerte = false;
  const b = document.getElementById('clBruitBtn'); if(b) b.innerHTML = '<span class="gicon">mic</span> Activer le micro';
  clBruitDessiner(0);
}
function clBruitDessiner(v){
  const svg = document.getElementById('clBruitSvg');
  if(!svg){ if(clBruit.actif && !document.getElementById('view-classe')?.classList.contains('active')) clBruitArreter(); return; }
  const c = clConsigne(), seuil = c.seuil, R = 100;
  const pt = (val, r) => { const a = Math.PI * (1 - val / 100); return [r * Math.cos(a), -r * Math.sin(a)]; };
  const arc = (v0, v1, coul) => { const [x0, y0] = pt(v0, R), [x1, y1] = pt(v1, R); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${coul}" stroke-width="18" fill="none"/>`; };
  const s1 = Math.max(5, seuil - 15);
  const [nx, ny] = pt(v, 84), [tx, ty] = pt(seuil, R + 13), [tx2, ty2] = pt(seuil, R - 13);
  svg.innerHTML = arc(0, s1, '#43A047') + arc(s1, seuil, '#FFA000') + arc(seuil, 100, '#E53935')
    + `<line x1="${tx.toFixed(1)}" y1="${ty.toFixed(1)}" x2="${tx2.toFixed(1)}" y2="${ty2.toFixed(1)}" stroke="#20242E" stroke-width="3"/>`
    + `<line x1="0" y1="0" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#20242E" stroke-width="5" stroke-linecap="round"/><circle r="9" fill="#20242E"/>`;
  // Trop fort pendant plus d'une seconde et demie : la jauge passe en alerte.
  const trop = clBruit.actif && v > seuil, now = performance.now();
  if(trop){ if(!clBruit.depuis) clBruit.depuis = now; } else clBruit.depuis = 0;
  const alerte = trop && now - clBruit.depuis > 1500;
  if(alerte && !clBruit.alerte && clBruit.son && now - clBruit.dernierBip > 6000){ clCarillon([523, 392]); clBruit.dernierBip = now; }
  clBruit.alerte = alerte;
  const bloc = document.getElementById('clBlocBruit'); if(bloc) bloc.classList.toggle('cl-bruit-alerte', alerte);
  const e = document.getElementById('clBruitEtat');
  if(e){ e.textContent = !clBruit.actif ? 'Micro éteint' : alerte ? 'Trop de bruit !' : v > seuil - 15 ? 'Attention…' : 'C\'est bien !';
    e.style.color = !clBruit.actif ? '#5B6472' : alerte ? '#C62828' : v > seuil - 15 ? '#E08A00' : '#1F7A4D'; }
  const t = document.getElementById('clBruitSeuilTxt'); if(t) t.innerHTML = `Consigne : <b style="color:${c.coul}">${c.titre}</b> (le trait noir marque le niveau à ne pas dépasser)`;
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
function clMinFermer(){ clMin.marche = false; clearInterval(clMin.t); clMin.mode = null; document.getElementById('clMinFlottant')?.remove(); document.getElementById('clMinPlein')?.remove(); if(document.fullscreenElement && document.fullscreenElement.id === 'clMinPlein') (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
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
    (document.fullscreenElement || document.body).appendChild(w);
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

/* ------------------------------- Disposition des blocs -------------------------------
   Demandé : « Permettre de déplacer les blocs, de les agrandir, de les positionner automatiquement
   2 sur totalité écran / 3 ou 4 ou plus si à venir. »
   - Les blocs sont posés sur une « scène » (la page, ou tout l'écran avec « Projeter ») ; positions
     en % de la scène : la même disposition s'adapte à l'ordinateur comme au vidéoprojecteur.
   - Disposition automatique : on coche les blocs à afficher et on choisit un modèle selon leur
     nombre (côte à côte, 1 grand + 2, 2×2...). Glisser un bloc par son titre sur un autre les échange.
   - Disposition libre : dès qu'on tire le coin d'un bloc, chacun se déplace et s'agrandit librement
     (aimanté au pourcent). « Ranger automatiquement » revient au modèle.
   - Le contenu grandit avec le bloc (container queries, styles.css). Nouveau bloc = une section
     de plus dans renderClasseOutils + une entrée dans CL_BLOCS : les modèles se calculent pour n blocs. */
const CL_BLOCS = [
  { id: 'clBlocRoue', nom: 'Roue' },
  { id: 'clBlocMinuteur', nom: 'Compte à rebours' },
  { id: 'clBlocFeu', nom: 'Feu de consigne' },
  { id: 'clBlocBruit', nom: 'Jauge de bruit' },
];
let clDispo = { ordre: CL_BLOCS.map(b => b.id), caches: [], mode: 'auto', modele: {}, pos: {} }, clDispoZ = 5;
try{ const d = JSON.parse(localStorage.getItem('clDispo') || 'null'); if(d && Array.isArray(d.ordre)) clDispo = Object.assign(clDispo, d); }catch(e){}
function clDispoSauver(){ try{ localStorage.setItem('clDispo', JSON.stringify(clDispo)); }catch(e){} }
function clBorne(v, a, b){ return Math.max(a, Math.min(b, v)); }
function clDispoVisibles(){
  CL_BLOCS.forEach(b => { if(!clDispo.ordre.includes(b.id)) clDispo.ordre.push(b.id); });   // bloc ajouté dans une version future
  clDispo.ordre = clDispo.ordre.filter(id => CL_BLOCS.some(b => b.id === id));
  return clDispo.ordre.filter(id => !clDispo.caches.includes(id));
}
// Rectangles [x, y, largeur, hauteur] en % de la scène.
function clGrille(n, cols){
  const rows = Math.ceil(n / cols), r = [];
  for(let i = 0; i < n; i++){ const l = Math.floor(i / cols), dans = l === rows - 1 ? n - l * cols : cols, k = i - l * cols;
    r.push([k * 100 / dans, l * 100 / rows, 100 / dans, 100 / rows]); }
  return r;
}
function clGrandPlus(n, part){ const r = [[0, 0, part, 100]], m = n - 1; for(let i = 0; i < m; i++) r.push([part, i * 100 / m, 100 - part, 100 / m]); return r; }
function clModeles(n){
  if(n <= 1) return [{ nom: 'Tout l\'écran', r: [[0, 0, 100, 100]] }];
  if(n === 2) return [{ nom: 'Côte à côte', r: clGrille(2, 2) }, { nom: 'Un grand, un petit', r: [[0, 0, 64, 100], [64, 0, 36, 100]] }, { nom: 'L\'un sous l\'autre', r: clGrille(2, 1) }];
  if(n === 3) return [{ nom: '1 grand + 2', r: clGrandPlus(3, 58) }, { nom: '3 colonnes', r: clGrille(3, 3) }, { nom: '2 en haut, 1 en bas', r: [[0, 0, 50, 55], [50, 0, 50, 55], [0, 55, 100, 45]] }];
  const cols = Math.ceil(Math.sqrt(n)), l = [{ nom: 'Mosaïque', r: clGrille(n, cols) }, { nom: '1 grand + ' + (n - 1), r: clGrandPlus(n, 60) }];
  const c2 = n === 4 ? 4 : (Math.ceil(n / 2) !== cols ? Math.ceil(n / 2) : Math.ceil(n / 3));
  l.push({ nom: c2 === n ? n + ' colonnes' : 'Sur ' + Math.ceil(n / c2) + ' lignes', r: clGrille(n, c2) });
  return l;
}
function clDispoRects(){
  const vis = clDispoVisibles();
  if(clDispo.mode === 'libre') return vis.map((id, i) => clDispo.pos[id] || [25 + i * 3, 20 + i * 3, 46, 56]);
  const ms = clModeles(vis.length); return (ms[clDispo.modele[vis.length] || 0] || ms[0]).r;
}
function clDispoPoser(el, [x, y, w, h]){
  Object.assign(el.style, { left: `calc(${x}% + 7px)`, top: `calc(${y}% + 7px)`, width: `calc(${w}% - 14px)`, height: `calc(${h}% - 14px)` });
}
function clDispoAppliquer(){
  const scene = document.getElementById('clScene'); if(!scene) return;
  const vis = clDispoVisibles(), rects = clDispoRects();
  CL_BLOCS.forEach(b => { const el = document.getElementById(b.id); if(!el) return;
    const i = vis.indexOf(b.id); el.hidden = i < 0; el.style.order = i; if(i >= 0) clDispoPoser(el, rects[i]);
    if(clDispo.mode !== 'libre') el.style.zIndex = ''; });
  scene.classList.toggle('cl-libre', clDispo.mode === 'libre');
  scene.classList.toggle('cl-vide', !vis.length);
  clBarreDessiner();
}
function clBarreDessiner(){
  const b = document.getElementById('clBarre'); if(!b) return;
  const n = clDispoVisibles().length, ms = clModeles(n), libre = clDispo.mode === 'libre', cur = libre ? -1 : (clDispo.modele[n] || 0);
  const vignette = m => `<svg viewBox="0 0 40 24" width="44" height="26" aria-hidden="true">${m.r.map(([x, y, w, h]) => `<rect x="${(x * .4 + .8).toFixed(1)}" y="${(y * .24 + .8).toFixed(1)}" width="${(w * .4 - 1.6).toFixed(1)}" height="${(h * .24 - 1.6).toFixed(1)}" rx="1.5"/>`).join('')}</svg>`;
  b.innerHTML = `<div class="cl-barre-groupe"><span class="cl-barre-titre">Blocs affichés</span>
      ${clDispo.ordre.map(id => { const d = CL_BLOCS.find(x => x.id === id), on = !clDispo.caches.includes(id);
        return `<button type="button" class="cl-puce ${on ? 'on' : ''}" onclick="clDispoBasculer('${id}')" title="${on ? 'Masquer' : 'Afficher'} ce bloc"><span class="gicon">${on ? 'check_box' : 'check_box_outline_blank'}</span> ${d.nom}</button>`; }).join('')}</div>
    <div class="cl-barre-groupe"><span class="cl-barre-titre">Disposition${n ? ` (${n} bloc${n > 1 ? 's' : ''})` : ''}</span>
      ${n ? ms.map((m, i) => `<button type="button" class="cl-modele ${i === cur ? 'on' : ''}" onclick="clDispoModele(${i})" title="${m.nom}">${vignette(m)}</button>`).join('') : ''}
      ${libre ? `<span class="cl-libre-etiq"><span class="gicon">open_with</span> Disposition libre</span>
        <button type="button" class="btn secondary" onclick="clDispoModele(${clDispo.modele[n] || 0})"><span class="gicon">auto_awesome_mosaic</span> Ranger automatiquement</button>` : ''}</div>
    <button type="button" class="btn" onclick="clPleinEcran('clScene')" title="Les blocs affichés, sur tout l'écran (vidéoprojecteur)" ${n ? '' : 'disabled'}><span class="gicon">fullscreen</span> Projeter la disposition</button>
    <p class="hint cl-barre-aide">Glissez un bloc par son titre ${libre ? 'pour le déplacer' : 'sur un autre pour les échanger'} ; tirez son coin <b>◢</b> pour l'agrandir${libre ? '' : ' (passe en disposition libre)'}.</p>`;
}
function clDispoBasculer(id){
  const i = clDispo.caches.indexOf(id);
  if(i >= 0){ clDispo.caches.splice(i, 1); if(clDispo.mode === 'libre' && !clDispo.pos[id]) clDispo.pos[id] = [27, 22, 46, 56]; }
  else { clDispo.caches.push(id); if(id === 'clBlocBruit' && clBruit.actif) clBruitArreter(); }
  clDispoSauver(); clDispoAppliquer();
}
function clDispoModele(i){ clDispo.mode = 'auto'; clDispo.modele[clDispoVisibles().length] = i; clDispoSauver(); clDispoAppliquer(); }
// Passage en disposition libre : chaque bloc garde la place qu'il avait dans le modèle.
function clDispoLibre(){
  const vis = clDispoVisibles(), r = clDispoRects();
  vis.forEach((id, i) => { clDispo.pos[id] = r[i].map(v => Math.round(v * 10) / 10); });
  clDispo.mode = 'libre';
}
function clDispoInit(){
  const scene = document.getElementById('clScene'); if(!scene) return;
  CL_BLOCS.forEach(b => { const el = document.getElementById(b.id); if(!el) return;
    const h2 = el.querySelector('h2'); h2.classList.add('cl-titre-poignee'); h2.title = 'Glisser pour déplacer le bloc';
    h2.insertAdjacentHTML('afterbegin', '<span class="gicon cl-grip">drag_indicator</span>');
    h2.insertAdjacentHTML('beforeend', `<button type="button" class="cl-masquer" title="Masquer ce bloc" onclick="clDispoBasculer('${b.id}')"><span class="gicon">close</span></button>`);
    el.insertAdjacentHTML('beforeend', '<span class="cl-taille" title="Tirer pour agrandir ou réduire"></span>');
    h2.addEventListener('pointerdown', e => clDispoGlisser(e, el, 'deplacer'));
    el.querySelector('.cl-taille').addEventListener('pointerdown', e => clDispoGlisser(e, el, 'taille'));
  });
  scene.insertAdjacentHTML('beforeend', '<button type="button" class="cl-scene-quitter" onclick="clPleinEcran(\'clScene\')" title="Quitter le plein écran (Échap)"><span class="gicon">fullscreen_exit</span></button>');
  clDispoAppliquer();
}
function clDispoGlisser(e, el, quoi){
  if(e.button !== 0 || e.target.closest('button,input,select,textarea') || window.matchMedia('(max-width:760px)').matches) return;
  const scene = document.getElementById('clScene'), R = scene.getBoundingClientRect(), id = el.id, x0 = e.clientX, y0 = e.clientY;
  e.preventDefault();
  if(quoi === 'taille' && clDispo.mode !== 'libre'){ clDispoLibre(); clDispoAppliquer(); }
  const libre = clDispo.mode === 'libre', p0 = libre ? (clDispo.pos[id] || clDispoRects()[clDispoVisibles().indexOf(id)]).slice() : null;
  el.classList.add('cl-saisi'); if(libre) el.style.zIndex = ++clDispoZ;
  let cible = null; const sy0 = window.scrollY;
  const bouge = ev => {
    // Près du haut ou du bas de la fenêtre, la page défile pour atteindre les autres blocs.
    if(!document.fullscreenElement){ if(ev.clientY > window.innerHeight - 50) window.scrollBy(0, 18); else if(ev.clientY < 50) window.scrollBy(0, -18); }
    const ey = ev.clientY - y0 + window.scrollY - sy0;
    const dx = (ev.clientX - x0) * 100 / R.width, dy = ey * 100 / R.height;
    if(libre){
      const p = p0.slice();
      if(quoi === 'deplacer'){ p[0] = clBorne(Math.round(p0[0] + dx), 0, 100 - p[2]); p[1] = clBorne(Math.round(p0[1] + dy), 0, 100 - p[3]); }
      else { p[2] = clBorne(Math.round(p0[2] + dx), 16, 100 - p[0]); p[3] = clBorne(Math.round(p0[3] + dy), 18, 100 - p[1]); }
      clDispo.pos[id] = p; clDispoPoser(el, p);
    } else {
      el.style.transform = `translate(${ev.clientX - x0}px, ${ey}px)`;
      const sous = document.elementsFromPoint(ev.clientX, ev.clientY).map(n => n.closest && n.closest('.cl-bloc')).find(n => n && n !== el) || null;
      if(cible !== sous){ if(cible) cible.classList.remove('cl-cible'); cible = sous; if(cible) cible.classList.add('cl-cible'); }
    }
  };
  const fin = () => {
    window.removeEventListener('pointermove', bouge); window.removeEventListener('pointerup', fin); window.removeEventListener('pointercancel', fin);
    el.classList.remove('cl-saisi'); el.style.transform = '';
    if(cible){ cible.classList.remove('cl-cible'); const o = clDispo.ordre, a = o.indexOf(id), b = o.indexOf(cible.id); [o[a], o[b]] = [o[b], o[a]]; }
    clDispoSauver(); clDispoAppliquer();
  };
  window.addEventListener('pointermove', bouge); window.addEventListener('pointerup', fin); window.addEventListener('pointercancel', fin);
}
// La petite fenêtre du compte à rebours suit le plein écran (sinon elle serait cachée derrière).
document.addEventListener('fullscreenchange', () => {
  const w = document.getElementById('clMinFlottant'), hote = document.fullscreenElement && document.fullscreenElement.id !== 'clMinPlein' ? document.fullscreenElement : document.body;
  if(w && w.parentNode !== hote) hote.appendChild(w);
});

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
