const http          =       new XMLHttpRequest()
var TOKEN           =       getToken()
var LEAVETYPE       =       'sick'
var DATESTART
var DATEEND
var REASONS
var VALUES



function onLoad() {
    genLeaveCard()
}


function onChangeLeaveType() {
    let type        =       document.getElementsByName('leaveType')
    for (let i = 0; i < type.length; i++) {
        if (type[i].checked) {
            let value       =       type[i].value
            LEAVETYPE       =       value
            VALUES          =       undefined
            switch (value) {
                case 'sick'             :   {
                                                document.getElementById('sick-card').style.display          =   'block'
                                                document.getElementById('business-card').style.display      =   'none'
                                                document.getElementById('vacation-card').style.display      =   'none'
                                                document.getElementById('substitution-card').style.display  =   'none'
                                                document.getElementsByName(`${value}-reasons`)[0].value     =   ''
                                                document.getElementsByName(`${value}-date-start`)[0].value  =   ''
                                                document.getElementsByName(`${value}-date-end`)[0].value    =   ''
                                            }    
                    break

                case 'business'         :   {
                                                document.getElementById('sick-card').style.display          =   'none'
                                                document.getElementById('business-card').style.display      =   'block'
                                                document.getElementById('vacation-card').style.display      =   'none'
                                                document.getElementById('substitution-card').style.display  =   'none'
                                                document.getElementsByName(`${value}-reasons`)[0].value     =   ''
                                                document.getElementsByName(`${value}-date-start`)[0].value  =   ''
                                                document.getElementsByName(`${value}-date-end`)[0].value    =   ''
                                            } 
                    break

                case 'vacation'         :   {
                                                document.getElementById('sick-card').style.display          =   'none'
                                                document.getElementById('business-card').style.display      =   'none'
                                                document.getElementById('vacation-card').style.display      =   'block'
                                                document.getElementById('substitution-card').style.display  =   'none'
                                                document.getElementsByName(`${value}-date-start`)[0].value  =   ''
                                                document.getElementsByName(`${value}-date-end`)[0].value    =   ''
                                            } 
                    break

                case 'substitution'     :   {
                                                document.getElementById('sick-card').style.display          =   'none'
                                                document.getElementById('business-card').style.display      =   'none'
                                                document.getElementById('vacation-card').style.display      =   'none'
                                                document.getElementById('substitution-card').style.display  =   'block'
                                                document.getElementsByName(`${value}-date-start`)[0].value  =   ''
                                                document.getElementsByName(`${value}-date-end`)[0].value    =   ''
                                            } 
                    break

                default:
                    break
            }
        }
    }
}


function onChange() {
    let leaveType       =       LEAVETYPE
    DATESTART           =       document.getElementsByName(`${leaveType}-date-start`)
    DATEEND             =       document.getElementsByName(`${leaveType}-date-end`)

    if (leaveType === 'sick') {
        REASONS         =       document.getElementsByName(`sick-reasons`)
    } else if (leaveType === 'business') {
        REASONS         =       document.getElementsByName(`business-reasons`)
    } else {
        REASONS         =       ''
    }

    if (leaveType === 'sick' || leaveType === 'business') {
        VALUES              =       {
                                        leaveType   :   leaveType,
                                        dateStart   :   DATESTART[0].value,
                                        dateEnd     :   DATEEND[0].value,
                                        reasons     :   REASONS[0].value,
                                        status      :   0
                                    }
    } else {
        VALUES              =       {
                                        leaveType   :   leaveType,
                                        dateStart   :   DATESTART[0].value,
                                        dateEnd     :   DATEEND[0].value,
                                        reasons     :   '',
                                        status      :   0
                                    }
    }
}


function onSubmit() {
    let data                =       VALUES
    http.open('POST', `http://localhost:8081/createleave`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.setRequestHeader('Content-Type', 'application/json')
    http.send(JSON.stringify(data))
}


function genLeaveCard() {
}