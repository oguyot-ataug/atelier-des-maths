/* ============================================================
   3e · Outils communs aux planches (Manuel 3e et Objectif Brevet)
   Demandé : « On peut attaquer les planches de 3e ? Avec des exercices type Objectif Brevet en plus !
   En se basant sur les derniers sujets du brevet. »
   Brevet depuis la session 2026 : partie 1 « automatismes » (20 min, sans calculatrice, 6 points, seule
   la réponse compte) puis partie 2 « raisonnement et résolution de problèmes » (1 h 40, calculatrice,
   14 points, réponses justifiées). Chaque chapitre de 3e se termine par une planche Objectif Brevet :
   un exercice d'automatismes ({ auto: true }) et des problèmes rédigés dans le cahier, avec leur barème
   ({ pts }), écrits à la manière des sujets récents (contexte concret, questions enchaînées).
   ============================================================ */
const P3 = {
  B: n => plPointilles(n || 3),
  R: v => plRep(String(v)),
  F: cm1Frac,
  T: (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`),
  // Une ligne de calcul qui ne se coupe pas.
  ligne: (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`,
  // Réponses à écrire : [['texte avec @', réponse], …] (@ = pointillés dans l'énoncé, réponse dans le corrigé).
  rmp: (l, n) => ({ eleve: plListe(l.map(([t]) => t.split('@').join(P3.B(n || 3)))), corr: plListe(l.map(([t, ...r]) => { let i = 0; return t.replace(/@/g, () => P3.R(r[i++])); })) }),
  // Choix à entourer : [['question', 'bonne réponse'], …], m = les choix proposés (« a · b · c »).
  ch: (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }),
  // Choix différents pour chaque question : [['question', 'bonne réponse', 'a · b · c'], …].
  chx: it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }),
  // Automatismes du brevet : questions courtes, réponse à écrire ou à entourer parmi des choix.
  // [['question', réponse, ['choix1', 'choix2', …]?], …]
  auto: it => ({
    eleve: plListe(it.map(([q, , c]) => c ? `${q} <b>${c.join(' · ')}</b>` : `${q} ${P3.B(4)}`)),
    corr: plListe(it.map(([q, r, c]) => c ? `${q} ${plEntoure(r)}` : `${q} ${P3.R(r)}`)) }),
  // Questions enchaînées d'un problème de brevet (numérotées comme au brevet) ; une question peut
  // avoir des sous-questions : ['texte', ['a)…', 'b)…']].
  qs: items => `<ol class="pl-bq">${items.map(x => Array.isArray(x) ? `<li>${x[0]}<ol>${x[1].map(y => `<li>${y}</li>`).join('')}</ol></li>` : `<li>${x}</li>`).join('')}</ol>`,
  // Figure SVG simple.
  svg: (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`,
  K: '#1F3A5C', Ro: '#E35D3A', Bl: '#2EA8C9', Ve: '#2E9C6A', Vi: '#7A4FC0', Or: '#E9A21C',
  L: (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || '#1F3A5C'}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`,
  Tx: (p, t, c, fs, a) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || '#1F3A5C', a }),
  // Tableau de valeurs (en-têtes en première colonne) : lignes = [['x', 1, 2], ['f(x)', '@', 5]] ; @ = case à compléter.
  tab: (lignes, corr, reps) => { let k = 0; return `<table class="pl-tab3" style="border-collapse:collapse;margin:4px auto;">${lignes.map(l => `<tr>${l.map((c, j) => `<td style="border:1.5px solid #1F3A5C;padding:3px 9px;text-align:center;min-width:34px;${j === 0 ? 'background:#EEF4FB;font-weight:700;' : ''}">${c === '@' ? (corr ? P3.R(reps[k++]) : P3.B(3)) : c}</td>`).join('')}</tr>`).join('')}</table>`; },
};
