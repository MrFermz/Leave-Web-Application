function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let data            = await sqlQueriesGET('countleaves')
    let count           = await sortUsers(data)
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let users           = await sqlQueriesGET('listsusers')
    USERS               = users
    let filter          = await templateFilterReport(users)
    let card            = await templateCardReportDetail(count)
    let markup          = sidebar + header + filter
    document.getElementById('container').innerHTML = markup
    document.getElementById('card-report-detail').innerHTML = card
}


async function onChange() {
    let start           = document.getElementsByName('date-start')
    let end             = document.getElementsByName('date-end')
    let user            = USERS.find((item) => { return item.nickname == document.getElementById('user').value })
    start               = start[0].value
    end                 = end[0].value
    let data            = {}
    
    if (start && end) {
        data['start']   = formatDate2(start)
        data['end']     = formatDate2(end)
    }
    if (user) {
        data['user']    = user.UID
    }
    if (!start && !end && !user) {
        let data            = await sqlQueriesGET('countleaves')
        let count           = await sortUsers(data)
        let card            = await templateCardReportDetail(count)
        document.getElementById('card-report-detail').removeChild(document.getElementById('card-report-main'))
        document.getElementById('card-report-detail').innerHTML   = card
    }
    let scope               = await sqlQueriesFILTER('countleavesdetailfilter', data)
    if (scope.result == 'success') {
        let count           = await sortUsers(scope.data)
        let card            = await templateCardReportDetailFilter(count, data)
        document.getElementById('card-report-detail').removeChild(document.getElementById('card-report-main'))
        document.getElementById('card-report-detail').innerHTML   = card
    } else {
    }
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


window.onscroll = function () {
    let header = document.getElementById("tr-header")
    let sticky = header.offsetTop
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
}