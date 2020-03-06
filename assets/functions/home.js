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
