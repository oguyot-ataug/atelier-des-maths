/* =====================================================================
   homophones.js -- Homophones grammaticaux (L'Atelier du Prof, professeurs de français et des écoles).

   Demandé : « Go pour les homophones ». Comme la conjugaison (conjugaison.js) : dans l'éditeur d'une
   interrogation, le professeur coche les séries vues en classe (a / à, et / est, ces / ses…), choisit les
   formes de questions et le nombre de phrases, et les questions s'ajoutent à l'interrogation.
   Chaque série : ses mots, une astuce (montrée à l'élève avec la correction) et une banque de phrases où
   {mot} marque le trou (avec sa majuscule en début de phrase). Accent exigé à la correction, pas la majuscule.
   ===================================================================== */

const HOMOPHONES = [
  { id: 'a', niv: 'CE', mots: ['a', 'as', 'à'],
    astuce: '**a**, **as** : verbe avoir, on peut dire « avait », « avais ». **à** ne peut pas être remplacé par « avait ».',
    phrases: ['Léa {a} un petit chat.', 'Tu {as} oublié ton cahier.', 'Nous allons {à} la piscine.', 'Mon frère {a} dix ans.',
      'Elle pense {à} ses vacances.', 'Tu {as} de la chance !', 'Il {a} mal {à} la tête.', 'Le train part {à} huit heures.',
      'Ma tante habite {à} Lyon.', 'Est-ce que tu {as} faim ?', 'Il {a} mangé une pomme.', 'Je donne un livre {à} mon cousin.',
      'Tu {as} gagné la course.', 'Ce stylo {a} perdu son bouchon.', 'On joue {à} cache-cache.', 'Elle {a} une robe rouge.',
      'Tu {as} un joli dessin.', 'C\'est une tarte {à} la fraise.'] },
  { id: 'et', niv: 'CE', mots: ['et', 'est', 'es'],
    astuce: '**est**, **es** : verbe être, on peut dire « était », « étais ». **et** relie deux mots ou deux idées : on peut dire « et puis ».',
    phrases: ['Le ciel {est} bleu.', 'Tu {es} en retard.', 'J\'ai un chien {et} un chat.', 'Mon père {est} cuisinier.',
      'Tu {es} très gentille.', 'Il mange du pain {et} du fromage.', 'La porte {est} fermée.', 'Où {es}-tu ?',
      'Elle chante {et} elle danse.', 'Ce gâteau {est} délicieux.', 'Tu {es} mon meilleur ami.', 'Il fait froid {et} il neige.',
      'Mon cartable {est} lourd.', 'Paul {et} Lina jouent ensemble.', 'Tu {es} arrivé le premier.', 'L\'eau {est} trop froide.'] },
  { id: 'son', niv: 'CE', mots: ['son', 'sont'],
    astuce: '**sont** : verbe être, on peut dire « étaient ». **son** : on peut dire « mon » ou « ton ».',
    phrases: ['Les enfants {sont} dans la cour.', 'Il range {son} cartable.', 'Mes parents {sont} au travail.', 'Elle a perdu {son} écharpe.',
      'Les fleurs {sont} fanées.', 'Le chien mange dans {son} bol.', 'Ils {sont} partis en vacances.', 'Mon voisin lave {son} vélo.',
      'Ces gâteaux {sont} délicieux.', 'Le pilote écoute {son} moteur.', 'Les élèves {sont} attentifs.', 'Tom prête {son} ballon.',
      'Où {sont} mes lunettes ?', 'Elle appelle {son} amie.', 'Les routes {sont} glissantes.', '{Son} frère est très grand.'] },
  { id: 'on', niv: 'CE', mots: ['on', 'ont'],
    astuce: '**ont** : verbe avoir, on peut dire « avaient ». **on** : on peut dire « il ».',
    phrases: ['{On} part demain matin.', 'Ils {ont} faim.', 'Mes amis {ont} un chien.', '{On} joue au ballon.',
      'Les oiseaux {ont} construit un nid.', 'Demain, {on} ira à la plage.', 'Elles {ont} raison.', '{On} entend la pluie.',
      'Les élèves {ont} fini leur travail.', 'Ici, {on} parle français.', 'Mes cousins {ont} gagné le match.', '{On} frappe à la porte.',
      'Ils {ont} mangé toute la tarte.', 'Le soir, {on} lit une histoire.', 'Les arbres {ont} perdu leurs feuilles.', 'Est-ce qu\'{on} peut entrer ?'] },
  { id: 'ou', niv: 'CE', mots: ['ou', 'où'],
    astuce: '**ou** : on peut dire « ou bien ». **où** indique un lieu (ou un moment) : « Où vas-tu ? »',
    phrases: ['{Où} vas-tu ?', 'Veux-tu du lait {ou} du jus ?', 'La ville {où} j\'habite est petite.', 'Tu viens {ou} tu restes ?',
      '{Où} as-tu mis mes clés ?', 'Je prendrai le bus {ou} le train.', 'C\'est la maison {où} je suis né.', 'Rouge {ou} bleu, je ne sais pas.',
      'Je ne sais pas {où} il est.', 'On joue dehors {ou} dedans ?', 'Le jour {où} il est arrivé, il pleuvait.', 'Il viendra lundi {ou} mardi.',
      'D\'{où} viens-tu ?', 'Prends un crayon {ou} un stylo.', 'Voici le parc {où} nous jouons.', 'Pile {ou} face ?'] },
  { id: 'ces', niv: 'CE', mots: ['ces', 'ses'],
    astuce: '**ses** : les siens, les siennes (à lui, à elle) ; on peut dire « mes ». **ces** montre : on peut dire « ces … -là ».',
    phrases: ['Le chat lèche {ses} pattes.', 'Regarde {ces} nuages noirs, là-bas !', 'Lucas a oublié {ses} lunettes chez lui.', '{Ces} fleurs sentent bon.',
      'Chaque matin, Inès brosse {ses} dents.', 'Qui a laissé {ces} chaussures ici ?', 'Le roi parle à {ses} soldats.', 'Tu vois {ces} oiseaux sur le toit ?',
      'Elle range {ses} jouets dans sa chambre.', '{Ces} gâteaux-là sont au chocolat.', 'Le professeur corrige {ses} copies.', 'Je n\'aime pas {ces} bonbons-là.',
      'Mon frère prête {ses} livres à ses amis.', 'Combien coûtent {ces} pommes ?', 'La poule protège {ses} poussins.', '{Ces} montagnes sont très hautes.'] },
  { id: 'ce', niv: 'CE', mots: ['ce', 'se'],
    astuce: '**se** se place devant un verbe : se laver, je me lave. **ce** se place devant un nom (ce chien-là) ou dans « ce que », « ce qui ».',
    phrases: ['Il {se} lave les mains.', '{Ce} chien est très gentil.', 'Ils {se} parlent tous les jours.', '{Ce} matin, il fait beau.',
      'Elle {se} coiffe devant le miroir.', 'Je mange {ce} que j\'aime.', 'Le chat {se} cache sous le lit.', '{Ce} livre est passionnant.',
      'Les enfants {se} lèvent tôt.', 'Dis-moi {ce} qui ne va pas.', 'Il {se} promène dans le parc.', '{Ce} gâteau est pour toi.',
      'Elles {se} disputent souvent.', 'Regarde {ce} bateau !', 'Le soleil {se} couche.', '{Ce} soir, on mange des crêpes.'] },
  { id: 'mes', niv: 'CE', mots: ['mes', 'mais', 'met', 'mets'],
    astuce: '**mais** : on peut dire « pourtant ». **mes** : à moi, on peut dire « tes ». **met**, **mets** : verbe mettre, on peut dire « mettait ».',
    phrases: ['{Mes} amis arrivent ce soir.', 'Il pleut, {mais} je sors quand même.', 'Il {met} son manteau.', 'Je {mets} la table.',
      'J\'ai rangé {mes} affaires.', 'Elle est petite {mais} rapide.', 'Tu {mets} ton bonnet ?', 'Papa {met} du sel dans la soupe.',
      '{Mes} chaussures sont mouillées.', 'Je voudrais venir, {mais} je suis malade.', 'Je {mets} mon pyjama.', 'Où sont {mes} lunettes ?',
      'Elle {met} ses bottes.', 'C\'est bon, {mais} c\'est trop sucré.', 'Tu {mets} tes gants.', 'J\'invite {mes} cousins.'] },
  { id: 'la', niv: 'CE', mots: ['la', 'là', "l'a", "l'as"],
    astuce: '**là** : à cet endroit (on peut dire « ici »). **l\'a**, **l\'as** : on peut dire « l\'avait », « l\'avais ». **la** : devant un nom (la porte) ou un verbe (je la vois).',
    phrases: ['Je suis {là} !', '{La} porte est ouverte.', 'Ce livre, il {l\'a} déjà lu.', 'Ton dessin, tu {l\'as} fini ?',
      'Pose ton sac {là}.', 'Je {la} vois au fond de la cour.', 'Le ballon ? Paul {l\'a} perdu.', 'Ce gâteau, tu {l\'as} goûté ?',
      '{La} neige tombe.', 'Il est {là}, derrière l\'arbre.', 'Sa voiture, il {l\'a} lavée hier.', 'Ta chambre, tu {l\'as} rangée ?',
      'Ma sœur ? Je {la} cherche partout.', 'Ce film, elle {l\'a} adoré.', 'Mets-toi {là}.', '{La} maîtresse explique la leçon.'] },
  { id: 'leur', niv: 'CM', mots: ['leur', 'leurs'],
    astuce: 'Devant un verbe, **leur** (= à eux, à elles) ne prend jamais de s. Devant un nom : **leur** au singulier, **leurs** au pluriel.',
    phrases: ['Je {leur} parle.', 'Les enfants rangent {leurs} jouets.', 'Les voisins ont vendu {leur} maison.', 'Le maître {leur} donne un exercice.',
      'Les oiseaux nourrissent {leurs} petits.', 'Ils ont oublié {leurs} cahiers.', 'Mes parents adorent {leur} jardin.', 'Je {leur} ai écrit une lettre.',
      'Les joueurs écoutent {leur} entraîneur.', 'Elles ont mis {leurs} manteaux.', 'Nous {leur} prêtons nos vélos.', 'Les élèves ouvrent {leurs} livres.',
      'Les chats dorment dans {leur} panier.', 'Dis-{leur} de venir.', 'Les filles promènent {leurs} chiens.', 'Ils ont retrouvé {leur} chemin.'] },
  { id: 'er', niv: 'CM', mots: ['é', 'er', 'ez'],
    astuce: 'Remplace par « vendre », « vendu » ou « vendez » : **-er** si on peut dire « vendre » ; **-é** si on peut dire « vendu » ; **-ez** avec « vous » (« vendez »).',
    phrases: ['Il va mang{er} une pomme.', 'Il a mang{é} sa soupe.', 'Vous mang{ez} à la cantine.', 'Je dois termin{er} mon travail.',
      'Elle a termin{é} son dessin.', 'Vous termin{ez} à quelle heure ?', 'Il faut ferm{er} la porte.', 'La porte est ferm{é}e.',
      'Vous ferm{ez} les fenêtres.', 'J\'aime dessin{er}.', 'Nous avons dessin{é} un château.', 'Vous dessin{ez} très bien.',
      'Il commence à neig{er}.', 'Le chat a sauté sur la table et a renvers{é} le verre.', 'Pouvez-vous m\'aid{er} ?', 'Vous chant{ez} faux !',
      'J\'ai trouv{é} un trésor.', 'Elle vient de rentr{er}.'] },
  { id: 'cest', niv: 'CM', mots: ["c'est", "s'est", 'ces', 'ses'],
    astuce: '**c\'est** : on peut dire « cela est ». **s\'est** : devant un participe passé, avec un verbe pronominal (il s\'est levé : se lever). **ses** : à lui, à elle. **ces** : ces … -là.',
    phrases: ['{C\'est} mon meilleur ami.', 'Il {s\'est} levé tôt.', 'Elle {s\'est} trompée de route.', '{C\'est} l\'heure de partir.',
      'Le chat {s\'est} caché sous le lit.', 'Il range {ses} affaires.', 'Regarde {ces} étoiles !', '{C\'est} trop difficile.',
      'Mon frère {s\'est} cassé le bras.', 'Elle a retrouvé {ses} clés.', '{C\'est} toi qui as gagné.', 'La neige {s\'est} mise à tomber.',
      '{Ces} chaussures sont trop petites.', 'Il {s\'est} endormi en classe.', '{C\'est} une bonne idée.', 'Il a rangé {ses} crayons.'] },
  { id: 'sa', niv: 'CM', mots: ['ça', 'sa'],
    astuce: '**ça** : on peut dire « cela ». **sa** : à lui, à elle ; on peut dire « ma ».',
    phrases: ['{Ça} ne fait rien.', 'Il prend {sa} veste.', 'Regarde {ça} !', 'Elle téléphone à {sa} grand-mère.',
      'Comment {ça} va ?', 'Il a rangé {sa} chambre.', '{Ça} sent bon !', 'Ma voisine promène {sa} chienne.',
      'Je n\'aime pas {ça}.', 'Le roi est sur {sa} chaise.', '{Ça} y est, j\'ai fini !', 'Tom a perdu {sa} montre.',
      'C\'est {ça}, bravo !', 'Elle lave {sa} voiture.', 'Donne-moi {ça}.', 'Il fête {sa} victoire.'] },
  { id: 'peu', niv: 'CM', mots: ['peu', 'peut', 'peux'],
    astuce: '**peut**, **peux** : verbe pouvoir, on peut dire « pouvait », « pouvais » (je peux, tu peux, il peut). **peu** : pas beaucoup.',
    phrases: ['Il {peut} venir demain.', 'Je {peux} t\'aider.', 'Il reste un {peu} de pain.', 'Tu {peux} entrer.',
      'Elle mange très {peu}.', 'On {peut} jouer dehors ?', 'Je {peux} lire seul.', 'Attends un {peu} !',
      'Ce chien {peut} courir vite.', 'Tu {peux} me prêter ta gomme ?', 'Il a {peu} d\'amis.', 'Maman {peut} nous emmener.',
      'Je suis un {peu} fatigué.', 'Est-ce que je {peux} sortir ?', 'Il {peut} pleuvoir ce soir.', '{Peu} à {peu}, il apprend.'] },
  { id: 'quel', niv: 'Collège', mots: ['quel', 'quels', 'quelle', 'quelles', "qu'elle", "qu'elles"],
    astuce: '**qu\'elle(s)** : on peut dire « qu\'il(s) ». Sinon, **quel** s\'accorde avec le nom : quel jour, quels livres, quelle heure, quelles couleurs.',
    phrases: ['{Quelle} heure est-il ?', 'Je pense {qu\'elle} viendra.', '{Quels} livres as-tu lus ?', 'Je sais {qu\'elles} sont parties.',
      '{Quel} beau temps !', '{Quelles} couleurs préfères-tu ?', 'Il faut {qu\'elle} se repose.', '{Quel} jour sommes-nous ?',
      'Je crois {qu\'elles} ont raison.', '{Quelle} belle surprise !', 'Dans {quels} pays es-tu allé ?', 'Il dit {qu\'elle} est malade.',
      '{Quelles} sont tes chansons préférées ?', 'J\'espère {qu\'elles} viendront.', '{Quel} est ton prénom ?', 'Je veux {qu\'elle} gagne.'] },
  { id: 'tout', niv: 'CM', mots: ['tout', 'tous', 'toute', 'toutes'],
    astuce: 'Devant un nom, il s\'accorde : **tout** le, **toute** la, **tous** les, **toutes** les.',
    phrases: ['{Tous} les élèves sont là.', '{Toute} la classe applaudit.', '{Tout} le monde est content.', '{Toutes} les filles chantent.',
      'Il a mangé {tout} le gâteau.', 'Je lis {tous} les soirs.', 'Elle a rangé {toutes} ses affaires.', 'Il a plu {toute} la journée.',
      '{Tous} mes amis sont venus.', 'J\'ai bu {toute} la bouteille.', '{Toutes} les fenêtres sont ouvertes.', 'Il connaît {tout} le quartier.',
      'Les garçons partent {tous} ensemble.', 'Il a {tout} compris.', '{Toute} la ville dort.', 'J\'ai fait {tous} mes devoirs.'] },
  { id: 'pret', niv: 'CM', mots: ['près', 'prêt', 'prête', 'prêts', 'prêtes'],
    astuce: '**près** (de) : proche, à côté (le contraire de « loin »). **prêt** : préparé, il s\'accorde : prête, prêts, prêtes.',
    phrases: ['J\'habite {près} de l\'école.', 'Paul est {prêt} à partir.', 'Elle est {prête} pour le spectacle.', 'Les joueurs sont {prêts} !',
      'Viens {près} de moi.', 'Les filles sont {prêtes}.', 'Le repas est {prêt}.', 'Il y a une boulangerie tout {près}.',
      'Les garçons, êtes-vous {prêts} ?', 'Ne t\'approche pas trop {près} du feu.', 'La soupe est {prête}.', 'Les valises sont {prêtes}.',
      'Il s\'est assis {près} de la fenêtre.', 'Mon frère n\'est jamais {prêt} à l\'heure.', 'Les gâteaux sont {prêts}.', 'Il était {près} de la victoire.'] },
  { id: 'plutot', niv: 'CM', mots: ['plus tôt', 'plutôt'],
    astuce: '**plus tôt** : le contraire de « plus tard ». **plutôt** : de préférence, ou « assez ».',
    phrases: ['Lève-toi {plus tôt} demain.', 'Prends {plutôt} le bus.', 'Il fait {plutôt} froid ce matin.', 'Le film commence {plus tôt} que prévu.',
      'Je préfère jouer dehors {plutôt} que regarder la télé.', 'Viens {plus tôt}, s\'il te plaît.', 'C\'est {plutôt} facile.', 'Il est arrivé {plus tôt} que moi.',
      'Bois {plutôt} de l\'eau.', 'Nous partirons {plus tôt} cette année.', 'Elle est {plutôt} timide.', 'Si j\'avais su, je serais venu {plus tôt}.',
      'Mange {plutôt} une pomme.', 'Couche-toi {plus tôt} ce soir.'] },
  { id: 'sans', niv: 'Collège', mots: ['sans', "s'en"],
    astuce: '**s\'en** : se + en, on peut dire « m\'en », « t\'en » (il s\'en va, je m\'en vais). **sans** : le contraire de « avec ».',
    phrases: ['Il part {sans} son sac.', 'Il {s\'en} va.', 'Elle {s\'en} souvient très bien.', 'Je bois mon thé {sans} sucre.',
      'Il est sorti {sans} manteau.', 'Elle {s\'en} moque.', 'Ils {s\'en} occupent.', 'Il travaille {sans} bruit.',
      'Le chat {s\'en} est allé.', '{Sans} toi, je suis perdu.', 'Elle {s\'en} sert tous les jours.', 'Il a réussi {sans} aide.',
      'Il {s\'en} est fallu de peu.', 'Je ne pars jamais {sans} mon livre.'] },
  { id: 'dans', niv: 'Collège', mots: ['dans', "d'en"],
    astuce: '**d\'en** : de + en (« Je viens d\'en manger » : de cela). **dans** indique le lieu ou le temps (dans la boîte, dans une heure).',
    phrases: ['Il est {dans} sa chambre.', 'Je viens {d\'en} parler.', 'Range tes jouets {dans} la boîte.', 'Il refuse {d\'en} manger.',
      'Nous partons {dans} une heure.', 'Il vient {d\'en} acheter trois.', 'Le chat dort {dans} le panier.', 'Il est temps {d\'en} finir.',
      'Je l\'ai lu {dans} un livre.', 'Elle a peur {d\'en} manquer.', 'Il y a du lait {dans} le frigo.', 'Il est fier {d\'en} avoir trouvé.',
      '{Dans} la forêt vivent des cerfs.', 'J\'ai envie {d\'en} reprendre.'] },
  { id: 'si', niv: 'Collège', mots: ['si', "s'y", 'ni', "n'y"],
    astuce: '**s\'y** : se + y, on peut dire « m\'y », « t\'y » (il s\'y rend). **n\'y** : ne + y (il n\'y a pas). **si** : une condition, ou « tellement ». **ni** relie deux négations (ni … ni).',
    phrases: ['{Si} tu veux, viens avec nous.', 'Il {s\'y} rend chaque matin.', 'Il {n\'y} a personne.', 'Je n\'aime ni le froid {ni} la pluie.',
      'Elle est {si} gentille !', 'Elle {s\'y} est habituée.', 'Je {n\'y} pense plus.', 'Il ne boit {ni} thé ni café.',
      '{Si} tu as faim, mange une pomme.', 'Ce jardin est beau : on {s\'y} promène souvent.', 'Tu {n\'y} es pour rien.', 'Il n\'est {ni} grand ni petit.',
      'Il {s\'y} attendait.', 'Je {n\'y} crois pas.', 'Il fait {si} chaud !', 'Il {n\'y} va jamais.'] },
  { id: 'quand', niv: 'Collège', mots: ['quand', 'quant', "qu'en"],
    astuce: '**quand** : lorsque, ou question sur le moment. **quant à** : en ce qui concerne. **qu\'en** : que + en (« Qu\'en penses-tu ? »).',
    phrases: ['{Quand} arrives-tu ?', '{Quant} à moi, je reste ici.', '{Qu\'en} penses-tu ?', 'Je partirai {quand} tu seras prêt.',
      '{Quant} aux enfants, ils jouent dehors.', 'Il ne sort {qu\'en} été.', '{Quand} il pleut, je lis.', 'Je ne voyage {qu\'en} train.',
      '{Quant} à ton frère, il viendra demain.', 'Dis-moi {quand} tu as fini.', '{Qu\'en} sais-tu ?', 'Il sourit {quand} il me voit.',
      '{Quant} à la date, elle n\'est pas fixée.', 'Il ne parle {qu\'en} anglais.'] },
];

