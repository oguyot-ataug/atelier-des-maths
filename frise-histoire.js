/* =====================================================================
   frise-histoire.js -- L'Atelier › Histoire des maths : une frise chronologique verticale des grandes avancées
   mathématiques, avec des vignettes de niveau (CE2… 3e) qui montrent quand on étudie la notion et ouvrent le
   chapitre. Demandé : « faire dans le menu atelier, un sous-menu Histoire qui montre une frise chronologique
   (horizontale ou verticale) avec les différentes avancées mathématiques. On pourra mettre des petites vignettes
   CE2, ..., 3 qui permettent aussi de visualiser quand on étudie la notion. »
   Vue #view-frise (index.html), route « histoire-maths » (router.js) ; hmRendre() construit la page.
   Les titres de chapitres doivent être ceux de CHCE2/CHCM1/CHCM2/CH6/CH5/CH4/CH3 (vérifiés au test).
   ===================================================================== */
const HM_NIV = { ce2: { lib: 'CE2', coul: '#7CB342', liste: () => typeof CHCE2 !== 'undefined' ? CHCE2 : [] },
  cm1: { lib: 'CM1', coul: '#2E7D32', liste: () => typeof CHCM1 !== 'undefined' ? CHCM1 : [] }, cm2: { lib: 'CM2', coul: '#00796B', liste: () => typeof CHCM2 !== 'undefined' ? CHCM2 : [] },
  '6e': { lib: '6e', coul: '#1565C0', liste: () => typeof CH6 !== 'undefined' ? CH6 : [] }, '5e': { lib: '5e', coul: '#C2410C', liste: () => typeof CH5 !== 'undefined' ? CH5 : [] },
  '4e': { lib: '4e', coul: '#00838F', liste: () => typeof CH4 !== 'undefined' ? CH4 : [] }, '3e': { lib: '3e', coul: '#7B1FA2', liste: () => typeof CH3 !== 'undefined' ? CH3 : [] } };
