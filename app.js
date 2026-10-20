const form=document.querySelector('form'),f=n=>new Intl.NumberFormat('es-ES',{maximumFractionDigits:2}).format(n);let result=null;
const data=()=>Object.fromEntries([...form.elements].filter(e=>e.name).map(e=>[e.name,e.type==='checkbox'?(e.checked?1:0):e.value===''?NaN:Number(e.value)]));
function update(){
 const d=data();document.querySelector('#number-field').hidden=d.mode===1;document.querySelector('#gap-field').hidden=d.mode!==1;
 try{
  result=ListonCalc.layout(d);const r=result;document.querySelector('#error').hidden=true;document.querySelector('#result').hidden=false;
  document.querySelector('#gap').textContent=f(r.gap);document.querySelector('#count-result').textContent=r.count;
  document.querySelector('#pieces').textContent=r.pieces;document.querySelector('#bars').textContent=r.bars+' barras de '+f(d.stock)+' cm';
  document.querySelector('#linear').textContent=f(r.linear)+' m';document.querySelector('#cost').textContent=f(r.cost)+' €';
  document.querySelector('#cut-summary').textContent='Cada barra da '+r.perBar+' pieza'+(r.perBar===1?'':'s')+' de '+f(d.height)+' cm. La reserva se aplica al número de piezas; las barras se redondean hacia arriba.';
  const table=document.querySelector('tbody');table.replaceChildren();
  r.positions.forEach(p=>{const tr=document.createElement('tr');[p.index,f(p.start)+' cm',f(p.center)+' cm'].forEach(t=>{const td=document.createElement('td');td.textContent=t;tr.append(td);});table.append(tr);});
  const svg=document.querySelector('svg#plan'),scale=900/d.width;
  svg.innerHTML='<rect x="50" y="30" width="900" height="210" fill="#272d30" rx="5"/>' +r.positions.map(p=>`<rect x="${50+p.start*scale}" y="30" width="${d.slat*scale}" height="210" rx="1" fill="#d4a572"/>`).join('')+`<path d="M50 262H950M50 254V270M950 254V270" stroke="#a8b3b4"/><text x="500" y="290" fill="#e8eeeb" text-anchor="middle" font-size="17">${f(d.width)} cm · separación libre ${f(r.gap)} cm</text>`;
  document.querySelector('#status').textContent=r.count+' listones, con '+f(r.gap)+' centímetros libres entre piezas.';
 }catch(e){result=null;document.querySelector('#result').hidden=true;document.querySelector('#error').hidden=false;document.querySelector('#error').textContent=e.message;document.querySelector('#status').textContent=e.message;document.querySelector('tbody').replaceChildren();document.querySelector('svg#plan').replaceChildren();}
 document.querySelector('#csv').disabled=!result;
}
form.addEventListener('input',update);form.addEventListener('change',update);form.addEventListener('submit',e=>e.preventDefault());
document.querySelector('#reset').onclick=()=>{form.reset();update();};document.querySelector('#print').onclick=()=>window.print();
document.querySelector('#csv').onclick=()=>{if(!result)return;const d=data();const text='\uFEFFListón;Borde izquierdo desde origen (cm);Centro desde origen (cm);Largo de corte (cm)\n'+result.positions.map(p=>[p.index,f(p.start),f(p.center),f(d.height)].join(';')).join('\n');const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='liston-a-liston-medidas.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);};
document.querySelector('#share').onclick=async()=>{const url=new URL(location.href);url.search=new URLSearchParams(data()).toString();try{await navigator.clipboard.writeText(url.href);document.querySelector('#status').textContent='Enlace con las medidas copiado.';}catch{document.querySelector('#status').textContent='No se pudo copiar. Puedes imprimir la ficha para guardar tus medidas.';}};
const params=new URLSearchParams(location.search);for(const e of form.elements)if(e.name&&params.has(e.name)){if(e.type==='checkbox')e.checked=params.get(e.name)==='1';else e.value=params.get(e.name);}
update();