const HO_NIV = { CE: 'Dès le CE', CM: 'Dès le CM', 'Collège': 'Collège' };
const hoEsc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hoMel = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hoOu = l => l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' ou ' + l[l.length - 1];
const hoGuil = m => `« ${m} »`;
// Trous d'une phrase, dans l'ordre : [{ affiche, mot }] (mot = la forme de la série, en minuscules).
function hoTrous(s, phrase){
  const t = []; phrase.replace(/\{([^}]+)\}/g, (_, x) => { t.push({ affiche: x, mot: s.mots.find(m => m.toLowerCase() === x.toLowerCase()) }); return ''; });
  return t;
}
// Une terminaison (é / er / ez) est collée au mot : son trou n'a pas d'espace autour.
const hoSuffixe = s => s.id === 'er';

/* Questions au format de l'éditeur d'interrogations. */
function hoQuestions(s, phrases, forme){
  const consigne = hoSuffixe(s) ? `Complète avec la bonne terminaison : ${hoOu(s.mots.map(m => '-' + m))}.` : `Complète avec ${hoOu(s.mots.map(hoGuil))}.`;
  const trous = ph => ph.replace(/\{([^}]+)\}/g, (_, x) => `[[${x}]]`);
  const nouv = type => { const q = qzEdNouvelle(type); q.points = 1; q.explication = s.astuce; return q; };
  if(forme === 'serie'){
    const q = nouv('trous');
    q.enonce = consigne; q.trous_source = phrases.map(trous).join('\n'); q.casse = 'accents';
    q.points = phrases.length >= 4 ? 2 : 1;
    return [q];
  }
  if(forme === 'phrase') return phrases.map(ph => { const q = nouv('trous'); q.enonce = consigne; q.trous_source = trous(ph); q.casse = 'accents'; return q; });
  // QCM : une phrase à un seul trou ; les propositions sont les mots de la série (4 au plus : cartes A B C D).
  return phrases.filter(ph => hoTrous(s, ph).length === 1).map(ph => {
    const juste = hoTrous(s, ph)[0].mot, q = nouv('qcm');
    const autres = hoMel(s.mots.filter(m => m !== juste)).slice(0, 3);
    q.enonce = `${hoSuffixe(s) ? 'Choisis la bonne terminaison' : 'Choisis le mot qui convient'} : « ${ph.replace(/\{[^}]+\}/, '___')} »`;
    q.choix = hoMel([juste, ...autres]).map(m => ({ id: qzId(), texte: hoSuffixe(s) ? '-' + m : m, correct: m === juste }));
    q.multiple = false;
    return q;
  });
}

