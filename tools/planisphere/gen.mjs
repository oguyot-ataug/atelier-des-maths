/* Génère planisphere.js (racine du site) : planisphère en projection Equal Earth et zoom
   Europe-Méditerranée, pour la carte de L'Atelier › Histoire des maths (frise-histoire.js).
   Usage : (cd tools/planisphere && npm install d3-geo@3 topojson-client@3 topojson-simplify@3 world-atlas@2 && node gen.mjs) */
import * as d3 from 'd3-geo';
import * as topo from 'topojson-client';
import * as simp from 'topojson-simplify';
import fs from 'fs';
const W = 1000, Z = { lon0: -11, lon1: 48, lat0: 24, lat1: 61 };
const lire = f => JSON.parse(fs.readFileSync(new URL('node_modules/world-atlas/' + f, import.meta.url)));
const proj = d3.geoEqualEarth().fitWidth(W, { type: 'Sphere' }), path = d3.geoPath(proj).digits(0);
const rect = { type: 'Polygon', coordinates: [[[Z.lon0, Z.lat0], [Z.lon0, Z.lat1], [Z.lon1, Z.lat1], [Z.lon1, Z.lat0], [Z.lon0, Z.lat0]]] };
const projZ = d3.geoEqualEarth().rotate([-(Z.lon0 + Z.lon1) / 2, 0]).fitWidth(W, rect);
const hZ = Math.round(d3.geoPath(projZ).bounds(rect)[1][1]), h = Math.round(path.bounds({ type: 'Sphere' })[1][1]);
const pathZ = d3.geoPath(projZ.clipExtent([[0, 0], [W, hZ]])).digits(0);
const t110 = lire('land-110m.json'), t50 = simp.simplify(simp.presimplify(lire('land-50m.json')), 0.0004);
const param = p => ({ k: +p.scale().toFixed(4), tx: +p.translate()[0].toFixed(3), ty: +p.translate()[1].toFixed(3), rot: p.rotate()[0] });
const out = `/* Planisphère en projection Equal Earth (Šavrič, Patterson, Jenny, 2018) : chaque région y garde sa vraie
   surface. Terres : Natural Earth (domaine public). Fichier GÉNÉRÉ par tools/planisphere/gen.mjs (d3-geo +
   world-atlas), ne pas modifier à la main ; chargé à la demande par frise-histoire.js. */
const HM_CARTE = {
  monde: { w: ${W}, h: ${h}, p: ${JSON.stringify(param(proj))}, sphere: '${path({ type: 'Sphere' })}', grat: '${path(d3.geoGraticule().step([30, 30])())}', terre: '${path(topo.feature(t110, t110.objects.land))}', cadre: '${path(rect)}' },
  europe: { w: ${W}, h: ${hZ}, p: ${JSON.stringify(param(projZ))}, grat: '${pathZ(d3.geoGraticule().step([10, 10])())}', terre: '${pathZ(topo.feature(t50, t50.objects.land))}' }
};
`;
fs.writeFileSync(new URL('../../planisphere.js', import.meta.url), out);
// Contrôle : la projection recodée dans frise-histoire.js (hmProj) doit redonner les points de d3.
const test = [[2.35, 48.86], [-122.17, 37.43], [108.9, 34.3], [29.9, 31.2]];
console.log(out.length, 'octets ; contrôle', JSON.stringify(test.map(ll => [proj(ll).map(Math.round), projZ(ll).map(Math.round)])));
