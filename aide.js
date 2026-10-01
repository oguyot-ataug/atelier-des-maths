/* =====================================================================
   aide.js -- Aide contextuelle pour les professeurs
   Demandé : « Il serait bien sur le site d'avoir un peu d'aide pour les profs. Des petites fenêtres
   contextuelles qui expliquent comment faire les choses. »
   - Un bouton rond « ? » en bas à gauche, pour les professeurs (et l'admin), sur chaque page qui a
     une aide : il lance une visite guidée de la page ouverte (ou de la Géométrie interactive quand
     elle est ouverte par-dessus).
   - Visite guidée : une petite fenêtre par étape, posée à côté de l'élément expliqué, qui est mis en
     lumière (le reste de la page est assombri). Précédent / Suivant, flèches du clavier, Échap.
     Une étape dont l'élément n'est pas affiché est montrée au centre de l'écran.
   - À la première visite d'une page, une bulle propose la visite (« Voir » / « Plus tard ») ; elle
     ne revient plus ensuite (mémorisé sur l'appareil). Le « ? » reste toujours disponible.
   Les textes sont écrits ici, en HTML fixe (aucune donnée d'utilisateur).
   Dépend d'app.js (currentUserRole) ; aucune autre dépendance.
   ===================================================================== */
const AIDE_PAGES = [
  { id: 'figure', titre: 'Géométrie interactive', test: () => aideVisible('#figurePanel') && aideVisible('#toolsModalOverlay'), etapes: [
    { sel: '#figurePanel .fig-mode[data-mode="deplacer"]', t: 'Les outils', d: 'Choisissez un outil dans la barre : <b>Déplacer</b>, <b>Point</b>, <b>Renommer</b> (A→B), segments et droites, cercles, milieux, perpendiculaires, polygones… Les petites flèches ▾ ouvrent les outils voisins.' },
    { sel: '#figureSvg', t: 'Construire', d: 'Cliquez dans la zone de dessin. La ligne d\'aide sous la figure dit toujours quoi faire avec l\'outil choisi. Le triangle et les polygones se construisent en cliquant n\'importe où : les sommets sont créés au fur et à mesure.' },
    { sel: '#figurePanel .fig-mode[data-mode="deplacer"]', t: 'Déplacer et renommer', d: 'Avec <b>Déplacer</b>, faites glisser un point libre : tout ce qui en dépend suit. Un double-clic sur un point permet de le renommer ou de le supprimer ; l\'outil <b>A→B</b> renomme d\'un simple clic.' },
    { sel: '#figurePanel .fig-mode[data-mode="renommer"]', t: 'Renommer un point', d: 'Outil <b>A→B</b> : cliquez le point (ou son nom), tapez le nouveau nom (1 à 4 caractères : A, M′, I1…).' },
    { sel: '#figSplitBtn', t: 'Écran partagé et projection', d: 'Ces boutons affichent, à côté de la figure ou sur le vidéoprojecteur, sa construction animée avec la règle, l\'équerre et le compas.' },
    { t: 'Annuler, enregistrer', d: 'La flèche ↩ annule la dernière action. « Enregistrer sous un nom » garde la figure pour la reprendre plus tard ; dans un cours ou un exercice, « Valider » l\'insère.' },
  ] },
  { id: 'accueil', titre: 'Accueil', vue: 'view-home', etapes: [
    { t: 'Bienvenue !', d: 'Cette aide vous accompagne sur chaque page : le bouton <b>?</b> en bas à gauche lance la visite guidée de la page ouverte.' },
    { sel: '#mainNav, .topnav, nav', t: 'Les niveaux', d: 'CM1, CM2, 6e, 5e, 4e, 3e : chaque niveau a sa progression (frise ou thèmes) et ses chapitres, avec le cours, les méthodes, les exercices et les quiz.' },
    { sel: '#homeProfs', t: 'Vos outils en vidéo', d: 'Chaque vignette présente un outil en une ou deux minutes : « Voir la vidéo » puis « Ouvrir l\'outil ».' },
    { t: 'Le menu du compte', d: 'En haut à droite : <b>Mes classes</b> (comptes des élèves, résultats, groupes), <b>Ma progression</b>, la classe active, l\'abonnement.' },
  ] },
  { id: 'correction', titre: 'Outil de correction', vue: 'view-correction', etapes: [
    { sel: '#corClassQuickPicker', t: '1. La classe', d: 'Choisissez d\'abord la classe : la correction ira dans <b>son</b> cahier, que ses élèves consultent. Le niveau suit la classe.' },
    { sel: '#corChapitre', t: '2. L\'exercice', d: 'Chapitre, numéro (« 4 p.23 »), date de la séance et titre. Sans date, l\'exercice est rangé dans les <b>Brouillons</b> pour plus tard.' },
    { sel: '#corModalites', t: '3. Comment il a été travaillé', d: '<b>Correction du travail maison</b>, <b>en classe entière</b> ou <b>en autonomie</b> : l\'exercice est rangé dans la bonne rubrique du résumé pour le cahier de textes.' },
    { sel: '#corToolsRow', t: '4. La correction', d: 'Tapez le texte (2/3, x^2, sqrt(2) se mettent en forme seuls) et ajoutez des blocs : figure, tableau, opération posée, repère… Mise en page sur plusieurs colonnes avec « + Nouvelle ligne ».' },
    { sel: '#btnProjection', t: 'Au vidéoprojecteur', d: 'Ouvrez la fenêtre de projection sur le second écran : les élèves voient la correction s\'écrire pendant que vous tapez.' },
    { sel: '#btnAddCahier', t: '5. Dans le cahier', d: '« Ajouter au cahier de corrections » : l\'exercice apparaît aussitôt dans le cahier de la classe.' },
    { sel: '#cahierList', t: 'Le cahier de corrections', d: 'Plus bas, tout ce qui a été ajouté, jour par jour : vignettes pour changer le type de correction, date, ordre, « Modifier ». Le bouton <b>Résumé pour le cahier de textes</b> prépare le texte à coller dans École Directe ou Pronote.' },
  ] },
  { id: 'progression', titre: 'Ma progression', vue: 'view-progression', etapes: [
    { sel: '#progNiveauSelect', t: 'Le niveau et la zone', d: 'Choisissez le niveau, puis votre zone de vacances : les vacances s\'affichent en bandeaux orange sur la frise.' },
    { sel: '#progressionList .pe-poignee', t: 'Changer l\'ordre', d: 'Attrapez un chapitre par sa poignée <b>⠿</b> et glissez-le plus haut ou plus bas : toutes les dates se recalculent.' },
    { sel: '#progressionList .pe-etirer', t: 'Changer la durée', d: 'Tirez le bord du bas d\'un bloc pour l\'allonger ou le raccourcir, par demi-semaine. Un clic sur un bloc ouvre aussi ses boutons ▲ ▼ − + et « Renommer ».' },
    { sel: '#progressionList .pe-barre', t: 'Le compteur et les événements', d: 'Le compteur passe au rouge si l\'année déborde après le 2 juillet. « Ajouter un événement » réserve une semaine (voyage, semaine des maths, évaluations communes…).' },
    { t: 'Enregistrer', d: 'Pensez au bouton <b>Enregistrer</b> : vos élèves voient alors votre progression, avec vos dates et vos noms de chapitres. « Revenir à la progression par défaut » efface vos réglages.' },
  ] },
  { id: 'niveau', titre: 'Page d\'un niveau', vue: 'view-niveau', etapes: [
    { sel: '#view-niveau .view-toggle', t: 'Frise ou thèmes', d: 'La <b>frise</b> suit l\'ordre de l\'année avec les dates ; les <b>thèmes</b> rangent les chapitres par domaine (nombres, géométrie…).' },
    { sel: '#view-niveau [onclick="progressionPdf()"]', t: 'La progression en PDF', d: 'Une page A4 propre de la progression, à imprimer ou à donner aux familles. Si vous avez votre propre progression, c\'est elle qui est imprimée.' },
    { sel: '#niveau-frise, #niveau-theme', t: 'Ouvrir un chapitre', d: 'Un clic sur un chapitre ouvre son cours, ses méthodes, ses exercices et son quiz.' },
  ] },
  { id: 'chapitre', titre: 'Un chapitre', vue: 'view-chapitre', etapes: [
    { t: 'Les onglets', d: 'Cours, Méthodes, Exercices, Histoire, Quiz : tout est projetable tel quel au tableau.' },
    { t: '« + Cahier »', d: 'Le bouton <b>+ Cahier</b> d\'un paragraphe le copie dans le cahier de la classe active, à la date du jour : les élèves retrouvent ce qui a été vu.' },
    { t: 'Personnaliser le cours', d: 'Vous pouvez réorganiser, masquer, réécrire ou ajouter des blocs (définitions, exemples, figures dynamiques). Vos élèves voient votre version ; les autres gardent l\'original.' },
    { t: 'Oliv\'IA', d: 'La petite robote d\'aide (bouton en bas à droite) réexplique le cours et donne des indices, jamais la réponse. Vous choisissez les élèves qui y ont accès et relisez les échanges.' },
  ] },
  { id: 'classes', titre: 'Mes classes', vue: 'view-supervision', etapes: [
    { sel: '#view-supervision .sup-tab-btn[data-suptab="comptes"]', t: 'Les comptes', d: 'Identifiants des élèves, réinitialisation d\'un mot de passe, connexions. Le bouton <b>Cartes flashcode</b> attribue les numéros des cartes et imprime les planches.' },
    { sel: '#view-supervision .sup-tab-btn[data-suptab="resultats"]', t: 'Les résultats', d: 'Automatismes, Objectif Nombre et exercices : réussite de chaque élève, filtrable par dates, exportable en CSV.' },
    { sel: '#view-supervision .sup-tab-btn[data-suptab="classes"]', t: 'Les devoirs', d: 'Les devoirs donnés à la classe active et les rendus des élèves.' },
    { sel: '#view-supervision .sup-tab-btn[data-suptab="groupes"]', t: 'Groupes de remédiation', d: 'Réunissez des élèves de plusieurs classes : le groupe s\'utilise ensuite comme une classe (devoirs, interrogations, Oliv\'IA, cahier).' },
  ] },
  { id: 'interros', titre: 'Interrogations en ligne', vue: 'view-qz-banque', etapes: [
    { t: 'Trois onglets', d: '<b>Interrogations données</b> (état, copies rendues, à corriger), <b>Mes questionnaires</b> (vos modèles, réutilisables) et les questionnaires <b>partagés</b> par vos collègues.' },
    { t: 'Créer', d: '« Nouvelle interrogation » : QCM, vrai/faux, nombres, réponses courtes, questions ouvertes, figures à construire… L\'IA peut proposer des questions. Tout est enregistré automatiquement.' },
    { t: 'Donner, corriger', d: '« Donner à une classe » avec des dates d\'ouverture et de fin. Les questions fermées se corrigent seules ; les autres copie par copie ou question par question, puis on publie les résultats (carnet de notes).' },
    { t: 'Questions flash', d: 'Le bouton <b>Questions flash</b> pose les questions une à une en classe : réponses en direct sur ordinateur, ou sans ordinateur avec les <b>cartes flashcode</b> lues par votre téléphone.' },
  ] },
  { id: 'qzform', titre: 'Préparer une interrogation', vue: 'view-qz-form', etapes: [
    { t: 'La classe et les dates', d: 'Toute la classe ou quelques élèves ; date d\'ouverture et date limite. Sans date d\'ouverture, l\'interrogation reste un brouillon invisible.' },
    { t: 'Les questions', d: 'Ajoutez les questions une à une, avec les points et la compétence travaillée. Pour une question ouverte, notez les attendus : ils guident la correction (et l\'IA si vous l\'utilisez).' },
    { t: 'En classe ou à la maison', d: 'En classe, l\'interrogation peut être chronométrée et les sorties de page sont signalées.' },
  ] },
  { id: 'flash', titre: 'Questions flash', vue: 'view-qz-direct', etapes: [
    { t: 'À votre rythme', d: 'Lancez chaque question quand vous voulez ; les réponses arrivent en direct. « Afficher la correction » montre la bonne réponse à toute la classe.' },
    { t: 'Écran projeté', d: 'Si votre écran est dupliqué au tableau, les résultats restent masqués. En écran étendu, « Projection » ouvre une fenêtre pour le vidéoprojecteur et les résultats restent sur votre écran.' },
    { t: 'Avec les cartes flashcode', d: '« Relier le téléphone » : scannez le code, puis passez le téléphone devant les cartes levées. Vert = carte lue, rouge = pas encore.' },
  ] },
  { id: 'devoirs', titre: 'Devoirs en ligne', vue: 'view-devoirs-prof', etapes: [
    { sel: '#devoirNewTitre', t: 'Un nouveau devoir', d: 'Titre, classe, puis le travail : fichier ou figure à rendre, figure à compléter, automatismes, défi Objectif Nombre…' },
    { sel: '#devoirNewDateDepot', t: 'Quand les élèves le voient', d: 'Sans date de dépôt, le devoir reste un brouillon. Une date future le programme ; la date limite est facultative.' },
    { t: 'Le suivi', d: 'Les rendus et les résultats se suivent ici et dans <b>Mes classes › Devoirs</b>. Les automatismes et Objectif Nombre se corrigent tout seuls.' },
  ] },
  { id: 'evaluation', titre: 'Créer une évaluation', vue: 'view-evaluation', etapes: [
    { sel: '#evalNiveau', t: 'L\'en-tête', d: 'Niveau, classes, date, durée, consignes : l\'en-tête de la copie se remplit tout seul.' },
    { sel: '#evalUseAI', t: 'Des exercices proposés', d: 'Cochez l\'IA pour obtenir des exercices sur les chapitres choisis, ou écrivez-les vous-même ; chaque exercice a son barème.' },
    { sel: '#evalExercicesList', t: 'Les exercices', d: 'Texte, figures, tableaux, texte et figure côte à côte. L\'aperçu montre la copie telle qu\'elle sera imprimée.' },
    { t: 'Imprimer, partager', d: 'Imprimez ou enregistrez en PDF ; partagez avec un collègue ; « Ajouter au cahier » met l\'énoncé dans le cahier de la classe.' },
  ] },
  { id: 'tableau', titre: 'Tableau interactif', vue: 'view-tableau', etapes: [
    { sel: '#tbToolPalette', t: 'Les instruments', d: 'Règle, équerre, compas, rapporteur et crayon : on les manipule à l\'écran comme en vrai.' },
    { sel: '#tbBtnAi', t: 'Construire avec l\'IA', d: 'Tapez un énoncé (« Construire un triangle ABC tel que… ») : la construction se rejoue pas à pas, avec les vrais gestes des instruments.' },
    { sel: '#tbBtnFullscreen', t: 'Au vidéoprojecteur', d: 'Le plein écran met le tableau seul à l\'écran.' },
  ] },
  { id: 'outilsclasse', titre: 'Outils de classe', vue: 'view-classe', etapes: [
    { sel: '#clBlocRoue', t: 'La roue de la chance', d: 'Tire au sort un élève de la classe choisie : il sort de la roue jusqu\'à « Réinitialiser ». Les absents se décochent.' },
    { sel: '#clBlocMinuteur', t: 'Le compte à rebours', d: 'Dans une petite fenêtre déplaçable, qui reste affichée quand vous changez de page, ou en sablier plein écran.' },
    { t: 'Plein écran', d: 'Chaque bloc a son bouton plein écran, pratique au vidéoprojecteur.' },
  ] },
];

