/* =====================================================================
   ASSETS/PROGRAMMES/NOTIONS.JS -- page publique « Notions du CP à la 3e » (/programmes/).
   Demandé le 28/10/2026 : « un tableau général des notions du CP à la 3e avec l'évolution des
   compétences attendues (y compris vocabulaire), en te servant des programmes officiels uniquement ».

   Sources (et seulement elles) :
     cycle 2 (CP, CE1, CE2)  : BO n° 41 du 31/10/2024 ;
     cycle 3 (CM1, CM2, 6e)  : BO n° 16 du 17/04/2025 (texte du BO, sans les « exemples de réussite ») ;
     5e, et 4e/3e « nouveau » : BO n° 10 du 05/03/2026, annexe 2 (4e en 2027, 3e en 2028) ;
     4e/3e « en vigueur »    : BO n° 31 du 30/07/2020 + attendus de fin d'année 4e et 3e et repères
                               annuels de progression du cycle 4 (Éduscol, 2019).
   Le même fichier sert au navigateur (filtres, recherche) et à tools/build-seo.js, qui écrit le
   tableau complet dans la page pour les moteurs de recherche (notionsTable, sans DOM).
   ===================================================================== */
(function(){
const LV = [
  {k:'cp',  n:'CP',  c:'c2', src:'BO 2024', champ:'Entiers jusqu’à 100'},
  {k:'ce1', n:'CE1', c:'c2', src:'BO 2024', champ:'Entiers jusqu’à 1 000 · fractions'},
  {k:'ce2', n:'CE2', c:'c2', src:'BO 2024', champ:'Entiers jusqu’à 10 000'},
  {k:'cm1', n:'CM1', c:'c3', src:'BO 2025', champ:'Jusqu’à 999 999 · centièmes'},
  {k:'cm2', n:'CM2', c:'c3', src:'BO 2025', champ:'Jusqu’à 999 999 999 · millièmes'},
  {k:'s6',  n:'6e',  c:'c3', src:'BO 2025', champ:'Milliard · fraction-quotient · %'},
  {k:'s5',  n:'5e',  c:'c4', src:'BO 2026', champ:'Relatifs · calcul littéral'},
  {k:'s4',  n:'4e',  c:'c4', src:'Programme 2020 · attendus 2019', srcN:'BO 2026 · rentrée 2027', champ:'Rationnels · puissances · Pythagore'},
  {k:'s3',  n:'3e',  c:'c4', src:'Programme 2020 · attendus 2019', srcN:'BO 2026 · rentrée 2028', champ:'Fonctions · Thalès · trigonométrie'},
];
const VUES = {all:LV.map(l=>l.k), c2:['cp','ce1','ce2'], c3:['cm1','cm2','s6'], c4:['s5','s4','s3'], ec:['cm2','s6','s5']};

const DOMS = [
  {k:'N', n:'Nombres et calcul'},
  {k:'G', n:'Grandeurs et mesures'},
  {k:'E', n:'Espace et géométrie'},
  {k:'D', n:'Données et probabilités'},
  {k:'P', n:'Proportionnalité et fonctions'},
  {k:'I', n:'Pensée informatique'},
  {k:'R', n:'Raisonner et justifier'},
];

/* Données. i : compétences attendues, v : vocabulaire nommé par le texte, note : précision.
   s4/s3 = programme en vigueur (2020 + attendus 2019) ; s4n/s3n = nouveau programme (BO 2026).
   {a/b} = fraction affichée en étage. */
const ROWS = [
/* ───────── NOMBRES ET CALCUL ───────── */
{d:'N', n:'Nombres entiers et numération',
 cp:{i:['Nombres jusqu’à 100 : jusqu’à 59 au plus tard en période 2, jusqu’à 100 en période 3','Dénombrer, comparer, constituer des collections organisées en dizaines et unités','Suite orale et écrite ; compter de 1 en 1, de 2 en 2, de 10 en 10, et à rebours','Valeur des chiffres selon leur position (unités, dizaines) ; pourquoi 23 n’est pas 32','Écriture en lettres maîtrisée jusqu’à 50','Comparer, encadrer, intercaler avec =, < et > ; ordonner cinq nombres','Placer des nombres sur une demi-droite graduée de un en un','Nombres ordinaux jusqu’à « vingtième » ; rang dans une file'],
     v:['unité','dizaine','égal à','autant que','plus que','plus grand que','moins que','plus petit que','ordre croissant','ordre décroissant','premier… vingtième']},
 ce1:{i:['Nombres jusqu’à 1 000 ; la centaine dès la période 1','Relations unités, dizaines, centaines (ex. 2 centaines, 27 dizaines et 14 unités)','Écritures : chiffres, lettres, unités de numération, (6 × 100) + (3 × 10) + (5 × 1), 600 + 30 + 5','Comparer, encadrer, intercaler, ordonner','Demi-droite graduée de 1 en 1, de 10 en 10, de 100 en 100 ; lien avec la distance à l’origine','Ordinaux jusqu’à cent'],
     v:['centaine','égal à','supérieur à','inférieur à','compris entre … et …']},
 ce2:{i:['Nombres jusqu’à 10 000 (au plus tard en période 2)','Relations entre unités de numération jusqu’au millier','Décompositions (4 × 1 000) + (6 × 100) + (3 × 10) + (5 × 1)','Demi-droite graduée jusqu’à « de mille en mille »'], v:['millier']},
 cm1:{i:['Nombres jusqu’à 999 999 ; cinq ou six chiffres seulement à partir de la période 3 ou 4','Nouveaux rangs : dizaines et centaines de milliers','Placer des nombres et repérer des points sur une demi-droite graduée'], v:['dizaine de milliers','centaine de milliers']},
 cm2:{i:['Nombres jusqu’à 999 999 999 (neuf chiffres)','Nouveaux rangs, après les deux premières périodes : millions, dizaines et centaines de millions'], v:['million','dizaine de millions','centaine de millions']},
 s6:{i:['Valeur des chiffres selon leur rang','Introduction du milliard (démographie, distances dans l’Univers)','Connaître des grands nombres entiers'], v:['milliard','rang']},
},
{d:'N', n:'Multiples, diviseurs, nombres premiers',
 ce1:{i:['Notion de parité : dire si un nombre est pair ou impair'], v:['pair','impair']},
 ce2:{i:['« 75 est un multiple de 25 » ; « les nombres pairs sont des multiples de 2 »'], v:['multiple']},
 cm1:{i:['Reconnaître les multiples de 2, de 5 et de 10 (seuls critères de divisibilité au programme)','Dire si un nombre est multiple d’un nombre ≤ 10, si un nombre ≤ 10 en est un diviseur'], v:['diviseur']},
 cm2:{i:['Des diviseurs d’un nombre ≤ 100 ; tous les diviseurs d’un nombre ≤ 30','Diviseurs communs à deux nombres ≤ 30 ; multiples communs à deux nombres < 15','En vue des fractions (comparaison, addition, soustraction)']},
 s6:{i:['Diviseurs, multiples et tables réactivés pour simplifier, additionner et soustraire des fractions']},
 s5:{i:['Automatismes : critères par 2, 5 et 10 ; quotient et reste (17 = 3 × 5 + 2) ; 21 = 3 × 7','Utiliser les notions de multiples et diviseurs','Critères de divisibilité par 3 et par 9'], v:['quotient','reste'], note:'Prolongement possible : nombres premiers, crible d’Ératosthène.'},
 s4:{i:['Liste des nombres premiers inférieurs à 100','Décomposer un entier en produit de facteurs premiers (ex. 780)','S’en servir pour reconnaître des fractions égales et simplifier','Problèmes de divisibilité (bouquets identiques)'], v:['nombre premier','facteurs premiers']},
 s3:{i:['Décomposer en facteurs premiers à la main, au tableur ou par programme','Problèmes : engrenages, conjonction de phénomènes']},
 s3n:{i:['Automatismes : factoriser un entier (60 = 2² × 3 × 5)','Simplifier une fraction dont les termes sont dans une même table ; trouver un dénominateur commun','Critères de divisibilité par 2, 3, 5 et 9']},
},
{d:'N', n:'Fractions',
 ce1:{i:['Fractions d’un tout, inférieures ou égales à 1 ; dénominateurs 2, 3, 4, 5, 6, 8 ou 10','Fractions unitaires dès la période 2, puis {3/8} : trois parts d’un tout partagé en huit parts égales','Comparer : même dénominateur, numérateur égal à 1 (dès la période 4)','Additionner et soustraire des fractions de même dénominateur ; complément au tout'], v:['moitié','demi','quart','numérateur','dénominateur','« trois huitièmes »']},
 ce2:{i:['Dénominateur ≤ 12, fractions ≤ 1','Égalités de fractions : {6/8} = {3/4}, {?/8} = {1/2}','À partir de la période 3 : graduer une bande-unité (quarts par pliage, dixièmes sur quadrillage) et mesurer des longueurs non entières','Comparer : même dénominateur, même numérateur, un dénominateur multiple de l’autre','Additionner et soustraire, y compris quand un dénominateur est multiple de l’autre'], v:['unité','quart d’unité','dixième d’unité']},
 cm1:{i:['Fractions supérieures à 1 ; dénominateur ≤ 20 (100 pour les fractions décimales)','Fraction > 1 = entier + fraction < 1, et réciproquement','Encadrer entre deux entiers consécutifs ; placer et repérer sur une demi-droite graduée','Comparer, additionner, soustraire','Fraction d’une quantité avec une fraction unitaire (un tiers de 12 billes)']},
 cm2:{i:['Dénominateur ≤ 60 (100 ou 1 000 pour les fractions décimales)','Produit d’un entier et d’une fraction','Fraction d’une quantité ou d’une grandeur (deux tiers de 12 €)']},
 s6:{i:['Sens quotient : {a/b} est le quotient de a par b (b non nul) ; {3/4} est aussi le quart de 3','Égalités à trous multiplicatives, qui préfigurent a × x = b','Graduer un segment (guide-âne) ; placer une fraction sur une demi-droite graduée','Une fraction peut être un entier, un décimal non entier ou un non-décimal','Multiplier pour appliquer une fraction à un nombre entier','Égalités, comparaison, encadrement ; ordonner fractions et nombres mixtes','Additionner, soustraire, multiplier par un entier ; inventer des problèmes'], v:['quotient','nombre mixte','guide-âne']},
 s5:{i:['Automatismes : fractions égales, comparaison, {17/5} = 3 + {2/5}, fraction d’un nombre','Comparer des fractions','Additionner et soustraire avec des dénominateurs quelconques','Résoudre des problèmes'], v:['quotient','fraction','nombre rationnel'], note:'Vocabulaire fixé pour tout le cycle 4 : une fraction est à la fois un nombre et une écriture.'},
 s4:{i:['Additionner, soustraire, multiplier, diviser des nombres rationnels','Utiliser l’inverse pour calculer','Comparer, ranger, encadrer des rationnels positifs ou négatifs','Résoudre des problèmes avec des rationnels'], v:['nombre rationnel','inverse']},
 s3:{i:['Calculer avec les rationnels dans des problèmes','Rendre une fraction irréductible'], v:['fraction irréductible']},
 s4n:{i:['Simplifier une fraction','Nombre rationnel : quotient de deux entiers relatifs ; son opposé','Produit de rationnels ; fraction d’une fraction','Inverse d’un nombre et sa notation ; inverse d’une fraction ; diviser des fractions','Expressions à plusieurs opérations ; problèmes'], v:['nombre rationnel','inverse','opposé']},
 s3n:{i:['Automatismes : les quatre opérations sur les fractions','Mettre une fraction sous forme irréductible','Résoudre des problèmes'], v:['fraction irréductible'], note:'Prolongement possible : notation des ensembles de nombres.'},
},
{d:'N', n:'Nombres décimaux',
 ce1:{i:['Écriture à virgule rencontrée avec la monnaie, sans les mots dixième ou centième (voir Monnaie)']},
 cm1:{i:['Fractions décimales dès la période 2, puis écriture à virgule comme codage de 35 + {7/10} + {8/100}','Au plus deux chiffres après la virgule','Relations entre unités, dixièmes et centièmes','Placer, repérer, comparer, encadrer, intercaler, ordonner','Partie entière ; arrondi à l’entier'], v:['fraction décimale','dixième','centième','partie entière','arrondi']},
 cm2:{i:['Extension aux millièmes','Écritures fractionnaires et à virgule dès la période 1'], v:['millième']},
 s6:{i:['Automatismes : {1/10} = 0,1 ; {1/100} = 0,01 ; {1/1000} = 0,001 ; passer d’une écriture à l’autre','Reconnaître un nombre décimal ; écritures à virgule, fraction, nombre mixte, pourcentage','Placer un point d’abscisse décimale ; repérer','Arrondi à l’unité, au dixième, au centième ; valeur arrondie de nombres non décimaux','Encadrer, intercaler'], v:['abscisse','valeur arrondie','pourcentage']},
 s5:{i:['Automatismes : placer et repérer un décimal sur une demi-droite graduée','Additionner, soustraire, multiplier des décimaux à une ou deux décimales']},
 s4:{i:['Associer écriture décimale, écriture fractionnaire et notation scientifique']},
},
{d:'N', n:'Nombres relatifs',
 s5:{i:['Définir les nombres relatifs, l’opposé, la valeur absolue','Grandeurs pouvant être inférieures à zéro (température, altitude…)','Lire et placer une abscisse sur une droite graduée ; comparer, ranger','Additionner, soustraire, enchaîner ; parenthèses indispensables ou non'], v:['nombre relatif','opposé','valeur absolue','positif','négatif','strictement positif','strictement négatif']},
 s4:{i:['Produits et quotients de décimaux relatifs (−2,5 × (−4) ; −63 : (−0,7))','Déterminer le signe d’un produit','Comparer, ranger, encadrer des rationnels positifs ou négatifs']},
 s4n:{i:['Multiplier deux relatifs : un facteur négatif, puis deux grâce à la distributivité','Diviser deux relatifs ; enchaîner les opérations','Nommer le calcul (somme, quotient…) d’un programme de calcul, et inversement'], v:['somme','quotient']},
},
{d:'N', n:'Opérations et calcul posé',
 cp:{i:['Sens de l’addition et de la soustraction (opération inverse) par les problèmes','Le signe = seulement entre deux termes égaux : « 47 + 3 = 50 + 5 » est incorrect','Soustractions par manipulation et cassage de dizaines dès la période 3','Addition posée en colonnes en période 4 ou 5 (45 + 37)','Sens de la multiplication : « trois fois vingt » s’écrit 20 + 20 + 20'], v:['+','−','=','fois'], note:'Pas de calculatrice au cycle 2, sauf besoin particulier.'},
 ce1:{i:['Additions posées ; un algorithme de soustraction posée en période 3 au plus tard, le même dans toute l’école du CE1 au CM2','Symbole × lu « fois » : « 7 × 20 biscuits = 140 biscuits »','Commutativité de la multiplication'], v:['×','« par cassage »','« par compensation »']},
 ce2:{i:['Additions et soustractions posées jusqu’à 10 000, et avec les décimaux de la monnaie','Multiplication posée d’un nombre à 2 ou 3 chiffres par un nombre à 1 ou 2 chiffres, en période 4 au plus tard','Sens de la division, inverse de la multiplication : 91 ÷ 7 = 13'], v:['terme','somme','différence','facteur','produit','÷']},
 cm1:{i:['Estimer le résultat d’une opération','Calcul contenant des parenthèses','Additions et soustractions posées de décimaux','Multiplication de deux entiers ; d’un décimal par un entier < 10','Division euclidienne par un diviseur à un chiffre'], v:['division euclidienne'], note:'Pas de calculatrice personnelle au cours moyen.'},
 cm2:{i:['Une ou deux paires de parenthèses','Multiplication d’un décimal par un entier','Divisions décimales : dividende entier ou décimal, diviseur à un chiffre'], v:['division décimale','dividende','diviseur']},
 s6:{i:['Multiplier par 0,1 ; 0,01 ; 0,001 (lien avec la division par 10, 100, 1 000)','Sens et calcul du produit de deux décimaux, appuyé sur l’aire du rectangle','Contrôler avec des ordres de grandeur','Diviser un décimal par un entier non nul < 10 ; division euclidienne par un entier < 100','Division partition (valeur d’une part) et quotition (nombre de parts) dans les problèmes'], v:['ordre de grandeur']},
 s5:{i:['Diviser par un nombre décimal','Traduire un problème ou un programme de calcul en une seule expression, avec ou sans parenthèses','Nommer un calcul : sommes et produits, termes et facteurs','Priorités opératoires ; distributivité simple sur des exemples numériques'], v:['priorités opératoires','distributivité','terme','facteur'], note:'Calculatrice : usage raisonné, fixé par le professeur.'},
},
{d:'N', n:'Calcul mental et automatismes',
 cp:{i:['Tables d’addition dans les deux sens : 8 égalités à trou en 1 minute en fin d’année','Doubles (1 à 10 ; 20 à 50) et moitiés (pairs de 2 à 20 ; 40, 60, 80, 100) : 8 en 1 minute','Ajouter ou soustraire 1, 2, 10, des dizaines entières','Complément à la dizaine supérieure ; ajouter 9 ; ajouter deux nombres < 100 ; 50 − 6','Fluence des procédures : 9 résultats en 3 minutes'], v:['double','moitié','complément']},
 ce1:{i:['Tables d’addition : 12 en 1 minute ; tables de multiplication : 8 en 1 minute','Doubles jusqu’à 15 et de 100 à 500, moitiés jusqu’à 1 000 ; multiples de 25 jusqu’à 100','Ajouter ou soustraire des dizaines, des centaines ; multiplier par 10','Ajouter 9, 19, 29 ; soustraire 9 ; 13 × 7 = 10 × 7 + 3 × 7','Fluence des procédures : 12 résultats en 3 minutes']},
 ce2:{i:['Tables d’addition : 15 en 1 minute ; tables de multiplication : 12 en 1 minute','Décompositions de 60 : 2 × 30, 3 × 20, 4 × 15, 5 × 12, 6 × 10','Multiplier par 10, 100, 4, 8 ; un nombre < 10 par des dizaines','Ajouter 8, 9, 18, 19… 39 ; soustraire 9, 19, 29, 39','Fluence des procédures : 15 résultats en 3 minutes']},
 cm1:{i:['Faits numériques usuels ; relations entre fractions usuelles ; écriture décimale de fractions usuelles','Ajouter ou soustraire unités, dizaines, centaines, dixièmes ou centièmes sans retenue','Multiplier un entier par 10, 100, 1 000 ; multiplier et diviser un décimal par 10','Multiplier par 4, 8 ou 5 ; distributivité dans des cas simples']},
 cm2:{i:['Moitié des nombres impairs jusqu’à 15','Multiplier et diviser un décimal par 10, 100, 1 000','Ajouter deux décimaux < 10 à un chiffre après la virgule ; ajouter ou soustraire 8, 9… 98, 99','Double et moitié d’un décimal ; diviser par 4 ou 8 ; multiplier un décimal par 5 ou 50']},
 s6:{i:['Automatismes sur des notions du cours moyen uniquement','1 = {10/10} = {100/100} ; × et ÷ par 1, 10, 100, 1 000','{1/4} = 0,25 ; {1/2} = 0,5 ; {3/4} = 0,75 ; {3/2} = 1,5','{2/3} de 12 œufs ; {3/4} de 10 m']},
 s5:{i:['Une rubrique « Automatismes » ouvre chaque thème','0,6 × 7 ; 40 × 0,03 ; 2,7 + 1,4 ; 3,4 − 0,8','1 %, 10 %, 50 % d’un nombre','Un même nombre sous plusieurs formes : 1,2 = {12/10} = {6/5} = 1 + {1/5} = 120 %']},
 s3:{i:['À automatiser sur le cycle : règles de calcul sur relatifs et fractions (si ad = bc, alors {a/b} = {c/d})','Conventions du calcul littéral ; distributivité simple et double ; a² − b² = (a − b)(a + b)','Résolution de ax = b et a + x = b'], note:'Liste de fin de cycle du programme 2020.'},
 s4n:{i:['Carrés parfaits de 0 à 12 ; 2³ = 8 ; 3³ = 27 ; 10³ = 1 000','Compléter 1 200 = 1,2 × … ; 5 × … = 3','a % de c pour a = 100, 50, 25, 10, 1 ; 20 % de 120']},
 s3n:{i:['Les quatre opérations sur les fractions','Résoudre ax = c, x + b = c, ax + b = c ; développer et factoriser une expression simple','Pourcentage d’une quantité ; distance réelle sur une carte à l’échelle']},
},
{d:'N', n:'Résolution de problèmes',
 cp:{i:['Problèmes additifs en une étape de type parties-tout ; les transformations (ajout, retrait) traitées comme des parties-tout','Additifs en deux étapes (nombres ≤ 30)','Multiplicatifs en une étape (≤ 30), dont partages équitables','Au moins 10 problèmes par semaine ; phases Comprendre, Modéliser, Calculer, Répondre, avec régulation']},
 ce1:{i:['Parties-tout avec un schéma en barre ; comparaison additive en une étape (« 75 de plus que Léo »)','Additifs en deux étapes ; multiplicatifs en une étape','Mixtes en deux étapes (une additive, une multiplicative)']},
 ce2:{i:['Comparaison multiplicative en une étape','Produits cartésiens','Mixtes en deux ou trois étapes','Structures complexes sur des nombres < 100']},
 cm1:{i:['Additifs en deux ou trois étapes ; multiplicatifs parties-tout ; comparaison multiplicative','Problèmes de dénombrement et d’optimisation','Vraisemblance : « 4,5 m pour la longueur d’une voiture, est-ce plausible ? »']},
 cm2:{i:['Additifs et mixtes en plusieurs étapes','Problèmes préparant à l’utilisation d’algorithmes']},
 s6:{i:['Problèmes de multiplications de décimaux, de divisions décimales et euclidiennes','Problèmes avec des fractions ; en inventer','Calculatrice possible quand les nombres dépassent le cadre du programme']},
 s5:{i:['Six compétences : chercher, modéliser, représenter, calculer, raisonner, communiquer','Contrôler la vraisemblance de son résultat']},
 s4:{i:['Les mêmes six compétences ; problèmes dans chaque thème (voir les autres lignes)']},
},
{d:'N', n:'Pensée algébrique, calcul littéral, équations',
 cp:{i:['Suites répétitives : « Dans ABABAB…, quelle est la dix-neuvième lettre ? »','Égalités à trou : 4 + … = 12 ; 10 = 7 + …']},
 ce1:{i:['Suites répétitives et évolutives (1, 2, 4, 7, 11, 16…)','Égalités à trou additives et multiplicatives']},
 ce2:{i:['Égalités à trou : 7 × … = 42 ; 70 = 7 × …']},
 cm1:{i:['Le signe = relie deux expressions égales : 178 − … = 6 × 8','Représenter un nombre inconnu par un symbole ou une lettre ; problèmes algébriques (schémas en barre, balances)','Exécuter un programme de calcul','Règle d’une suite de nombres ; suites de motifs évolutives'], v:['égalité à trous','programme de calcul']},
 cm2:{i:['Exécuter ou produire un programme de calcul (jusqu’à trois instructions)','Nombre d’éléments à une étape donnée d’une suite de motifs','Écriture générique : (N × 12) + 5']},
 s6:{i:['Modèles pré-algébriques (schémas en barre, motifs évolutifs)','Inconnues exprimées par des mots, des dessins, éventuellement des lettres ; les lettres formelles viennent au cycle 4','Formules de périmètre et d’aire : substituer une valeur à une lettre']},
 s5:{i:['Produire des formules (double, triple, carré, successeur, prédécesseur, aire, périmètre)','Valeur d’une expression par substitution ; tester une égalité','Somme ou produit ? k(a + b) = ka + kb pour développer ou factoriser ; réduire ax + b','Démontrer par le calcul littéral ; contre-exemple','Lettre inconnue : ax = c et x + b = c par les opérations inverses'], v:['expression littérale','développer','factoriser','réduire','inconnue','équation','successeur','prédécesseur'], note:'Prolongement possible : Al Khwarizmi, « al-jabr ».'},
 s4:{i:['Structure d’une expression : 3x + 12 est une somme, 3(x + 4) un produit','Distributivité simple pour développer, factoriser, réduire','Démontrer l’équivalence de deux programmes de calcul','Mettre un problème en équation ; tester si un nombre est solution','Résoudre une équation du premier degré (2x + 5 = −x − 4)'], v:['développer','factoriser','réduire','solution']},
 s3:{i:['Opposé d’une expression : −(3x − 7) = −3x + 7','Simple et double distributivité ; factoriser a² − b², développer (a + b)(a − b)','Équations du premier degré, équations produits, x² = a','Problèmes internes ou issus d’autres disciplines'], v:['double distributivité','équation produit']},
 s4n:{i:['3 × x s’écrit 3x ; x × x = x² ; 3x + 2x = 5x ; 3x × 2x = 6x²','Formules et vraisemblance ; distributivité simple ; démonstrations par le calcul','Résoudre ax + b = c ; mettre en équation avec ax + b = cx + d','Conjectures avec un algorithme ou un tableur']},
 s3n:{i:['Double distributivité ; trois identités remarquables','Inéquation ax ⩾ b, résolue par le calcul et graphiquement','Équation produit nul ; raisonnement par analyse-synthèse','Écriture générique d’un nombre pair, d’un nombre impair'], v:['identité remarquable','inéquation','équation produit nul'], note:'Prolongement possible : identité de Sophie Germain.'},
},
{d:'N', n:'Puissances, racine carrée, notation scientifique',
 s5:{i:['Notion de puissance et notation, dans le cas du carré et du cube','Carrés des entiers de 0 à 12 ; cube de 10','Expressions avec des puissances simples'], v:['puissance','carré','cube']},
 s4:{i:['Puissances de 10 d’exposants positifs ou négatifs ; préfixes de nano à giga (3 microlitres = 3 × 10⁻⁶ L)','Notation scientifique ; comparer, ordres de grandeur','Carrés parfaits de 1 à 144 ; définition de la racine carrée ; encadrer √7 entre deux entiers ; valeur approchée à la calculatrice','Puissances d’exposants positifs pour simplifier des produits'], v:['exposant','notation scientifique','racine carrée','nano… giga']},
 s3:{i:['Puissances d’exposants positifs ou négatifs pour simplifier des produits','Problèmes avec des racines carrées et la notation scientifique']},
 s4n:{i:['Puissances d’exposant positif ; produits de puissances d’un même nombre, de même exposant','Définition de la racine carrée d’un nombre positif ; encadrement entre deux entiers'], v:['exposant','racine carrée'], note:'Prolongement possible : √2 n’est pas décimal (raisonnement par l’absurde).'},
 s3n:{i:['Puissances d’exposant négatif ; multiplier et diviser des puissances','Notation scientifique dans les problèmes','Résoudre x² = a par le calcul et graphiquement'], v:['notation scientifique'], note:'Préfixes de nano à giga introduits selon les besoins au cours du cycle.'},
},

/* ───────── GRANDEURS ET MESURES ───────── */
{d:'G', n:'Longueurs et périmètre',
 cp:{i:['Comparer des objets, des segments (superposition, ficelle, bandelette)','Mesurer avec une règle graduée en centimètres','1 m = 100 cm ; longueurs de référence (hauteur de la porte…)'], v:['long','court','près','loin','mètre (m)','centimètre (cm)']},
 ce1:{i:['1 m = 100 cm ; 1 km = 1 000 m ; 1 m + 46 cm = 146 cm','Choisir l’unité adaptée ; estimer la longueur d’un objet','Pas d’écriture à virgule pour les longueurs'], v:['kilomètre (km)']},
 ce2:{i:['Relations entre m, dm, cm, mm, km','Tracer un segment de longueur donnée ; estimer une distance','Périmètre : le comparer au compas, le déterminer à la règle graduée'], v:['décimètre (dm)','millimètre (mm)','périmètre']},
 cm1:{i:['Unités du millimètre au kilomètre et leurs relations','Conversions par les relations entre unités, sans tableau de conversion','Périmètre d’un polygone ; pas de formule à mémoriser (règle possible : quadruple du côté pour le carré)']},
 cm2:{i:['Estimations d’éléments non manipulables (distance entre deux villes)','Toujours ni formule imposée ni tableau de conversion']},
 s6:{i:['Préfixes de kilo- à milli- et lien avec les unités de numération','1 cm = {1/10} dm = 0,1 dm ; convertir vers le mètre et depuis le mètre','Compas comme outil de report de longueurs','Périmètre du carré, du rectangle ; périmètre du disque, proportionnel au diamètre ; figures composées'], v:['kilo- … milli-','périmètre du disque']},
 s5:{i:['Conversions d’unités de longueur dans les problèmes (avec les aires)']},
},
{d:'G', n:'Masses',
 cp:{i:['Comparer en soupesant ; ordonner deux ou trois objets avec une balance de type Roberval'], v:['lourd','léger']},
 ce1:{i:['1 kg = 1 000 g ; masses de référence ; estimer en gramme ou kilogramme'], v:['gramme (g)','kilogramme (kg)']},
 ce2:{i:['Choisir l’unité adaptée ; relations entre unités usuelles ; estimer'], v:['tonne (t)']},
 cm1:{i:['Du milligramme au kilogramme, et la tonne ; relations ; conversions sans tableau'], v:['milligramme (mg)']},
},
{d:'G', n:'Contenances et volumes',
 ce2:{i:['Comparer des contenances','1 L = 10 dL = 100 cL'], v:['litre (L)','décilitre (dL)','centilitre (cL)']},
 cm1:{i:['Unités du millilitre à l’hectolitre et leurs relations'], v:['millilitre (mL)','hectolitre (hL)']},
 cm2:{i:['Estimations (volume d’eau d’une piscine)']},
 s6:{i:['Unité centimètre cube ; comparer et déterminer des volumes (assemblages de cubes)'], v:['volume','centimètre cube (cm³)']},
 s5:{i:['Volume du cube, du pavé droit, du prisme droit ; volume du cylindre de révolution','Unités usuelles de volume et de capacité, conversions'], v:['capacité']},
 s4:{i:['Volume d’une pyramide, d’un cône','1 L = 1 dm³ ; 1 000 L = 1 m³ (programme du cycle)']},
 s3:{i:['Volume d’une boule','Volumes d’assemblages de solides (cylindre surmonté d’une demi-boule)']},
 s4n:{i:['Formules du volume du cube, du pavé, du prisme, du cylindre (automatismes)','Volume de la pyramide et du cône de révolution']},
 s3n:{i:['Formule du volume d’une boule de rayon donné'], note:'Prolongement possible : l’intuition d’Archimède (deux tiers du cylindre).'},
},
{d:'G', n:'Aires',
 cm1:{i:['Comparer des aires sans mesurer (superposition, découpage)','Déterminer des aires avec une unité et un quadrillage','Pas de formule à mémoriser'], v:['aire','centimètre carré (cm²)']},
 cm2:{i:['Exprimer des aires en cm², dm², m² ; convertir','Aire du carré et du rectangle'], v:['décimètre carré (dm²)','mètre carré (m²)']},
 s6:{i:['1 cm² est l’aire d’un carré de 1 cm de côté ; 1 m² = 100 dm² ; 1 cm² = 0,01 dm²','Conversions d’aires','Formules de l’aire du carré et du rectangle']},
 s5:{i:['Aire du disque, du triangle, du parallélogramme, de figures complexes','Conversions d’unités d’aire dans les problèmes','Fil rouge du cycle : des preuves par les aires']},
 s4:{i:['Effet d’un agrandissement ou d’une réduction sur les aires (voir Transformations)']},
 s4n:{i:['Automatisme : aire du triangle, du rectangle, du disque']},
},
{d:'G', n:'Monnaie',
 cp:{i:['Montants entiers ≤ 100 € ; introduite en période 2 ou 3','Comparer, déterminer la valeur, constituer une somme avec pièces et billets','Simuler des achats, rendre la monnaie'], v:['plus cher','moins cher','rendre la monnaie','billet','pièce','somme','reste','euro']},
 ce1:{i:['100 centimes = 1 € ; valeur en euros et centimes','Écriture à virgule d’une somme d’argent : la virgule repère le chiffre des unités d’euro','Distinguer « deux euros et cinq centimes » de « deux euros et cinquante centimes »'], v:['centime','centime d’euro']},
 ce2:{i:['Poser et effectuer additions et soustractions de montants en euros']},
 cm1:{i:['Écritures à virgule rencontrées dès la période 1 dans des problèmes de monnaie']},
},
{d:'G', n:'Repérage dans le temps, durées',
 cp:{i:['Lire l’heure en heures entières sur une horloge à aiguilles ; placer les aiguilles (≤ 12 h)','Associer une heure à un moment de la journée']},
 ce1:{i:['Heures entières, demi-heures, quarts d’heure','Heures du matin et de l’après-midi : « 14 : 15 » sur une horloge digitale','Durées écoulées dans une même journée'], v:['heure (h)','minute (min)','demi-heure','quart d’heure','« trois heures de l’après-midi »']},
 ce2:{i:['Lire l’heure en heures et minutes (sept heures moins le quart, quinze heures quarante-deux)','Minutes dans deux heures et vingt minutes','Problèmes à une ou deux étapes ; axe chronologique orienté'], v:['midi','« moins le quart »']},
 cm1:{i:['Instants et durées en heures et minutes ; problèmes à une ou deux étapes']},
 cm2:{i:['Introduction des secondes ; système sexagésimal (base soixante)','Problèmes à une ou plusieurs étapes'], v:['seconde (s)']},
 s6:{i:['Jour, heure, minute, seconde et leurs relations','Jours d’une année (bissextile ou non), années d’un siècle, d’un millénaire','Calculs sur horaires et durées ; conversions entre décimal et sexagésimal'], v:['année bissextile','siècle','millénaire']},
},
{d:'G', n:'Grandeurs composées',
 s6:{i:['Expressions « prix au kilo », « battements du cœur par minute », qui annoncent la grandeur quotient']},
 s5:{i:['Coefficient de proportionnalité en contexte : prix unitaire, vitesse moyenne, échelle'], v:['prix unitaire','vitesse moyenne']},
 s4:{i:['Conversions sur des grandeurs composées : m³/s en L/min, km/h en m/s','Grandeurs produits et quotients introduites par les problèmes (vitesse, débit, masse volumique)'], v:['grandeur quotient','grandeur produit','débit']},
 s3:{i:['Calculs sur des grandeurs composées dans les unités adaptées','Vérifier la cohérence des unités (km/h, m/s, m³/s, L/h)']},
 s4n:{i:['Utiliser des grandeurs quotients, avec ou sans unités'], v:['grandeur quotient']},
},

/* ───────── ESPACE ET GÉOMÉTRIE ───────── */
{d:'E', n:'Se repérer : espace, plans, repères',
 cp:{i:['Situer objets et personnes dans la classe ; plan de la classe','Coder et décoder un déplacement par une suite d’instructions'], v:['gauche','droite','sur','sous','entre','devant','derrière','au-dessus','en dessous']},
 ce1:{i:['Plan de l’école, du quartier, photo aérienne','Assemblages de cubes et de pavés d’après un modèle'], v:['à gauche','à droite','près','loin']},
 cm1:{i:['Vocabulaire des déplacements ; instructions dans un quartier, une ville','Problèmes d’assemblages de cubes','Un ensemble de points dans un repère pour présenter des données']},
 cm2:{i:['Programmes de déplacement plus longs']},
 s5:{i:['Droite graduée : lire et placer une abscisse','Repère orthogonal : lire et placer des coordonnées'], v:['abscisse','coordonnées','repère orthogonal']},
 s4:{i:['Se repérer dans un pavé droit : coordonnées (2 ; 3 ; 4)'], v:['abscisse','ordonnée','altitude']},
 s3:{i:['Se repérer sur une sphère, sur un globe terrestre'], v:['latitude','longitude']},
 s4n:{i:['Automatismes : abscisse d’un nombre relatif ; coordonnées dans un repère orthogonal']},
 s3n:{i:['Mêmes automatismes de repérage']},
},
{d:'E', n:'Alignement, perpendiculaires, parallèles',
 cp:{i:['Repérer visuellement des alignements, les vérifier à la règle','Tracer à la règle la droite passant par deux points'], v:['point','droite','segment'], note:'Ces concepts sont introduits en situation, sans définition formelle.'},
 ce1:{i:['Repérer et tracer des points alignés','Trouver le milieu d’un segment par pliage'], v:['milieu d’un segment']},
 cm1:{i:['Reconnaître et utiliser la perpendicularité et le parallélisme','Codes usuels de géométrie','Notations (AB), [AB], [AB) et AB employées par le professeur, non exigibles : « tracer le segment [AB] »'], v:['perpendiculaire','parallèle']},
 cm2:{i:['Connaître les notations et les codes usuels']},
 s6:{i:['Distance entre deux points ; milieu d’un segment (définitions)','Médiatrice d’un segment : définition, propriété caractéristique, problèmes'], v:['distance','médiatrice']},
 s5:{i:['Parallélisme caractérisé par les angles (voir Angles)']},
},
{d:'E', n:'Angles',
 ce1:{i:['Identifier et tracer des angles droits (gabarit, puis équerre) ; code de l’angle droit','Aigu : plus petit qu’un angle droit ; obtus : plus grand'], v:['angle','angle droit','angle aigu','angle obtus']},
 ce2:{i:['Vérifier à l’équerre les angles droits d’un polygone ; les coder']},
 cm1:{i:['Lexique spécifique et notations des angles','Comparer des angles (angles saillants seulement)']},
 cm2:{i:['Construire la somme de deux angles, un multiple d’un angle ; la moitié par pliage','L’angle droit mesure 90° ; pas de rapporteur au CM2'], v:['degré (°)']},
 s6:{i:['Mesurer un angle ; construire un angle de mesure donnée','Bissectrice d’un angle saillant : définition, constructions'], v:['angle plat','angle plein','angle nul','opposés par le sommet','adjacents','supplémentaires','bissectrice']},
 s5:{i:['Automatismes : angle droit 90°, plat 180° ; angles de l’équerre (30°, 60°, 90° ou 45°, 45°, 90°)','Caractériser le parallélisme par les angles'], v:['angles alternes-internes','angles correspondants']},
},
{d:'E', n:'Polygones et cercles',
 cp:{i:['Reconnaître et nommer disque, carré, rectangle, triangle','Première description avec « sommet » et « côté »','Construire sur papier quadrillé ou pointé'], v:['disque','carré','rectangle','triangle','sommet','côté']},
 ce1:{i:['Cercle, triangle rectangle','Angles droits et égalités de longueur du carré et du rectangle','Règle graduée, équerre, compas ; cercle de centre donné passant par un point'], v:['cercle','centre','triangle rectangle']},
 ce2:{i:['Losange ; propriétés des carrés, rectangles, losanges','Construire sur papier uni (rectangle de 7 cm sur 3 cm, cercle de rayon 4 cm)','Coder angles droits et longueurs égales'], v:['polygone','quadrilatère','pentagone','hexagone','losange','diagonale','longueur','largeur','rayon','diamètre']},
 cm1:{i:['Cercle et disque : points à une distance donnée d’un point','Nommer en s’appuyant sur la définition : triangle isocèle, équilatéral, quadrilatère, carré, rectangle, losange','Propriétés : côtés opposés parallèles, longueurs, angles','Figures composées de segments, droites, polygones, cercles'], v:['triangle isocèle','triangle équilatéral']},
 cm2:{i:['Trapèze, trapèze rectangle, pentagone, hexagone','Élaborer un programme de construction'], v:['trapèze','trapèze rectangle','programme de construction']},
 s6:{i:['Définitions de cercle, disque, rayon, diamètre, corde, comme ensembles de points','Problèmes de distances à un point'], v:['corde']},
 s5:{i:['Parallélogramme : définition, construction, propriétés caractéristiques des côtés et des diagonales','Rectangle, losange, carré : parallélogrammes particuliers','Aire du parallélogramme'], v:['parallélogramme','propriété caractéristique']},
 s4:{i:['Mettre en œuvre et écrire un protocole de construction'], v:['protocole de construction']},
 s4n:{i:['Reconnaître un parallélogramme particulier par ses diagonales','Construire des rectangles sans équerre']},
 s3n:{note:'Prolongement possible : polygones réguliers à la règle et au compas.'},
},
{d:'E', n:'Triangles et grands théorèmes',
 s6:{i:['Construire des triangles ; trois longueurs ne permettent pas toujours d’en construire un','Propriétés angulaires des triangles rectangle, isocèle, équilatéral','Somme des angles d’un triangle : calculs, constructions','Médiatrices concourantes ; cercle circonscrit'], v:['cercle circonscrit']},
 s5:{i:['Somme des angles : la connaître et la démontrer','Construire à partir de données partielles','Hauteurs (concourantes) et médianes ; une médiane partage en deux triangles de même aire','Aire du triangle'], v:['hauteur','médiane']},
 s4:{i:['Cas d’égalité des triangles','Théorème de Thalès et réciproque (triangles emboîtés)','Théorème de Pythagore et réciproque','Cosinus d’un angle d’un triangle rectangle'], v:['cas d’égalité','théorème de Thalès','théorème de Pythagore','réciproque','cosinus']},
 s3:{i:['Thalès et réciproque, configuration papillon','Triangles semblables : une définition, une propriété caractéristique','Cosinus, sinus, tangente pour calculer longueurs et angles'], v:['triangles semblables','sinus','tangente']},
 s4n:{i:['Droites remarquables : médiatrices, médianes, hauteurs, bissectrices','Les trois théorèmes de la droite des milieux','Pythagore, sa réciproque, sa contraposée','Triangle rectangle inscrit dans un demi-cercle ; centre du cercle circonscrit'], v:['droite des milieux','réciproque','contraposée']},
 s3n:{i:['Thalès, sa réciproque, sa contraposée (triangles emboîtés et papillon)','Cosinus, sinus, tangente dans le triangle rectangle'], v:['cosinus','sinus','tangente']},
},
{d:'E', n:'Symétries et transformations',
 ce2:{i:['Reconnaître des axes de symétrie (pliage, calque)','Compléter une figure sur quadrillage pour la rendre symétrique (axe vertical ou horizontal)'], v:['axe de symétrie','symétrique']},
 cm1:{i:['Construire sur quadrillage le symétrique d’une figure (droite horizontale ou verticale)']},
 cm2:{i:['Axe vertical, horizontal ou diagonale du quadrillage']},
 s6:{i:['Symétrique d’un point par rapport à une droite (définition)','Propriétés de la symétrie axiale ; papier uni'], v:['symétrie axiale']},
 s5:{i:['Demi-tour, ou symétrie centrale : définition, propriétés'], v:['demi-tour','symétrie centrale']},
 s4:{i:['Transformer par translation ; translations dans frises et pavages','Conservation du parallélisme, des longueurs, des aires, des angles','Agrandissement ou réduction : effet sur longueurs, aires, volumes'], v:['translation','agrandissement','réduction']},
 s3:{i:['Rotation et homothétie (rapport positif ou négatif) : transformer, comprendre l’effet','Les identifier dans frises, pavages, rosaces ; calculer des grandeurs','Définitions ponctuelles hors programme'], v:['rotation','homothétie','rapport']},
 s4n:{i:['Effet d’une translation ; lien avec les parallélogrammes et les angles','Propriétés de conservation'], v:['translation']},
 s3n:{i:['Translation définie avec un parallélogramme','Vecteurs égaux, nul, opposés ; somme par enchaînement de translations ; relation de Chasles'], v:['vecteur','vecteur nul','relation de Chasles']},
},
{d:'E', n:'Solides et représentations',
 cp:{i:['Reconnaître cube, boule, cône, cylindre, pavé ; nommer cube, pavé, boule','Nombre et nature des faces d’un cube, d’un pavé'], v:['cube','boule','cône','cylindre','pavé','face']},
 ce1:{i:['Pyramide ; nombre de faces, d’arêtes, de sommets d’un polyèdre','Construire un cube, un pavé droit, une pyramide'], v:['pyramide','arête','sommet','pavé droit']},
 ce2:{i:['Faces d’une pyramide ; sa base, polygone','Construire un cube à partir d’un patron','Identifier un solide en perspective (arêtes cachées en pointillés)'], v:['patron','base']},
 cm1:{i:['Prisme droit','Reconnaître et construire un patron du cube','Justifier la nature d’un polyèdre par ses faces'], v:['prisme droit','polyèdre']},
 cm2:{i:['Reconnaître un patron du pavé']},
 s6:{i:['Identifier les solides du cours moyen (automatisme)','Assemblages de cubes : vues en deux dimensions, dénombrements']},
 s5:{i:['Perspective cavalière : pavé droit, cube, cylindre de révolution, prisme droit','Relier perspective et patron','Vues d’empilements de cubes'], v:['perspective cavalière','cylindre de révolution'], note:'Prolongement possible : solides de Platon, formule d’Euler.'},
 s4:{i:['Perspective cavalière et patron d’une pyramide, d’un cône de révolution'], v:['cône de révolution']},
 s3:{i:['Représentations : perspective, vues de face, de dessus, en coupe, patrons ; sections planes','Grand cercle d’une sphère'], v:['section plane','sphère','grand cercle']},
 s4n:{i:['Reconnaître pyramide et cône de révolution ; relier leurs représentations']},
 s3n:{i:['Boule et sphère : définitions ; grands cercles, diamètre','Sections de pavé, de cylindre, de boule'], v:['boule','sphère','grand cercle','section']},
},

/* ───────── DONNÉES ET PROBABILITÉS ───────── */
{d:'D', n:'Données et statistiques',
 cp:{i:['Recueillir des données (caractère qualitatif, deux à cinq valeurs)','Tableau ; diagramme en barres, axe gradué de un en un','Construire et compléter un tableau à double entrée'], v:['le plus','le moins','le plus grand','le plus petit','autant que','plus que','moins que']},
 ce1:{i:['Produire un tableau ou un diagramme en barres','Lire et interpréter un diagramme en barres, un tableau à double entrée'], v:['tableau à double entrée','diagramme en barres']},
 ce2:{i:['Caractères aussi quantitatifs discrets (âge, nombre de frères et sœurs)','Échelle adaptée sur l’axe vertical','Problèmes avec les données d’un tableau ou d’un diagramme']},
 cm1:{i:['Tableau à simple ou double entrée, diagramme en barres, points dans un repère, courbe','Problèmes en une ou plusieurs étapes ; données réelles (climat, biodiversité)'], v:['courbe']},
 cm2:{i:['Lire un diagramme circulaire','Données prélevées aussi dans un texte'], v:['diagramme circulaire']},
 s6:{i:['Lecture immédiate de tableaux, diagrammes, courbes (automatisme)','Planifier une enquête ; réaliser des mesures et les consigner','Filtrer les données d’un tableau selon un critère'], v:['enquête']},
 s5:{i:['Effectifs et fréquences (décimale, fraction, pourcentage)','Représenter sur papier ou au tableur-grapheur : diagrammes en barres, circulaires, graphique cartésien','Choisir la représentation adaptée','Moyenne simple'], v:['effectif','fréquence','moyenne']},
 s4:{i:['Lire, interpréter, construire des diagrammes circulaires','Médiane d’une série d’effectif total ≤ 30'], v:['médiane']},
 s3:{i:['Histogrammes pour des classes de même amplitude','Étendue ; effectifs et fréquences'], v:['histogramme','étendue']},
 s4n:{i:['Moyenne pondérée ; médiane ; étendue','Effet d’une valeur extrême ; comparer des séries ; tableur'], v:['moyenne pondérée','médiane','étendue']},
 s3n:{i:['Effectifs cumulés croissants','Quartiles et médiane ; boîtes à moustaches'], v:['effectifs cumulés croissants','quartile','boîte à moustaches']},
},
{d:'D', n:'Probabilités',
 cm1:{i:['Expériences aléatoires : pièce, dé, urne, cartes ; recenser les issues','Comparer des évènements selon leurs chances','Deux issues possibles ne veulent pas dire une chance sur deux','Reconnaître l’équiprobabilité'], v:['impossible','possible','certain','probable','peu probable','une chance sur deux','issue','équiprobabilité']},
 cm2:{i:['Issues réalisant un évènement ; probabilité en « a chances sur b »','Indépendance : le dé « ne se souvient pas »','Expériences à deux étapes : tableau ou arbre'], v:['évènement','« a chances sur b »','arbre']},
 s6:{i:['Une probabilité est un nombre entre 0 et 1, le quotient {a/b} (fraction, décimal, pourcentage)','Calculs en situation d’équiprobabilité','Approche fréquentiste : résultats répétés et probabilité calculée'], v:['probabilité'], note:'Le vocabulaire expérience, issue, univers, évènement peut être employé par le professeur ; il n’est pas exigé de l’élève.'},
 s5:{i:['Échelle de probabilité ; « une chance sur quatre » = {1/4}','Probabilités dans des cas simples d’équiprobabilité','Répéter une expérience ; tableau d’effectifs et de fréquences'], v:['expérience aléatoire','issue','évènement']},
 s4:{i:['Évènements contraires pour calculer une probabilité','Probabilité entre 0 et 1, sous diverses formes'], v:['évènement certain','évènement impossible','évènement contraire']},
 s3:{i:['Dénombrements pour une ou deux épreuves (tableau à double entrée)','Lien entre stabilisation des fréquences et probabilités ; simulations'], v:['épreuve']},
 s4n:{i:['Notations ensemblistes : complémentaire, réunion, intersection, ensemble vide','Probabilité d’un évènement et de son contraire','Deux épreuves ; fluctuation des fréquences'], v:['complémentaire','réunion','intersection','ensemble vide']},
 s3n:{i:['P(A ∪ B) + P(A ∩ B) = P(A) + P(B)','Simuler des expériences indépendantes ; stabilisation des fréquences'], note:'Prolongement possible : l’erreur de D’Alembert.'},
},

/* ───────── PROPORTIONNALITÉ ET FONCTIONS ───────── */
{d:'P', n:'Proportionnalité, pourcentages, échelles',
 cm1:{i:['Identifier une situation de proportionnalité entre deux grandeurs','Linéarité multiplicative : « 3 fois plus de pains, 3 fois plus cher »','Raisonnements en langage naturel ; pas de tableau de proportionnalité au cours moyen'], v:['proportionnalité']},
 cm2:{i:['Problèmes en plusieurs étapes','Linéarité pour la multiplication et pour l’addition','Ni coefficient de proportionnalité ni « produit en croix » au cours moyen']},
 s6:{i:['Définition de la proportionnalité ; « modèle » de la proportionnalité','Linéarité ou retour à l’unité ; pas de « produit en croix »','Tableau (grandeurs et unités nommées), flèches, notations','Initiation aux échelles','Pourcentage : sens, proportion en %, appliquer un pourcentage'], v:['double','quadruple','moitié','tiers','quart','4 fois plus grand','5 fois moins','prix au kilo','échelle','proportion']},
 s5:{i:['Calculer et appliquer des proportions, des pourcentages','Coefficient de proportionnalité (prix unitaire, vitesse moyenne, échelle)','Tableau ou graphique ; nuage de points associé ou non à la proportionnalité'], v:['coefficient de proportionnalité']},
 s4:{i:['Reconnaître la proportionnalité sur un graphique (points alignés avec l’origine)','Quatrième proportionnelle par la procédure de son choix','Formules liant deux grandeurs (loi d’Ohm, longueur d’un cercle)','Proportionnalité en géométrie : agrandissement, Thalès'], v:['quatrième proportionnelle'], note:'Le programme 2020 prévoit aussi le ratio (notation 2 : 3) et le partage selon un ratio, sans année fixée par les attendus.'},
 s3:{i:['Modéliser par une fonction linéaire','Pourcentage d’évolution et coefficient multiplicateur : + 5 % = × 1,05 ; − 20 % = × 0,8','Proportionnalité dans Thalès, triangles semblables, homothéties'], v:['coefficient multiplicateur','pourcentage d’évolution']},
 s4n:{i:['Grandeurs quotients ; comparer par un rapport ou un ratio','Quatrième proportionnelle ; partage proportionnel','Pourcentages ; coefficient multiplicateur'], v:['ratio','rapport','quatrième proportionnelle','coefficient multiplicateur']},
 s3n:{i:['Partager selon un ratio ; distance réelle avec une échelle (automatismes)','Traduire une augmentation ou une diminution en pourcentage','Lien avec le théorème de Thalès ; fonctions linéaires']},
},
{d:'P', n:'Fonctions',
 s5:{i:['L’expression « en fonction de »','Tableau de valeurs : produire, lire, placer les points dans un repère','Lire un graphique cartésien (courbe, nuage de points)','Formule simple de dépendance ; caractériser graphiquement la proportionnalité'], v:['« en fonction de »','tableau de valeurs','graphique cartésien']},
 s4:{i:['Formule littérale de la dépendance de deux grandeurs','La représenter par un graphique ; lire des valeurs sur les axes'], v:['axe des abscisses','axe des ordonnées'], note:'Notation et vocabulaire fonctionnels pas encore formalisés en 4e.'},
 s3:{i:['Notations f(x) et x ↦ f(x) ; image, antécédent','Passer d’un mode de représentation à un autre','Fonctions linéaires et affines : représenter, interpréter les paramètres','Modéliser un phénomène continu'], v:['variable','fonction','image','antécédent','fonction linéaire','fonction affine','coefficient directeur','ordonnée à l’origine']},
 s4n:{i:['Programme de calcul appliqué à un nombre puis à une variable ; le remonter','Formule de dépendance ; représentation graphique'], v:['variable']},
 s3n:{i:['Représentations d’une fonction ; image, antécédents','Fonctions linéaires et affines ; coefficients lus graphiquement','Résoudre graphiquement équations et inéquations linéaires','Représenter la fonction carré'], v:['image','antécédent','fonction linéaire','fonction affine','fonction carré']},
},

/* ───────── PENSÉE INFORMATIQUE ───────── */
{d:'I', n:'Algorithmique et programmation',
 cp:{i:['Utiliser et produire une suite d’instructions qui code un déplacement, avec un vocabulaire spatial précis']},
 ce1:{i:['Comprendre, utiliser, produire des instructions de déplacement','Algorithmes des opérations posées']},
 ce2:{i:['Algorithme de la multiplication posée']},
 cm1:{i:['Codages de déplacements dans un quartier, une ville ; robots si l’école en est équipée','Suites évolutives, programmes de calcul, programmes de construction','Programmation par blocs ou tableur possibles']},
 cm2:{i:['Programmes plus longs ; produire des programmes de construction simples','Programmes de calcul jusqu’à trois instructions']},
 s6:{i:['Identifier une instruction, une séquence d’instructions','Produire, exécuter, répéter à la main une séquence','Programmer la construction d’un chemin simple, avec ou sans machine'], v:['instruction','séquence d’instructions','entrée','sortie','répétition']},
 s5:{i:['Séquencer des instructions ; entrées et sorties','Formules en langage par blocs ; prévoir le résultat','Analyser et modifier un programme','Boucle inconditionnelle (répéter un nombre précis de fois)','Variable : seulement la lecture d’une donnée saisie'], v:['boucle','variable']},
 s4:{i:['Niveaux 1 et 2 attendus : ordonner ou compléter des blocs ; « si … alors » ; « répéter … fois »','Script déclenché par un évènement ; variable dans un programme'], v:['algorithme','programme','script','« si … alors »','« répéter … fois »']},
 s3:{i:['Niveau 3 attendu : « répéter jusqu’à … » ; plusieurs scripts en parallèle ; bloc personnalisé pour un sous-problème'], v:['« répéter jusqu’à »','bloc personnalisé']},
 s4n:{i:['Conditions simples ; instructions conditionnelles','Manipuler une variable ; écrire et modifier un programme simple'], v:['instruction conditionnelle','variable']},
 s3n:{i:['Conditions composées ; boucle conditionnelle','Structurer des programmes ; écrire en autonomie'], v:['condition composée','boucle conditionnelle']},
},

/* ───────── RAISONNER ───────── */
{d:'R', n:'Raisonner, justifier, démontrer',
 cp:{i:['Verbaliser procédures et raisonnements avec ses propres mots','Régulation : « Le nombre trouvé est supérieur au total, est-ce possible ? »']},
 ce1:{i:['Justifier la nature d’une figure : « Ce n’est pas un rectangle car l’un de ses angles n’est pas droit »']},
 ce2:{i:['Justifier par une propriété : « … Or un carré a ses quatre angles qui sont des angles droits »','Argumenter pour dire si un assemblage est un patron du cube']},
 cm1:{i:['Vraisemblance des résultats ; présenter et comparer des méthodes à l’oral','Justifier la nature d’un polyèdre par ses faces']},
 s6:{i:['Initiation au raisonnement logique et à la preuve, en géométrie surtout','Les observations et les constructions s’appuient sur des définitions et des propriétés'], v:['définition','propriété','preuve']},
 s5:{i:['Distinguer définition, propriété, propriété caractéristique ; admise ou démontrée','Raisonnements déductif, par l’absurde, par contre-exemple','La mesure ne constitue plus une preuve','Démontrer la somme des angles d’un triangle ; démontrer par le calcul littéral'], v:['théorème','réciproque','contraposée','contre-exemple'], note:'Principes du programme du cycle 4 (2026), valables sur tout le cycle.'},
 s4:{i:['Démontrer progressivement, sans formalisme excessif','Raisonnement déductif, par disjonction de cas, par l’absurde','Statut des énoncés : définition, propriété admise ou démontrée, conjecture, théorème'], note:'Principes du programme 2020, valables sur tout le cycle.'},
 s3:{i:['Démontrer avec Thalès, les triangles semblables, les transformations']},
 s4n:{i:['Réciproque et contraposée du théorème de Pythagore','Démonstrations par le calcul algébrique']},
 s3n:{i:['Raisonnement par analyse-synthèse (équations)'], v:['analyse-synthèse']},
},
];

/* ---------- Rendu du tableau (chaîne HTML, sans DOM) ---------- */
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function fmt(s){
  const h = esc(s).replace(/(\d) (\d{3})/g, '$1 $2').replace(/(\d) (\d{3})/g, '$1 $2');
  return h.replace(/\{([^{}\/]+)\/([^{}\/]+)\}/g, '<span class="nt-fr" aria-label="$1 sur $2"><span>$1</span><span>$2</span></span>');
}
const cellData = (st, row, k) => st.nouveau && (k === 's4' || k === 's3') ? row[k + 'n'] : row[k];
const cellText = c => c ? [...(c.i || []), ...(c.v || []), c.note || ''].join(' ') : '';
const ACC = {a:'aàâä', e:'eéèêë', i:'iîï', o:'oôö', u:'uùûü', c:'cç', y:'yÿ'};
function qRegex(q){
  const base = String(q || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  if(!base) return null;
  return new RegExp([...base].map(ch => ACC[ch] ? '[' + ACC[ch] + ']' : ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join(''), 'gi');
}

/* st = {dom, vue, q, nouveau, vonly} -> {html, nRows, nWords, nLv} */
function notionsTable(st){
  const keys = VUES[st.vue] || [st.vue];
  const lvs = LV.filter(l => keys.includes(l.k));
  const rx = qRegex(st.q);
  const test = s => { if(!rx) return true; rx.lastIndex = 0; return rx.test(s); };
  let h = '<thead><tr><th class="nt-corner" scope="col">Notion ↓ · Niveau →</th>';
  for(const l of lvs){
    const src = st.nouveau && l.srcN ? l.srcN : l.src;
    h += `<th class="nt-lv nt-${l.c}" scope="col"><span class="nt-niv">${l.n}</span><span class="nt-champ">${fmt(l.champ)}</span><span class="nt-src">${src}</span></th>`;
  }
  h += '</tr></thead>';
  let nRows = 0, nWords = 0;
  for(const d of DOMS){
    if(st.dom !== 'all' && st.dom !== d.k) continue;
    const rows = ROWS.filter(r => r.d === d.k)
      .filter(r => lvs.some(l => cellData(st, r, l.k)))
      .filter(r => !rx || test(r.n) || lvs.some(l => test(cellText(cellData(st, r, l.k)))))
      .filter(r => !st.vonly || lvs.some(l => ((cellData(st, r, l.k) || {}).v || []).length));
    if(!rows.length) continue;
    h += `<tbody><tr class="nt-dom"><th colspan="${lvs.length + 1}" scope="rowgroup"><h2 class="nt-dn">${d.n}</h2></th></tr>`;
    for(const r of rows){
      nRows++;
      h += `<tr><th class="nt-row" scope="row">${fmt(r.n)}</th>`;
      for(const l of lvs){
        const c = cellData(st, r, l.k);
        if(!c || (st.vonly && !(c.v || []).length)){ h += `<td class="nt-${l.c}"><span class="nt-vide" title="Rien de nouveau dans le texte pour ce niveau">—</span></td>`; continue; }
        let inner = '';
        if(c.i && c.i.length) inner += '<ul>' + c.i.map(x => `<li>${fmt(x)}</li>`).join('') + '</ul>';
        if(c.v && c.v.length){ nWords += c.v.length; inner += '<div class="nt-voc"><span class="nt-k">Vocabulaire</span>' + c.v.map(w => `<span class="nt-w">${fmt(w)}</span>`).join('') + '</div>'; }
        if(c.note) inner += `<span class="nt-note">${fmt(c.note)}</span>`;
        h += `<td class="nt-${l.c}">${inner}</td>`;
      }
      h += '</tr>';
    }
    h += '</tbody>';
  }
  if(!nRows) h += `<tbody><tr><td class="nt-empty" colspan="${lvs.length + 1}">Aucune notion ne correspond. Essayez un autre mot ou affichez tous les domaines.</td></tr></tbody>`;
  return { html: h, nRows, nWords, nLv: lvs.length };
}
const countText = r => `${r.nRows} notion${r.nRows > 1 ? 's' : ''} · ${r.nLv} niveau${r.nLv > 1 ? 'x' : ''} · ${r.nWords} mots de vocabulaire`;

if(typeof module !== 'undefined' && module.exports){ module.exports = { LV, DOMS, ROWS, VUES, notionsTable, countText }; return; }

/* ---------- Page : filtres, recherche, bascule 4e/3e ---------- */
const $ = s => document.querySelector(s);
if(!$('#nt-table')) return;
const state = {dom:'all', vue:'all', q:'', nouveau:false, vonly:false};
try{ Object.assign(state, JSON.parse(localStorage.getItem('notions-cp-3e') || '{}'), {q:''}); }catch(e){}
const save = () => { try{ localStorage.setItem('notions-cp-3e', JSON.stringify({dom:state.dom, vue:state.vue, nouveau:state.nouveau, vonly:state.vonly})); }catch(e){} };

function chips(){
  const box = $('#nt-doms');
  box.innerHTML = [{k:'all', n:'Tous'}, ...DOMS].map(d => `<button type="button" class="nt-chip" data-d="${d.k}" aria-pressed="${state.dom === d.k}">${d.n}</button>`).join('');
}
function highlight(table, rx){
  for(const tb of table.tBodies){
    const w = document.createTreeWalker(tb, NodeFilter.SHOW_TEXT), nodes = [];
    while(w.nextNode()) nodes.push(w.currentNode);
    for(const n of nodes){
      const t = n.nodeValue; rx.lastIndex = 0; if(!rx.test(t)) continue;
      rx.lastIndex = 0; const frag = document.createDocumentFragment(); let last = 0, m;
      while((m = rx.exec(t))){ if(!m[0]) break; frag.append(t.slice(last, m.index)); const mk = document.createElement('mark'); mk.textContent = m[0]; frag.append(mk); last = m.index + m[0].length; }
      frag.append(t.slice(last)); n.replaceWith(frag);
    }
  }
}
function render(){
  document.body.classList.toggle('nt-vonly', state.vonly);
  $('#nt-old').setAttribute('aria-pressed', !state.nouveau);
  $('#nt-new').setAttribute('aria-pressed', state.nouveau);
  $('#nt-vonly').checked = state.vonly;
  $('#nt-vue').value = state.vue;
  chips();
  const r = notionsTable(state), t = $('#nt-table');
  t.innerHTML = r.html;
  const rx = qRegex(state.q); if(rx) highlight(t, rx);
  $('#nt-count').textContent = countText(r);
}
$('#nt-doms').onclick = e => { const b = e.target.closest('button'); if(!b) return; state.dom = b.dataset.d; save(); render(); };
$('#nt-vue').onchange = e => { state.vue = e.target.value; save(); render(); };
$('#nt-q').oninput = e => { state.q = e.target.value; render(); };
$('#nt-old').onclick = () => { state.nouveau = false; save(); render(); };
$('#nt-new').onclick = () => { state.nouveau = true; save(); render(); };
$('#nt-vonly').onchange = e => { state.vonly = e.target.checked; save(); render(); };
render();
})();
