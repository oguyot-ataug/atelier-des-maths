/* Génère planisphere.js (racine du site) : planisphère en projection Equal Earth et zoom
   Europe-Méditerranée, pour la carte de L'Atelier › Histoire des maths (frise-histoire.js).
   Usage : (cd tools/planisphere && npm install d3-geo@3 topojson-client@3 topojson-simplify@3 world-atlas@2 && node gen.mjs) */
import * as d3 from 'd3-geo';
import * as topo from 'topojson-client';
import * as simp from 'topojson-simplify';
import fs from 'fs';
const W = 1000;
// Zooms : « vue » = étendue de la carte zoomée ; « cadre » = rectangle cliquable sur le planisphère (sans chevauchement).
const ZONES = {
  europe: { nom: 'Europe et Méditerranée', vue: [-11, 48, 24, 61], cadre: [-11, 48, 24, 61], lab: 'haut', simp: 0.0004 },
  afrique: { nom: 'Afrique', vue: [-20, 55, -36, 38], cadre: [-20, 48, -36, 24], lab: 'bas', simp: 0.0012 },
  asie: { nom: 'Asie', vue: [40, 150, -10, 55], cadre: [48, 150, 0, 55], lab: 'bas', simp: 0.0015 },
  amerique: { nom: 'Amériques', vue: [-128, -62, 8, 52], cadre: [-128, -62, 8, 52], lab: 'bas', simp: 0.0012 }
};
const lire = f => JSON.parse(fs.readFileSync(new URL('node_modules/world-atlas/' + f, import.meta.url)));
const proj = d3.geoEqualEarth().fitWidth(W, { type: 'Sphere' }), path = d3.geoPath(proj).digits(0);
// Rectangle en longitude-latitude, densifié (un point par degré) pour que ses bords suivent les parallèles
// et les méridiens, et non des arcs de grand cercle.
const rect = ([lon0, lon1, lat0, lat1]) => {
  const pts = [], pas = (a, b) => { const n = Math.ceil(Math.abs(b - a)); return Array.from({ length: n }, (_, i) => a + (b - a) * i / n); };
  pas(lat0, lat1).forEach(la => pts.push([lon0, la])); pas(lon0, lon1).forEach(lo => pts.push([lo, lat1]));
  pas(lat1, lat0).forEach(la => pts.push([lon1, la])); pas(lon1, lon0).forEach(lo => pts.push([lo, lat0]));
  pts.push([lon0, lat0]);
  return { type: 'Polygon', coordinates: [pts] };
};
const h = Math.round(path.bounds({ type: 'Sphere' })[1][1]);
const t110 = lire('land-110m.json');
// Terres 50m, plus simplifiées quand la zone est vaste, sans les îlots minuscules.
const terres50 = seuil => {
  let t = simp.simplify(simp.presimplify(lire('land-50m.json')), seuil);
  t = simp.filter(t, simp.filterWeight(t, seuil * 4));
  return topo.feature(t, t.objects.land);
};
const param = p => ({ k: +p.scale().toFixed(4), tx: +p.translate()[0].toFixed(3), ty: +p.translate()[1].toFixed(3), rot: p.rotate()[0] });
const zones = {};
for(const [k, z] of Object.entries(ZONES)){
  const r = rect(z.vue), pz = d3.geoEqualEarth().rotate([-(z.vue[0] + z.vue[1]) / 2, 0]).fitWidth(W, r);
  const hz = Math.round(d3.geoPath(pz).bounds(r)[1][1]), pathZ = d3.geoPath(pz.clipExtent([[0, 0], [W, hz]])).digits(0);
  const b = path.bounds(rect(z.cadre)), lab = z.lab === 'haut' ? [Math.round(b[0][0]) + 4, Math.round(b[0][1]) - 8, 0] : [Math.round(b[0][0]) + 4, Math.round(b[1][1]) + 4, 1]; // [x, y, 1 si le nom est sous le cadre]
  zones[k] = { nom: z.nom, vue: z.vue, cadreLL: z.cadre, w: W, h: hz, p: param(pz), cadre: path(rect(z.cadre)), lab,
    grat: pathZ(d3.geoGraticule().step([10, 10])()), terre: pathZ(terres50(z.simp)) };
}
const q = s => "'" + s + "'";
const zjs = Object.entries(zones).map(([k, z]) => `    ${k}: { nom: ${q(z.nom)}, vue: ${JSON.stringify(z.vue)}, cadreLL: ${JSON.stringify(z.cadreLL)}, w: ${z.w}, h: ${z.h}, p: ${JSON.stringify(z.p)}, lab: ${JSON.stringify(z.lab)},\n      cadre: ${q(z.cadre)}, grat: ${q(z.grat)}, terre: ${q(z.terre)} }`).join(',\n');
const out = `/* Planisphère en projection Equal Earth (Šavrič, Patterson, Jenny, 2018) : chaque région y garde sa vraie
   surface. Terres : Natural Earth (domaine public). Fichier GÉNÉRÉ par tools/planisphere/gen.mjs (d3-geo +
   world-atlas), ne pas modifier à la main ; chargé à la demande par frise-histoire.js. */
const HM_CARTE = {
  monde: { w: ${W}, h: ${h}, p: ${JSON.stringify(param(proj))}, sphere: ${q(path({ type: 'Sphere' }))}, grat: ${q(path(d3.geoGraticule().step([30, 30])()))}, terre: ${q(path(topo.feature(t110, t110.objects.land)))} },
  zones: {
${zjs}
  }
};
`;
fs.writeFileSync(new URL('../../planisphere.js', import.meta.url), out);
console.log(out.length, 'octets', Object.entries(zones).map(([k, z]) => k + ' ' + z.h + ' ' + z.terre.length).join(' | '));
