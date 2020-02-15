function onLoad() {
    if (TOKEN) {
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
    let cardLeave       = await templateCardHome(leaveDays[0], 'leave', leaveMax)
    let cardPending     = await templateCardHome(pendings[0], 'pending')
    let markup          = sidebar + header + cardLeave + cardPending
    document.getElementById('container').innerHTML  =   markup
}