/* ------------------------------ Outils ------------------------------ */
function aideVisible(sel){
  const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
  if(!el) return false;
  const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
  return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
}
function aideProf(){ return typeof currentUserRole !== 'undefined' && (currentUserRole === 'prof' || currentUserRole === 'admin'); }
function aidePageCourante(){
  const vue = document.querySelector('.view.active');
  return AIDE_PAGES.find(p => p.test ? p.test() : (vue && vue.id === p.vue)) || null;
}
function aideCible(sel){
  if(!sel) return null;
  for(const s of sel.split(',')){ const el = [...document.querySelectorAll(s.trim())].find(e => aideVisible(e)); if(el) return el; }
  return null;
}
function aideVu(id, v){
  try{ if(v) localStorage.setItem('aideVu:' + id, '1'); return localStorage.getItem('aideVu:' + id) === '1'; }catch(e){ return true; }
}

/* ------------------------------ Bouton « ? » ------------------------------ */
let aideEtat = { page: null, tour: null, i: 0 };
function aideMaj(){
  let b = document.getElementById('aideBtn');
  const proj = (typeof FIG_PROJ !== 'undefined' && FIG_PROJ) || (typeof QZC_PROJ !== 'undefined' && QZC_PROJ);
  const page = aideProf() && !proj ? aidePageCourante() : null;
  if(!page){ if(b) b.hidden = true; aideBulleFermer(); aideEtat.page = null; return; }
  if(!b){
    b = document.createElement('button'); b.id = 'aideBtn'; b.type = 'button';
    b.innerHTML = '?'; b.setAttribute('aria-label', 'Aide sur cette page');
    b.addEventListener('click', () => { aideBulleFermer(); aideDemarrer(); });
    document.body.appendChild(b);
  }
  b.hidden = false; b.title = 'Aide : ' + page.titre;
  if(aideEtat.page !== page.id){
    aideEtat.page = page.id; aideBulleFermer();
    if(!aideVu(page.id) && !aideEtat.tour) setTimeout(() => { if(aideEtat.page === page.id && !aideEtat.tour) aideBulle(page); }, 900);
  }
}
function aideBulle(page){
  aideBulleFermer();
  const d = document.createElement('div'); d.id = 'aideBulle'; d.setAttribute('role', 'dialog');
  d.innerHTML = `<b>${page.titre}</b><span>Première visite ? Une visite guidée en ${page.etapes.length} étapes explique cette page.</span>
    <div><button type="button" class="btn" data-voir>Voir</button><button type="button" class="btn secondary" data-non>Plus tard</button></div>`;
  d.querySelector('[data-voir]').onclick = () => { aideBulleFermer(); aideDemarrer(); };
  d.querySelector('[data-non]').onclick = () => { aideVu(page.id, true); aideBulleFermer(); };
  document.body.appendChild(d);
}
function aideBulleFermer(){ const d = document.getElementById('aideBulle'); if(d) d.remove(); }

