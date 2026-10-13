/* ============================================================
   3e · Planches : Nombres et calculs (N1)
   Relatifs, priorités et fractions ; ordres de grandeur et contrôle d'un résultat ; problèmes à étapes
   (pourcentages, proportions) ; vrai ou faux en justifiant ; Objectif Brevet.
   ============================================================ */
(() => {
const { B, R, F, T, ligne, rmp, ch, chx, auto, qs } = P3, Fr = plFrac();
// Illustrations des problèmes concrets.
const DS = P3.D, illu = P3.illu;
const murPorte = DS.fig(206, 104, DS.sol(30, 196, 80) + DS.mur(40, 80, 150, 60) + `<rect x="138" y="34" width="22" height="46" fill="#C98B5A" stroke="#1F3A5C" stroke-width="1.2"/><circle cx="155" cy="58" r="1.6" fill="#1F3A5C"/>`
  + DS.cote([40, 80], [190, 80], '6,5 m', -8, { dt: 7 }) + DS.cote([34, 80], [34, 20], '2,6 m', 0, { dt: 4, a: 'end' }) + DS.tx([149, 30], '0,9 m', { c: '#2E9C6A', fs: 10 }) + DS.tx([164, 60], '2 m', { c: '#2E9C6A', fs: 10, a: 'start' }), 180);
PLANCHES['3e|Nombres et calculs'] = [
  { titre: 'Calculer avec les relatifs et les fractions', duree: '35 min',
    attendus: ['Respecter les priorités opératoires', 'Calculer avec des nombres relatifs', 'Calculer avec des fractions et simplifier le résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['−7 + 12 = @', 5], ['−4 − 9 = @', '−13'], ['(−6) × (−8) = @', 48], ['(−45) : 9 = @', '−5'], ['3 − (−11) = @', 14]]) },
      { etoiles: 1, col: 1, consigne: 'Calcule en respectant les priorités.',
        ...rmp([['5 + 3 × 4 = @', 17], ['(5 + 3) × 4 = @', 32], ['20 − 12 : 4 = @', 17], ['2 × 3² = @', 18], ['−2 + 5 × (−3) = @', '−17']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule et donne le résultat sous forme irréductible.',
        eleve: plListe([ligne(F(2, 3), '+', F(1, 6), '=', Fr), ligne(F(3, 4), '−', F(5, 8), '=', Fr), ligne(F(4, 9), '×', F(3, 8), '=', Fr), ligne(F(5, 6), ':', F(10, 3), '=', Fr)]),
        corr: plListe([ligne(F(2, 3), '+', F(1, 6), '=', F(4, 6), '+', F(1, 6), '=', R(F(5, 6))), ligne(F(3, 4), '−', F(5, 8), '=', F(6, 8), '−', F(5, 8), '=', R(F(1, 8))), ligne(F(4, 9), '×', F(3, 8), '=', F(12, 72), '=', R(F(1, 6))), ligne(F(5, 6), ':', F(10, 3), '=', F(5, 6), '×', F(3, 10), '=', R(F(1, 4)))]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([['A = (−3)² − 4 × (−2) = @', 17], ['B = −3² + 1 = @', '−8'], ['C = (1 − 4) × (2 + 5) = @', '−21'], ['D = 7 − 3 × (2 − 6) = @', 19]]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec le nombre qui manque.',
        ...rmp([['−8 + @ = 3', 11], ['@ × (−5) = 35', '−7'], ['12 − @ = −4', 16], ['@ : (−3) = 6', '−18']]) },
      { etoiles: 2, col: 1, consigne: 'Sans calculer, entoure le signe du résultat.',
        ...ch([['(−2) × (−3) × (−5) :', 'négatif'], ['(−4) × 5 × (−6) × (−1) :', 'négatif'], ['(−7) × (−7) :', 'positif'], ['−3 × 0 × (−8) :', 'nul']], 'positif · négatif · nul') },
      { etoiles: 3, cahier: true, consigne: `Léo dépense ${T(1, 3)} de son argent de poche pour un livre, puis ${T(1, 4)} de ce qui lui reste pour une place de cinéma. Quelle fraction de son argent de poche lui reste-t-il ?`,
        corr: cm1Redac('Fraction restante', { suite: [`Après le livre, il reste 1 − ${F(1, 3)} = ${F(2, 3)}.`, `Le cinéma coûte ${F(1, 4)} × ${F(2, 3)} = ${F(2, 12)} = ${F(1, 6)} de l'argent de poche.`, `${F(2, 3)} − ${F(1, 6)} = ${F(4, 6)} − ${F(1, 6)} = ${F(3, 6)} = ${F(1, 2)}`] }, 'Il reste à Léo la moitié de son argent de poche.') },
    ] },
  { titre: 'Ordres de grandeur et contrôle d\'un résultat', duree: '35 min',
    attendus: ['Estimer un ordre de grandeur', 'Contrôler un résultat (signe, dernier chiffre, vraisemblance)', 'Utiliser la calculatrice avec des parenthèses'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'ordre de grandeur du résultat.',
        ...chx([['49,8 × 21 ≈', '1 000', '100 · 1 000 · 10 000'], ['3 980 : 41 ≈', '100', '10 · 100 · 1 000'], ['0,52 × 798 ≈', '400', '40 · 400 · 4 000'], ['61² ≈', '3 600', '360 · 3 600 · 36 000']]) },
      { etoiles: 1, col: 1, consigne: 'Sans poser l\'opération, entoure le résultat exact.',
        ...chx([['37 × 43 =', '1 591', '1 581 · 1 591 · 15 910'], ['2,5 × 0,4 =', '1', '0,1 · 1 · 10'], ['(−12) × 15 =', '−180', '180 · −180 · −27'], ['125 × 8 =', '1 000', '100 · 1 000 · 1 025']]) },
      { etoiles: 2, col: 1, consigne: 'À la calculatrice (attention aux parenthèses). Arrondis au centième si besoin.',
        ...rmp([['(12,5 + 7,3) : 4 = @', '4,95'], ['15 : (2 + 1,6) ≈ @', '4,17'], ['1 + 2 : 3 ≈ @', '1,67'], ['√(5,2² + 3,9²) = @', '6,5']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure (sans calculatrice).',
        ...ch([['Le produit de 23 nombres négatifs est négatif.', 'vrai'], ['0,9 × 45 est plus grand que 45.', 'faux'], ['1 : 0,5 = 2', 'vrai'], ['Le carré d\'un nombre est toujours plus grand que ce nombre.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Tom s\'est trompé. Écris le bon résultat.',
        ...rmp([['3 + 2 × 5 = 25 : le bon résultat est @', 13], ['−5² = 25 : le bon résultat est @', '−25'], ['(−2)³ = 6 : le bon résultat est @', '−8'], ['20 : 4 × 5 = 1 : le bon résultat est @', 25]]) },
      { etoiles: 2, col: 1, consigne: 'Ana achète 3 cahiers à 2,95 €, 2 classeurs à 6,10 € et une calculatrice à 18,90 €.',
        ...rmp([['Ordre de grandeur du prix total : environ @ €', 40], ['Prix exact : @ €', '39,95']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'La distance Terre-Lune est d\'environ 384 000 km. Un avion de ligne vole à 900 km/h. Combien de jours, environ, mettrait-il pour aller de la Terre à la Lune ?',
        corr: cm1Redac('Durée du voyage', { suite: ['384 000 : 900 ≈ 427 h', '427 : 24 ≈ 17,8'] }, 'Il faudrait environ 18 jours à l\'avion pour atteindre la Lune.') },
    ] },
  { titre: 'Résoudre un problème à étapes', duree: '40 min',
    attendus: ['Organiser une démarche en plusieurs étapes', 'Calculer avec des pourcentages et des proportions', 'Rédiger une réponse par une phrase'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['20 % de 150 = @', 30], ['15 % de 80 = @', 12], ['5 % de 360 = @', 18], ['150 % de 40 = @', 60]]) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['80 € augmentés de 10 % : @ €', 88], ['60 € diminués de 25 % : @ €', 45], ['Augmenter de 20 %, c\'est multiplier par @', '1,2'], ['Diminuer de 30 %, c\'est multiplier par @', '0,7']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([[`Dans un collège de 640 élèves, ${T(3, 8)} sont demi-pensionnaires, soit @ élèves.`, 240], ['Inès réussit 18 questions sur 25, soit @ % de réussite.', 72], ['Un sirop se prépare avec 2 volumes de sirop pour 7 volumes d\'eau. Pour 63 cL d\'eau, il faut @ cL de sirop.', 18]]) },
      { etoiles: 2, col: 1, consigne: 'Quel paquet de riz est le plus avantageux ? A : 1,5 kg à 4,20 € ; B : 2 kg à 5,40 € ; C : 750 g à 2,10 €.',
        ...rmp([['Prix d\'un kg dans A : @ €', '2,80'], ['Prix d\'un kg dans B : @ €', '2,70'], ['Prix d\'un kg dans C : @ €', '2,80'], ['Le plus avantageux : @', 'B']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un forfait téléphonique coûte 12 € par mois, plus 0,05 € par SMS au-delà de 200 SMS. En mars, Sam envoie 340 SMS. Combien paie-t-il ?',
        corr: cm1Redac('Prix payé en mars', { suite: ['340 − 200 = 140 SMS en plus', '140 × 0,05 = 7', '12 + 7 = 19'] }, 'Sam paie 19 € en mars.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un manteau à 120 € est soldé à −30 %, puis on applique une remise de 10 % sur le prix soldé. A-t-on payé 40 % de moins ?',
        corr: cm1Redac('Prix payé', { suite: ['120 × 0,7 = 84', '84 × 0,9 = 75,6', '120 × 0,6 = 72 (prix avec 40 % de remise)'] }, 'On paie 75,60 € et non 72 € : ce n\'est pas une remise de 40 % (seulement 37 %).') },
      { etoiles: 3, cahier: true, consigne: illu(murPorte, 'Un mur rectangulaire mesure 6,5 m sur 2,6 m ; il a une porte de 0,9 m sur 2 m. On le peint en deux couches. Un pot de peinture couvre 10 m² et coûte 23,90 €. Combien de pots faut-il acheter, et pour quel prix ?'),
        corr: cm1Redac('Surface à peindre', { suite: ['6,5 × 2,6 = 16,9 m² (mur)', '0,9 × 2 = 1,8 m² (porte)', '16,9 − 1,8 = 15,1 m²', '15,1 × 2 = 30,2 m² pour deux couches'] }, '')
          + cm1Redac('Pots et prix', { suite: ['30,2 : 10 = 3,02 : 3 pots ne suffisent pas.', '4 × 23,90 = 95,6'] }, 'Il faut acheter 4 pots, pour 95,60 €.') },
    ] },
  { titre: 'Vrai ou faux : justifier', duree: '35 min',
    attendus: ['Prouver qu\'une affirmation est fausse avec un contre-exemple', 'Prouver qu\'une affirmation est vraie par un calcul ou un raisonnement', 'Rédiger une justification'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure un contre-exemple qui prouve que l\'affirmation est fausse.',
        ...chx([['« Le double d\'un nombre est toujours plus grand que lui. »', '−2', '5 · 0,5 · −2'], ['« La somme de deux nombres premiers est paire. »', '2 et 7', '3 et 5 · 2 et 7 · 11 et 13'], ['« Un nombre divisible par 2 et par 4 est divisible par 8. »', '12', '16 · 12 · 24'], ['« Le carré d\'un nombre est plus grand que ce nombre. »', '0,5', '3 · 0,5 · 10']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([[`${T(2, 3)} de ${T(3, 4)}, c'est ${T(1, 2)}.`, 'vrai'], ['10 % de 50 = 50 % de 10', 'vrai'], ['La moyenne de 8, 12 et 16 est 12.', 'vrai'], ['Baisser un prix de 50 %, puis l\'augmenter de 50 %, redonne le prix de départ.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Programme : choisir un nombre ; ajouter 3 ; multiplier par 2 ; soustraire 6.',
        ...rmp([['Avec 5, on obtient @', 10], ['Avec −4, on obtient @', '−8'], ['Avec 0,5, on obtient @', 1], ['On obtient toujours @ du nombre choisi.', 'le double']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: '« Le produit de deux nombres entiers consécutifs est toujours pair. » Vrai ou faux ? Justifie.',
        corr: cm1Redac('Justification', 'Exemples : 7 × 8 = 56 ; 12 × 13 = 156.', 'Vrai : de deux entiers consécutifs, l\'un est pair, donc leur produit est pair.') },
      { etoiles: 2, col: 1, cahier: true, consigne: '« Augmenter un prix de 20 %, puis le baisser de 20 %, redonne le prix de départ. » Vrai ou faux ? Justifie.',
        corr: cm1Redac('Contre-exemple', { suite: ['100 × 1,2 = 120', '120 × 0,8 = 96'] }, 'Faux : un article à 100 € coûte 96 € à la fin, pas 100 €.') },
      { etoiles: 2, col: 1, cahier: true, consigne: '« La somme de trois nombres entiers consécutifs est toujours un multiple de 3. » Vrai ou faux ? Justifie.',
        corr: cm1Redac('Preuve', { suite: ['Trois entiers consécutifs : n − 1, n et n + 1.', '(n − 1) + n + (n + 1) = 3n'] }, 'Vrai : la somme est égale à 3n, c\'est un multiple de 3.') },
      { etoiles: 3, col: 1, cahier: true, consigne: '« La différence des carrés de deux entiers consécutifs est égale à leur somme. » Vérifie avec 7 et 8, puis prouve-le.',
        corr: cm1Redac('Vérification', '8² − 7² = 64 − 49 = 15 et 7 + 8 = 15', '') + cm1Redac('Preuve', { suite: ['(n + 1)² − n² = n² + 2n + 1 − n² = 2n + 1', 'n + (n + 1) = 2n + 1'] }, 'Vrai : les deux expressions sont égales à 2n + 1.') },
    ] },
  { titre: 'Nombres et calculs', duree: '45 min', brevet: true,
    attendus: ['Automatismes : calculer vite et sans calculatrice', 'Résoudre un problème concret à plusieurs étapes', 'Justifier qu\'une affirmation est vraie ou fausse'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Le tiers de 27 :', 9], ['25 % de 60 :', 15], ['7 − 3 × 2 =', 1], ['Ordre de grandeur de 398 × 51 :', '20 000', ['2 000', '20 000', '200 000']], [`1 − ${T(2, 5)} =`, T(3, 5), [T(1, 5), T(3, 5), T(1, 3)]], ['Un article à 40 € baisse de 10 %. Nouveau prix (en €) :', 36], ['Écriture décimale de ' + T(3, 8) + ' :', '0,375']]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Un collège organise une sortie dans un parc d\'attractions pour 52 élèves et 6 accompagnateurs. Le car coûte 780 €. L\'entrée coûte 24 € par élève ; les accompagnateurs entrent gratuitement. Le foyer du collège prend en charge 25 % du coût total ; le reste est partagé à égalité entre les élèves.'
          + qs(['Calculer le coût total de la sortie.', 'Quel montant le foyer prend-il en charge ?', 'Combien chaque élève paie-t-il ?', 'Le principal affirme : « Chaque famille paiera moins de 30 €. » A-t-il raison ?']),
        corr: cm1Redac('Coût total', '780 + 52 × 24 = 780 + 1 248 = 2 028', 'La sortie coûte 2 028 €.') + cm1Redac('Part du foyer', '0,25 × 2 028 = 507', 'Le foyer paie 507 €.')
          + cm1Redac('Part de chaque élève', { suite: ['2 028 − 507 = 1 521', '1 521 : 52 = 29,25'] }, 'Chaque élève paie 29,25 €.') + cm1Redac('Affirmation du principal', '29,25 < 30', 'Il a raison : chaque famille paie moins de 30 €.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Pour chaque affirmation, dire si elle est vraie ou fausse. Toute réponse doit être justifiée.'
          + qs([`Affirmation 1 : « ${T(3, 4)} − ${T(1, 4)} × 2 = ${T(1, 4)} ».`, 'Affirmation 2 : « Deux augmentations successives de 10 % reviennent à une augmentation de 20 %. »', 'Affirmation 3 : « La moitié du quart d\'un nombre est égale au huitième de ce nombre. »']),
        corr: cm1Redac('Affirmation 1', `${F(3, 4)} − ${F(1, 4)} × 2 = ${F(3, 4)} − ${F(2, 4)} = ${F(1, 4)}`, 'Vraie (la multiplication est prioritaire).')
          + cm1Redac('Affirmation 2', '1,1 × 1,1 = 1,21', 'Fausse : cela revient à une augmentation de 21 %.')
          + cm1Redac('Affirmation 3', `${F(1, 2)} × ${F(1, 4)} = ${F(1, 8)}`, 'Vraie.') },
    ] },
];
})();
