var PERM            = [0, 1, 2, 3, 4]


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
    let leaveCount      = await sqlQueriesGET('listsleavecount')
    let leaveCapacity   = await sqlQueriesGET('listsleavecapacity')
    let pendings        = await sqlQueriesGET('listspendings')
    let reqUsers        = await sqlQueriesGET('listsapprusers')
    let reqLeaves       = await sqlQueriesGET('listsappleaves')
    let users
    if (reqUsers.data) {
        users           = reqUsers.data.rawdata
    }
    let leaves          = reqLeaves.data
    let requesting
    if (users) {
        let lists       = await sortedLists(users, leaves)
        lists           = lists.length
        requesting      = await templateCardHome(lists, 'requesting')
    } else {
        requesting      = ''
    }
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let cardLeave       = await templateCardHome(leaveCount, 'leave', leaveCapacity)
    let cardPending     = await templateCardHome(pendings, 'pending')
    let markup          = sidebar + header + cardLeave + cardPending + requesting
    document.getElementById('container').innerHTML  =   markup
}


function sortedLists(users, leaves) {
    let data                = []
    let img
    return new Promise(function (resolve, reject) {
        for (const leave of leaves) {
            for (const user of users) {
                if (user.UID == leave.UID) {
                    data.push({
                        leaveID     : leave.leaveID
                    })
                }
            }
        }
        resolve(data)
    })
}