const HM_EPOQUES = [['prehistoire', 'Préhistoire et premières civilisations'], ['antiquite', 'Antiquité'], ['moyenage', 'Moyen Âge'], ['renaissance', 'Renaissance'], ['modernes', 'Temps modernes'], ['contemporain', 'Époque contemporaine']];
// [époque, date affichée, emoji, titre, texte, [[niveau, titre du chapitre], …], lieu (HM_LIEUX), lieu de départ éventuel (flèche sur la carte)]
const HM_EVTS = [
  ['prehistoire', 'vers −40 000', '🌗', 'L\'os de Lebombo', 'Dans les monts Lebombo, entre l\'Afrique du Sud et l\'Eswatini, un os de babouin porte 29 encoches : l\'un des plus vieux objets de comptage connus, peut-être pour suivre les jours de la Lune.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999']], 'lebombo'],
  ['prehistoire', 'vers −20 000', '🦴', 'Le bâton d\'Ishango', 'Retrouvé au Congo, cet os porte des encoches groupées : l\'un des plus anciens objets qui semblent servir à compter.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999']], 'ishango'],
  ['prehistoire', 'vers −3300', '🏺', 'Les premiers nombres écrits', 'En Mésopotamie, des jetons d\'argile puis des signes sur des tablettes servent à tenir les comptes : l\'écriture des nombres naît avec la comptabilité.', [['cm1', 'Nombres entiers jusqu\'à 9 999'], ['cm2', 'Grands nombres jusqu\'à 999 999 999']], 'uruk'],
  ['prehistoire', 'vers −2560', '🧱', 'Les pyramides et la coudée royale', 'Pour bâtir la pyramide de Khéops, à Gizeh, les Égyptiens mesurent tous avec la même unité, la coudée royale (environ 52 cm) : chaque côté de la base mesure 440 coudées.', [['ce2', 'Les longueurs'], ['cm1', 'Longueurs, masses, contenances'], ['cm2', 'Longueurs, masses, contenances']], 'gizeh'],
  ['prehistoire', 'vers −2000', '🕰️', 'Babylone compte par soixantaines', 'Les Babyloniens comptent par paquets de 60, alors que nous comptons par dizaines. Héritage : 60 minutes dans une heure, 60 secondes dans une minute, et le tour complet partagé en 360 degrés.', [['ce2', 'L\'heure et les durées'], ['cm1', 'Heures et durées'], ['cm2', 'Angles'], ['6e', 'Heures et durée'], ['6e', 'Angles et rapporteur']], 'babylone'],
  ['prehistoire', 'vers −1850', '🔻', 'Le papyrus de Moscou', 'Ce papyrus égyptien calcule le volume d\'une pyramide dont on a coupé la pointe : un calcul de volume vieux de près de 4 000 ans.', [['6e', 'Solides et volumes'], ['4e', 'Espace']], 'thebes'],
  ['prehistoire', 'vers −1800', '📐', 'La diagonale du carré', 'Une tablette babylonienne (YBC 7289) donne la longueur de la diagonale d\'un carré avec une précision étonnante : on connaît déjà la relation de Pythagore, plus de mille ans avant lui.', [['4e', 'Théorème de Pythagore']], 'babylone'],
  ['prehistoire', 'vers −1800', '✖️', 'Les tables de multiplication des scribes', 'À Nippur, en Mésopotamie, les élèves scribes recopient sur des tablettes d\'argile des tables de multiplication, qu\'ils apprennent par cœur.', [['ce2', 'Tables d\'addition et de multiplication'], ['cm1', 'Opérations sur les nombres entiers']], 'nippur'],
  ['prehistoire', 'vers −1650', '📜', 'Le papyrus Rhind', 'Le scribe égyptien Ahmès recopie 84 problèmes : partages, fractions, aires de champs, volumes de greniers. Les Égyptiens multiplient en doublant et en additionnant.', [['cm1', 'Fractions'], ['cm2', 'Multiplication'], ['6e', 'Fractions : nombres et partage']], 'thebes'],
  ['antiquite', 'vers −600', '🔺', 'Thalès', 'Le Grec Thalès aurait mesuré la hauteur d\'une pyramide grâce aux ombres et aux droites parallèles.', [['4e', 'Triangles et parallèles'], ['3e', 'Théorème de Thalès']], 'milet'],
  ['antiquite', 'vers −530', '🎵', 'Pythagore et son école', 'Né sur l\'île grecque de Samos, Pythagore part fonder son école à Crotone, une cité grecque du sud de l\'Italie. Pour les pythagoriciens, « tout est nombre » : ils étudient les nombres pairs et impairs, les accords de la musique et le célèbre théorème du triangle rectangle.', [['4e', 'Théorème de Pythagore']], 'crotone', 'samos'],
  ['antiquite', 'vers −300', '📚', 'Les Éléments d\'Euclide', 'À Alexandrie, Euclide rassemble la géométrie en 13 livres : définitions, propriétés, démonstrations. Il prouve aussi qu\'il existe une infinité de nombres premiers (les nombres qui ne se divisent que par 1 et par eux-mêmes). Ce livre a servi de manuel pendant plus de 2 000 ans.', [['6e', 'Droites parallèles et perpendiculaires'], ['6e', 'Propriétés des triangles'], ['5e', 'Angles et parallélisme'], ['3e', 'Arithmétique']], 'alexandrie'],
  ['antiquite', 'vers −250', '⭕', 'Archimède et le nombre π', 'La longueur d\'un cercle vaut un peu plus de 3 fois son diamètre : ce nombre s\'appelle π (« pi »). En dessinant des polygones de 96 côtés autour et dans le cercle, Archimède trouve que π est entre 3,140 et 3,143. Il calcule aussi l\'aire du disque et le volume de la boule.', [['cm2', 'Droites, segments et cercles'], ['6e', 'Aire et périmètre'], ['5e', 'Aires'], ['3e', 'Espace']], 'syracuse'],
  ['antiquite', 'vers −240', '🔢', 'Le crible d\'Ératosthène', 'Pour trouver les nombres premiers (ceux qui n\'ont que deux diviseurs : 1 et eux-mêmes), Ératosthène barre les multiples de 2, de 3, de 5… Les nombres qui restent sont premiers. Il mesure aussi le tour de la Terre.', [['cm2', 'Multiples et diviseurs'], ['5e', 'Divisibilité'], ['4e', 'Divisibilité'], ['3e', 'Arithmétique']], 'alexandrie'],
  ['antiquite', 'vers −200', '🏮', 'Les Neuf Chapitres (Chine)', 'Ce manuel chinois résout des problèmes de partage et de proportions. Pour calculer, on pose des bâtonnets : rouges pour ce que l\'on possède, noirs pour ce que l\'on doit. Ce sont les ancêtres des nombres négatifs, que l\'on étudie au collège.', [['cm1', 'Proportionnalité'], ['5e', 'Nombres relatifs'], ['5e', 'Opérations sur les nombres relatifs']], 'chine'],
  ['antiquite', 'vers 100', '🔢', 'Nicomaque et la « table de Pythagore »', 'À Gérase (actuelle Jordanie), Nicomaque écrit une « Introduction à l\'arithmétique » : nombres pairs et impairs, multiples et diviseurs, et un tableau de multiplication que l\'on appelle encore « table de Pythagore ».', [['ce2', 'Tables d\'addition et de multiplication'], ['cm2', 'Multiples et diviseurs'], ['5e', 'Divisibilité']], 'gerase'],
  ['antiquite', 'vers 110', '🌐', 'Marin de Tyr : latitude et longitude', 'Le géographe Marin de Tyr (actuel Liban) repère chaque lieu de la Terre par deux nombres, sa latitude et sa longitude, sur des cartes quadrillées. Ptolémée reprendra sa méthode.', [['3e', 'Espace']], 'tyr'],
  ['antiquite', 'vers 150', '🌙', 'Les tables de cordes de Ptolémée', 'Pour l\'astronomie, Ptolémée calcule des tables qui relient les angles et les longueurs dans un cercle : les ancêtres de la trigonométrie.', [['4e', 'Cosinus'], ['3e', 'Trigonométrie']], 'alexandrie'],
  ['antiquite', 'vers 250', '❓', 'Diophante, père de l\'algèbre', 'À Alexandrie, Diophante résout des problèmes où l\'on cherche un nombre inconnu, avec des abréviations : un premier pas vers les équations.', [['5e', 'Équations'], ['3e', 'Équations']], 'alexandrie'],
  ['antiquite', 'vers 350', '🐚', 'Le zéro des Mayas', 'En Amérique centrale, sans aucun contact avec l\'Europe ni avec l\'Asie, les Mayas comptent par vingtaines et ont un signe pour le zéro (un coquillage) dans leur calendrier.', [['cm1', 'Nombres entiers jusqu\'à 9 999'], ['6e', 'Nombres entiers']], 'maya'],
  ['antiquite', 'vers 400', '🌟', 'Hypatie d\'Alexandrie', 'Première mathématicienne dont on connaît la vie, Hypatie enseigne les mathématiques et l\'astronomie, et commente les livres de Diophante et de Ptolémée.', [], 'alexandrie'],
  ['moyenage', 'vers 480', '🔵', 'Zu Chongzhi et le nombre π', 'En Chine, Zu Chongzhi trouve que π (le nombre d\'Archimède) est compris entre 3,1415926 et 3,1415927, avec 7 chiffres exacts après la virgule : un record de précision qui tiendra près de 1 000 ans.', [['cm2', 'Droites, segments et cercles'], ['6e', 'Aire et périmètre']], 'nankin'],
  ['moyenage', '499', '〰️', 'Aryabhata et le sinus', 'En Inde, Aryabhata calcule π ≈ 3,1416 et dresse une table de « demi-cordes » : en passant par l\'arabe puis le latin, ce mot indien est devenu notre « sinus ».', [['3e', 'Trigonométrie']], 'patna'],
  ['moyenage', 'vers 500', '0️⃣', 'Le zéro et la numération de position (Inde)', 'Les savants indiens écrivent les nombres avec dix chiffres dont le zéro, chaque chiffre valant selon sa position. C\'est notre système actuel.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999'], ['6e', 'Nombres entiers']], 'inde'],
  ['moyenage', '628', '➖', 'Brahmagupta et les nombres négatifs', 'L\'Indien Brahmagupta donne les règles de calcul avec le zéro et avec les « dettes » (nombres négatifs) : une dette retranchée de zéro devient un bien.', [['5e', 'Nombres relatifs'], ['5e', 'Opérations sur les nombres relatifs'], ['4e', 'Opérations sur les nombres relatifs']], 'bhinmal'],
  ['moyenage', 'vers 820', '📖', 'Al-Khwarizmi et l\'algèbre', 'À Bagdad, Al-Khwarizmi écrit un livre sur l\'« al-jabr » (qui a donné le mot algèbre) pour résoudre des problèmes où un nombre est inconnu : des équations. Son nom a donné le mot « algorithme ».', [['6e', 'Initiation à l\'algèbre'], ['6e', 'Initiation à la pensée informatique'], ['4e', 'Équations']], 'bagdad'],
  ['moyenage', '952', '✏️', 'Al-Uqlidisi et les fractions décimales', 'À Damas, Al-Uqlidisi apprend à calculer avec les chiffres indiens sur le papier, et non plus sur une planche couverte de sable. Il écrit déjà des fractions décimales, six siècles avant Stevin.', [['cm1', 'Nombres décimaux'], ['6e', 'Nombres décimaux']], 'damas'],
  ['moyenage', 'vers 980', '🔭', 'Abu al-Wafa et la tangente', 'À Bagdad, l\'astronome Abu al-Wafa calcule des tables très précises qui relient les angles et les longueurs, et étudie une nouvelle grandeur : la tangente.', [['3e', 'Trigonométrie']], 'bagdad'],
  ['moyenage', 'vers 1020', '👁️', 'Ibn al-Haytham et la lumière', 'Au Caire, Ibn al-Haytham montre que l\'on voit grâce à la lumière qui va en ligne droite des objets jusqu\'à l\'œil. Les peintres de la Renaissance s\'appuieront sur ses travaux pour dessiner en perspective.', [['5e', 'Représentation de l\'espace']], 'caire'],
  ['moyenage', 'vers 1075', '📅', 'Omar Khayyam : équations et calendrier', 'À Ispahan (actuel Iran), le poète et mathématicien Omar Khayyam résout des équations difficiles à l\'aide de figures, et calcule la durée de l\'année pour un calendrier plus précis que le nôtre.', [['4e', 'Équations'], ['3e', 'Équations']], 'ispahan'],
  ['moyenage', 'vers 1150', '🌸', 'Bhaskara et le « Lilavati »', 'À Ujjain (Inde), Bhaskara écrit le « Lilavati », un livre de problèmes de calcul racontés comme de petites histoires, adressés à une jeune fille nommée Lilavati.', [['cm1', 'Résolution de problèmes']], 'ujjain'],
  ['moyenage', 'vers 1175', '➗', 'Al-Hassar et la barre de fraction', 'Au Maghreb, le mathématicien Al-Hassar écrit les fractions avec une barre horizontale entre le numérateur et le dénominateur, comme nous le faisons encore.', [['cm1', 'Fractions'], ['6e', 'Fractions : nombres et partage']], 'maghreb'],
  ['moyenage', '1202', '🐇', 'Fibonacci et les chiffres indo-arabes', 'Enfant, Fibonacci apprend le calcul à Béjaïa (actuelle Algérie), où son père est marchand. Rentré à Pise, il fait découvrir dans son « Livre du calcul » les chiffres de 0 à 9, la barre de fraction et des méthodes pour calculer des prix (la « règle de trois »).', [['cm1', 'Opérations sur les nombres entiers'], ['cm1', 'Fractions'], ['6e', 'Proportionnalité']], 'pise', 'bejaia'],
  ['moyenage', 'vers 1350', '📈', 'Nicole Oresme dessine la vitesse', 'L\'évêque normand Nicole Oresme représente une grandeur qui varie, comme la vitesse, par un dessin : un ancêtre des graphiques et des fonctions.', [['5e', 'Fonctions'], ['3e', 'Grandeurs composées']], 'paris'],
  ['moyenage', '14e siècle', '🕌', 'Les pavages de l\'Alhambra', 'À Grenade, les artistes musulmans couvrent les murs de l\'Alhambra de pavages : un même motif, reproduit en le retournant comme dans un miroir, en le faisant glisser ou en le faisant tourner, couvre tout le mur sans laisser de trou. Au collège, on appelle ces mouvements symétries, translations et rotations.', [['cm2', 'Symétrie axiale'], ['5e', 'Symétrie centrale'], ['4e', 'Translations'], ['3e', 'Rotation']], 'grenade'],
  ['renaissance', '1424', '🧮', 'Al-Kashi et les décimales de π', 'À Samarcande (actuel Ouzbékistan), Al-Kashi calcule 16 décimales exactes de π et explique comment calculer avec les nombres décimaux, plus d\'un siècle et demi avant Stevin.', [['cm2', 'Nombres décimaux jusqu\'aux millièmes'], ['6e', 'Nombres décimaux']], 'samarcande'],
  ['renaissance', '1489', '➕', 'Les signes + et −', 'Ils apparaissent dans un livre imprimé de l\'Allemand Johannes Widmann, un manuel de calcul pour les marchands. Le symbole % (« pour cent ») vient lui aussi des marchands, italiens cette fois : ils écrivaient « per cento ».', [['ce2', 'Addition et soustraction posées'], ['cm2', 'Addition et soustraction'], ['5e', 'Pourcentages']], 'leipzig'],
  ['renaissance', 'vers 1500', '📜', 'Les manuscrits de Tombouctou', 'À Tombouctou (actuel Mali), les savants recopient des milliers de manuscrits : astronomie, calendrier, arithmétique, et calculs de partage d\'héritages avec des fractions.', [['cm1', 'Fractions'], ['6e', 'Fractions : comparaison et addition']], 'tombouctou'],
  ['renaissance', '1557', '🟰', 'Le signe =', 'Le Gallois Robert Recorde invente le signe = : « rien ne peut être plus égal que deux traits parallèles de même longueur ».', [['6e', 'Initiation à l\'algèbre'], ['5e', 'Équations']], 'londres'],
  ['renaissance', '1585', '🔟', 'Simon Stevin et les nombres décimaux', 'Dans « La Disme », le Flamand Simon Stevin explique comment calculer avec les nombres décimaux, et propose déjà des mesures en dixièmes, centièmes, millièmes.', [['cm1', 'Nombres décimaux'], ['cm2', 'Nombres décimaux jusqu\'aux millièmes'], ['6e', 'Nombres décimaux']], 'leyde'],
  ['renaissance', '1591', '🔤', 'Viète calcule avec des lettres', 'Le Français François Viète désigne les nombres inconnus et les nombres connus par des lettres : c\'est la naissance du calcul littéral.', [['5e', 'Calcul littéral'], ['4e', 'Calcul littéral'], ['3e', 'Calcul littéral']], 'tours'],
  ['modernes', '1637', '📍', 'Descartes : repère et puissances', 'René Descartes repère les points par deux nombres et note les puissances avec un petit nombre en exposant (x³) : la géométrie et l\'algèbre se rejoignent.', [['4e', 'Puissances'], ['3e', 'Généralités sur les fonctions']], 'leyde'],
  ['modernes', 'vers 1637', '✍️', 'Le « dernier théorème » de Fermat', 'À Toulouse, Pierre de Fermat note dans la marge d\'un livre de Diophante : avec des carrés, on trouve des nombres entiers qui marchent (3² + 4² = 5²), mais jamais avec des cubes ou des puissances plus grandes. Il dit en avoir une « démonstration merveilleuse » que la marge est trop étroite pour contenir.', [['4e', 'Théorème de Pythagore'], ['4e', 'Puissances'], ['3e', 'Arithmétique']], 'toulouse'],
  ['modernes', '1654', '🎲', 'Pascal et Fermat : les probabilités', 'Le chevalier de Méré demande comment partager l\'argent misé dans un jeu de hasard arrêté avant la fin. Blaise Pascal et Pierre de Fermat en discutent par lettres : naissance du calcul des probabilités.', [['cm1', 'Probabilités'], ['cm2', 'Probabilités'], ['6e', 'Probabilités'], ['5e', 'Probabilités'], ['4e', 'Probabilités'], ['3e', 'Probabilités']], 'paris'],
  ['modernes', 'vers 1700', '⛩️', 'Les sangaku du Japon', 'Au Japon, on accroche dans les temples des tablettes de bois peintes : des problèmes de géométrie avec des cercles et des triangles, offerts comme des énigmes aux visiteurs.', [['6e', 'Distance et cercles'], ['4e', 'Théorème de Pythagore']], 'kyoto'],
  ['modernes', '1732', '🔲', 'Les carrés magiques d\'al-Kishnawi', 'Le savant Muhammad al-Kishnawi, né à Katsina (actuel Nigeria), écrit un livre sur les carrés magiques : des grilles de nombres où chaque ligne, chaque colonne et chaque diagonale ont la même somme.', [['cm1', 'Procédures de calcul mental']], 'katsina'],
  ['modernes', '1734', '𝑓', 'Euler et la notation f(x)', 'Le Suisse Leonhard Euler, l\'un des plus grands mathématiciens, popularise l\'écriture f(x) (« f de x ») pour les fonctions, et la lettre π pour le nombre d\'Archimède.', [['5e', 'Fonctions'], ['3e', 'Généralités sur les fonctions'], ['3e', 'Fonctions linéaires et affines']], 'stpetersbourg'],
  ['modernes', '1795', '📏', 'Le système métrique', 'La Révolution crée le mètre, le litre et le gramme, avec des unités plus grandes ou plus petites qui vont toujours de 10 en 10 (kilomètre, centimètre, millilitre…) : des mesures communes à tous.', [['ce2', 'Les longueurs'], ['cm1', 'Longueurs, masses, contenances'], ['cm2', 'Longueurs, masses, contenances']], 'paris'],
  ['modernes', '1796', '✳️', 'Gauss et le polygone à 17 côtés', 'À 19 ans, l\'Allemand Carl Friedrich Gauss découvre qu\'on peut tracer un polygone régulier à 17 côtés avec seulement une règle et un compas, ce que personne n\'avait trouvé depuis les Grecs.', [['6e', 'Distance et cercles']], 'gottingue'],
  ['contemporain', '1816', '🎖️', 'Sophie Germain', 'Interdite d\'université parce qu\'elle est une femme, la Française Sophie Germain étudie seule, écrit aux savants sous un nom d\'homme, puis gagne le grand prix de l\'Académie des sciences. Elle fait aussi avancer la recherche sur le théorème de Fermat.', [['3e', 'Arithmétique']], 'paris'],
  ['contemporain', '1843', '⚙️', 'Ada Lovelace, première programmeuse', 'L\'Anglaise Ada Lovelace écrit pour la machine à calculer de Charles Babbage ce qu\'on considère comme le premier programme informatique.', [['cm2', 'Pensée informatique'], ['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']], 'londres'],
  ['contemporain', '1858', '📊', 'Florence Nightingale et les diagrammes', 'Infirmière et statisticienne, Florence Nightingale prouve par des diagrammes que les soldats meurent surtout des maladies de l\'hôpital : les statistiques sauvent des vies.', [['ce2', 'Tableaux et diagrammes en barres'], ['cm1', 'Organisation et gestion de données'], ['6e', 'Gestion de données'], ['5e', 'Statistiques'], ['4e', 'Statistiques'], ['3e', 'Statistiques']], 'londres'],
  ['contemporain', '1904', '❄️', 'Le flocon de Koch', 'Le Suédois Helge von Koch dessine un flocon en ajoutant sans fin des triangles sur chaque côté : son périmètre augmente à chaque étape, alors que le flocon tient toujours dans un même cercle. C\'est l\'une des premières fractales.', [['6e', 'Aire et périmètre'], ['6e', 'Symétrie axiale']], 'stockholm'],
  ['contemporain', '1913', '✉️', 'Ramanujan, le génie autodidacte', 'Employé de bureau à Madras (Inde), Srinivasa Ramanujan, qui a appris seul les mathématiques, envoie ses découvertes au mathématicien anglais Hardy, qui l\'invite à Cambridge.', [], 'madras'],
  ['contemporain', '1936', '💻', 'Alan Turing et l\'ordinateur', 'Le mathématicien anglais Alan Turing décrit une machine capable d\'exécuter n\'importe quel algorithme : le modèle de nos ordinateurs. Pendant la Seconde Guerre mondiale, il participe au déchiffrement des messages secrets de la machine allemande Enigma.', [['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']], 'cambridge'],
  ['contemporain', '1948', '💡', 'Claude Shannon et les bits', 'L\'ingénieur américain Claude Shannon montre que toute information, texte, image ou son, peut s\'écrire avec des 0 et des 1, les « bits » : c\'est la base de l\'informatique et d\'Internet.', [['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']], 'murrayhill'],
  ['contemporain', '1952', '👩‍💻', 'Grace Hopper et le compilateur', 'L\'Américaine Grace Hopper crée l\'un des premiers compilateurs, puis un langage de programmation qui utilise des mots anglais : on n\'a plus besoin d\'écrire les programmes en 0 et en 1.', [['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']], 'philadelphie'],
  ['contemporain', '1962', '🚀', 'Katherine Johnson et la NASA', 'À la NASA, la mathématicienne afro-américaine Katherine Johnson vérifie à la main les calculs de trajectoire du vol de John Glenn, premier Américain à faire le tour de la Terre en fusée.', [], 'hampton'],
  ['contemporain', '1994', '🏆', 'Andrew Wiles démontre le théorème de Fermat', 'Après sept ans de travail en secret, le Britannique Andrew Wiles démontre enfin le « dernier théorème » de Fermat, 357 ans après la note dans la marge.', [['4e', 'Puissances'], ['3e', 'Arithmétique']], 'princeton'],
  ['contemporain', '2014', '🏅', 'Maryam Mirzakhani, médaille Fields', 'L\'Iranienne Maryam Mirzakhani est la première femme à recevoir la médaille Fields, la plus haute récompense en mathématiques, pour ses travaux sur la géométrie des surfaces.', [], 'stanford']];

