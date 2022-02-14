
_id()
const keys = Object.keys(data)
let meta=[]

keys.map(k=>{
    meta.push({keyname:k,keyvalue:data[k]})
})
console.log({metadata:meta})
combine({metadata:meta})