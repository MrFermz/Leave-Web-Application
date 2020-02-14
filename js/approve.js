
function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let apprUsers       = await sqlQueriesGET('listsapprusers')
    let apprLeaves      = await sqlQueriesGET('listsappleaves')
    let users           = apprUsers.rawdata
    let leaves          = apprLeaves
    let lists           = await sortedLists(users, leaves)
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let cardApprove     = await templateCardApprove(lists)
    let markup          = sidebar + header + cardApprove
    document.getElementById('container').innerHTML = markup
}


async function onApprove(id) {
    let today               = new Date()
    let date                = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    let data                = {}
    data['id']              = id
    data['dateApprove']     = date
    let query               = await sqlQueriesPOST('approve', data)
    
    if (query == 'success') {
        location.reload()
    }
}


function sortedLists(users, leaves) {
    let data                = []
    return new Promise(function (resolve, reject) {
        for (const user of users) {
            for (const leave of leaves) {
                if (user.UID == leave.UID) {
                    data.push({
                        leaveID: leave.leaveID,
                        leaveType: leave.leaveType,
                        nickname: user.nickname,
                        empID: user.empID,
                        dateStart: leave.dateStart,
                        dateEnd: leave.dateEnd,
                        reasons: leave.reasons
                    })
                }
            }
        }
        resolve(data)
    })
}