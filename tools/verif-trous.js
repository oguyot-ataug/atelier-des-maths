// Vérifie qu'aucun exercice de planche ne reste seul en demi-largeur (un trou à sa droite dans le Manuel) -- demandé le
// 30/10/2026 : « Je ne veux jamais voir ça dans aucun niveau. Soit tu combles le trou par un exercice supplémentaire, soit tu
// rajoutes des colonnes avec d'autres exemples dans l'exercice de gauche afin de combler le trou à droite. »
// Usage : NODE_PATH=/opt/node22/lib/node_modules node tools/verif-trous.js   (Playwright et Chromium préinstallés)
// Simule la grille du Manuel (deux colonnes, remplissage « dense ») : { col: 1 } = demi-largeur.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const root = path.resolve(__dirname, '..');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route('**/*', r => { const u = new URL(r.request().url());
    if(u.hostname === 'site.local'){ const f = path.join(root, u.pathname.endsWith('/') ? u.pathname + 'index.html' : u.pathname); return fs.existsSync(f) ? r.fulfill({ path: f }) : r.fulfill({ status: 404 }); }
    return r.abort(); });
  await p.goto('http://site.local/'); await p.waitForTimeout(3000);
  const trous = await p.evaluate(() => { const out = [];
    for(const lvl of Object.keys(CHAPITRES_BY_LEVEL)) for(const c of CHAPITRES_BY_LEVEL[lvl]){ let L; try{ L = plDe(lvl, c.t); }catch(e){ continue; } if(!L) continue;
      L.forEach((pl, i) => { const rangs = [];
        pl.exos.forEach((x, k) => { if(x.col !== 1){ rangs.push([k, k]); return; } const r = rangs.find(r => r[1] === null); if(r) r[1] = k; else rangs.push([k, null]); });
        rangs.forEach(r => { if(r[1] === null) out.push(`${plRef(lvl, plCode(lvl, c), i)}-E${r[0] + 1} (${lvl}, ${c.t}) : ${pl.exos[r[0]].consigne.slice(0, 60)}`); }); }); }
    return out; });
  await b.close();
  if(trous.length){ console.log(trous.length + ' exercice(s) seul(s) en demi-largeur :\n' + trous.join('\n')); process.exit(1); }
  console.log('Aucun trou : chaque exercice demi-largeur a un voisin.');
})();
