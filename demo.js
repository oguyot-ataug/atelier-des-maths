/* =====================================================================
   demo.js -- mode découverte (visiteur non connecté) du menu « S'entraîner »

   Demandé : "En mode hors connexion, permettre uniquement le premier automatisme de chaque
   rubrique, les autres restent inaccessibles. Pour les autres rubriques de ce menu, montrer des
   vidéos de présentation ou des gifs mais pas de possibilités d'accès (mode démo)".

   - Objectif Nombre, Géométrie interactive, Tableau interactif : à la place de l'outil, une page
     de présentation avec une courte vidéo muette en boucle (assets/videos/demo-*.mp4) et les
     boutons pour se connecter ou s'inscrire (app.js et router.js appellent showDemo).
   - Automatismes : calcul-mental.js ne laisse ouverte que la première séquence de chaque rubrique
     (cmVisiteurBloque) ; les autres affichent demoInvite.
   ===================================================================== */

const DEMOS = {
  compte: {
    titre: 'Objectif Nombre', icone: 'calculate', video: 'demo-objectif-nombre',
    texte: "Six nombres tirés au sort, un compte à atteindre : on combine +, −, × et ÷ pour tomber pile dessus, ou s'en approcher le plus possible.",
    points: ['Chaque tirage est garanti réalisable', 'Chronomètre, records et solution détaillée', 'Donné en devoir par le professeur, corrigé tout seul'],
  },
  geometrie: {
    titre: 'Géométrie interactive', icone: 'architecture', video: 'demo-geometrie',
    texte: "Points, segments, droites, cercles, milieux, perpendiculaires, angles… On construit sa figure, puis on déplace les points : tout ce qui en dépend suit.",
    points: ['Tous les outils de construction du collège', 'Figures enregistrées pour les reprendre plus tard', 'Figures à construire données en devoir'],
  },
  tableau: {
    titre: 'Tableau interactif', icone: 'draw', video: 'demo-tableau',
    texte: "Règle, compas, équerre et rapporteur à l'écran, et des constructions animées pas à pas à partir d'un énoncé.",
    points: ['Instruments manipulables comme en vrai', 'Constructions rejouées étape par étape', 'Idéal au vidéoprojecteur comme à la maison'],
  },
};

function demoVisiteur(){ return typeof currentUser === 'undefined' || !currentUser; }

// Ouvre le menu de connexion (en haut à droite) depuis un bouton de la page.
function demoOuvrirConnexion(e){
  if(e) e.stopPropagation();
  const d = document.getElementById('accountDropdown');
  if(d) d.style.display = 'block';
  if(typeof toggleForgotPassword === 'function' && document.getElementById('authForgotForm') && document.getElementById('authForgotForm').style.display !== 'none') toggleForgotPassword(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(()=>{ const f = document.getElementById('globalAuthEmail'); if(f) f.focus(); }, 300);
}
function demoCtaHtml(){
  const parent = typeof famPublique !== 'undefined' && famPublique;
  return `
    <div class="demo-cta">
      <button class="btn-auth" onclick="demoOuvrirConnexion(event)"><span class="gicon">login</span> Se connecter</button>
      <button class="btn-auth-alt" onclick="event.stopPropagation();openProfSignupModal()"><span class="gicon">school</span> Je suis professeur</button>
      ${parent ? `<button class="btn-auth-alt" onclick="event.stopPropagation();location.hash='#/famille'"><span class="gicon">family_restroom</span> Je suis parent</button>` : ''}
    </div>
    <p class="demo-note">Élève : connecte-toi avec l'identifiant donné par ton professeur (ou par tes parents).</p>`;
}

let demoCle = null;
// Après connexion depuis une page de démonstration : ouvre le vrai outil.
function demoOuvrirOutil(){
  const v = document.getElementById('view-demo');
  if(!demoCle || !v || !v.classList.contains('active')) return;
  const nav = demoCle === 'geometrie' ? 'figure-sandbox' : demoCle;
  demoCle = null;
  const b = document.querySelector('#navDropdownEntrainer [data-nav="'+nav+'"]');
  if(b) b.click();
}
function showDemo(key){
  const d = DEMOS[key]; if(!d) return;
  demoCle = key;
  const root = document.getElementById('demoRoot'); if(!root) return;
  root.innerHTML = `
    <div class="demo-head">
      <span class="demo-ico"><span class="gicon">${d.icone}</span></span>
      <div><div class="demo-eyebrow">Aperçu · réservé aux comptes</div><h1>${d.titre}</h1></div>
    </div>
    <div class="demo-grid">
      <div class="demo-video">
        <video poster="assets/videos/${d.video}.jpg" autoplay muted loop playsinline preload="metadata" aria-label="Démonstration : ${d.titre}">
          <source src="assets/videos/${d.video}.mp4" type="video/mp4">
          <source src="assets/videos/${d.video}.webm" type="video/webm">
        </video>
        <span class="demo-badge"><span class="gicon">play_circle</span> Démonstration</span>
      </div>
      <div class="demo-side">
        <p class="demo-texte">${d.texte}</p>
        <ul class="demo-points">${d.points.map(p => `<li><span class="gicon">check_circle</span><span>${p}</span></li>`).join('')}</ul>
        <div class="demo-lock"><span class="gicon">lock</span> Pour l'utiliser, connectez-vous : les élèves avec le compte donné par leur professeur, les professeurs et les parents avec leur propre compte.</div>
        ${demoCtaHtml()}
      </div>
    </div>`;
  showView('view-demo');
  if(typeof setActiveTopnav === 'function') setActiveTopnav(null);
  const v = root.querySelector('video'); if(v){ v.muted = true; const pr = v.play(); if(pr && pr.catch) pr.catch(()=>{}); }
}

/* Fenêtre « réservé aux comptes » (automatisme verrouillé). */
function demoInvite(titre, texte){
  let o = document.getElementById('demoInviteOverlay');
  if(!o){
    o = document.createElement('div'); o.id = 'demoInviteOverlay'; o.className = 'modal-overlay';
    o.addEventListener('click', e => { if(e.target === o) o.style.display = 'none'; });
    document.body.appendChild(o);
  }
  o.innerHTML = `<div class="modal-card demo-invite">
      <button class="modal-close" onclick="document.getElementById('demoInviteOverlay').style.display='none'" aria-label="Fermer"><span class="gicon">close</span></button>
      <span class="auth-badge"><span class="gicon">lock</span></span>
      <div class="auth-title" style="margin:10px 0 4px;">${titre}</div>
      <p class="demo-texte" style="margin:0 0 14px;">${texte}</p>
      ${demoCtaHtml()}
    </div>`;
  o.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { if(!b.classList.contains('modal-close')) o.style.display = 'none'; }));
  o.style.display = 'flex';
}