// Où la notion est née : [nom, latitude, longitude]. Carte : planisphere.js (projection Equal Earth), chargé à la demande.
const HM_LIEUX = { ishango: ['Ishango (Congo)', 0.1, 29.6], uruk: ['Uruk (Mésopotamie, actuel Irak)', 31.3, 45.6], babylone: ['Babylone (Mésopotamie, actuel Irak)', 32.5, 44.4],
  thebes: ['Thèbes (Égypte)', 25.7, 32.6], milet: ['Milet (cité grecque, actuelle Turquie)', 37.5, 27.3], crotone: ['Crotone (cité grecque d\'Italie du Sud)', 39.1, 17.1],
  alexandrie: ['Alexandrie (Égypte)', 31.2, 29.9], syracuse: ['Syracuse (Sicile)', 37.1, 15.3], chine: ['Chine', 34.3, 108.9], maya: ['Pays maya (actuel Guatemala)', 17.4, -89.6],
  inde: ['Inde du Nord', 26.2, 78.2], bagdad: ['Bagdad (actuel Irak)', 33.3, 44.4], pise: ['Pise (Italie)', 43.7, 10.4], paris: ['Paris', 48.9, 2.35], grenade: ['Grenade (Espagne)', 37.2, -3.6],
  leipzig: ['Leipzig (Allemagne)', 51.3, 12.4], londres: ['Londres', 51.5, -0.1], cambridge: ['Cambridge (Angleterre)', 52.2, 0.1], leyde: ['Leyde (Pays-Bas)', 52.2, 4.5],
  tours: ['Tours', 47.4, 0.7], stpetersbourg: ['Saint-Pétersbourg (Russie)', 59.9, 30.3], stanford: ['Stanford (États-Unis)', 37.4, -122.2],
  samos: ['Samos (île grecque)', 37.75, 26.98], gizeh: ['Gizeh (Égypte)', 30.0, 31.1], caire: ['Le Caire (Égypte)', 30.05, 31.25], nippur: ['Nippur (Mésopotamie, actuel Irak)', 32.1, 45.2],
  gerase: ['Gérase (actuelle Jordanie)', 32.3, 35.9], tyr: ['Tyr (actuel Liban)', 33.3, 35.2], damas: ['Damas (actuelle Syrie)', 33.5, 36.3], ispahan: ['Ispahan (actuel Iran)', 32.65, 51.7],
  lebombo: ['Monts Lebombo (Afrique australe)', -27.0, 32.0], maghreb: ['Maghreb (actuel Maroc)', 34.0, -5.0], bejaia: ['Béjaïa (actuelle Algérie)', 36.75, 5.1],
  tombouctou: ['Tombouctou (actuel Mali)', 16.8, -3.0], katsina: ['Katsina (actuel Nigeria)', 13.0, 7.6], nankin: ['Nankin (Chine)', 32.1, 118.8], patna: ['Kusumapura (actuelle Patna, Inde)', 25.6, 85.1],
  ujjain: ['Ujjain (Inde)', 23.2, 75.8], bhinmal: ['Bhinmal (Inde)', 25.0, 72.3], samarcande: ['Samarcande (actuel Ouzbékistan)', 39.65, 67.0], kyoto: ['Kyoto (Japon)', 35.0, 135.8],
  madras: ['Madras (actuelle Chennai, Inde)', 13.1, 80.3], toulouse: ['Toulouse', 43.6, 1.44], gottingue: ['Göttingen (Allemagne)', 51.53, 9.93], stockholm: ['Stockholm (Suède)', 59.33, 18.07],
  murrayhill: ['Murray Hill (États-Unis)', 40.68, -74.4], philadelphie: ['Philadelphie (États-Unis)', 39.95, -75.17], hampton: ['Hampton, NASA (États-Unis)', 37.03, -76.35], princeton: ['Princeton (États-Unis)', 40.35, -74.66] };
