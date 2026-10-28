// tools/docs-externes/fetch.mjs -- télécharge les documentations listées dans urls.json (workflow « Docs externes »).
// Fichiers enregistrés tels quels (octets), pour que les PDF restent lisibles.
import fs from 'fs';
const urls = JSON.parse(fs.readFileSync(new URL('urls.json', import.meta.url), 'utf8')); delete urls._;
const out = new URL('out/', import.meta.url); fs.mkdirSync(out, { recursive: true });
const journal = [];
for(const [nom, url] of Object.entries(urls)){
  try{
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AtelierDesMathsDocs/1.0; +https://latelierdesmaths.fr)', Accept: 'text/markdown,text/html,application/pdf,text/plain,*/*' } });
    const b = Buffer.from(await r.arrayBuffer());
    fs.writeFileSync(new URL(nom, out), b);
    journal.push(`${nom} : HTTP ${r.status}, ${b.length} octets (${r.url})`);
  }catch(e){ journal.push(`${nom} : ERREUR ${e.message}`); }
}
fs.writeFileSync(new URL('journal.txt', out), journal.join('\n') + '\n');
console.log(journal.join('\n'));
