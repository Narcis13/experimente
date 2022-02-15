
_id()
const keys = Object.keys(data)
let meta=[]

keys.map(k=>{
    meta.push({keyname:k,keyvalue:data[k]})
})
for (let index = 0; index < 30; index++) {
    meta.push({keyname:'slot_'+index})
    
}
//console.log({metadata:meta})
combine({metadata:meta})