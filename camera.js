/* =====================================================================
   camera.js -- Caméra du téléphone (visualiseur) : la prise de vue du smartphone du professeur
   s'affiche quasi en direct sur l'ordinateur, pour commenter un cahier ou une copie au
   vidéoprojecteur, et s'insère comme image (annotée ou non) dans la correction.

   Demandé : "un outil qui permet d'afficher quasi en direct sur l'ordinateur du professeur une
   prise de vue faite sur le smartphone. On pourrait l'utiliser pour commenter une correction ou
   s'en servir comme image en direct dans les corrections." Puis : "Permettre de recadrer l'image
   avant de l'insérer. Et ajouter des outils de contraste, luminosité et crayon ou insertion texte."

   Fonctionnement :
   - L'ordinateur ouvre un canal temps réel Supabase (broadcast) au nom tiré au hasard
     (« cam-XXXXXXXX ») et affiche un QR code vers camera.html?c=XXXXXXXX. Le téléphone n'a pas
     besoin d'être connecté au site : connaître le code suffit, et il ne sert que tant que la
     fenêtre est ouverte sur l'ordinateur.
   - Le téléphone envoie des images JPEG découpées en petits morceaux (la taille maximale d'un
     message temps réel est un réglage du projet) ; l'ordinateur accuse réception de chaque image
     avant la suivante, ce qui règle le débit sur la qualité du réseau.
   - Rien n'est enregistré tant que le professeur n'insère pas l'image : le cahier d'un élève
     filmé n'est stocké nulle part.
   - Édition : recadrage, luminosité / contraste / noir et blanc (appliqués aussi au direct, pour
     zoomer sur une partie du cahier pendant la projection), crayon, surligneur et texte (l'image
     se fige). Les annotations sont repérées dans l'image entière pivotée : recadrer ensuite ne
     les déplace pas.
   Dépend de app.js (sb, currentUser, niceAlert), outils-figures.js (addPendingBlock, TOOL_ICONS)
   et vendor/qrcode.js.
   ===================================================================== */

const CAM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CAM_COULEURS = ['#D93025', '#0C5BA0', '#1E7B34', '#FF8208', '#1C2230'];
let cam = null;
/* cam = { code, ch, frames:Map, img, rot, frozen, connecte, derniere, veille,
     annots:[{type:'trait'|'surligne', c, p:[[x,y]...]} | {type:'texte', c, x, y, t}],   (coordonnées 0-1 dans l'image pivotée entière)
     outil:'crayon'|'surligne'|'texte'|'recadrer', color, crop:{x,y,w,h} (0-1), cropEdit, lum, con, gris } */

function camCode(){
  const a = new Uint8Array(8); crypto.getRandomValues(a);
  return Array.from(a, x => CAM_ALPHABET[x % CAM_ALPHABET.length]).join('');
}
function camUrl(code){ return location.origin + '/camera.html?c=' + code; }
const CAM_ICO = (n) => `<span class="gicon">${n}</span>`;

