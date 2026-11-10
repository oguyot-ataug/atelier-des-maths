/* =====================================================================
   tarifs.js -- la page des tarifs DANS le site (#/tarifs). Demandé le 10/11/2026 : « La page des tarifs peut-elle
   être intégrée au site principal ? ». Une seule source : la page publique /tarifs/ (indexée par Google). Son
   contenu (<main class="t-wrap">, ses règles .t-*, le calculateur de la licence établissement) est lu à la première
   ouverture et placé dans #tarifsContenu, sous l'en-tête et le menu du site ; son propre en-tête n'est pas repris.
   Les liens de la page sont adaptés : ancres (#professeurs…) = défilement dans la vue ; « Essayer 15 jours » /
   « Ouvrir le site » (href "/") = inscription pour un visiteur, « Mon abonnement » pour un professeur connecté.
   ===================================================================== */
let tarifsCharge = null; // promesse du chargement (une seule fois par session)

function tarifsOuvrir(ancre){
  // Compte connecté : pas de page Tarifs (demandé le 10/11/2026) ; « Mon abonnement » ou l'Espace famille en tiennent lieu.
  if(typeof currentUser !== 'undefined' && currentUser){ showView('view-home'); setActiveTopnav(null); return; }
  const d = document.getElementById('accountDropdown'); if(d) d.style.display = 'none';
  showView('view-tarifs'); setActiveTopnav(null); document.getElementById('navTarifs')?.classList.add('active');
  const box = document.getElementById('tarifsContenu'); if(!box) return;
  if(!tarifsCharge) tarifsCharge = tarifsCharger(box).catch(err => {
    tarifsCharge = null;
    box.innerHTML = `<p class="hint">La page des tarifs n'a pas pu être chargée. <a href="/tarifs/">Ouvrir la page des tarifs</a></p>`;
    throw err;
  });
  tarifsCharge.then(() => { if(ancre) tarifsAller(ancre); }).catch(() => {});
}

async function tarifsCharger(box){
  box.innerHTML = '<p class="hint">Chargement des tarifs…</p>';
  const v = typeof APP_VERSION === 'string' ? APP_VERSION : String(Date.now());
  const r = await fetch('/tarifs/?v=' + encodeURIComponent(v), { cache: 'no-cache' });
  if(!r.ok) throw new Error('HTTP ' + r.status);
  const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
  const main = doc.querySelector('main.t-wrap'); if(!main) throw new Error('contenu absent');
  // Styles de la page : règles .t-* reprises telles quelles ; « body » et « .gicon » laissés au site ; « table » limité à la vue.
  let css = Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join('\n');
  css = css.replace(/(^|[{}])\s*body\s*\{[^}]*\}/g, '$1').replace(/(^|[{}])\s*\.gicon\s*\{[^}]*\}/g, '$1')
           .replace(/(^|[{},])(\s*)table(?=[\s{.:,])/g, '$1$2#view-tarifs table');
  let st = document.getElementById('tarifsCss');
  if(!st){ st = document.createElement('style'); st.id = 'tarifsCss'; document.head.appendChild(st); }
  st.textContent = css;
  box.innerHTML = '';
  box.appendChild(document.importNode(main, true));
  // Calculateur de la licence établissement (scripts de la page, sans source externe).
  Array.from(doc.querySelectorAll('script')).forEach(s => {
    if(s.src || !s.textContent.trim()) return;
    const n = document.createElement('script'); n.textContent = s.textContent; box.appendChild(n);
  });
  box.addEventListener('click', tarifsClic);
}

function tarifsAller(id){
  const cible = document.querySelector('#tarifsContenu [id="' + String(id).replace(/"/g, '') + '"]');
  if(cible) cible.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function tarifsClic(e){
  const a = e.target.closest('a[href]'); if(!a) return;
  const href = a.getAttribute('href');
  if(href.startsWith('#')){ e.preventDefault(); tarifsAller(href.slice(1)); return; }
  if(href === '/' || href === '/#/'){
    e.preventDefault();
    if(!currentUser){ // visiteur : la fenêtre de connexion et d'inscription, en haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const d = document.getElementById('accountDropdown');
      if(typeof toggleAccountMenu === 'function' && (!d || d.style.display === 'none' || !d.style.display)) toggleAccountMenu();
    } else if(currentUserRole === 'prof') location.hash = '#/abonnement';
    else location.hash = '#/';
    return;
  }
  if(href.startsWith('/#/')){ e.preventDefault(); location.hash = href.slice(1); }
}
