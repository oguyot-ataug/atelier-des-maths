/* ============================================================
   6e · Planches : Fractions, nombres et partage (N2)
   ============================================================ */
/* Réorganisation (31/10/2026) -- « vérifie la cohérence des thèmes des exercices dans tous les chapitres » : chaque exercice dans
   la planche de son thème (« quelle fraction est coloriée ? » en planche 1, la droite graduée en planche 4, les égalités de
   fractions en planche 3) ; deux doublons retirés (« encadre 17/5 » et un second « complète les égalités »).
   Relecture bêta du 07/11/2026 : autres versions et fiche de répétition pour « le quotient de 7 par 4 » (P3-E1, générateur gen). */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac(), C = plCase();
const T = (a, b) => cm1Tex(`\\dfrac{${a}}{${b}}`);
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:3px;">${h}<span>${t}</span></span>`;
const FIGS = [[cm1Disque(6, 5, { taille: 70 }), 5, 6], [cm1Bande(4, 3, { largeur: 120 }), 3, 4], [cm1Quad(4, 3, [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1]], { k: 16, c: '#FF8208' }), 7, 12]];
PLANCHES['6e|Fractions : nombres et partage'] = [
  // Lire et colorier des fractions de figures (demandé : « Reconnaître les parts coloriées et remplir
  // les parts… Il faut ce genre d'exercices en nombre. ») -- figures de fractions-figures.js.
  { titre: 'Lire une fraction sur une figure', duree: '35 min',
    attendus: ['Écrire la fraction d\'une figure qui est coloriée', 'Vérifier que les parts sont égales', 'Lire une fraction quand les parts ne sont pas toutes égales'],
    exos: [
      { etoiles: 1, consigne: 'Indique quelle fraction de chaque figure représente la partie coloriée.',
        ...FRF.lire([[{ forme: 'rect', l: 2, c: 2 }, [0]], [{ forme: 'rect', l: 2, c: 2 }, [2, 3]], [{ forme: 'rect', l: 1, c: 3 }, [1]], [{ forme: 'hexagone' }, [1, 3]], [{ forme: 'hexagone' }, [0, 1, 2]], [{ forme: 'hexagone' }, [0, 1, 3, 4]]], { coul: '#9ED3DA' }) },
      { etoiles: 1, consigne: 'Indique quelle fraction de chaque disque représente la partie coloriée.',
        ...FRF.lire([[{ forme: 'disque', n: 2 }, [0]], [{ forme: 'disque', n: 4 }, [0, 1]], [{ forme: 'disque', n: 5 }, [0, 2, 3]], [{ forme: 'disque', n: 6 }, [0, 1, 2, 4]], [{ forme: 'disque', n: 8 }, [0, 2, 4, 6]], [{ forme: 'disque', n: 12 }, [0, 1, 2, 3, 5, 7, 9]]], { coul: '#F8C9A8' }) },
      { etoiles: 2, consigne: 'Les parts de ces carrés ne sont pas toutes égales ! Compare chaque part au carré entier, puis indique quelle fraction du carré est coloriée.',
        ...FRF.lire([
          [{ forme: 'pieces', p: [[0, 0, 1, .5], [0, .5, .5, .5], [.5, .5, .5, .5]] }, [1]],
          [{ forme: 'pieces', p: [[0, 0, .5, 1], [.5, 0, .5, .5], [.5, .5, .25, .5], [.75, .5, .25, .5]] }, [2]],
          [{ forme: 'pieces', p: [[0, 0, .25, 1], [.25, 0, .75, .5], [.25, .5, .75, .5]] }, [1]],
          [{ forme: 'pieces', p: [[0, 0, 1 / 3, 1], [1 / 3, 0, 1 / 3, 1], [2 / 3, 0, 1 / 3, .5], [2 / 3, .5, 1 / 3, .5]] }, [0, 3]],
          [{ forme: 'pieces', p: [[0, 0, .5, .5], [.5, 0, .5, .5], [0, .5, .5, .5], [.5, .5, .25, .25], [.75, .5, .25, .25], [.5, .75, .25, .25], [.75, .75, .25, .25]] }, [0, 3]],
          [{ forme: 'pieces', p: [[0, 0, .5, .5], [.5, 0, .25, .25], [.75, 0, .25, .25], [.5, .25, .25, .25], [.75, .25, .25, .25], [0, .5, 1, .5]] }, [0, 1, 4]],
        ], { coul: '#CDE8C4' }) },
      { etoiles: 2, consigne: 'Écris la fraction coloriée, puis simplifie-la le plus possible.',
        eleve: plGrille([[{ forme: 'rect', l: 3, c: 4 }, [0, 1, 2, 4, 5, 6]], [{ forme: 'disque', n: 8 }, [0, 1, 2, 3, 4, 5]], [{ forme: 'triangle', k: 3 }, [0, 1, 3]], [{ forme: 'carre8' }, [0, 1, 4, 5]]].map(([f, c]) => ligne(FRF.svg(f, c, { px: 70, coul: '#C9B6E8' }), Fr, '=', Fr)), 2),
        corr: plGrille([[{ forme: 'rect', l: 3, c: 4 }, [0, 1, 2, 4, 5, 6], 6, 12, 1, 2], [{ forme: 'disque', n: 8 }, [0, 1, 2, 3, 4, 5], 6, 8, 3, 4], [{ forme: 'triangle', k: 3 }, [0, 1, 3], 3, 9, 1, 3], [{ forme: 'carre8' }, [0, 1, 4, 5], 4, 8, 1, 2]].map(([f, c, a, b, x, y]) => ligne(FRF.svg(f, c, { px: 70, coul: '#C9B6E8' }), R(F(a, b)), '=', R(F(x, y)))), 2) },
      { etoiles: 1, consigne: 'Quelle fraction de chaque figure est coloriée ?',
        eleve: plGrille(FIGS.map(([f]) => col(f, Fr)), 3), corr: plGrille(FIGS.map(([f, a, b]) => col(f, R(F(a, b)))), 3) },
    ] },
  { titre: 'Colorier une fraction d\'une figure', duree: '35 min',
    attendus: ['Colorier une fraction donnée d\'une figure partagée en parts égales', 'Utiliser des fractions égales pour colorier', 'Expliquer un coloriage'],
    exos: [
      { etoiles: 1, consigne: 'Colorie la fraction du disque qui est indiquée.',
        ...FRF.colorier([[{ forme: 'disque', n: 2 }, 1, 2], [{ forme: 'disque', n: 4 }, 1, 4], [{ forme: 'disque', n: 5 }, 4, 5], [{ forme: 'disque', n: 6 }, 5, 6], [{ forme: 'disque', n: 10 }, 7, 10], [{ forme: 'disque', n: 12 }, 11, 12]]) },
      { etoiles: 1, consigne: 'Colorie la fraction du rectangle qui est indiquée.',
        ...FRF.colorier([[{ forme: 'rect', l: 4, c: 2 }, 1, 8], [{ forme: 'rect', l: 4, c: 2 }, 5, 8], [{ forme: 'rect', l: 4, c: 5 }, 11, 20], [{ forme: 'rect', l: 4, c: 5 }, 13, 20], [{ forme: 'rect', l: 4, c: 3 }, 5, 12], [{ forme: 'rect', l: 4, c: 3 }, 7, 12]], { coul: '#9ED3DA' }) },
      { etoiles: 2, consigne: 'Colorie la fraction de la figure qui est indiquée.',
        ...FRF.colorier([[{ forme: 'hexagone' }, 5, 6], [{ forme: 'triangle', k: 2 }, 3, 4], [{ forme: 'triangle', k: 3 }, 4, 9], [{ forme: 'carre4' }, 3, 4], [{ forme: 'carre8' }, 5, 8], [{ forme: 'triangle', k: 4 }, 7, 16]], { coul: '#CDE8C4' }) },
      { etoiles: 3, consigne: 'Attention : le nombre de parts n\'est pas le dénominateur ! Colorie la fraction indiquée (cherche une fraction égale).',
        ...FRF.colorier([[{ forme: 'disque', n: 4 }, 1, 2], [{ forme: 'disque', n: 6 }, 2, 3], [{ forme: 'disque', n: 8 }, 3, 4], [{ forme: 'disque', n: 10 }, 4, 5], [{ forme: 'disque', n: 12 }, 1, 3], [{ forme: 'disque', n: 12 }, 5, 6]], { coul: '#F8C9A8' }) },
    ] },
  { titre: 'Quotient et égalités de fractions', duree: '40 min',
    attendus: ['Utiliser une fraction pour exprimer un partage, un quotient', 'Repérer une fraction sur une demi-droite graduée', 'Reconnaître et produire des fractions égales, simplifier'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Le quotient de 7 par 4 est le nombre ${T(7, 4)} : c'est le nombre qui, multiplié par 4, donne 7. Complète.`,
        eleve: plListe([ligne('4 ×', Fr, '= 7'), ligne('5 ×', Fr, '= 2'), ligne('3 ×', Fr, '= 10')]),
        corr: plListe([ligne('4 ×', R(F(7, 4)), '= 7'), ligne('5 ×', R(F(2, 5)), '= 2'), ligne('3 ×', R(F(10, 3)), '= 10')]),
        // Autres versions et fiche de répétition (relecture bêta 6e-N2-P3-E1 du 07/11/2026, « Ajouter autre version », « Ajouter
        // fiche de répétition ») : trois quotients b × … = a, fraction a/b déjà simplifiée et non entière (comme 7/4, 2/5, 10/3 :
        // la réponse attendue est unique), jamais 7 et 4.
        gen: alea => {
          const L = [], pgcd = (x, y) => y ? pgcd(y, x % y) : x;
          while(L.length < 3){ const b = 2 + Math.floor(alea() * 8), a = 1 + Math.floor(alea() * 12);
            if(pgcd(a, b) !== 1 || (a === 7 && b === 4) || L.some(([x, y]) => x === a || y === b)) continue; L.push([a, b]); }
          return { eleve: plListe(L.map(([a, b]) => ligne(b + ' ×', Fr, '= ' + a))), corr: plListe(L.map(([a, b]) => ligne(b + ' ×', R(F(a, b)), '= ' + a))) };
        } },
      { etoiles: 2, col: 1, consigne: 'Complète les égalités.',
        eleve: plListe([ligne(F(2, 3), '=', Fr, '(dénominateur 12)'), ligne(F(15, 20), '=', Fr, '(numérateur 3)'), ligne(F(7, 5), '=', Fr, '(numérateur 21)'), ligne('1 =', Fr, '(dénominateur 9)')]),
        corr: plListe([ligne(F(2, 3), '=', R(F(8, 12))), ligne(F(15, 20), '=', R(F(3, 4))), ligne(F(7, 5), '=', R(F(21, 15))), ligne('1 =', R(F(9, 9)))]) },
      { etoiles: 2, col: 1, consigne: 'Simplifie le plus possible.',
        eleve: plListe([ligne(F(12, 18), '=', Fr), ligne(F(25, 100), '=', Fr), ligne(F(14, 21), '=', Fr), ligne(F(30, 45), '=', Fr)]),
        corr: plListe([ligne(F(12, 18), '=', R(F(2, 3))), ligne(F(25, 100), '=', R(F(1, 4))), ligne(F(14, 21), '=', R(F(2, 3))), ligne(F(30, 45), '=', R(F(2, 3)))]) },
      { etoiles: 2, col: 1, consigne: `Entoure les fractions égales à ${T(2, 3)}.`,
        eleve: plGrille([[4, 6], [6, 9], [3, 4], [10, 15], [8, 12], [5, 6]].map(([a, b]) => F(a, b)), 3),
        corr: plGrille([[4, 6], [6, 9], [3, 4], [10, 15], [8, 12], [5, 6]].map(([a, b]) => a * 3 === b * 2 ? plEntoure(F(a, b)) : F(a, b)), 3) },
      { etoiles: 3, cahier: true, consigne: `Léa affirme : « ${T(3, 4)} = ${T(6, 8)} = ${T(9, 12)} ». A-t-elle raison ? Justifie.`,
        corr: cm1Redac('Fractions égales', { suite: [`${F(3, 4)} = ${F('3 × 2', '4 × 2')} = ${F(6, 8)}`, `${F(3, 4)} = ${F('3 × 3', '4 × 3')} = ${F(9, 12)}`] }, 'Léa a raison : on multiplie le numérateur et le dénominateur par le même nombre.') },
    ] },
  { titre: 'Fractions sur une demi-droite graduée', duree: '35 min',
    attendus: ['Repérer une fraction sur une demi-droite graduée', 'Décomposer une fraction en un entier plus une fraction inférieure à 1', 'Encadrer une fraction entre deux entiers consécutifs'],
    exos: [
      { etoiles: 1, consigne: 'L\'unité est partagée en 3. Quelle fraction repère chaque point ?',
        ...(() => { const g = cm1Graduation(3, 3, [[2 / 3, 'A', '#E35D3A'], [4 / 3, 'B', '#2EA8C9'], [7 / 3, 'C', '#2E9C6A']], { unite: 150 });
          return { eleve: g + plGrille(['A : ' + Fr, 'B : ' + Fr, 'C : ' + Fr], 3), corr: g + plGrille(['A : ' + R(F(2, 3)), 'B : ' + R(F(4, 3)), 'C : ' + R(F(7, 3))], 3) }; })() },
      { etoiles: 1, consigne: 'L\'unité est partagée en 5. Quelle fraction repère chaque point ?',
        ...(() => { const g = cm1Graduation(3, 5, [[3 / 5, 'D', '#E35D3A'], [6 / 5, 'E', '#2EA8C9'], [12 / 5, 'F', '#2E9C6A']], { unite: 150 });
          return { eleve: g + plGrille(['D : ' + Fr, 'E : ' + Fr, 'F : ' + Fr], 3), corr: g + plGrille(['D : ' + R(F(3, 5)), 'E : ' + R(F(6, 5)), 'F : ' + R(F(12, 5))], 3) }; })() },
      { etoiles: 2, consigne: 'L\'unité est partagée en 4. Quelle fraction repère chaque point ?',
        eleve: cm1Graduation(3, 4, [[0.75, 'A', '#E35D3A'], [1.5, 'B', '#2EA8C9'], [2.25, 'C', '#2E9C6A']], { unite: 150 }) + plGrille(['A : ' + Fr, 'B : ' + Fr, 'C : ' + Fr], 3),
        corr: cm1Graduation(3, 4, [[0.75, 'A', '#E35D3A'], [1.5, 'B', '#2EA8C9'], [2.25, 'C', '#2E9C6A']], { unite: 150 }) + plGrille(['A : ' + R(F(3, 4)), 'B : ' + R(F(6, 4)), 'C : ' + R(F(9, 4))], 3) },
      { etoiles: 2, col: 1, consigne: 'Décompose chaque fraction en un nombre entier plus une fraction plus petite que 1.',
        eleve: plListe([ligne(F(7, 3), '=', B(1), '+', Fr), ligne(F(11, 4), '=', B(1), '+', Fr), ligne(F(9, 5), '=', B(1), '+', Fr), ligne(F(17, 6), '=', B(1), '+', Fr)]),
        corr: plListe([ligne(F(7, 3), '=', R(2), '+', R(F(1, 3))), ligne(F(11, 4), '=', R(2), '+', R(F(3, 4))), ligne(F(9, 5), '=', R(1), '+', R(F(4, 5))), ligne(F(17, 6), '=', R(2), '+', R(F(5, 6)))]) },
      { etoiles: 2, col: 1, consigne: 'Encadre chaque fraction entre deux nombres entiers consécutifs.',
        eleve: plListe([ligne(B(1), '&lt;', F(13, 4), '&lt;', B(1)), ligne(B(1), '&lt;', F(22, 5), '&lt;', B(1)), ligne(B(1), '&lt;', F(9, 2), '&lt;', B(1)), ligne(B(1), '&lt;', F(30, 7), '&lt;', B(1))]),
        corr: plListe([ligne(R(3), '&lt;', F(13, 4), '&lt;', R(4)), ligne(R(4), '&lt;', F(22, 5), '&lt;', R(5)), ligne(R(4), '&lt;', F(9, 2), '&lt;', R(5)), ligne(R(4), '&lt;', F(30, 7), '&lt;', R(5))]) },
      // « … 1 » à compléter par <, > ou = ; à l'écran, la case bascule au clic (relecture 6e-N2-P4-E6).
      { etoiles: 2, col: 1, consigne: 'Compare chaque fraction à 1 : complète avec &lt;, &gt; ou =.',
        eleve: plListe([ligne(F(7, 8), plCase(), '1'), ligne(F(9, 8), plCase(), '1'), ligne(F(12, 12), plCase(), '1')]),
        corr: plListe([ligne(F(7, 8), R('&lt;'), '1', '<small>(7 &lt; 8)</small>'), ligne(F(9, 8), R('&gt;'), '1', '<small>(9 &gt; 8)</small>'), ligne(F(12, 12), R('='), '1')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Trace une demi-droite graduée (l'unité mesure 6 côtés de carreau) et place-y les nombres ${T(1, 2)}, ${T(5, 3)}, ${T(7, 6)} et 2.`,
        corr: cm1Redac('Placement des nombres sur la demi-droite', { suite: ['L\'unité mesure 6 côtés de carreau : un sixième mesure 1 côté de carreau.', `${F(1, 2)} = ${F(3, 6)} : à 3 côtés de carreau de l'origine.`, `${F(7, 6)} : à 7 côtés de carreau.`, `${F(5, 3)} = ${F(10, 6)} : à 10 côtés de carreau.`, `2 = ${F(12, 6)} : à 12 côtés de carreau.`] }, 'On compte les côtés de carreau depuis l\'origine pour placer chaque point.',
          // Le tracé sur papier quadrillé (relecture 6e-N2-P4-E7).
          (() => { const k = 14, x0 = k, y = 3 * k, w = 14 * k, h = 5 * k; let g = '';
            for(let i = 0; i <= 14; i++) g += `<line x1="${i * k}" y1="0" x2="${i * k}" y2="${h}" stroke="#D5E3EF" stroke-width="1"/>`;
            for(let j = 0; j <= 5; j++) g += `<line x1="0" y1="${j * k}" x2="${w}" y2="${j * k}" stroke="#D5E3EF" stroke-width="1"/>`;
            g += `<line x1="${x0}" y1="${y}" x2="${w - 4}" y2="${y}" stroke="#1F3A5C" stroke-width="1.8"/><polygon points="${w - 2},${y} ${w - 9},${y - 4} ${w - 9},${y + 4}" fill="#1F3A5C"/>`;
            [[0, '0'], [6, '1'], [12, '2']].forEach(([c, t]) => { g += `<line x1="${x0 + c * k}" y1="${y - 5}" x2="${x0 + c * k}" y2="${y + 5}" stroke="#1F3A5C" stroke-width="1.6"/>` + cmT(x0 + c * k, y + 17, t, { fs: 11 }); });
            const fe = (c, a, b) => `<path d="M${x0 + c * k - 4},${y - 4} L${x0 + c * k + 4},${y + 4} M${x0 + c * k - 4},${y + 4} L${x0 + c * k + 4},${y - 4}" stroke="#E35D3A" stroke-width="1.8"/>`
              + cmT(x0 + c * k, y - 25, a, { fs: 10, c: '#E35D3A' }) + `<line x1="${x0 + c * k - 6}" y1="${y - 21}" x2="${x0 + c * k + 6}" y2="${y - 21}" stroke="#E35D3A" stroke-width="1.2"/>` + cmT(x0 + c * k, y - 11, b, { fs: 10, c: '#E35D3A' });
            g += fe(3, 1, 2) + fe(7, 7, 6) + fe(10, 5, 3);
            return `<span class="cm-fig-d"><svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${w}px;max-width:100%;">${g}</svg></span>`; })()) },
    ] },
  { titre: 'Fractions décimales et quotients', duree: '35 min',
    attendus: ['Passer d\'une fraction décimale à un nombre décimal, et inversement', 'Reconnaître des fractions égales', 'Utiliser le quotient pour résoudre a × … = b'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris chaque nombre sous forme décimale.',
        eleve: plListe([ligne(F(3, 10), '=', B()), ligne(F(25, 100), '=', B()), ligne(F(7, 100), '=', B()), ligne(F(1, 2), '=', B()), ligne(F(3, 4), '=', B())]),
        corr: plListe([ligne(F(3, 10), '=', R('0,3')), ligne(F(25, 100), '=', R('0,25')), ligne(F(7, 100), '=', R('0,07')), ligne(F(1, 2), '=', R('0,5')), ligne(F(3, 4), '=', R('0,75'))]) },
      { etoiles: 1, col: 1, consigne: 'Écris chaque nombre sous forme d\'une fraction décimale.',
        eleve: plListe([ligne('0,7 =', Fr), ligne('1,23 =', Fr), ligne('0,05 =', Fr), ligne('2,9 =', Fr)]),
        corr: plListe([ligne('0,7 =', R(F(7, 10))), ligne('1,23 =', R(F(123, 100))), ligne('0,05 =', R(F(5, 100))), ligne('2,9 =', R(F(29, 10)))]) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre manquant (écris-le sous forme décimale).',
        eleve: plListe(['6 × ' + B() + ' = 15', '4 × ' + B() + ' = 3', '8 × ' + B() + ' = 2', '5 × ' + B() + ' = 7']),
        corr: plListe(['6 × ' + R('2,5') + ' = 15', '4 × ' + R('0,75') + ' = 3', '8 × ' + R('0,25') + ' = 2', '5 × ' + R('1,4') + ' = 7']) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Lucas affirme que ${T(3, 4)}, 0,75 et 75 % désignent le même nombre. A-t-il raison ? Justifie.`,
        corr: cm1Redac('Justification', { suite: [`${F(3, 4)} = ${F('3 × 25', '4 × 25')} = ${F(75, 100)}`, `${F(75, 100)} = 0,75 et ${F(75, 100)} = 75 %`] }, 'Lucas a raison : ce sont trois écritures du même nombre.') },
    ] },
  { titre: 'Fraction d\'une quantité et partages', duree: '35 min',
    attendus: ['Calculer une fraction d\'une quantité', 'Utiliser une fraction pour exprimer un partage équitable', 'Résoudre un problème avec une fraction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe([ligne(F(1, 4), 'de 20 =', B()), ligne(F(3, 4), 'de 20 =', B()), ligne(F(2, 5), 'de 35 =', B()), ligne(F(5, 6), 'de 42 =', B())]),
        corr: plListe([ligne(F(1, 4), 'de 20 =', R(5)), ligne(F(3, 4), 'de 20 = 3 × 5 =', R(15)), ligne(F(2, 5), 'de 35 = 2 × 7 =', R(14)), ligne(F(5, 6), 'de 42 = 5 × 7 =', R(35))]) },
      { etoiles: 1, col: 1, consigne: 'Complète. Rappel : 1 h = 60 min et 1 m = 100 cm.',
        eleve: plListe([ligne(F(1, 2), 'h =', B(), 'min'), ligne(F(3, 4), 'h =', B(), 'min'), ligne(F(2, 3), 'h =', B(), 'min'), ligne(F(1, 10), 'm =', B(), 'cm')]),
        corr: plListe([ligne(F(1, 2), 'h =', R(30), 'min'), ligne(F(3, 4), 'h =', R(45), 'min'), ligne(F(2, 3), 'h =', R(40), 'min'), ligne(F(1, 10), 'm =', R(10), 'cm')]) },
      { etoiles: 2, col: 1, consigne: 'Complète chaque partage équitable par une fraction.',
        eleve: plListe([ligne('3 pizzas pour 4 enfants : chacun a', Fr, 'de pizza.'), ligne('5 tablettes pour 2 enfants : chacun a', Fr, 'tablette.'), ligne('7 m de ruban en 3 morceaux égaux : chacun mesure', Fr, 'm.')]),
        corr: plListe([ligne('3 pizzas pour 4 enfants : chacun a', R(F(3, 4)), 'de pizza.'), ligne('5 tablettes pour 2 enfants : chacun a', R(F(5, 2)), 'tablette.'), ligne('7 m de ruban en 3 morceaux égaux : chacun mesure', R(F(7, 3)), 'm.')]) },
      // Compléter avec <, > ou = (demandé le 01/11/2026 : « Dans ce genre d'exercices, compléter par <, > =. ») ; à l'écran, la
      // case passe de < à >, puis = à chaque clic.
      { etoiles: 2, uneLigne: true, consigne: 'Complète avec &lt;, &gt; ou =.',
        ...(() => { const it = [[`${F(1, 3)} de 90`, `${F(3, 10)} de 90`, '>', '(30 et 27)'], [`${F(3, 4)} de 60`, `${F(4, 5)} de 60`, '<', '(45 et 48)'], [`${F(1, 2)} de 50`, `${F(2, 4)} de 50`, '=', '(25 et 25)']];
          return { eleve: plListe(it.map(([a, b]) => `<span style="white-space:nowrap;display:inline-block;padding:4px 0;">${a} ${plCase()} ${b}</span>`)),
            corr: plListe(it.map(([a, b, r, x]) => `<span style="white-space:nowrap;display:inline-block;padding:4px 0;">${a} ${plRep(r === '<' ? '&lt;' : r === '>' ? '&gt;' : r)} ${b}</span> <small>${x}</small>`)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Dans un sac de 36 billes, il y a des rouges, des bleues et des vertes.',
        eleve: plListe([ligne(F(2, 9), 'des billes sont rouges :', B(), 'billes rouges.'), ligne(F(1, 4), 'des billes sont bleues :', B(), 'billes bleues.'), ligne('Les autres sont vertes :', B(), 'billes vertes.')]),
        corr: plListe([ligne(F(2, 9), 'des billes sont rouges :', R(8), 'billes rouges.'), ligne(F(1, 4), 'des billes sont bleues :', R(9), 'billes bleues.'), ligne('Les autres sont vertes : 36 − 8 − 9 =', R(19), 'billes vertes.')]) },
      { etoiles: 3, cahier: true, consigne: `Tom a lu ${T(2, 5)} d'un livre de 240 pages. Combien de pages a-t-il lues ? Combien lui en reste-t-il ?`,
        // Calcul écrit avec la fraction (relecture 6e-N2-P6-E6).
        corr: cm1Redac('Pages lues', { suite: [`${F(1, 5)} × 240 = ${F(240, 5)} = 48`, `${F(2, 5)} × 240 = ${F('2 \\times 240', 5)} = ${F(480, 5)} = 96`] }, 'Tom a lu 96 pages.') + cm1Redac('Pages restantes', '240 − 96 = 144', 'Il lui reste 144 pages à lire.') },
    ] },
  { titre: 'Proportions et pourcentages', duree: '40 min',
    attendus: ['Exprimer une proportion par une fraction', 'Passer d\'une fraction à un pourcentage', 'Calculer un pourcentage simple d\'une quantité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en pourcentage.',
        eleve: plListe([`${F(1, 2)} = ${B()} %`, `${F(1, 4)} = ${B()} %`, `${F(3, 4)} = ${B()} %`, `${F(1, 10)} = ${B()} %`, `${F(3, 5)} = ${B()} %`]),
        corr: plListe([`${F(1, 2)} = ${R(50)} %`, `${F(1, 4)} = ${R(25)} %`, `${F(3, 4)} = ${R(75)} %`, `${F(1, 10)} = ${R(10)} %`, `${F(3, 5)} = ${R(60)} %`]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe(['50 % de 60 = ' + B(), '10 % de 250 = ' + B(), '25 % de 80 = ' + B(), '75 % de 40 = ' + B(), '20 % de 35 = ' + B()]),
        corr: plListe(['50 % de 60 = ' + R(30), '10 % de 250 = ' + R(25), '25 % de 80 = ' + R(20), '75 % de 40 = ' + R(30), '20 % de 35 = ' + R(7)]) },
      { etoiles: 2, consigne: 'Quelle proportion de chaque figure est coloriée ? Donne la fraction, puis le pourcentage.',
        eleve: plGrille([[cm1Disque(4, 1, { taille: 66 })], [cm1Bande(10, 3, { largeur: 150 })], [cm1Bande(5, 2, { largeur: 130 })]].map(([f]) => col(f, `${Fr} = ${B()} %`)), 3),
        corr: plGrille([[cm1Disque(4, 1, { taille: 66 }), 1, 4, 25], [cm1Bande(10, 3, { largeur: 150 }), 3, 10, 30], [cm1Bande(5, 2, { largeur: 130 }), 2, 5, 40]].map(([f, a, b, p]) => col(f, `${R(F(a, b))} = ${R(p)} %`)), 3) },
      { etoiles: 2, col: 1, consigne: 'Dans une classe de 24 élèves, 9 sont des filles.',
        eleve: plListe([ligne('Proportion de filles :', Fr), ligne('Fraction simplifiée :', Fr), ligne('Proportion de garçons :', Fr)]),
        corr: plListe([ligne('Proportion de filles :', R(F(9, 24))), ligne('Fraction simplifiée :', R(F(3, 8))), ligne('Proportion de garçons :', R(F(15, 24)))]) },
      { etoiles: 2, col: 1, consigne: 'Compare les proportions. Entoure.',
        eleve: plListe(['Sac A : 3 boules vertes sur 12 ; sac B : 5 vertes sur 20. Même proportion de vertes ? <b>oui · non</b>', 'Club A : 6 filles sur 10 ; club B : 13 filles sur 25. Plus grande proportion de filles : <b>A · B</b>']),
        corr: plListe(['Sac A : 3 boules vertes sur 12 ; sac B : 5 vertes sur 20. Même proportion de vertes ? ' + plEntoure('oui') + ` (${F(1, 4)} dans les deux cas)`, 'Club A : 6 filles sur 10 ; club B : 13 filles sur 25. Plus grande proportion de filles : ' + plEntoure('A') + ' (60 % contre 52 %)']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un pull coûte 40 €. Pendant les soldes, son prix baisse de 25 %. Quel est son nouveau prix ?',
        // 25 % = 25/100, calcul déroulé en colonne derrière une lettre, jamais une ligne qui commence par « = » (relecture 6e-N2-P7-E6).
        corr: cm1Redac('Montant de la réduction', { nom: 'R', lignes: [`${F(25, 100)} × 40`, F('25 \\times 40', 100), F(1000, 100), '10'] }, 'La réduction est de 10 €.') + cm1Redac('Nouveau prix', '40 € − 10 € = 30 €', 'Le pull coûte 30 € pendant les soldes.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans un collège de 600 élèves, 45 % sont demi-pensionnaires. Combien d\'élèves sont demi-pensionnaires ?',
        // 45 % = 45/100, lettre devant le calcul déroulé en colonne (relecture 6e-N2-P7-E7).
        corr: cm1Redac('Nombre de demi-pensionnaires', { nom: 'N', lignes: [`${F(45, 100)} × 600`, `45 × ${F(600, 100)}`, '45 × 6', '270'] }, '270 élèves sont demi-pensionnaires.') },
    ] },
];
})();
