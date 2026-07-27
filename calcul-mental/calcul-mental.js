/* ============================================================
   AUTOMATISMES — 112 séquences (8 câblées pour l'instant)
   Fichier autonome : dépend des fonctions/variables partagées définies
   dans index.html (sb, currentUser, currentUserRole, currentClassId).
   Les conteneurs #cmPicker / #cmWorkspace existent déjà dans index.html.
   ============================================================ */
const CM_SEQUENCES = [
  {id:'compl10', label:"Compléments à 10", seq:1, gen:()=>{ const a=Math.floor(Math.random()*9)+1; return {text:`${a} + ... = 10`, ans:10-a}; }},
  {id:'add9', label:"Ajouter 9", seq:3, gen:()=>{ const a=Math.floor(Math.random()*300)+10; return {text:`${a} + 9 = ...`, ans:a+9}; }},
  {id:'add11', label:"Ajouter 11", seq:4, gen:()=>{ const a=Math.floor(Math.random()*300)+10; return {text:`${a} + 11 = ...`, ans:a+11}; }},
  {id:'sous9', label:"Soustraire 9", seq:6, gen:()=>{ const a=Math.floor(Math.random()*300)+20; return {text:`${a} - 9 = ...`, ans:a-9}; }},
  {id:'table', label:"Tables × (2 à 9)", seq:24, gen:()=>{ const a=Math.floor(Math.random()*8)+2, b=Math.floor(Math.random()*8)+2; return {text:`${a} × ${b} = ...`, ans:a*b}; }},
  {id:'mult10', label:"Multiplier par 10, 100", seq:25, gen:()=>{ const a=Math.floor(Math.random()*90)+2; const m=[10,100][Math.floor(Math.random()*2)]; return {text:`${a} × ${m} = ...`, ans:a*m}; }},
  {id:'div10', label:"Diviser par 10", seq:45, gen:()=>{ const a=(Math.floor(Math.random()*90)+2)*10; return {text:`${a} ÷ 10 = ...`, ans:a/10}; }},
  {id:'pct10', label:"10 %, 20 %... d'un nombre", seq:65, gen:()=>{ const a=Math.floor(Math.random()*40)*10+10; const p=[10,20,50][Math.floor(Math.random()*3)]; return {text:`${p} % de ${a} = ...`, ans:a*p/100}; }},
];
function renderCMPicker(){
  const box=document.getElementById('cmPicker');
  box.innerHTML = CM_SEQUENCES.map(s=>`<div class="cm-chip" data-id="${s.id}"><div>${s.label}</div><div class="seq">séquence ${s.seq}</div></div>`).join('')
    + `<div class="cm-chip" style="opacity:.5;cursor:default;"><div>+ 104 autres séquences</div><div class="seq">moteur identique</div></div>`;
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