function openCameraTool(){
  camFermer(true);
  const code = camCode();
  cam = { code, frames: new Map(), img: null, rot: 0, frozen: false, connecte: false, derniere: 0,
    annots: [], sel: -1, outil: 'crayon', color: CAM_COULEURS[0], crop: { x: 0, y: 0, w: 1, h: 1 }, cropEdit: null, lum: 100, con: 100, gris: false, geste: null };
  let o = document.getElementById('camOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'camOverlay'; document.body.appendChild(o); }
  o.className = 'cam-ov';
  o.innerHTML = `<div class="cam-box" id="camBox">
    <div class="cam-head">${CAM_ICO('videocam')} <b>Caméra du téléphone</b> <span id="camEtat" class="cam-etat attente">En attente du téléphone…</span>
      <button type="button" class="cam-x" onclick="camFermer()" title="Fermer">${CAM_ICO('close')}</button></div>
    <div class="cam-pair" id="camPair">
      <div class="cam-qr" id="camQr"></div>
      <div class="cam-steps">
        <p class="cam-big">Scannez ce QR code avec l'appareil photo de votre téléphone</p>
        <p>ou ouvrez <b>${location.host}/camera.html</b> et tapez le code :</p>
        <div class="cam-code">${code.slice(0, 4)}-${code.slice(4)}</div>
        <p class="hint">Le téléphone n'a pas besoin d'être connecté au site. Rien n'est enregistré : l'image n'est conservée que si vous l'insérez dans la correction.</p>
      </div>
    </div>
    <div class="cam-stage" id="camStage" hidden>
      <div class="cam-view" id="camView"><canvas id="camCanvas"></canvas><canvas id="camDraw"></canvas><span class="cam-live" id="camLive">● EN DIRECT</span>
        <div class="cam-cropbar" id="camCropBar" hidden><span>Faites glisser les coins ou le cadre</span>
          <button type="button" class="btn secondary" onclick="camRecadrerTout()">Toute l'image</button>
          <button type="button" class="btn secondary" onclick="camRecadrerFin(false)">Annuler</button>
          <button type="button" class="btn" onclick="camRecadrerFin(true)">${CAM_ICO('check')} Valider</button></div>
      </div>
    </div>
    <div class="cam-tools" id="camTools" hidden>
      <div class="cam-row">
        <button type="button" class="btn secondary" id="camFigerBtn" onclick="camFiger()">${CAM_ICO('pause')} Figer</button>
        <button type="button" class="btn secondary" onclick="camPhoto()" title="Demande au téléphone une photo en pleine résolution, plus nette que l'image en direct">${CAM_ICO('photo_camera')} Photo nette</button>
        <button type="button" class="btn secondary" onclick="camPivoter()" title="Pivoter d'un quart de tour">${CAM_ICO('rotate_right')}</button>
        <span class="cam-sep"></span>
        <span class="cam-seg" id="camOutils">
          <button type="button" data-o="select" onclick="camOutil('select')" title="Sélection : cliquez sur un texte ou un trait pour le déplacer ; la poignée d'angle l'agrandit ou le rétrécit ; double-clic sur un texte pour le modifier">${CAM_ICO('arrow_selector_tool')}</button>
          <button type="button" data-o="crayon" onclick="camOutil('crayon')" title="Crayon">${CAM_ICO('edit')}</button>
          <button type="button" data-o="surligne" onclick="camOutil('surligne')" title="Surligneur">${CAM_ICO('ink_highlighter')}</button>
          <button type="button" data-o="texte" onclick="camOutil('texte')" title="Texte : cliquez sur l'image à l'endroit voulu">${CAM_ICO('title')}</button>
          <button type="button" data-o="recadrer" onclick="camOutil('recadrer')" title="Recadrer">${CAM_ICO('crop')}</button>
        </span>
        <span class="cam-annot">${CAM_COULEURS.map((c, i) => `<button type="button" class="cam-col${i ? '' : ' on'}" style="--c:${c}" onclick="camCouleur('${c}',this)" aria-label="Couleur"></button>`).join('')}</span>
        <button type="button" class="btn secondary" id="camSupprBtn" onclick="camSupprimerSel()" title="Supprimer l'élément sélectionné (touche Suppr)" hidden>${CAM_ICO('delete')}</button>
        <button type="button" class="btn secondary" onclick="camAnnuler()" title="Annuler la dernière annotation">${CAM_ICO('undo')}</button>
        <button type="button" class="btn secondary" onclick="camEffacer()" title="Effacer toutes les annotations">${CAM_ICO('ink_eraser')}</button>
        <span class="cam-sep"></span>
        <button type="button" class="btn secondary" onclick="camPleinEcran()" title="Plein écran">${CAM_ICO('fullscreen')}</button>
        <button type="button" class="btn" id="camInsBtn" onclick="camInserer()">${CAM_ICO('add_photo_alternate')} Insérer dans la correction</button>
      </div>
      <div class="cam-row cam-reglages">
        <label title="Luminosité">${CAM_ICO('light_mode')}<input type="range" id="camLum" min="50" max="180" value="100" oninput="camReglage('lum',this.value)"></label>
        <label title="Contraste">${CAM_ICO('contrast')}<input type="range" id="camCon" min="50" max="250" value="100" oninput="camReglage('con',this.value)"></label>
        <label class="cam-chk"><input type="checkbox" id="camGris" onchange="camReglage('gris',this.checked)"> Noir et blanc</label>
        <button type="button" class="btn secondary" onclick="camDocument()" title="Page blanche et écriture bien noire : idéal pour un cahier ou une copie">${CAM_ICO('auto_fix_high')} Document</button>
        <button type="button" class="btn secondary" onclick="camReglagesZero()" title="Revenir à l'image d'origine">${CAM_ICO('restart_alt')}</button>
        <span class="hint" style="margin:0 0 0 auto;" id="camInfo"></span>
      </div>
    </div>
  </div>`;
  o.style.display = 'flex';
  try{
    const q = qrcode(0, 'M'); q.addData(camUrl(code)); q.make();
    document.getElementById('camQr').innerHTML = q.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }catch(e){ document.getElementById('camQr').innerHTML = '<p class="hint">QR code indisponible : utilisez le code.</p>'; }
  camBrancherDessin();
  camMajOutils();
  cam.ch = sb.channel('cam-' + code, { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'hello' }, () => { camEnvoyer('hello-ok', {}); camConnecte(true); })
    .on('broadcast', { event: 'part' }, ({ payload }) => camMorceau(payload))
    .on('broadcast', { event: 'ping' }, () => { if(!cam) return; cam.derniere = Date.now(); if(!cam.connecte){ camEnvoyer('hello-ok', {}); camConnecte(true); } })
    .on('broadcast', { event: 'bye' }, () => camConnecte(false))
    .subscribe();
  cam.veille = setInterval(() => { if(cam && cam.connecte && Date.now() - cam.derniere > 8000) camConnecte(false, true); }, 3000);
  window.addEventListener('resize', camRedessiner);
}

/* ---------------- Transport ---------------- */
function camEnvoyer(event, payload){ if(cam && cam.ch) cam.ch.send({ type: 'broadcast', event, payload }); }
function camConnecte(on, silence){
  if(!cam) return;
  cam.connecte = on;
  const e = document.getElementById('camEtat');
  if(e){ e.className = 'cam-etat ' + (on ? 'ok' : 'attente'); e.textContent = on ? 'Téléphone connecté' : silence ? 'Plus d\'image du téléphone…' : 'Téléphone déconnecté'; }
  if(on){ cam.derniere = Date.now(); if(cam.frozen) camEnvoyer('pause', {}); }
}
// Reçoit un morceau d'image : { f: numéro, i, n, d: base64, k: 'live'|'photo' }
function camMorceau(p){
  if(!cam || !p || typeof p.d !== 'string') return;
  cam.derniere = Date.now();
  if(!cam.connecte) camConnecte(true);
  let fr = cam.frames.get(p.f);
  if(!fr){ fr = { n: p.n, k: p.k, parts: [] }; cam.frames.set(p.f, fr); }
  fr.parts[p.i] = p.d;
  if(fr.parts.filter(x => x !== undefined).length < fr.n) return;
  cam.frames.delete(p.f);
  for(const k of cam.frames.keys()) if(k < p.f) cam.frames.delete(k); // morceaux perdus d'images plus anciennes
  camEnvoyer('ack', { f: p.f });
  if(fr.k === 'live' && cam.frozen) return;
  const im = new Image();
  im.onload = () => {
    if(!cam) return;
    const premiere = !cam.img;
    cam.img = im;
    if(fr.k === 'photo') camFigerEtat(true);
    if(premiere){ document.getElementById('camPair').hidden = true; document.getElementById('camStage').hidden = false; document.getElementById('camTools').hidden = false; }
    camRedessiner();
  };
  im.src = 'data:image/jpeg;base64,' + fr.parts.join('');
}

/* ---------------- Affichage ---------------- */
// Dimensions de l'image pivotée entière (en pixels de l'image).
function camDims(){ const q = cam.rot % 180 !== 0; return q ? [cam.img.naturalHeight, cam.img.naturalWidth] : [cam.img.naturalWidth, cam.img.naturalHeight]; }
// Cadre affiché : le recadrage, ou l'image entière pendant qu'on le règle.
function camCadre(){ return cam.cropEdit ? { x: 0, y: 0, w: 1, h: 1 } : cam.crop; }
function camTaille(){
  const v = document.getElementById('camView'); if(!v || !cam || !cam.img) return null;
  const [iw, ih] = camDims(), c = camCadre(), rw = c.w * iw, rh = c.h * ih;
  const k = Math.min(v.clientWidth / rw, v.clientHeight / rh);
  return { iw, ih, c, k, w: Math.max(1, Math.round(rw * k)), h: Math.max(1, Math.round(rh * k)) };
}
function camDessinerImage(ctx, iw, ih){
  ctx.save(); ctx.translate(iw / 2, ih / 2); ctx.rotate(cam.rot * Math.PI / 180);
  const q = cam.rot % 180 !== 0, dw = q ? ih : iw, dh = q ? iw : ih;
  ctx.drawImage(cam.img, -dw / 2, -dh / 2, dw, dh); ctx.restore();
}
// Annotations, en pixels de l'image pivotée entière (le contexte est déjà transformé).
function camDessinerAnnots(ctx, iw, ih){
  const base = Math.min(iw, ih);
  cam.annots.forEach(a => {
    if(a.type === 'texte'){
      const fs = Math.round(base * 0.055 * (a.s || 1));
      ctx.font = `700 ${fs}px Inter, Arial, sans-serif`; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(2, fs / 5); ctx.strokeStyle = 'rgba(255,255,255,.92)'; ctx.strokeText(a.t, a.x * iw, a.y * ih);
      ctx.fillStyle = a.c; ctx.fillText(a.t, a.x * iw, a.y * ih);
      return;
    }
    const sur = a.type === 'surligne';
    ctx.save(); ctx.globalAlpha = sur ? 0.35 : 1;
    ctx.strokeStyle = sur && a.c === '#1C2230' ? '#FFD600' : a.c;
    ctx.lineWidth = Math.max(2, base / (sur ? 28 : 170)); ctx.lineCap = sur ? 'butt' : 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); a.p.forEach(([x, y], i) => i ? ctx.lineTo(x * iw, y * ih) : ctx.moveTo(x * iw, y * ih)); ctx.stroke();
    ctx.restore();
  });
}
function camFiltreCss(){ return `brightness(${cam.lum / 100}) contrast(${cam.con / 100})${cam.gris ? ' grayscale(1)' : ''}`; }
function camRedessiner(){
  const t = camTaille(); if(!t) return;
  const c = document.getElementById('camCanvas'), d = document.getElementById('camDraw');
  const r = window.devicePixelRatio || 1;
  [c, d].forEach(x => { x.width = Math.round(t.w * r); x.height = Math.round(t.h * r); x.style.width = t.w + 'px'; x.style.height = t.h + 'px'; });
  c.style.filter = camFiltreCss();
  const m = [r * t.k, 0, 0, r * t.k, -t.c.x * t.iw * t.k * r, -t.c.y * t.ih * t.k * r];
  const ctx = c.getContext('2d'); ctx.setTransform(...m); camDessinerImage(ctx, t.iw, t.ih);
  const dc = d.getContext('2d'); dc.setTransform(1, 0, 0, 1, 0, 0); dc.clearRect(0, 0, d.width, d.height);
  dc.setTransform(...m); camDessinerAnnots(dc, t.iw, t.ih);
  if(cam.sel >= 0 && cam.annots[cam.sel] && !cam.cropEdit){ // élément sélectionné : cadre + poignée d'angle
    dc.setTransform(r, 0, 0, r, 0, 0);
    const b = camEcran(camBoite(cam.annots[cam.sel]), t);
    dc.setLineDash([6, 4]); dc.strokeStyle = '#FF8208'; dc.lineWidth = 2; dc.strokeRect(b.x, b.y, b.w, b.h); dc.setLineDash([]);
    dc.fillStyle = '#fff'; dc.strokeStyle = '#FF8208'; dc.lineWidth = 2.5;
    const [hx, hy] = camPoignee(b, t); dc.beginPath(); dc.rect(hx - 7, hy - 7, 14, 14); dc.fill(); dc.stroke();
  }
  if(cam.cropEdit){ // cadre de recadrage
    dc.setTransform(r, 0, 0, r, 0, 0);
    const e = cam.cropEdit, x = e.x * t.w, y = e.y * t.h, w = e.w * t.w, h = e.h * t.h;
    dc.fillStyle = 'rgba(10,14,22,.55)'; dc.beginPath(); dc.rect(0, 0, t.w, t.h); dc.rect(x, y, w, h); dc.fill('evenodd');
    dc.strokeStyle = '#fff'; dc.lineWidth = 2; dc.strokeRect(x, y, w, h);
    dc.strokeStyle = 'rgba(255,255,255,.45)'; dc.lineWidth = 1;
    for(const f of [1 / 3, 2 / 3]){ dc.beginPath(); dc.moveTo(x + w * f, y); dc.lineTo(x + w * f, y + h); dc.moveTo(x, y + h * f); dc.lineTo(x + w, y + h * f); dc.stroke(); }
    dc.fillStyle = '#FF8208';
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(([a, b]) => { dc.beginPath(); dc.arc(a, b, 8, 0, 7); dc.fill(); });
  }
  const info = document.getElementById('camInfo');
  if(info){ const [iw, ih] = camDims(); info.textContent = `${Math.round(cam.crop.w * iw)} × ${Math.round(cam.crop.h * ih)} px`; }
}

