function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let lists           = await sqlQueriesGET('listsleaves')
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