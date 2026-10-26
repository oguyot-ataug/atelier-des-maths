/* =====================================================================
   olivia-deco.js -- La petite Oliv'IA dans les chapitres

   Demandé : « Décliner des images de la petite Oliv'IA dans les cours, les méthodes, les exercices,
   l'histoire, les automatismes, bref tous les outils pour l'élève ("À savoir !", "Muscle ton jeu !") :
   ce serait sympa et ça mettrait un peu de gaieté. » Choix : une petite vignette avec une bulle, au
   début de chaque encadré clé ; pas dans les PDF ni dans le cahier.

   Poses (même personnage que le bouton d'Oliv'IA, olivia.js) : le doigt levé (définitions, règles,
   propriétés), la loupe (méthodes), les muscles (exercices, automatismes), le chapeau d'exploratrice
   et le parchemin (histoire), le point d'interrogation (quiz) ; la randonneuse au sac à dos (« Pour aller
   plus loin » : en route vers l'année suivante) et la petite super-héroïne à cape (les défis).

   Les vignettes sont dessinées UNIQUEMENT en CSS (pseudo-éléments ::before / ::after) sur des classes
   ajoutées aux éléments existants : aucun nœud n'est ajouté au contenu des chapitres. Ainsi rien ne
   change pour la lecture à voix haute, le mode apprentissage (texte des encadrés), les cours
   personnalisés (blocs calculés sur les enfants et leur texte), le cahier et les PDF (le style n'est
   actif que dans la page du chapitre : #view-chapitre.oliv-deco).
   Dépend d'app.js (openChapitre appelle olivDecorer) et de flash-prets.js (fenêtre des questions flash).
   ===================================================================== */