/* ---------------- Commandes ---------------- */
function camFigerEtat(on){
  cam.frozen = on;
  const b = document.getElementById('camFigerBtn');
  if(b) b.innerHTML = on ? `${CAM_ICO('play_arrow')} Reprendre le direct` : `${CAM_ICO('pause')} Figer`;
  const l = document.getElementById('camLive'); if(l){ l.textContent = on ? '❚❚ IMAGE FIGÉE' : '● EN DIRECT'; l.classList.toggle('fige', on); }
  camEnvoyer(on ? 'pause' : 'resume', {});
  if(!on){ cam.annots = []; cam.sel = -1; const b = document.getElementById('camSupprBtn'); if(b) b.hidden = true; camRedessiner(); }
}
function camFiger(){ if(cam && cam.img) camFigerEtat(!cam.frozen); }
function camPhoto(){
  if(!cam || !cam.connecte){ niceAlert('Le téléphone n\'est pas connecté.'); return; }
  camEnvoyer('req-photo', {});
  const l = document.getElementById('camLive'); if(l) l.textContent = '… photo en cours';
}
function camPivoter(){ if(!cam || !cam.img) return; cam.rot = (cam.rot + 90) % 360; cam.annots = []; cam.sel = -1; cam.crop = { x: 0, y: 0, w: 1, h: 1 }; cam.cropEdit = null; camMajOutils(); camRedessiner(); }
// Boîte englobante d'une annotation, en coordonnées 0-1 de l'image pivotée entière.
let camMesure = null;
function camBoite(a){
  const [iw, ih] = camDims(), base = Math.min(iw, ih);
  if(a.type === 'texte'){
    const fs = base * 0.055 * (a.s || 1);
    camMesure = camMesure || document.createElement('canvas').getContext('2d');
    camMesure.font = `700 ${fs}px Inter, Arial, sans-serif`;
    const w = camMesure.measureText(a.t).width + fs * 0.2;
    return { x: a.x - fs * 0.1 / iw, y: a.y - fs * 0.62 / ih, w: w / iw, h: fs * 1.24 / ih };
  }
  const xs = a.p.map(q => q[0]), ys = a.p.map(q => q[1]), pad = (a.type === 'surligne' ? base / 56 : base / 300) + 4;
  const x1 = Math.min(...xs) - pad / iw, y1 = Math.min(...ys) - pad / ih, x2 = Math.max(...xs) + pad / iw, y2 = Math.max(...ys) + pad / ih;
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}
// Boîte en pixels d'écran (zone affichée t, voir camTaille).
// Poignée d'angle d'une boîte, ramenée dans la zone visible (un texte qui déborde reste réglable).
function camPoignee(b, t){ return [Math.min(Math.max(b.x + b.w, 10), t.w - 9), Math.min(Math.max(b.y + b.h, 10), t.h - 9)]; }
function camEcran(b, t){ return { x: (b.x - t.c.x) / t.c.w * t.w, y: (b.y - t.c.y) / t.c.h * t.h, w: b.w / t.c.w * t.w, h: b.h / t.c.h * t.h }; }
function camSelect(i){ if(!cam) return; cam.sel = i; const b = document.getElementById('camSupprBtn'); if(b) b.hidden = i < 0; camRedessiner(); }
function camSupprimerSel(){ if(!cam || cam.sel < 0) return; cam.annots.splice(cam.sel, 1); camSelect(-1); }
function camOutil(o){
  if(!cam) return;
  if(o !== 'select') camSelect(-1);
  if(o === 'recadrer'){ if(!cam.img) return; cam.cropEdit = Object.assign({}, cam.crop); }
  else if(cam.cropEdit) camRecadrerFin(true);
  cam.outil = o; camMajOutils(); camRedessiner();
}
function camMajOutils(){
  document.querySelectorAll('#camOutils button').forEach(b => b.classList.toggle('on', b.dataset.o === cam.outil));
  const bar = document.getElementById('camCropBar'); if(bar) bar.hidden = !cam.cropEdit;
  const d = document.getElementById('camDraw'); if(d) d.style.cursor = cam.outil === 'texte' ? 'text' : cam.outil === 'recadrer' ? 'move' : cam.outil === 'select' ? 'default' : 'crosshair';
}
function camCouleur(c, el){
  cam.color = c; document.querySelectorAll('.cam-col').forEach(b => b.classList.toggle('on', b === el));
  if(cam.outil === 'select' && cam.sel >= 0){ cam.annots[cam.sel].c = c; camRedessiner(); return; } // recolore l'élément choisi
  if(cam.outil === 'recadrer') camOutil('crayon');
}
function camAnnuler(){ if(cam){ cam.annots.pop(); camSelect(-1); } }
function camEffacer(){ if(cam){ cam.annots = []; camSelect(-1); } }
function camReglage(k, v){ if(!cam) return; cam[k] = k === 'gris' ? !!v : Number(v); camRedessiner(); }
function camMajReglages(){
  const set = (id, v, p) => { const e = document.getElementById(id); if(e) e[p || 'value'] = v; };
  set('camLum', cam.lum); set('camCon', cam.con); set('camGris', cam.gris, 'checked'); camRedessiner();
}
function camDocument(){ if(!cam) return; cam.lum = 118; cam.con = 175; cam.gris = true; camMajReglages(); }
function camReglagesZero(){ if(!cam) return; cam.lum = 100; cam.con = 100; cam.gris = false; camMajReglages(); }
function camRecadrerTout(){ if(cam && cam.cropEdit){ cam.cropEdit = { x: 0, y: 0, w: 1, h: 1 }; camRedessiner(); } }
function camRecadrerFin(valider){
  if(!cam || !cam.cropEdit) return;
  if(valider){ const e = cam.cropEdit; cam.crop = { x: e.x, y: e.y, w: Math.max(0.03, e.w), h: Math.max(0.03, e.h) }; }
  cam.cropEdit = null; cam.outil = 'crayon'; camMajOutils(); camRedessiner();
}

