/* ============================================================
   CM2 · Planches : Algèbre (N12)
   Le signe = et les égalités à trous ; utiliser des lettres ; problèmes algébriques ;
   suites évolutives ; programmes de calcul.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
// Motifs de jetons en forme de L : rang n → 2n − 1 jetons.
const motif = (n, x0) => { let g = ''; for(let i = 0; i < n; i++) g += `<circle cx="${x0 + 8}" cy="${50 - i * 14}" r="6" fill="#FDE3C8" stroke="#1F3A5C" stroke-width="1.2"/>`;
  for(let i = 1; i < n; i++) g += `<circle cx="${x0 + 8 + i * 14}" cy="50" r="6" fill="#FDE3C8" stroke="#1F3A5C" stroke-width="1.2"/>`; return g; };
const suite = DS.fig(170, 70, motif(1, 4) + motif(2, 30) + motif(3, 76) + DS.tx([12, 68], '1') + DS.tx([45, 68], '2') + DS.tx([98, 68], '3'), 170);
PLANCHES['cm2|Algèbre'] = [
  { titre: 'Le signe = et les égalités à trous', duree: '30 min',
    attendus: ['Comprendre le signe = comme une égalité entre deux écritures', 'Compléter une égalité à trous', 'Vérifier une égalité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['25 + @ = 40', 15], ['@ × 6 = 42', 7], ['36 = 4 × @', 9], ['100 − @ = 64', 36]]) },
      { etoiles: 2, col: 1, consigne: 'Complète pour que l\'égalité soit vraie.',
        ...rmp([['8 + 7 = @ + 10', 5], ['20 + 15 = 30 + @', 5], ['6 × 4 = 3 × @', 8], ['50 − 12 = @ − 10', 48]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['3 + 5 = 8 + 2', 'faux'], ['12 + 8 = 10 + 10', 'vrai'], ['4 × 5 = 2 × 10', 'vrai'], ['30 : 3 = 30 − 3', 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Un élève écrit : 6 + 4 = 10 + 5 = 15. Pourquoi est-ce faux ? Écris correctement le calcul de 6 + 4 + 5.',
        corr: cm1Redac('Erreur', '6 + 4 = 10 mais 6 + 4 n\'est pas égal à 15.', 'Le signe = doit relier deux écritures du même nombre.') + cm1Redac('Écriture correcte', { suite: ['6 + 4 = 10', '10 + 5 = 15'] }, 'Donc 6 + 4 + 5 = 15.') },
    ] },
  { titre: 'Utiliser des lettres', duree: '30 min',
    attendus: ['Calculer une expression quand on connaît la valeur de la lettre', 'Traduire une phrase avec une lettre', 'Résoudre un problème algébrique'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On choisit n = 6. Calcule.',
        ...rmp([['n + 4 = @', 10], ['3 × n = @', 18], ['n × n = @', 36], ['20 − n = @', 14]]) },
      { etoiles: 2, col: 1, consigne: 'Un carré a pour côté c. Entoure la formule de son périmètre.',
        ...chx([['Périmètre du carré :', '4 × c', 'c + 4 · 4 × c · c × c']]) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre caché.',
        ...rmp([['a + 12 = 30, donc a = @', 18], ['5 × b = 45, donc b = @', 9], ['m − 7 = 13, donc m = @', 20]]) },
      { etoiles: 3, cahier: true, consigne: 'Un cahier et un stylo coûtent ensemble 5 €. Le cahier coûte 3 € de plus que le stylo. Combien coûte le stylo ? et le cahier ?',
        corr: cm1Redac('Sans les 3 € d\'écart', '5 − 3 = 2', 'Il reste 2 € pour deux prix égaux.') + cm1Redac('Prix du stylo', '2 : 2 = 1', 'Le stylo coûte 1 €.') + cm1Redac('Prix du cahier', '1 + 3 = 4', 'Le cahier coûte 4 €.') },
    ] },
  { titre: 'Suites et programmes de calcul', duree: '35 min',
    attendus: ['Continuer une suite et trouver sa règle', 'Prévoir un terme éloigné', 'Exécuter un programme de calcul et le remonter'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Continue chaque suite.',
        ...rmp([['3 ; 7 ; 11 ; 15 ; @ ; @', 19, 23], ['2 ; 4 ; 8 ; 16 ; @ ; @', 32, 64], ['100 ; 95 ; 90 ; @ ; @', 85, 80]]) },
      { etoiles: 2, col: 1, consigne: 'Programme : « Choisis un nombre, multiplie-le par 3, puis ajoute 5. »',
        ...rmp([['Avec 4, on obtient @', 17], ['Avec 10, on obtient @', 35], ['Avec 0, on obtient @', 5]]) },
      { etoiles: 2, cahier: true, consigne: illu(suite, 'Voici les trois premiers motifs. Combien de jetons faut-il pour le motif 4 ? pour le motif 10 ?'),
        corr: cm1Redac('Régularité', { suite: ['motif 1 : 1 jeton', 'motif 2 : 3 jetons', 'motif 3 : 5 jetons'] }, 'On ajoute 2 jetons à chaque motif : le motif 4 a 7 jetons.') + cm1Redac('Motif 10', '10 + 9 = 19', 'Le motif 10 a 10 jetons en hauteur et 9 de plus en bas : 19 jetons.') },
      { etoiles: 3, cahier: true, consigne: 'Avec le même programme (multiplier par 3, puis ajouter 5), Inès obtient 26. Quel nombre a-t-elle choisi ?',
        corr: cm1Redac('On remonte le programme', { suite: ['26 − 5 = 21', '21 : 3 = 7'] }, 'Inès a choisi 7.') },
    ] },
];
})();
