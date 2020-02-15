var SICK, BUSINESS, VACATION


function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let leaveMax        = await sqlQueriesGET('listsleavemax')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let leave           = await templateLeaveMax(leaveMax)
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
        console.log(data)
        let query       = await sqlQueriesPOST('updateleavemax', data)
        if (query == 'success') {
            location.reload()
        }
    }
}