// Lieux trop proches pour deux points : Cambridge avec Londres ; Uruk, Nippur et Bagdad avec Babylone (Mésopotamie) ;
// Le Caire avec Gizeh ; Tyr et Gérase avec Damas (Proche-Orient : Liban, Syrie, Jordanie).
const HM_POINT = { cambridge: 'londres', uruk: 'babylone', nippur: 'babylone', bagdad: 'babylone', caire: 'gizeh', tyr: 'damas', gerase: 'damas' };

function hmVignette([n, t]){ return !hmVisible(n) ? '' : `<button type="button" class="hm-vig${hmFiltre === n ? ' on' : ''}" style="--c:${HM_NIV[n].coul}" title="${hmEsc(HM_NIV[n].lib + ' : ' + t)} (ouvrir le chapitre)" onclick="hmOuvrir('${n}', '${hmEsc(t.replace(/'/g, '\\\''))}')">${HM_NIV[n].lib}</button>`; }
function hmLieuTxt(e){ return `<div class="hm-lieu"><span class="gicon">location_on</span> ${e[7] ? hmEsc(HM_LIEUX[e[7]][0]) + ' → ' : ''}${hmEsc(HM_LIEUX[e[6]][0])}</div>`; }
function hmChapitre(niv, titre){ return HM_NIV[niv].liste().find(c => c.t === titre) || null; }
function hmVisible(niv){ return typeof niveauVisible !== 'function' || niveauVisible(niv); }
const hmEsc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// Ce que montre chaque image (img/histoire/credits.json donne l'auteur, la licence et la source).
const HM_LEGENDES = {
  "Le bâton d'Ishango": "Le bâton d'Ishango (Muséum des sciences naturelles, Bruxelles)",
  "Les premiers nombres écrits": "Une tablette d'argile de Mésopotamie : le compte d'une distribution d'orge",
  "Les pyramides et la coudée royale": "Une coudée pliante en bois, l'instrument de mesure de l'architecte Khâ (musée égyptien de Turin)",
  "Babylone compte par soixantaines": "La tablette Plimpton 322 : des nombres écrits en base 60",
  "Le papyrus de Moscou": "Le problème 14 du papyrus de Moscou : la pyramide coupée",
  "La diagonale du carré": "La tablette YBC 7289 : un carré, ses diagonales et la valeur de leur longueur",
  "Les tables de multiplication des scribes": "Une table de multiplication sur une tablette d'argile",
  "Le papyrus Rhind": "Le papyrus Rhind (British Museum, Londres)",
  "Thalès": "Thalès, imaginé par un graveur du 19e siècle (aucun portrait d'époque n'existe)",
  "Pythagore et son école": "Buste de Pythagore, copie romaine (musées du Capitole, Rome)",
  "Les Éléments d'Euclide": "Un morceau des Éléments d'Euclide copié sur papyrus vers l'an 100, trouvé en Égypte",
  "Archimède et le nombre π": "Archimède imaginé par le peintre Domenico Fetti en 1620",
  "Le crible d'Ératosthène": "Ératosthène imaginé par un graveur (aucun portrait d'époque n'existe)",
  "Les Neuf Chapitres (Chine)": "Une page des Neuf Chapitres sur l'art du calcul",
  "Marin de Tyr : latitude et longitude": "La carte du monde de Ptolémée, quadrillée par la latitude et la longitude (copie du 15e siècle)",
  "Les tables de cordes de Ptolémée": "Une copie manuscrite de l'« Almageste » de Ptolémée (Paris, 13e siècle)",
  "Diophante, père de l'algèbre": "L'« Arithmétique » de Diophante, édition de 1621 : celle que lisait Fermat",
  "Le zéro des Mayas": "Des glyphes mayas, relevés par l'archéologue Sylvanus Morley",
  "Zu Chongzhi et le nombre π": "Statue de Zu Chongzhi (Chine)",
  "Aryabhata et le sinus": "Statue d'Aryabhata à Pune (Inde) : on ne connaît pas son visage",
  "Le zéro et la numération de position (Inde)": "Le manuscrit de Bakhshali : le point (flèche) est l'un des plus anciens zéros écrits",
  "Al-Khwarizmi et l'algèbre": "Le livre d'al-Khwarizmi sur l'al-jabr, copie manuscrite (bibliothèque Bodléienne, Oxford)",
  "Abu al-Wafa et la tangente": "Abu al-Wafa, portrait imaginé (aucun portrait d'époque n'existe)",
  "Ibn al-Haytham et la lumière": "Le schéma de l'œil dans le « Livre de l'optique » d'Ibn al-Haytham (copie manuscrite)",
  "Omar Khayyam : équations et calendrier": "Omar Khayyam, portrait imaginé (aucun portrait d'époque n'existe)",
  "Bhaskara et le « Lilavati »": "Une copie manuscrite du « Lilavati » de Bhaskara",
  "Fibonacci et les chiffres indo-arabes": "Une page du « Livre du calcul » (Liber abaci) de Fibonacci, copie manuscrite",
  "Nicole Oresme dessine la vitesse": "Les dessins d'Oresme : la hauteur des rectangles montre comment la grandeur varie",
  "Les pavages de l'Alhambra": "Pavage de céramique à l'Alhambra de Grenade",
  "Al-Kashi et les décimales de π": "L'observatoire d'Ulugh Beg à Samarcande, où travaillait al-Kashi",
  "Les signes + et −": "Une page du livre de Widmann (1489) : les signes + et − dans des calculs",
  "Les manuscrits de Tombouctou": "Un manuscrit de Tombouctou : astronomie et mathématiques",
  "Le signe =": "Le premier signe = imprimé, dans le livre de Robert Recorde (1557)",
  "Simon Stevin et les nombres décimaux": "Simon Stevin, gravure du 19e siècle",
  "Viète calcule avec des lettres": "François Viète, gravure",
  "Descartes : repère et puissances": "René Descartes, d'après le portrait de Frans Hals",
  "Le « dernier théorème » de Fermat": "Pierre de Fermat, portrait par Rolland Lefebvre (Toulouse)",
  "Pascal et Fermat : les probabilités": "Blaise Pascal, d'après un portrait de François Quesnel (château de Versailles)",
  "Les sangaku du Japon": "Un sangaku de 1850 : des problèmes de géométrie peints sur une tablette de bois, offerts à un temple",
  "Les carrés magiques d'al-Kishnawi": "Un carré magique dans un manuscrit arabe du 16e siècle",
  "Euler et la notation f(x)": "Leonhard Euler, portrait par Jakob Emanuel Handmann (1753)",
  "Le système métrique": "Un des mètres étalons gravés dans le marbre à Paris en 1796-1797, pour que chacun puisse vérifier sa règle",
  "Gauss et le polygone à 17 côtés": "Carl Friedrich Gauss, portrait par Christian Albrecht Jensen (1840)",
  "Sophie Germain": "Sophie Germain",
  "Ada Lovelace, première programmeuse": "Ada Lovelace, d'après le portrait d'Alfred Edward Chalon (vers 1840)",
  "Florence Nightingale et les diagrammes": "Le diagramme de Florence Nightingale : les morts de l'armée, mois par mois, et leurs causes",
  "Le flocon de Koch": "Le flocon de Koch dessiné jusqu'à la 7e étape",
  "Ramanujan, le génie autodidacte": "Srinivasa Ramanujan",
  "Alan Turing et l'ordinateur": "Alan Turing en 1951",
  "Claude Shannon et les bits": "Claude Shannon en 1958",
  "Grace Hopper et le compilateur": "Grace Hopper (assise) et son équipe devant l'ordinateur UNIVAC",
  "Katherine Johnson et la NASA": "Katherine Johnson à la NASA en 1966",
  "Andrew Wiles démontre le théorème de Fermat": "Andrew Wiles en 1995",
  "Maryam Mirzakhani, médaille Fields": "Maryam Mirzakhani à Séoul, en 2014, l'année de sa médaille Fields",
  "Nicomaque et la « table de Pythagore »": "Une page de l'« Introduction à l'arithmétique » de Nicomaque, copie manuscrite (bibliothèque du Vatican)",
  "Hypatie d'Alexandrie": "Hypatie imaginée par le peintre Julius Kronberg en 1889 (aucun portrait d'époque n'existe)",
  "Brahmagupta et les nombres négatifs": "Un commentaire du 10e siècle sur le livre de Brahmagupta, copie manuscrite",
};
/* Illustrations -- demandé : « il manque des illustrations, les papyrus par exemple, pour savoir de quoi on parle,
   pas seulement des points sur une carte. Ou des représentations des mathématiciens. » Images libres de Wikimedia
   Commons copiées sur le site (img/histoire/, choisies par tools/histoire-images/), avec leurs crédits
   (img/histoire/credits.json : auteur, licence, source) ; HM_LEGENDES dit ce que montre l'image. */
