var PERM                = [0, 3]
var SICK, BUSINESS, VACATION


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
    let leaveCapacity   = await sqlQueriesGET('listsleavecapacity')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let leave           = await templateLeaveMax(leaveCapacity.data)
    let markup          = sidebar + header + leave
    document.getElementById('container').innerHTML  =   markup
}


function onChange() {
    SICK        = Number(document.getElementById('max-sick').value)
    BUSINESS    = Number(document.getElementById('max-business').value)
    VACATION    = Number(document.getElementById('max-vacation').value)
}


async function onSubmit(id) {
    if (id && (SICK, BUSINESS, VACATION)) {
        let data        = { id, sick: SICK, business: BUSINESS, vacation: VACATION }
        let query       = await sqlQueriesPOST('updateleavecapacity', data)
        if (query.result == 'success') {
            genContent()
        }
    }
}