/* ---------------- Gestes sur l'image ---------------- */
function camBrancherDessin(){
  const d = document.getElementById('camDraw');
  const local = ev => { const r = d.getBoundingClientRect(); return [(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height]; };
  // point de l'écran -> coordonnées dans l'image pivotée entière (0-1)
  const img = ev => { const [u, v] = local(ev), c = camCadre(); return [c.x + u * c.w, c.y + v * c.h]; };
  d.addEventListener('pointerdown', ev => {
    if(!cam || !cam.img) return;
    ev.preventDefault();
    if(cam.outil === 'recadrer'){ // coin le plus proche (sinon déplacement du cadre)
      const [u, v] = local(ev), e = cam.cropEdit, r = d.getBoundingClientRect(), seuil = 22 / Math.min(r.width, r.height);
      const coins = { nw: [e.x, e.y], ne: [e.x + e.w, e.y], sw: [e.x, e.y + e.h], se: [e.x + e.w, e.y + e.h] };
      let poignee = null; for(const k in coins){ if(Math.hypot(coins[k][0] - u, coins[k][1] - v) < seuil * 1.5) poignee = k; }
      if(!poignee && !(u >= e.x && u <= e.x + e.w && v >= e.y && v <= e.y + e.h)) return;
      cam.geste = { type: 'crop', poignee: poignee || 'move', u0: u, v0: v, e0: Object.assign({}, e) };
    } else if(cam.outil === 'select'){
      const t = camTaille(), [ex, ey] = local(ev).map((q, k) => q * (k ? t.h : t.w));
      if(cam.sel >= 0 && cam.annots[cam.sel]){ // poignée d'angle de l'élément déjà choisi
        const [hx, hy] = camPoignee(camEcran(camBoite(cam.annots[cam.sel]), t), t);
        if(Math.abs(ex - hx) < 14 && Math.abs(ey - hy) < 14){
          cam.geste = { type: 'taille', b0: camBoite(cam.annots[cam.sel]), a0: JSON.parse(JSON.stringify(cam.annots[cam.sel])), p0: img(ev) };
          try{ d.setPointerCapture(ev.pointerId); }catch(e){} return;
        }
      }
      let i = cam.annots.length - 1;
      for(; i >= 0; i--){ const b = camEcran(camBoite(cam.annots[i]), t); if(ex >= b.x - 6 && ex <= b.x + b.w + 6 && ey >= b.y - 6 && ey <= b.y + b.h + 6) break; }
      camSelect(i);
      if(i < 0) return;
      cam.geste = { type: 'deplacer', a0: JSON.parse(JSON.stringify(cam.annots[i])), p0: img(ev) };
    } else if(cam.outil === 'texte'){
      camTexte(ev, img(ev)); return;
    } else {
      if(!cam.frozen) camFigerEtat(true); // on annote une image fixe
      cam.annots.push({ type: cam.outil === 'surligne' ? 'surligne' : 'trait', c: cam.color, p: [img(ev)] });
      cam.geste = { type: 'trait' };
    }
    try{ d.setPointerCapture(ev.pointerId); }catch(e){}
  });
  d.addEventListener('pointermove', ev => {
    if(!cam || !cam.geste) return;
    if(cam.geste.type === 'trait'){ cam.annots[cam.annots.length - 1].p.push(img(ev)); camRedessiner(); return; }
    if(cam.geste.type === 'deplacer' || cam.geste.type === 'taille'){
      const g = cam.geste, [x, y] = img(ev), a = cam.annots[cam.sel], a0 = g.a0; if(!a) return;
      if(g.type === 'deplacer'){
        const dx = x - g.p0[0], dy = y - g.p0[1];
        if(a.type === 'texte'){ a.x = a0.x + dx; a.y = a0.y + dy; } else a.p = a0.p.map(([u, v]) => [u + dx, v + dy]);
      } else { // agrandir / rétrécir depuis le coin haut gauche
        const b = g.b0, f = Math.min(8, Math.max(0.2, (((x - b.x) / b.w) + ((y - b.y) / b.h)) / 2));
        if(a.type === 'texte'){ a.s = (a0.s || 1) * f; a.y = b.y + (a0.y - b.y) * f; a.x = b.x + (a0.x - b.x) * f; }
        else a.p = a0.p.map(([u, v]) => [b.x + (u - b.x) * f, b.y + (v - b.y) * f]);
      }
      camRedessiner(); return;
    }
    const g = cam.geste, [u, v] = local(ev), du = u - g.u0, dv = v - g.v0, e0 = g.e0, m = 0.04;
    let x1 = e0.x, y1 = e0.y, x2 = e0.x + e0.w, y2 = e0.y + e0.h;
    if(g.poignee === 'move'){ const dx = Math.min(Math.max(du, -x1), 1 - x2), dy = Math.min(Math.max(dv, -y1), 1 - y2); x1 += dx; x2 += dx; y1 += dy; y2 += dy; }
    else {
      if(g.poignee.includes('w')) x1 = Math.min(Math.max(0, x1 + du), x2 - m);
      if(g.poignee.includes('e')) x2 = Math.max(Math.min(1, x2 + du), x1 + m);
      if(g.poignee.includes('n')) y1 = Math.min(Math.max(0, y1 + dv), y2 - m);
      if(g.poignee.includes('s')) y2 = Math.max(Math.min(1, y2 + dv), y1 + m);
    }
    cam.cropEdit = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 }; camRedessiner();
  });
  const fin = () => { if(cam) cam.geste = null; };
  d.addEventListener('pointerup', fin); d.addEventListener('pointercancel', fin);
  // Survol : curseur adapté (déplacer, poignée d'angle)
  d.addEventListener('pointermove', ev => {
    if(!cam || cam.geste || cam.outil !== 'select' || !cam.img) return;
    const t = camTaille(), [ex, ey] = local(ev).map((q, k) => q * (k ? t.h : t.w));
    let cur = 'default';
    if(cam.sel >= 0 && cam.annots[cam.sel]){ const [hx, hy] = camPoignee(camEcran(camBoite(cam.annots[cam.sel]), t), t); if(Math.abs(ex - hx) < 14 && Math.abs(ey - hy) < 14) cur = 'nwse-resize'; }
    if(cur === 'default' && cam.annots.some(a => { const b = camEcran(camBoite(a), t); return ex >= b.x - 6 && ex <= b.x + b.w + 6 && ey >= b.y - 6 && ey <= b.y + b.h + 6; })) cur = 'move';
    d.style.cursor = cur;
  });
  // Double-clic sur un texte : le modifier
  d.addEventListener('dblclick', ev => {
    if(!cam || cam.outil !== 'select' || cam.sel < 0) return;
    const a = cam.annots[cam.sel]; if(!a || a.type !== 'texte') return;
    camTexte(ev, [a.x, a.y], cam.sel);
  });
}
// Suppr / Retour arrière : supprime l'élément sélectionné.
document.addEventListener('keydown', ev => {
  if(!cam || cam.sel < 0 || (ev.key !== 'Delete' && ev.key !== 'Backspace')) return;
  if(/^(INPUT|TEXTAREA)$/.test((document.activeElement || {}).tagName || '')) return;
  ev.preventDefault(); camSupprimerSel();
});
// Zone de saisie posée à l'endroit cliqué ; Entrée ou clic ailleurs pour valider, Échap pour annuler.
function camTexte(ev, [x, y], modif){
  if(!cam.frozen) camFigerEtat(true);
  const exist = modif !== undefined ? cam.annots[modif] : null;
  const v = document.getElementById('camView'), r = v.getBoundingClientRect();
  document.querySelectorAll('.cam-texte-in').forEach(e => e.remove());
  const inp = document.createElement('input');
  inp.className = 'cam-texte-in'; inp.placeholder = 'Votre texte…'; inp.style.color = exist ? exist.c : cam.color; if(exist) inp.value = exist.t;
  inp.style.left = (ev.clientX - r.left) + 'px'; inp.style.top = (ev.clientY - r.top) + 'px';
  v.appendChild(inp); setTimeout(() => inp.focus(), 0);
  let fait = false;
  const valider = ok => {
    if(fait) return; fait = true; const t = inp.value.trim(); inp.remove(); if(!ok || !cam) return;
    if(exist){ if(t) exist.t = t; else { cam.annots.splice(modif, 1); camSelect(-1); return; } camSelect(modif); return; }
    if(!t) return;
    cam.annots.push({ type: 'texte', c: cam.color, x, y, t, s: 1 });
    // Aussitôt sélectionné (outil Sélection) : on peut le déplacer ou changer sa taille tout de suite.
    cam.outil = 'select'; camMajOutils(); camSelect(cam.annots.length - 1);
  };
  inp.addEventListener('keydown', e => { if(e.key === 'Enter') valider(true); if(e.key === 'Escape') valider(false); e.stopPropagation(); });
  inp.addEventListener('blur', () => valider(true));
}
function camPleinEcran(){
  const b = document.getElementById('camBox'); if(!b) return;
  if(document.fullscreenElement) document.exitFullscreen(); else if(b.requestFullscreen) b.requestFullscreen().catch(() => {});
}
document.addEventListener('fullscreenchange', () => setTimeout(() => { if(cam) camRedessiner(); }, 120));