let hmImgs = null;
function hmChargerImgs(){
  if(hmImgs) return Promise.resolve();
  const v = ((document.querySelector('script[src*="frise-histoire.js"]') || {}).src || '').split('v=')[1] || '';
  return fetch('img/histoire/credits.json?v=' + v).then(r => r.ok ? r.json() : {}).catch(() => ({})).then(j => { hmImgs = j || {}; });
}
// Crédit d'une image : l'auteur n'est obligatoire que pour les licences CC BY / CC BY-SA ; nom nettoyé et
// raccourci sous la vignette, complet dans la loupe.
function hmCredit(c, complet){
  const pd = /public domain|cc0|^pd/i.test(c.licence), lic = pd ? 'Domaine public' : c.licence;
  let a = String(c.auteur || '').replace(/&amp;/g, '&').replace(/The original uploader was (.+?) at .*$/i, '$1').replace(/https?:\/\/\S+/g, '').replace(/\s*derivative work.*$/i, '').replace(/(Unknown (author|photographer|illustrator))+/gi, '').replace(/\s+/g, ' ').replace(/^[\s,;·-]+|[\s,;·-]+$/g, '');
  if(/^unknown|^unidentified|^anonymous/i.test(a)) a = '';
  if(!complet && pd) a = '';
  if(!complet && a.length > 42) a = a.slice(0, 40).replace(/[\s,;]+\S*$/, '') + '…';
  return `${a ? hmEsc(a) + ' · ' : ''}${hmEsc(lic)} · <a href="${hmEsc(c.source)}" target="_blank" rel="noopener">${complet ? 'voir la source (Wikimedia Commons)' : 'Wikimedia Commons'}</a>`;
}
function hmIllu(e, grand){
  const c = hmImgs && hmImgs[e[3]]; if(!c) return '';
  const leg = HM_LEGENDES[e[3]] || e[3];
  return `<figure class="hm-illu${grand ? ' grand' : ''}"><button type="button" class="hm-illu-img" onclick="hmAgrandir('${hmEsc(e[3].replace(/'/g, '\\\''))}')" title="Agrandir"><img src="${c.image}" alt="${hmEsc(leg)}" loading="lazy"></button>
    <figcaption>${grand ? hmEsc(leg) + '<br>' : ''}<span class="hm-credit">${hmCredit(c)}</span></figcaption></figure>`;
}
function hmAgrandir(titre){
  const c = hmImgs && hmImgs[titre]; if(!c) return;
  const ov = document.createElement('div'); ov.className = 'hm-loupe'; ov.onclick = ev => { if(ev.target === ov || ev.target.closest('.hm-loupe-x')) ov.remove(); };
  ov.innerHTML = `<figure><button type="button" class="hm-loupe-x" title="Fermer"><span class="gicon">close</span></button><img src="${c.image}" alt="${hmEsc(HM_LEGENDES[titre] || titre)}">
    <figcaption><b>${hmEsc(HM_LEGENDES[titre] || titre)}</b><br><span class="hm-credit">${hmCredit(c, true)}</span></figcaption></figure>`;
  document.body.appendChild(ov);
}
let hmFiltre = '';
function hmRendre(){
  const root = document.getElementById('friseRoot'); if(!root) return;
  if(!hmImgs){ hmChargerImgs().then(hmRendre); }
  const niveaux = Object.keys(HM_NIV).filter(hmVisible);
  let h = `<div class="hm-filtres"><span>Quand étudie-t-on ces notions ?</span><button type="button" class="hm-f${!hmFiltre ? ' on' : ''}" onclick="hmFiltrer('')">Tous les niveaux</button>${niveaux.map(n => `<button type="button" class="hm-f${hmFiltre === n ? ' on' : ''}" style="--c:${HM_NIV[n].coul}" onclick="hmFiltrer('${n}')">${HM_NIV[n].lib}</button>`).join('')}</div>`;
  h += `<p class="hint hm-aide">Les vignettes de couleur indiquent en quelle classe on étudie la notion : clique dessus pour ouvrir le chapitre.${hmFiltre ? ` Filtre : <b>${HM_NIV[hmFiltre].lib}</b>, les étapes qui ne concernent pas ce niveau sont estompées.` : ''}</p><div id="hmCarte" class="hm-carte-monde"></div><div class="hm-frise">`;
  HM_EPOQUES.forEach(([k, lib]) => {
    const l = HM_EVTS.filter(e => e[0] === k); if(!l.length) return;
    h += `<div class="hm-epoque"><span>${lib}</span></div>`;
    l.forEach(e => {
      const [, date, emo, titre, texte, nivs, lieu] = e, vis = nivs.filter(([n]) => hmVisible(n));
      h += `<div class="hm-evt${hmEstompe(e) ? ' estompe' : ''}" id="hm-e${HM_EVTS.indexOf(e)}"><div class="hm-date">${date}</div><div class="hm-point">${emo}</div>
        <div class="hm-carte">${hmIllu(e)}<b class="hm-titre">${titre}</b><p>${texte}</p>${hmLieuTxt(e)}${vis.length ? `<div class="hm-vigs">${vis.map(hmVignette).join('')}</div>` : ''}</div></div>`;
    });
  });
  root.innerHTML = h + '</div>';
  hmCarte();
}
function hmEstompe(e){ return !!hmFiltre && !e[5].some(([n]) => n === hmFiltre); }
function hmFiltrer(n){ hmFiltre = n; hmRendre(); }

/* ---- Carte du monde : où chaque notion est née. Demandé : « peut-on ajouter une carte du monde (nouveau
   planisphère adopté il y a environ un mois), en plaçant là où les différentes notions ont commencé ? » --
   projection Equal Earth, recommandée par l'Assemblée générale de l'ONU en septembre 2026. Zooms Europe-
   Méditerranée, Afrique et Asie (planisphere.js), où les points se serrent. Puis : « réécris juste en dessous
   le texte associé à l'évènement » et « permettre une animation chronologique de la carte et/ou choisir la
   période » : curseur dans le temps, bouton Animer (la carte suit les étapes), choix de l'époque. ---- */
