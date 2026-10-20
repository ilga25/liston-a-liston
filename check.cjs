const assert=require('node:assert/strict'),{layout}=require('./calc.js');
const d={width:300,height:230,slat:3,left:0,right:0,count:21,target:5,edges:0,mode:0,stock:240,kerf:.3,waste:5,price:3.5};
const r=layout(d);assert.equal(r.gap,11.85);assert.equal(r.positions[0].start,0);assert.equal(r.positions.at(-1).start,297);assert.equal(r.pieces,23);assert.equal(r.bars,23);
assert(Math.abs(layout({...d,edges:1}).gap-237/22)<1e-9);
assert.equal(layout({...d,mode:1,target:3}).count,51);
assert.equal(layout({...d,height:100}).perBar,2);
assert.equal(layout({...d,left:10,right:10}).positions[0].start,10);
assert.throws(()=>layout({...d,count:101}),/no caben/);assert.throws(()=>layout({...d,height:250}),/supera/);assert.throws(()=>layout({...d,count:2.5}));assert.throws(()=>layout({...d,width:NaN}));
for(const edges of [0,1])for(const width of [100,167,300,450])for(const target of [1,3,5,10]){
 const p=layout({...d,width,target,edges,mode:1});assert(p.gap<=target+1e-8);assert(p.positions.at(-1).start+3<=width+1e-8);
 if(p.count>2){const less=layout({...d,width,target,edges,count:p.count-1});assert(less.gap>target-1e-8);}
}
console.log('13 example/error checks and 32 layout invariants passed.');