/* ------------------------------ Visite guidée ------------------------------ */
function aideDemarrer(page){
  page = page || aidePageCourante(); if(!page) return;
  aideVu(page.id, true);
  aideFermer();
  aideEtat.tour = page; aideEtat.i = 0;
  const voile = document.createElement('div'); voile.id = 'aideVoile';
  voile.innerHTML = '<div id="aideTrou"></div><div id="aideCarte" role="dialog" aria-live="polite"></div>';
  voile.addEventListener('click', e => { if(e.target === voile) aideFermer(); });
  document.body.appendChild(voile);
  document.addEventListener('keydown', aideClavier, true);
  window.addEventListener('resize', aidePlacer); window.addEventListener('scroll', aidePlacer, true);
  aideEtape(0);
}
function aideFermer(){
  const v = document.getElementById('aideVoile'); if(v) v.remove();
  document.removeEventListener('keydown', aideClavier, true);
  window.removeEventListener('resize', aidePlacer); window.removeEventListener('scroll', aidePlacer, true);
  aideEtat.tour = null;
}
function aideClavier(e){
  if(!aideEtat.tour) return;
  if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); aideFermer(); }
  else if(e.key === 'ArrowRight'){ e.preventDefault(); aideEtape(aideEtat.i + 1); }
  else if(e.key === 'ArrowLeft'){ e.preventDefault(); aideEtape(aideEtat.i - 1); }
}
function aideEtape(i){
  const page = aideEtat.tour; if(!page) return;
  if(i >= page.etapes.length){ aideFermer(); return; }
  aideEtat.i = Math.max(0, i);
  const et = page.etapes[aideEtat.i], n = page.etapes.length, carte = document.getElementById('aideCarte');
  carte.innerHTML = `<div class="aide-tete"><span class="aide-num">${aideEtat.i + 1} / ${n}</span><span class="aide-page">${page.titre}</span><button type="button" class="aide-x" aria-label="Fermer l'aide">✕</button></div>
    <h3>${et.t}</h3><p>${et.d}</p>
    <div class="aide-pied"><button type="button" class="btn secondary" data-prec ${aideEtat.i ? '' : 'disabled'}>← Précédent</button>
      <button type="button" class="btn" data-suiv>${aideEtat.i === n - 1 ? 'Terminer' : 'Suivant →'}</button></div>`;
  carte.querySelector('.aide-x').onclick = aideFermer;
  carte.querySelector('[data-prec]').onclick = () => aideEtape(aideEtat.i - 1);
  carte.querySelector('[data-suiv]').onclick = () => aideEtape(aideEtat.i + 1);
  const cible = aideCible(et.sel);
  if(cible){ const r = cible.getBoundingClientRect(); if(r.top < 70 || r.bottom > innerHeight - 40) cible.scrollIntoView({ block: 'center' }); }
  aidePlacer();
  carte.querySelector('[data-suiv]').focus({ preventScroll: true });
}
// Met la cible en lumière et pose la fenêtre à côté (dessous, sinon dessus, sinon au centre).
function aidePlacer(){
  const page = aideEtat.tour; if(!page) return;
  const et = page.etapes[aideEtat.i], trou = document.getElementById('aideTrou'), carte = document.getElementById('aideCarte');
  if(!trou || !carte) return;
  const cible = aideCible(et.sel), m = 6, W = innerWidth, H = innerHeight;
  const cw = Math.min(380, W - 24); carte.style.width = cw + 'px';
  const ch = carte.offsetHeight;
  if(!cible){
    trou.style.cssText = 'left:50%;top:50%;width:0;height:0;';
    carte.style.left = (W - cw) / 2 + 'px'; carte.style.top = Math.max(12, (H - ch) / 2) + 'px'; carte.classList.add('centre');
    return;
  }
  carte.classList.remove('centre');
  const r = cible.getBoundingClientRect();
  const x = Math.max(4, r.left - m), y = Math.max(4, r.top - m), w = Math.min(W - 8, r.width + 2 * m), h = Math.min(H - 8, r.height + 2 * m);
  trou.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;`;
  let top = y + h + 12;
  if(top + ch > H - 8) top = y - ch - 12;
  if(top < 8) top = Math.max(8, Math.min(H - ch - 8, y + 24)); // grand élément : la fenêtre se pose dessus
  const left = Math.max(12, Math.min(W - cw - 12, r.left + r.width / 2 - cw / 2));
  carte.style.left = left + 'px'; carte.style.top = top + 'px';
}

setInterval(aideMaj, 800);
