/* =====================================================================
   adp.js -- L'Atelier du Prof (adp.latelieraugmente.fr) : le même site, les mêmes comptes et la
   même base, sans les contenus de maths.

   Demandé : « Mon but sur l'atelier des profs est de mettre les outils adaptés à toute matière
   confondues. Les quizz, les interros, les corrections, les sessions, les cahiers... ». Le mode est
   décidé dans <head> (index.html : window.ADP, classe .mode-adp sur <html>) d'après l'adresse
   (adp.*), ou ?adp=1 pour l'essayer ailleurs. Ici :
   - logo, nom, titre de l'onglet et pied de page de L'Atelier du Prof ;
   - pages propres aux maths (niveaux, chapitres, automatismes, Objectif Nombre, convertisseur,
     géométrie, progression, offre Famille, évaluation à partir des chapitres) : remplacées par
     l'accueil ;
   - un accueil à lui : présentation pour un visiteur, accès direct aux outils une fois connecté.
   Ce qui se masque simplement (menus, outils de maths de la correction et du cahier, types de
   devoirs, onglets des sessions) l'est en CSS (styles.css, « L'Atelier du Prof »).
   Sur maths.latelieraugmente.fr, ce fichier ne fait rien.
   ===================================================================== */
(function(){
  if(!window.ADP) return;

  const ADP_BLOQUEES = ['view-niveau', 'view-chapitre', 'view-cm', 'view-compte', 'view-convertisseur', 'view-tableau',
    'view-progression', 'view-famille', 'view-evaluation', 'view-demo'];
  const DECOUVRIR = 'https://adp.latelieraugmente.fr/decouvrir/';
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Identité : nom, logo, icône, pied de page.
  document.title = "L'Atelier du Prof · Les outils du professeur, quelle que soit sa matière";
  const ic = document.querySelector('link[rel="icon"]'); if(ic) ic.href = 'assets/adp/favicon-64.png';
  const marque = document.querySelector('.topbar .brand .brand-mark');
  if(marque){
    marque.src = 'assets/adp/logo-adp-mark-120.png'; marque.alt = "L'Atelier du Prof"; marque.style.height = '46px';
    marque.insertAdjacentHTML('afterend', '<span class="adp-nom">L\'Atelier <b>du Prof</b></span>');
  }
  const pied = document.querySelector('body > footer');
  if(pied) pied.innerHTML = `L'Atelier du Prof, une production de <a href="https://www.latelieraugmente.fr" target="_blank" rel="noopener">L'Atelier Augmenté</a>
    · <a href="${DECOUVRIR}">Découvrir L'Atelier du Prof</a> · <a href="#" data-nav="mentions-legales">Mentions légales</a> · <a href="#" data-nav="confidentialite">Confidentialité</a>
    · Professeur de maths ? <a href="https://maths.latelieraugmente.fr" target="_blank" rel="noopener">L'Atelier des Maths</a>`;

  // Accueil.
  const vh = document.getElementById('view-home');
  if(vh && !document.getElementById('adpAccueil')){
    const d = document.createElement('div'); d.id = 'adpAccueil';
    vh.insertBefore(d, vh.firstChild);
  }
  const tuile = (nav, icone, titre, texte) => `<button type="button" class="adp-tuile" onclick="adpAller('${nav}')"><span class="gicon">${icone}</span><b>${titre}</b><small>${texte}</small></button>`;
  window.adpAccueil = function(){
    const box = document.getElementById('adpAccueil'); if(!box) return;
    const role = typeof currentUserRole !== 'undefined' ? currentUserRole : null, connecte = typeof currentUser !== 'undefined' && !!currentUser;
    const prenom = connecte && typeof currentUserPrenom !== 'undefined' && currentUserPrenom ? currentUserPrenom : '';
    const hero = (titre, texte, actions) => `<div class="adp-hero"><div><span class="adp-devise">Inspirer · Transmettre · Réussir</span>
        <h1>${titre}</h1><p>${texte}</p><div class="adp-actions">${actions}</div></div>
        <img src="assets/adp/logo-adp-300.png" alt="L'Atelier du Prof"></div>`;
    if(!connecte){
      box.innerHTML = hero('Les outils du professeur, <em>quelle que soit sa matière</em>',
        'Quiz, interrogations en ligne, corrections, séances en direct, cahier de la classe : des outils conçus par un professeur et éprouvés chaque semaine en classe.',
        `<button class="btn" onclick="toggleAccountMenu()"><span class="gicon">login</span> Se connecter</button>
         <button class="btn secondary" onclick="location.href='${DECOUVRIR}'"><span class="gicon">info</span> Découvrir L'Atelier du Prof</button>`);
      return;
    }
    if(role === 'eleve'){
      box.innerHTML = hero(`Bonjour${prenom ? ' ' + esc(prenom) : ''} !`, 'Tes devoirs, le cahier de ta classe et tes résultats.', '')
        + `<div class="adp-tuiles">${tuile('mesdevoirs', 'assignment', 'Mon travail', 'Devoirs et interrogations à faire, sessions de ton professeur.')}
          ${tuile('cahier', 'menu_book', 'Cahier de la classe', 'Ce qui a été fait en classe, jour après jour.')}
          ${tuile('mesresultats', 'insights', 'Mes résultats', 'Tes notes et tes progrès.')}</div>`;
      return;
    }
    box.innerHTML = hero(`Bonjour${prenom ? ' ' + esc(prenom) : ''}, <em>que fait-on aujourd'hui ?</em>`,
        'Vos classes, vos interrogations, vos séances et vos corrections, quelle que soit votre matière.', '')
      + `<div class="adp-tuiles">
        ${tuile('questionnaires', 'quiz', 'Interrogations en ligne', 'Quiz, interrogations notées, entraînements, sondages : à créer, à donner, à corriger.')}
        ${tuile('sessions', 'cast_for_education', 'Sessions en direct', 'Faire la classe avec la télécommande : chaque élève sur son écran, vous voyez tout.')}
        ${tuile('correction', 'edit_note', 'Correction et cahier de la classe', 'Projeter, annoter, filmer un cahier au téléphone ; le cahier de la classe se remplit.')}
        ${tuile('devoirsprof', 'assignment_turned_in', 'Devoirs', 'Un fichier à rendre, une photo de copie ; suivi de qui a rendu quoi.')}
        ${tuile('supervision', 'groups', 'Mes classes', 'Élèves, comptes, groupes, résultats et bilans.')}
        ${tuile('classe', 'casino', 'Outils de classe', 'Tirage au sort des élèves, feu de consigne, jauge de bruit.')}
        ${tuile('simulateur', 'devices', 'Simulateur de classe', 'Votre écran et ceux d\'élèves fictifs, pour préparer une séance.')}
      </div>
      <p class="adp-maths">Vous enseignez les mathématiques ? <a href="https://maths.latelieraugmente.fr" target="_blank" rel="noopener">L'Atelier des Maths</a> : les mêmes outils, avec les cours du CM1 à la 3e (même compte).</p>`;
  };
  // Une tuile = le même bouton que dans le menu (mêmes vérifications d'accès).
  window.adpAller = function(nav){
    const b = document.querySelector(`#navLinks [data-nav="${nav}"]`);
    if(b) b.click(); else location.hash = '#/' + nav;
  };

  // Pages propres aux maths : l'accueil à la place ; l'accueil est redessiné à chaque passage.
  if(typeof showView === 'function'){
    const o = showView;
    showView = function(id){
      if(ADP_BLOQUEES.includes(id)) id = 'view-home';
      const r = o.call(this, id);
      if(id === 'view-home') adpAccueil();
      return r;
    };
  }
  // Connexion / déconnexion : l'accueil change.
  if(typeof refreshAuthUI === 'function'){
    const o = refreshAuthUI;
    refreshAuthUI = async function(){
      const r = await o.apply(this, arguments);
      const vhA = document.getElementById('view-home');
      if(vhA && vhA.classList.contains('active')) adpAccueil();
      return r;
    };
  }
  adpAccueil();
})();
