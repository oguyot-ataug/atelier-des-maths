/* =====================================================================
   mot-de-passe.js -- œil pour afficher / masquer ce qu'on tape

   Demandé : "Quand on met ou choisit des mots de passe, il faudrait rajouter l'oeil pour voir
   ce qu'on tape". Posé automatiquement sur TOUS les champs mot de passe (connexion,
   inscriptions, changement de mot de passe, clés IA...), y compris ceux ajoutés plus tard dans
   la page (Espace famille, Administration). Icônes en SVG : ne dépend d'aucune police, ce qui
   permet de l'utiliser aussi sur invitation.html.
   ===================================================================== */
(function(){
  const EYE = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/></svg>';
  const EYE_OFF = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 7a5 5 0 015 5c0 .65-.13 1.26-.36 1.83l2.92 2.92A11.8 11.8 0 0023 12c-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.74 2.74A11.8 11.8 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55A2.8 2.8 0 009 12a3 3 0 003 3c.22 0 .44-.03.65-.08l1.55 1.55A4.97 4.97 0 017 12c0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16a3 3 0 00-3-3l-.17.01z"/></svg>';

  const st = document.createElement('style');
  st.textContent = `
    .pw-wrap{position:relative;}
    .pw-wrap > input{padding-right:40px !important;}
    button.pw-eye{position:absolute !important;right:4px;top:50%;transform:translateY(-50%);width:32px !important;height:32px;
      padding:0 !important;margin:0 !important;border:0 !important;border-radius:6px !important;background:transparent !important;
      color:#5B6472 !important;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:none !important;filter:none !important;}
    button.pw-eye:hover{color:#0C5BA0 !important;background:rgba(12,91,160,.08) !important;}
    button.pw-eye:focus-visible{outline:2px solid #0C5BA0;outline-offset:1px;}
    input::-ms-reveal,input::-ms-clear{display:none;}
  `;
  (document.head || document.documentElement).appendChild(st);

  function addEye(input){
    if(input.dataset.eye) return;
    input.dataset.eye = '1';
    const wrap = document.createElement('span');
    wrap.className = 'pw-wrap';
    const s = input.style, cs = getComputedStyle(input);
    // Le conteneur prend la place du champ dans la mise en page : largeur en %, flex, marges.
    // Pleine largeur : largeur en % (style ou feuille de style : un élément encore masqué renvoie
    // la valeur en %), champ en bloc, colonne flex, ou champ aussi large que son parent.
    const par = input.parentElement;
    const full = /%/.test(s.width) || /%/.test(cs.width) || cs.display === 'block'
      || (par && getComputedStyle(par).flexDirection === 'column' && getComputedStyle(par).display.includes('flex'))
      || (par && input.offsetWidth > 0 && input.offsetWidth >= par.clientWidth - 2);
    wrap.style.display = full ? 'block' : 'inline-block';
    if(/%/.test(s.width)){ wrap.style.width = s.width; s.width = '100%'; }
    else if(full){ wrap.style.width = '100%'; s.width = '100%'; }
    if(s.flex){ wrap.style.flex = s.flex; s.flex = ''; wrap.style.display = 'block'; s.width = '100%'; }
    if(s.minWidth){ wrap.style.minWidth = s.minWidth; s.minWidth = ''; }
    // Marge du bas gardée sur le conteneur, pour que l'œil reste centré sur le champ.
    ['marginTop','marginBottom','marginLeft','marginRight'].forEach(k=>{
      const v = s[k] || (k === 'marginBottom' || k === 'marginTop' ? cs[k] : '');
      if(v && v !== '0px'){ wrap.style[k] = v; s[k] = '0'; }
    });
    s.boxSizing = 'border-box';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pw-eye';
    btn.title = 'Afficher le mot de passe'; btn.setAttribute('aria-label', 'Afficher le mot de passe');
    btn.innerHTML = EYE;
    btn.addEventListener('mousedown', e => e.preventDefault()); // garde le curseur dans le champ
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.innerHTML = show ? EYE_OFF : EYE;
      const lab = show ? 'Masquer le mot de passe' : 'Afficher le mot de passe';
      btn.title = lab; btn.setAttribute('aria-label', lab);
    });
    wrap.appendChild(btn);
  }
  function scan(){ document.querySelectorAll('input[type=password]:not([data-eye])').forEach(addEye); }
  let pending = false;
  function schedule(){ if(pending) return; pending = true; requestAnimationFrame(() => { pending = false; scan(); }); }
  function start(){ scan(); new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true }); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
