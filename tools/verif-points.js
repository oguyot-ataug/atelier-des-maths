// Contrôle des marques des points dans toutes les figures des planches (élève et corrigé), après la correction
// automatique de geo-points.js : une croix ne doit rester que sur un point isolé. Lancer :
//   NODE_PATH=/opt/node22/lib/node_modules node tools/verif-points.js
const { chromium } = require('playwright'); const path=require('path'); const fs=require('fs');
(async()=>{ const b=await chromium.launch(); const root=path.join(__dirname, '..');
 const p=await b.newPage({viewport:{width:1100,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/*', r=>{ const u=new URL(r.request().url()); if(u.hostname==='site.local'){ const f=path.join(root, u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname); return fs.existsSync(f)? r.fulfill({path:f}) : r.fulfill({status:404}); } return r.abort(); });
 await p.goto('http://site.local/'); await p.waitForTimeout(3000);
 const res = await p.evaluate(async ()=>{ const out={reste:[], total:0, ms:0}; const z=document.createElement('div'); z.style.cssText='position:absolute;left:0;top:0;width:900px;background:#fff;z-index:99999'; z.className='cx-td'; document.body.appendChild(z);
  const raf=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  for(const lvl of Object.keys(CHAPITRES_BY_LEVEL)) for(const c of CHAPITRES_BY_LEVEL[lvl]){ let L; try{ L=plDe(lvl,c.t);}catch(e){continue;} if(!L||!L.length) continue;
   for(let i=0;i<L.length;i++) for(let k=0;k<L[i].exos.length;k++){ const x=L[i].exos[k]; const vs=[x.eleve,x.corr]; for(const h of vs){ if(!h||!/<svg/.test(h)) continue; z.innerHTML=h; const t0=performance.now(); await raf(); out.ms+=performance.now()-t0;
     z.querySelectorAll('svg').forEach(s=>{ out.total++; geoPointsAnalyse(s).forEach(q=>{ if(q.n) out.reste.push(lvl+' '+c.t+' '+i+'-'+k+' n'+q.n); }); }); } } }
  return out; });
 console.log(res.reste.length ? res.reste.length + ' croix mal placées :\n' + res.reste.join('\n') : 'Aucune croix mal placée (' + res.total + ' figures de planches).'); if(errs.length) console.log(errs.slice(0,3)); await b.close(); })();
