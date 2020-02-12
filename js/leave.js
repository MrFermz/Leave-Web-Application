var LEAVETYPE           = 'sick'
var DATESTART, DATEEND, REASONS, VALUES


function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let selector        = await templateLeaveSelector()
    let cards           = await templateCardLeave()
    let markup          = sidebar + header + selector + cards
    document.getElementById('container').innerHTML  =   markup
}


function onChangeLeaveType() {
    let type        = document.getElementsByName('leaveType')
    for (let i = 0; i < type.length; i++) {
        if (type[i].checked) {
            let value                       = type[i].value
            LEAVETYPE                       = value
            VALUES                          = undefined
            let sick                        = document.getElementById('leave-card-sick')
            let business                    = document.getElementById('leave-card-business')
            let vacation                    = document.getElementById('leave-card-vacation')
            let substitution                = document.getElementById('leave-card-substitution')
            let dateStart                   = document.getElementsByName(`date-start-${value}`)
            let dateEnd                     = document.getElementsByName(`date-end-${value}`)
            let reasons                     = document.getElementsByName(`reasons-${value}`)
            sick.style.display              = 'none'
            business.style.display          = 'none'
            vacation.style.display          = 'none'
            substitution.style.display      = 'none'
            dateStart[0].value              = ''
            dateEnd[0].value                = ''
            switch (value) {
                case 'sick'             :   {
                                                sick.style.display          = 'block'
                                                reasons[0].value            = ''
                                            }    
                    break
                case 'business'         :   {
                                                business.style.display      = 'block'
                                                reasons[0].value            = ''
                                            } 
                    break
                case 'vacation'         :   {
                                                vacation.style.display      = 'block'
                                            } 
                    break
                case 'substitution'     :   {
                                                substitution.style.display  = 'block'
                                            } 
                    break
                default:            
                    break
            }
        }
    }
}


function onChange() {
    let leaveType       = LEAVETYPE
    DATESTART           = document.getElementsByName(`date-start-${leaveType}`)
    DATEEND             = document.getElementsByName(`date-end-${leaveType}`)
    REASONS             = document.getElementsByName(`reasons-${leaveType}`)
    VALUES              = {
                            leaveType   :   leaveType,
                            dateStart   :   DATESTART[0].value,
                            dateEnd     :   DATEEND[0].value,
                            reasons     :   '',
                            status      :   0
                          }
    if (leaveType == 'sick' || leaveType == 'business') {
        VALUES['reasons']   = REASONS[0].value
    }
}


var files

async function onSubmitFile() {
    let data        =       files[0]

    console.log(data)
    let res         =       await onUpload(data)
    console.log(res)
}


function onUpload(data) {
    // http.open('POST', `http://localhost:8081/uploaders`, true)
    // http.setRequestHeader('x-access-token', TOKEN)
    // http.send(data)
    // return new Promise(function (resolve, reject) {
    //     http.onreadystatechange = function () {
    //         if (this.readyState === 4 && this.status === 200) {
    //             // let data    =   JSON.parse(this.responseText)
    //             let data    =   this.responseText
    //             resolve(data)
    //         }
    //     }
    // })
}


async function onSubmit() {
    let data            = VALUES
    let query           = await sqlQueriesPOST('createleaves', data)
    
    if (query == 'success') {
        location.reload()
    }
}
