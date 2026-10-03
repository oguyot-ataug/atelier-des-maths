/* ============================================================
   CHAPITRE : Le périmètre (CE2, M5, période 5)
   Programme du cycle 2 (CE2) : le périmètre d'une figure plane est la longueur de son contour ;
   comparer des périmètres sans règle graduée en reportant au compas les côtés sur une droite ;
   déterminer le périmètre d'un polygone en mesurant chaque côté. Carré et rectangle : aucune
   formule, mais on sait qu'il n'est pas nécessaire de mesurer tous les côtés.
   ============================================================ */
(() => {
cm1Chapitre({
  niveau: 'ce2', titre: 'Le périmètre', slug: 'perimetre',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce que le périmètre ?')}
${cm1Def('Le <b>périmètre</b> d\'une figure, c\'est la <b>longueur de son contour</b> : la longueur d\'une ficelle qui ferait exactement le tour de la figure.')}
${cm1AnimPerimetre('ce2-perim')}

${cm1Lecon(2, 'Comparer des périmètres avec un compas')}
${cm1Regle('Sans règle graduée, on <b>reporte</b> chaque côté au compas, <b>bout à bout</b>, sur une droite. On obtient un segment qui a <b>la même longueur que le périmètre</b>. On peut alors comparer deux périmètres en comparant les deux segments.')}
${ce2AnimReport('ce2-pe-report')}

${cm1Lecon(3, 'Calculer le périmètre d\'un polygone')}
${cm1Regle('On <b>mesure chaque côté</b> avec la règle graduée, puis on <b>additionne</b> toutes les longueurs.')}
${cm1Exemple('Un triangle a des côtés de 3 cm, 4 cm et 5 cm.')}
${cm1Redac('Périmètre du triangle', '3 cm + 4 cm + 5 cm = 12 cm', 'Le périmètre du triangle est 12 cm.')}
${cm1Astuce('Pour un <b>carré</b>, les 4 côtés ont la même longueur : il suffit d\'en mesurer <b>un seul</b>. Pour un <b>rectangle</b>, il suffit de mesurer la <b>longueur</b> et la <b>largeur</b>, car les côtés opposés sont égaux.')}
${cm1Exemple('Un rectangle de 6 cm sur 2 cm.')}
${cm1Redac('Périmètre du rectangle', ['6 cm + 2 cm + 6 cm + 2 cm', '16 cm'], 'Le périmètre du rectangle est 16 cm.')}
`,
  methode: `
${cm1Demo('ce2-pe-carre', 'Trouver le périmètre d\'un carré', 'Un carré a un côté de 7 cm. Quel est son périmètre ?')}
${cm1Demo('ce2-pe-jardin', 'Résoudre un problème de clôture', 'Un jardin rectangulaire mesure 25 m de long et 10 m de large. Quelle longueur de grillage faut-il pour en faire le tour ?')}
`,
  demos: [
    ['ce2-pe-carre', [
      { expr: 'Un carré a 4 côtés de même longueur.', note: 'Il suffit d\'en mesurer un.' },
      { expr: '7 + 7 + 7 + 7 = 28', note: 'On peut aussi calculer 4 × 7.' },
      { expr: 'Le périmètre du carré est 28 cm.', note: '' },
    ]],
    ['ce2-pe-jardin', [
      { expr: 'Faire le tour : c\'est le périmètre.', note: '' },
      { expr: '25 + 10 + 25 + 10 = 70', note: 'Deux longueurs et deux largeurs.' },
      { expr: 'Il faut 70 m de grillage.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-pe', [
    ['Un triangle a des côtés de 6 cm, 8 cm et 10 cm. Quel est son périmètre ?',
      cm1Redac('Périmètre du triangle', ['6 cm + 8 cm + 10 cm', '24 cm'], 'Le périmètre du triangle est 24 cm.')],
    ['Un carré a des côtés de 5 cm. Quel est son périmètre ?',
      cm1Redac('Périmètre du carré', ['5 cm + 5 cm + 5 cm + 5 cm', '20 cm'], 'Le périmètre du carré est 20 cm.')],
    ['Un rectangle mesure 9 cm de long et 4 cm de large. Quel est son périmètre ?',
      cm1Redac('Périmètre du rectangle', ['9 cm + 4 cm + 9 cm + 4 cm', '26 cm'], 'Le périmètre du rectangle est 26 cm.')],
    ['Un pentagone a 5 côtés de 3 cm. Quel est son périmètre ?',
      cm1Redac('Périmètre du pentagone', '5 × 3 cm = 15 cm', 'Le périmètre du pentagone est 15 cm.')],
    ['Faut-il mesurer les 4 côtés d\'un rectangle pour trouver son périmètre ? Pourquoi ?',
      cm1Redac('Mesures nécessaires', 'Les côtés opposés d\'un rectangle ont la même longueur.', 'Non : il suffit de mesurer la longueur et la largeur.')],
    ['Une table carrée a un périmètre de 4 m. Quelle est la longueur d\'un côté ?',
      cm1Redac('Côté de la table', '1 m + 1 m + 1 m + 1 m = 4 m', 'Les 4 côtés sont égaux : un côté mesure 1 m.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le mot « périmètre »', [
    'Le mot <b>périmètre</b> vient du grec : <i>péri</i> veut dire « autour » et <i>métron</i> « mesure ». C\'est donc « la mesure du tour ». On retrouve <i>péri</i> dans le mot <b>périphérique</b>, la route qui fait le tour d\'une ville.',
  ]),
  quiz: [
    { q: 'Le périmètre, c\'est…', opts: ['la longueur du contour', 'la surface intérieure', 'le nombre de côtés'], correct: 0 },
    { q: 'Le périmètre d\'un carré de 3 cm de côté est…', opts: ['9 cm', '12 cm', '6 cm'], correct: 1 },
    { q: 'Un rectangle de 5 cm sur 2 cm a pour périmètre…', opts: ['7 cm', '10 cm', '14 cm'], correct: 2 },
  ],
  flash: [
    { l: 3, q: 'Périmètre d\'un carré de 4 cm de côté ?', r: ['8 cm', '12 cm', '16 cm', '20 cm'], ok: 2 },
    { l: 3, q: 'Périmètre d\'un rectangle de 6 cm sur 3 cm ?', r: ['9 cm', '18 cm', '12 cm', '15 cm'], ok: 1 },
    { l: 3, q: 'Périmètre d\'un triangle de côtés 2 cm, 3 cm, 4 cm ?', r: ['7 cm', '9 cm', '24 cm', '10 cm'], ok: 1 },
    { l: 1, q: 'Le périmètre d\'une figure, c\'est…', r: ['son intérieur', 'la longueur de son contour', 'son plus grand côté', 'son nombre de sommets'], ok: 1 },
    { l: 2, q: 'Pour comparer des périmètres sans règle graduée, on utilise…', r: ['le compas', 'la balance', 'l\'équerre seule', 'le verre gradué'], ok: 0 },
    { l: 3, q: 'Un carré a un périmètre de 20 cm. Son côté mesure…', r: ['4 cm', '5 cm', '10 cm', '80 cm'], ok: 1 },
    { l: 1, q: "Pour poser une clôture autour d'un jardin, on a besoin…", r: ["du périmètre", "de l'aire", "du nombre de fleurs", "de la hauteur"], ok: 0 },
    { l: 2, q: "Avec le compas, on reporte…", r: ["les côtés bout à bout sur une droite", "un cercle", "les angles", "la couleur"], ok: 0 },
  ],
});
})();
