
function parse(s){
   let idx=0
   let identifiers=[]
   let token={start:0,nrchars:0}
   let nrchars=0
   let intoken=false
   while(idx<s.length){
    let c = s.charAt(idx)

    if(c=='{'){
     token.start=idx+1
     intoken=true
    }
    if (intoken){
        nrchars++


    }
    if(c=='}'){
      token.nrchars=nrchars-2
      token.value=s.substr(token.start,nrchars-2)
      identifiers.push(token)
      token={start:0,nrchars:0}
      intoken=false
      nrchars=0
    }
    idx++
    //console.log(c)
   }
    console.log('identificatori',identifiers)
    return identifiers
}

function replaceAtWith(original,index,len,newtext){
    var first_part= original.substr(0,index-1)
    var rest=original.substr(index+len+1,original.length-index-len-1)
   // console.log('first_part',first_part+newtext+rest)
   return first_part+newtext+rest

}

window.onload = function() {
        //console.log('loading...')
        //logic
        let sloturi= [].slice.call(document.getElementsByClassName('loop'))
        sloturi.map(slot=>{
            let slotid=slot.id
            if(slotid.substr(0,4)=='data'){
                let dataslot=slotid.split('-')[1]
                if(data[dataslot]){
                    let data_slot=data[dataslot]
                    let slot_html=slot.outerHTML
                    let new_slot_html=""
                    let identifiers=parse(slot_html)
                    let _identifiers=parse(slot_html)
                    for(var i=0;i<identifiers.length;i++){
                        //console.log(_identifiers.length)
                        let replaceWith=data_slot[identifiers[i].value]
                        slot_html=replaceAtWith(slot_html,_identifiers[0].start,_identifiers[0].nrchars,replaceWith) 
                        _identifiers=parse(slot_html)
                    }
                    slot.outerHTML=slot_html
                   // console.log('Am cuplat template ',slot_html,' cu ',data_slot)
                }
            }
        })
        console.log('Experimenete.....',data,sloturi)
  };

