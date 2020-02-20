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
    let cards           = await templateCardLeave()
    let markup          = sidebar + header + selector + cards
    document.getElementById('container').innerHTML  =   markup
    if (remain.sick >= max.sick) {
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-sick'))
        document.getElementById('leave-select-sick').disabled                       = true
        document.getElementById('leave-select-sick').style.textDecoration           = 'line-through'
    }
    if (remain.business >= max.business) {
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-business'))
        document.getElementById('leave-select-business').disabled                   = true
        document.getElementById('leave-select-business').style.textDecoration       = 'line-through'
    }
    if (remain.vacation >= max.vacation) {
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-vacation'))
        document.getElementById('leave-select-vacation').disabled                   = true
        document.getElementById('leave-select-vacation').style.textDecoration       = 'line-through'
    } 
    if (remain.substitution >= remain.substitutionMax) {
        document.getElementById('leave-card-container').removeChild(document.getElementById('leave-card-substitution'))
        document.getElementById('leave-select-substitution').disabled               = true
        document.getElementById('leave-select-substitution').style.textDecoration   = 'line-through'
    }
}


function onChangeLeaveType(type) {
    console.log(type)
    LEAVETYPE                       = type
    VALUES                          = undefined
    let sick                        = document.getElementById('leave-card-sick')
    let business                    = document.getElementById('leave-card-business')
    let vacation                    = document.getElementById('leave-card-vacation')
    let substitution                = document.getElementById('leave-card-substitution')
    let sickSelect                  = document.getElementById('leave-select-sick')
    let businessSelect              = document.getElementById('leave-select-business')
    let vacationSelect              = document.getElementById('leave-select-vacation')
    let substitutionSelect          = document.getElementById('leave-select-substitution')
    let dateStart                   = document.getElementsByName(`date-start-${type}`)
    let dateEnd                     = document.getElementsByName(`date-end-${type}`)
    let file                        = document.getElementById(`upload-${type}`)
    let reasons                     = document.getElementsByName(`reasons-${type}`)
    if (sick) {
        sickSelect.style.backgroundColor    = ''
        sick.style.display              = 'none'
    } if (business) {
        businessSelect.style.backgroundColor    = ''
        business.style.display          = 'none'
    } if (vacation) {
        vacationSelect.style.backgroundColor    = ''
        vacation.style.display          = 'none'
    } if (substitution) {
        substitutionSelect.style.backgroundColor    = ''
        substitution.style.display      = 'none'
    } 
    dateStart[0].value              = ''
    dateEnd[0].value                = ''
    if (file) {
        file.value                      = ''
    }
    let bg_color        = 'gray'
    switch (type) {
        case 'sick'             :   {
                                        sickSelect.style.backgroundColor        = bg_color
                                        sick.style.display                      = 'block'
                                        reasons[0].value                        = ''
                                    }    
            break
        case 'business'         :   {
                                        businessSelect.style.backgroundColor    = bg_color
                                        business.style.display                  = 'block'
                                        reasons[0].value                        = ''
                                    } 
            break
        case 'vacation'         :   {
                                        vacationSelect.style.backgroundColor    = bg_color
                                        vacation.style.display                  = 'block'
                                    } 
            break
        case 'substitution'     :   {
                                        substitutionSelect.style.backgroundColor    = bg_color
                                        substitution.style.display                  = 'block'
                                    } 
            break
        default:            
            break
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
                            reasons     : '',
                            uploadid    : null,
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
        let upload      = await queryUploader('uploaders', file)
        let uploadID        = upload.data
        data['uploadid']    = uploadID
    }
    console.log(data)
    await sqlQueriesLEAVE('createleaves', data)
}