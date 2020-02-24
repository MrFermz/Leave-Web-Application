var USERS

function onLoad() {
    if (TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let data            = await sqlQueriesGET('countleavesfilterdefault')
    let count           = await sortUsers(data)
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let users           = await sqlQueriesGET('listsusers')
    USERS               = users
    let filter          = await templateFilterReport(users)
    let card            = await templateCardReport(count)
    let markup          = sidebar + header + filter
    document.getElementById('container').innerHTML = markup
    document.getElementById('card-report-home').innerHTML = card
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
        let data            = await sqlQueriesGET('countleavesfilterdefault')
        let count           = await sortUsers(data)
        let card            = await templateCardReport(count)
        document.getElementById('card-report-home').removeChild(document.getElementById('card-report-main'))
        document.getElementById('card-report-home').innerHTML   = card
    }
    let scope               = await sqlQueriesFILTER('countleavesfilter', data)
    if (scope.result == 'success') {
        let count           = await sortUsers(scope.data)
        let card            = await templateCardReportFilter(count, data)
        document.getElementById('card-report-home').removeChild(document.getElementById('card-report-main'))
        document.getElementById('card-report-home').innerHTML   = card
    } else {
    }
}


function sortUsers(lists) {
    let data                = []
    return new Promise(function (resolve, reject) {
        let username            = ''
        let sick                = 0
        let vacation            = 0
        let business            = 0
        let substitution        = 0
        for (const ele of lists) {
            username            = ele.username
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
        data.push({ username, sick, vacation, business, substitution })
        resolve(data)
    })
}


async function toggleCards() {
    let card    = await templateCardReportDetail()
    document.getElementById('card-report-home').removeChild(document.getElementById('card-report-main'))
    document.getElementById('card-report-home').innerHTML   = card
}


async function backToHome() {
    let data            = await sqlQueriesGET('countleavesfilterdefault')
    let count           = await sortUsers(data)
    let card            = await templateCardReport(count)
    document.getElementById('card-report-home').removeChild(document.getElementById('card-report-detail'))
    document.getElementById('card-report-home').innerHTML   = card
}


function onDetail() {
    toggleCards()
}