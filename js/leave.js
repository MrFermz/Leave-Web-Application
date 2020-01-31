

function onChangeLeaveType() {

    let values        =       document.getElementsByName('leaveType')

    for (let i = 0; i < values.length; i++) {
        if (values[i].checked) {
            let value = values[i].value

            console.log(value)
            switch (value) {

                case 'sick'             :   {
                    
                                                document.getElementById('sick-card').style.display          = 'block'
                                                document.getElementById('business-card').style.display      = 'none'
                                                document.getElementById('vacation-card').style.display      = 'none'
                                                document.getElementById('substitution-card').style.display  = 'none'
                    
                                            }    
                break

                case 'business'         :   {
                    
                                                document.getElementById('sick-card').style.display          = 'none'
                                                document.getElementById('business-card').style.display      = 'block'
                                                document.getElementById('vacation-card').style.display      = 'none'
                                                document.getElementById('substitution-card').style.display  = 'none'

                                            } 
                break

                case 'vacation'         :   {
                    
                                                document.getElementById('sick-card').style.display          = 'none'
                                                document.getElementById('business-card').style.display      = 'none'
                                                document.getElementById('vacation-card').style.display      = 'block'
                                                document.getElementById('substitution-card').style.display  = 'none'

                                            } 
                break

                case 'substitution'     :   {
                    
                                                document.getElementById('sick-card').style.display          = 'none'
                                                document.getElementById('business-card').style.display      = 'none'
                                                document.getElementById('vacation-card').style.display      = 'none'
                                                document.getElementById('substitution-card').style.display  = 'block'

                                            } 
                break

                default:
                break

            }

        }
        
    }

}



function onChangeDate() {
    
    let dateStart       =       document.getElementsByName('date-start')
    let dateEnd         =       document.getElementsByName('date-end')

    dateStart           =       dateStart[0].value
    dateEnd             =       dateEnd[0].value
    

    console.log(`START: ${dateStart}\nEND: ${dateEnd}`)


}
