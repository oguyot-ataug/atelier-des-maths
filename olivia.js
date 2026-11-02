/* =====================================================================
   olivia.js -- Oliv'IA, la petite robote qui aide à comprendre le cours

   Demandé : « Un petit chatbot IA "Oliv'IA". Son but, sur les cours, donner des explications
   supplémentaires si un élève le sollicite. Présent uniquement sur les pages de cours et
   paramétrable par le prof au niveau de la disponibilité des élèves (on pourrait le limiter aux
   élèves les plus en difficulté). » Puis : choix élève par élève et/ou groupe de remédiation ;
   compte rendu des conversations pour le professeur ; aide sur les exercices aussi.

   - Bouton rond en bas à droite, seulement sur un chapitre (onglets Cours, Méthodes, Exercices) et
     seulement si l'accès est ouvert (my_ai_access : features.olivia pour un élève, self pour un
     professeur qui veut l'essayer). Le serveur (ai-proxy v19) revérifie tout.
   - Le texte de l'onglet affiché part avec la question (les formules en LaTeX, les corrections
     d'exercices retirées) ; les consignes d'Oliv'IA sont écrites côté serveur.
   - Sélectionner un passage du cours fait apparaître « Demander à Oliv'IA ».
   - Une conversation par chapitre ; chaque échange est enregistré (olivia_messages) et relu par le
     professeur dans Mon compte > Intelligence artificielle.

   Dépend d'app.js (sb, SUPABASE_URL, currentUser, currentChapterTitle, currentChapterLevel,
   DEMO_REGISTRY, renderMathText) et d'ia-compte.js (aiAccess).
   ===================================================================== */

// Personnage choisi (« J'adore Olive-robot pour Oliv'IA ») : une olive verte avec sa feuille,
// de grands yeux (qui clignent), des joues roses et deux petits bras articulés.
const OLIV_AVATAR = `<svg viewBox="0 0 120 120" aria-hidden="true">
  <path d="M60 20 q-2 -9 4 -14" stroke="#4F6B2A" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path class="oliv-feuille" d="M64 8 C 74 -1, 88 3, 92 10 C 82 16, 72 15, 64 8 Z" fill="#7BAE4F" stroke="#4F6B2A" stroke-width="1.5"/>
  <ellipse cx="60" cy="64" rx="36" ry="44" fill="#8DB84A" stroke="#4F6B2A" stroke-width="3.5"/>
  <ellipse cx="46" cy="42" rx="9" ry="14" fill="#fff" opacity=".35" transform="rotate(-20 46 42)"/>
  <path d="M26 70 q-14 4 -16 16" stroke="#4F6B2A" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="10" cy="87" r="4.5" fill="#4F6B2A"/>
  <g class="oliv-bras"><path d="M94 70 q14 -2 17 -14" stroke="#4F6B2A" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="111" cy="55" r="4.5" fill="#4F6B2A"/></g>
  <g class="oliv-oeil"><circle cx="46" cy="60" r="12" fill="#fff" stroke="#2C3A1A" stroke-width="2.5"/><circle cx="48" cy="62" r="6" fill="#1C2B39"/><circle cx="50" cy="59.5" r="2" fill="#fff"/></g>
  <g class="oliv-oeil"><circle cx="74" cy="60" r="12" fill="#fff" stroke="#2C3A1A" stroke-width="2.5"/><circle cx="76" cy="62" r="6" fill="#1C2B39"/><circle cx="78" cy="59.5" r="2" fill="#fff"/></g>
  <path d="M50 82 Q60 90 70 82" stroke="#2C3A1A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="36" cy="80" r="5" fill="#F4A7B9" opacity=".9"/><circle cx="84" cy="80" r="5" fill="#F4A7B9" opacity=".9"/>
</svg>`;

let oliv = { ouvert: false, chapKey: '', conv: null, hist: [], occupe: false, focus: '' };

function oliviaAutorisee(){
  const a = typeof aiAccess !== 'undefined' ? aiAccess : null;
  if(!a || typeof currentUser === 'undefined' || !currentUser) return false;
  if(a.role === 'eleve') return !!(a.features && a.features.olivia);
  if(a.role === 'prof' || a.role === 'admin') return !!a.self;
  return false;
}
function oliviaOnglet(){ const b = document.querySelector('.tab-btn.active'); return b ? b.dataset.tab : ''; }
function oliviaSurCours(){
  const v = document.getElementById('view-chapitre');
  return !!(v && v.classList.contains('active')) && ['cours', 'methode', 'exercices'].includes(oliviaOnglet());
}
function oliviaUuid(){ return (crypto.randomUUID && crypto.randomUUID()) || 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16)); }

