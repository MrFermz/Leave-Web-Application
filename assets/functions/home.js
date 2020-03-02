var PERM            = [0, 1, 2, 3, 4]


function onLoad() {
    if (PERM.includes(TYPE) && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let leaveDays       = await sqlQueriesGET('listsleavedays')
    let leaveMax        = await sqlQueriesGET('listsleavemax')
    let pendings        = await sqlQueriesGET('listspendings')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let cardLeave       = await templateCardHome(leaveDays, 'leave', leaveMax)
    let cardPending     = await templateCardHome(pendings, 'pending')
    let markup          = sidebar + header + cardLeave + cardPending
    document.getElementById('container').innerHTML  =   markup
}
