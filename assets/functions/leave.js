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
    let max             = await sqlQueriesGET('listsleavemax')
    let remain          = await sqlQueriesGET('listsleavedays')
    let selector        = await templateLeaveSelector()
    max                 = max[0]
    remain              = remain[0]
    let cards           = await templateCardLeave()
    let markup          = sidebar + header + selector + cards
    document.getElementById('container').innerHTML  =   markup
    if (remain.sick >= max.sick) {
        document.getElementById('leave-select-sick').disabled                       = true
        document.getElementById('leave-select-sick').checked                        = false
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-sick'))
        document.getElementById('leave-label-sick').style.textDecoration            = 'line-through'
    }
    if (remain.business >= max.business) {
        document.getElementById('leave-select-business').disabled                   = true
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-business'))
        document.getElementById('leave-label-business').style.textDecoration        = 'line-through'
    }
    if (remain.vacation >= max.vacation) {
        document.getElementById('leave-select-vacation').disabled                   = true
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-vacation'))
        document.getElementById('leave-label-vacation').style.textDecoration        = 'line-through'
    } 
    if (remain.substitution >= remain.substitution_max) {
        document.getElementById('leave-select-substitution').disabled               = true
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-substitution'))
        document.getElementById('leave-label-substitution').style.textDecoration    = 'line-through'
    }
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
            if (sick) {
                sick.style.display              = 'none'
            } if (business) {
                business.style.display          = 'none'
            } if (vacation) {
                vacation.style.display          = 'none'
            } if (substitution) {
                substitution.style.display      = 'none'
            } 
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
}


async function onSubmit() {
    let data            = VALUES
    let file
    if (FILES) {
        file            = FILES[0]
    }
    let query           = await sqlQueriesLEAVE('createleaves', data)
    if (query.result == 'success' && file && (LEAVETYPE == 'sick' || LEAVETYPE == 'business')) {
        let data            = { id: query.data, file }
        let queryFile       = await queryUploader('uploaders', data)
        if (queryFile == 'success') {
            location.reload()
        }
    } else {
        location.reload()
    }
}