// Affiche ou masque Oliv'IA selon la page ; nouvelle conversation à chaque changement de chapitre.
function oliviaMaj(){
  let lanceur = document.getElementById('olivLanceur');
  const visible = oliviaAutorisee() && oliviaSurCours();
  if(!visible){ if(lanceur) lanceur.style.display = 'none'; const p = document.getElementById('olivPanneau'); if(p) p.style.display = 'none'; oliviaBulleSel(null); oliviaEcouteMaj(); return; }
  if(!lanceur){
    lanceur = document.createElement('button');
    lanceur.id = 'olivLanceur'; lanceur.type = 'button'; lanceur.className = 'oliv-lanceur';
    lanceur.title = 'Oliv\'IA : une question sur le cours ?';
    lanceur.innerHTML = OLIV_AVATAR + '<span class="oliv-lanceur-bulle">Une question ?</span>';
    lanceur.onclick = () => oliviaOuvrir(!oliv.ouvert);
    document.body.appendChild(lanceur);
  }
  lanceur.style.display = oliv.ouvert ? 'none' : 'flex';
  const cle = (typeof currentChapterLevel !== 'undefined' ? currentChapterLevel : '') + '|' + (typeof currentChapterTitle !== 'undefined' ? currentChapterTitle : '');
  if(cle !== oliv.chapKey){ oliv.chapKey = cle; oliv.conv = oliviaUuid(); oliv.hist = []; oliv.focus = ''; oliviaRendreFil(); }
  const p = document.getElementById('olivPanneau'); if(p) p.style.display = oliv.ouvert ? 'flex' : 'none';
  oliviaEcouteMaj();
}

function oliviaOuvrir(on){
  oliv.ouvert = on;
  let p = document.getElementById('olivPanneau');
  if(on && !p){
    p = document.createElement('div');
    p.id = 'olivPanneau'; p.className = 'oliv-panneau'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Oliv\'IA');
    p.innerHTML = `<div class="oliv-tete">
        <span class="oliv-tete-avatar">${OLIV_AVATAR}</span>
        <span class="oliv-tete-nom"><b>Oliv'IA</b><small>ta petite robote pour apprendre</small></span>
        ${oliviaSR() && oliviaProf() ? '<button type="button" class="oliv-x oliv-ecoute-btn" id="olivEcouteBtn" onclick="oliviaEcouteBasculer()" title="Écoute « Ok Olivia ! »" aria-pressed="false"><span class="gicon">hearing</span></button>' : ''}
        <button type="button" class="oliv-x" onclick="oliviaNouvelle()" title="Nouvelle conversation"><span class="gicon">restart_alt</span></button>
        <button type="button" class="oliv-x" onclick="oliviaOuvrir(false)" title="Fermer" aria-label="Fermer"><span class="gicon">close</span></button>
      </div>
      <div class="oliv-fil" id="olivFil" aria-live="polite"></div>
      <div class="oliv-suggest" id="olivSuggest"></div>
      <div class="oliv-ecoute-etat" id="olivEcouteEtat" style="display:none"></div>
      <form class="oliv-saisie" onsubmit="event.preventDefault(); oliviaEnvoyer();">
        <textarea id="olivTexte" rows="2" maxlength="1200" placeholder="Pose ta question sur le cours…" onkeydown="if(event.key==='Enter' && !event.shiftKey){ event.preventDefault(); oliviaEnvoyer(); }"></textarea>
        ${oliviaSR() ? '<button type="button" class="btn oliv-micro" id="olivMicro" onclick="oliviaDicter()" title="Poser ma question à voix haute"><span class="gicon">mic</span></button>' : ''}
        <button type="submit" class="btn" id="olivEnvoyer" title="Envoyer"><span class="gicon">send</span></button>
      </form>
      <p class="oliv-pied">Oliv'IA peut se tromper : vérifie avec ton cours. Ton professeur peut relire tes échanges.</p>`;
    document.body.appendChild(p);
    oliviaRendreFil(); oliviaEcouteAfficher();
  }
  oliviaMaj();
  if(on) setTimeout(() => { const t = document.getElementById('olivTexte'); if(t) t.focus(); }, 60);
}
function oliviaNouvelle(){ oliv.conv = oliviaUuid(); oliv.hist = []; oliv.focus = ''; oliviaRendreFil(); }

