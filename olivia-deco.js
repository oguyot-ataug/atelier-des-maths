/* =====================================================================
   olivia-deco.js -- La petite Oliv'IA dans les chapitres

   Demandé : « Décliner des images de la petite Oliv'IA dans les cours, les méthodes, les exercices,
   l'histoire, les automatismes, bref tous les outils pour l'élève ("À savoir !", "Muscle ton jeu !") :
   ce serait sympa et ça mettrait un peu de gaieté. » Choix : une petite vignette avec une bulle, au
   début de chaque encadré clé ; pas dans les PDF ni dans le cahier.

   Poses (même personnage que le bouton d'Oliv'IA, olivia.js) : le doigt levé (définitions, règles,
   propriétés), la loupe (méthodes), les muscles (exercices, automatismes), le chapeau d'exploratrice
   et le parchemin (histoire), le point d'interrogation (quiz).

   Les vignettes sont dessinées UNIQUEMENT en CSS (pseudo-éléments ::before / ::after) sur des classes
   ajoutées aux éléments existants : aucun nœud n'est ajouté au contenu des chapitres. Ainsi rien ne
   change pour la lecture à voix haute, le mode apprentissage (texte des encadrés), les cours
   personnalisés (blocs calculés sur les enfants et leur texte), le cahier et les PDF (le style n'est
   actif que dans la page du chapitre : #view-chapitre.oliv-deco).
   Dépend d'app.js (openChapitre appelle olivDecorer) et de flash-prets.js (fenêtre des questions flash).
   ===================================================================== */

