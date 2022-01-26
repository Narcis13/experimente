

window.onload = function() {
        console.log('loading...')
        //logic
        let sloturi= [].slice.call(document.getElementsByClassName('loop'))
        sloturi.map(slot=>{
            let slotid=slot.id
            if(slotid.substr(0,4)=='data'){
                let dataslot=slotid.split('-')[1]
                if(data[dataslot]){
                    let data_slot=data[dataslot]
                    let slot_html=slot.outerHTML
                    console.log('Am cuplat template ',slot_html,' cu ',data_slot)
                }
            }
        })
        console.log('Experimenete.....',data,sloturi)
  };

