/* ============================================================
   AUTOMATISMES — 112 séquences (88 câblées, moteur à trou unique)
   Fichier autonome : dépend des fonctions/variables partagées définies
   dans index.html (sb, currentUser, currentUserRole, currentClassId).
   Les conteneurs #cmPicker / #cmWorkspace existent déjà dans index.html.

   24 séquences non câblées ici car elles ne rentrent pas dans le moteur
   "une question à trou, une réponse numérique unique" : à traiter dans
   une prochaine session avec une UI dédiée.
   - Sommes/multiplications astucieuses (14, 27, 81, 107) : réponse en
     plusieurs étapes, pas un simple trou.
   - Multiples / plus grand multiple (40, 41) : réponse non unique.
   - Ordres de grandeur (53 à 57) : réponse par case à cocher (QCM).
   - Durées (58 à 63) : réponse en deux champs (heures + minutes).
   - Vers les fractions (70 à 73) : réponse attendue sous forme de
     fraction textuelle ("37/10"), pas un nombre.
   - Conversions d'unités (110 à 112) : réponse avec changement d'unité,
     nécessite un sélecteur d'unité.
   ============================================================ */

function rnd(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function round1(x){ return Math.round(x * 10) / 10; }
function round2(x){ return Math.round(x * 100) / 100; }
function round3(x){ return Math.round(x * 1000) / 1000; }

const CM_SEQUENCES = [
  {id:'compl10', label:"Compléments à 10", seq:1, gen:()=>{ const a=rnd(1,9); return {text:`${a} + ... = 10`, ans:10-a}; }},
  {id:'addtable', label:"Tables d'addition", seq:2, gen:()=>{ const a=rnd(1,9), b=rnd(1,9); return {text:`${a} + ${b} = ...`, ans:a+b}; }},
  {id:'add9', label:"Ajouter 9", seq:3, gen:()=>{ const a=rnd(10,300); return {text:`${a} + 9 = ...`, ans:a+9}; }},
  {id:'add11', label:"Ajouter 11", seq:4, gen:()=>{ const a=rnd(10,300); return {text:`${a} + 11 = ...`, ans:a+11}; }},
  {id:'soustable', label:"Tables de soustraction", seq:5, gen:()=>{ const b=rnd(1,9); const a=b+rnd(1,9); return {text:`${a} - ${b} = ...`, ans:a-b}; }},
  {id:'sous9', label:"Soustraire 9", seq:6, gen:()=>{ const a=rnd(20,320); return {text:`${a} - 9 = ...`, ans:a-9}; }},
  {id:'sous11', label:"Soustraire 11", seq:7, gen:()=>{ const a=rnd(20,320); return {text:`${a} - 11 = ...`, ans:a-11}; }},
  {id:'add_dizaines', label:"Ajouter un nombre entier de dizaines", seq:8, gen:()=>{ const a=rnd(1,900); const d=rnd(1,9)*10; return {text:`${a} + ${d} = ...`, ans:a+d}; }},
  {id:'add_centaines', label:"Ajouter un nombre entier de centaines", seq:9, gen:()=>{ const a=rnd(1,9000); const c=rnd(1,9)*100; return {text:`${a} + ${c} = ...`, ans:a+c}; }},
  {id:'add_2chiffres', label:"Ajouter un nombre de deux chiffres", seq:10, gen:()=>{ const a=rnd(10,99), b=rnd(10,99); return {text:`${a} + ${b} = ...`, ans:a+b}; }},
  {id:'add99', label:"Ajouter 99", seq:11, gen:()=>{ const a=rnd(10,900); return {text:`${a} + 99 = ...`, ans:a+99}; }},
  {id:'add101', label:"Ajouter 101", seq:12, gen:()=>{ const a=rnd(1,900); return {text:`${a} + 101 = ...`, ans:a+101}; }},
  {id:'compl100', label:"Complément à 100", seq:13, gen:()=>{ const a=rnd(1,99); return {text:`${a} + ... = 100`, ans:100-a}; }},
  {id:'sous_dizaines', label:"Soustraire un nb entier de dizaines", seq:15, gen:()=>{ const d=rnd(1,9)*10; const a=rnd(d,999); return {text:`${a} - ${d} = ...`, ans:a-d}; }},
  {id:'sous_centaines', label:"Soustraire un nb entier de centaines", seq:16, gen:()=>{ const c=rnd(1,9)*100; const a=rnd(c,9999); return {text:`${a} - ${c} = ...`, ans:a-c}; }},
  {id:'sous_2chiffres', label:"Soustraire un nombre de deux chiffres", seq:17, gen:()=>{ const b=rnd(10,90); const a=rnd(b,99); return {text:`${a} - ${b} = ...`, ans:a-b}; }},
  {id:'sous99', label:"Soustraire 99", seq:18, gen:()=>{ const a=rnd(100,2000); return {text:`${a} - 99 = ...`, ans:a-99}; }},
  {id:'sous101', label:"Soustraire 101", seq:19, gen:()=>{ const a=rnd(150,2100); return {text:`${a} - 101 = ...`, ans:a-101}; }},
  {id:'add_grands', label:"Ajouter des grands nombres", seq:20, gen:()=>{ const a=rnd(1,999)*1000, b=rnd(1,999)*1000; return {text:`${a} + ${b} = ...`, ans:a+b}; }},
  {id:'sous_grands', label:"Soustraire des grands nombres", seq:21, gen:()=>{ const b=rnd(1,900)*1000; const a=b+rnd(1,900)*1000; return {text:`${a} - ${b} = ...`, ans:a-b}; }},
  {id:'tables_mult25', label:"Tables de multiplication : 2 à 5", seq:22, gen:()=>{ const a=rnd(2,5), b=rnd(2,9); return {text:`${a} × ${b} = ...`, ans:a*b}; }},
  {id:'tables_mult69', label:"Tables de multiplication : 6 à 9", seq:23, gen:()=>{ const a=rnd(6,9), b=rnd(2,9); return {text:`${a} × ${b} = ...`, ans:a*b}; }},
  {id:'table', label:"Tables de multiplication : 2 à 9", seq:24, gen:()=>{ const a=rnd(2,9), b=rnd(2,9); return {text:`${a} × ${b} = ...`, ans:a*b}; }},
  {id:'mult10', label:"Multiplier par 10", seq:25, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 10 = ...`, ans:a*10}; }},
  {id:'mult100_1000', label:"Multiplier par 100, 1 000", seq:26, gen:()=>{ const a=rnd(2,99); const m=[100,1000][rnd(0,1)]; return {text:`${a} × ${m} = ...`, ans:a*m}; }},
  {id:'doubles', label:"Doubles", seq:28, gen:()=>{ const a=rnd(1,500); return {text:`Le double de ${a} est ...`, ans:a*2}; }},
  {id:'triples', label:"Triples", seq:29, gen:()=>{ const a=rnd(1,300); return {text:`Le triple de ${a} est ...`, ans:a*3}; }},
  {id:'mult4', label:"Multiplier par 4", seq:30, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 4 = ...`, ans:a*4}; }},
  {id:'mult5', label:"Multiplier par 5", seq:31, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 5 = ...`, ans:a*5}; }},
  {id:'mult9', label:"Multiplier par 9", seq:32, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 9 = ...`, ans:a*9}; }},
  {id:'mult11', label:"Multiplier par 11", seq:33, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 11 = ...`, ans:a*11}; }},
  {id:'mult25', label:"Multiplier par 25", seq:34, gen:()=>{ const a=rnd(2,40); return {text:`${a} × 25 = ...`, ans:a*25}; }},
  {id:'mult50', label:"Multiplier par 50", seq:35, gen:()=>{ const a=rnd(2,60); return {text:`${a} × 50 = ...`, ans:a*50}; }},
  {id:'mult99', label:"Multiplier par 99", seq:36, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 99 = ...`, ans:a*99}; }},
  {id:'mult101', label:"Multiplier par 101", seq:37, gen:()=>{ const a=rnd(2,99); return {text:`${a} × 101 = ...`, ans:a*101}; }},
  {id:'mult_mult10', label:"Multiplier par un multiple de 10", seq:38, gen:()=>{ const a=rnd(2,999); const m=rnd(1,9)*10; return {text:`${a} × ${m} = ...`, ans:a*m}; }},
  {id:'mult_grands', label:"Multiplier des grands nombres", seq:39, gen:()=>{ const a=rnd(2,99)*1000, b=rnd(2,99)*10; return {text:`${a} × ${b} = ...`, ans:a*b}; }},
  {id:'div25', label:"Tables de division : 2 à 5", seq:42, gen:()=>{ const d=rnd(2,5), q=rnd(2,9); return {text:`${d*q} ÷ ${d} = ...`, ans:q}; }},
  {id:'div69', label:"Tables de division : 6 à 9", seq:43, gen:()=>{ const d=rnd(6,9), q=rnd(2,9); return {text:`${d*q} ÷ ${d} = ...`, ans:q}; }},
  {id:'div29', label:"Tables de division : 2 à 9", seq:44, gen:()=>{ const d=rnd(2,9), q=rnd(2,9); return {text:`${d*q} ÷ ${d} = ...`, ans:q}; }},
  {id:'div10', label:"Diviser par 10", seq:45, gen:()=>{ const q=rnd(2,90); return {text:`${q*10} ÷ 10 = ...`, ans:q}; }},
  {id:'div100_1000', label:"Division par 100, 1 000", seq:46, gen:()=>{ const m=[100,1000][rnd(0,1)]; const q=rnd(2,90); return {text:`${q*m} ÷ ${m} = ...`, ans:q}; }},
  {id:'moities', label:"Moitiés", seq:47, gen:()=>{ const a=rnd(1,500)*2; return {text:`La moitié de ${a} est ...`, ans:a/2}; }},
  {id:'tiers_quarts', label:"Tiers, quarts", seq:48, gen:()=>{ if(Math.random()<0.5){ const a=rnd(1,300)*3; return {text:`Le tiers de ${a} est ...`, ans:a/3}; } const a=rnd(1,300)*4; return {text:`Le quart de ${a} est ...`, ans:a/4}; }},
  {id:'div4', label:"Diviser par 4", seq:49, gen:()=>{ const q=rnd(2,90); return {text:`${q*4} ÷ 4 = ...`, ans:q}; }},
  {id:'div5', label:"Diviser par 5", seq:50, gen:()=>{ const q=rnd(2,90); return {text:`${q*5} ÷ 5 = ...`, ans:q}; }},
  {id:'div_mult10', label:"Diviser par un multiple de 10", seq:51, gen:()=>{ const q=rnd(2,900); const d=rnd(1,90)*10; return {text:`${q*d} ÷ ${d} = ...`, ans:q}; }},
  {id:'div_grands', label:"Diviser des grands nombres", seq:52, gen:()=>{ const q=rnd(2,900); const d=rnd(2,900); return {text:`${q*d} ÷ ${d} = ...`, ans:q}; }},
  {id:'calc5025', label:"Calculer 50 % et 25 % d'un nombre", seq:64, gen:()=>{ const p=[25,50][rnd(0,1)]; const a=rnd(1,50)*4; return {text:`${p} % de ${a} = ...`, ans:a*p/100}; }},
  {id:'pct1020', label:"Calculer 10 %, 20 %... d'un nombre", seq:65, gen:()=>{ const a=rnd(1,40)*10+10; const p=[10,20,50,90][rnd(0,3)]; return {text:`${p} % de ${a} = ...`, ans:a*p/100}; }},
  {id:'decwrite1', label:"Vers l'écriture décimale : 1 chiffre", seq:66, gen:()=>{ const a=rnd(1,99); return {text:`${a}/10 = ...`, ans:round1(a/10)}; }},
  {id:'decwrite2', label:"Vers l'écriture décimale : 2 chiffres", seq:67, gen:()=>{ const a=rnd(1,999); return {text:`${a}/100 = ...`, ans:round2(a/100)}; }},
  {id:'decwrite3', label:"Vers l'écriture décimale : 3 chiffres", seq:68, gen:()=>{ const a=rnd(1,9999); return {text:`${a}/1000 = ...`, ans:round3(a/1000)}; }},
  {id:'decwrite_melange', label:"Vers l'écriture décimale : mélange", seq:69, gen:()=>{ const r=rnd(0,2); if(r===0){ const a=rnd(1,99); return {text:`${a}/10 = ...`, ans:round1(a/10)}; } if(r===1){ const a=rnd(1,999); return {text:`${a}/100 = ...`, ans:round2(a/100)}; } const a=rnd(1,9999); return {text:`${a}/1000 = ...`, ans:round3(a/1000)}; }},
  {id:'compl1_1', label:"Complément à 1 : 1 chiffre", seq:74, gen:()=>{ const a=round1(rnd(1,9)/10); return {text:`${a} + ... = 1`, ans:round1(1-a)}; }},
  {id:'compl1_2', label:"Complément à 1 : 2 chiffres", seq:75, gen:()=>{ const a=round2(rnd(1,99)/100); return {text:`${a} + ... = 1`, ans:round2(1-a)}; }},
  {id:'compl1_3', label:"Complément à 1 : 3 chiffres", seq:76, gen:()=>{ const a=round3(rnd(1,999)/1000); return {text:`${a} + ... = 1`, ans:round3(1-a)}; }},
  {id:'compl1_melange', label:"Complément à 1 : mélange", seq:77, gen:()=>{ const r=rnd(0,2); if(r===0){ const a=round1(rnd(1,9)/10); return {text:`${a} + ... = 1`, ans:round1(1-a)}; } if(r===1){ const a=round2(rnd(1,99)/100); return {text:`${a} + ... = 1`, ans:round2(1-a)}; } const a=round3(rnd(1,999)/1000); return {text:`${a} + ... = 1`, ans:round3(1-a)}; }},
  {id:'adddec1', label:"Ajouter 2 décimaux : 1 chiffre", seq:78, gen:()=>{ const a=round1(rnd(1,99)/10), b=round1(rnd(1,99)/10); return {text:`${a} + ${b} = ...`, ans:round1(a+b)}; }},
  {id:'adddec2', label:"Ajouter 2 décimaux : 2 chiffres", seq:79, gen:()=>{ const a=round2(rnd(1,999)/100), b=round2(rnd(1,999)/100); return {text:`${a} + ${b} = ...`, ans:round2(a+b)}; }},
  {id:'adddec3', label:"Ajouter 2 décimaux : 3 chiffres", seq:80, gen:()=>{ const a=round3(rnd(1,9999)/1000), b=round3(rnd(1,9999)/1000); return {text:`${a} + ${b} = ...`, ans:round3(a+b)}; }},
  {id:'sousdec1', label:"Soustraire 2 décimaux : 1 chiffre", seq:82, gen:()=>{ const b=round1(rnd(1,99)/10); const a=round1(b+rnd(1,99)/10); return {text:`${a} - ${b} = ...`, ans:round1(a-b)}; }},
  {id:'sousdec2', label:"Soustraire 2 décimaux : 2 chiffres", seq:83, gen:()=>{ const b=round2(rnd(1,999)/100); const a=round2(b+rnd(1,999)/100); return {text:`${a} - ${b} = ...`, ans:round2(a-b)}; }},
  {id:'sousdec3', label:"Soustraire 2 décimaux : 3 chiffres", seq:84, gen:()=>{ const b=round3(rnd(1,9999)/1000); const a=round3(b+rnd(1,9999)/1000); return {text:`${a} - ${b} = ...`, ans:round3(a-b)}; }},
  {id:'multdec10', label:"Multiplier des décimaux par 10", seq:85, gen:()=>{ const a=round1(rnd(10,9999)/10); return {text:`${a} × 10 = ...`, ans:round1(a*10)}; }},
  {id:'multdec100', label:"Multiplier des décimaux par 100", seq:86, gen:()=>{ const a=round2(rnd(10,9999)/100); return {text:`${a} × 100 = ...`, ans:round2(a*100)}; }},
  {id:'multdec_mult', label:"Multiplier des décimaux par 10, 100 et 1 000", seq:87, gen:()=>{ const m=[10,100,1000][rnd(0,2)]; const a=round3(rnd(10,9999)/1000); return {text:`${a} × ${m} = ...`, ans:round3(a*m)}; }},
  {id:'divdec10', label:"Diviser des décimaux par 10", seq:88, gen:()=>{ const ans=round2(rnd(1,9999)/100); const a=round1(ans*10); return {text:`${a} ÷ 10 = ...`, ans}; }},
  {id:'divdec100', label:"Diviser des décimaux par 100", seq:89, gen:()=>{ const ans=round3(rnd(1,9999)/1000); const a=round1(ans*100); return {text:`${a} ÷ 100 = ...`, ans}; }},
  {id:'divdec_mult', label:"Diviser des décimaux par 10, 100 et 1 000", seq:90, gen:()=>{ const m=[10,100,1000][rnd(0,2)]; const ans=round3(rnd(1,9999)/1000); const a=round3(ans*m); return {text:`${a} ÷ ${m} = ...`, ans}; }},
  {id:'multdec_int', label:"Multiplier des décimaux par un entier inférieur à 10", seq:91, gen:()=>{ const a=round2(rnd(1,999)/100); const b=rnd(2,9); return {text:`${a} × ${b} = ...`, ans:round2(a*b)}; }},
  {id:'multdec_mult10b', label:"Multiplier des décimaux par un multiple de 10", seq:92, gen:()=>{ const a=round3(rnd(1,999)/1000); const m=rnd(1,99)*10; return {text:`${a} × ${m} = ...`, ans:round3(a*m)}; }},
  {id:'multdec01', label:"Multiplier par 0,1", seq:93, gen:()=>{ const a=rnd(2,999); return {text:`${a} × 0,1 = ...`, ans:round1(a*0.1)}; }},
  {id:'multdec001', label:"Multiplier par 0,01", seq:94, gen:()=>{ const a=rnd(2,9999); return {text:`${a} × 0,01 = ...`, ans:round2(a*0.01)}; }},
  {id:'multdec_melange01', label:"Multiplier par 0,1 ; 0,01 et 0,001", seq:95, gen:()=>{ const r=rnd(0,2); if(r===0){ const a=rnd(2,999); return {text:`${a} × 0,1 = ...`, ans:round1(a*0.1)}; } if(r===1){ const a=rnd(2,9999); return {text:`${a} × 0,01 = ...`, ans:round2(a*0.01)}; } const a=rnd(2,99999); return {text:`${a} × 0,001 = ...`, ans:round3(a*0.001)}; }},
  {id:'mult2dec', label:"Multiplier 2 nombres décimaux", seq:96, gen:()=>{ const a=round1(rnd(1,99)/10), b=round1(rnd(1,99)/10); return {text:`${a} × ${b} = ...`, ans:round2(a*b)}; }},
  {id:'multdec4', label:"Multiplier des décimaux par 4", seq:97, gen:()=>{ const a=round2(rnd(1,9999)/100); return {text:`4 × ${a} = ...`, ans:round2(4*a)}; }},
  {id:'multdec5', label:"Multiplier des décimaux par 5", seq:98, gen:()=>{ const a=round2(rnd(1,9999)/100); return {text:`5 × ${a} = ...`, ans:round2(5*a)}; }},
  {id:'multdec50', label:"Multiplier des décimaux par 50", seq:99, gen:()=>{ const a=round2(rnd(1,999)/100); return {text:`50 × ${a} = ...`, ans:round2(50*a)}; }},
  {id:'multdec25', label:"Multiplier des décimaux par 25", seq:100, gen:()=>{ const a=round2(rnd(1,999)/100); return {text:`25 × ${a} = ...`, ans:round2(25*a)}; }},
  {id:'multdec05', label:"Multiplier des décimaux par 0,5", seq:101, gen:()=>{ const a=round2(rnd(1,9999)/100); return {text:`0,5 × ${a} = ...`, ans:round2(0.5*a)}; }},
  {id:'multdec02', label:"Multiplier des décimaux par 0,2", seq:102, gen:()=>{ const a=round2(rnd(1,9999)/100); return {text:`0,2 × ${a} = ...`, ans:round2(0.2*a)}; }},
  {id:'multdec025', label:"Multiplier des décimaux par 0,25", seq:103, gen:()=>{ const a=round2(rnd(1,9999)/100); return {text:`0,25 × ${a} = ...`, ans:round2(0.25*a)}; }},
  {id:'divdec4', label:"Diviser des décimaux par 4", seq:104, gen:()=>{ const ans=round2(rnd(1,999)/100); const a=round2(ans*4); return {text:`${a} ÷ 4 = ...`, ans}; }},
  {id:'doublesdec', label:"Doubles, moitiés de décimaux", seq:105, gen:()=>{ if(Math.random()<0.5){ const a=round1(rnd(1,500)/10); return {text:`Le double de ${a} est ...`, ans:round1(a*2)}; } const a=round1(rnd(1,1000)/10); return {text:`La moitié de ${a} est ...`, ans:round1(a/2)}; }},
  {id:'triplestiersdec', label:"Triples, tiers de décimaux", seq:106, gen:()=>{ if(Math.random()<0.5){ const a=round1(rnd(1,300)/10); return {text:`Le triple de ${a} est ...`, ans:round1(a*3)}; } const ans=round1(rnd(1,999)/10); const a=round1(ans*3); return {text:`Le tiers de ${a} est ...`, ans}; }},
  {id:'pctdec5025', label:"Calculer 50 % et 25 % d'un nb décimal", seq:108, gen:()=>{ const p=[25,50][rnd(0,1)]; const a=round1(rnd(1,999)/10); return {text:`${p} % de ${a} = ...`, ans:round2(a*p/100)}; }},
  {id:'pctdec1020', label:"Calculer 10 % et 20 % d'un nb décimal", seq:109, gen:()=>{ const p=[10,20,90][rnd(0,2)]; const a=round1(rnd(1,999)/10); return {text:`${p} % de ${a} = ...`, ans:round2(a*p/100)}; }},
];