// Corps commun : l'olive, ses yeux, ses joues ; « bras » et « tete » varient selon la pose.
function olivPoseSvg(p){
  const E = '#4F6B2A';
  const feuille = `<path d="M60 20 q-2 -9 4 -14" stroke="${E}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M64 8 C 74 -1, 88 3, 92 10 C 82 16, 72 15, 64 8 Z" fill="#7BAE4F" stroke="${E}" stroke-width="1.5"/>`;
  const chapeau = `<ellipse cx="60" cy="25" rx="38" ry="7" fill="#A0743B" stroke="#6B4A22" stroke-width="2"/><path d="M38 24 Q40 4 60 4 Q80 4 82 24 Z" fill="#C49A5C" stroke="#6B4A22" stroke-width="2"/><path d="M39 19 H81" stroke="#6B4A22" stroke-width="4"/>`;
  const corps = `<ellipse cx="60" cy="66" rx="34" ry="42" fill="#8DB84A" stroke="${E}" stroke-width="3.5"/><ellipse cx="47" cy="46" rx="8" ry="13" fill="#fff" opacity=".35" transform="rotate(-20 47 46)"/>`;
  const yeux = (clin) => `<circle cx="47" cy="62" r="11" fill="#fff" stroke="#2C3A1A" stroke-width="2.5"/><circle cx="49" cy="64" r="5.5" fill="#1C2B39"/><circle cx="51" cy="61.5" r="1.8" fill="#fff"/>`
    + (clin ? `<path d="M64 63 Q73 57 82 63" stroke="#2C3A1A" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : `<circle cx="73" cy="62" r="11" fill="#fff" stroke="#2C3A1A" stroke-width="2.5"/><circle cx="75" cy="64" r="5.5" fill="#1C2B39"/><circle cx="77" cy="61.5" r="1.8" fill="#fff"/>`);
  const joues = `<circle cx="36" cy="82" r="5" fill="#F4A7B9" opacity=".9"/><circle cx="84" cy="82" r="5" fill="#F4A7B9" opacity=".9"/>`;
  const sourire = `<path d="M50 84 Q60 92 70 84" stroke="#2C3A1A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const bouche = `<path d="M51 83 Q60 95 69 83 Z" fill="#7A2E2E" stroke="#2C3A1A" stroke-width="2.5" stroke-linejoin="round"/>`;
  const brasG = `<path d="M27 72 q-14 4 -16 16" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="11" cy="89" r="4.5" fill="${E}"/>`;
  const sourcils = `<path d="M37 47 L55 52 M83 47 L65 52" stroke="#2C3A1A" stroke-width="3" stroke-linecap="round"/>`;
  let tete = feuille, bras = brasG, visage = yeux(false) + joues + sourire, extra = '';
  if(p === 'savoir'){ // doigt levé
    bras += `<path d="M93 66 q12 -10 11 -32" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="104" cy="33" r="5" fill="${E}"/><path d="M104 29 V18" stroke="${E}" stroke-width="4" stroke-linecap="round"/>`;
    visage = yeux(false) + joues + bouche;
  } else if(p === 'methode'){ // loupe
    bras += `<path d="M93 72 q10 -2 14 -10" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    extra = `<path d="M108 62 L114 74" stroke="#5B3A1A" stroke-width="5" stroke-linecap="round"/><circle cx="104" cy="48" r="13" fill="#CFEFFF" fill-opacity=".7" stroke="#1F3A5C" stroke-width="3.5"/><path d="M98 43 q3 -5 9 -5" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="108" cy="63" r="4.5" fill="${E}"/>`;
  } else if(p === 'muscle'){ // deux bras musclés
    bras = `<path d="M27 70 q-16 0 -15 -18" stroke="${E}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M15 62 q-5 -6 0 -12" stroke="${E}" stroke-width="2.5" fill="none"/><circle cx="12" cy="49" r="6.5" fill="${E}"/>`
      + `<path d="M93 70 q16 0 15 -18" stroke="${E}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M105 62 q5 -6 0 -12" stroke="${E}" stroke-width="2.5" fill="none"/><circle cx="108" cy="49" r="6.5" fill="${E}"/>`;
    visage = sourcils + yeux(false) + joues + bouche;
  } else if(p === 'histoire'){ // chapeau d'exploratrice et parchemin
    tete = chapeau;
    bras += `<path d="M93 72 q10 0 13 -6" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    extra = `<rect x="98" y="44" width="16" height="26" rx="3" fill="#F6E7C1" stroke="#8A6D1F" stroke-width="2"/><rect x="96" y="40" width="20" height="6" rx="3" fill="#E9D3A0" stroke="#8A6D1F" stroke-width="2"/><rect x="96" y="68" width="20" height="6" rx="3" fill="#E9D3A0" stroke="#8A6D1F" stroke-width="2"/><path d="M102 52 H110 M102 57 H110 M102 62 H108" stroke="#8A6D1F" stroke-width="1.5"/>`;
  } else if(p === 'quiz'){ // point d'interrogation, main au menton
    bras += `<path d="M93 76 q4 10 -12 14" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="80" cy="90" r="4.5" fill="${E}"/>`;
    extra = `<text x="104" y="40" font-size="36" font-weight="800" fill="#E35D3A" font-family="Arial, sans-serif" text-anchor="middle">?</text>`;
    visage = yeux(true) + joues + sourire;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${tete}${corps}${bras}${visage}${extra}</svg>`;
}
const OLIV_POSES = ['savoir', 'methode', 'muscle', 'histoire', 'quiz'];
function olivPoseUrl(p){ return `url("data:image/svg+xml,${encodeURIComponent(olivPoseSvg(p))}")`; }

// Phrases des bulles (le premier encadré prend la première, puis on varie).
const OLIV_PHRASES = {
  def: ['À savoir !', 'Le mot juste !', 'À retenir !'],
  prop: ['Retiens bien !', 'C\'est la règle !', 'Important !'],
  methode: ['Suis la méthode !', 'Pas à pas !', 'Observe bien !'],
};

/* Pose les classes sur les éléments du chapitre ouvert. */
function olivDecorer(demo){
  const v = document.getElementById('view-chapitre'); if(!v) return;
  v.classList.add('oliv-deco');
  if(!demo) return;
  const tag = (el, pose, txt) => { el.classList.add('oliv-b', 'oliv-' + pose); el.dataset.oliv = txt; };
  const cont = id => id ? document.getElementById(id) : null;
  [cont(demo.cours), cont(demo.methode)].forEach(c => {
    if(!c) return;
    let nd = 0, np = 0, nm = 0;
    // La phrase suit le titre du badge : « Méthode », « Définition », « Propriété », « Règle »…
    c.querySelectorAll('.def-badge, .prop-badge').forEach(el => {
      const t = el.textContent.toLowerCase();
      if(/m[ée]thode/.test(t)) tag(el, 'methode', OLIV_PHRASES.methode[nm++ % 3]);
      else if(/astuce/.test(t)) tag(el, 'quiz', 'L\'astuce !');
      else if(/d[ée]finition|vocabulaire|notation/.test(t) || (el.classList.contains('def-badge') && !/propri|r[èe]gle|th[ée]or/.test(t))) tag(el, 'savoir', OLIV_PHRASES.def[nd++ % 3]);
      else tag(el, 'savoir', OLIV_PHRASES.prop[np++ % 3]);
    });
    c.querySelectorAll('.sub-header').forEach(h => {
      const l = h.querySelector('.letter');
      if(l && l.textContent.trim() === 'M'){ h.classList.add('oliv-sh'); h.dataset.oliv = OLIV_PHRASES.methode[nm++ % 3]; }
    });
  });
  // En tête d'onglet : exercices, histoire, quiz.
  const haut = (el, pose, txt) => { if(!el) return; el.classList.add('oliv-haut', 'oliv-' + pose); el.dataset.oliv = txt; };
  haut(cont(demo.exos), 'muscle', 'Muscle ton jeu !');
  haut(cont(demo.histoire), 'histoire', 'Il était une fois…');
  haut(document.getElementById('panel-quiz'), 'quiz', 'À toi de jouer !');
}

(function olivStyles(){
  const st = document.createElement('style');
  st.textContent = OLIV_POSES.map(p => `.oliv-deco .oliv-${p}{--oliv-img:${olivPoseUrl(p)};}`).join('\n') + `
    .oliv-deco .oliv-sh{--oliv-img:${olivPoseUrl('methode')};}
    /* Encadrés : Oliv'IA à droite du badge, debout sur l'encadré, et sa bulle */
    .oliv-deco .oliv-b{position:relative;margin-top:28px;}
    .oliv-deco .oliv-b::before{content:'';position:absolute;left:calc(100% + 8px);bottom:-14px;width:54px;height:54px;background:var(--oliv-img) no-repeat center/contain;pointer-events:none;}
    .oliv-deco .oliv-b::after{content:attr(data-oliv);position:absolute;left:calc(100% + 64px);bottom:16px;white-space:nowrap;background:#fff;color:#3E5A1E;border:2px solid #8DB84A;border-radius:12px 12px 12px 3px;padding:2px 10px;font:700 .78rem 'Space Grotesk',sans-serif;letter-spacing:0;text-transform:none;box-shadow:0 2px 6px rgba(79,107,42,.15);pointer-events:none;}
    /* Méthodes : après le titre, avant le bouton « + Cahier » */
    .oliv-deco .oliv-sh::before{content:'';order:1;flex:none;width:46px;height:46px;margin:-10px 0 -10px 2px;background:var(--oliv-img) no-repeat center/contain;}
    .oliv-deco .oliv-sh::after{content:attr(data-oliv);order:2;flex:none;white-space:nowrap;background:#fff;color:#3E5A1E;border:2px solid #8DB84A;border-radius:12px 12px 12px 3px;padding:2px 10px;font:700 .78rem 'Space Grotesk',sans-serif;}
    .oliv-deco .oliv-sh > .add-to-cahier-btn{order:5;}
    /* En tête d'onglet */
    .oliv-deco .oliv-haut::before{content:attr(data-oliv);display:flex;align-items:center;min-height:56px;margin:0 0 10px;padding-left:64px;background:var(--oliv-img) no-repeat left center/56px;color:#3E5A1E;font:800 1.05rem 'Space Grotesk',sans-serif;}
    /* Automatismes (menu S'entraîner) et questions flash prêtes */
    #view-cm > h1{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
    #view-cm > h1::after{content:'Muscle ton jeu !';display:flex;align-items:center;min-height:58px;padding-left:64px;background:${olivPoseUrl('muscle')} no-repeat left center/58px;color:#3E5A1E;font:800 1rem 'Space Grotesk',sans-serif;}
    .fp-modal h3::after{content:'';display:inline-block;width:40px;height:40px;margin:-10px 0 -10px 8px;vertical-align:middle;background:${olivPoseUrl('muscle')} no-repeat center/contain;}
    @media (max-width:560px){ .oliv-deco .oliv-b::after{display:none;} .oliv-deco .oliv-sh::after{display:none;} }
    @media print{ .oliv-deco .oliv-b::before, .oliv-deco .oliv-b::after, .oliv-deco .oliv-sh::before, .oliv-deco .oliv-sh::after, .oliv-deco .oliv-haut::before{display:none !important;} .oliv-deco .oliv-b{margin-top:0;} }
  `;
  document.head.appendChild(st);
})();
