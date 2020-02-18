function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let tbHeader        = ['#', 'Name', 'Sick', 'Business', 'Vacation', 'Substitution']
    let data            = await sqlQueriesGET('countleaves')
    console.log(data)
    let users           = await sortUsers(data)
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let filter          = await templateFilterReport()
    let table           = await templateTableReport(tbHeader, users)
    let markup          = sidebar + header + filter + table
    document.getElementById('container').innerHTML = markup
}


function sortUsers(lists) {
    let data                = []
    let unsortUID           = []
    let sortedUID           = []
    return new Promise(function (resolve, reject) {
        for (const ele of lists) {
            unsortUID.push(ele.UID)
        }
        sortedUID = [...new Set(unsortUID)]
        sortedUID.forEach((uid_ele, uid_i) => {
            let sick                = 0
            let vacation            = 0
            let business            = 0
            let substitution        = 0
            data.push({UID: uid_ele, sick, vacation, business, substitution})
            for (const data_ele of lists) {
                if (data_ele.UID == uid_ele) {
                    switch (data_ele.leaveType) {
                        case 'sick'             : sick          = data_ele.cnt
                            break
                        case 'vacation'         : vacation      = data_ele.cnt
                            break
                        case 'business'         : business      = data_ele.cnt
                            break
                        case 'substitution'     : substitution  = data_ele.cnt
                            break
                        default:
                            break
                    }
                    data[uid_i] = {UID: data_ele.UID, sick, vacation, business, substitution}
                }
            }
        })
        resolve(data)
    })
}