let hmGr = []; // points affichés (groupes), calculés par hmMaj
let hmVue = 'monde', hmLieuSel = '', hmEvtSel = -1, hmPer = '', hmPos = null, hmAnim = false, hmTimer = null, hmRun = 0, hmSuivre = true;
// Lecture à voix haute pendant l'animation -- demandé : « En mode animation (lecture), il serait bien d'entendre une
// voix : "vers 110, Le géographe Marin de Tyr…" ». L'étape suivante vient quand la voix a fini : le rythme
// s'adapte à la longueur du texte. Voix de l'appareil, réglée par le bouton de voix du site (speechUtterance, app.js).
let hmVoix = true; try{ hmVoix = localStorage.getItem('hmVoix') !== '0'; }catch(e){}
const hmParoleOk = () => typeof speechSynthesis !== 'undefined' && typeof speechUtterance === 'function';
function hmTexteParle(e){
  const date = e[1].replace(/−\s?([\d\s]+)/, (m, n) => n.replace(/\s/g, '') + ' avant Jésus-Christ');
  return date + ', ' + e[4].replace(/≈/g, ' environ ').replace(/f\(x\)/g, 'f de x').replace(/x³/g, 'x au cube').replace(/(\d)²/g, '$1 au carré').replace(/[«»]/g, '');
}
let hmUtt = null; // référence gardée : sinon certains navigateurs perdent l'événement de fin
function hmDire(texte, fin){
  if(!hmParoleOk()){ if(fin) fin(); return; }
  let fait = false; const finir = () => { if(!fait){ fait = true; if(fin) fin(); } };
  speechSynthesis.cancel();
  hmUtt = speechUtterance(texte); hmUtt.onend = finir; hmUtt.onerror = finir;
  speechSynthesis.speak(hmUtt);
  if(fin) setTimeout(finir, 8000 + texte.length * 110); // filet de sécurité si la fin n'est jamais signalée
}
function hmVoixReglage(v){ hmVoix = v; try{ localStorage.setItem('hmVoix', v ? '1' : '0'); }catch(e){} if(!v && hmParoleOk()) speechSynthesis.cancel(); }
function hmEcouter(i){ hmStop(); hmMaj(); hmDire(hmTexteParle(HM_EVTS[i])); }
const HM_PAS_MS = 4500; // sans la voix : au moins 4,5 s par étape, plus si le texte est long
// Projection Equal Earth (mêmes formules que d3-geo) avec les réglages de planisphere.js.
function hmProj(p, lat, lon){
  const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
  let lam = (lon + p.rot) * Math.PI / 180; lam = Math.atan2(Math.sin(lam), Math.cos(lam));
  const l = Math.asin(M * Math.sin(lat * Math.PI / 180)), l2 = l * l, l6 = l2 * l2 * l2;
  const x = lam * Math.cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), y = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2));
  return [p.tx + p.k * x, p.ty - p.k * y];
}
const hmDans = (k, [lon0, lon1, lat0, lat1]) => { const [, la, lo] = HM_LIEUX[k]; return lo >= lon0 && lo <= lon1 && la >= lat0 && la <= lat1; };
// Zoom qui contient un lieu (son cadre sur le planisphère), sinon le planisphère lui-même.
function hmZoneDe(k){ return Object.keys(HM_CARTE.zones).find(z => hmDans(k, HM_CARTE.zones[z].cadreLL)) || 'monde'; }
// Échelle d'affichage d'une carte (pixels à l'écran par unité du dessin). Sur téléphone, la carte est réduite : points
// et noms grossissent pour rester lisibles (demandé : « Agrandis les noms des cadres sur téléphone »).
function hmEchelle(C){ const W = (document.getElementById('hmSvg') || {}).clientWidth || C.w; return Math.min(W, 0.72 * (window.innerHeight || 800) * C.w / C.h) / C.w; }
const hmRayon = Z => Math.max(15, 12 / hmEchelle(Z)); // rayon des points d'un zoom : au moins 12 pixels à l'écran
const HM_NOM_COURT = { europe: 'Europe', afrique: 'Afrique', asie: 'Asie', amerique: 'Amériques' };
// Le lieu est-il visible sur ce zoom ? Un point coupé par le bord appartient à la carte voisine : on ne le montre pas.
function hmSurZoom(k, z){
  const Z = HM_CARTE.zones[z], r = hmRayon(Z); if(!hmDans(k, Z.vue)) return false;
  const [x, y] = hmProj(Z.p, HM_LIEUX[k][1], HM_LIEUX[k][2]); return x > r && x < Z.w - r && y > r && y < Z.h - r;
}
function hmSurVue(k){ return hmVue === 'monde' ? hmZoneDe(k) === 'monde' : hmSurZoom(k, hmVue); }
const hmCle = i => HM_POINT[HM_EVTS[i][6]] || HM_EVTS[i][6]; // point de la carte d'une étape
// Étapes de l'époque choisie (HM_EVTS est dans l'ordre chronologique) ; sur la carte, jusqu'à l'étape du curseur.
function hmListePer(){ return HM_EVTS.map((e, i) => i).filter(i => !hmPer || HM_EVTS[i][0] === hmPer); }
function hmMontrees(){ const l = hmListePer(); return hmPos === null ? l : l.slice(0, hmPos + 1); }
// Un point par lieu (HM_POINT regroupe les lieux trop proches), avec ses étapes.
function hmPoints(){
  const pts = {};
  hmMontrees().forEach(i => { const k = hmCle(i); (pts[k] = pts[k] || { k, evts: [] }).evts.push(i); });
  return Object.values(pts);
}
// Points qui se toucheraient sur la carte affichée : un seul point (le plus chargé garde sa place).
function hmGroupes(pts, pos, r){
  const gr = [];
  pts.slice().sort((a, b) => b.evts.length - a.evts.length).forEach(p => {
    const xy = pos(p.k), g = gr.find(g => Math.hypot(g.xy[0] - xy[0], g.xy[1] - xy[1]) < 2 * r + 2);
    if(g){ g.ks.push(p.k); g.evts.push(...p.evts); } else gr.push({ ks: [p.k], evts: p.evts.slice(), xy });
  });
  gr.forEach(g => g.evts.sort((a, b) => a - b));
  return gr;
}
function hmNoms(p){ return p.evts.map(i => HM_LIEUX[HM_EVTS[i][6]][0]).filter((v, j, a) => a.indexOf(v) === j).join(' · '); }
function hmCarte(){
  const box = document.getElementById('hmCarte'); if(!box) return;
  if(typeof HM_CARTE === 'undefined'){
    box.innerHTML = '<p class="hint">Chargement de la carte…</p>';
    if(!document.getElementById('hmCarteJs')){
      const v = (document.querySelector('script[src*="frise-histoire.js"]') || {}).src || '', sc = document.createElement('script');
      sc.id = 'hmCarteJs'; sc.src = 'planisphere.js' + (v.includes('?') ? v.slice(v.indexOf('?')) : ''); sc.onload = hmCarte;
      sc.onerror = () => { box.innerHTML = '<p class="hint">La carte n\'a pas pu être chargée.</p>'; };
      document.head.appendChild(sc);
    }
    return;
  }
  // Squelette fixe (le curseur n'est jamais reconstruit : on peut le faire glisser), puis hmMaj() remplit le reste.
  box.innerHTML = `<div class="hm-carte-tete"><b><span class="gicon">public</span> Où sont nées ces notions ?</b><span id="hmRetour"></span></div>
    <div class="hm-temps"><button type="button" id="hmPlay" class="hm-play" onclick="hmAnimer()"></button>
      <button type="button" class="hm-pas" onclick="hmPas(-1)" aria-label="Étape précédente">◀</button>
      <input type="range" id="hmCurseur" min="0" step="1" oninput="hmAller(+this.value)" aria-label="Étape de l'histoire">
      <button type="button" class="hm-pas" onclick="hmPas(1)" aria-label="Étape suivante">▶</button><span id="hmTempsLib" class="hm-temps-lib"></span>
      <label class="hm-suivre"><input type="checkbox" ${hmSuivre ? 'checked' : ''} onchange="hmSuivre = this.checked"> la carte suit les étapes</label>
      ${hmParoleOk() ? `<label class="hm-suivre"><input type="checkbox" ${hmVoix ? 'checked' : ''} onchange="hmVoixReglage(this.checked)"> 🔊 lire à voix haute</label>` : ''}</div>
    <div class="hm-periodes" id="hmPeriodes"></div><div id="hmSvg"></div><div id="hmBas"></div>
    <details class="hm-proj"><summary>Pourquoi cette carte ?</summary>Planisphère en projection <b>Equal Earth</b>, que l'ONU recommande depuis septembre 2026 : chaque continent y garde sa vraie surface. Sur la carte de Mercator, l'Afrique paraît à peu près aussi grande que le Groenland ; en réalité, elle est 14 fois plus grande.</details>`;
  hmMaj();
}
function hmMaj(){
  const svgBox = document.getElementById('hmSvg'); if(!svgBox || typeof HM_CARTE === 'undefined') return;
  const monde = hmVue === 'monde', C = monde ? HM_CARTE.monde : HM_CARTE.zones[hmVue], pts = hmPoints(), liste = hmListePer();
  const s = hmEchelle(C), u = Math.max(1, .9 / s), r = monde ? Math.max(11, 9 / s) : hmRayon(C), f = monde ? r * 1.1 : r, cour = hmPos === null ? -1 : liste[hmPos], courK = cour >= 0 ? hmCle(cour) : '';
  const pos = k => hmProj(C.p, HM_LIEUX[k][1], HM_LIEUX[k][2]), xy = v => v.map(n => n.toFixed(1)).join(',');
  let svg = `<svg viewBox="0 0 ${C.w} ${C.h}" class="hm-svg${monde ? '' : ' zoom'}" role="img" aria-label="${monde ? 'Planisphère' : 'Carte : ' + hmEsc(C.nom)} : lieux où les notions sont nées">`;
  svg += monde ? `<path d="${C.sphere}" class="hm-mer"/>` : `<rect width="${C.w}" height="${C.h}" class="hm-mer"/>`;
  svg += `<path d="${C.grat}" class="hm-grat"/><path d="${C.terre}" class="hm-terre"/>`;
  const fz = Math.max(13, 12 / s); // noms des cadres : au moins 12 pixels à l'écran, en abrégé sur téléphone
  if(monde) Object.entries(HM_CARTE.zones).forEach(([z, Z]) => {
    const n = pts.filter(p => hmSurZoom(p.k, z)).reduce((a, p) => a + p.evts.length, 0); // étapes visibles sur ce zoom
    svg += `<g class="hm-zone${courK && hmZoneDe(courK) === z ? ' courant' : ''}" onclick="hmZoom('${z}')" tabindex="0" role="button" aria-label="Zoomer : ${Z.nom}"><path d="${Z.cadre}"/>
      <text x="${Z.lab[0]}" y="${Z.lab[1] + (Z.lab[2] ? fz : 0)}" class="hm-zone-txt" style="font-size:${fz.toFixed(1)}px;stroke-width:${(fz / 4).toFixed(1)}px">${s < .6 ? `${HM_NOM_COURT[z] || Z.nom} (${n})` : `${Z.nom} : ${n} étape${n > 1 ? 's' : ''} (zoom)`}</text></g>`;
  });
  // Trajets (lieu de départ → lieu de l'étape), sous les points : « flèche Samos → Crotone ».
  let fl = '';
  hmMontrees().forEach(i => {
    const e = HM_EVTS[i]; if(!e[7] || !hmSurVue(hmCle(i)) || !hmSurVue(e[7])) return;
    const a = pos(e[7]), b = pos(hmCle(i)), dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const d0 = [a[0] + ux * (r + 6), a[1] + uy * (r + 6)], d1 = [b[0] - ux * (r + 5), b[1] - uy * (r + 5)];
    const sg = ux > 0 ? 1 : -1, c = [(d0[0] + d1[0]) / 2 - uy * L * .22 * sg, (d0[1] + d1[1]) / 2 + ux * L * .22 * sg]; // courbe bombée vers le sud
    fl += `<g class="hm-trajet${hmEstompe(e) ? ' estompe' : ''}"><title>${hmEsc(e[3])} : ${hmEsc(HM_LIEUX[e[7]][0])} → ${hmEsc(HM_LIEUX[e[6]][0])}</title>
      <path d="M${xy(d0)} Q${xy(c)} ${xy(d1)}" marker-end="url(#hmFleche)" style="stroke-width:${3 * u}px"/><circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="${4 * u}"/>
      <text x="${(d0[0] + 2).toFixed(1)}" y="${(d0[1] - 12 * u).toFixed(1)}" text-anchor="${ux < 0 ? 'end' : 'start'}" style="font-size:${14 * u}px">${hmEsc(HM_LIEUX[e[7]][0].split(' (')[0])}</text></g>`;
  });
  if(fl) svg += '<defs><marker id="hmFleche" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#7B1FA2"/></marker></defs>' + fl;
  hmGr = hmGroupes(pts.filter(p => hmSurVue(p.k)), pos, r);
  hmGr.forEach(g => {
    const [x, y] = g.xy, n = g.evts.filter(i => !hmEstompe(HM_EVTS[i])).length, X = x.toFixed(1), Y = y.toFixed(1), ici = k => g.ks.includes(k);
    svg += `<g class="hm-pt${n ? '' : ' estompe'}${ici(hmLieuSel) ? ' sel' : ''}${ici(courK) ? ' courant' : ''}" onclick="hmLieu('${g.ks[0]}')" tabindex="0" role="button"><title>${hmEsc(hmNoms(g))}</title>
      ${ici(courK) ? `<circle class="hm-pulse" cx="${X}" cy="${Y}" r="${r}"/>` : ''}<circle cx="${X}" cy="${Y}" r="${r}"/><text x="${X}" y="${(y + f * .36).toFixed(1)}" style="font-size:${f}px">${g.evts.length}</text></g>`;
  });
  svgBox.innerHTML = svg + '</svg>';
  // Commandes : retour au monde, lecture, curseur, époques.
  document.getElementById('hmRetour').innerHTML = monde ? '' : `<button type="button" class="hm-f" onclick="hmZoom('monde')">← Monde entier</button>`;
  document.getElementById('hmPlay').innerHTML = hmAnim ? '⏸ Pause' : '▶ Animer';
  const cur = document.getElementById('hmCurseur'); cur.max = Math.max(0, liste.length - 1); cur.value = hmPos === null ? liste.length - 1 : hmPos;
  document.getElementById('hmTempsLib').textContent = cour >= 0 ? `${HM_EVTS[cour][1]} · étape ${hmPos + 1} sur ${liste.length}` : `${liste.length} étapes`;
  document.getElementById('hmPeriodes').innerHTML = `<span>Époque :</span><button type="button" class="hm-f${!hmPer ? ' on' : ''}" onclick="hmPeriode('')">Toutes</button>` +
    HM_EPOQUES.map(([k, lib]) => `<button type="button" class="hm-f${hmPer === k ? ' on' : ''}" onclick="hmPeriode('${k}')">${lib}</button>`).join('');
  // Sous la carte : les étapes du lieu choisi, puis le texte de l'étape choisie.
  const sel = hmLieuSel && hmGr.find(g => g.ks.includes(hmLieuSel));
  let bas = sel && sel.evts.length > 1 ? `<div class="hm-lieu-liste"><b><span class="gicon">location_on</span> ${hmEsc(hmNoms(sel))}</b>${sel.evts.map(i => { const e = HM_EVTS[i]; return `<button type="button" class="hm-lieu-evt${hmEstompe(e) ? ' estompe' : ''}${hmEvtSel === i ? ' on' : ''}" onclick="hmChoisir(${i})"><span>${e[2]}</span> <span class="hm-lieu-date">${e[1]}</span> ${e[3]}</button>`; }).join('')}</div>` : '';
  if(hmEvtSel >= 0){
    const e = HM_EVTS[hmEvtSel], vis = e[5].filter(([n]) => hmVisible(n));
    bas += `<div class="hm-fiche${hmEstompe(e) ? ' estompe' : ''}"><div class="hm-fiche-tete"><span class="hm-fiche-emo">${e[2]}</span><span class="hm-lieu-date">${e[1]}</span> <b>${e[3]}</b></div>
      ${hmIllu(e, true)}<p>${e[4]}</p>${hmLieuTxt(e)}<div class="hm-vigs">${vis.map(hmVignette).join('')}${hmParoleOk() ? `<button type="button" class="hm-lien" onclick="hmEcouter(${hmEvtSel})">🔊 Écouter</button>` : ''}<button type="button" class="hm-lien" onclick="hmVoirEtape(${hmEvtSel})">Voir dans la frise ↓</button></div></div>`;
  } else if(!bas) bas = `<p class="hint hm-carte-aide">${monde ? 'Clique sur un point pour lire l\'étape (le nombre indique combien d\'étapes sont nées à cet endroit), sur un cadre pour zoomer, ou sur « Animer » pour voir l\'histoire se dérouler.' : 'Clique sur un point pour lire l\'étape, ou sur « Animer » pour voir l\'histoire se dérouler.'}</p>`;
  document.getElementById('hmBas').innerHTML = bas;
}
function hmStop(){ hmRun++; hmAnim = false; clearTimeout(hmTimer); if(hmParoleOk()) speechSynthesis.cancel(); }
function hmZoom(v){ hmVue = v; hmLieuSel = ''; hmMaj(); }
function hmLieu(k){
  hmStop(); hmLieuSel = hmLieuSel === k ? '' : k;
  const g = hmGr.find(g => g.ks.includes(k)); hmEvtSel = hmLieuSel && g ? g.evts[0] : -1; // première étape du point
  hmMaj();
}
function hmChoisir(i){ hmEvtSel = i; hmMaj(); }
function hmPeriode(k){ hmStop(); hmPer = k; hmPos = null; hmEvtSel = -1; hmLieuSel = ''; hmMaj(); }
// Aller à une étape du curseur : la carte montre les étapes jusqu'à celle-ci, et son texte dessous.
function hmAller(pos, auto){
  if(!auto) hmStop();
  const l = hmListePer(); if(!l.length) return;
  hmPos = Math.max(0, Math.min(l.length - 1, pos)); hmEvtSel = l[hmPos]; hmLieuSel = '';
  if(hmSuivre) hmVue = hmZoneDe(hmCle(hmEvtSel));
  hmMaj();
}
function hmPas(d){ const n = hmListePer().length; hmAller(hmPos === null ? (d > 0 ? 0 : n - 1) : hmPos + d); }
function hmAnimer(){
  if(hmAnim){ hmStop(); hmMaj(); return; }
  hmStop();
  const n = hmListePer().length, run = hmRun; let p = hmPos === null || hmPos >= n - 1 ? 0 : hmPos + 1;
  hmAnim = true;
  const suite = () => { if(run !== hmRun) return; if(p >= n - 1){ hmAnim = false; hmMaj(); return; } p++; pas(); };
  const pas = () => {
    if(run !== hmRun) return; // arrêtée entre-temps (pause, clic, autre époque…)
    const box = document.getElementById('hmSvg');
    if(!box || !box.offsetParent){ hmStop(); return; } // page quittée : on arrête
    hmAller(p, true);
    const e = HM_EVTS[hmEvtSel];
    if(hmVoix && hmParoleOk()) hmDire(hmTexteParle(e), () => { if(run === hmRun) hmTimer = setTimeout(suite, 900); });
    else hmTimer = setTimeout(suite, Math.max(HM_PAS_MS, e[4].length * 55));
  };
  pas();
}
function hmVoirEtape(i){
  const el = document.getElementById('hm-e' + i); if(!el) return;
  hmStop(); hmMaj();
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.remove('hm-flash'); void el.offsetWidth; el.classList.add('hm-flash');
}

