// Migration vers Paris : copie des fichiers du Storage (d'après le script de la documentation Supabase,
// « Migrating storage objects »), sans question interactive. Dépôt public : n'affiche que des comptages,
// jamais un nom de fichier (ils peuvent contenir des noms d'élèves).
const { createClient } = require('@supabase/supabase-js');
const vieux = createClient(`https://${process.env.OLD_REF}.supabase.co`, process.env.OLD_KEY, { auth: { persistSession: false } });
const neuf = createClient(`https://${process.env.NEW_REF}.supabase.co`, process.env.NEW_KEY, { auth: { persistSession: false } });

async function lister(bucket, chemin = ''){
  let tout = [], debut = 0;
  for(;;){
    const { data, error } = await vieux.storage.from(bucket).list(chemin, { limit: 1000, offset: debut });
    if(error) throw new Error(`liste impossible dans ${bucket} : ${error.message}`);
    for(const it of data || []){
      if(!it.metadata) tout = tout.concat(await lister(bucket, `${chemin}${it.name}/`));
      else tout.push({ chemin: `${chemin}${it.name}`, meta: it.metadata });
    }
    if(!data || data.length < 1000) return tout;
    debut += 1000;
  }
}

(async () => {
  const { data: seaux, error } = await vieux.storage.listBuckets();
  if(error) throw new Error('liste des buckets impossible : ' + error.message);
  const { data: existants } = await neuf.storage.listBuckets();
  const noms = new Set((existants || []).map(b => b.name));
  let ok = 0, ko = 0;
  for(const b of seaux){
    if(!noms.has(b.name)){
      const { error: e } = await neuf.storage.createBucket(b.name, { public: b.public, fileSizeLimit: b.file_size_limit, allowedMimeTypes: b.allowed_mime_types });
      if(e) throw new Error(`création du bucket ${b.name} impossible : ${e.message}`);
    }
    const fichiers = await lister(b.name);
    let bok = 0, bko = 0;
    for(let i = 0; i < fichiers.length; i += 8){
      const res = await Promise.all(fichiers.slice(i, i + 8).map(async f => {
        const { data, error: d } = await vieux.storage.from(b.name).download(f.chemin);
        if(d) return false;
        const { error: u } = await neuf.storage.from(b.name).upload(f.chemin, data, { upsert: true, contentType: f.meta && f.meta.mimetype, cacheControl: f.meta && f.meta.cacheControl });
        return !u;
      }));
      res.forEach(r => r ? bok++ : bko++);
    }
    console.log(`Bucket ${b.name}${b.public ? ' (public)' : ''} : ${bok} fichiers copiés${bko ? `, ${bko} en échec` : ''}`);
    ok += bok; ko += bko;
  }
  console.log(`Total : ${ok} fichiers copiés, ${ko} en échec.`);
  process.exit(ko ? 1 : 0);
})().catch(e => { console.error('Erreur : ' + e.message.replace(/"[^"]*"/g, '"…"')); process.exit(1); });