/* Fenêtre « Homophones », ouverte depuis l'éditeur d'interrogation. */
const HO_FORMES = [
  ['serie', 'Phrases à compléter (une question par série)'],
  ['phrase', 'Une phrase par question'],
  ['qcm', 'QCM (jouable avec les cartes A B C D)'],
];
function hoMemo(){ const m = typeof currentUser !== 'undefined' && currentUser && currentUser.user_metadata; return (m && m.homophones) || {}; }
async function hoMemoriser(st){
  try{
    const { data } = await sb.auth.updateUser({ data: { homophones: { s: [...st.sel], nb: st.nb, f: st.formes } } });
    if(data && data.user) currentUser = data.user;
  }catch(e){ /* la sélection reste valable pour cette génération */ }
}
function hoOuvrir(){
  const memo = hoMemo();
  const st = { sel: new Set(memo.s || []), nb: memo.nb || 6, formes: Object.assign({ serie: true, phrase: false, qcm: false }, memo.f || {}), voir: null };
  let o = document.getElementById('hoOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'hoOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o);
    o.addEventListener('click', ev => { if(ev.target === o) o.style.display = 'none'; }); }
  const nbFormes = () => HO_FORMES.filter(f => st.formes[f[0]]).length;
  const combien = () => [...st.sel].reduce((n, id) => {
    const s = HOMOPHONES.find(x => x.id === id), k = Math.min(st.nb, s.phrases.length);
    return n + (st.formes.serie ? 1 : 0) + (st.formes.phrase ? k : 0) + (st.formes.qcm ? k : 0);
  }, 0);
  const rendre = () => {
    const n = combien();
    o.innerHTML = `<div class="modal-card ho">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon" style="color:#1F5FA8;vertical-align:-4px;">hearing</span> Homophones</b>
        <button class="modal-close" onclick="document.getElementById('hoOverlay').style.display='none'"><span class="gicon">close</span></button></div>
      <p class="hint" style="margin:6px 0 10px;">Cochez les séries vues en classe : votre sélection est retenue pour la prochaine fois. Les phrases sont tirées au hasard dans la banque de chaque série ; l'astuce de la série est montrée à l'élève avec la correction. L'accent est exigé, pas la majuscule.</p>
      <div class="ho-liste">${['CE', 'CM', 'Collège'].map(nv => `<div class="ho-niv"><b>${HO_NIV[nv]}</b>
        <div class="ho-ss">${HOMOPHONES.filter(s => s.niv === nv).map(s => `<span class="ho-s${st.sel.has(s.id) ? ' on' : ''}"><label><input type="checkbox" data-s="${s.id}"${st.sel.has(s.id) ? ' checked' : ''}> ${s.mots.map(hoEsc).join(' / ')}</label>
          <button type="button" class="ho-voir" data-voir="${s.id}" title="Voir l'astuce et les phrases">${st.voir === s.id ? '▴' : '▾'}</button></span>`).join('')}</div></div>`).join('')}</div>
      ${st.voir ? (s => `<div class="ho-apercu"><div class="hint" style="margin:0 0 4px;">${typeof renderMathText === 'function' ? renderMathText(s.astuce) : hoEsc(s.astuce)}</div>
        <ol>${s.phrases.map(ph => `<li>${hoEsc(ph).replace(/\{([^}]+)\}/g, '<u>$1</u>')}</li>`).join('')}</ol></div>`)(HOMOPHONES.find(x => x.id === st.voir)) : ''}
      <div class="ho-formes"><b>Questions :</b> ${HO_FORMES.map(([k, l]) => `<label><input type="checkbox" data-f="${k}"${st.formes[k] ? ' checked' : ''}> ${l}</label>`).join('')}</div>
      <div class="ho-pied"><label class="hint" style="margin:0;"><input type="number" id="hoNb" min="1" max="18" value="${st.nb}" style="width:60px;"> phrase(s) par série${nbFormes() > 1 ? ' et par type de question' : ''}</label>
        <span style="flex:1"></span><span class="hint" style="margin:0;">${st.sel.size} série(s) · ${n} question(s)</span>
        <button class="btn" id="hoOk"${n ? '' : ' disabled'}><span class="gicon">add</span> Ajouter les questions</button></div>
    </div>`;
    o.querySelectorAll('[data-s]').forEach(c => c.onchange = () => { if(c.checked) st.sel.add(c.dataset.s); else st.sel.delete(c.dataset.s); rendre(); });
    o.querySelectorAll('[data-voir]').forEach(b => b.onclick = () => { st.voir = st.voir === b.dataset.voir ? null : b.dataset.voir; rendre(); });
    o.querySelectorAll('[data-f]').forEach(c => c.onchange = () => { st.formes[c.dataset.f] = c.checked; rendre(); });
    const nb = o.querySelector('#hoNb'); nb.onchange = () => { st.nb = Math.max(1, Math.min(18, parseInt(nb.value, 10) || 1)); rendre(); };
    o.querySelector('#hoOk').onclick = async () => {
      const qs = [];
      HOMOPHONES.filter(s => st.sel.has(s.id)).forEach(s => {
        // Phrases tirées à tour de rôle entre les mots de la série (pas cinq « a » de suite), différentes d'un
        // type de question à l'autre tant que la banque le permet.
        let deja = new Set();
        const tirer = k => {
          const r = [];
          for(let tour = 0; tour < 2 && r.length < k; tour++){
            if(tour) deja = new Set(r);   // banque épuisée : on reprend des phrases déjà tirées pour un autre type
            const parMot = {};
            hoMel(s.phrases).filter(ph => !deja.has(ph) && !r.includes(ph)).forEach(ph => (parMot[hoTrous(s, ph)[0].mot] = parMot[hoTrous(s, ph)[0].mot] || []).push(ph));
            const listes = hoMel(Object.values(parMot));
            while(r.length < k && listes.some(l => l.length)) listes.forEach(l => { if(l.length && r.length < k) r.push(l.shift()); });
          }
          r.forEach(ph => deja.add(ph));
          return hoMel(r);
        };
        HO_FORMES.forEach(([f]) => { if(st.formes[f]) qs.push(...hoQuestions(s, tirer(Math.min(st.nb, s.phrases.length)), f)); });
      });
      if(!qs.length) return;
      if(!qzEd) qzEdReset();
      qzEd.questions.push(...qs);
      qzEdOuverte = null; qzEdRender();
      o.style.display = 'none';
      hoMemoriser(st);
      const ti = document.getElementById('qzfTitre'); if(ti && !ti.value.trim()) ti.value = 'Homophones';
      await niceAlert(`${qs.length} question${qs.length > 1 ? 's ajoutées' : ' ajoutée'} à l'interrogation, série par série (pour les mélanger : « Mélanger l'ordre des questions »). Relisez-les, puis donnez l'interrogation : en devoir, en entraînement ou en séance en direct.`);
    };
  };
  o.style.display = 'flex'; rendre();
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .ho{ max-width:780px; width:95vw; max-height:92vh; display:flex; flex-direction:column; overflow:auto; }
    .ho-liste{ display:grid; gap:8px; } .ho-niv > b{ font-size:.9rem; }
    .ho-ss{ display:flex; flex-wrap:wrap; gap:5px; margin-top:4px; }
    .ho-s{ display:inline-flex; align-items:center; border:1px solid rgba(28,43,57,.15); border-radius:999px; font-size:.88rem; overflow:hidden; }
    .ho-s label{ display:inline-flex; align-items:center; gap:5px; padding:4px 4px 4px 7px; cursor:pointer; }
    .ho-s.on{ background:#EAF1FA; border-color:#1F5FA8; }
    .ho-voir{ border:0; background:transparent; cursor:pointer; padding:4px 9px 4px 4px; color:var(--ink-soft); font-size:.8rem; }
    .ho-apercu{ margin-top:10px; padding:8px 12px; background:#F7F9FC; border-radius:10px; font-size:.86rem; max-height:220px; overflow:auto; }
    .ho-apercu ol{ margin:4px 0 0; padding-left:22px; columns:2 260px; } .ho-apercu u{ text-decoration-thickness:2px; color:#1F5FA8; }
    .ho-formes{ display:flex; flex-wrap:wrap; gap:6px 14px; align-items:center; margin:12px 0 0; font-size:.9rem; } .ho-formes label{ display:inline-flex; gap:5px; align-items:center; }
    .ho-pied{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:10px; }
  `;
  document.head.appendChild(st);
})();
