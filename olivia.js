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

const OLIV_AVATAR = `<svg viewBox="0 0 64 64" aria-hidden="true">
  <line x1="32" y1="15" x2="32" y2="7" stroke="#2C5A2E" stroke-width="2.2" stroke-linecap="round"/>
  <g class="oliv-feuille"><path d="M33 7 C 38 1.5, 45 3, 47 6.5 C 41.5 9.5, 37 9.5, 33 7 Z" fill="#6A994E"/>
  <ellipse cx="30" cy="6.5" rx="3.3" ry="4.2" fill="#4F6B2A"/></g>
  <rect x="5" y="27" width="6" height="12" rx="3" fill="#1F7A4D"/>
  <rect x="53" y="27" width="6" height="12" rx="3" fill="#1F7A4D"/>
  <rect x="10" y="15" width="44" height="36" rx="16" fill="#E8F3EC" stroke="#1F7A4D" stroke-width="2.5"/>
  <rect x="16" y="22" width="32" height="18" rx="9" fill="#1C2B39"/>
  <ellipse class="oliv-oeil" cx="25" cy="30" rx="3.2" ry="4" fill="#7CF0C0"/>
  <ellipse class="oliv-oeil" cx="39" cy="30" rx="3.2" ry="4" fill="#7CF0C0"/>
  <path d="M27.5 35.5 Q32 39 36.5 35.5" stroke="#7CF0C0" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="16" cy="43" r="3" fill="#F4A7B9" opacity=".85"/>
  <circle cx="48" cy="43" r="3" fill="#F4A7B9" opacity=".85"/>
  <path d="M23 51 h18 v5 a4 4 0 0 1 -4 4 h-10 a4 4 0 0 1 -4 -4 z" fill="#1F7A4D"/>
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
  if(!visible){ if(lanceur) lanceur.style.display = 'none'; const p = document.getElementById('olivPanneau'); if(p) p.style.display = 'none'; oliviaBulleSel(null); return; }
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
        <button type="button" class="oliv-x" onclick="oliviaNouvelle()" title="Nouvelle conversation"><span class="gicon">restart_alt</span></button>
        <button type="button" class="oliv-x" onclick="oliviaOuvrir(false)" title="Fermer" aria-label="Fermer"><span class="gicon">close</span></button>
      </div>
      <div class="oliv-fil" id="olivFil" aria-live="polite"></div>
      <div class="oliv-suggest" id="olivSuggest"></div>
      <form class="oliv-saisie" onsubmit="event.preventDefault(); oliviaEnvoyer();">
        <textarea id="olivTexte" rows="2" maxlength="1200" placeholder="Pose ta question sur le cours…" onkeydown="if(event.key==='Enter' && !event.shiftKey){ event.preventDefault(); oliviaEnvoyer(); }"></textarea>
        <button type="submit" class="btn" id="olivEnvoyer" title="Envoyer"><span class="gicon">send</span></button>
      </form>
      <p class="oliv-pied">Oliv'IA peut se tromper : vérifie avec ton cours. Ton professeur peut relire tes échanges.</p>`;
    document.body.appendChild(p);
    oliviaRendreFil();
  }
  oliviaMaj();
  if(on) setTimeout(() => { const t = document.getElementById('olivTexte'); if(t) t.focus(); }, 60);
}
function oliviaNouvelle(){ oliv.conv = oliviaUuid(); oliv.hist = []; oliv.focus = ''; oliviaRendreFil(); }

function oliviaBonjour(){
  const chap = typeof currentChapterTitle !== 'undefined' && currentChapterTitle ? `« ${currentChapterTitle} »` : 'ce chapitre';
  return `Bonjour ! Je suis **Oliv'IA**. Je peux t'expliquer autrement une partie du cours ${chap}, te donner un autre exemple, ou t'aider à démarrer un exercice (sans te donner la réponse !).\nTu peux aussi sélectionner un passage du cours avec ta souris.`;
}
function oliviaBulleHtml(qui, html){
  return qui === 'oliv'
    ? `<div class="oliv-msg oliv"><span class="oliv-mini">${OLIV_AVATAR}</span><div class="oliv-txt">${html}</div></div>`
    : `<div class="oliv-msg eleve"><div class="oliv-txt">${html}</div></div>`;
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
  h = h.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
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

async function oliviaEnvoyer(texte){
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
        conversationId: oliv.conv, chapitre: currentChapterTitle || null, niveau: currentChapterLevel || null }),
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error);
    entree.r = data.text || '…';
  }catch(e){
    entree.r = (e && e.message) || 'Oups, je n\'ai pas pu répondre. Réessaie dans un instant.'; entree.erreur = true;
  }finally{
    oliv.occupe = false; oliviaRendreFil();
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
