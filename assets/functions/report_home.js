function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let data            = await sqlQueriesGET('countleavesfilter')
    console.log(data)
    let count           = await sortUsers(data)
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let filter          = await templateFilterReport()
    let card            = await templateCardReport(count)
    let markup          = sidebar + header + filter + card
    document.getElementById('container').innerHTML = markup
}


function sortUsers(lists) {
    let data                = []
    return new Promise(function (resolve, reject) {
        let sick                = 0
        let vacation            = 0
        let business            = 0
        let substitution        = 0
        for (const ele of lists) {
            switch (ele.leaveType) {
                case 'sick'             : sick          = ele.cnt
                    break
                case 'vacation'         : vacation      = ele.cnt
                    break
                case 'business'         : business      = ele.cnt
                    break
                case 'substitution'     : substitution  = ele.cnt
                    break
                default:
                    break
            }
        }
        data.push({ sick, vacation, business, substitution })
        resolve(data)
    })
}