function renderCMPicker(){
  const box=document.getElementById('cmPicker');
  box.innerHTML = CM_SEQUENCES.slice().sort((a,b)=>a.seq-b.seq).map(s=>`<div class="cm-chip" data-id="${s.id}"><div>${s.label}</div><div class="seq">séquence ${s.seq}</div></div>`).join('')
    + `<div class="cm-chip" style="opacity:.5;cursor:default;"><div>+ 24 autres séquences</div><div class="seq">nécessitent une UI dédiée</div></div>`;
  box.querySelectorAll('.cm-chip[data-id]').forEach(chip=>{
    chip.addEventListener('click',()=>{
      box.querySelectorAll('.cm-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      runCM(chip.dataset.id);
    });
  });
}
let currentCMSeq = null;
function runCM(id){
  const seqDef = CM_SEQUENCES.find(s=>s.id===id);
  currentCMSeq = seqDef;
  const qs = Array.from({length:8},()=>seqDef.gen());
  const ws=document.getElementById('cmWorkspace');
  ws.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;">
    <strong style="font-family:'Space Grotesk',sans-serif;">${seqDef.label}</strong>
    <div><button class="btn secondary" onclick="runCM('${id}')">Nouvelle série ↻</button> <button class="btn" onclick="checkCM()">Corriger</button></div>
    </div>
    <div class="cm-q-grid">${qs.map((q,i)=>{
      const parts = q.text.split('...');
      return `<div class="cm-q" data-ans="${q.ans}"><span>${parts[0]}</span><input type="text" data-i="${i}"><span>${parts[1]||''}</span></div>`;
    }).join('')}</div>
    <p class="hint" id="cmResultStatus" style="margin-top:10px;"></p>`;
}
async function checkCM(){
  let score=0, total=0;
  document.querySelectorAll('.cm-q').forEach(box=>{
    const input=box.querySelector('input');
    const val=parseFloat(input.value.replace(',','.'));
    const ans=parseFloat(box.dataset.ans);
    box.classList.remove('ok','ko');
    total++;
    if(val===ans){ box.classList.add('ok'); score++; } else box.classList.add('ko');
  });
  const status = document.getElementById('cmResultStatus');
  if(currentUserRole==='eleve' && currentUser){
    const { error } = await sb.from('cm_results').insert({
      student_id: currentUser.id,
      class_id: currentClassId,
      sequence_id: currentCMSeq ? currentCMSeq.id : null,
      sequence_label: currentCMSeq ? currentCMSeq.label : null,
      score, total,
    });
    if(status) status.textContent = error ? "Score : "+score+"/"+total+" (non enregistré : "+error.message+")" : "Score : "+score+"/"+total+" — enregistré, votre professeur peut le voir.";
  } else if(status){
    status.textContent = "Score : "+score+"/"+total+".";
  }
}
renderCMPicker();