function oliviaBonjour(){
  const chap = typeof currentChapterTitle !== 'undefined' && currentChapterTitle ? `« ${typeof chapTitreAffiche === 'function' ? chapTitreAffiche() : currentChapterTitle} »` : 'ce chapitre';
  return `Bonjour ! Je suis **Oliv'IA**. Je peux t'expliquer autrement une partie du cours ${chap}, te donner un autre exemple, ou t'aider à démarrer un exercice (sans te donner la réponse !).\nTu peux aussi sélectionner un passage du cours avec ta souris.`;
}
function oliviaBulleHtml(qui, html){
  return qui === 'oliv'
    ? `<div class="oliv-msg oliv"><span class="oliv-mini">${OLIV_AVATAR}</span><div class="oliv-txt">${html}${typeof voixParler === 'function' ? '<button type="button" class="oliv-ecouter" title="Écouter Oliv\'IA" aria-label="Écouter Oliv\'IA" onclick="oliviaEcouter(this)"><span class="gicon">volume_up</span></button>' : ''}</div></div>`
    : `<div class="oliv-msg eleve"><div class="oliv-txt">${html}</div></div>`;
}
// Oliv'IA a sa voix (demandé le 02/11/2026 : « on pourrait donner une voix à Oliv'IA ») : voix en ligne d'Oliv'IA (style
// « olivia » de la fonction voix), sinon la voix de l'appareil plus aiguë. Un clic lit la bulle, un second clic arrête.
function oliviaEcouter(btn, apres){
  const enCours = btn.classList.contains('lecture');
  if(typeof voixArreter === 'function') voixArreter();
  document.querySelectorAll('.oliv-ecouter.lecture').forEach(b => { b.classList.remove('lecture'); b.innerHTML = '<span class="gicon">volume_up</span>'; });
  if(enCours) return;
  const bulle = btn.closest('.oliv-txt'); if(!bulle) return;
  const c = bulle.cloneNode(true); c.querySelectorAll('.oliv-ecouter, .oliv-cite').forEach(e => e.remove());
  let t = typeof buildSpeechText === 'function' ? buildSpeechText(c) : c.textContent;
  if(typeof speechFinal === 'function') t = speechFinal(t);
  const fin = () => { btn.classList.remove('lecture'); btn.innerHTML = '<span class="gicon">volume_up</span>'; if(apres){ const a = apres; apres = null; a(); } };
  btn.classList.add('lecture'); btn.innerHTML = '<span class="gicon">stop</span>';
  if(!voixParler(t, { style: 'olivia', onend: fin, onerror: fin })) fin();
}
function oliviaEsc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
// Mise en forme des réponses : formules $...$ (KaTeX), **gras**, retours à la ligne. Pas de
// renderMathText ici : sa règle des « variables isolées » mettait en italique le t de « t'aider ».
function oliviaFormat(t){
  const maths = [];
  let h = oliviaEsc(String(t)).replace(/\$([^$\n]+)\$/g, (m, e) => {
    const brut = e.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    let r; try{ r = typeof katexSpan === 'function' ? katexSpan(brut) : e; }catch(err){ r = e; }
    maths.push(r === brut ? e : r); return '\u0000' + (maths.length - 1) + '\u0000';
  });
  h = h.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
  // Listes : lignes « - … », « * … », « • … » en puces, « 1. … » numérotées (la voix ne lit plus « moins » devant).
  h = h.replace(/(?:^|\n)((?:[ \t]*[-*•][ \t]+[^\n]*(?:\n|$))+)/g, (m, bloc) => '\n<ul class="oliv-liste">' + bloc.trim().split('\n').map(l => '<li>' + l.replace(/^[ \t]*[-*•][ \t]+/, '') + '</li>').join('') + '</ul>\n')
    .replace(/(?:^|\n)((?:[ \t]*\d+[.)][ \t]+[^\n]*(?:\n|$))+)/g, (m, bloc) => '\n<ol class="oliv-liste">' + bloc.trim().split('\n').map(l => '<li>' + l.replace(/^[ \t]*\d+[.)][ \t]+/, '') + '</li>').join('') + '</ol>\n');
  h = h.replace(/\n*(<\/?[ou]l[^>]*>)\n*/g, '$1').replace(/^\n+|\n+$/g, '').replace(/\n/g, '<br>');
  return h.replace(/\u0000(\d+)\u0000/g, (m, i) => maths[+i]);
}
function oliviaRendreFil(){
  const fil = document.getElementById('olivFil'); if(!fil) return;
  let h = oliviaBulleHtml('oliv', oliviaFormat(oliviaBonjour()));
  oliv.hist.forEach(e => { h += oliviaBulleHtml('eleve', (e.focus ? `<span class="oliv-cite">« ${oliviaEsc(e.focus.length > 140 ? e.focus.slice(0, 137) + '…' : e.focus)} »</span>` : '') + oliviaEsc(e.q).replace(/\n/g, '<br>')); h += e.r != null ? oliviaBulleHtml('oliv', e.erreur ? `<span class="oliv-erreur">${oliviaEsc(e.r)}</span>` : oliviaFormat(e.r)) : ''; });
  if(oliv.occupe) h += `<div class="oliv-msg oliv"><span class="oliv-mini reflechit">${OLIV_AVATAR}</span><div class="oliv-txt"><span class="oliv-points"><i></i><i></i><i></i></span></div></div>`;
  fil.innerHTML = h;
  // Réponse arrivée : on montre le DÉBUT de la réponse d'Oliv'IA (on la lit de haut en bas).
  const dernier = fil.lastElementChild, derniere = oliv.hist[oliv.hist.length - 1];
  fil.scrollTop = !oliv.occupe && derniere && derniere.r != null && dernier ? dernier.offsetTop - 8 : fil.scrollHeight;
  const sug = document.getElementById('olivSuggest');
  if(sug){
    const onglet = oliviaOnglet();
    const idees = oliv.hist.length
      ? [['Réexplique-moi', 'Je n\'ai pas compris, tu peux réexpliquer autrement ?'], ['Un autre exemple', 'Donne-moi un autre exemple'], ['Teste-moi', 'Pose-moi une petite question pour vérifier que j\'ai compris']]
      : onglet === 'exercices' ? [['Aide pour démarrer', 'Aide-moi à démarrer un exercice'], ['Quelle méthode ?', 'Quelle méthode faut-il utiliser ?']] : [['L\'essentiel', 'Explique-moi l\'essentiel du cours'], ['Un exemple', 'Donne-moi un exemple'], ['À quoi ça sert ?', 'À quoi ça sert, ce chapitre ?']];
    sug.innerHTML = oliv.occupe ? '' : idees.map(([court, t]) => `<button type="button" class="oliv-chip" title="${oliviaEsc(t)}" onclick="oliviaEnvoyer(${JSON.stringify(t).replace(/"/g, '&quot;')})">${oliviaEsc(court)}</button>`).join('');
  }
  const b = document.getElementById('olivEnvoyer'); if(b) b.disabled = oliv.occupe;
}

