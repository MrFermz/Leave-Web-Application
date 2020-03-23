var PERM            = [0, 2, 3, 4]
var REASONS


async function onLoad() {
    let TYPE_FROM_SYS   = await sqlQueriesGET('gettypeid')
    let _TYPE           = TYPE_FROM_SYS.data[0].typeID
    if ((PERM.includes(TYPE) && TYPE === _TYPE) && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let users
    let apprUsers       = await sqlQueriesGET('listsapprusers')
    let apprLeaves      = await sqlQueriesGET('listsappleaves')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    if (apprUsers.data) {
        users           = apprUsers.data.rawdata
    }
    let leaves          = apprLeaves.data
    let cardApprove
    if (users) {
        let lists       = await sortedLists(users, leaves)
        cardApprove     = await templateCardApprove(lists)
    } else {
        cardApprove     = ''
    }
    let modal           = await templateMenuManage()
    let markup          = sidebar + header + modal
    document.getElementById('container').innerHTML = markup
    document.getElementById('container-card').innerHTML = cardApprove
}


async function onApprove(id) {
    let today               = new Date()
    let data                = {}
    data['id']              = id
    data['dateApprove']     = today
    let query               = await sqlQueriesPOST('approve', data)
    if (query.result == 'success') {
        genContent()
    }
    if (query.data == 'desync') {
        desync()
    }
}


function onChange(index) {
    REASONS         = document.getElementById(`reasons-reject-${index}`).value
}


async function onReject(leaveID, leavecountID, leaveType) {
    let today       = new Date()
    let data        = { leaveID, leavecountID, leaveType, dateReject: today, reasons: REASONS }
    if (data.reasons) {
        let res         = await sqlQueriesPOST('rejectleaves', data)
        if (res.result == 'success') {
            genContent()
        }
        if (res.data == 'desync') {
            desync()
        }
    }
}


function desync() {
    let btn                 = document.getElementById('input-container')
    let approve             = document.getElementById('approve')
    let reject              = document.getElementById('reject')
    approve.style.display   = 'none'
    reject.style.display    = 'none'
    btn.innerHTML           = 'Please reload'
    btn.style.fontWeight    = 'bold'
    btn.style.color         = 'red'
    btn.style.marginBottom  = '5px'
}


async function onZoom(img) {
    let test    = await templateModal(img)
    toggleModal()
    document.getElementById('modal-container').innerHTML = test
}


function toggleModal() {
    let body                        = document.body
    let modal                       = document.getElementById('modal-container')
    if (modal.style.display == 'block') {
        modal.style.display         = 'none'
        body.style.overflowY        = 'scroll'
    } else {
        modal.style.display         = 'block'
        body.style.overflow         = 'hidden'
    }
}


function sortedLists(users, leaves) {
    let data                = []
    let img
    return new Promise(function (resolve, reject) {
        for (const leave of leaves) {
            for (const user of users) {
                if (user.UID == leave.UID) {
                    let path    = leave.path
                    if (path) {
                        img     = path.split('\\')
                        img     = img[img.length - 1]
                    }
                    data.push({
                        leaveID     : leave.leaveID,
                        leaveCount  : user.leavecountID,
                        leaveType   : leave.leaveType,
                        timeStamp   : leave.timeStamp,
                        nickname    : user.nickname,
                        empID       : user.empID,
                        dateStart   : leave.dateStart,
                        dateEnd     : leave.dateEnd,
                        reasons     : leave.reasons,
                        img
                    })
                }
            }
        }
        resolve(data)
    })
}


window.onclick = function (event) {
    let modal                   = document.getElementById('modal-container')
    let side                    = document.getElementById('side-container')
    let body                    = document.body
    if (event.target == modal) {
        body.style.overflowY    = 'scroll'
        modal.style.display     = 'none'
        VALUES                  = {}
    }
    if (event.target == side) {
        side.style.display      = 'none'
    }
}