/* ---------------- Image finale ---------------- */
// Luminosité / contraste / noir et blanc appliqués pixel par pixel (même rendu que le filtre CSS
// de l'affichage, et indépendant de la prise en charge de ctx.filter par le navigateur).
function camAppliquerReglages(ctx, w, h){
  if(cam.lum === 100 && cam.con === 100 && !cam.gris) return;
  const d = ctx.getImageData(0, 0, w, h), p = d.data, b = cam.lum / 100, c = cam.con / 100, o = 128 * (1 - c);
  for(let i = 0; i < p.length; i += 4){
    let r = p[i] * b, g = p[i + 1] * b, bl = p[i + 2] * b;
    r = r * c + o; g = g * c + o; bl = bl * c + o;
    if(cam.gris){ const y = 0.2126 * r + 0.7152 * g + 0.0722 * bl; r = g = bl = y; }
    p[i] = r; p[i + 1] = g; p[i + 2] = bl; // Uint8ClampedArray : bornes 0-255 automatiques
  }
  ctx.putImageData(d, 0, 0);
}
function camComposer(){
  const [iw, ih] = camDims(), c = cam.crop, w = Math.max(1, Math.round(c.w * iw)), h = Math.max(1, Math.round(c.h * ih));
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, -c.x * iw, -c.y * ih); camDessinerImage(ctx, iw, ih);
  ctx.setTransform(1, 0, 0, 1, 0, 0); camAppliquerReglages(ctx, w, h);
  ctx.setTransform(1, 0, 0, 1, -c.x * iw, -c.y * ih); camDessinerAnnots(ctx, iw, ih);
  return new Promise(res => cv.toBlob(res, 'image/jpeg', 0.88));
}
async function camInserer(){
  if(!cam || !cam.img) return;
  if(cam.cropEdit) camRecadrerFin(true);
  if(!cam.frozen) camFigerEtat(true);
  const btn = document.getElementById('camInsBtn'); btn.disabled = true;
  const avant = btn.innerHTML; btn.innerHTML = 'Envoi en cours…';
  try{
    const blob = await camComposer();
    const path = `${(currentUser && currentUser.id) || 'anon'}/${Date.now()}-camera-${Math.random().toString(36).slice(2, 8)}.jpg`;
    const { error } = await sb.storage.from('cahier-images').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false });
    if(error) throw error;
    const url = sb.storage.from('cahier-images').getPublicUrl(path).data.publicUrl;
    const html = `<div style="text-align:center;padding:6px 0;"><img src="${url}" style="max-width:100%;max-height:400px;border-radius:6px;border:1px solid rgba(28,43,57,.15);" alt="Photo"/></div>`;
    addPendingBlock('image', html, { src: url }, 'reopenImageBlock');
    btn.innerHTML = `${CAM_ICO('check')} Insérée`;
    setTimeout(() => { if(document.getElementById('camInsBtn')){ btn.innerHTML = avant; btn.disabled = false; } }, 1600);
  }catch(e){
    console.error('caméra : insertion', e);
    btn.innerHTML = avant; btn.disabled = false;
    await niceAlert('Échec de l\'envoi de l\'image (connexion ?). Réessayez.');
  }
}
function camFermer(silencieux){
  if(!cam){ const o = document.getElementById('camOverlay'); if(o) o.style.display = 'none'; return; }
  try{ camEnvoyer('bye', {}); }catch(e){}
  clearInterval(cam.veille);
  try{ if(cam.ch) sb.removeChannel(cam.ch); }catch(e){}
  cam = null;
  window.removeEventListener('resize', camRedessiner);
  if(document.fullscreenElement) document.exitFullscreen().catch(() => {});
  const o = document.getElementById('camOverlay'); if(o) o.style.display = 'none';
}

