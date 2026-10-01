/* ============================================================
   CHAPITRE : Probabilités (CM1, D2, période 3)
   Programme du cycle 3 (CM1) : vocabulaire pour exprimer la possibilité qu'un événement se
   produise : impossible, possible, certain, probable, peu probable, « une chance sur deux ».
   Situations familières (pièce, dé, sac de billes, roue). Aucun calcul de probabilité sous forme
   de fraction n'est exigé en CM1 ; on compare les chances. Atelier : tirer des billes dans un
   sac, beaucoup de fois, pour voir que « probable » ne veut pas dire « certain ».
   ============================================================ */
(() => {
const COUL = { R: ['#E35D3A', 'rouge'], B: ['#2EA8C9', 'bleue'], V: ['#2E9C6A', 'verte'] };
const SACS = [{ nom: 'Sac 1', billes: 'RRRRRRRB' }, { nom: 'Sac 2', billes: 'RRRRBBBB' }, { nom: 'Sac 3', billes: 'BBBBBBBB' }];
function sacSVG(billes, taille){
  const t = taille || 120; let s = `<svg viewBox="0 0 120 120" style="width:${t}px;display:inline-block;vertical-align:middle;"><path d="M20 38 Q60 20 100 38 L108 104 Q60 118 12 104 Z" fill="#F3E3C3" stroke="#8A6A2E" stroke-width="2"/>`;
  billes.split('').forEach((c, i) => { s += `<circle cx="${32 + (i % 4) * 19}" cy="${58 + Math.floor(i / 4) * 22}" r="8" fill="${COUL[c][0]}" stroke="#1F3A5C" stroke-width="1"/>`; });
  return s + '</svg>';
}
let pr = { sac: 0, tirages: [] };
function prAfficher(){
  const el = document.getElementById('pr-zone'); if(!el) return;
  const sac = SACS[pr.sac], cpt = {}; pr.tirages.forEach(c => cpt[c] = (cpt[c] || 0) + 1);
  const n = pr.tirages.length, der = pr.tirages.slice(-30);
  el.innerHTML = `<div style="display:flex;gap:20px;align-items:center;justify-content:center;flex-wrap:wrap;">${sacSVG(sac.billes, 130)}
    <div style="text-align:left;"><div><b>${n}</b> tirage(s) (on remet la bille dans le sac à chaque fois)</div>
    ${Object.keys(COUL).filter(c => sac.billes.includes(c)).map(c => `<div style="display:flex;align-items:center;gap:8px;margin:4px 0;"><span style="width:14px;height:14px;border-radius:50%;background:${COUL[c][0]};display:inline-block;"></span>${COUL[c][1]} : <b>${cpt[c] || 0}</b>
      <span style="display:inline-block;height:12px;border-radius:3px;background:${COUL[c][0]};width:${n ? Math.round(160 * (cpt[c] || 0) / n) : 0}px;"></span></div>`).join('')}</div></div>
    <div style="margin-top:10px;min-height:22px;">${der.map(c => `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${COUL[c][0]};margin:1px;"></span>`).join('')}</div>`;
  document.querySelectorAll('.pr-sac').forEach((b, i) => b.classList.toggle('secondary', i !== pr.sac));
}
window.cm1PrSac = i => { pr = { sac: i, tirages: [] }; prAfficher(); };
window.cm1PrReset = () => cm1PrSac(pr.sac);
window.cm1PrTirer = k => { const b = SACS[pr.sac].billes; for(let i = 0; i < k; i++) pr.tirages.push(b[Math.floor(Math.random() * b.length)]); prAfficher(); };
const ECHELLE = `<div style="display:flex;align-items:stretch;gap:0;flex-wrap:wrap;justify-content:center;margin:8px 0;font-family:'Space Grotesk',sans-serif;font-size:.9rem;text-align:center;">
${[['impossible', '#8A2E1C'], ['peu probable', '#E35D3A'], ['une chance sur deux', '#B8962E'], ['probable', '#2EA8C9'], ['certain', '#2E9C6A']].map(([t, c]) => `<div style="flex:1;min-width:100px;padding:10px 6px;background:${c};color:#fff;font-weight:700;">${t}</div>`).join('')}</div>
<div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--ink-soft);"><span>← ne peut jamais arriver</span><span>arrive à coup sûr →</span></div>`;
cm1Chapitre({
  titre: 'Probabilités', slug: 'probabilites',
  cours: `
${cm1Lecon(1, 'Le hasard')}
${cm1Def('Une expérience est <b>due au hasard</b> quand on ne peut pas savoir à l\'avance ce qui va se passer, même si on connaît tous les résultats possibles. Exemples : lancer une pièce, lancer un dé, tirer une bille dans un sac sans regarder.')}
${cm1Exemple('Quand on lance un dé à 6 faces :', ['les résultats possibles sont 1, 2, 3, 4, 5 et 6 ;', 'on ne peut pas savoir lequel va sortir.'])}

${cm1Lecon(2, 'Le vocabulaire des chances')}
${ECHELLE}
${cm1Def(`<ul style="margin:0;padding-left:18px;line-height:1.9;">
<li><b>Impossible</b> : cela ne peut pas arriver. <i>Obtenir 7 avec un dé à 6 faces.</i></li>
<li><b>Certain</b> : cela arrive à coup sûr. <i>Obtenir un nombre plus petit que 10 avec un dé.</i></li>
<li><b>Possible</b> : cela peut arriver (ou pas). <i>Obtenir 4 avec un dé.</i></li>
<li><b>Probable</b> : cela a beaucoup de chances d'arriver. <i>Obtenir un nombre plus grand que 1 avec un dé.</i></li>
<li><b>Peu probable</b> : cela a peu de chances d'arriver. <i>Obtenir 6 avec un dé.</i></li>
<li><b>Une chance sur deux</b> : autant de chances que cela arrive ou non. <i>Obtenir « pile » en lançant une pièce.</i></li></ul>`, 'Vocabulaire')}

${cm1Lecon(3, 'Comparer les chances')}
${cmAnimTirages('cm1-pr-tirages', { presets: [{ nom: '9 vertes, 1 rouge', billes: [['verte', 9, '#2E9C6A'], ['rouge', 1, '#E35D3A']], n: 40 }, { nom: '5 rouges, 5 bleues', billes: [['rouge', 5, '#E35D3A'], ['bleue', 5, '#2EA8C9']], n: 40, fin: 'Autant de rouges que de bleues dans le sac : chaque couleur a une chance sur deux, et elles sortent à peu près aussi souvent.' }] })}
<div class="figure-wrap" style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;">${SACS.map(s => `<div style="text-align:center;">${sacSVG(s.billes, 110)}<div class="hint" style="margin:0;">${s.nom}</div></div>`).join('')}</div>
${cm1Exemple('On tire une bille sans regarder :', ['Sac 1 (7 rouges, 1 bleue) : tirer une rouge est <b>probable</b> ; tirer une bleue est <b>peu probable</b>.', 'Sac 2 (4 rouges, 4 bleues) : on a <b>une chance sur deux</b> de tirer une rouge.', 'Sac 3 (8 bleues) : tirer une bleue est <b>certain</b> ; tirer une rouge est <b>impossible</b>.'])}
${cm1Astuce('« Probable » ne veut pas dire « certain » : avec le sac 1, on peut quand même tirer la bille bleue ! Essaie dans l\'atelier de l\'onglet Méthode.')}
`,
  methode: `
${cm1Demo('pr-de', 'Utiliser le bon mot', 'On lance un dé à 6 faces. « Obtenir un nombre pair » : impossible, peu probable, une chance sur deux, probable ou certain ?')}
${cm1Sous('A', 'Atelier : tirer des billes dans un sac')}
<div class="figure-wrap" style="text-align:center;"><div class="figure-toolbar" style="margin-bottom:10px;">${SACS.map((s, i) => `<button class="btn pr-sac ${i ? 'secondary' : ''}" onclick="cm1PrSac(${i})">${s.nom}</button>`).join('')}</div>
<div id="pr-zone"></div><div class="figure-toolbar" style="margin-top:10px;"><button class="btn" onclick="cm1PrTirer(1)">Tirer 1 bille</button><button class="btn" onclick="cm1PrTirer(10)">Tirer 10 billes</button><button class="btn" onclick="cm1PrTirer(100)">Tirer 100 billes</button><button class="btn secondary" onclick="cm1PrReset()">Recommencer</button></div></div>
`,
  demos: [
    ['pr-de', [
      { expr: 'Résultats possibles : 1, 2, 3, 4, 5, 6', note: 'On écrit d\'abord tous les résultats possibles.' },
      { expr: 'Nombres pairs : 2, 4, 6', note: 'On repère ceux qui réalisent l\'événement.' },
      { expr: '3 résultats sur 6 : la moitié', note: 'Il y a autant de résultats pairs (2, 4, 6) que de résultats impairs (1, 3, 5).' },
      { expr: 'Une chance sur deux', note: 'Obtenir un nombre pair a une chance sur deux d\'arriver.' },
    ]],
  ],
  exos: cm1Exos('pr', [
    [`On lance un dé à 6 faces. Pour chaque événement, choisis : impossible, possible ou certain.${cm1Liste(['obtenir 5', 'obtenir 0', 'obtenir un nombre entre 1 et 6'])}`,
      cm1Redac('Obtenir 5', '5 est sur une des faces.', 'C\'est possible.') + cm1Redac('Obtenir 0', 'Aucune face ne porte 0.', 'C\'est impossible.') + cm1Redac('Obtenir un nombre entre 1 et 6', 'Toutes les faces portent un nombre entre 1 et 6.', 'C\'est certain.')],
    ['Dans un sac, il y a 9 billes vertes et 1 bille rouge. Tirer une bille verte est-il probable ou peu probable ? Et une rouge ?',
      cm1Redac('Bille verte', '9 billes sur 10 sont vertes.', 'Tirer une bille verte est probable.') + cm1Redac('Bille rouge', '1 bille sur 10 est rouge.', 'Tirer la bille rouge est peu probable, mais possible.')],
    ['On lance une pièce de monnaie. Quelle est la chance d\'obtenir « face » ?',
      cm1Redac('Chance d\'obtenir face', 'Deux côtés : pile et face, qui ont autant de chances de sortir.', 'On a une chance sur deux d\'obtenir « face ».')],
    ['Invente un sac de billes dans lequel tirer une bille bleue est impossible.',
      cm1Redac('Un sac possible', 'Aucune bille bleue dans le sac.', 'Par exemple, un sac qui ne contient que des billes rouges et vertes.')],
    ['Invente un sac de 10 billes dans lequel on a une chance sur deux de tirer une bille rouge.',
      cm1Redac('Un sac possible', '5 + 5 = 10', 'Par exemple, 5 billes rouges et 5 billes d\'autres couleurs.')],
    ['Une roue est partagée en 8 parts égales : 6 jaunes et 2 bleues. Sur quelle couleur la flèche a-t-elle le plus de chances de s\'arrêter ?',
      cm1Redac('Comparer les chances', '6 parts jaunes contre 2 parts bleues', 'La flèche a plus de chances de s\'arrêter sur le jaune : c\'est probable, le bleu est peu probable.')],
    ['Tom dit : « J\'ai tiré 3 fois une bille rouge, la prochaine sera sûrement bleue. » A-t-il raison ?',
      cm1Redac('Réponse', 'Chaque tirage dépend du hasard ; le sac ne se souvient pas des tirages précédents.', 'Non : Tom n\'a pas raison.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Pascal, Fermat et les jeux de dés', [
    'En 1654, un joueur, le <b>chevalier de Méré</b>, pose une question à <b>Blaise Pascal</b> : comment partager équitablement l\'argent d\'une partie de dés interrompue avant la fin ?',
    'Pascal échange des lettres avec un autre mathématicien, <b>Pierre de Fermat</b>. Ensemble, ils inventent une façon de mesurer les chances : c\'est la naissance du <b>calcul des probabilités</b>.',
    'Aujourd\'hui, les probabilités servent partout : prévisions météo (« 70 % de risque de pluie »), médecine, jeux, assurances…',
  ]),
  quiz: [
    { q: 'Obtenir 8 avec un dé à 6 faces, c\'est…', opts: ['possible', 'impossible', 'certain'], correct: 1 },
    { q: 'Obtenir « pile » avec une pièce, c\'est…', opts: ['certain', 'une chance sur deux', 'peu probable'], correct: 1 },
    { q: 'Dans un sac de 9 billes rouges et 1 bleue, tirer une rouge est…', opts: ['probable', 'peu probable', 'impossible'], correct: 0 },
  ],
  init: () => prAfficher(),
});
})();
