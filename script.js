// si omologul lui v-if .... sa nu uitam
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
   // console.log('identificatori',identifiers)
    return identifiers
}

function evaluate(expr,r){
   
    if(expr.substr(0,1)>='0' && expr.substr(0,1)<='9'){
          return parseInt(expr)
    }
    else {
       // console.log('identificator')
        let pieces=expr.split(".")
        if(pieces[0]=='request'&&r.length>0&&r[0]!=='') return r[1]
        // aici se va dezvolta...
    }
    return 0;
}

function replaceAtWith(original,index,len,newtext){
    var first_part= original.substr(0,index-1)
    var rest=original.substr(index+len+1,original.length-index-len-1)
   // console.log('first_part',first_part+newtext+rest)
   return first_part+newtext+rest

}

function interpolate(dataForSlot,html){
    let data_slot=dataForSlot
    let slot_html=html
    
    let identifiers=parse(slot_html)
    let _identifiers=parse(slot_html)
    for(var i=0;i<identifiers.length;i++){
        //console.log(_identifiers.length)
        let replaceWith=data_slot[identifiers[i].value]
        slot_html=replaceAtWith(slot_html,_identifiers[0].start,_identifiers[0].nrchars,replaceWith) 
        _identifiers=parse(slot_html)
    }
    return slot_html
}

window.onload = function() {
        let request=  document.location.search.split('=')
        if (request.length>0) request[0]=request[0].substring(1)
        console.log('loading...',request)
        //logic
        let sloturi= [].slice.call(document.getElementsByClassName('loop'))
        sloturi.map(slot=>{
            let slotid=slot.id
            let dataset=[]
            if(slotid.substr(0,4)=='data'){
                let dataslot=slotid.split('-')[1]
                if(data[dataslot]){
                    dataset=data[dataslot]
                    if(Array.isArray(data[dataslot])){
                       // console.log('Avem de a face cu un array')
                       let listaClase=[].slice.call(slot.classList)
                       listaClase.map(c=>{
                           if(c.substr(0,3)=='idx'){
                               let index=parseInt(evaluate(c.split(':')[1],request))
                               console.log(index)
                               dataset=[]
                               dataset.push(data[dataslot][index])
                           }
                       })
                        //aici TREBUIE SA M AI UMBLU
                        let repeated_html=""
                       /*data[dataslot]*/dataset.map(item=>{
                            repeated_html+=interpolate(item,slot.outerHTML)
                        })
                        slot.outerHTML=repeated_html
                    }
                    else
                    {
                        slot.outerHTML=interpolate(/*data[dataslot]*/dataset,slot.outerHTML)
                    }
                   
                   // console.log('Am cuplat template ',slot_html,' cu ',data_slot)
                }
            }
        })
        let p = document.getElementsByTagName('p')
       /* let listaClase=[].slice.call(p[0].classList)
        listaClase.map(c=>{
            if(c.substr(0,3)=='idx'){
                let index=parseInt(evaluate(c.split(':')[1],request))
                console.log(index)
            }
        })*/
      //  console.log('Experimenete.....',data,sloturi)
  };

