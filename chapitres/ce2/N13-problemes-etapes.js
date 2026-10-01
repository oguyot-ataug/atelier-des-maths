/* ============================================================
   CHAPITRE : Problèmes en plusieurs étapes (CE2, N13, période 5)
   Programme du cycle 2 (CE2) : problèmes mixtes en deux ou trois étapes (additions, soustractions,
   multiplications : « 4 tables de 6 et 7 tables de 4 ») ; démarche en quatre phases (comprendre,
   modéliser, calculer, répondre) et regard critique sur le résultat ; soustraction posée de
   montants en euros (au plus tard en période 4). Structures complexes : nombres plus petits.
   ============================================================ */
(() => {
const etape = (n, titre, texte, c) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:6px 0;"><span style="flex:none;width:30px;height:30px;border-radius:50%;background:${c};color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;">${n}</span><div><b>${titre}</b> — ${texte}</div></div>`;
cm1Chapitre({
  niveau: 'ce2', titre: 'Problèmes en plusieurs étapes', slug: 'problemes-etapes',
  cours: `
${cm1Lecon(1, 'Les quatre étapes pour résoudre un problème')}
<div class="def-box">
${etape(1, 'Comprendre', 'je raconte l\'histoire avec mes mots ; je repère la question.', '#2EA8C9')}
${etape(2, 'Modéliser', 'je fais un schéma ; je choisis les opérations (parfois plusieurs).', '#7A4FC0')}
${etape(3, 'Calculer', 'de tête quand c\'est possible, sinon en posant l\'opération.', '#E35D3A')}
${etape(4, 'Répondre', 'j\'écris une phrase, et je vérifie que le résultat est possible.', '#2E9C6A')}
</div>
${cm1Astuce('Le mot « plus » dans l\'énoncé ne veut pas forcément dire « addition » ! On réfléchit à l\'histoire, pas seulement aux mots.')}

${cm1Lecon(2, 'Un problème en deux ou trois étapes')}
${cm1Exemple('Dans un restaurant, il y a 4 tables de 6 personnes et 7 tables de 4 personnes. Combien de clients le restaurant peut-il recevoir ?', ['1<sup>re</sup> étape : 4 × 6 = 24 places', '2<sup>e</sup> étape : 7 × 4 = 28 places', '3<sup>e</sup> étape : 24 + 28 = 52', 'Le restaurant peut recevoir <b>52 clients</b>.'])}
${cm1Rem('Pour ne pas se perdre, on écrit <b>ce que l\'on cherche</b> à chaque étape (« nombre de places des grandes tables »…).')}

${cm1Lecon(3, 'Soustraire des prix')}
${cm1Regle('On pose la soustraction en <b>alignant les virgules</b>. Un prix « rond » s\'écrit avec deux zéros après la virgule : 20 € = 20,00 €. On calcule comme pour les nombres entiers, puis on place la virgule.')}
<div class="figure-wrap">${cm1Posee([[' ', '20,00'], ['−', '7,35'], [' ', '12,65']])}<p class="hint" style="margin:4px 0 0;">On vérifie : 12,65 € + 7,35 € = 20 € ✔</p></div>

${cm1Lecon(4, 'Vérifier son résultat')}
${cm1Regle('À la fin, on se demande : « <b>Est-ce possible ?</b> » Un prix rendu ne peut pas être plus grand que ce qu\'on a donné ; une partie ne peut pas être plus grande que le tout.', 'Bon réflexe')}
`,
  methode: `
${cm1Demo('ce2-pet-courses', 'Un problème de courses en trois étapes', 'Inès achète 3 cahiers à 2 € et un stylo à 4,50 €. Elle paie avec un billet de 20 €. Combien lui rend-on ?')}
`,
  demos: [
    ['ce2-pet-courses', [
      { expr: 'Prix des cahiers : 3 × 2 = 6 €', note: '1<sup>re</sup> étape.' },
      { expr: 'Prix total : 6 + 4,50 = 10,50 €', note: '2<sup>e</sup> étape.' },
      { expr: cm1Posee([[' ', '20,00'], ['−', '10,50'], [' ', '9,50']]), note: '3<sup>e</sup> étape : la monnaie rendue.' },
      { expr: 'On rend 9,50 € à Inès.', note: 'C\'est moins que 20 € : c\'est possible ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-pet', [
    ['Pose et calcule : 15,80 € − 6,45 €.', '9,35 €.'],
    ['Pose et calcule : 50 € − 23,75 €.', '26,25 €.'],
    ['Un car a 48 places. 3 classes de 25 élèves partent en sortie. Combien faut-il de cars ? Combien de places vides ?', '75 élèves : 2 cars (96 places) ; 96 − 75 = 21 places vides.'],
    ['Tom a 35 €. Il achète 2 livres à 9 € et un jeu à 12 €. Combien lui reste-t-il ?', '2 × 9 = 18 ; 18 + 12 = 30 ; 35 − 30 = 5 €.'],
    ['Un fermier a 6 rangées de 8 salades. Il en vend 15. Combien lui en reste-t-il ?', '6 × 8 = 48 ; 48 − 15 = 33 salades.'],
    ['Une boîte de 12 œufs coûte 3 €. Combien coûtent 60 œufs ?', '60 œufs = 5 boîtes ; 5 × 3 = 15 €.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les problèmes du papyrus Rhind', [
    'Le plus ancien recueil de problèmes connu est un rouleau égyptien, le <b>papyrus Rhind</b>, écrit il y a environ <b>3 600 ans</b>. Il contient 87 problèmes : partager des pains, calculer la quantité de grain dans un grenier… Le scribe <b>Ahmès</b> qui l\'a recopié y explique pas à pas comment les résoudre.',
  ]),
  quiz: [
    { q: '3 tables de 4 et 2 tables de 6 : combien de places ?', opts: ['15', '24', '20'], correct: 1 },
    { q: '10 € − 3,20 € = …', opts: ['7,20 €', '6,80 €', '7,80 €'], correct: 1 },
    { q: 'Après avoir calculé, on vérifie…', opts: ['que le résultat est possible', 'que le nombre est pair', 'rien'], correct: 0 },
  ],
  flash: [
    { q: '2 paquets de 5 gâteaux et 3 gâteaux seuls : combien de gâteaux ?', r: ['10', '13', '15', '30'], ok: 1 },
    { q: '20 € − 7,50 € = …', r: ['12,50 €', '13,50 €', '12,05 €', '27,50 €'], ok: 0 },
    { q: '4 tables de 6 et 2 tables de 4 : combien de places ?', r: ['16', '24', '32', '48'], ok: 2 },
    { q: 'J\'ai 30 €. J\'achète 2 livres à 8 €. Il me reste…', r: ['14 €', '22 €', '16 €', '20 €'], ok: 0 },
    { q: 'Quelle étape vient juste après « Comprendre » ?', r: ['Répondre', 'Modéliser', 'Calculer', 'Vérifier'], ok: 1 },
    { q: '5 € − 1,25 € = …', r: ['3,75 €', '4,25 €', '3,25 €', '4,75 €'], ok: 0 },
  ],
});
})();
