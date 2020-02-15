var LEAVETYPE           = 'sick'
var DATESTART, DATEEND, REASONS, VALUES, FILES


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
            let file                        = document.getElementById(`upload-${value}`)
            let reasons                     = document.getElementsByName(`reasons-${value}`)
            sick.style.display              = 'none'
            business.style.display          = 'none'
            vacation.style.display          = 'none'
            substitution.style.display      = 'none'
            dateStart[0].value              = ''
            dateEnd[0].value                = ''
            if (file) {
                file.value                      = ''
            }
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
                            leaveType   : leaveType,
                            dateStart   : DATESTART[0].value,
                            dateEnd     : DATEEND[0].value,
                            file        : '',
                            reasons     : '',
                            status      : 0
                          }
    if (leaveType == 'sick' || leaveType == 'business') {
        if (FILES) {
            VALUES['file']      = FILES[0]
        }
        VALUES['reasons']   = REASONS[0].value
    }
    console.log(VALUES)
}


async function onSubmit() {
    let data            = VALUES
    let file
    if (FILES) {
        file            = FILES[0]
    }
    let query           = await sqlQueriesLEAVE('createleaves', data)
    if (query.result == 'success' && file) {
        let data            = { id: query.data, file }
        let queryFile       = await queryUploader('uploaders', data)
        if (queryFile == 'success') {
            console.log(queryFile)
        }
    }
}