// Teintes d'olive -- demandé : « On peut aussi varier les couleurs d'Oliv'IA » : f = corps, e = contour et bras.
const OLIV_TEINTES = { verte: { f: '#8DB84A', e: '#4F6B2A' }, noire: { f: '#7E5A8E', e: '#43304F' }, doree: { f: '#CDB64E', e: '#7A6A1F' }, cuivree: { f: '#C98A4A', e: '#7A4A1F' } };
// Corps commun : l'olive, ses yeux, ses joues ; « bras » et « tete » varient selon la pose.
function olivPoseSvg(p, teinte){
  const T = OLIV_TEINTES[teinte] || OLIV_TEINTES.verte, E = T.e;
  const feuille = `<path d="M60 20 q-2 -9 4 -14" stroke="${E}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M64 8 C 74 -1, 88 3, 92 10 C 82 16, 72 15, 64 8 Z" fill="#7BAE4F" stroke="${E}" stroke-width="1.5"/>`;
  const chapeau = `<ellipse cx="60" cy="25" rx="38" ry="7" fill="#A0743B" stroke="#6B4A22" stroke-width="2"/><path d="M38 24 Q40 4 60 4 Q80 4 82 24 Z" fill="#C49A5C" stroke="#6B4A22" stroke-width="2"/><path d="M39 19 H81" stroke="#6B4A22" stroke-width="4"/>`;
  const corps = `<ellipse cx="60" cy="66" rx="34" ry="42" fill="${T.f}" stroke="${E}" stroke-width="3.5"/><ellipse cx="47" cy="46" rx="8" ry="13" fill="#fff" opacity=".35" transform="rotate(-20 47 46)"/>`;
  const yeux = (clin) => `<circle cx="47" cy="62" r="11" fill="#fff" stroke="#2C3A1A" stroke-width="2.5"/><circle cx="49" cy="64" r="5.5" fill="#1C2B39"/><circle cx="51" cy="61.5" r="1.8" fill="#fff"/>`
    + (clin ? `<path d="M64 63 Q73 57 82 63" stroke="#2C3A1A" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : `<circle cx="73" cy="62" r="11" fill="#fff" stroke="#2C3A1A" stroke-width="2.5"/><circle cx="75" cy="64" r="5.5" fill="#1C2B39"/><circle cx="77" cy="61.5" r="1.8" fill="#fff"/>`);
  const joues = `<circle cx="36" cy="82" r="5" fill="#F4A7B9" opacity=".9"/><circle cx="84" cy="82" r="5" fill="#F4A7B9" opacity=".9"/>`;
  const sourire = `<path d="M50 84 Q60 92 70 84" stroke="#2C3A1A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const bouche = `<path d="M51 83 Q60 95 69 83 Z" fill="#7A2E2E" stroke="#2C3A1A" stroke-width="2.5" stroke-linejoin="round"/>`;
  const brasG = `<path d="M27 72 q-14 4 -16 16" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="11" cy="89" r="4.5" fill="${E}"/>`;
  const sourcils = `<path d="M37 47 L55 52 M83 47 L65 52" stroke="#2C3A1A" stroke-width="3" stroke-linecap="round"/>`;
  let tete = feuille, bras = brasG, visage = yeux(false) + joues + sourire, extra = '', vb = '0 0 120 120';
  if(p === 'savoir'){ // doigt levé
    bras += `<path d="M93 66 q12 -10 11 -32" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="104" cy="33" r="5" fill="${E}"/><path d="M104 29 V18" stroke="${E}" stroke-width="4" stroke-linecap="round"/>`;
    visage = yeux(false) + joues + bouche;
  } else if(p === 'methode'){ // loupe
    bras += `<path d="M93 72 q10 -2 14 -10" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    extra = `<path d="M108 62 L114 74" stroke="#5B3A1A" stroke-width="5" stroke-linecap="round"/><circle cx="104" cy="48" r="13" fill="#CFEFFF" fill-opacity=".7" stroke="#1F3A5C" stroke-width="3.5"/><path d="M98 43 q3 -5 9 -5" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="108" cy="63" r="4.5" fill="${E}"/>`;
  } else if(p === 'muscle'){ // deux petits biceps gonflés et un clin d'œil (demandé : « l'Olive "Muscle ton jeu" semble un peu méchante »)
    const biceps = (sx) => { const x = v => 60 + sx * (v - 60); // côté gauche (sx = 1) ou droit (sx = -1), par symétrie
      return `<path d="M${x(28)} 72 L${x(14)} 66 L${x(12)} 50" stroke="${E}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
        + `<ellipse cx="${x(20)}" cy="64.5" rx="7" ry="5.4" fill="#A9CF63" stroke="${E}" stroke-width="2"/><circle cx="${x(12)}" cy="47" r="4.8" fill="${E}"/>`; };
    bras = biceps(1) + biceps(-1);
    visage = yeux(true) + joues + sourire;
  } else if(p === 'histoire'){ // chapeau d'exploratrice et parchemin
    tete = chapeau;
    bras += `<path d="M93 72 q10 0 13 -6" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    extra = `<rect x="98" y="44" width="16" height="26" rx="3" fill="#F6E7C1" stroke="#8A6D1F" stroke-width="2"/><rect x="96" y="40" width="20" height="6" rx="3" fill="#E9D3A0" stroke="#8A6D1F" stroke-width="2"/><rect x="96" y="68" width="20" height="6" rx="3" fill="#E9D3A0" stroke="#8A6D1F" stroke-width="2"/><path d="M102 52 H110 M102 57 H110 M102 62 H108" stroke="#8A6D1F" stroke-width="1.5"/>`;
  } else if(p === 'cm2'){ // randonneuse, sac à dos et bâton (« Pour aller plus loin » : en route vers l'année suivante)
    extra = `<rect x="12" y="44" width="24" height="46" rx="9" fill="#E9A21C" stroke="#8A5A1A" stroke-width="2.5"/><rect x="8" y="61" width="11" height="17" rx="4" fill="#D48C10" stroke="#8A5A1A" stroke-width="2"/>`;
    tete = feuille; // le sac est dessiné derrière le corps (voir plus bas)
    bras = `<path d="M34 46 Q46 60 38 90" stroke="#8A5A1A" stroke-width="4" fill="none"/>` + `<path d="M104 30 L97 116" stroke="#6B4A22" stroke-width="4" stroke-linecap="round"/><path d="M92 72 Q100 66 101 58" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="101" cy="56" r="4.8" fill="${E}"/>`;
    visage = yeux(false) + joues + sourire;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${extra}${tete}${corps}${bras}${visage}</svg>`;
  } else if(p === 'defi'){ // petite super-héroïne : cape et poing levé (les défis)
    const cape = `<path d="M34 42 Q60 30 86 42 L112 112 Q86 102 60 114 Q34 102 8 112 Z" fill="#E35D3A" stroke="#9E2F1C" stroke-width="2.5" stroke-linejoin="round"/>`;
    bras = `<path d="M28 74 Q18 80 20 94" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="20" cy="96" r="4.8" fill="${E}"/><path d="M92 66 Q104 52 112 40" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="113" cy="37" r="7" fill="${E}"/>`;
    visage = `<path d="M40 54 L52 57 M80 54 L68 57" stroke="#2C3A1A" stroke-width="3" stroke-linecap="round"/>` + yeux(false) + joues + bouche;
    extra = `<path d="M44 92 h32 l-4 10 h-24 Z" fill="#F5C518" stroke="#C99A00" stroke-width="1.5"/><text x="60" y="101" font-size="9" font-weight="800" fill="#7A2E2E" font-family="Arial" text-anchor="middle">D</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${cape}${tete}${corps}${bras}${visage}${extra}</svg>`;
  } else if(['globe', 'musique', 'arts', 'sport', 'cuisine', 'nature', 'argent', 'jeux', 'sciences', 'geo', 'savante', 'regle', 'equerre', 'tableau', 'blocs', 'correction', 'evaluation', 'devoirs', 'interro', 'classe', 'session', 'calendrier', 'outils', 'simulateur', 'couronne', 'ia', 'cle', 'bug', 'aurevoir'].includes(p)){
    // Maths & la vie (la globe-trotteuse et une pose par thème) et page Histoire des maths (la savante grecque) --
    // demandé : « insérer des logos d'Oliv'IA dans les pages Maths & la vie et dans le menu histoire », choix :
    // « globe-trotteuse, vignettes par thème et savante grecque ». La main droite tient l'objet du thème.
    const main = `<path d="M93 70 q10 -4 12 -14" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    const mainBas = `<path d="M93 76 q10 2 14 8" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="107" cy="85" r="4.8" fill="${E}"/>`;
    vb = '-4 -4 130 128'; // l'objet tenu à droite dépasse du carré 120 × 120 : cadre élargi (signalé : « le logo est coupé à droite »)
    bras = brasG + main; visage = yeux(true) + joues + sourire;
    if(p === 'globe'){
      visage = yeux(false) + joues + bouche;
      extra = `<circle cx="106" cy="38" r="15" fill="#4FA3E0" stroke="#1F5C8A" stroke-width="2.5"/><path d="M96 32 q6 -6 12 -2 q2 6 -4 8 q-6 2 -8 -6 Z M108 44 q6 -2 8 4 q-4 6 -8 2 Z" fill="#6DBB4A" stroke="#2E7D32" stroke-width="1"/><path d="M91 38 H121 M106 23 Q98 38 106 53 M106 23 Q114 38 106 53" stroke="#fff" stroke-width="1" fill="none" opacity=".6"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'musique'){
      tete = feuille + `<path d="M24 58 Q24 18 60 18 Q96 18 96 58" stroke="#3A3A5A" stroke-width="5" fill="none"/>`;
      extra = `<rect x="18" y="52" width="12" height="20" rx="5" fill="#7A4FC0" stroke="#3A3A5A" stroke-width="2"/><rect x="90" y="52" width="12" height="20" rx="5" fill="#7A4FC0" stroke="#3A3A5A" stroke-width="2"/><text x="108" y="46" font-size="22" fill="#7A4FC0" font-family="Arial" text-anchor="middle">♪</text><text x="114" y="24" font-size="16" fill="#7A4FC0" font-family="Arial" text-anchor="middle">♫</text>`;
    } else if(p === 'arts'){
      tete = `<ellipse cx="56" cy="27" rx="28" ry="9" fill="#B03A3A" stroke="#6E1F1F" stroke-width="2"/><circle cx="58" cy="17" r="3.5" fill="#6E1F1F"/>`;
      visage = yeux(false) + joues + sourire;
      extra = `<path d="M104 58 L114 24" stroke="#8A5A1A" stroke-width="4" stroke-linecap="round"/><path d="M112 28 L116 16 L119 28 Z" fill="#2F6FB3"/><ellipse cx="14" cy="100" rx="12" ry="8" fill="#F3E2C0" stroke="#8A6D1F" stroke-width="1.5"/><circle cx="9" cy="98" r="2.3" fill="#E35D3A"/><circle cx="15" cy="96" r="2.3" fill="#2F6FB3"/><circle cx="20" cy="100" r="2.3" fill="#F5C518"/>`;
    } else if(p === 'sport'){
      extra = `<path d="M27 42 Q60 30 93 42" stroke="#E35D3A" stroke-width="7" fill="none"/><path d="M48 90 L56 100 M72 90 L64 100" stroke="#2F6FB3" stroke-width="4"/><circle cx="60" cy="104" r="7" fill="#F5C518" stroke="#C99A00" stroke-width="2"/><circle cx="108" cy="42" r="11" fill="#fff" stroke="#1C1B2E" stroke-width="2"/><path d="M108 36 l5 3.5 -2 6 h-6 l-2 -6 Z" fill="#1C1B2E"/>`;
    } else if(p === 'cuisine'){
      tete = `<path d="M40 30 Q30 10 46 10 Q50 -2 60 4 Q70 -2 74 10 Q90 10 80 30 Z" fill="#fff" stroke="#8A8F98" stroke-width="2"/><rect x="40" y="28" width="40" height="8" rx="2" fill="#fff" stroke="#8A8F98" stroke-width="2"/>`;
      visage = yeux(false) + joues + sourire;
      extra = `<path d="M105 56 L108 36" stroke="#8A8F98" stroke-width="3" stroke-linecap="round"/><path d="M108 36 Q100 22 106 14 Q112 22 108 36 Q116 22 112 14 Q104 22 108 36" fill="none" stroke="#8A8F98" stroke-width="1.8"/>`;
    } else if(p === 'nature'){
      extra = `<path d="M105 56 Q108 40 106 30" stroke="#2E7D32" stroke-width="3" fill="none"/><path d="M106 44 q8 -6 12 0 q-6 4 -12 0" fill="#6DBB4A"/>`
        + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<ellipse cx="106" cy="14" rx="4" ry="8" fill="#F5C518" stroke="#C99A00" stroke-width="1" transform="rotate(${k * 36} 106 22)"/>`).join('') + `<circle cx="106" cy="22" r="6" fill="#7A4A10"/>`;
    } else if(p === 'argent'){
      bras = brasG + mainBas; visage = yeux(false) + joues + sourire;
      extra = `<ellipse cx="106" cy="98" rx="14" ry="11" fill="#F4A7B9" stroke="#B0607A" stroke-width="2"/><circle cx="118" cy="96" r="4" fill="#F4A7B9" stroke="#B0607A" stroke-width="1.5"/><path d="M100 108 v6 M112 108 v6" stroke="#B0607A" stroke-width="3"/><path d="M102 88 h8" stroke="#7A2E4A" stroke-width="2"/><circle cx="106" cy="72" r="7" fill="#F5C518" stroke="#C99A00" stroke-width="2"/><text x="106" y="76" font-size="9" font-weight="800" fill="#8A5A00" font-family="Arial" text-anchor="middle">€</text>`;
    } else if(p === 'jeux'){
      extra = `<g transform="rotate(-12 108 40)"><rect x="96" y="28" width="24" height="24" rx="5" fill="#fff" stroke="#5B2F9E" stroke-width="2.5"/><circle cx="102" cy="34" r="2.4" fill="#5B2F9E"/><circle cx="108" cy="40" r="2.4" fill="#5B2F9E"/><circle cx="114" cy="46" r="2.4" fill="#5B2F9E"/></g>`;
    } else if(p === 'sciences'){
      visage = yeux(false) + joues + bouche;
      extra = `<rect x="31" y="50" width="58" height="24" rx="11" fill="#CFEFFF" fill-opacity=".45" stroke="#1F6F8B" stroke-width="3"/><path d="M60 52 V72" stroke="#1F6F8B" stroke-width="2"/><path d="M101 22 h10 v10 l8 18 h-26 l8 -18 Z" fill="#fff" stroke="#1F6F8B" stroke-width="2"/><path d="M95 44 l3 -6 h16 l3 6 Z" fill="#4CC38A"/><circle cx="103" cy="16" r="2" fill="#4CC38A"/><circle cx="110" cy="10" r="2.5" fill="#4CC38A"/>`;
    } else if(p === 'geo'){
      extra = `<circle cx="106" cy="38" r="14" fill="#F6E7C1" stroke="#8A6D1F" stroke-width="2.5"/><path d="M106 26 L110 38 L106 50 L102 38 Z" fill="#fff" stroke="#8A6D1F" stroke-width="1"/><path d="M106 26 L110 38 H102 Z" fill="#D3302F"/><text x="106" y="22" font-size="7" font-weight="800" fill="#8A6D1F" font-family="Arial" text-anchor="middle">N</text>`;
    } else if(p === 'regle'){ // menu L'Atelier : Convertisseur (une règle graduée)
      extra = `<g transform="rotate(-62 105 56)"><rect x="101" y="50" width="40" height="11" rx="1.5" fill="#F5C518" stroke="#8A6D1F" stroke-width="1.8"/>`
        + [0, 1, 2, 3, 4, 5, 6].map(k => `<path d="M${106 + k * 5} 50 v${k % 2 ? 3 : 5}" stroke="#8A6D1F" stroke-width="1.2"/>`).join('') + `</g><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'equerre'){ // menu L'Atelier : Géométrie interactive (une équerre)
      extra = `<path d="M98 16 L98 54 L124 54 Z" fill="#CFEFFF" fill-opacity=".85" stroke="#1F6F8B" stroke-width="2.5" stroke-linejoin="round"/><path d="M102 32 L102 49 L117 49 Z" fill="#fff" stroke="#1F6F8B" stroke-width="1.5"/><path d="M98 47 h7 v7" fill="none" stroke="#E35D3A" stroke-width="1.8"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'tableau'){ // menu L'Atelier : Tableau interactif (un petit tableau et un feutre)
      visage = yeux(false) + joues + bouche;
      extra = `<rect x="90" y="8" width="34" height="28" rx="2" fill="#fff" stroke="#5B6472" stroke-width="2.5"/><path d="M96 30 L106 14 L118 30 Z" fill="none" stroke="#E35D3A" stroke-width="2"/><circle cx="106" cy="14" r="1.6" fill="#2F6FB3"/><path d="M105 56 L101 38" stroke="#2F6FB3" stroke-width="4" stroke-linecap="round"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'blocs'){ // menu L'Atelier : Programmation (deux blocs emboîtés)
      const bloc = (y, c, b) => `<path d="M92 ${y} h8 l3 4 h6 l3 -4 h12 v14 h-12 l-3 4 h-6 l-3 -4 h-8 Z" fill="${c}" stroke="${b}" stroke-width="2" stroke-linejoin="round"/>`;
      extra = bloc(14, '#4C97FF', '#2F6FB3') + bloc(32, '#FFAB19', '#C88A0A') + `<circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    // ---- Menu « L'Atelier du prof » -- demandé : « décline aussi sur le menu du professeur », choix : sans lunettes.
    } else if(p === 'correction'){ // copie cochée et stylo rouge
      extra = `<rect x="94" y="12" width="26" height="34" rx="2" fill="#fff" stroke="#5B6472" stroke-width="2"/><path d="M99 20 h16 M99 26 h16 M99 32 h10" stroke="#B8BEC8" stroke-width="2"/><path d="M100 38 l4 4 l8 -10" stroke="#D3302F" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M105 56 L116 36" stroke="#D3302F" stroke-width="4" stroke-linecap="round"/><path d="M116 36 l2 -4" stroke="#7A2E2E" stroke-width="3"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'evaluation'){ // feuille « ÉVAL » et crayon
      extra = `<rect x="92" y="10" width="28" height="36" rx="2" fill="#FFF8E1" stroke="#8A6D1F" stroke-width="2"/><text x="106" y="22" font-size="8" font-weight="800" fill="#8A6D1F" font-family="Arial" text-anchor="middle">ÉVAL</text><path d="M97 28 h18 M97 34 h18 M97 40 h12" stroke="#C9B37A" stroke-width="2"/><g transform="rotate(35 108 44)"><rect x="104" y="30" width="7" height="26" rx="1.5" fill="#F5C518" stroke="#8A6D1F" stroke-width="1.5"/><path d="M104 56 l3.5 7 l3.5 -7 Z" fill="#F3D9A0" stroke="#8A6D1F" stroke-width="1.2"/></g><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'devoirs'){ // copie qu'on envoie
      extra = `<rect x="94" y="16" width="24" height="30" rx="2" fill="#fff" stroke="#2F6FB3" stroke-width="2"/><path d="M99 24 h14 M99 30 h14" stroke="#B8BEC8" stroke-width="2"/><circle cx="114" cy="42" r="9" fill="#2F6FB3"/><path d="M114 47 V37 M110 41 l4 -4 l4 4" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'interro'){ // tablette avec un QCM
      extra = `<rect x="92" y="10" width="30" height="40" rx="4" fill="#1C1B2E"/><rect x="95" y="14" width="24" height="31" rx="1.5" fill="#fff"/><rect x="98" y="18" width="5" height="5" rx="1" fill="none" stroke="#5B6472" stroke-width="1.2"/><path d="M99 20.5 l1.5 1.5 l3 -3.5" stroke="#1E8A6E" stroke-width="1.6" fill="none"/><rect x="98" y="27" width="5" height="5" rx="1" fill="none" stroke="#5B6472" stroke-width="1.2"/><rect x="98" y="36" width="5" height="5" rx="1" fill="none" stroke="#5B6472" stroke-width="1.2"/><path d="M106 20.5 h10 M106 29.5 h10 M106 38.5 h10" stroke="#B8BEC8" stroke-width="2"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'classe'){ // deux petites olives élèves
      extra = `<ellipse cx="104" cy="96" rx="9" ry="11" fill="#A9CF63" stroke="#4F6B2A" stroke-width="2"/><circle cx="101" cy="94" r="2" fill="#1C2B39"/><circle cx="107" cy="94" r="2" fill="#1C2B39"/><path d="M101 100 q3 2 6 0" stroke="#2C3A1A" stroke-width="1.5" fill="none"/><ellipse cx="118" cy="100" rx="8" ry="10" fill="#B28FC0" stroke="#43304F" stroke-width="2"/><circle cx="116" cy="98" r="1.8" fill="#1C2B39"/><circle cx="121" cy="98" r="1.8" fill="#1C2B39"/><path d="M116 103 q2 1.5 5 0" stroke="#2C3A1A" stroke-width="1.5" fill="none"/><path d="M104 85 q-1 -4 2 -6" stroke="#4F6B2A" stroke-width="1.6" fill="none"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'session'){ // la télécommande des sessions en direct
      extra = `<rect x="99" y="22" width="13" height="32" rx="5" fill="#2F2A26" stroke="#1C1B2E" stroke-width="1.5"/><circle cx="105.5" cy="30" r="3" fill="#E35D3A"/><rect x="102" y="37" width="7" height="3" rx="1" fill="#8A8F98"/><rect x="102" y="43" width="7" height="3" rx="1" fill="#8A8F98"/><path d="M98 18 q7 -6 15 0 M101 13 q4.5 -4 9 0" stroke="#2F6FB3" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'calendrier'){ // Ma progression
      extra = `<rect x="92" y="14" width="30" height="30" rx="3" fill="#fff" stroke="#5B6472" stroke-width="2"/><rect x="92" y="14" width="30" height="9" rx="3" fill="#D3302F"/><path d="M99 10 v8 M115 10 v8" stroke="#5B6472" stroke-width="2.5" stroke-linecap="round"/>`
        + [0, 1, 2].flatMap(r => [0, 1, 2, 3].map(c => `<rect x="${96 + c * 6.5}" y="${27 + r * 5.5}" width="4" height="3.5" fill="${r === 1 && c === 2 ? '#1E8A6E' : '#D7DBE2'}"/>`)).join('') + `<circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'outils'){ // le feu de consigne
      extra = `<rect x="98" y="8" width="16" height="40" rx="5" fill="#2F2A26"/><circle cx="106" cy="16" r="4.5" fill="#D3302F"/><circle cx="106" cy="28" r="4.5" fill="#F5C518" opacity=".45"/><circle cx="106" cy="40" r="4.5" fill="#4CC38A" opacity=".45"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'simulateur'){ // écran du professeur et téléphone d'élève
      extra = `<rect x="88" y="14" width="30" height="20" rx="2" fill="#1C1B2E"/><rect x="90.5" y="16.5" width="25" height="15" fill="#CFEFFF"/><path d="M84 36 h38 l-3 4 h-32 Z" fill="#8A8F98"/><rect x="112" y="30" width="11" height="19" rx="2" fill="#1C1B2E"/><rect x="113.5" y="32.5" width="8" height="13" fill="#FFE9B0"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    // ---- Menu « Mon compte » -- demandé : « décline aussi Oliv'IA sur le menu Mon compte ».
    } else if(p === 'couronne'){ // Mon abonnement
      tete = ''; visage = yeux(false) + joues + bouche;
      extra = `<path d="M38 32 L42 10 L51 22 L60 5 L69 22 L78 10 L82 32 Z" fill="#F5C518" stroke="#C99A00" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="6" r="3" fill="#E35D3A"/><circle cx="42" cy="10" r="2.5" fill="#2F6FB3"/><circle cx="78" cy="10" r="2.5" fill="#2F6FB3"/><text x="110" y="44" font-size="18" font-family="Arial" text-anchor="middle">⭐</text><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'ia'){ // Intelligence artificielle : la petite robote et son antenne
      tete = ''; visage = yeux(false) + joues + bouche;
      extra = `<path d="M60 26 V10" stroke="#5B6472" stroke-width="3"/><circle cx="60" cy="8" r="5.5" fill="#E35D3A" stroke="#9E2F1C" stroke-width="1.5"/><path d="M50 8 q-4 0 -6 -4 M70 8 q4 0 6 -4" stroke="#F5C518" stroke-width="2" fill="none" stroke-linecap="round"/><text x="110" y="42" font-size="18" font-family="Arial" text-anchor="middle">✨</text><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'cle'){ // Changer mon mot de passe
      extra = `<circle cx="108" cy="28" r="8" fill="none" stroke="#C99A00" stroke-width="4.5"/><path d="M106 36 L104 56 M104.5 46 h7 M104 51.5 h6" stroke="#C99A00" stroke-width="4" stroke-linecap="round"/><circle cx="105" cy="56" r="4.8" fill="${E}"/>`;
    } else if(p === 'bug'){ // Signaler un bug : la loupe sur une petite coccinelle
      bras = brasG + `<path d="M93 72 q10 -2 14 -10" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      extra = `<path d="M108 62 L114 74" stroke="#5B3A1A" stroke-width="5" stroke-linecap="round"/><circle cx="104" cy="48" r="13" fill="#CFEFFF" fill-opacity=".7" stroke="#1F3A5C" stroke-width="3.5"/><ellipse cx="104" cy="49" rx="6" ry="5" fill="#D3302F"/><path d="M104 44 V54" stroke="#1C1B2E" stroke-width="1.2"/><circle cx="101.5" cy="48" r="1.2" fill="#1C1B2E"/><circle cx="106.5" cy="50" r="1.2" fill="#1C1B2E"/><circle cx="104" cy="43.5" r="2" fill="#1C1B2E"/><circle cx="108" cy="63" r="4.5" fill="${E}"/>`;
    } else if(p === 'aurevoir'){ // Se déconnecter : elle fait au revoir
      bras = brasG + `<path d="M93 66 q14 -10 14 -32" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      extra = `<circle cx="107" cy="31" r="5.5" fill="${E}"/><path d="M114 22 q4 4 3 9 M118 18 q6 6 4 14" stroke="#8A8F98" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    } else { // savante grecque : couronne de laurier, compas tenu par sa tête
      tete = ''; // la couronne est dessinée par-dessus le corps (dans extra)
      const laurier = [-4, -3, -2, -1, 1, 2, 3, 4].map(k => `<ellipse cx="${60 + k * 8}" cy="${28 + Math.abs(k) * 2.2}" rx="5" ry="2.6" fill="#6DBB4A" stroke="#2E7D32" stroke-width="1" transform="rotate(${k * 14} ${60 + k * 8} ${28 + Math.abs(k) * 2.2})"/>`).join('');
      visage = yeux(false) + joues + sourire;
      bras = brasG + `<path d="M93 66 q12 -8 13 -30" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      extra = laurier + `<path d="M106 30 L97 60 M106 30 L117 58" stroke="#5B6472" stroke-width="3" stroke-linecap="round"/><path d="M97 60 l-1 4" stroke="#1C1B2E" stroke-width="2"/><path d="M117 58 l1 4" stroke="#E35D3A" stroke-width="2.5"/><circle cx="106" cy="25" r="3.5" fill="#5B6472"/><circle cx="106" cy="33" r="4.8" fill="${E}"/>`;
    }
  } else if(p === 'quiz'){ // point d'interrogation, main au menton
    bras += `<path d="M93 76 q4 10 -12 14" stroke="${E}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="80" cy="90" r="4.5" fill="${E}"/>`;
    extra = `<text x="104" y="40" font-size="36" font-weight="800" fill="#E35D3A" font-family="Arial, sans-serif" text-anchor="middle">?</text>`;
    visage = yeux(true) + joues + sourire;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${tete}${corps}${bras}${visage}${extra}</svg>`;
}
const OLIV_POSES = ['savoir', 'methode', 'muscle', 'histoire', 'quiz', 'cm2', 'defi'];
// Menu L'Atelier : une Oliv'IA par entrée à la place des icônes -- demandé : « On peut la décliner sur d'autres
// entrées et remplacer les icônes Google par des Oliv'IA ».
// Menu « L'Atelier du prof » : mêmes Oliv'IA sans lunettes, en olives de couleurs variées ; le sous-menu
// « Évaluations » reste sans vignette (choix : « sans icône pour les sous-menus »).
// Couleurs variées aussi dans le menu L'Atelier -- demandé : « varie aussi les couleurs dans le menu L'Atelier ».
const OLIV_MENU = { cm: ['muscle', 'verte'], compte: ['jeux', 'noire'], convertisseur: ['regle', 'doree'], 'figure-sandbox': ['equerre', 'cuivree'], tableau: ['tableau', 'verte'], programmation: ['blocs', 'noire'], 'histoire-maths': ['savante', 'doree'],
  correction: ['correction', 'verte'], evaluation: ['evaluation', 'noire'], devoirsprof: ['devoirs', 'doree'], questionnaires: ['interro', 'cuivree'], supervision: ['classe', 'verte'],
  sessions: ['session', 'noire'], progression: ['calendrier', 'doree'], classe: ['outils', 'cuivree'], simulateur: ['simulateur', 'verte'] };
function olivMenu(){
  document.querySelectorAll('#navDropdownEntrainer .nav-dropdown-menu button[data-nav], #navCorrection .nav-dropdown-menu button[data-nav]').forEach(b => {
    const m = OLIV_MENU[b.dataset.nav], g = b.querySelector(':scope > .gicon'); if(!m || !g) return;
    const [pose, teinte] = Array.isArray(m) ? m : [m];
    const o = document.createElement('span'); o.className = 'oliv-menu'; o.setAttribute('aria-hidden', 'true'); o.style.backgroundImage = olivPoseUrl(pose, teinte); g.replaceWith(o);
  });
}
// Menu « Mon compte » (personne connectée) : on reconnaît chaque bouton à l'action qu'il lance.
const OLIV_COMPTE = [['openAbonnement', 'couronne', 'doree'], ['openIaPage', 'ia', 'verte'], ['openChangePasswordModal', 'cle', 'noire'], ['openBugReportModal', 'bug', 'cuivree'], ['globalSignOut', 'aurevoir', 'verte']];
function olivCompte(){
  document.querySelectorAll('#accountLoggedIn button[onclick]').forEach(b => {
    if(b.querySelector('.oliv-compte')) return;
    const m = OLIV_COMPTE.find(([f]) => b.getAttribute('onclick').includes(f)); if(!m) return;
    const o = document.createElement('span'); o.className = 'oliv-compte'; o.setAttribute('aria-hidden', 'true'); o.style.backgroundImage = olivPoseUrl(m[1], m[2]);
    const g = b.querySelector(':scope > .gicon'); if(g) g.replaceWith(o); else b.prepend(o);
  });
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { olivMenu(); olivCompte(); }); else { olivMenu(); olivCompte(); }
// La même Oliv'IA dans le titre de la page ouverte par le menu -- demandé : « Reprends aussi les Oliv'IA des menus
// sur les pages correspondantes ».
const OLIV_PAGES = { 'view-cm': 'cm', 'view-compte': 'compte', 'view-convertisseur': 'convertisseur', 'view-tableau': 'tableau', 'view-programmation': 'programmation',
  'view-frise': 'histoire-maths', 'view-correction': 'correction', 'view-evaluation': 'evaluation', 'view-devoirs-prof': 'devoirsprof', 'view-qz-banque': 'questionnaires',
  'view-supervision': 'supervision', 'view-sessions': 'sessions', 'view-progression': 'progression', 'view-classe': 'classe', 'view-simulateur': 'simulateur' };
function olivTitre(id){
  const m = OLIV_MENU[OLIV_PAGES[id]], v = document.getElementById(id); if(!m || !v) return;
  const h = v.querySelector('h1, h2'); if(!h || h.querySelector('.oliv-titre')) return;
  const [pose, teinte] = Array.isArray(m) ? m : [m];
  const o = document.createElement('span'); o.className = 'oliv-titre'; o.setAttribute('aria-hidden', 'true'); o.style.backgroundImage = olivPoseUrl(pose, teinte);
  const g = h.querySelector(':scope > .gicon'); if(g) g.replaceWith(o); else h.prepend(o);
}
// Un observateur par page : la vignette se pose dès que le titre apparaît (même construit après chargement des données).
function olivTitresObserver(){
  Object.keys(OLIV_PAGES).forEach(id => { const v = document.getElementById(id); if(!v) return; olivTitre(id); new MutationObserver(() => olivTitre(id)).observe(v, { childList: true, subtree: true }); });
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', olivTitresObserver); else olivTitresObserver();
function olivPoseUrl(p, teinte){ return `url("data:image/svg+xml,${encodeURIComponent(olivPoseSvg(p, teinte))}")`; }

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
      else if(l && l.textContent.trim() === '+'){ h.classList.add('oliv-sh', 'oliv-sh-plus'); h.dataset.oliv = h.dataset.olivPlus || 'Pour aller plus loin !'; }
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
    /* Menu L'Atelier : Oliv'IA à la place des icônes (olivMenu) */
    .oliv-menu{display:inline-block;width:40px;height:40px;background:center/contain no-repeat;vertical-align:middle;margin:-10px 4px -8px -6px;flex:none;}
    .oliv-compte{display:inline-block;width:34px;height:34px;background:center/contain no-repeat;vertical-align:middle;margin:-9px 4px -8px -4px;flex:none;}
    .oliv-titre{display:inline-block;width:80px;height:80px;background:center/contain no-repeat;vertical-align:middle;margin:-10px 8px -14px -8px;flex:none;}
    .oliv-deco .oliv-sh.oliv-sh-plus{--oliv-img:${olivPoseUrl('cm2')};}
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
    /* Cahier : jours qui contiennent du cours (app.js, nbOlivCours) */
    .nb-oliv-cours{display:inline-flex;align-items:center;gap:4px;margin-left:4px;vertical-align:middle;}
    .nb-oliv-cours::before{content:'';width:34px;height:34px;margin:-10px 0;flex:none;background:${olivPoseUrl('savoir')} no-repeat center/contain;}
    .nb-oliv-cours::after{content:'Cours !';white-space:nowrap;background:#fff;color:#3E5A1E;border:2px solid #8DB84A;border-radius:10px 10px 10px 3px;padding:0 8px;font:700 .72rem 'Space Grotesk',sans-serif;line-height:1.5;}
    @media (max-width:560px){ .oliv-deco .oliv-b::after{display:none;} .oliv-deco .oliv-sh::after{display:none;} }
    @media (max-width:560px){ .nb-oliv-cours::after{display:none;} }
    @media print{ .nb-oliv-cours{display:none !important;} }
    @media print{ .oliv-deco .oliv-b::before, .oliv-deco .oliv-b::after, .oliv-deco .oliv-sh::before, .oliv-deco .oliv-sh::after, .oliv-deco .oliv-haut::before{display:none !important;} .oliv-deco .oliv-b{margin-top:0;} }
  `;
  document.head.appendChild(st);
})();