// Texte d'un onglet, pour Oliv'IA : formules en LaTeX, sans boutons, figures ni corrections.
function oliviaTexte(el, max){
  if(!el) return '';
  const c = el.cloneNode(true);
  c.querySelectorAll('.katex').forEach(k => { const a = k.querySelector('annotation'); k.replaceWith(document.createTextNode(a ? ' $' + a.textContent + '$ ' : k.textContent)); });
  c.querySelectorAll('script,style,svg,canvas,button,input,select,textarea,.exo-correction,.exo-correction-toggle,.interaction-hint,.figure-toolbar').forEach(x => x.remove());
  c.querySelectorAll('br').forEach(x => x.replaceWith(document.createTextNode('\n')));
  c.querySelectorAll('.num,.letter').forEach(x => x.appendChild(document.createTextNode('. ')));
  c.querySelectorAll('div,p,li,h3,h4,tr,table,.def-box,.lesson-header,.sub-header').forEach(x => x.appendChild(document.createTextNode('\n')));
  return c.textContent.replace(/[ \t ]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{2,}/g, '\n').trim().slice(0, max);
}
function oliviaContexte(){
  const reg = typeof DEMO_REGISTRY !== 'undefined' ? DEMO_REGISTRY[(currentChapterLevel || '') + '|' + (currentChapterTitle || '')] : null;
  const el = id => id ? document.getElementById(id) : null;
  const onglet = oliviaOnglet();
  let t = 'COURS :\n' + oliviaTexte(el(reg && reg.cours) || document.getElementById('tab-cours'), onglet === 'cours' ? 14000 : 8000);
  if(onglet === 'methode') t += '\n\nMÉTHODES :\n' + oliviaTexte(el(reg && reg.methode), 6000);
  if(onglet === 'exercices') t += '\n\nEXERCICES (énoncés, sans les corrections) :\n' + oliviaTexte(el(reg && reg.exos), 6500);
  return t;
}

async function oliviaEnvoyer(texte, parVoix){
  if(oliv.occupe) return;
  const zone = document.getElementById('olivTexte');
  const q = String(texte != null ? texte : (zone ? zone.value : '')).trim();
  if(!q) return;
  if(zone && texte == null) zone.value = '';
  const entree = { q, r: null, focus: oliv.focus };
  oliv.focus = '';
  oliv.hist.push(entree); oliv.occupe = true; oliviaRendreFil();
  try{
    const { data: { session } } = await sb.auth.getSession();
    if(!session) throw new Error('Connecte-toi pour parler à Oliv\'IA.');
    const res = await fetch(SUPABASE_URL + '/functions/v1/ai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
      body: JSON.stringify({ feature: 'olivia', question: q, focus: entree.focus || undefined, onglet: oliviaOnglet(), contexte: oliviaContexte(),
        historique: oliv.hist.filter(e => e !== entree && e.r && !e.erreur).slice(-6).map(e => ({ q: e.q, r: e.r })),
        conversationId: oliv.conv, chapitre: (typeof chapTitreAffiche === 'function' ? chapTitreAffiche() : currentChapterTitle) || null, niveau: currentChapterLevel ? niveauLabel(currentChapterLevel) : null }),
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error);
    entree.r = data.text || '…';
  }catch(e){
    entree.r = (e && e.message) || 'Oups, je n\'ai pas pu répondre. Réessaie dans un instant.'; entree.erreur = true;
  }finally{
    oliv.occupe = false; oliviaRendreFil();
    if(parVoix) oliviaEcouteRepondre();
  }
}

