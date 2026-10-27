// tools/docs-externes/fetch.mjs -- télécharge les documentations listées dans urls.json (workflow « Docs externes »).
import fs from 'fs';
const urls = JSON.parse(fs.readFileSync(new URL('urls.json', import.meta.url), 'utf8')); delete urls._;
const out = new URL('out/', import.meta.url); fs.mkdirSync(out, { recursive: true });
const journal = [];
for(const [nom, url] of Object.entries(urls)){
  try{
    const r = await fetch(url, { headers: { 'User-Agent': 'AtelierDesMathsDocs/1.0 (https://maths.latelieraugmente.fr)', Accept: 'text/markdown,text/plain,*/*' } });
    const t = await r.text();
    fs.writeFileSync(new URL(nom, out), t);
    journal.push(`${nom} : HTTP ${r.status}, ${t.length} caractères`);
  }catch(e){ journal.push(`${nom} : ERREUR ${e.message}`); }
}
fs.writeFileSync(new URL('journal.txt', out), journal.join('\n') + '\n');
console.log(journal.join('\n'));
