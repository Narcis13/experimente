
_id()
const keys = Object.keys(data)
let meta=[]

keys.map(k=>{
    meta.push({keyname:k,keyvalue:data[k]})
})
/*for (let index = 0; index < 30; index++) {
    meta.push({keyname:'slot_'+index})
    
}*/
//console.log({metadata:meta})
combine({metadata:meta})

var ul = document.getElementById('keys');  // Parent
var label = document.getElementsByTagName('label')
console.log(label)
ul.addEventListener('click', function(e) {
 //console.log(e.target.attributes[0].nodeValue)
    if (e.target.tagName === 'LI'){
        label[0].innerHTML = e.target.attributes[0].nodeValue;
      //alert(e.target.id);  // Check if the element is a LI
    }
});