// Sélection d'un passage du cours : petit bouton « Demander à Oliv'IA » à côté.
function oliviaBulleSel(rect, texte){
  let b = document.getElementById('olivSel');
  if(!rect){ if(b) b.style.display = 'none'; return; }
  if(!b){
    b = document.createElement('button'); b.id = 'olivSel'; b.type = 'button'; b.className = 'oliv-sel';
    b.innerHTML = `<span class="oliv-mini">${OLIV_AVATAR}</span> Demander à Oliv'IA`;
    b.onmousedown = e => e.preventDefault();
    b.onclick = () => { const t = b.dataset.texte || ''; oliviaBulleSel(null); oliviaOuvrir(true); oliv.focus = t; oliviaEnvoyer('Peux-tu m\'expliquer ce passage autrement ?'); window.getSelection().removeAllRanges(); };
    document.body.appendChild(b);
  }
  b.dataset.texte = texte;
  b.style.display = 'flex';
  b.style.left = Math.max(8, Math.min(window.innerWidth - 210, rect.left + rect.width / 2 - 100)) + 'px';
  b.style.top = (window.scrollY + rect.bottom + 8) + 'px';
}
document.addEventListener('mouseup', e => {
  if(e.target.closest && e.target.closest('#olivSel, #olivPanneau')) return;
  setTimeout(() => {
    if(!oliviaAutorisee() || !oliviaSurCours()){ oliviaBulleSel(null); return; }
    const s = window.getSelection(), t = s ? String(s).trim() : '';
    if(t.length < 8 || !s.rangeCount){ oliviaBulleSel(null); return; }
    const r = s.getRangeAt(0), v = document.getElementById('view-chapitre');
    if(!v || !v.contains(r.commonAncestorContainer)){ oliviaBulleSel(null); return; }
    oliviaBulleSel(r.getBoundingClientRect(), t.slice(0, 1200));
  }, 10);
});
document.addEventListener('click', e => { if(e.target.closest && e.target.closest('.tab-btn')) setTimeout(() => { oliviaMaj(); oliviaRendreFil(); }, 30); });

/* ---------- « Ok Olivia ! » : dialogue à la voix (demandé le 02/11/2026 : « En cours, j'aimerais pouvoir dire "Ok Olivia !"
   et que ça déclenche un dialogue ») ----------
   - Bouton oreille dans l'en-tête d'Oliv'IA : écoute activée À LA DEMANDE (retenue sur cet appareil), seulement sur une page
     de cours où Oliv'IA est ouverte au compte, onglet du navigateur visible. Le lanceur porte alors une petite oreille.
   - « Ok Olivia » (ou « Dis Olivia », « Hé Olivia »…) ouvre Oliv'IA ; la phrase qui suit est la question (dans la même phrase
     ou juste après). La réponse est lue avec la voix d'Oliv'IA, puis Oliv'IA écoute la suite quelques secondes sans qu'il
     faille redire « Ok Olivia » (« merci », « c'est bon »… : fin du dialogue).
   - Bouton micro à côté de « Envoyer » : une question dictée, sans mot d'éveil.
   - Pendant qu'Oliv'IA réfléchit ou parle, le micro est coupé (elle ne s'entend pas elle-même).
   - Reconnaissance vocale du navigateur (Chrome, Edge, Safari ; sur l'appareil quand le navigateur sait le faire). Seule la
     question qui suit « Ok Olivia » part vers Oliv'IA, comme une question écrite ; le reste n'est ni gardé ni envoyé. */
