(function(root){
function layout(d){
 for(const [key,value] of Object.entries(d))if(!Number.isFinite(value)||value<0)throw Error('Revisa las medidas: introduce números válidos, sin valores negativos.');
 if(d.width<=0||d.height<=0||d.slat<=0||d.stock<=0)throw Error('El tramo, la altura, el ancho del listón y el largo comercial deben ser positivos.');
 const useful=d.width-d.left-d.right;
 if(useful<=0)throw Error('Los márgenes ocupan todo el ancho del tramo.');
 let count=d.count;
 if(d.mode===1){
  if(d.target<=0)throw Error('La separación máxima debe ser mayor que cero.');
  count=Math.max(2,Math.ceil(((useful+(d.edges?-d.target:d.target))/(d.slat+d.target))-1e-9));
 }
 if(!Number.isInteger(count)||count<2||count>300)throw Error('Usa entre 2 y 300 listones por tramo. Divide los tramos mayores en proyectos independientes.');
 if(count*d.slat>useful+1e-9)throw Error('Los listones no caben en el tramo disponible. Reduce su número o su ancho.');
 const gaps=d.edges?count+1:count-1;
 const gap=(useful-count*d.slat)/gaps;
 if(d.mode===1&&gap>d.target+1e-8)throw Error('No hay un reparto que respete esa separación con estas medidas.');
 const positions=Array.from({length:count},(_,i)=>({index:i+1,start:d.left+(d.edges?gap:0)+i*(d.slat+gap),center:d.left+(d.edges?gap:0)+i*(d.slat+gap)+d.slat/2}));
 const pieces=Math.ceil(count*(1+d.waste/100)-1e-9);
 const perBar=Math.floor((d.stock+d.kerf+1e-9)/(d.height+d.kerf));
 if(perBar<1)throw Error('La altura de cada pieza supera el largo comercial. Elige una barra más larga; no calculamos empalmes.');
 const bars=Math.ceil(pieces/perBar);
 return {count,gap,positions,pieces,perBar,bars,linear:count*d.height/100,purchased:bars*d.stock/100,cost:bars*d.stock/100*d.price,useful};
}
root.ListonCalc={layout};if(typeof module!=='undefined')module.exports={layout};
})(typeof window==='undefined'?globalThis:window);
