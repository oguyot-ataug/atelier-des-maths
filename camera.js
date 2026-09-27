/* =====================================================================
   camera.js -- Caméra du téléphone (visualiseur) : la prise de vue du smartphone du professeur
   s'affiche quasi en direct sur l'ordinateur, pour commenter un cahier ou une copie au
   vidéoprojecteur, et s'insère comme image (annotée ou non) dans la correction.

   Demandé : "un outil qui permet d'afficher quasi en direct sur l'ordinateur du professeur une
   prise de vue faite sur le smartphone. On pourrait l'utiliser pour commenter une correction ou
   s'en servir comme image en direct dans les corrections."

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
   Dépend de app.js (sb, currentUser, niceAlert), outils-figures.js (addPendingBlock, TOOL_ICONS)
   et vendor/qrcode.js.
   ===================================================================== */

const CAM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
let cam = null; // { code, ch, frames:Map, img, rot, frozen, strokes, drawing, color, connecte, photoAttendue }

function camCode(){
  const a = new Uint8Array(8); crypto.getRandomValues(a);
  return Array.from(a, x => CAM_ALPHABET[x % CAM_ALPHABET.length]).join('');
}
function camUrl(code){ return location.origin + '/camera.html?c=' + code; }

function openCameraTool(){
  camFermer(true);
  const code = camCode();
  cam = { code, frames: new Map(), img: null, rot: 0, frozen: false, strokes: [], drawing: false, color: '#D93025', connecte: false, photoAttendue: false, derniere: 0 };
  let o = document.getElementById('camOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'camOverlay'; document.body.appendChild(o); }
  o.className = 'cam-ov';
  o.innerHTML = `<div class="cam-box" id="camBox">
    <div class="cam-head"><span class="gicon">videocam</span> <b>Caméra du téléphone</b> <span id="camEtat" class="cam-etat attente">En attente du téléphone…</span>
      <button type="button" class="cam-x" onclick="camFermer()" title="Fermer"><span class="gicon">close</span></button></div>
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
      <div class="cam-view" id="camView"><canvas id="camCanvas"></canvas><canvas id="camDraw"></canvas><span class="cam-live" id="camLive">● EN DIRECT</span></div>
    </div>
    <div class="cam-tools" id="camTools" hidden>
      <button type="button" class="btn secondary" id="camFigerBtn" onclick="camFiger()"><span class="gicon">pause</span> Figer</button>
      <button type="button" class="btn secondary" onclick="camPhoto()" title="Demande au téléphone une photo en pleine résolution, plus nette que l'image en direct"><span class="gicon">photo_camera</span> Photo nette</button>
      <button type="button" class="btn secondary" onclick="camPivoter()" title="Pivoter d'un quart de tour"><span class="gicon">rotate_right</span></button>
      <span class="cam-sep"></span>
      <span class="cam-annot" title="Annoter l'image (elle se fige)">
        ${['#D93025', '#0C5BA0', '#1E7B34', '#FF8208'].map(c => `<button type="button" class="cam-col${c === '#D93025' ? ' on' : ''}" style="--c:${c}" onclick="camCouleur('${c}',this)" aria-label="Crayon"></button>`).join('')}
        <button type="button" class="btn secondary" onclick="camAnnuler()" title="Annuler le dernier trait"><span class="gicon">undo</span></button>
        <button type="button" class="btn secondary" onclick="camEffacer()" title="Effacer les annotations"><span class="gicon">ink_eraser</span></button>
      </span>
      <span class="cam-sep"></span>
      <button type="button" class="btn secondary" onclick="camPleinEcran()"><span class="gicon">fullscreen</span> Plein écran</button>
      <button type="button" class="btn" id="camInsBtn" onclick="camInserer()"><span class="gicon">add_photo_alternate</span> Insérer dans la correction</button>
    </div>
  </div>`;
  o.style.display = 'flex';
  // QR code
  try{
    const q = qrcode(0, 'M'); q.addData(camUrl(code)); q.make();
    document.getElementById('camQr').innerHTML = q.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }catch(e){ document.getElementById('camQr').innerHTML = '<p class="hint">QR code indisponible : utilisez le code.</p>'; }
  camBrancherDessin();
  // Canal temps réel
  cam.ch = sb.channel('cam-' + code, { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'hello' }, () => { camEnvoyer('hello-ok', {}); camConnecte(true); })
    .on('broadcast', { event: 'part' }, ({ payload }) => camMorceau(payload))
    .on('broadcast', { event: 'bye' }, () => camConnecte(false))
    .subscribe();
  cam.veille = setInterval(() => { if(cam && cam.connecte && Date.now() - cam.derniere > 8000) camConnecte(false, true); }, 3000);
  window.addEventListener('resize', camRedessiner);
}
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
    if(fr.k === 'photo'){ cam.photoAttendue = false; camFigerEtat(true); }
    if(premiere){ document.getElementById('camPair').hidden = true; document.getElementById('camStage').hidden = false; document.getElementById('camTools').hidden = false; }
    camRedessiner();
  };
  im.src = 'data:image/jpeg;base64,' + fr.parts.join('');
}
// Taille d'affichage (image pivotée, ajustée à la zone)
function camTaille(){
  const v = document.getElementById('camView'); if(!v || !cam || !cam.img) return null;
  const quart = cam.rot % 180 !== 0;
  const iw = quart ? cam.img.naturalHeight : cam.img.naturalWidth, ih = quart ? cam.img.naturalWidth : cam.img.naturalHeight;
  const maxW = v.clientWidth, maxH = v.clientHeight;
  const k = Math.min(maxW / iw, maxH / ih);
  return { iw, ih, w: Math.max(1, Math.round(iw * k)), h: Math.max(1, Math.round(ih * k)) };
}
function camDessinerImage(ctx, w, h){
  ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(cam.rot * Math.PI / 180);
  const quart = cam.rot % 180 !== 0, dw = quart ? h : w, dh = quart ? w : h;
  ctx.drawImage(cam.img, -dw / 2, -dh / 2, dw, dh); ctx.restore();
}
function camDessinerTraits(ctx, w, h){
  const ep = Math.max(2, Math.round(Math.min(w, h) / 160));
  cam.strokes.forEach(s => {
    ctx.strokeStyle = s.c; ctx.lineWidth = ep; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); s.p.forEach(([x, y], i) => i ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h)); ctx.stroke();
  });
}
function camRedessiner(){
  const t = camTaille(); if(!t) return;
  const c = document.getElementById('camCanvas'), d = document.getElementById('camDraw');
  const r = window.devicePixelRatio || 1;
  [c, d].forEach(x => { x.width = t.w * r; x.height = t.h * r; x.style.width = t.w + 'px'; x.style.height = t.h + 'px'; });
  const ctx = c.getContext('2d'); ctx.setTransform(r, 0, 0, r, 0, 0); camDessinerImage(ctx, t.w, t.h);
  const dc = d.getContext('2d'); dc.setTransform(r, 0, 0, r, 0, 0); dc.clearRect(0, 0, t.w, t.h); camDessinerTraits(dc, t.w, t.h);
}
function camFigerEtat(on){
  cam.frozen = on;
  const b = document.getElementById('camFigerBtn');
  if(b) b.innerHTML = on ? '<span class="gicon">play_arrow</span> Reprendre le direct' : '<span class="gicon">pause</span> Figer';
  const l = document.getElementById('camLive'); if(l){ l.textContent = on ? '❚❚ IMAGE FIGÉE' : '● EN DIRECT'; l.classList.toggle('fige', on); }
  camEnvoyer(on ? 'pause' : 'resume', {});
  if(!on){ cam.strokes = []; camRedessiner(); }
}
function camFiger(){ if(cam && cam.img) camFigerEtat(!cam.frozen); }
function camPhoto(){
  if(!cam || !cam.connecte){ niceAlert('Le téléphone n\'est pas connecté.'); return; }
  cam.photoAttendue = true; camEnvoyer('req-photo', {});
  const l = document.getElementById('camLive'); if(l) l.textContent = '… photo en cours';
}
function camPivoter(){ if(!cam || !cam.img) return; cam.rot = (cam.rot + 90) % 360; cam.strokes = []; camRedessiner(); }
function camCouleur(c, el){ cam.color = c; document.querySelectorAll('.cam-col').forEach(b => b.classList.toggle('on', b === el)); }
function camAnnuler(){ if(cam){ cam.strokes.pop(); camRedessiner(); } }
function camEffacer(){ if(cam){ cam.strokes = []; camRedessiner(); } }
function camBrancherDessin(){
  const d = document.getElementById('camDraw');
  const pos = ev => { const r = d.getBoundingClientRect(); return [(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height]; };
  d.addEventListener('pointerdown', ev => {
    if(!cam || !cam.img) return;
    if(!cam.frozen) camFigerEtat(true); // on annote une image fixe
    cam.drawing = true; try{ d.setPointerCapture(ev.pointerId); }catch(e){}
    cam.strokes.push({ c: cam.color, p: [pos(ev)] }); ev.preventDefault();
  });
  d.addEventListener('pointermove', ev => { if(!cam || !cam.drawing) return; cam.strokes[cam.strokes.length - 1].p.push(pos(ev)); camRedessiner(); });
  const fin = () => { if(cam) cam.drawing = false; };
  d.addEventListener('pointerup', fin); d.addEventListener('pointercancel', fin);
}
function camPleinEcran(){
  const b = document.getElementById('camBox'); if(!b) return;
  if(document.fullscreenElement) document.exitFullscreen(); else if(b.requestFullscreen) b.requestFullscreen().catch(() => {});
}
document.addEventListener('fullscreenchange', () => setTimeout(camRedessiner, 120));
// Image finale : pleine résolution, pivotée, annotations comprises.
function camComposer(){
  const quart = cam.rot % 180 !== 0;
  const w = quart ? cam.img.naturalHeight : cam.img.naturalWidth, h = quart ? cam.img.naturalWidth : cam.img.naturalHeight;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'); camDessinerImage(ctx, w, h); camDessinerTraits(ctx, w, h);
  return new Promise(res => c.toBlob(res, 'image/jpeg', 0.88));
}
async function camInserer(){
  if(!cam || !cam.img) return;
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
    btn.innerHTML = '<span class="gicon">check</span> Insérée';
    setTimeout(() => { if(document.getElementById('camInsBtn')) { btn.innerHTML = avant; btn.disabled = false; } }, 1600);
  }catch(e){
    console.error('caméra : insertion', e);
    btn.innerHTML = avant; btn.disabled = false;
    await niceAlert('Échec de l\'envoi de l\'image (connexion ?). Réessayez.');
  }
}
function camFermer(silencieux){
  if(!cam) { const o = document.getElementById('camOverlay'); if(o) o.style.display = 'none'; return; }
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
    .cam-box{background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.3);width:min(1200px,100%);height:min(860px,100%);display:flex;flex-direction:column;overflow:hidden;}
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
    .cam-live{position:absolute;top:10px;left:12px;background:rgba(217,48,37,.92);color:#fff;font:700 .72rem Inter,sans-serif;border-radius:6px;padding:3px 8px;letter-spacing:.5px;}
    .cam-live.fige{background:rgba(28,43,57,.8);}
    .cam-tools{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:10px 14px;border-top:1px solid rgba(28,43,57,.1);}
    .cam-tools .btn{padding:6px 12px;font-size:.84rem;}
    .cam-sep{width:1px;height:26px;background:rgba(28,43,57,.15);margin:0 4px;}
    .cam-annot{display:inline-flex;align-items:center;gap:5px;}
    .cam-col{width:24px;height:24px;border-radius:50%;background:var(--c);border:3px solid #fff;box-shadow:0 0 0 1.5px rgba(28,43,57,.25);cursor:pointer;padding:0;}
    .cam-col.on{box-shadow:0 0 0 2.5px var(--c);}
    #camInsBtn{margin-left:auto;}
  `;
  document.head.appendChild(st);
})();