(function camStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .cam-ov [hidden]{display:none!important;}
    .cam-ov{position:fixed;inset:0;z-index:420;background:rgba(20,26,36,.55);display:none;align-items:center;justify-content:center;padding:14px;}
    .cam-box{background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.3);width:min(1240px,100%);height:min(900px,100%);display:flex;flex-direction:column;overflow:hidden;}
    .cam-box:fullscreen{width:100%;height:100%;border-radius:0;}
    .cam-head{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid rgba(28,43,57,.1);font-family:'Space Grotesk',sans-serif;}
    .cam-head .gicon{color:#0C5BA0;}
    .cam-etat{font-family:Inter,sans-serif;font-size:.78rem;font-weight:700;border-radius:999px;padding:3px 10px;margin-left:6px;}
    .cam-etat.attente{background:#FFF4E6;color:#B8511F;} .cam-etat.ok{background:#EAF6EC;color:#1E7B34;}
    .cam-x{margin-left:auto;border:none;background:none;cursor:pointer;padding:4px;border-radius:8px;} .cam-x:hover{background:rgba(28,43,57,.08);}
    .cam-pair{flex:1;display:flex;align-items:center;justify-content:center;gap:40px;padding:24px;flex-wrap:wrap;}
    .cam-qr{width:min(300px,70vw);} .cam-qr svg{width:100%;height:auto;display:block;}
    .cam-steps{max-width:420px;} .cam-steps p{margin:0 0 10px;} .cam-big{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.25rem;}
    .cam-code{font-family:'JetBrains Mono',monospace;font-size:2.2rem;font-weight:700;letter-spacing:4px;color:#0C5BA0;margin:4px 0 14px;}
    .cam-stage{flex:1;min-height:0;display:flex;background:#1C2230;}
    .cam-view{flex:1;min-width:0;min-height:0;position:relative;display:flex;align-items:center;justify-content:center;}
    .cam-view canvas{position:absolute;} #camDraw{cursor:crosshair;touch-action:none;}
    .cam-live{position:absolute;top:10px;left:12px;background:rgba(217,48,37,.92);color:#fff;font:700 .72rem Inter,sans-serif;border-radius:6px;padding:3px 8px;letter-spacing:.5px;z-index:2;}
    .cam-live.fige{background:rgba(28,43,57,.8);}
    .cam-cropbar{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;background:rgba(20,26,36,.85);color:#fff;border-radius:12px;padding:8px 10px 8px 14px;font-size:.84rem;z-index:3;}
    .cam-cropbar .btn{padding:5px 12px;font-size:.82rem;}
    .cam-cropbar .btn.secondary{background:rgba(255,255,255,.16);color:#fff;border-color:transparent;}
    .cam-texte-in{position:absolute;z-index:4;transform:translateY(-50%);font:700 20px Inter,sans-serif;border:2px dashed #FF8208;border-radius:6px;padding:4px 8px;background:rgba(255,255,255,.95);min-width:220px;outline:none;}
    .cam-tools{display:flex;flex-direction:column;gap:6px;padding:8px 14px 10px;border-top:1px solid rgba(28,43,57,.1);}
    .cam-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
    .cam-tools .btn{padding:6px 11px;font-size:.84rem;}
    .cam-sep{width:1px;height:26px;background:rgba(28,43,57,.15);margin:0 4px;}
    .cam-seg{display:inline-flex;background:rgba(28,43,57,.06);border-radius:10px;padding:3px;gap:2px;}
    .cam-seg button{border:none;background:none;border-radius:8px;padding:5px 8px;cursor:pointer;color:#4E5665;display:inline-flex;}
    .cam-seg button.on{background:#fff;color:#0C5BA0;box-shadow:0 1px 3px rgba(28,43,57,.2);}
    .cam-annot{display:inline-flex;align-items:center;gap:5px;margin:0 4px;}
    .cam-col{width:22px;height:22px;border-radius:50%;background:var(--c);border:3px solid #fff;box-shadow:0 0 0 1.5px rgba(28,43,57,.25);cursor:pointer;padding:0;}
    .cam-col.on{box-shadow:0 0 0 2.5px var(--c);}
    .cam-reglages label{display:inline-flex;align-items:center;gap:6px;font-size:.84rem;color:#4E5665;}
    .cam-reglages input[type=range]{width:130px;accent-color:#0C5BA0;}
    .cam-chk{margin:0 6px;}
    #camInsBtn{margin-left:auto;}
  `;
  document.head.appendChild(st);
})();
