/* =====================================================================
   assets/lexique/donnees.js -- Lexique : le vocabulaire nommé par les programmes officiels, du CP à la 3e, avec sa définition.
   Demandé le 02/11/2026 : « Et si on faisait un lexique avec tout le vocabulaire par niveau à savoir et sa définition »,
   pour les élèves et pour les professeurs (« Les deux ! »), dans le menu L'Atelier, visible par tous.

   Mots et niveaux : ceux du tableau des notions (assets/programmes/notions.js, d'après les textes officiels) -- le niveau
   est celui où le texte nomme le mot pour la première fois ; nv = 1 : mot du nouveau programme du cycle 4 (4e à la rentrée
   2027, 3e à la rentrée 2028). Pour chaque mot :
     m : le mot (tel que le nomme le programme)      n : niveau (cp … 3e)      d : domaine (N, G, E, D, P, I, R)
     t : notion du tableau                            e : définition pour l'élève (au niveau du mot)
     x : exemple                                      p : précision pour le professeur
   Formules entre $…$ (KaTeX). Fractions toujours en LaTeX ; nombres en lettres en orthographe rectifiée.
   ===================================================================== */
(typeof window !== 'undefined' ? window : globalThis).LEXIQUE = [
 {
"m": "unité",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un objet tout seul, compté pour un. Dans un nombre, le chiffre des unités est celui de droite.",
"x": "Dans 47, il y a 7 unités.",
"p": "Unité de numération. Le programme demande de relier unités et dizaines (10 unités = 1 dizaine) ; à distinguer de l'unité de mesure (le mètre, le gramme…)."
},
 {
"m": "dizaine",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 10 unités.",
"x": "Dans 47, il y a 4 dizaines et 7 unités. 1 dizaine = 10 unités.",
"p": "Au CP, les nombres jusqu'à 100 s'écrivent et se décomposent en dizaines et unités ; les groupements effectifs (paquets de 10) précèdent l'écriture chiffrée."
},
 {
"m": "égal à",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Deux quantités sont égales quand elles ont la même valeur. On écrit le signe =.",
"x": "3 + 2 est égal à 5 : 3 + 2 = 5.",
"p": "Le signe = exprime une équivalence et non « le résultat est » : faire lire 5 = 3 + 2 et compléter des égalités à trous (… + 2 = 5)."
},
 {
"m": "autant que",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Il y a autant de choses quand les deux collections ont le même nombre d'objets.",
"x": "3 crayons et 3 gommes : il y a autant de crayons que de gommes.",
"p": "Comparaison de collections par correspondance terme à terme, puis par le dénombrement."
},
 {
"m": "plus que",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Il y en a plus quand une collection a un plus grand nombre d'objets que l'autre.",
"x": "5 billes, c'est plus que 3 billes.",
"p": "Vocabulaire de comparaison, avant les symboles < et > (CE1)."
},
 {
"m": "plus grand que",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un nombre est plus grand qu'un autre quand il vient après lui dans la suite des nombres.",
"x": "8 est plus grand que 5.",
"p": "Se traduit par le symbole > à partir du CE1 (« supérieur à »)."
},
 {
"m": "moins que",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Il y en a moins quand une collection a un plus petit nombre d'objets que l'autre.",
"x": "2 pommes, c'est moins que 6 pommes.",
"p": "Vocabulaire de comparaison des quantités ; « combien de moins » prépare la soustraction (écart)."
},
 {
"m": "plus petit que",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un nombre est plus petit qu'un autre quand il vient avant lui dans la suite des nombres.",
"x": "4 est plus petit que 9.",
"p": "Se traduit par le symbole < à partir du CE1 (« inférieur à »)."
},
 {
"m": "ordre croissant",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Ranger dans l'ordre croissant, c'est ranger du plus petit au plus grand.",
"x": "3 ; 7 ; 12 ; 20 sont rangés dans l'ordre croissant.",
"p": "Au cycle 3, l'ordre croissant s'écrit avec le symbole < (3 < 7 < 12)."
},
 {
"m": "ordre décroissant",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Ranger dans l'ordre décroissant, c'est ranger du plus grand au plus petit.",
"x": "20 ; 12 ; 7 ; 3 sont rangés dans l'ordre décroissant.",
"p": "Au cycle 3, l'ordre décroissant s'écrit avec le symbole > (20 > 12 > 7)."
},
 {
"m": "premier… vingtième",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Les mots qui donnent la place (le rang) dans une file : premier, deuxième, troisième…",
"x": "Dans la file, Léa est la troisième.",
"p": "Nombres ordinaux (aspect ordinal du nombre), à distinguer de l'aspect cardinal (combien). Le programme du CP va jusqu'au vingtième."
},
 {
"m": "+",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le signe plus. Il sert à écrire une addition : on ajoute.",
"x": "4 + 3 = 7 se lit « quatre plus trois égale sept ».",
"p": "Signe de l'addition ; le résultat est la somme, les nombres ajoutés sont les termes (CE2)."
},
 {
"m": "−",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le signe moins. Il sert à écrire une soustraction : on enlève, ou on cherche l'écart.",
"x": "9 − 4 = 5 se lit « neuf moins quatre égale cinq ».",
"p": "Signe de la soustraction ; le résultat est la différence (CE2). Sens à travailler : retrait, écart, complément."
},
 {
"m": "=",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le signe égal. Il dit que ce qui est à gauche a la même valeur que ce qui est à droite.",
"x": "2 + 3 = 5 et aussi 5 = 4 + 1.",
"p": "Signe d'équivalence ; éviter la lecture « donne ». Base des égalités à trous puis des équations (5e)."
},
 {
"m": "fois",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le mot « fois » sert à dire qu'on répète la même quantité plusieurs fois.",
"x": "3 fois 2 jetons, c'est 2 + 2 + 2 = 6 jetons.",
"p": "Approche de la multiplication par l'addition itérée ; le signe × arrive au CE1."
},
 {
"m": "double",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Calcul mental et automatismes",
"e": "Le double d'un nombre, c'est deux fois ce nombre : on l'ajoute à lui-même.",
"x": "Le double de 4 est 8, car 4 + 4 = 8.",
"p": "Doubles et moitiés sont des faits numériques à mémoriser (automatismes) ; au cycle 3 : double = × 2."
},
 {
"m": "moitié",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Calcul mental et automatismes",
"e": "La moitié d'une quantité, c'est ce qu'on obtient en la partageant en deux parts égales.",
"x": "La moitié de 10 est 5, car 5 + 5 = 10.",
"p": "Lien avec le partage équitable et, plus tard, la fraction $\\frac{1}{2}$ (CE1) et la division par 2."
},
 {
"m": "complément",
"n": "cp",
"nv": 0,
"d": "N",
"t": "Calcul mental et automatismes",
"e": "Le complément, c'est ce qu'il faut ajouter pour arriver à un nombre.",
"x": "Le complément de 7 à 10 est 3, car 7 + 3 = 10.",
"p": "Compléments à 10 puis à la dizaine supérieure et à 100 : appui du calcul mental et du sens « écart » de la soustraction."
},
 {
"m": "long",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Qui a une grande longueur.",
"x": "Le ruban rouge est plus long que le ruban bleu.",
"p": "Comparaison directe de longueurs, avant la mesure avec une unité."
},
 {
"m": "court",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Qui a une petite longueur, le contraire de long.",
"x": "Le crayon est plus court que la règle.",
"p": "Comparaison directe ou par report (bande de papier) avant l'usage de la règle graduée."
},
 {
"m": "près",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "À une petite distance.",
"x": "L'école est près de la boulangerie.",
"p": "Repérage dans l'espace proche ; prépare la notion de distance (6e)."
},
 {
"m": "loin",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "À une grande distance, le contraire de près.",
"x": "La montagne est loin de la maison.",
"p": "Vocabulaire spatial ; prépare la notion de distance."
},
 {
"m": "mètre (m)",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Une unité pour mesurer les longueurs. Un mètre, c'est environ un grand pas d'adulte.",
"x": "Le tableau mesure 3 m de long.",
"p": "Unité de référence du système métrique ; 1 m = 100 cm. Les conversions se construisent sur la numération (pas de tableau au CM)."
},
 {
"m": "centimètre (cm)",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Une petite unité de longueur : il en faut 100 pour faire un mètre.",
"x": "Ma gomme mesure 4 cm.",
"p": "Mesure à la règle graduée (le zéro de la règle !) ; 1 m = 100 cm."
},
 {
"m": "lourd",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Masses",
"e": "Qui a une grande masse.",
"x": "Le cartable est plus lourd que la trousse.",
"p": "Comparaison de masses à la main puis avec une balance Roberval, avant la mesure."
},
 {
"m": "léger",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Masses",
"e": "Qui a une petite masse, le contraire de lourd.",
"x": "Une plume est très légère.",
"p": "Attention au piège « gros = lourd » : un gros objet peut être léger."
},
 {
"m": "plus cher",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Qui coûte plus d'argent.",
"x": "Le livre à 8 € est plus cher que le cahier à 3 €.",
"p": "Comparaison de prix : appui pour les problèmes de comparaison (écart)."
},
 {
"m": "moins cher",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Qui coûte moins d'argent.",
"x": "Le cahier à 3 € est moins cher que le livre à 8 €.",
"p": "Problèmes de comparaison : « combien de moins » se calcule par une soustraction."
},
 {
"m": "rendre la monnaie",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Quand on paie avec plus d'argent que le prix, le vendeur rend la différence : c'est la monnaie.",
"x": "Je paie 10 € un jouet à 7 € : on me rend 3 €.",
"p": "Mobilise le complément (de 7 à 10) ; calcul souvent fait en avançant (« 7, 8, 9, 10 »)."
},
 {
"m": "billet",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Un papier qui vaut de l'argent : 5 €, 10 €, 20 €, 50 €…",
"x": "Un billet de 10 € vaut deux billets de 5 €.",
"p": "Échanges et équivalences entre billets et pièces : lien avec la numération (10 billets de 10 € = 100 €)."
},
 {
"m": "pièce",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Une petite pièce de métal qui vaut de l'argent : 1 €, 2 €, mais aussi des centimes.",
"x": "Une pièce de 2 € vaut deux pièces de 1 €.",
"p": "Les centimes arrivent au CE1 (1 € = 100 centimes)."
},
 {
"m": "somme",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "La somme, c'est le résultat d'une addition. On dit aussi « une somme d'argent ».",
"x": "La somme de 4 et 5 est 9. J'ai une somme de 12 € dans ma tirelire.",
"p": "Au CP dans le contexte de la monnaie ; terme mathématique (résultat de l'addition) fixé au CE2, avec « terme »."
},
 {
"m": "reste",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Ce qui reste, ce qui n'a pas été pris ou dépensé.",
"x": "J'avais 10 €, j'ai dépensé 6 € : il me reste 4 €.",
"p": "Au CP : sens de retrait. Plus tard, le reste de la division euclidienne (CM1, nommé en 6e-5e) : dans 17 = 3 × 5 + 2, le reste est 2."
},
 {
"m": "euro",
"n": "cp",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "La monnaie utilisée en France. On l'écrit €.",
"x": "Ce goûter coûte 2 €.",
"p": "1 € = 100 centimes (CE1) ; les prix décimaux (2,50 €) servent d'appui aux décimaux au cycle 3."
},
 {
"m": "gauche",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Le côté de la main qui ne sert pas à écrire pour la plupart des gens ; le contraire de droite.",
"x": "Le stylo est à gauche du cahier.",
"p": "Repérage relatif : la gauche dépend du point de vue (gauche de l'élève ou d'un personnage face à lui)."
},
 {
"m": "droite",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Le côté opposé à la gauche.",
"x": "La porte est à droite de la fenêtre.",
"p": "Ici, sens spatial (côté droit). En géométrie, « une droite » est une ligne droite illimitée (cycle 2 et 3) : penser à lever l'ambiguïté."
},
 {
"m": "sur",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Posé au-dessus et touchant.",
"x": "Le livre est sur la table.",
"p": "Vocabulaire de position ; s'oppose à « sous »."
},
 {
"m": "sous",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "En dessous, le contraire de sur.",
"x": "Le chat est sous la chaise.",
"p": "Vocabulaire de position ; s'oppose à « sur »."
},
 {
"m": "entre",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Au milieu de deux choses.",
"x": "Le 5 est entre le 4 et le 6.",
"p": "Vocabulaire spatial puis numérique : encadrement (« compris entre … et … », CE1)."
},
 {
"m": "devant",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Du côté de la face, en avant.",
"x": "Le maître est devant le tableau.",
"p": "Repérage relatif à une orientation (d'un objet, d'une personne)."
},
 {
"m": "derrière",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Du côté du dos, en arrière ; le contraire de devant.",
"x": "Le ballon est derrière l'arbre.",
"p": "Repérage relatif à une orientation."
},
 {
"m": "au-dessus",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Plus haut, sans forcément toucher.",
"x": "La lampe est au-dessus de la table.",
"p": "À distinguer de « sur » (contact)."
},
 {
"m": "en dessous",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Plus bas, le contraire de au-dessus.",
"x": "Le tapis est en dessous de la table.",
"p": "À distinguer de « sous » dans les descriptions de plans et de maquettes."
},
 {
"m": "point",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "Une position précise sur une feuille. On le marque d'une petite croix et on le nomme avec une lettre majuscule.",
"x": "Le point A.",
"p": "Convention du site : croix pour un point isolé ; petit trait perpendiculaire pour un point sur une ligne."
},
 {
"m": "segment",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "Un morceau de ligne droite qui a deux bouts (ses extrémités).",
"x": "Le segment [AB] relie le point A et le point B.",
"p": "La notation [AB] et la longueur AB se distinguent au cycle 3 ; le segment est limité, la droite non."
},
 {
"m": "disque",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une surface ronde et pleine, comme une pièce de monnaie posée à plat.",
"x": "Une galette a la forme d'un disque.",
"p": "Le disque est une surface ; le cercle en est le bord (une ligne)."
},
 {
"m": "carré",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une figure à quatre côtés de même longueur et quatre angles droits.",
"x": "Une case d'un quadrillage est un carré.",
"p": "Au cycle 3 : quadrilatère qui est à la fois un losange et un rectangle (définitions par propriétés)."
},
 {
"m": "rectangle",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une figure à quatre côtés et quatre angles droits. Ses côtés opposés ont la même longueur.",
"x": "Une feuille de cahier a la forme d'un rectangle.",
"p": "Définition attendue au cycle 3 : quadrilatère qui a quatre angles droits. Un carré est un rectangle particulier."
},
 {
"m": "triangle",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une figure fermée qui a trois côtés droits et trois sommets.",
"x": "Le triangle ABC.",
"p": "Polygone à trois côtés ; classement par côtés (isocèle, équilatéral) et par angles (rectangle) au fil du cycle 2."
},
 {
"m": "sommet",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un « coin » d'une figure, là où deux côtés se rencontrent. Pour un solide, c'est là où des arêtes se rencontrent.",
"x": "Un carré a quatre sommets.",
"p": "Sommet d'un polygone, d'un angle, d'un solide : même mot, trois contextes."
},
 {
"m": "côté",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un des segments qui forment le bord d'une figure.",
"x": "Un triangle a trois côtés.",
"p": "Côté d'un polygone ; « côtés » d'un angle (demi-droites, cycle 3)."
},
 {
"m": "cube",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide qui a six faces carrées toutes pareilles, comme un dé.",
"x": "Un dé à jouer est un cube.",
"p": "Le cube est un pavé droit particulier ; 6 faces, 12 arêtes, 8 sommets."
},
 {
"m": "boule",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide tout rond, comme une balle.",
"x": "Une bille est une boule.",
"p": "Le bord d'une boule est une sphère (3e)."
},
 {
"m": "cône",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide qui a une base ronde et une pointe.",
"x": "Un cornet de glace a la forme d'un cône.",
"p": "Cône de révolution en 4e (rotation d'un triangle rectangle autour d'un côté de l'angle droit)."
},
 {
"m": "cylindre",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide qui a deux faces rondes et pareilles reliées par une surface courbe, comme une boîte de conserve.",
"x": "Un rouleau d'essuie-tout est un cylindre.",
"p": "Cylindre de révolution en 5e ; ses deux bases sont des disques."
},
 {
"m": "pavé",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide qui a six faces rectangulaires, comme une boîte à chaussures.",
"x": "Une brique a la forme d'un pavé.",
"p": "Appelé « pavé droit » à partir du CE1 (parallélépipède rectangle)."
},
 {
"m": "face",
"n": "cp",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Une surface plate d'un solide.",
"x": "Un dé a six faces.",
"p": "Faces planes des polyèdres ; un cylindre a deux faces planes (ses bases) et une surface courbe."
},
 {
"m": "le plus",
"n": "cp",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Celui qui a la plus grande quantité.",
"x": "Dans le tableau, c'est le vélo qui a le plus de votes.",
"p": "Lecture de données : repérer le maximum dans un tableau ou un diagramme."
},
 {
"m": "le moins",
"n": "cp",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Celui qui a la plus petite quantité.",
"x": "C'est le bus qui a le moins de votes.",
"p": "Lecture de données : repérer le minimum."
},
 {
"m": "le plus grand",
"n": "cp",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Celui qui est plus grand que tous les autres.",
"x": "Parmi 12, 30 et 25, le plus grand est 30.",
"p": "Repérer le maximum d'une série ; prépare l'étendue (4e)."
},
 {
"m": "le plus petit",
"n": "cp",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Celui qui est plus petit que tous les autres.",
"x": "Parmi 12, 30 et 25, le plus petit est 12.",
"p": "Repérer le minimum d'une série."
},
 {
"m": "centaine",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 100 unités, ou de 10 dizaines.",
"x": "Dans 347, il y a 3 centaines, 4 dizaines et 7 unités.",
"p": "Relations entre unités de numération : 1 centaine = 10 dizaines = 100 unités ; décompositions non canoniques (2 centaines 27 dizaines)."
},
 {
"m": "supérieur à",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un nombre est supérieur à un autre s'il est plus grand. On écrit le signe >.",
"x": "9 > 4 se lit « 9 est supérieur à 4 ».",
"p": "La pointe du signe est tournée vers le plus petit nombre. « Supérieur ou égal » (≥) au collège."
},
 {
"m": "inférieur à",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un nombre est inférieur à un autre s'il est plus petit. On écrit le signe <.",
"x": "3 < 8 se lit « 3 est inférieur à 8 ».",
"p": "Utilisé pour comparer et ranger ; « strictement inférieur » au collège avec les relatifs."
},
 {
"m": "compris entre … et …",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un nombre est compris entre deux autres quand il est plus grand que le premier et plus petit que le second.",
"x": "35 est compris entre 30 et 40 : 30 < 35 < 40.",
"p": "Encadrements à la dizaine, à la centaine ; au cycle 3, encadrement des décimaux."
},
 {
"m": "pair",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Multiples, diviseurs, nombres premiers",
"e": "Un nombre pair se partage en deux parts égales sans reste. Son chiffre des unités est 0, 2, 4, 6 ou 8.",
"x": "14 est pair : 14 = 7 + 7.",
"p": "Nombre multiple de 2 ; critère de divisibilité par 2 (cycle 3)."
},
 {
"m": "impair",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Multiples, diviseurs, nombres premiers",
"e": "Un nombre qui n'est pas pair. Son chiffre des unités est 1, 3, 5, 7 ou 9.",
"x": "15 est impair : on ne peut pas faire deux paquets égaux.",
"p": "Un impair s'écrit 2k + 1 (5e : calcul littéral)."
},
 {
"m": "demi",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Une des deux parts égales d'une unité partagée en deux.",
"x": "Un demi, c'est $\\frac{1}{2}$. Deux demis font un entier.",
"p": "Fraction unitaire $\\frac{1}{2}$ ; au CE1, fractions comme partage de l'unité (grandeurs : longueurs, surfaces)."
},
 {
"m": "quart",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Une des quatre parts égales d'une unité partagée en quatre.",
"x": "Un quart, c'est $\\frac{1}{4}$. Quatre quarts font un entier.",
"p": "$\\frac{1}{4}$ = moitié de la moitié ; s'appuie sur des pliages, des bandes, le quart d'heure."
},
 {
"m": "numérateur",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Dans une fraction, le nombre du haut : il dit combien de parts on prend.",
"x": "Dans $\\frac{3}{4}$, le numérateur est 3.",
"p": "Au cycle 3, le numérateur compte les parts ; en 6e, la fraction $\\frac{a}{b}$ devient le quotient de a par b."
},
 {
"m": "dénominateur",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Dans une fraction, le nombre du bas : il dit en combien de parts égales on a partagé l'unité.",
"x": "Dans $\\frac{3}{4}$, le dénominateur est 4 : l'unité est partagée en 4.",
"p": "Dénominateurs « raisonnables » au cycle 2 (2, 3, 4, 5, 6, 8, 10) ; dénominateur ≠ 0."
},
 {
"m": "« trois huitièmes »",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "C'est ainsi qu'on lit la fraction $\\frac{3}{8}$ : trois parts quand l'unité est partagée en huit.",
"x": "$\\frac{3}{8}$ se lit « trois huitièmes » ; $\\frac{1}{2}$ « un demi » ; $\\frac{2}{3}$ « deux tiers ».",
"p": "Lecture des fractions : demi, tiers, quart, puis le dénominateur suivi de « -ième » ; l'oral explicite le sens (3 fois un huitième)."
},
 {
"m": "×",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le signe « fois » de la multiplication.",
"x": "4 × 3 = 12 se lit « quatre fois trois égale douze ».",
"p": "La multiplication comme addition itérée puis comme produit ; commutativité (4 × 3 = 3 × 4)."
},
 {
"m": "« par cassage »",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Calculer en cassant un nombre en morceaux plus faciles.",
"x": "36 + 27 = 36 + 20 + 7 = 56 + 7 = 63.",
"p": "Stratégie de calcul mental par décomposition additive d'un terme."
},
 {
"m": "« par compensation »",
"n": "ce1",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Calculer en changeant un nombre pour rendre le calcul facile, puis corriger.",
"x": "47 + 9 = 47 + 10 − 1 = 56.",
"p": "Stratégie de calcul mental : ajouter 10 puis enlever 1 ; prépare la conservation des écarts."
},
 {
"m": "kilomètre (km)",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Une grande unité de longueur, pour les distances : 1 km = 1 000 m.",
"x": "L'école est à 2 km de la piscine.",
"p": "Ordre de grandeur : environ un quart d'heure à pied."
},
 {
"m": "gramme (g)",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Masses",
"e": "Une petite unité de masse.",
"x": "Une feuille de papier pèse environ 5 g.",
"p": "1 kg = 1 000 g ; usage de la balance à aiguille ou numérique."
},
 {
"m": "kilogramme (kg)",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Masses",
"e": "Une unité de masse : 1 kg = 1 000 g.",
"x": "Un paquet de sucre pèse 1 kg.",
"p": "Repère : un litre d'eau a une masse d'environ 1 kg."
},
 {
"m": "centime",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Une petite partie de l'euro : il faut 100 centimes pour faire 1 euro.",
"x": "Une pièce de 50 centimes.",
"p": "1 € = 100 c ; appui des décimaux (2,35 € = 2 € et 35 c)."
},
 {
"m": "centime d’euro",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Monnaie",
"e": "Le nom complet du centime : la centième partie d'un euro.",
"x": "Une baguette coûte 1 euro et 10 centimes d'euro.",
"p": "Lien avec le centième (CM1) : 1 c = 0,01 €."
},
 {
"m": "heure (h)",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une unité pour mesurer le temps. Une journée dure 24 heures.",
"x": "L'école commence à 8 h 30.",
"p": "1 h = 60 min : système sexagésimal, source d'erreurs dans les calculs de durée."
},
 {
"m": "minute (min)",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une unité de temps : il y a 60 minutes dans une heure.",
"x": "La récréation dure 15 min.",
"p": "1 min = 60 s (seconde : CM2)."
},
 {
"m": "demi-heure",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "La moitié d'une heure : 30 minutes.",
"x": "Il est 3 h et demie : 3 h 30.",
"p": "Lien avec la fraction $\\frac{1}{2}$ et la lecture de l'horloge à aiguilles."
},
 {
"m": "quart d’heure",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Le quart d'une heure : 15 minutes.",
"x": "Il est 4 h et quart : 4 h 15.",
"p": "Lien avec $\\frac{1}{4}$ ; « moins le quart » au CE2."
},
 {
"m": "« trois heures de l’après-midi »",
"n": "ce1",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "L'heure de l'après-midi qui se lit 3 h sur l'horloge et s'écrit 15 h.",
"x": "3 heures de l'après-midi = 15 h.",
"p": "Correspondance entre la lecture sur 12 h (horloge) et l'écriture sur 24 h."
},
 {
"m": "à gauche",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Du côté gauche.",
"x": "Tourne à gauche au carrefour.",
"p": "Déplacements codés (flèches, programmation) : tourner à gauche d'un quart de tour."
},
 {
"m": "à droite",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Du côté droit.",
"x": "La mairie est à droite de l'église.",
"p": "Repérage relatif ; codage de déplacements."
},
 {
"m": "milieu d’un segment",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "Le point du segment qui est à la même distance des deux extrémités.",
"x": "Si [AB] mesure 6 cm, son milieu est à 3 cm de A et à 3 cm de B.",
"p": "Le milieu appartient au segment et est équidistant des extrémités ; lien avec la médiatrice (6e)."
},
 {
"m": "angle",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "La figure formée par deux côtés qui partent d'un même point, le sommet. Il « s'ouvre » plus ou moins.",
"x": "Les aiguilles d'une horloge forment un angle.",
"p": "Au cycle 3 : angle saillant formé par deux demi-droites de même origine, mesuré en degrés (6e) ; la longueur des côtés ne compte pas."
},
 {
"m": "angle droit",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Un angle comme le coin d'une feuille. On le vérifie avec l'équerre.",
"x": "Les quatre angles d'un rectangle sont droits.",
"p": "Mesure 90° (cycle 3) ; codage par un petit carré."
},
 {
"m": "angle aigu",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Un angle plus petit qu'un angle droit, « plus fermé ».",
"x": "La pointe d'une part de pizza forme un angle aigu.",
"p": "Mesure strictement comprise entre 0° et 90°."
},
 {
"m": "angle obtus",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Un angle plus grand qu'un angle droit, « plus ouvert ».",
"x": "Un éventail bien ouvert forme un angle obtus.",
"p": "Mesure strictement comprise entre 90° et 180°."
},
 {
"m": "cercle",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une ligne ronde fermée : tous ses points sont à la même distance du centre. On le trace au compas.",
"x": "Le bord d'une pièce de monnaie a la forme d'un cercle.",
"p": "Ensemble des points à une distance donnée (le rayon) du centre (définition en 6e) ; le cercle est une ligne, le disque une surface."
},
 {
"m": "centre",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Le point au milieu d'un cercle, où l'on pique la pointe du compas.",
"x": "Le cercle de centre O.",
"p": "Centre d'un cercle ; centre de symétrie (5e)."
},
 {
"m": "triangle rectangle",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un triangle qui a un angle droit.",
"x": "Une équerre a la forme d'un triangle rectangle.",
"p": "Le côté opposé à l'angle droit est l'hypoténuse (4e, Pythagore)."
},
 {
"m": "pyramide",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide dont la base est un polygone et dont les autres faces sont des triangles qui se rejoignent en un sommet.",
"x": "Les pyramides d'Égypte ont une base carrée.",
"p": "Une pyramide à base de n côtés a n + 1 faces, 2n arêtes et n + 1 sommets."
},
 {
"m": "arête",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Le bord droit où deux faces d'un solide se rencontrent.",
"x": "Un cube a 12 arêtes.",
"p": "Arêtes visibles en traits pleins, cachées en pointillés en perspective (5e)."
},
 {
"m": "pavé droit",
"n": "ce1",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide qui a six faces rectangulaires ; les faces opposées sont pareilles.",
"x": "Une boîte de céréales est un pavé droit.",
"p": "Parallélépipède rectangle ; volume = longueur × largeur × hauteur (cycle 3)."
},
 {
"m": "tableau à double entrée",
"n": "ce1",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Un tableau avec des lignes et des colonnes : on lit une case en croisant une ligne et une colonne.",
"x": "Le tableau des goûters préférés par classe.",
"p": "Lecture et construction ; organisation de données selon deux critères."
},
 {
"m": "diagramme en barres",
"n": "ce1",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Un dessin où chaque quantité est représentée par une barre : plus la barre est haute, plus la quantité est grande.",
"x": "Le nombre d'élèves nés chaque mois.",
"p": "Les barres ont même largeur et sont séparées ; à distinguer de l'histogramme (3e)."
},
 {
"m": "millier",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 1 000 unités, ou de 10 centaines.",
"x": "Dans 4 352, il y a 4 milliers.",
"p": "1 millier = 10 centaines = 100 dizaines = 1 000 unités ; la classe des mille."
},
 {
"m": "multiple",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Multiples, diviseurs, nombres premiers",
"e": "Un multiple d'un nombre, c'est un résultat de sa table de multiplication.",
"x": "12 est un multiple de 3, car 3 × 4 = 12.",
"p": "a est multiple de b s'il existe un entier k tel que a = k × b ; « b divise a » (diviseur, CM1)."
},
 {
"m": "quart d’unité",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "La part obtenue quand on partage une unité en quatre parts égales.",
"x": "Sur la demi-droite graduée, 1 quart d'unité est à mi-chemin entre 0 et un demi.",
"p": "Placer des fractions sur une demi-droite graduée : $\\frac{1}{4}$, $\\frac{3}{4}$, $\\frac{5}{4}$…"
},
 {
"m": "dixième d’unité",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "La part obtenue quand on partage une unité en dix parts égales.",
"x": "Un dixième d'unité, c'est $\\frac{1}{10}$.",
"p": "Prépare les fractions décimales et l'écriture 0,1 (CM1)."
},
 {
"m": "terme",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Chacun des nombres qu'on additionne (ou qu'on soustrait).",
"x": "Dans 12 + 7 = 19, les termes sont 12 et 7.",
"p": "Termes d'une somme ou d'une différence ; en 5e, termes d'une expression littérale (réduire)."
},
 {
"m": "différence",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le résultat d'une soustraction : l'écart entre deux nombres.",
"x": "La différence entre 15 et 9 est 6, car 15 − 9 = 6.",
"p": "Sens d'écart et de complément ; la différence ne change pas si on ajoute le même nombre aux deux termes."
},
 {
"m": "facteur",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Chacun des nombres qu'on multiplie.",
"x": "Dans 6 × 4 = 24, les facteurs sont 6 et 4.",
"p": "Plus tard : décomposition en facteurs premiers (4e), factoriser (5e)."
},
 {
"m": "produit",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le résultat d'une multiplication.",
"x": "Le produit de 6 et 4 est 24.",
"p": "Un produit est nul si et seulement si l'un des facteurs est nul (équation produit, 3e)."
},
 {
"m": ":",
"n": "ce2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Le signe de la division : on partage ou on cherche combien de fois un nombre « va » dans un autre.",
"x": "20 : 4 = 5.",
"p": "Deux sens : partage (combien dans chaque part) et groupement (combien de parts) ; au collège, on note aussi la division par une barre de fraction. Le signe ÷ des calculatrices n'est pas utilisé à l'écrit (demandé le 07/11/2026)."
},
 {
"m": "décimètre (dm)",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Une unité de longueur : 1 dm = 10 cm. Il y a 10 dm dans 1 m.",
"x": "Une règle de 20 cm mesure 2 dm.",
"p": "Sous-multiple du mètre ; s'appuie sur la numération (déci = dixième)."
},
 {
"m": "millimètre (mm)",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Une très petite unité de longueur : 1 cm = 10 mm.",
"x": "Une fourmi mesure environ 5 mm.",
"p": "1 m = 1 000 mm ; mesure précise à la règle graduée."
},
 {
"m": "périmètre",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "La longueur du tour d'une figure.",
"x": "Un carré de côté 3 cm a un périmètre de 12 cm.",
"p": "Le périmètre est une longueur (à distinguer de l'aire) ; formules au cycle 3."
},
 {
"m": "tonne (t)",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Masses",
"e": "Une très grande unité de masse : 1 t = 1 000 kg.",
"x": "Une voiture pèse environ 1 t.",
"p": "Ordre de grandeur pour les masses importantes."
},
 {
"m": "litre (L)",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Une unité pour mesurer une contenance (ce qu'un récipient peut contenir).",
"x": "Une bouteille d'eau contient 1 L ou 1,5 L.",
"p": "1 L = 1 dm³ (6e, lien contenance-volume)."
},
 {
"m": "décilitre (dL)",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Une unité de contenance : 1 L = 10 dL.",
"x": "Un verre contient environ 2 dL.",
"p": "Sous-multiple du litre (déci = dixième)."
},
 {
"m": "centilitre (cL)",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Une unité de contenance : 1 L = 100 cL.",
"x": "Une canette contient 33 cL.",
"p": "Sous-multiple du litre (centi = centième)."
},
 {
"m": "midi",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Le milieu de la journée : 12 h.",
"x": "On déjeune à midi.",
"p": "12 h ; minuit = 0 h ou 24 h."
},
 {
"m": "« moins le quart »",
"n": "ce2",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une façon de dire l'heure : 15 minutes avant l'heure suivante.",
"x": "5 h moins le quart = 4 h 45.",
"p": "Lecture de l'horloge à aiguilles ; lien avec le quart d'heure."
},
 {
"m": "polygone",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une figure fermée formée de segments (ses côtés).",
"x": "Le triangle, le carré, l'hexagone sont des polygones.",
"p": "Ligne brisée fermée ; un cercle n'est pas un polygone."
},
 {
"m": "quadrilatère",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un polygone qui a quatre côtés.",
"x": "Le carré, le rectangle et le losange sont des quadrilatères.",
"p": "Familles : trapèze, parallélogramme, rectangle, losange, carré (relations d'inclusion au collège)."
},
 {
"m": "pentagone",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un polygone qui a cinq côtés.",
"x": "Le bâtiment du Pentagone, aux États-Unis, a cette forme.",
"p": "Pentagone régulier : côtés et angles égaux."
},
 {
"m": "hexagone",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un polygone qui a six côtés.",
"x": "Les cases des ruches ont la forme d'hexagones.",
"p": "Hexagone régulier construit au compas avec six fois le rayon."
},
 {
"m": "losange",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un quadrilatère qui a quatre côtés de même longueur.",
"x": "Un carreau de cartes à jouer est un losange.",
"p": "Ses diagonales sont perpendiculaires et ont le même milieu ; parallélogramme particulier (5e)."
},
 {
"m": "diagonale",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un segment qui relie deux sommets qui ne sont pas côte à côte.",
"x": "Le rectangle ABCD a deux diagonales : [AC] et [BD].",
"p": "Propriétés des diagonales pour caractériser les quadrilatères (5e)."
},
 {
"m": "longueur",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "La mesure d'un côté ou d'une distance. Pour un rectangle, c'est le plus grand côté.",
"x": "Ce rectangle a une longueur de 8 cm.",
"p": "Double sens : grandeur (la longueur d'un segment) et dimension (longueur et largeur du rectangle)."
},
 {
"m": "largeur",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Pour un rectangle, la mesure du plus petit côté.",
"x": "Ce rectangle a une largeur de 3 cm.",
"p": "Aire du rectangle = longueur × largeur (cycle 3)."
},
 {
"m": "rayon",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un segment qui relie le centre d'un cercle à un point du cercle ; c'est aussi sa longueur.",
"x": "Un cercle de rayon 3 cm.",
"p": "« Un » rayon (le segment) et « le » rayon (la longueur) ; rayon = diamètre : 2."
},
 {
"m": "diamètre",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un segment qui relie deux points du cercle en passant par le centre ; c'est aussi sa longueur.",
"x": "Un cercle de rayon 3 cm a un diamètre de 6 cm.",
"p": "Diamètre = 2 × rayon ; le diamètre est la plus longue corde (6e)."
},
 {
"m": "axe de symétrie",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "Une droite qui partage une figure en deux parties qui se superposent quand on plie.",
"x": "Un cœur a un axe de symétrie vertical.",
"p": "Une figure peut avoir 0, 1 ou plusieurs axes ; le cercle en a une infinité."
},
 {
"m": "symétrique",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "La figure obtenue « en miroir » par pliage le long d'une droite.",
"x": "Compléter le symétrique d'un dessin sur quadrillage.",
"p": "Au cycle 3 : symétrique d'un point par rapport à une droite (la droite est la médiatrice du segment formé)."
},
 {
"m": "patron",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un dessin à plat qu'on peut découper et plier pour fabriquer un solide.",
"x": "Un patron du cube a six carrés.",
"p": "Le cube a onze patrons différents."
},
 {
"m": "base",
"n": "ce2",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "La face sur laquelle on pose un solide comme une pyramide ou un prisme.",
"x": "La base d'une pyramide peut être un carré.",
"p": "Base d'un solide ; aussi « base » d'un triangle pour l'aire (base × hauteur : 2) et base d'une puissance (4e)."
},
 {
"m": "dizaine de milliers",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 10 000 unités, ou de 10 milliers.",
"x": "Dans 45 310, le chiffre des dizaines de milliers est 4.",
"p": "Classe des mille : unités, dizaines et centaines de milliers ; lecture par classes (45 310 : « quarante-cinq-mille-trois-cent-dix »)."
},
 {
"m": "centaine de milliers",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 100 000 unités, ou de 10 dizaines de milliers.",
"x": "Dans 845 310, le chiffre des centaines de milliers est 8.",
"p": "Nombres jusqu'à 999 999 au CM1 ; l'espace sépare les classes (845 310)."
},
 {
"m": "diviseur",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Multiples, diviseurs, nombres premiers",
"e": "Un diviseur d'un nombre, c'est un nombre qui « tombe juste » dans la division : le reste est 0.",
"x": "4 est un diviseur de 12, car 12 = 4 × 3.",
"p": "b divise a si a est un multiple de b ; les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12. Critères de divisibilité par 2, 3, 5, 9, 10."
},
 {
"m": "fraction décimale",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Une fraction dont le dénominateur est 10, 100, 1 000…",
"x": "$\\frac{7}{10}$ et $\\frac{35}{100}$ sont des fractions décimales.",
"p": "Point d'appui pour introduire l'écriture à virgule : $\\frac{35}{100}$ = 0,35."
},
 {
"m": "dixième",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Une unité partagée en 10 parts égales : chaque part est un dixième. C'est le premier chiffre après la virgule.",
"x": "0,7 = 7 dixièmes = $\\frac{7}{10}$.",
"p": "1 unité = 10 dixièmes ; 1 dixième = 10 centièmes : la numération décimale prolonge celle des entiers."
},
 {
"m": "centième",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Une unité partagée en 100 parts égales : chaque part est un centième. C'est le deuxième chiffre après la virgule.",
"x": "0,35 = 35 centièmes = $\\frac{35}{100}$.",
"p": "Ne pas lire « 35 » comme un entier après la virgule : 0,35 < 0,4 (erreur classique)."
},
 {
"m": "partie entière",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Dans un nombre à virgule, la partie avant la virgule.",
"x": "La partie entière de 12,75 est 12.",
"p": "Partie entière (et partie décimale) ; encadrement d'un décimal entre deux entiers consécutifs."
},
 {
"m": "arrondi",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Le nombre le plus proche, plus simple, qu'on utilise à la place d'un autre.",
"x": "L'arrondi de 12,7 à l'unité est 13.",
"p": "Arrondir à l'unité, au dixième… : on garde la valeur la plus proche ; à distinguer de la troncature."
},
 {
"m": "division euclidienne",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Une division « avec reste » : on cherche combien de fois un nombre entre dans un autre et ce qui reste.",
"x": "17 = 5 × 3 + 2 : le quotient est 3 et le reste est 2.",
"p": "a = b × q + r avec 0 ≤ r < b ; posée ou mentale ; vocabulaire dividende, diviseur, quotient, reste."
},
 {
"m": "égalité à trous",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une égalité où il manque un nombre à trouver.",
"x": "7 + … = 15 : le nombre manquant est 8.",
"p": "Prépare l'inconnue et l'équation (5e) : … est la lettre x de demain."
},
 {
"m": "programme de calcul",
"n": "cm1",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une suite d'étapes de calcul à faire dans l'ordre à partir d'un nombre de départ.",
"x": "Choisis un nombre, multiplie-le par 2, ajoute 3 : avec 5, on obtient 13.",
"p": "Au collège, il se traduit par une expression littérale (2x + 3) et peut se programmer (blocs)."
},
 {
"m": "milligramme (mg)",
"n": "cm1",
"nv": 0,
"d": "G",
"t": "Masses",
"e": "Une très petite unité de masse : 1 g = 1 000 mg.",
"x": "Un comprimé contient 500 mg de médicament.",
"p": "Préfixe milli = millième ; conversions appuyées sur la numération."
},
 {
"m": "millilitre (mL)",
"n": "cm1",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Une très petite unité de contenance : 1 L = 1 000 mL.",
"x": "Une cuillère à café contient environ 5 mL.",
"p": "1 mL = 1 cm³ (6e)."
},
 {
"m": "hectolitre (hL)",
"n": "cm1",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Une grande unité de contenance : 1 hL = 100 L.",
"x": "Une baignoire contient environ 2 hL.",
"p": "Préfixe hecto = cent."
},
 {
"m": "aire",
"n": "cm1",
"nv": 0,
"d": "G",
"t": "Aires",
"e": "La mesure de la surface d'une figure : la place qu'elle occupe sur la feuille.",
"x": "Ce rectangle couvre 12 carreaux : son aire est de 12 carreaux.",
"p": "L'aire se compare d'abord sans mesure (découpage, recouvrement), puis se mesure ; aire et périmètre varient indépendamment."
},
 {
"m": "centimètre carré (cm²)",
"n": "cm1",
"nv": 0,
"d": "G",
"t": "Aires",
"e": "L'aire d'un carré de 1 cm de côté.",
"x": "Un rectangle de 3 cm sur 2 cm a une aire de 6 cm².",
"p": "1 dm² = 100 cm² : le « carré » des unités, source fréquente d'erreurs de conversion."
},
 {
"m": "perpendiculaire",
"n": "cm1",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "Deux droites sont perpendiculaires si elles se coupent en formant un angle droit.",
"x": "Les côtés d'un carré qui se suivent sont perpendiculaires.",
"p": "Notation (d) ⊥ (d') ; vérification et tracé à l'équerre."
},
 {
"m": "parallèle",
"n": "cm1",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "Deux droites sont parallèles si elles ne se coupent jamais, même prolongées : l'écart entre elles reste le même.",
"x": "Les rails d'un train sont parallèles.",
"p": "Notation (d) // (d') ; tracé à la règle et à l'équerre (deux perpendiculaires à une même droite)."
},
 {
"m": "triangle isocèle",
"n": "cm1",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un triangle qui a deux côtés de même longueur.",
"x": "Un triangle de côtés 5 cm, 5 cm et 3 cm est isocèle.",
"p": "Le sommet commun aux côtés égaux est le sommet principal ; les angles à la base sont égaux, l'axe de symétrie est la médiatrice de la base."
},
 {
"m": "triangle équilatéral",
"n": "cm1",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un triangle qui a ses trois côtés de même longueur.",
"x": "Un triangle de côtés 4 cm, 4 cm et 4 cm est équilatéral.",
"p": "Ses trois angles mesurent 60° ; trois axes de symétrie ; c'est un triangle isocèle particulier."
},
 {
"m": "prisme droit",
"n": "cm1",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide qui a deux faces superposables et parallèles (les bases), reliées par des faces rectangulaires.",
"x": "Une boîte de chocolat en forme de « toit » est un prisme droit à base triangulaire.",
"p": "Le pavé droit est un prisme droit ; volume = aire de la base × hauteur (collège)."
},
 {
"m": "polyèdre",
"n": "cm1",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un solide dont toutes les faces sont des polygones (des faces plates).",
"x": "Le cube et la pyramide sont des polyèdres ; la boule n'en est pas un.",
"p": "Relation d'Euler (faces + sommets − arêtes = 2) en prolongement possible."
},
 {
"m": "courbe",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Un graphique où des points sont reliés par une ligne, pour voir comment une quantité change.",
"x": "La courbe des températures de la semaine.",
"p": "Représentation d'une évolution (souvent dans le temps) ; prépare les représentations graphiques de fonctions."
},
 {
"m": "impossible",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Qui ne peut pas arriver.",
"x": "Obtenir 7 avec un dé à six faces est impossible.",
"p": "Évènement impossible : probabilité 0 (6e)."
},
 {
"m": "possible",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Qui peut arriver, mais pas forcément.",
"x": "Obtenir 6 avec un dé est possible.",
"p": "Vocabulaire qualitatif des probabilités au CM."
},
 {
"m": "certain",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Qui arrivera à coup sûr.",
"x": "Obtenir un nombre plus petit que 7 avec un dé est certain.",
"p": "Évènement certain : probabilité 1."
},
 {
"m": "probable",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Qui a de bonnes chances d'arriver.",
"x": "Avec un sac de 9 billes rouges et 1 bleue, tirer une rouge est probable.",
"p": "Comparaison qualitative des chances, avant les probabilités chiffrées."
},
 {
"m": "peu probable",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Qui a peu de chances d'arriver, sans être impossible.",
"x": "Tirer la bille bleue dans ce sac est peu probable.",
"p": "Échelle qualitative : impossible, peu probable, une chance sur deux, probable, certain."
},
 {
"m": "une chance sur deux",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Autant de chances que cela arrive que cela n'arrive pas.",
"x": "Obtenir pile en lançant une pièce : une chance sur deux.",
"p": "Correspond à une probabilité de $\\frac{1}{2}$."
},
 {
"m": "issue",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Un résultat possible d'une expérience de hasard.",
"x": "Lancer un dé a six issues : 1, 2, 3, 4, 5, 6.",
"p": "Un évènement est un ensemble d'issues (CM2-6e)."
},
 {
"m": "équiprobabilité",
"n": "cm1",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Quand toutes les issues ont la même chance d'arriver.",
"x": "Avec un dé bien équilibré, chaque face a la même chance de sortir.",
"p": "En situation d'équiprobabilité : probabilité = nombre d'issues favorables : nombre d'issues."
},
 {
"m": "proportionnalité",
"n": "cm1",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant toujours par le même nombre non nul.",
"x": "1 baguette coûte 1 €, 3 baguettes coûtent 3 € : le prix est proportionnel au nombre de baguettes.",
"p": "Au CM, procédures sans tableau (propriétés de linéarité, passage à l'unité) ; coefficient de proportionnalité nommé en 5e."
},
 {
"m": "million",
"n": "cm2",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Mille milliers : 1 000 000.",
"x": "La France compte environ 68 millions d'habitants.",
"p": "« Million » est un nom (pas de trait d'union) : trois millions deux-cent-mille."
},
 {
"m": "dizaine de millions",
"n": "cm2",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 10 millions : 10 000 000.",
"x": "Dans 45 000 000, le chiffre des dizaines de millions est 4.",
"p": "Classe des millions ; lecture par classes."
},
 {
"m": "centaine de millions",
"n": "cm2",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Un groupe de 100 millions : 100 000 000.",
"x": "Dans 845 000 000, le chiffre des centaines de millions est 8.",
"p": "Nombres jusqu'à 999 999 999 au CM2."
},
 {
"m": "millième",
"n": "cm2",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Une unité partagée en 1 000 parts égales : chaque part est un millième. C'est le troisième chiffre après la virgule.",
"x": "0,007 = 7 millièmes = $\\frac{7}{1000}$.",
"p": "1 centième = 10 millièmes ; comparaison de décimaux de longueurs différentes (0,5 et 0,125)."
},
 {
"m": "division décimale",
"n": "cm2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Une division où l'on continue après la virgule pour obtenir un quotient à virgule.",
"x": "7 : 4 = 1,75.",
"p": "Division d'un décimal par un entier, quotient décimal exact ou approché."
},
 {
"m": "dividende",
"n": "cm2",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Dans une division, le nombre qu'on partage.",
"x": "Dans 17 : 5, le dividende est 17.",
"p": "Dividende = diviseur × quotient + reste."
},
 {
"m": "décimètre carré (dm²)",
"n": "cm2",
"nv": 0,
"d": "G",
"t": "Aires",
"e": "L'aire d'un carré de 1 dm de côté (10 cm de côté).",
"x": "1 dm² = 100 cm².",
"p": "Conversions d'aires : facteur 100 entre deux unités voisines."
},
 {
"m": "mètre carré (m²)",
"n": "cm2",
"nv": 0,
"d": "G",
"t": "Aires",
"e": "L'aire d'un carré de 1 m de côté.",
"x": "La classe a une surface d'environ 60 m².",
"p": "1 m² = 100 dm² = 10 000 cm²."
},
 {
"m": "seconde (s)",
"n": "cm2",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une très petite unité de temps : il y a 60 secondes dans une minute.",
"x": "Le 100 m se court en un peu plus de 9 s pour les meilleurs.",
"p": "1 h = 60 min = 3 600 s."
},
 {
"m": "degré (°)",
"n": "cm2",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "L'unité pour mesurer les angles. Un angle droit mesure 90°.",
"x": "Un angle plat mesure 180°.",
"p": "Au CM2, l'angle droit mesure 90° ; mesure au rapporteur en 6e."
},
 {
"m": "trapèze",
"n": "cm2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un quadrilatère qui a deux côtés opposés parallèles.",
"x": "Une table de cantine trapézoïdale.",
"p": "Les côtés parallèles sont les bases ; un parallélogramme est un trapèze particulier (deux paires de côtés parallèles)."
},
 {
"m": "trapèze rectangle",
"n": "cm2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un trapèze qui a un angle droit.",
"x": "Une rampe d'accès vue de profil.",
"p": "Il a en fait deux angles droits consécutifs."
},
 {
"m": "programme de construction",
"n": "cm2",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une suite d'instructions qui permet de tracer une figure.",
"x": "Trace un segment [AB] de 5 cm. Trace le cercle de centre A de rayon 3 cm…",
"p": "Lire, exécuter et rédiger un programme de construction, avec le vocabulaire et les notations."
},
 {
"m": "diagramme circulaire",
"n": "cm2",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Un disque partagé en parts : plus la part est grande, plus la quantité est importante.",
"x": "Le camembert des sports préférés de la classe.",
"p": "Angles proportionnels aux effectifs (collège)."
},
 {
"m": "évènement",
"n": "cm2",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Quelque chose qui peut se produire ou non lors d'une expérience de hasard.",
"x": "« Obtenir un nombre pair » avec un dé est un évènement.",
"p": "Un évènement est réalisé par certaines issues : ici 2, 4 et 6."
},
 {
"m": "« a chances sur b »",
"n": "cm2",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Une façon de dire la chance qu'un évènement arrive : a issues favorables sur b issues en tout.",
"x": "Obtenir 6 avec un dé : 1 chance sur 6.",
"p": "Correspond à la probabilité $\\frac{a}{b}$ (6e) en situation d'équiprobabilité."
},
 {
"m": "arbre",
"n": "cm2",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Un schéma avec des branches qui montre toutes les issues possibles d'une expérience.",
"x": "Lancer deux fois une pièce : PP, PF, FP, FF.",
"p": "Arbre des possibles ; dénombrement des issues d'une expérience à deux épreuves (3e)."
},
 {
"m": "milliard",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "Mille millions : 1 000 000 000.",
"x": "La Terre compte environ 8 milliards d'habitants.",
"p": "« Milliard » est un nom : deux milliards ; classe des milliards."
},
 {
"m": "rang",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Nombres entiers et numération",
"e": "La place d'un chiffre dans un nombre (unités, dizaines, dixièmes…), qui donne sa valeur.",
"x": "Dans 3,47, le 4 est au rang des dixièmes.",
"p": "Valeur positionnelle : chaque rang vaut 10 fois le rang situé à sa droite."
},
 {
"m": "quotient",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Le résultat d'une division.",
"x": "Le quotient de 12 par 4 est 3. Le quotient de 3 par 4 est $\\frac{3}{4}$ = 0,75.",
"p": "En 6e, la fraction $\\frac{a}{b}$ est le quotient de a par b : le nombre qui, multiplié par b, donne a."
},
 {
"m": "nombre mixte",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Un nombre écrit comme un entier plus une fraction plus petite que 1.",
"x": "$\\frac{7}{4}$ = 1 + $\\frac{3}{4}$.",
"p": "Décomposition d'une fraction supérieure à 1 en partie entière et fraction inférieure à 1 ; repérage sur la demi-droite graduée."
},
 {
"m": "guide-âne",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Une feuille de lignes parallèles également espacées, qui sert à partager un segment en parts égales.",
"x": "Partager une bande en 5 parts égales en la posant en biais sur le guide-âne.",
"p": "Repose sur la propriété de Thalès (partage régulier), sans la nommer en 6e."
},
 {
"m": "abscisse",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Le nombre qui repère un point sur une droite graduée.",
"x": "Sur la droite graduée, le point A a pour abscisse 2,5.",
"p": "Notation A(2,5) ; dans un repère du plan, première coordonnée (5e)."
},
 {
"m": "valeur arrondie",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Le nombre le plus proche d'un autre, avec moins de chiffres.",
"x": "La valeur arrondie de 3,148 au centième est 3,15.",
"p": "Arrondi au rang demandé ; à distinguer de la troncature (3,14)."
},
 {
"m": "pourcentage",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Nombres décimaux",
"e": "Une proportion exprimée « sur 100 ». On écrit %.",
"x": "25 % = $\\frac{25}{100}$ : 25 % de 80, c'est 20.",
"p": "Appliquer un pourcentage = multiplier par $\\frac{t}{100}$ ; situations de proportionnalité."
},
 {
"m": "ordre de grandeur",
"n": "6e",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Un résultat approché, facile à calculer, pour savoir à peu près combien on doit trouver.",
"x": "49 × 21 ≈ 50 × 20 = 1 000.",
"p": "Contrôle de la vraisemblance d'un résultat, notamment à la calculatrice."
},
 {
"m": "kilo- … milli-",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "Les préfixes des unités : kilo = 1 000, hecto = 100, déca = 10, déci = un dixième, centi = un centième, milli = un millième.",
"x": "1 km = 1 000 m ; 1 mg = 0,001 g.",
"p": "Système métrique décimal ; nano à giga en 4e."
},
 {
"m": "périmètre du disque",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Longueurs et périmètre",
"e": "La longueur du cercle qui entoure le disque. On l'obtient en multipliant le diamètre par π (environ 3,14).",
"x": "Un disque de diamètre 10 cm a un périmètre d'environ 31,4 cm.",
"p": "P = π × d = 2 × π × r ; π n'est pas décimal (valeur approchée)."
},
 {
"m": "volume",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "La place occupée par un solide dans l'espace.",
"x": "Un pavé de 3 cm, 2 cm et 4 cm a un volume de 24 cm³.",
"p": "Volume du pavé droit = L × l × h ; contenance = volume intérieur (1 L = 1 dm³)."
},
 {
"m": "centimètre cube (cm³)",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Le volume d'un cube de 1 cm d'arête.",
"x": "1 cm³ = 1 mL.",
"p": "1 dm³ = 1 000 cm³ = 1 L."
},
 {
"m": "année bissextile",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une année de 366 jours, avec un 29 février. Cela arrive tous les quatre ans environ.",
"x": "2024 et 2028 sont des années bissextiles.",
"p": "Règle : multiple de 4, sauf les multiples de 100 qui ne sont pas multiples de 400 (1900 non, 2000 oui)."
},
 {
"m": "siècle",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une durée de 100 ans.",
"x": "Le XXIe siècle a commencé le 1er janvier 2001.",
"p": "Repères historiques ; écriture des siècles en chiffres romains."
},
 {
"m": "millénaire",
"n": "6e",
"nv": 0,
"d": "G",
"t": "Repérage dans le temps, durées",
"e": "Une durée de 1 000 ans.",
"x": "Le troisième millénaire a commencé en 2001.",
"p": "Lien avec la numération (mille)."
},
 {
"m": "distance",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "La longueur du plus court chemin entre deux points : la longueur du segment qui les relie.",
"x": "La distance entre A et B est AB = 5 cm.",
"p": "Distance d'un point à une droite : longueur du segment perpendiculaire (6e) ; inégalité triangulaire."
},
 {
"m": "médiatrice",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Alignement, perpendiculaires, parallèles",
"e": "La droite qui coupe un segment en son milieu en formant un angle droit.",
"x": "La médiatrice de [AB] passe par le milieu de [AB] et est perpendiculaire à [AB].",
"p": "Propriété caractéristique : ensemble des points équidistants des extrémités ; construction au compas."
},
 {
"m": "angle plat",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Un angle de 180° : ses deux côtés sont dans le prolongement l'un de l'autre.",
"x": "Les aiguilles à 6 h forment un angle plat.",
"p": "Ses côtés forment une droite."
},
 {
"m": "angle plein",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Un angle de 360° : un tour complet.",
"x": "La grande aiguille fait un angle plein en une heure.",
"p": "Somme des angles autour d'un point."
},
 {
"m": "angle nul",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Un angle de 0° : ses deux côtés sont confondus.",
"x": "À midi, les deux aiguilles sont superposées.",
"p": "Cas limite de l'angle."
},
 {
"m": "opposés par le sommet",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Deux angles opposés par le sommet ont le même sommet et des côtés dans le prolongement l'un de l'autre, comme un X.",
"x": "Deux droites qui se coupent forment deux paires d'angles opposés par le sommet.",
"p": "Ils ont la même mesure (propriété utilisée en 5e)."
},
 {
"m": "adjacents",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Deux angles adjacents ont le même sommet, un côté commun, et sont de part et d'autre de ce côté.",
"x": "Les angles $\\widehat{xOy}$ et $\\widehat{yOz}$ sont adjacents : leur côté commun est [Oy).",
"p": "Leurs mesures s'additionnent : $\\widehat{xOz} = \\widehat{xOy} + \\widehat{yOz}$."
},
 {
"m": "supplémentaires",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Deux angles supplémentaires ont des mesures dont la somme fait 180°.",
"x": "Un angle de 130° et un angle de 50° sont supplémentaires.",
"p": "Adjacents et supplémentaires, ils forment un angle plat (alignement)."
},
 {
"m": "bissectrice",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "La demi-droite qui partage un angle en deux angles de même mesure.",
"x": "La bissectrice d'un angle de 60° forme deux angles de 30°.",
"p": "Construction au rapporteur ou au compas ; axe de symétrie de l'angle."
},
 {
"m": "corde",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un segment qui relie deux points d'un cercle.",
"x": "Un diamètre est une corde qui passe par le centre.",
"p": "La médiatrice d'une corde passe par le centre du cercle."
},
 {
"m": "cercle circonscrit",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Le cercle qui passe par les trois sommets d'un triangle.",
"x": "Le centre du cercle circonscrit est le point où se coupent les médiatrices des côtés.",
"p": "Les trois médiatrices sont concourantes ; pour un triangle rectangle, le centre est le milieu de l'hypoténuse."
},
 {
"m": "symétrie axiale",
"n": "6e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "La transformation qui donne le symétrique d'une figure « en miroir » par rapport à une droite (l'axe).",
"x": "Le symétrique du point A par rapport à (d) est A' : (d) est la médiatrice de [AA'].",
"p": "Conserve longueurs, angles, aires et alignement ; retourne la figure."
},
 {
"m": "enquête",
"n": "6e",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Une recherche d'informations auprès de personnes, par des questions, pour recueillir des données.",
"x": "Une enquête sur les moyens de transport des élèves.",
"p": "Recueil, organisation (tableaux) et représentation de données."
},
 {
"m": "probabilité",
"n": "6e",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Un nombre entre 0 et 1 qui mesure la chance qu'un évènement arrive.",
"x": "Avec un dé, la probabilité d'obtenir 6 est $\\frac{1}{6}$.",
"p": "En situation d'équiprobabilité : nombre d'issues favorables : nombre total d'issues."
},
 {
"m": "quadruple",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le quadruple d'un nombre, c'est 4 fois ce nombre.",
"x": "Le quadruple de 5 est 20.",
"p": "Vocabulaire multiplicatif : double, triple, quadruple ; moitié, tiers, quart."
},
 {
"m": "tiers",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Une des trois parts égales d'une quantité.",
"x": "Le tiers de 12 est 4. Un tiers, c'est $\\frac{1}{3}$.",
"p": "Lien fraction-division : le tiers de a est a : 3 = $\\frac{a}{3}$."
},
 {
"m": "4 fois plus grand",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Multiplié par 4.",
"x": "Un nombre 4 fois plus grand que 6 est 24.",
"p": "Comparaison multiplicative (à distinguer de « 4 de plus », comparaison additive)."
},
 {
"m": "5 fois moins",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Divisé par 5.",
"x": "Une quantité 5 fois moins grande que 40 est 8.",
"p": "Comparaison multiplicative ; division par 5."
},
 {
"m": "prix au kilo",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le prix d'un kilogramme d'un produit.",
"x": "Des pommes à 3 € le kilo : 2 kg coûtent 6 €.",
"p": "Grandeur quotient (€/kg) ; passage par l'unité en proportionnalité."
},
 {
"m": "échelle",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le nombre qui dit combien de fois les longueurs réelles ont été réduites (ou agrandies) sur un plan ou une carte.",
"x": "À l'échelle $\\frac{1}{100}$, 1 cm sur le plan représente 100 cm, soit 1 m, en réalité.",
"p": "Situation de proportionnalité : longueur sur le plan = échelle × longueur réelle (mêmes unités)."
},
 {
"m": "proportion",
"n": "6e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "La part d'un tout, exprimée par une fraction, un nombre décimal ou un pourcentage.",
"x": "12 filles sur 24 élèves : la proportion de filles est $\\frac{1}{2}$, soit 50 %.",
"p": "Proportion = effectif de la partie : effectif total ; nombre entre 0 et 1."
},
 {
"m": "instruction",
"n": "6e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Un ordre donné à un programme ou à un robot.",
"x": "« Avancer de 10 pas » est une instruction.",
"p": "Brique élémentaire d'un algorithme ; en blocs (Scratch) ou en texte."
},
 {
"m": "séquence d’instructions",
"n": "6e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une suite d'instructions exécutées les unes après les autres, dans l'ordre.",
"x": "Avancer de 50, tourner de 90°, avancer de 50.",
"p": "Structure séquentielle, avant les boucles et les conditions."
},
 {
"m": "entrée",
"n": "6e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une donnée qu'on fournit au programme au départ.",
"x": "Le nombre choisi dans un programme de calcul est l'entrée.",
"p": "Entrées et sorties d'un algorithme (variable demandée à l'utilisateur)."
},
 {
"m": "sortie",
"n": "6e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Le résultat donné par le programme à la fin.",
"x": "Le nombre obtenu à la fin du programme de calcul est la sortie.",
"p": "Affichage ou valeur renvoyée par le programme."
},
 {
"m": "répétition",
"n": "6e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Le fait de faire plusieurs fois la même instruction ou suite d'instructions.",
"x": "Répéter 4 fois : avancer de 50, tourner de 90° (un carré).",
"p": "Boucle bornée (« répéter n fois ») ; boucle conditionnelle au cycle 4."
},
 {
"m": "définition",
"n": "6e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "Une phrase qui dit précisément ce qu'est un objet mathématique.",
"x": "Un rectangle est un quadrilatère qui a quatre angles droits.",
"p": "Une définition permet de reconnaître et de nommer ; elle se distingue des propriétés qui en découlent."
},
 {
"m": "propriété",
"n": "6e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "Une phrase vraie qui dit ce qu'on sait sur un objet mathématique.",
"x": "Les diagonales d'un rectangle ont la même longueur.",
"p": "Énoncés souvent de la forme « si … alors … » ; on les utilise dans une démonstration."
},
 {
"m": "preuve",
"n": "6e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "Un raisonnement qui montre qu'une affirmation est vraie (ou fausse).",
"x": "Prouver que 3 est un diviseur de 27 : 27 = 3 × 9.",
"p": "Au cycle 3, initiation à la justification ; un exemple ne prouve pas une règle générale, un contre-exemple suffit à la réfuter."
},
 {
"m": "fraction",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Un nombre qui s'écrit $\\frac{a}{b}$ : c'est le quotient de a par b (b n'est jamais 0).",
"x": "$\\frac{3}{4}$ = 3 : 4 = 0,75.",
"p": "En 5e : égalité de fractions ($\\frac{a}{b} = \\frac{a \\times k}{b \\times k}$), comparaison, addition et soustraction ; produit en 4e."
},
 {
"m": "nombre rationnel",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Un nombre qui peut s'écrire comme une fraction de deux nombres entiers.",
"x": "0,75 = $\\frac{3}{4}$ et $\\frac{1}{3}$ sont des nombres rationnels.",
"p": "Le quotient de deux entiers (dénominateur non nul) ; $\\frac{1}{3}$ est rationnel mais n'est pas décimal. Non rationnels : π, √2 (3e)."
},
 {
"m": "nombre relatif",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "Un nombre précédé d'un signe + ou −. Les nombres négatifs sont plus petits que 0.",
"x": "−5 °C, +12 m, 0.",
"p": "Nombres positifs et négatifs ; repérage sur une droite graduée de part et d'autre de 0."
},
 {
"m": "opposé",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "L'opposé d'un nombre a le même nombre de « pas » depuis 0, mais de l'autre côté : seul le signe change.",
"x": "L'opposé de 4 est −4 ; l'opposé de −2,5 est 2,5.",
"p": "a + (−a) = 0 ; soustraire un nombre, c'est ajouter son opposé."
},
 {
"m": "valeur absolue",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "La distance d'un nombre à 0, sans tenir compte du signe.",
"x": "La valeur absolue de −7 est 7.",
"p": "Notion utilisée pour comparer et additionner des relatifs."
},
 {
"m": "positif",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "Un nombre positif est plus grand que 0, ou égal à 0.",
"x": "3 et 0 sont positifs.",
"p": "Convention française : 0 est à la fois positif et négatif."
},
 {
"m": "négatif",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "Un nombre négatif est plus petit que 0, ou égal à 0. Il s'écrit avec le signe −.",
"x": "−3 et 0 sont négatifs.",
"p": "0 est positif et négatif ; « strictement négatif » exclut 0."
},
 {
"m": "strictement positif",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "Plus grand que 0, sans être égal à 0.",
"x": "5 est strictement positif, mais 0 ne l'est pas.",
"p": "a > 0."
},
 {
"m": "strictement négatif",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Nombres relatifs",
"e": "Plus petit que 0, sans être égal à 0.",
"x": "−5 est strictement négatif.",
"p": "a < 0."
},
 {
"m": "priorités opératoires",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Les règles qui disent dans quel ordre faire les calculs : d'abord les parenthèses, puis les multiplications et divisions, enfin les additions et soustractions.",
"x": "3 + 4 × 2 = 3 + 8 = 11.",
"p": "Sans parenthèses, à priorité égale, on calcule de gauche à droite ; puissances prioritaires (4e)."
},
 {
"m": "distributivité",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Opérations et calcul posé",
"e": "Une règle qui permet de multiplier une somme : on multiplie chaque terme.",
"x": "3 × (10 + 2) = 3 × 10 + 3 × 2 = 36.",
"p": "k(a + b) = ka + kb ; sert au calcul mental, à développer et à factoriser."
},
 {
"m": "expression littérale",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Un calcul qui contient une ou plusieurs lettres qui remplacent des nombres.",
"x": "Le périmètre d'un carré de côté c est 4 × c, noté 4c.",
"p": "Conventions d'écriture (4c, c²) ; calculer une expression pour une valeur de la lettre ; substitution."
},
 {
"m": "développer",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Transformer un produit en somme.",
"x": "3(x + 2) = 3x + 6.",
"p": "Distributivité simple en 5e, double distributivité en 3e."
},
 {
"m": "factoriser",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Transformer une somme en produit, en mettant un facteur commun en évidence.",
"x": "5x + 15 = 5(x + 3).",
"p": "Opération inverse du développement ; utile pour résoudre une équation produit (3e)."
},
 {
"m": "réduire",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Écrire une expression le plus simplement possible en regroupant les termes de même nature.",
"x": "3x + 5 + 2x = 5x + 5.",
"p": "Réduction d'une somme algébrique : regrouper les termes en x, en x², les constantes."
},
 {
"m": "inconnue",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Le nombre qu'on cherche dans une équation, souvent noté x.",
"x": "Dans 2x + 3 = 11, l'inconnue est x.",
"p": "La lettre désigne un nombre précis inconnu (à distinguer de la variable)."
},
 {
"m": "équation",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une égalité qui contient une inconnue. La résoudre, c'est trouver la valeur de l'inconnue qui la rend vraie.",
"x": "2x + 3 = 11 a pour solution x = 4.",
"p": "En 5e : tester si un nombre est solution, résoudre des équations simples ; équations du premier degré en 4e."
},
 {
"m": "successeur",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Le nombre entier qui vient juste après.",
"x": "Le successeur de 7 est 8 ; le successeur de n est n + 1.",
"p": "Utilisé pour écrire et prouver des propriétés sur des entiers consécutifs (n, n + 1, n + 2)."
},
 {
"m": "prédécesseur",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Le nombre entier qui vient juste avant.",
"x": "Le prédécesseur de 7 est 6 ; le prédécesseur de n est n − 1.",
"p": "Entiers consécutifs n − 1, n, n + 1."
},
 {
"m": "puissance",
"n": "5e",
"nv": 0,
"d": "N",
"t": "Puissances, racine carrée, notation scientifique",
"e": "Une écriture courte pour multiplier un nombre plusieurs fois par lui-même.",
"x": "$2^3$ = 2 × 2 × 2 = 8 ; $10^4$ = 10 000.",
"p": "En 5e : carré, cube et puissances de 10 ; exposants entiers relatifs en 4e."
},
 {
"m": "capacité",
"n": "5e",
"nv": 0,
"d": "G",
"t": "Contenances et volumes",
"e": "Le volume que peut contenir un récipient.",
"x": "La capacité de cette bouteille est 1,5 L.",
"p": "Synonyme de contenance ; lien litre / dm³."
},
 {
"m": "prix unitaire",
"n": "5e",
"nv": 0,
"d": "G",
"t": "Grandeurs composées",
"e": "Le prix d'un seul objet, ou d'une seule unité de quantité.",
"x": "3 cahiers coûtent 6 € : le prix unitaire est 2 €.",
"p": "Passage par l'unité dans une situation de proportionnalité."
},
 {
"m": "vitesse moyenne",
"n": "5e",
"nv": 0,
"d": "G",
"t": "Grandeurs composées",
"e": "La distance parcourue divisée par la durée du trajet.",
"x": "150 km en 2 h : vitesse moyenne de 75 km/h.",
"p": "Grandeur quotient : v = d : t ; attention aux durées non décimales (1 h 30 = 1,5 h)."
},
 {
"m": "coordonnées",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Les deux nombres qui repèrent un point dans un repère : d'abord l'abscisse, puis l'ordonnée.",
"x": "Le point A(3 ; −2) a pour abscisse 3 et pour ordonnée −2.",
"p": "Repère du plan ; la notation A(x ; y) ; extension à l'altitude dans l'espace (4e)."
},
 {
"m": "repère orthogonal",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Deux droites graduées perpendiculaires qui se coupent en 0 (l'origine) et servent à placer des points.",
"x": "L'axe des abscisses est horizontal, l'axe des ordonnées vertical.",
"p": "Repère orthonormé quand les unités sont les mêmes sur les deux axes."
},
 {
"m": "angles alternes-internes",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Deux droites coupées par une sécante : deux angles sont alternes-internes s'ils sont entre les deux droites (internes) et de part et d'autre de la sécante (alternes).",
"x": "Pour deux droites coupées par une sécante, il y a deux paires d'angles alternes-internes.",
"p": "Les droites sont parallèles si et seulement si deux angles alternes-internes ont la même mesure."
},
 {
"m": "angles correspondants",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Angles",
"e": "Deux droites coupées par une sécante : deux angles sont correspondants s'ils sont du même côté de la sécante, à la même place par rapport à chaque droite.",
"x": "En numérotant 1, 2, 3, 4 les angles en chaque point, deux angles qui ont le même numéro sont correspondants.",
"p": "Les droites sont parallèles si et seulement si deux angles correspondants ont la même mesure."
},
 {
"m": "parallélogramme",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
"x": "ABCD est un parallélogramme : (AB) // (CD) et (AD) // (BC).",
"p": "Propriétés caractéristiques : diagonales de même milieu, côtés opposés de même longueur, centre de symétrie."
},
 {
"m": "propriété caractéristique",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Une propriété qui suffit, à elle seule, pour savoir qu'un objet est d'une certaine sorte.",
"x": "Un quadrilatère dont les diagonales ont le même milieu est un parallélogramme.",
"p": "Propriété équivalente à la définition : la propriété et sa réciproque sont vraies."
},
 {
"m": "hauteur",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle, la droite qui passe par un sommet et est perpendiculaire au côté opposé.",
"x": "Aire du triangle = base × hauteur : 2.",
"p": "« La hauteur » désigne aussi la longueur du segment ; les trois hauteurs sont concourantes."
},
 {
"m": "médiane",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle, la droite qui passe par un sommet et par le milieu du côté opposé.",
"x": "La médiane issue de A passe par le milieu de [BC].",
"p": "Les trois médianes sont concourantes. Attention : en statistique, la médiane est la valeur qui partage une série rangée en deux moitiés."
},
 {
"m": "demi-tour",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "Un tour de 180°.",
"x": "Une figure et son symétrique par rapport à un point se déduisent l'une de l'autre par un demi-tour.",
"p": "Symétrie centrale = rotation d'angle 180°."
},
 {
"m": "symétrie centrale",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "La transformation qui fait faire un demi-tour à une figure autour d'un point (le centre).",
"x": "Le symétrique de A par rapport à O est A' : O est le milieu de [AA'].",
"p": "Conserve longueurs, angles, aires, parallélisme ; ne retourne pas la figure."
},
 {
"m": "perspective cavalière",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Une façon de dessiner un solide sur une feuille : les arêtes parallèles restent parallèles, et les arêtes cachées sont en pointillés.",
"x": "Dessiner un cube en perspective cavalière.",
"p": "Face avant en vraie grandeur ; fuyantes réduites selon un coefficient et un angle de fuite."
},
 {
"m": "cylindre de révolution",
"n": "5e",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Le solide obtenu en faisant tourner un rectangle autour d'un de ses côtés.",
"x": "Une boîte de conserve.",
"p": "Bases : deux disques ; volume = aire de la base × hauteur = π r² h."
},
 {
"m": "effectif",
"n": "5e",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Le nombre de fois qu'une valeur apparaît dans une série de données.",
"x": "7 élèves ont eu 15 : l'effectif de la note 15 est 7.",
"p": "Effectif total = somme des effectifs."
},
 {
"m": "fréquence",
"n": "5e",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "L'effectif d'une valeur divisé par l'effectif total.",
"x": "7 élèves sur 28 ont eu 15 : la fréquence est $\\frac{7}{28}$ = 0,25, soit 25 %.",
"p": "Nombre entre 0 et 1, souvent en pourcentage ; somme des fréquences = 1."
},
 {
"m": "moyenne",
"n": "5e",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "La somme de toutes les valeurs divisée par le nombre de valeurs.",
"x": "La moyenne de 12, 15 et 18 est (12 + 15 + 18) : 3 = 15.",
"p": "Moyenne pondérée (4e) avec les effectifs comme coefficients ; sensible aux valeurs extrêmes."
},
 {
"m": "expérience aléatoire",
"n": "5e",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Une expérience dont on connaît les résultats possibles, mais dont on ne peut pas prévoir le résultat.",
"x": "Lancer un dé, tirer une carte au hasard.",
"p": "Issues, évènements, probabilité ; fréquence et probabilité (loi des grands nombres, 3e)."
},
 {
"m": "coefficient de proportionnalité",
"n": "5e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le nombre non nul par lequel on multiplie toujours une grandeur pour obtenir l'autre, quand elles sont proportionnelles.",
"x": "Prix = 1,5 × masse : le coefficient de proportionnalité est 1,5.",
"p": "Lien avec la fonction linéaire (3e) : f(x) = ax."
},
 {
"m": "« en fonction de »",
"n": "5e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Une quantité est « en fonction » d'une autre quand elle dépend d'elle.",
"x": "Le prix à payer en fonction du nombre de places achetées.",
"p": "Approche des fonctions : une grandeur dépend d'une autre ; tableau de valeurs, graphique."
},
 {
"m": "tableau de valeurs",
"n": "5e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Un tableau qui donne, pour plusieurs valeurs d'une quantité, les valeurs de l'autre.",
"x": "Côté du carré : 1, 2, 3 ; aire : 1, 4, 9.",
"p": "Représentation d'une relation entre deux grandeurs ; table de valeurs d'une fonction."
},
 {
"m": "graphique cartésien",
"n": "5e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Un graphique dans un repère, avec une quantité sur l'axe horizontal et l'autre sur l'axe vertical.",
"x": "La taille d'un enfant en fonction de son âge.",
"p": "Lecture graphique d'une valeur, d'une variation ; proportionnalité ⇔ points alignés avec l'origine."
},
 {
"m": "boucle",
"n": "5e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une partie d'un programme qui se répète.",
"x": "Répéter 6 fois : avancer de 30, tourner de 60° (un hexagone).",
"p": "Boucle bornée (répéter n fois) ; boucle conditionnelle (répéter jusqu'à, 3e)."
},
 {
"m": "variable",
"n": "5e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Dans un programme, une « boîte » qui porte un nom et contient une valeur qui peut changer.",
"x": "La variable score commence à 0 et augmente de 1 à chaque bonne réponse.",
"p": "Affecter, modifier, afficher une variable ; à distinguer de l'inconnue d'une équation."
},
 {
"m": "théorème",
"n": "5e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "Une propriété importante qu'on a démontrée.",
"x": "Le théorème de Pythagore.",
"p": "Énoncé démontré ; souvent de la forme « si … alors … » (hypothèses, conclusion)."
},
 {
"m": "réciproque",
"n": "5e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "La réciproque de « si A, alors B » est « si B, alors A ». Elle n'est pas toujours vraie.",
"x": "« Si un quadrilatère est un carré, alors il a quatre côtés égaux » est vrai ; sa réciproque est fausse (le losange).",
"p": "Réciproques du théorème de Pythagore et de Thalès (4e-3e) ; une propriété et sa réciproque vraies = propriété caractéristique."
},
 {
"m": "contraposée",
"n": "5e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "La contraposée de « si A, alors B » est « si B est faux, alors A est faux ». Elle est vraie quand la propriété est vraie.",
"x": "« Si un nombre est multiple de 4, alors il est pair » a pour contraposée « si un nombre est impair, alors il n'est pas multiple de 4 ».",
"p": "Équivalente logiquement à la propriété ; sert à prouver qu'un triangle n'est pas rectangle (Pythagore)."
},
 {
"m": "contre-exemple",
"n": "5e",
"nv": 0,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "Un exemple qui montre qu'une affirmation générale est fausse.",
"x": "« Tous les nombres impairs sont premiers » : 9 est un contre-exemple.",
"p": "Un seul contre-exemple suffit à réfuter ; des exemples ne suffisent jamais à prouver."
},
 {
"m": "nombre premier",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Multiples, diviseurs, nombres premiers",
"e": "Un nombre entier qui a exactement deux diviseurs : 1 et lui-même.",
"x": "2, 3, 5, 7, 11, 13 sont premiers. 1 n'est pas premier ; 9 non plus (9 = 3 × 3).",
"p": "Il en existe une infinité ; crible d'Ératosthène."
},
 {
"m": "facteurs premiers",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Multiples, diviseurs, nombres premiers",
"e": "Écrire un nombre comme un produit de nombres premiers.",
"x": "60 = 2 × 2 × 3 × 5.",
"p": "Décomposition unique (à l'ordre près) ; sert à simplifier des fractions, à trouver des diviseurs communs."
},
 {
"m": "inverse",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "L'inverse d'un nombre non nul est le nombre par lequel il faut le multiplier pour obtenir 1.",
"x": "L'inverse de 4 est $\\frac{1}{4}$ ; l'inverse de $\\frac{2}{3}$ est $\\frac{3}{2}$.",
"p": "Diviser par un nombre, c'est multiplier par son inverse ; 0 n'a pas d'inverse."
},
 {
"m": "solution",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une valeur de l'inconnue qui rend l'égalité vraie.",
"x": "4 est solution de 2x + 3 = 11, car 2 × 4 + 3 = 11.",
"p": "Une équation peut avoir 0, 1 ou plusieurs solutions."
},
 {
"m": "exposant",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Puissances, racine carrée, notation scientifique",
"e": "Le petit nombre écrit en haut d'une puissance : il dit combien de fois on multiplie le nombre.",
"x": "Dans $5^3$, l'exposant est 3 : 5 × 5 × 5.",
"p": "Exposants entiers relatifs : $10^{-2}$ = 0,01 ; $a^0$ = 1."
},
 {
"m": "notation scientifique",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Puissances, racine carrée, notation scientifique",
"e": "L'écriture d'un nombre sous la forme a × $10^n$, avec a ayant un seul chiffre non nul avant la virgule.",
"x": "300 000 = 3 × $10^5$ ; 0,0042 = 4,2 × $10^{-3}$.",
"p": "1 ≤ a < 10 ; ordres de grandeur, comparaisons, calculs à la calculatrice."
},
 {
"m": "racine carrée",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Puissances, racine carrée, notation scientifique",
"e": "La racine carrée d'un nombre positif est le nombre positif qui, multiplié par lui-même, donne ce nombre.",
"x": "√25 = 5, car 5 × 5 = 25.",
"p": "Notation √a pour a ≥ 0 ; utilisée avec le théorème de Pythagore ; √2 n'est pas rationnel."
},
 {
"m": "nano… giga",
"n": "4e",
"nv": 0,
"d": "N",
"t": "Puissances, racine carrée, notation scientifique",
"e": "Les préfixes des très petites et très grandes unités : nano = un milliardième, micro = un millionième, méga = un million, giga = un milliard.",
"x": "1 Go = $10^9$ octets ; 1 nm = $10^{-9}$ m.",
"p": "Lien avec les puissances de 10 et la notation scientifique."
},
 {
"m": "grandeur quotient",
"n": "4e",
"nv": 0,
"d": "G",
"t": "Grandeurs composées",
"e": "Une grandeur obtenue en divisant une grandeur par une autre.",
"x": "La vitesse (km/h), le prix au kilo (€/kg), le débit (L/min).",
"p": "Unités composées notées avec « / » ; conversions (km/h en m/s)."
},
 {
"m": "grandeur produit",
"n": "4e",
"nv": 0,
"d": "G",
"t": "Grandeurs composées",
"e": "Une grandeur obtenue en multipliant deux grandeurs.",
"x": "L'énergie consommée en kilowattheures (kW·h) ; une aire (m × m = m²).",
"p": "Unités composées notées avec un point ou par juxtaposition."
},
 {
"m": "débit",
"n": "4e",
"nv": 0,
"d": "G",
"t": "Grandeurs composées",
"e": "La quantité qui passe en une unité de temps.",
"x": "Un robinet a un débit de 12 L/min.",
"p": "Grandeur quotient ; débit internet en Mo/s."
},
 {
"m": "ordonnée",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Dans un repère, le second nombre des coordonnées d'un point : il se lit sur l'axe vertical.",
"x": "A(3 ; −2) a pour ordonnée −2.",
"p": "Ordonnée d'un point, ordonnée à l'origine d'une droite (3e)."
},
 {
"m": "altitude",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "Dans un repère de l'espace, la troisième coordonnée d'un point : sa « hauteur ».",
"x": "Dans un pavé droit, un point a une abscisse, une ordonnée et une altitude.",
"p": "Repérage dans un parallélépipède rectangle ; prépare la latitude et la longitude (3e)."
},
 {
"m": "protocole de construction",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Polygones et cercles",
"e": "Les étapes rédigées, dans l'ordre, pour construire une figure avec les instruments.",
"x": "Trace [AB] de 6 cm ; trace le cercle de centre A de rayon 4 cm…",
"p": "Rédaction avec vocabulaire et notations ; prolonge le programme de construction du cycle 3."
},
 {
"m": "cas d’égalité",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Les conditions qui suffisent pour savoir que deux triangles sont égaux (superposables).",
"x": "Deux triangles qui ont leurs trois côtés de mêmes longueurs sont égaux.",
"p": "Trois cas : trois côtés ; un angle et les deux côtés qui l'encadrent ; un côté et ses deux angles adjacents."
},
 {
"m": "théorème de Thalès",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Une propriété des triangles « emboîtés » coupés par une parallèle : les longueurs sont proportionnelles.",
"x": "Si (MN) // (BC), alors $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.",
"p": "En 4e : configuration des triangles emboîtés ; en 3e : configuration papillon et réciproque."
},
 {
"m": "théorème de Pythagore",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
"x": "Si ABC est rectangle en A, alors BC² = AB² + AC².",
"p": "Calculer une longueur ; la réciproque prouve qu'un triangle est rectangle, la contraposée qu'il ne l'est pas."
},
 {
"m": "cosinus",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle rectangle, pour un angle aigu : le côté adjacent divisé par l'hypoténuse.",
"x": "cos $\\widehat{B}$ = $\\frac{AB}{BC}$ dans le triangle ABC rectangle en A.",
"p": "Le cosinus ne dépend que de l'angle ; calcul d'une longueur ou d'un angle à la calculatrice (mode degrés)."
},
 {
"m": "droite des milieux",
"n": "4e",
"nv": 1,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle, la droite qui passe par les milieux de deux côtés est parallèle au troisième côté.",
"x": "Si I et J sont les milieux de [AB] et [AC], alors (IJ) // (BC) et IJ = BC : 2.",
"p": "Nouveau programme du cycle 4 (4e à la rentrée 2027) ; cas particulier de Thalès."
},
 {
"m": "translation",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "Le glissement d'une figure, sans la tourner, selon une direction, un sens et une longueur.",
"x": "La translation qui transforme A en B fait glisser toute la figure comme A vers B.",
"p": "Conserve longueurs, angles, aires, parallélisme ; ABB'A' est un parallélogramme (vecteur en 3e, nouveau programme)."
},
 {
"m": "agrandissement",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "Une figure de même forme, dont toutes les longueurs sont multipliées par un même nombre plus grand que 1.",
"x": "Agrandir un carré de 2 cm à l'échelle 3 : carré de 6 cm.",
"p": "Les longueurs sont multipliées par k, les aires par k², les volumes par k³."
},
 {
"m": "réduction",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "Une figure de même forme, dont toutes les longueurs sont multipliées par un même nombre entre 0 et 1.",
"x": "Une maquette à l'échelle $\\frac{1}{50}$.",
"p": "Mêmes règles que l'agrandissement avec 0 < k < 1."
},
 {
"m": "cône de révolution",
"n": "4e",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Le solide obtenu en faisant tourner un triangle rectangle autour d'un des côtés de l'angle droit.",
"x": "Un cornet de glace.",
"p": "Volume = $\\frac{1}{3}$ × aire de la base × hauteur."
},
 {
"m": "moyenne pondérée",
"n": "4e",
"nv": 1,
"d": "D",
"t": "Données et statistiques",
"e": "Une moyenne où chaque valeur compte autant de fois que son effectif (ou son coefficient).",
"x": "Notes 12 (coefficient 2) et 15 (coefficient 1) : (12 × 2 + 15) : 3 = 13.",
"p": "Nouveau programme du cycle 4 (4e en 2027) ; déjà pratiquée avec les effectifs."
},
 {
"m": "étendue",
"n": "4e",
"nv": 1,
"d": "D",
"t": "Données et statistiques",
"e": "La différence entre la plus grande et la plus petite valeur d'une série.",
"x": "Notes de 6 à 18 : l'étendue est 18 − 6 = 12.",
"p": "Indicateur de dispersion ; nouveau programme du cycle 4 (4e en 2027)."
},
 {
"m": "évènement certain",
"n": "4e",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Un évènement qui se produit à coup sûr. Sa probabilité est 1.",
"x": "Obtenir un nombre entre 1 et 6 avec un dé.",
"p": "P(certain) = 1."
},
 {
"m": "évènement impossible",
"n": "4e",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Un évènement qui ne peut pas se produire. Sa probabilité est 0.",
"x": "Obtenir 7 avec un dé à six faces.",
"p": "P(impossible) = 0."
},
 {
"m": "évènement contraire",
"n": "4e",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "L'évènement contraire de A se produit quand A ne se produit pas.",
"x": "Le contraire de « obtenir 6 » est « ne pas obtenir 6 ».",
"p": "P(non A) = 1 − P(A)."
},
 {
"m": "complémentaire",
"n": "4e",
"nv": 1,
"d": "D",
"t": "Probabilités",
"e": "Le complémentaire d'un ensemble d'issues, ce sont toutes les autres issues. C'est l'évènement contraire.",
"x": "Avec un dé, le complémentaire de {6} est {1, 2, 3, 4, 5}.",
"p": "Nouveau programme du cycle 4 (4e en 2027) : notations ensemblistes ; à ne pas confondre avec les angles complémentaires (somme de 90°)."
},
 {
"m": "réunion",
"n": "4e",
"nv": 1,
"d": "D",
"t": "Probabilités",
"e": "La réunion de deux évènements A et B : A se produit, ou B, ou les deux.",
"x": "« Obtenir un nombre pair ou un 5 ».",
"p": "Nouveau programme (4e en 2027) ; notation A ∪ B."
},
 {
"m": "intersection",
"n": "4e",
"nv": 1,
"d": "D",
"t": "Probabilités",
"e": "L'intersection de deux évènements A et B : A et B se produisent tous les deux.",
"x": "« Obtenir un nombre pair et plus grand que 3 » : 4 ou 6.",
"p": "Nouveau programme (4e en 2027) ; notation A ∩ B. En géométrie : point commun à deux lignes."
},
 {
"m": "ensemble vide",
"n": "4e",
"nv": 1,
"d": "D",
"t": "Probabilités",
"e": "Un ensemble qui ne contient rien. Un évènement impossible correspond à l'ensemble vide.",
"x": "« Obtenir 7 avec un dé » : aucune issue.",
"p": "Nouveau programme (4e en 2027) ; notation ∅."
},
 {
"m": "quatrième proportionnelle",
"n": "4e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le nombre qui manque dans un tableau de proportionnalité de quatre nombres.",
"x": "3 cahiers coûtent 6 €, 5 cahiers coûtent 10 € : 10 est la quatrième proportionnelle.",
"p": "Calcul par l'égalité des produits en croix, par passage à l'unité ou par linéarité."
},
 {
"m": "ratio",
"n": "4e",
"nv": 1,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Une façon de dire comment une quantité est partagée : « 2 pour 3 » s'écrit 2 : 3.",
"x": "Sirop et eau dans le ratio 1 : 5 : 1 volume de sirop pour 5 volumes d'eau.",
"p": "Nouveau programme (4e en 2027) ; partager une quantité dans un ratio donné."
},
 {
"m": "rapport",
"n": "4e",
"nv": 1,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le quotient de deux quantités de même nature.",
"x": "Le rapport des longueurs 6 cm et 2 cm est 6 : 2 = 3.",
"p": "Rapport d'agrandissement, rapport d'une homothétie (3e) ; nouveau programme : rapport et ratio."
},
 {
"m": "coefficient multiplicateur",
"n": "4e",
"nv": 1,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le nombre par lequel on multiplie une quantité pour l'augmenter ou la diminuer d'un pourcentage.",
"x": "Augmenter de 20 %, c'est multiplier par 1,2 ; baisser de 20 %, c'est multiplier par 0,8.",
"p": "Nouveau programme (4e en 2027) : 1 + $\\frac{t}{100}$ ; évolutions successives : on multiplie les coefficients."
},
 {
"m": "axe des abscisses",
"n": "4e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Dans un repère, l'axe horizontal, sur lequel on lit les abscisses.",
"x": "Le point (4 ; 0) est sur l'axe des abscisses.",
"p": "Axe de la variable dans une représentation graphique de fonction."
},
 {
"m": "axe des ordonnées",
"n": "4e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Dans un repère, l'axe vertical, sur lequel on lit les ordonnées.",
"x": "Le point (0 ; 3) est sur l'axe des ordonnées.",
"p": "Ordonnée à l'origine d'une droite : là où elle coupe cet axe."
},
 {
"m": "algorithme",
"n": "4e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une suite finie d'instructions pour résoudre un problème.",
"x": "Une recette de cuisine, l'algorithme de la division posée.",
"p": "Indépendant du langage ; se traduit en programme."
},
 {
"m": "programme",
"n": "4e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Un algorithme écrit dans un langage que l'ordinateur comprend.",
"x": "Un programme Scratch qui dessine un carré.",
"p": "Écrire, mettre au point (déboguer) et exécuter un programme."
},
 {
"m": "script",
"n": "4e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Un ensemble de blocs assemblés qui s'exécutent ensemble, déclenché par un évènement.",
"x": "Quand le drapeau est cliqué : avancer de 10.",
"p": "Programmation évènementielle ; plusieurs scripts peuvent s'exécuter en parallèle."
},
 {
"m": "« si … alors »",
"n": "4e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une instruction qui ne s'exécute que si une condition est vraie.",
"x": "Si le nombre est pair, alors dire « pair ».",
"p": "Instruction conditionnelle, éventuellement avec « sinon »."
},
 {
"m": "« répéter … fois »",
"n": "4e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une boucle qui répète des instructions un nombre de fois fixé.",
"x": "Répéter 4 fois : avancer de 50, tourner de 90°.",
"p": "Boucle bornée ; nombre d'itérations connu à l'avance."
},
 {
"m": "instruction conditionnelle",
"n": "4e",
"nv": 1,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une instruction qui choisit quoi faire selon qu'une condition est vraie ou fausse.",
"x": "Si x > 0 alors dire « positif » sinon dire « négatif ou nul ».",
"p": "Nouveau programme (4e en 2027) : « si … alors … sinon »."
},
 {
"m": "fraction irréductible",
"n": "3e",
"nv": 0,
"d": "N",
"t": "Fractions",
"e": "Une fraction qu'on ne peut plus simplifier : le numérateur et le dénominateur n'ont pas d'autre diviseur commun que 1.",
"x": "$\\frac{12}{18}$ = $\\frac{2}{3}$ ; $\\frac{2}{3}$ est irréductible.",
"p": "Obtenue en divisant par le plus grand diviseur commun, ou à l'aide des décompositions en facteurs premiers."
},
 {
"m": "double distributivité",
"n": "3e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "La règle pour développer le produit de deux sommes : chaque terme de la première multiplie chaque terme de la seconde.",
"x": "(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.",
"p": "(a + b)(c + d) = ac + ad + bc + bd."
},
 {
"m": "équation produit",
"n": "3e",
"nv": 0,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une équation de la forme « un produit égale 0 ».",
"x": "(x − 2)(x + 5) = 0 : x = 2 ou x = −5.",
"p": "Un produit est nul si et seulement si l'un de ses facteurs est nul."
},
 {
"m": "identité remarquable",
"n": "3e",
"nv": 1,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une égalité toujours vraie qui permet de développer ou de factoriser rapidement.",
"x": "(a + b)² = a² + 2ab + b² ; (a − b)(a + b) = a² − b².",
"p": "Nouveau programme du cycle 4 (3e à la rentrée 2028)."
},
 {
"m": "inéquation",
"n": "3e",
"nv": 1,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une inégalité qui contient une inconnue. Ses solutions sont souvent une infinité de nombres.",
"x": "2x + 1 < 7 a pour solutions tous les nombres x < 3.",
"p": "Nouveau programme (3e en 2028) ; multiplier par un négatif change le sens de l'inégalité."
},
 {
"m": "équation produit nul",
"n": "3e",
"nv": 1,
"d": "N",
"t": "Pensée algébrique, calcul littéral, équations",
"e": "Une équation où un produit est égal à 0 : il suffit qu'un des facteurs soit nul.",
"x": "x(x − 4) = 0 : x = 0 ou x = 4.",
"p": "Nouveau programme (3e en 2028) ; même notion que l'équation produit."
},
 {
"m": "latitude",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "La position d'un lieu au nord ou au sud de l'équateur, mesurée en degrés.",
"x": "Paris est à environ 49° de latitude Nord.",
"p": "Repérage sur la sphère terrestre (parallèles)."
},
 {
"m": "longitude",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Se repérer : espace, plans, repères",
"e": "La position d'un lieu à l'est ou à l'ouest du méridien de Greenwich, mesurée en degrés.",
"x": "Paris est à environ 2° de longitude Est.",
"p": "Repérage sur la sphère terrestre (méridiens)."
},
 {
"m": "triangles semblables",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Deux triangles qui ont la même forme : leurs angles sont égaux deux à deux, et leurs côtés sont proportionnels.",
"x": "Un triangle et son agrandissement sont semblables.",
"p": "Angles égaux ⇔ côtés proportionnels ; lien avec Thalès et l'homothétie."
},
 {
"m": "sinus",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle rectangle, pour un angle aigu : le côté opposé divisé par l'hypoténuse.",
"x": "sin $\\widehat{B}$ = $\\frac{AC}{BC}$ dans le triangle ABC rectangle en A.",
"p": "Moyen mnémotechnique CAH-SOH-TOA ; calculatrice en mode degrés."
},
 {
"m": "tangente",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Triangles et grands théorèmes",
"e": "Dans un triangle rectangle, pour un angle aigu : le côté opposé divisé par le côté adjacent.",
"x": "tan $\\widehat{B}$ = $\\frac{AC}{AB}$ dans le triangle ABC rectangle en A.",
"p": "Aussi : tangente à un cercle (droite perpendiculaire au rayon en un point)."
},
 {
"m": "rotation",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "La transformation qui fait tourner une figure autour d'un point, d'un certain angle, dans un sens donné.",
"x": "Rotation de centre O, d'angle 90°, dans le sens inverse des aiguilles d'une montre.",
"p": "Conserve longueurs, angles, aires ; la symétrie centrale est une rotation de 180°."
},
 {
"m": "homothétie",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Symétries et transformations",
"e": "La transformation qui agrandit ou réduit une figure à partir d'un point (le centre), selon un rapport.",
"x": "Une homothétie de centre O et de rapport 2 double toutes les longueurs.",
"p": "Rapport négatif : la figure passe de l'autre côté du centre ; aires multipliées par k²."
},
 {
"m": "vecteur",
"n": "3e",
"nv": 1,
"d": "E",
"t": "Symétries et transformations",
"e": "Une flèche qui représente un déplacement : une direction, un sens et une longueur.",
"x": "La translation qui transforme A en B est la translation de vecteur $\\overrightarrow{AB}$.",
"p": "Nouveau programme du cycle 4 (3e en 2028)."
},
 {
"m": "vecteur nul",
"n": "3e",
"nv": 1,
"d": "E",
"t": "Symétries et transformations",
"e": "Le vecteur qui ne fait aucun déplacement.",
"x": "$\\overrightarrow{AA}$ est le vecteur nul.",
"p": "Nouveau programme (3e en 2028) ; noté $\\vec{0}$."
},
 {
"m": "relation de Chasles",
"n": "3e",
"nv": 1,
"d": "E",
"t": "Symétries et transformations",
"e": "Une règle pour enchaîner des déplacements : aller de A à B puis de B à C, c'est aller de A à C.",
"x": "$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.",
"p": "Nouveau programme (3e en 2028)."
},
 {
"m": "section plane",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "La figure obtenue quand on coupe un solide par un plan.",
"x": "La section d'un pavé droit par un plan parallèle à une face est un rectangle.",
"p": "Sections de pavés, cylindres, pyramides, cônes et sphères."
},
 {
"m": "sphère",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "La surface d'une boule : tous ses points sont à la même distance du centre.",
"x": "La Terre est presque une sphère.",
"p": "Aire = 4πr² ; volume de la boule = $\\frac{4}{3}$πr³."
},
 {
"m": "grand cercle",
"n": "3e",
"nv": 0,
"d": "E",
"t": "Solides et représentations",
"e": "Un cercle tracé sur une sphère et qui a le même centre et le même rayon qu'elle.",
"x": "L'équateur est un grand cercle de la Terre.",
"p": "Section de la sphère par un plan passant par son centre."
},
 {
"m": "section",
"n": "3e",
"nv": 1,
"d": "E",
"t": "Solides et représentations",
"e": "La figure obtenue en coupant un solide.",
"x": "La section d'un cylindre par un plan parallèle à sa base est un disque.",
"p": "Nouveau programme (3e en 2028)."
},
 {
"m": "histogramme",
"n": "3e",
"nv": 0,
"d": "D",
"t": "Données et statistiques",
"e": "Un diagramme fait de rectangles collés les uns aux autres, pour des valeurs regroupées en intervalles.",
"x": "Les tailles des élèves par tranches de 10 cm.",
"p": "À classes de même amplitude, la hauteur des rectangles est proportionnelle à l'effectif."
},
 {
"m": "effectifs cumulés croissants",
"n": "3e",
"nv": 1,
"d": "D",
"t": "Données et statistiques",
"e": "Pour chaque valeur, le nombre de données inférieures ou égales à cette valeur.",
"x": "Notes : 8 (3 élèves), 10 (5 élèves) : effectif cumulé de 10 = 3 + 5 = 8.",
"p": "Nouveau programme (3e en 2028) ; sert à trouver médiane et quartiles."
},
 {
"m": "quartile",
"n": "3e",
"nv": 1,
"d": "D",
"t": "Données et statistiques",
"e": "Les valeurs qui partagent une série rangée en quatre parties : environ un quart des données est en dessous du premier quartile.",
"x": "Q1 : au moins 25 % des valeurs lui sont inférieures ou égales ; Q3 : au moins 75 %.",
"p": "Nouveau programme (3e en 2028) ; écart interquartile Q3 − Q1."
},
 {
"m": "boîte à moustaches",
"n": "3e",
"nv": 1,
"d": "D",
"t": "Données et statistiques",
"e": "Un diagramme qui résume une série : minimum, premier quartile, médiane, troisième quartile et maximum.",
"x": "Comparer les notes de deux classes avec deux boîtes à moustaches.",
"p": "Nouveau programme (3e en 2028)."
},
 {
"m": "épreuve",
"n": "3e",
"nv": 0,
"d": "D",
"t": "Probabilités",
"e": "Une étape d'une expérience aléatoire.",
"x": "Lancer deux dés l'un après l'autre : expérience à deux épreuves.",
"p": "Arbre pondéré : on multiplie les probabilités le long d'un chemin."
},
 {
"m": "pourcentage d’évolution",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Proportionnalité, pourcentages, échelles",
"e": "Le pourcentage dont une quantité augmente ou diminue.",
"x": "Un prix passe de 50 € à 60 € : il augmente de 20 %.",
"p": "Taux d'évolution = (valeur finale − valeur initiale) : valeur initiale ; coefficient multiplicateur 1 + t."
},
 {
"m": "fonction",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Un procédé qui, à chaque nombre, associe un unique nombre.",
"x": "La fonction f : x ↦ 2x + 1 associe 7 à 3.",
"p": "Notations f(x) et x ↦ f(x) ; tableau de valeurs, représentation graphique."
},
 {
"m": "image",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Le nombre associé à x par une fonction : f(x).",
"x": "Si f(x) = 2x + 1, l'image de 3 est f(3) = 7.",
"p": "Un nombre a une seule image ; lecture sur l'axe des ordonnées."
},
 {
"m": "antécédent",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Un nombre dont l'image par une fonction est un nombre donné.",
"x": "Si f(x) = 2x + 1, un antécédent de 7 est 3.",
"p": "Un nombre peut avoir 0, 1 ou plusieurs antécédents ; lecture sur l'axe des abscisses."
},
 {
"m": "fonction linéaire",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Une fonction de la forme x ↦ ax : elle traduit une situation de proportionnalité.",
"x": "Le prix de x kg de pommes à 3 € le kilo : x ↦ 3x.",
"p": "Représentée par une droite passant par l'origine ; a est le coefficient."
},
 {
"m": "fonction affine",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Une fonction de la forme x ↦ ax + b.",
"x": "Abonnement de 10 € plus 2 € par séance : x ↦ 2x + 10.",
"p": "Représentée par une droite ; a est le coefficient directeur, b l'ordonnée à l'origine."
},
 {
"m": "coefficient directeur",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Le nombre a dans x ↦ ax + b : il indique la pente de la droite.",
"x": "Pour x ↦ 2x + 10, le coefficient directeur est 2 : quand x augmente de 1, f(x) augmente de 2.",
"p": "Les accroissements de f(x) sont proportionnels aux accroissements de x."
},
 {
"m": "ordonnée à l’origine",
"n": "3e",
"nv": 0,
"d": "P",
"t": "Fonctions",
"e": "Le nombre b dans x ↦ ax + b : là où la droite coupe l'axe des ordonnées.",
"x": "Pour x ↦ 2x + 10, l'ordonnée à l'origine est 10.",
"p": "b = f(0)."
},
 {
"m": "fonction carré",
"n": "3e",
"nv": 1,
"d": "P",
"t": "Fonctions",
"e": "La fonction qui à x associe x².",
"x": "L'image de 3 est 9, celle de −3 aussi.",
"p": "Nouveau programme (3e en 2028) ; sa courbe est une parabole."
},
 {
"m": "« répéter jusqu’à »",
"n": "3e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une boucle qui se répète tant qu'une condition n'est pas réalisée.",
"x": "Répéter jusqu'à ce que le lutin touche le bord : avancer de 5.",
"p": "Boucle conditionnelle : nombre de tours non connu à l'avance."
},
 {
"m": "bloc personnalisé",
"n": "3e",
"nv": 0,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Un bloc qu'on crée soi-même pour regrouper des instructions et les réutiliser.",
"x": "Créer un bloc « carré (côté) » et l'utiliser plusieurs fois.",
"p": "Notion de sous-programme (procédure) avec paramètres."
},
 {
"m": "condition composée",
"n": "3e",
"nv": 1,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une condition formée de plusieurs conditions reliées par « et », « ou », « non ».",
"x": "Si x > 0 et x < 10 alors…",
"p": "Nouveau programme (3e en 2028) ; opérateurs logiques."
},
 {
"m": "boucle conditionnelle",
"n": "3e",
"nv": 1,
"d": "I",
"t": "Algorithmique et programmation",
"e": "Une boucle qui se répète selon une condition.",
"x": "Répéter jusqu'à ce que la réponse soit juste.",
"p": "Nouveau programme (3e en 2028) ; « tant que » / « jusqu'à »."
},
 {
"m": "analyse-synthèse",
"n": "3e",
"nv": 1,
"d": "R",
"t": "Raisonner, justifier, démontrer",
"e": "Une méthode de raisonnement : on suppose le problème résolu pour trouver des conditions (analyse), puis on vérifie qu'elles conviennent (synthèse).",
"x": "Chercher où placer un point équidistant de trois villes.",
"p": "Nouveau programme (3e en 2028)."
}
];
if(typeof module !== 'undefined' && module.exports) module.exports = globalThis.LEXIQUE;