// Écoute permanente réservée aux professeurs (demandé le 02/11/2026 : « Juste pour les professeurs ») ; le bouton micro reste
// pour tous (une question dictée, le micro se coupe ensuite).
function oliviaProf(){ const a = typeof aiAccess !== 'undefined' ? aiAccess : null; return !!(a && (a.role === 'prof' || a.role === 'admin')); }
function oliviaSR(){ return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
const OLIV_EVEIL = /(?:^|[\s,.!?'-])(?:ok|okay|o\.?\s?k\.?|oké|okey|hey|h[ée]|eh|dis|salut|allô|allo|bonjour|coucou|au quai|aux quais)[\s,!.-]*(?:o\s?)?(?:oli|li)(?:v|b)(?:ia|i a|iya|ie|ier|iah|ya)\b[\s,!.?]*/i;
const OLIV_FIN = /^(?:non\s+)?(?:merci(?: beaucoup)?(?: olivia)?|c'est bon|ça va|au revoir|stop|arr[êe]te|c'est tout|non merci|rien)[\s.!]*$/i;
let olivEcoute = { pref: false, rec: null, actif: false, mode: 'veille', minuteur: 0, reste: '', erreurs: 0, dictee: false, relance: 0 };
try{ olivEcoute.pref = localStorage.getItem('olivEcoute') === '1'; }catch(e){}

// Doit-on écouter maintenant ?
function oliviaEcouteVoulue(){
  if(!oliviaSR() || !oliviaAutorisee() || !oliviaSurCours() || document.visibilityState !== 'visible') return false;
  if(oliv.occupe || olivEcoute.mode === 'parle') return false;
  return (olivEcoute.pref && oliviaProf()) || olivEcoute.dictee || olivEcoute.mode === 'question' || olivEcoute.mode === 'suite';
}
function oliviaEcouteMaj(){
  const veut = oliviaEcouteVoulue();
  if(veut && !olivEcoute.actif) oliviaEcouteDemarrer();
  else if(!veut && olivEcoute.actif) oliviaEcouteCouper();
  oliviaEcouteAfficher();
}
function oliviaEcouteDemarrer(){
  const SR = oliviaSR(); if(!SR || olivEcoute.actif) return;
  // Le navigateur exige un premier clic sur la page avant de faire parler Oliv'IA : on attend ce clic.
  if(navigator.userActivation && !navigator.userActivation.hasBeenActive){
    if(!olivEcoute.attente){ olivEcoute.attente = true; const go = () => { olivEcoute.attente = false; oliviaEcouteMaj(); };
      document.addEventListener('pointerdown', go, { once: true }); document.addEventListener('keydown', go, { once: true }); }
    return;
  }
  const rec = new SR(); rec.lang = 'fr-FR'; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
  try{ if('processLocally' in rec && olivEcoute.local) rec.processLocally = true; }catch(e){}
  rec.onresult = ev => oliviaEcouteResultat(rec, ev);
  rec.onerror = ev => {
    if(ev.error === 'not-allowed' || ev.error === 'service-not-allowed'){
      olivEcoute.pref = false; olivEcoute.dictee = false; olivEcoute.mode = 'veille'; try{ localStorage.removeItem('olivEcoute'); }catch(e){}
      oliviaEcouteMessage('Le micro est bloqué pour ce site : autorise-le dans le navigateur (icône du cadenas) pour me parler.');
    } else if(ev.error !== 'no-speech' && ev.error !== 'aborted'){
      olivEcoute.erreurs++; olivEcoute.derniereErreur = ev.error;
      if(olivEcoute.local){ olivEcoute.local = false; olivEcoute.localTeste = true; } // reconnaissance sur l'appareil en panne : celle du navigateur
    }
  };
  rec.onend = () => {
    if(olivEcoute.rec !== rec) return;
    olivEcoute.rec = null; olivEcoute.actif = false;
    // Le navigateur coupe l'écoute de temps en temps : on la relance (pas indéfiniment en cas de panne).
    if(olivEcoute.erreurs > 4){ olivEcoute.pref = false; olivEcoute.dictee = false; olivEcoute.erreurs = 0; oliviaEcouteMessage('La reconnaissance vocale ne répond pas : réessaie plus tard.'); oliviaEcouteAfficher(); return; }
    clearTimeout(olivEcoute.relance); olivEcoute.relance = setTimeout(oliviaEcouteMaj, olivEcoute.erreurs ? 1500 * olivEcoute.erreurs : 250);
  };
  olivEcoute.rec = rec; olivEcoute.actif = true;
  try{ rec.start(); }catch(e){ olivEcoute.rec = null; olivEcoute.actif = false; olivEcoute.erreurs++; clearTimeout(olivEcoute.relance); olivEcoute.relance = setTimeout(oliviaEcouteMaj, 600); }
}
function oliviaEcouteCouper(){
  const rec = olivEcoute.rec; olivEcoute.rec = null; olivEcoute.actif = false;
  if(rec){ rec.onend = rec.onresult = rec.onerror = null; try{ rec.abort(); }catch(e){} }
}
function oliviaEcouteResultat(rec, ev){
  if(olivEcoute.rec !== rec) return;
  olivEcoute.erreurs = 0;
  for(let i = ev.resultIndex; i < ev.results.length; i++){
    const r = ev.results[i], t = (r[0] && r[0].transcript || '').trim(); if(!t) continue;
    if(olivEcoute.mode === 'veille'){
      const m = OLIV_EVEIL.exec(' ' + t);
      if(!m){ oliviaEcouteEntendu(t); continue; }
      const apres = (' ' + t).slice(m.index + m[0].length).trim();
      if(!r.isFinal){ oliviaEcouteEveil(apres, false, i); continue; }
      if(oliviaEcouteEveil(apres, true, i)) return;
    } else if(olivEcoute.mode === 'question' || olivEcoute.mode === 'suite'){
      if(olivEcoute.mode === 'question' && olivEcoute.eveilIdx === i){ // suite de la phrase « Ok Olivia… »
        const m = OLIV_EVEIL.exec(' ' + t); const apres = m ? (' ' + t).slice(m.index + m[0].length).trim() : t;
        if(!r.isFinal){ oliviaEcouteTexte(apres); continue; }
        olivEcoute.eveilIdx = -1; if(apres.length >= 3){ oliviaEcouteQuestion(apres); return; } continue;
      }
      if(!r.isFinal){ oliviaEcouteTexte(t); clearTimeout(olivEcoute.minuteur); continue; }
      oliviaEcouteQuestion(t); return;
    }
  }
}
// « Ok Olivia » entendu : Oliv'IA s'ouvre et écoute la question.
function oliviaEcouteEveil(apres, final, idx){
  if(typeof voixArreter === 'function') voixArreter();
  olivEcoute.mode = 'question'; olivEcoute.eveilIdx = final ? -1 : idx; olivEcoute.message = '';
  if(!oliv.ouvert) oliviaOuvrir(true);
  oliviaEcouteSon();
  if(final && apres.length >= 3){ oliviaEcouteQuestion(apres); return true; }
  oliviaEcouteTexte(apres);
  oliviaEcouteAttendre(9000);
  return false;
}
function oliviaEcouteAttendre(ms){
  clearTimeout(olivEcoute.minuteur);
  olivEcoute.minuteur = setTimeout(() => { // rien entendu : retour à la veille
    if(olivEcoute.mode !== 'question' && olivEcoute.mode !== 'suite') return;
    olivEcoute.mode = 'veille'; olivEcoute.dictee = false; oliviaEcouteTexte(''); oliviaEcouteMaj();
  }, ms);
}
function oliviaEcouteQuestion(q){
  clearTimeout(olivEcoute.minuteur); oliviaEcouteTexte('');
  q = q.replace(/\s+/g, ' ').trim();
  if(OLIV_FIN.test(q) || q.length < 3){ olivEcoute.mode = 'veille'; olivEcoute.dictee = false; oliviaEcouteMaj(); return; }
  q = q.charAt(0).toUpperCase() + q.slice(1);
  olivEcoute.dictee = false;
  if(oliv.occupe){ olivEcoute.mode = 'veille'; oliviaEcouteMaj(); return; } // une question écrite est déjà en cours
  olivEcoute.mode = 'parle'; oliviaEcouteMaj(); // micro coupé pendant qu'Oliv'IA réfléchit et parle
  if(!oliv.ouvert) oliviaOuvrir(true);
  oliviaEnvoyer(q, true);
}
// Réponse arrivée : Oliv'IA la dit, puis écoute la suite du dialogue.
function oliviaEcouteRepondre(){
  const fil = document.getElementById('olivFil'), btns = fil ? fil.querySelectorAll('.oliv-msg.oliv .oliv-ecouter') : [];
  const btn = btns[btns.length - 1];
  const suite = () => {
    if(olivEcoute.mode !== 'parle') return;
    olivEcoute.mode = 'suite'; oliviaEcouteMaj(); oliviaEcouteAttendre(10000);
  };
  if(!btn || typeof voixParler !== 'function'){ suite(); return; }
  olivEcoute.mode = 'parle'; oliviaEcouteMaj();
  oliviaEcouter(btn, suite);
  // Lecture interrompue autrement (autre bulle écoutée, arrêt…) : le dialogue reprend quand même.
  const garde = setInterval(() => { if(olivEcoute.mode !== 'parle'){ clearInterval(garde); return; } if(!document.querySelector('.oliv-ecouter.lecture')){ clearInterval(garde); suite(); } }, 1500);
}
function oliviaEcouteBasculer(){
  olivEcoute.pref = !olivEcoute.pref;
  try{ if(olivEcoute.pref) localStorage.setItem('olivEcoute', '1'); else localStorage.removeItem('olivEcoute'); }catch(e){}
  if(typeof voixAudioPret === 'function') voixAudioPret(); // clic : la voix pourra ensuite parler sans nouveau clic (iPhone, iPad)
  olivEcoute.mode = 'veille'; olivEcoute.erreurs = 0; clearTimeout(olivEcoute.minuteur);
  if(!olivEcoute.pref){ oliviaEcouteCouper(); oliviaEcouteMessage(''); }
  else { oliviaEcouteLocal(); oliviaEcouteMessage('Dis « Ok Olivia ! » puis ta question. Le micro reste ouvert tant que l\'oreille est allumée ; seule la question qui suit « Ok Olivia » m\'est envoyée.'); }
  oliviaEcouteMaj();
}
// Dictée d'une seule question (bouton micro), sans mot d'éveil.
function oliviaDicter(){
  if(typeof voixAudioPret === 'function') voixAudioPret();
  if(olivEcoute.mode === 'question' && olivEcoute.dictee){ olivEcoute.dictee = false; olivEcoute.mode = 'veille'; clearTimeout(olivEcoute.minuteur); oliviaEcouteTexte(''); oliviaEcouteCouper(); oliviaEcouteMaj(); return; }
  if(typeof voixArreter === 'function') voixArreter();
  oliviaEcouteCouper(); olivEcoute.dictee = true; olivEcoute.mode = 'question'; olivEcoute.eveilIdx = -1; olivEcoute.erreurs = 0;
  oliviaEcouteTexte(''); oliviaEcouteMaj(); oliviaEcouteAttendre(9000);
}
// Reconnaissance sur l'appareil quand le navigateur la propose (rien n'est envoyé à un serveur de reconnaissance).
function oliviaEcouteLocal(){
  const SR = oliviaSR(); if(!SR || typeof SR.available !== 'function' || olivEcoute.localTeste) return; olivEcoute.localTeste = true;
  try{
    Promise.resolve(SR.available({ langs: ['fr-FR'], processLocally: true })).then(d => {
      if(d === 'available'){ olivEcoute.local = true; oliviaEcouteCouper(); oliviaEcouteMaj(); }
      else if((d === 'downloadable' || d === 'downloading') && typeof SR.install === 'function')
        Promise.resolve(SR.install({ langs: ['fr-FR'], processLocally: true })).then(ok => { if(ok){ olivEcoute.local = true; oliviaEcouteCouper(); oliviaEcouteMaj(); } }).catch(() => {});
    }).catch(() => {});
  }catch(e){}
}
function oliviaEcouteSon(){ // petit « ding » : Oliv'IA a entendu son nom
  try{ const C = window.AudioContext || window.webkitAudioContext; if(!C) return; const ac = oliviaEcouteSon.ac || (oliviaEcouteSon.ac = new C());
    if(ac.state === 'suspended') ac.resume();
    [[880, 0], [1320, .11]].forEach(([f, t]) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = f; o.type = 'sine';
      g.gain.setValueAtTime(0, ac.currentTime + t); g.gain.linearRampToValueAtTime(.18, ac.currentTime + t + .02); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t + .22);
      o.connect(g).connect(ac.destination); o.start(ac.currentTime + t); o.stop(ac.currentTime + t + .25); });
  }catch(e){}
}
function oliviaEcouteTexte(t){ olivEcoute.texte = t; oliviaEcouteAfficher(); }
function oliviaEcouteMessage(t){ olivEcoute.message = t; oliviaEcouteAfficher(); clearTimeout(olivEcoute.messageMin); if(t) olivEcoute.messageMin = setTimeout(() => { olivEcoute.message = ''; oliviaEcouteAfficher(); }, 10000); }
function oliviaEcouteAfficher(){
  const btn = document.getElementById('olivEcouteBtn');
  if(btn){ btn.classList.toggle('on', olivEcoute.pref); btn.setAttribute('aria-pressed', olivEcoute.pref ? 'true' : 'false');
    btn.title = olivEcoute.pref ? 'Écoute « Ok Olivia ! » allumée : clique pour l\'éteindre' : 'Écoute « Ok Olivia ! » : clique pour me parler à voix haute'; }
  const mic = document.getElementById('olivMicro');
  const ecouteQ = olivEcoute.mode === 'question' || olivEcoute.mode === 'suite';
  if(mic){ mic.classList.toggle('on', ecouteQ && olivEcoute.actif); mic.title = ecouteQ ? 'Je t\'écoute… (clique pour arrêter)' : 'Poser ma question à voix haute'; }
  const lanceur = document.getElementById('olivLanceur');
  if(lanceur){ lanceur.classList.toggle('ecoute', olivEcoute.pref && olivEcoute.actif);
    const b = lanceur.querySelector('.oliv-lanceur-bulle'); if(b) b.textContent = olivEcoute.pref && olivEcoute.actif ? 'Dis « Ok Olivia ! »' : 'Une question ?'; }
  const z = document.getElementById('olivEcouteEtat'); if(!z) return;
  let h = '';
  if(ecouteQ && olivEcoute.actif) h = `<span class="oliv-ecoute-pastille"></span> ${olivEcoute.mode === 'suite' ? 'Je t\'écoute… (une autre question ? sinon dis « merci »)' : 'Je t\'écoute…'}${olivEcoute.texte ? ` <i>${oliviaEsc(olivEcoute.texte)}</i>` : ''}`;
  else if(olivEcoute.message) h = oliviaEsc(olivEcoute.message);
  else if(olivEcoute.pref && olivEcoute.actif) h = '<span class="gicon">hearing</span> Dis « Ok Olivia ! » puis ta question.' + (olivEcoute.entendu ? `<i>Entendu : « ${oliviaEsc(olivEcoute.entendu)} »</i>` : '');
  else if(olivEcoute.pref && oliviaProf() && oliviaSR()) h = '<span class="gicon">hearing</span> Écoute en attente : clique dans la page pour l\'allumer.';
  else if(!olivEcoute.pref && oliviaProf() && oliviaSR()) h = '<button type="button" class="oliv-chip" onclick="oliviaEcouteBasculer()"><span class="gicon">hearing</span> Allumer « Ok Olivia ! »</button> pour me parler à voix haute.';
  z.innerHTML = h; z.style.display = h ? 'block' : 'none';
}
document.addEventListener('visibilitychange', () => { if(typeof oliviaEcouteMaj === 'function') oliviaEcouteMaj(); });
// Dernière phrase entendue (sans le mot d'éveil), affichée quelques secondes : pour voir ce que le micro comprend.
function oliviaEcouteEntendu(t){
  olivEcoute.entendu = t.length > 80 ? '…' + t.slice(-77) : t; oliviaEcouteAfficher();
  clearTimeout(olivEcoute.entenduMin); olivEcoute.entenduMin = setTimeout(() => { olivEcoute.entendu = ''; oliviaEcouteAfficher(); }, 5000);
}