(function hmStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .hm-filtres{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:8px 0 4px; } .hm-filtres > span{ font-weight:600; margin-right:4px; }
    .hm-f{ border:1.5px solid var(--c,#8A8F98); color:var(--c,#4E5665); background:#fff; border-radius:999px; padding:3px 12px; font:700 .82rem Inter,sans-serif; cursor:pointer; }
    .hm-f.on{ background:var(--c,#1C1B2E); color:#fff; border-color:var(--c,#1C1B2E); }
    .hm-aide{ margin:4px 0 12px; }
    .hm-frise{ position:relative; padding-left:4px; }
    .hm-frise::before{ content:''; position:absolute; left:121px; top:0; bottom:0; width:3px; background:linear-gradient(#C9B6E6,#9CC6E8,#B6DDBF); border-radius:2px; }
    .hm-epoque{ position:relative; margin:18px 0 8px; padding-left:146px; } .hm-epoque span{ display:inline-block; background:#1C1B2E; color:#fff; font:700 .85rem 'Space Grotesk',sans-serif; padding:4px 14px; border-radius:999px; }
    .hm-evt{ display:grid; grid-template-columns:104px 36px 1fr; gap:6px; align-items:start; margin:8px 0; transition:opacity .2s; }
    .hm-evt.estompe{ opacity:.32; }
    .hm-date{ text-align:right; font:700 .85rem 'JetBrains Mono',monospace; color:#4E5665; padding-top:10px; }
    .hm-point{ width:34px; height:34px; border-radius:50%; background:#fff; border:2px solid #C9B6E6; display:flex; align-items:center; justify-content:center; font-size:1.05rem; position:relative; z-index:1; margin-top:2px; }
    .hm-carte{ background:var(--card,#fff); border:1px solid #E3E6EC; border-radius:12px; padding:9px 13px; box-shadow:0 1px 4px rgba(28,27,46,.06); }
    .hm-titre{ font:700 1rem 'Space Grotesk',sans-serif; color:#1C1B2E; } .hm-carte p{ margin:4px 0 6px; line-height:1.5; font-size:.92rem; }
    .hm-vigs{ display:flex; flex-wrap:wrap; gap:4px; }
    .hm-vig{ border:0; background:var(--c); color:#fff; font:700 .72rem Inter,sans-serif; border-radius:6px; padding:2px 8px; cursor:pointer; opacity:.9; }
    .hm-vig:hover{ opacity:1; transform:translateY(-1px); } .hm-vig.on{ box-shadow:0 0 0 2px #fff, 0 0 0 4px var(--c); }
    .hm-lieu{ font-size:.78rem; color:#6B7280; margin:-2px 0 5px; display:flex; align-items:center; gap:2px; } .hm-lieu .gicon{ font-size:15px; color:#C2410C; }
    .hm-evt.hm-flash .hm-carte{ animation:hmFlash 1.6s ease; } @keyframes hmFlash{ 0%,40%{ box-shadow:0 0 0 3px #F59E0B; } 100%{ box-shadow:0 1px 4px rgba(28,27,46,.06); } }
    .hm-carte-monde{ background:var(--card,#fff); border:1px solid #E3E6EC; border-radius:14px; padding:10px 12px; margin:0 0 14px; }
    .hm-carte-tete{ display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px; font-family:'Space Grotesk',sans-serif; } .hm-carte-tete .gicon{ vertical-align:-4px; color:#2F6FB3; }
    .hm-temps{ display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin:4px 0 6px; } .hm-temps input[type=range]{ flex:1 1 180px; accent-color:#C2410C; }
    .hm-play{ border:0; background:#C2410C; color:#fff; border-radius:999px; padding:5px 14px; font:700 .85rem Inter,sans-serif; cursor:pointer; min-width:96px; }
    .hm-pas{ border:1px solid #D7DBE2; background:#fff; border-radius:8px; padding:3px 8px; cursor:pointer; font-size:.8rem; }
    .hm-temps-lib{ font:700 .8rem 'JetBrains Mono',monospace; color:#4E5665; min-width:150px; } .hm-suivre{ font-size:.8rem; color:#4E5665; display:flex; align-items:center; gap:4px; }
    .hm-periodes{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; margin-bottom:8px; } .hm-periodes > span{ font-size:.85rem; font-weight:600; } .hm-periodes .hm-f{ font-size:.75rem; padding:2px 10px; }
    .hm-svg{ width:100%; height:auto; display:block; max-height:72vh; } .hm-svg.zoom{ border-radius:8px; }
    .hm-mer{ fill:#E3F0FA; stroke:#9CC6E8; stroke-width:1.2; } .hm-grat{ fill:none; stroke:#fff; stroke-width:.8; } .hm-terre{ fill:#E8DFC9; stroke:#B9A882; stroke-width:.6; stroke-linejoin:round; }
    .hm-zone{ cursor:pointer; } .hm-zone path{ fill:rgba(194,65,12,.06); stroke:#C2410C; stroke-width:1.6; stroke-dasharray:6 4; } .hm-zone:hover path{ fill:rgba(194,65,12,.14); }
    .hm-zone.courant path{ fill:rgba(245,158,11,.22); stroke:#F59E0B; stroke-width:2.5; }
    .hm-zone-txt{ font:700 13px Inter,sans-serif; fill:#C2410C; paint-order:stroke; stroke:#fff; stroke-width:3px; }
    .hm-trajet path{ fill:none; stroke:#7B1FA2; stroke-width:3; stroke-dasharray:8 5; } .hm-trajet circle{ fill:#7B1FA2; stroke:#fff; stroke-width:1.5; } .hm-trajet text{ font:700 14px Inter,sans-serif; fill:#7B1FA2; paint-order:stroke; stroke:#fff; stroke-width:3px; } .hm-trajet.estompe{ opacity:.3; }
    .hm-pt{ cursor:pointer; } .hm-pt circle{ fill:#C2410C; stroke:#fff; stroke-width:2; } .hm-pt text{ fill:#fff; font-family:Inter,sans-serif; font-weight:800; text-anchor:middle; pointer-events:none; }
    .hm-pt:hover circle, .hm-pt.sel circle{ fill:#7B1FA2; } .hm-pt.courant circle{ fill:#F59E0B; } .hm-pt.estompe{ opacity:.3; }
    .hm-pt circle.hm-pulse{ fill:none; stroke:#F59E0B; stroke-width:3; transform-box:fill-box; transform-origin:center; animation:hmPulse 1.4s ease-out infinite; }
    @keyframes hmPulse{ from{ transform:scale(1); opacity:1; } to{ transform:scale(2.4); opacity:0; } }
    .hm-carte-aide{ margin:6px 0 0; } .hm-proj{ font-size:.78rem; color:#6B7280; margin:8px 0 0; line-height:1.45; } .hm-proj summary{ cursor:pointer; font-weight:600; }
    .hm-lieu-liste{ margin-top:8px; display:flex; flex-wrap:wrap; gap:6px; align-items:center; } .hm-lieu-liste > b{ width:100%; font-size:.9rem; } .hm-lieu-liste > b .gicon{ font-size:17px; vertical-align:-3px; color:#C2410C; }
    .hm-lieu-evt{ border:1px solid #E3E6EC; background:#FAFAFB; border-radius:10px; padding:4px 10px; font:600 .84rem Inter,sans-serif; cursor:pointer; text-align:left; } .hm-lieu-evt:hover{ border-color:#C2410C; } .hm-lieu-evt.on{ border-color:#7B1FA2; background:#F5EEFB; } .hm-lieu-evt.estompe{ opacity:.4; }
    .hm-lieu-date{ font:700 .76rem 'JetBrains Mono',monospace; color:#6B7280; }
    .hm-fiche{ margin-top:8px; border-left:4px solid #F59E0B; background:#FFFBF2; border-radius:10px; padding:9px 13px; animation:hmApparait .35s ease; } .hm-fiche.estompe{ opacity:.55; }
    .hm-fiche-tete{ display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; } .hm-fiche-tete b{ font:700 1.02rem 'Space Grotesk',sans-serif; } .hm-fiche-emo{ font-size:1.2rem; }
    .hm-fiche p{ margin:5px 0 6px; line-height:1.5; font-size:.94rem; }
    .hm-lien{ border:0; background:none; color:#2F6FB3; font:600 .8rem Inter,sans-serif; cursor:pointer; padding:2px 4px; margin-left:auto; }
    .hm-illu{ float:right; margin:2px 0 6px 12px; width:132px; } .hm-illu.grand{ width:200px; }
    .hm-illu-img{ display:block; width:100%; padding:0; border:1px solid #E3E6EC; border-radius:8px; overflow:hidden; background:#F4F1EA; cursor:zoom-in; }
    .hm-illu img{ display:block; width:100%; height:auto; max-height:150px; object-fit:cover; } .hm-illu.grand img{ max-height:220px; object-fit:contain; }
    .hm-illu figcaption{ font-size:.68rem; line-height:1.3; color:#6B7280; margin-top:3px; } .hm-illu.grand figcaption{ font-size:.74rem; }
    .hm-credit a{ color:inherit; } .hm-carte::after, .hm-fiche::after{ content:''; display:block; clear:both; }
    .hm-loupe{ position:fixed; inset:0; z-index:660; background:rgba(20,20,30,.82); display:flex; align-items:center; justify-content:center; padding:16px; cursor:zoom-out; }
    .hm-loupe figure{ position:relative; margin:0; background:#fff; border-radius:12px; padding:10px; max-width:min(920px, 96vw); cursor:default; }
    .hm-loupe img{ display:block; max-width:100%; max-height:76vh; margin:0 auto; border-radius:6px; }
    .hm-loupe figcaption{ font-size:.85rem; color:#4E5665; margin-top:6px; line-height:1.4; } .hm-loupe-x{ position:absolute; top:-14px; right:-14px; width:32px; height:32px; border-radius:50%; border:0; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.3); cursor:pointer; }
    @media (max-width:640px){ .hm-illu{ width:96px; } .hm-illu.grand{ float:none; width:100%; margin:4px 0 8px; } .hm-illu.grand img{ max-height:240px; } }
    @keyframes hmApparait{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
    @media (max-width:640px){ .hm-frise::before{ left:17px; } .hm-epoque{ padding-left:44px; } .hm-evt{ grid-template-columns:36px 1fr; } .hm-date{ grid-column:2; text-align:left; padding:0; order:-1; } .hm-point{ grid-row:1 / span 2; } .hm-carte{ grid-column:2; } }
  `;
  document.head.appendChild(s);
})();