(function demoStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #demoRoot{max-width:1100px;}
    .demo-head{display:flex;align-items:center;gap:14px;margin:8px 0 18px;}
    .demo-head h1{margin:0;}
    .demo-ico{flex:none;width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1A7AD0,var(--accent));color:#fff;box-shadow:0 8px 18px rgba(12,91,160,.25);}
    .demo-ico .gicon{font-size:30px;}
    .demo-eyebrow{font-size:.76rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--accent-orange);}
    .demo-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:24px;align-items:start;}
    .demo-video{position:relative;border-radius:16px;overflow:hidden;background:#0d2a4a;box-shadow:0 18px 44px rgba(28,43,57,.22);border:1px solid rgba(28,43,57,.08);}
    .demo-video video{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;background:#f4f6f9;}
    .demo-badge{position:absolute;top:10px;left:10px;display:inline-flex;align-items:center;gap:5px;background:rgba(20,28,40,.72);color:#fff;border-radius:999px;padding:4px 10px;font:600 .75rem 'Inter',sans-serif;backdrop-filter:blur(4px);}
    .demo-badge .gicon{font-size:16px;}
    .demo-side{background:#fff;border-radius:16px;padding:20px;box-shadow:var(--shadow);border:1px solid rgba(28,43,57,.06);}
    .demo-texte{font-size:.98rem;line-height:1.55;margin:0 0 12px;color:var(--ink);}
    .demo-points{list-style:none;padding:0;margin:0 0 14px;display:grid;gap:7px;}
    .demo-points li{display:flex;gap:8px;align-items:flex-start;font-size:.9rem;}
    .demo-points .gicon{color:#1E7B34;font-size:19px;}
    .demo-lock{display:flex;gap:8px;align-items:flex-start;background:#FFF4E6;border:1px solid rgba(255,130,8,.25);color:#7A3E00;border-radius:12px;padding:10px 12px;font-size:.84rem;line-height:1.45;margin:0 0 14px;}
    .demo-lock .gicon{font-size:19px;color:var(--accent-orange);}
    .demo-cta{display:flex;flex-direction:column;gap:8px;}
    .demo-cta .btn-auth-alt{margin:0;}
    .demo-note{font-size:.76rem;color:var(--ink-soft);text-align:center;margin:10px 0 0;}
    .demo-invite{position:relative;text-align:center;max-width:380px;}
    .demo-invite .auth-badge{margin:4px auto 0;}
    .demo-invite .modal-close{position:absolute;top:10px;right:10px;}
    .cm-demo-banner{grid-column:1/-1;display:flex;align-items:center;gap:10px;background:#FFF4E6;border:1px solid rgba(255,130,8,.25);color:#7A3E00;border-radius:12px;padding:10px 14px;font-size:.88rem;margin:0 0 6px;}
    .cm-demo-banner .gicon{color:var(--accent-orange);}
    .cm-demo-banner a{color:var(--accent);font-weight:700;cursor:pointer;}
    .cm-chip.cm-chip-locked{opacity:.55;filter:grayscale(.35);position:relative;}
    .cm-chip.cm-chip-locked:hover{opacity:.75;}
    .cm-chip-lockico{position:absolute;top:6px;right:8px;font-size:17px;color:var(--ink-soft);}
    .cm-chip.cm-chip-free{position:relative;box-shadow:0 0 0 2px var(--cm-accent,#FF8208);}
    .cm-chip-freebadge{position:absolute;top:-9px;right:8px;background:var(--cm-accent,#FF8208);color:#fff;border-radius:999px;padding:1px 8px;font:700 .66rem 'Space Grotesk',sans-serif;letter-spacing:.3px;}
    @media (max-width:860px){ .demo-grid{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();
