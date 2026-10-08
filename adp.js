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
    'view-progression', 'view-famille', 'view-evaluation', 'view-demo', 'view-mesresultats']; // « Mes résultats » : automatismes seulement
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

  /* ---------- Matière du professeur (étape 2) ----------
     Enregistrée dans son compte de connexion (métadonnées, modifiables par lui-même : aucune table à
     changer). Elle règle les consignes données à l'IA (« Tu es professeur de … ») et la liste des
     compétences des interrogations. Mathématiques : tout reste comme sur L'Atelier des Maths. */
  const ADP_MATIERES = [
    { m: 'Français', de: 'de français', c: 'fr' }, { m: 'Mathématiques', de: 'de mathématiques', c: 'maths' },
    { m: 'Histoire-géographie et EMC', de: "d'histoire-géographie et d'EMC", c: 'hg' },
    { m: 'Anglais', de: "d'anglais", c: 'lv' }, { m: 'Allemand', de: "d'allemand", c: 'lv' }, { m: 'Espagnol', de: "d'espagnol", c: 'lv' },
    { m: 'Italien', de: "d'italien", c: 'lv' }, { m: 'Autre langue vivante', de: 'de langue vivante', c: 'lv' },
    { m: 'Latin et grec', de: 'de langues et cultures de l\'Antiquité', c: 'fr' },
    { m: 'SVT', de: 'de SVT (sciences de la vie et de la Terre)', c: 'sci' }, { m: 'Physique-chimie', de: 'de physique-chimie', c: 'sci' },
    { m: 'Technologie', de: 'de technologie', c: 'sci' }, { m: 'SNT / NSI', de: "d'informatique (SNT, NSI)", c: 'sci' },
    { m: 'SES', de: 'de sciences économiques et sociales', c: 'gen' }, { m: 'Philosophie', de: 'de philosophie', c: 'gen' },
    { m: 'Éducation musicale', de: "d'éducation musicale", c: 'gen' }, { m: 'Arts plastiques', de: "d'arts plastiques", c: 'gen' },
    { m: 'EPS', de: "d'EPS", c: 'gen' }, { m: 'Documentation', de: 'documentaliste', c: 'gen', seul: true },
    { m: 'Professeur des écoles', de: 'des écoles', c: 'gen', pe: true }, { m: 'Autre', de: '', c: 'gen' },
  ];
  const ADP_COMPETENCES = {
    fr: [['fr_oral', "Comprendre et s'exprimer à l'oral"], ['fr_lire', 'Lire'], ['fr_ecrire', 'Écrire'], ['fr_langue', 'Comprendre le fonctionnement de la langue'], ['fr_culture', 'Culture littéraire et artistique']],
    hg: [['hg_temps', 'Se repérer dans le temps'], ['hg_espace', "Se repérer dans l'espace"], ['hg_raisonner', 'Raisonner, justifier une démarche'], ['hg_document', 'Analyser et comprendre un document'], ['hg_langages', 'Pratiquer différents langages'], ['hg_numerique', "S'informer dans le monde du numérique"]],
    lv: [['lv_ecouter', 'Écouter et comprendre'], ['lv_lire', 'Lire et comprendre'], ['lv_parler', 'Parler en continu'], ['lv_ecrire', 'Écrire'], ['lv_dialoguer', 'Réagir et dialoguer'], ['lv_culture', 'Découvrir la culture']],
    sci: [['sc_demarche', 'Pratiquer des démarches scientifiques'], ['sc_concevoir', 'Concevoir, créer, réaliser'], ['sc_methodes', "S'approprier des outils et des méthodes"], ['sc_langages', 'Pratiquer des langages'], ['sc_numerique', 'Mobiliser des outils numériques'], ['sc_citoyen', 'Adopter un comportement éthique et responsable']],
    gen: [['g_connaitre', 'Connaître'], ['g_comprendre', 'Comprendre'], ['g_appliquer', 'Appliquer'], ['g_analyser', 'Analyser'], ['g_raisonner', 'Raisonner'], ['g_communiquer', 'Communiquer']],
  };
  const ADP_COULEURS = ['#0C5BA0', '#6B3FA0', '#26AAB1', '#B8511F', '#1F7A4D', '#9E1F5E'];
  const COMP_MATHS = typeof QZ_COMPETENCES !== 'undefined' ? QZ_COMPETENCES.slice() : [];
  window.adpMatiere = () => (typeof currentUser !== 'undefined' && currentUser && currentUser.user_metadata && currentUser.user_metadata.matiere) || '';
  // Sans matière indiquée : réglages communs à toutes les matières (« Autre »).
  const fiche = () => ADP_MATIERES.find(x => x.m === adpMatiere()) || ADP_MATIERES[ADP_MATIERES.length - 1];
  const estMaths = () => fiche().c === 'maths';
  // Compétences : la liste de la matière (le tableau est modifié sur place : toutes les pages s'en servent).
  window.adpCompetences = adpCompetences;
  function adpCompetences(){
    if(typeof QZ_COMPETENCES === 'undefined') return;
    const f = fiche(), l = f.c === 'maths' ? COMP_MATHS : ADP_COMPETENCES[f.c].map(([id, label], i) => ({ id, label, color: ADP_COULEURS[i % ADP_COULEURS.length] }));
    QZ_COMPETENCES.splice(0, QZ_COMPETENCES.length, ...l);
  }
  // Une compétence d'une autre liste (copie ancienne, collègue d'une autre matière) reste lisible.
  if(typeof qzComp === 'function'){
    const toutes = COMP_MATHS.concat(...Object.values(ADP_COMPETENCES).map(l => l.map(([id, label], i) => ({ id, label, color: ADP_COULEURS[i % ADP_COULEURS.length] }))));
    qzComp = id => QZ_COMPETENCES.find(c => c.id === id) || toutes.find(c => c.id === id) || null;
  }
  // Consignes de l'IA : « professeur de [matière] » ; à l'école, le contexte d'âge sans les règles propres aux maths.
  if(typeof iaEnseignant === 'function'){
    const o = iaEnseignant;
    iaEnseignant = function(n){
      const f = fiche(); if(estMaths()) return o.apply(this, arguments);
      const ecole = typeof niveauPrimaire === 'function' && niveauPrimaire((typeof niveauCle === 'function' && niveauCle(n)) || n);
      if(f.pe || ecole) return o.apply(this, arguments).replace(/^professeur des écoles/, (f.pe || f.m === 'Autre') ? 'professeur des écoles' : 'professeur des écoles (enseignement : ' + f.m + ')');
      if(f.seul) return 'professeur ' + f.de + ' dans un collège ou un lycée français';
      return f.de ? 'professeur ' + f.de + ' dans un collège ou un lycée français' : 'professeur dans un collège ou un lycée français';
    };
  }
  if(typeof iaContexteNiveau === 'function'){
    const o = iaContexteNiveau;
    iaContexteNiveau = function(n){
      if(estMaths()) return o.apply(this, arguments);
      const k = (typeof niveauCle === 'function' && niveauCle(n)) || String(n || '').toLowerCase();
      const ages = { ce2: 'Élèves de CE2 (8-9 ans).', cm1: 'Élèves de CM1 (9-10 ans).', cm2: 'Élèves de CM2 (10-11 ans).' };
      return ages[k] ? ages[k] + ' Phrases courtes et vocabulaire simple, adaptés à des enfants.' : '';
    };
  }
  window.adpChoisirMatiere = async function(){
    const actuelle = adpMatiere();
    let o = document.getElementById('adpMatiereDlg');
    if(!o){ o = document.createElement('div'); o.id = 'adpMatiereDlg'; o.className = 'modal-overlay'; document.body.appendChild(o); }
    o.innerHTML = `<div class="modal-card" style="max-width:460px;"><b style="font:700 1.1rem Montserrat,'Space Grotesk',sans-serif;color:#173F70;">Quelle matière enseignez-vous ?</b>
      <p class="hint" style="margin:6px 0 12px;">Elle règle l'aide de l'IA (« Tu es professeur de … ») et les compétences proposées dans vos interrogations. Vous pourrez la changer à tout moment.</p>
      <select id="adpMatiereSel" style="width:100%;padding:9px;">${ADP_MATIERES.map(x => `<option${x.m === actuelle ? ' selected' : ''}>${esc(x.m)}</option>`).join('')}</select>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;"><button class="btn secondary" id="adpMatiereNon">Plus tard</button><button class="btn" id="adpMatiereOk">Enregistrer</button></div>
      <p class="hint" id="adpMatiereMsg" style="margin:8px 0 0;"></p></div>`;
    o.style.display = 'flex';
    o.querySelector('#adpMatiereNon').onclick = () => { o.style.display = 'none'; };
    o.querySelector('#adpMatiereOk').onclick = async () => {
      const m = o.querySelector('#adpMatiereSel').value, msg = o.querySelector('#adpMatiereMsg');
      msg.textContent = 'Enregistrement…';
      const { data, error } = await sb.auth.updateUser({ data: { matiere: m } });
      if(error){ msg.textContent = 'Non enregistré : ' + error.message; return; }
      if(data && data.user) currentUser = data.user;
      adpCompetences(); o.style.display = 'none'; adpAccueil();
    };
  };

  /* ---------- Correction et cahier sans chapitre de maths (étape 3) ----------
     Le chapitre devient un thème libre (« La Révolution française », « Unit 3 »…), rangé au même endroit
     (champ chapitre) : le cahier de la classe le regroupe de la même façon. Le niveau suit la classe
     active (liste masquée). */
  const corCh = document.getElementById('corChapitre');
  if(corCh && corCh.tagName === 'SELECT'){
    const inp = document.createElement('input');
    inp.type = 'text'; inp.id = 'corChapitre'; inp.style.cssText = 'flex:1;min-width:220px;';
    inp.placeholder = 'Thème ou séquence (ex. La Révolution française)';
    inp.setAttribute('list', 'adpThemes'); inp.oninput = () => { if(typeof renderCorrectionPreview === 'function') renderCorrectionPreview(); };
    corCh.replaceWith(inp);
    inp.insertAdjacentHTML('afterend', '<datalist id="adpThemes"></datalist>');
  }
  // Thèmes déjà utilisés dans le cahier : proposés à la saisie.
  window.adpThemesMaj = function(){
    const dl = document.getElementById('adpThemes'); if(!dl || typeof cahier === 'undefined' || !Array.isArray(cahier)) return;
    dl.innerHTML = [...new Set(cahier.map(e => e.chapitre).filter(Boolean))].sort().map(t => `<option value="${esc(t)}">`).join('');
  };
  if(typeof showView === 'function'){
    const o = showView;
    showView = function(id){ const r = o.apply(this, arguments); if(id === 'view-correction') adpThemesMaj(); return r; };
  }
  const corT = document.getElementById('corTitre'); if(corT) corT.placeholder = "Titre (ex. Analyse du document 2, Exercice 3 p. 45)";
  const corIntro = document.querySelector('#view-correction > p');
  if(corIntro) corIntro.innerHTML = "Rédigez la correction pendant le cours et projetez-la ; ajoutez une image, un tableau ou le cahier d'un élève filmé au téléphone. Chaque correction rejoint le cahier de la classe, que les élèves retrouvent jour après jour. Pour une formule, entourez-la de <span class=\"hint-mono\">$...$</span> (LaTeX).";

  // Mise en forme du texte : hors maths, ni fractions automatiques (14/07/1789 restait une fraction), ni
  // lettres isolées en italique (« Partie A ») : gras, souligné, couleurs et formules $...$ seulement.
  if(typeof renderMathText === 'function'){
    const o = renderMathText;
    renderMathText = function(raw){
      if(estMaths()) return o.apply(this, arguments);
      const blocs = [], garde = h => { blocs.push(h); return '\u0000' + (blocs.length - 1) + '\u0000'; };
      const COUL = { rouge: '#D93025', bleu: '#1F3A5C', vert: '#2C5A2E', orange: '#E35D3A' };
      let t = String(raw == null ? '' : raw).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      t = t.replace(/\[\[\s*([\s\S]+?)\s*\]\]/g, '\u0001$1\u0002');
      t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/__([^_]+)__/g, '<u>$1</u>')
           .replace(/\{\{(rouge|bleu|vert|orange)\|([^}]+)\}\}/g, (m, c, x) => `<span style="color:${COUL[c]}">${x}</span>`);
      t = t.replace(/\$([^$]+)\$/g, (m, e) => { const b = e.replace(/&lt;/g, '<').replace(/&gt;/g, '>'), h = typeof katexSpan === 'function' ? katexSpan(b) : b; return garde(h === b ? e : h); });
      t = t.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ {2,}/g, m => '&nbsp;'.repeat(m.length));
      return t.replace(/\u0000(\d+)\u0000/g, (m, i) => blocs[+i]).replace(/\u0001/g, '<div class="def-box lecon-box">').replace(/\u0002(<br>)?/g, '</div>');
    };
  }

  /* ---------- Étape 4 : phase de test (aucune vente) ----------
     Demandé : « pour l'instant les tests se feront en interne dans mon établissement et je ne peux rien faire
     payer tant que mon changement sur l'INPI n'est pas officiel ». Les comptes et les classes des collègues sont
     créés par l'administrateur (classes de la 6e à la terminale) ; « Mon abonnement » et les CGV le disent. */
  const MSG_TEST = `<div class="adp-test"><span class="gicon">science</span><div><b>L'Atelier du Prof est en phase de test.</b>
      <p>Il est ouvert pour l'instant aux professeurs invités par leur établissement : votre compte et vos classes sont créés par l'administrateur du site. Aucune offre n'est encore en vente.</p>
      <p>Une question, une idée, un problème ? <a href="mailto:contact@latelieraugmente.fr">contact@latelieraugmente.fr</a></p></div></div>`;
  if(typeof renderAbonnement === 'function'){
    const o = renderAbonnement;
    renderAbonnement = async function(){
      const r = await o.apply(this, arguments);
      const root = document.getElementById('abonnementRoot');
      // Une offre maths déjà payée reste visible (elle inclut L'Atelier du Prof) ; sinon, le message de la phase de test.
      if(root && !(typeof opPayee === 'function' && typeof opOffre !== 'undefined' && opPayee(opOffre))) root.innerHTML = '<h1 style="margin:6px 0 12px;">Mon abonnement</h1>' + MSG_TEST;
      return r;
    };
  }
  const cgv = document.querySelector('#view-cgv > div');
  if(cgv) cgv.innerHTML = MSG_TEST + '<p class="hint" style="margin-top:14px;">Les conditions générales de vente de L\'Atelier du Prof seront publiées à l\'ouverture des offres. Celles de L\'Atelier des Maths restent consultables sur <a href="https://maths.latelieraugmente.fr/#/cgv" target="_blank" rel="noopener">maths.latelieraugmente.fr</a>.</p>';
  // Mentions légales et confidentialité : même éditeur, même hébergement ; le nom et l'adresse du site changent.
  ['view-mentions-legales', 'view-confidentialite'].forEach(id => {
    const v = document.getElementById(id); if(!v) return;
    const w = document.createTreeWalker(v, NodeFilter.SHOW_TEXT);
    for(let n = w.nextNode(); n; n = w.nextNode()) n.nodeValue = n.nodeValue.replace(/L'Atelier des Maths/g, "L'Atelier du Prof").replace(/maths\.latelieraugmente\.fr/g, 'adp.latelieraugmente.fr');
  });
  // Génération par l'IA : niveaux du lycée en plus, exemple de thème hors maths.
  if(typeof qzGenOuvrir === 'function'){
    const o = qzGenOuvrir;
    qzGenOuvrir = function(){
      const r = o.apply(this, arguments);
      const sel = document.getElementById('qzGenNiveau');
      if(sel && !sel.querySelector('option[value="2de"]')){
        sel.insertAdjacentHTML('beforeend', ['2de', '1re', 'Tle'].map(n => `<option value="${n}">${n === 'Tle' ? 'Terminale' : n}</option>`).join(''));
        const cl = (typeof accountClassesList !== 'undefined' ? accountClassesList : []).find(c => c.id === (document.getElementById('qzfClasse') || {}).value);
        if(cl && ['2de', '1re', 'Tle'].includes(cl.niveau)) sel.value = cl.niveau;
      }
      const th = document.getElementById('qzGenTheme'); if(th && !estMaths()) th.placeholder = 'ex. la Révolution française, le present perfect, la photosynthèse…';
      return r;
    };
  }

  // Visites guidées (aide.js) : l'accueil et l'étape « chapitre » de la correction, sans les maths.
  if(typeof AIDE_PAGES !== 'undefined'){
    const acc = AIDE_PAGES.find(p => p.id === 'accueil');
    if(acc) acc.etapes = [
      { t: 'Bienvenue dans L\'Atelier du Prof !', d: 'Cette aide vous accompagne sur chaque page : le bouton <b>?</b> en bas à gauche lance la visite guidée de la page ouverte.' },
      { sel: '#adpAccueil .adp-actions .btn, #adpAccueil .adp-hero', t: 'Votre matière', d: 'Indiquez-la une fois : l\'aide de l\'IA et les compétences de vos interrogations s\'y adaptent.' },
      { sel: '#adpAccueil .adp-tuiles', t: 'Vos outils', d: 'Interrogations en ligne, sessions en direct, correction et cahier de la classe, devoirs, classes : chaque tuile ouvre un outil. Le menu « L\'Atelier du prof » en haut les reprend tous.' },
      { t: 'Le menu du compte', d: 'En haut à droite : la classe active, votre compte, et l\'aide à la lecture (police adaptée, voix).' },
    ];
    AIDE_PAGES.forEach(p => (p.etapes || []).forEach(e => {
      if(e.sel === '#corChapitre') e.d = 'Thème ou séquence (ex. « La Révolution française »), numéro (« 3 p. 45 »), date de la séance et titre. Sans date, l\'exercice est rangé dans les <b>Brouillons</b> pour plus tard.';
    }));
  }

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
      box.innerHTML = hero(`Bonjour${prenom ? ' ' + esc(prenom) : ''} !`, 'Ton travail, tes notes et les cahiers de tes professeurs.', '')
        + `<div class="adp-tuiles">${tuile('mesdevoirs', 'assignment', 'Mon travail', 'Devoirs et interrogations à faire, sessions de tes professeurs, tes notes.')}
          ${tuile('cahier', 'menu_book', 'Mes cahiers', 'Le cahier de chacun de tes professeurs, jour après jour.')}</div>`;
      return;
    }
    const mat = adpMatiere();
    box.innerHTML = hero(`Bonjour${prenom ? ' ' + esc(prenom) : ''}, <em>que fait-on aujourd'hui ?</em>`,
        'Vos classes, vos interrogations, vos séances et vos corrections, quelle que soit votre matière.',
        mat ? `<span class="hint" style="margin:0;align-self:center;">Votre matière : <b>${esc(mat)}</b></span> <button class="btn secondary td-mini" onclick="adpChoisirMatiere()"><span class="gicon">edit</span> Changer</button>`
            : `<button class="btn" style="background:#F29A1F;border-color:#F29A1F;" onclick="adpChoisirMatiere()"><span class="gicon">school</span> Indiquer ma matière</button>`)
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
      adpCompetences();
      const vhA = document.getElementById('view-home');
      if(vhA && vhA.classList.contains('active')) adpAccueil();
      return r;
    };
  }
  adpAccueil();
})();
