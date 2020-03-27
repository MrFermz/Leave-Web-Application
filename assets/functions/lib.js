
// href params get
function getUrlParams() {
    let val = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        val[key] = value
    })
    return val
}


// check token
function getToken() {
    return localStorage.getItem('token')
}


// change page
function changePage(ref) {
    return window.location.href = `${ref}.html`
}


// 404
function notFound() {
    return document.getElementById('container').innerHTML   = '404 NOT FOUND'
}


function typeCompare(ele, type) {
    for (const value of type) {
        if (value.typeID == ele.typeID) {
            return typeName    = value.typeName
        }
    }
}


function rangeDays(start, end) {
    let START       = new Date(start)
    let END         = new Date(end)
    let newDays     = 0
    let count       = 0
    let newStartDate= ''
    const oneDay    = 24 * 60 * 60 * 1000
    let days        = Math.round(Math.abs((start - end) / oneDay) + 1)
    if (START > END) {
        return -1
    } else {
        for (let i = 0; i < days; i++) {
            newStartDate    = new Date(START.setDate(START.getDate() + count))
            let START_DAY   = newStartDate.getDay()
            if ((START_DAY !== 0 && START_DAY !== 6)) {
                newDays++
            }
            if (count === 0) {
                count = 1
            }
        }
        return newDays
    }
}


function formatDate(date) {
    const days              = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months            = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let DATE                = new Date(date)
    let DATE_day_short      = days[DATE.getDay()]
    let DATE_day            = DATE.getDate()
    let DATE_month          = DATE.getMonth()
    let DATE_month_short    = months[DATE_month]
    let DATE_year           = DATE.getUTCFullYear()
    DATE_final              = `${DATE_day_short} ${DATE_day} ${DATE_month_short} ${DATE_year}`
    return DATE_final
}


function formatDate2(date) {
    let DATE                = new Date(date)
    let DATE_day            = DATE.getDate()
    let DATE_month          = DATE.getMonth() + 1
    let DATE_year           = DATE.getUTCFullYear()
    DATE_final              = `${DATE_year}-${DATE_month}-${DATE_day}`
    return DATE_final
}


function URLsplit() {
    let URL             = window.location.href
    URL                 = URL.split('/')
    URL                 = URL[URL.length - 1].split('.')[0]
    return URL
}


function defaultFilter() {
    let now         = new Date()
    let future      = new Date(now.setDate(now.getDate() - 31))
    let today       = new Date()
    dateStart       = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    dateEnd         = `${future.getFullYear()}-${future.getMonth() + 1}-${future.getDate()}`
    return { dateStart, dateEnd }
}


function matchDay(day) {
    const days      = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let today       = new Date(day)
    let week        = today.getDay()
    return days[week]
}


function currentURL(URL) {
    let header = ''
    switch (URL) {
        case 'home'             : header = 'Home'; break
        case 'leave'            : header = 'Leave'; break
        case 'approve'          : header = 'Approve'; break
        case 'report_home'      : header = 'Report Home'; break
        case 'report_detail'    : header = 'Report Detail'; break
        case 'user_manage'      : header = 'User Management'; break
        case 'create_users'     : header = 'User Create'; break
        case 'leave_manage'     : header = 'Leave Capacity Management'; break
        case 'history_leave'    : header = 'Leave History'; break
        case 'history_approve'  : header = 'Approve History'; break
        default: break
    }
    return header
}


function formatDefaultDate(year, month, day) {
    let YEAR = year, MONTH = month, DAY = day
    if (month.length == 1) {
        MONTH = `0${month}`
    } 
    if (day.length == 1) {
        DAY = `0${day}`
    }
    let date = `${YEAR}-${MONTH}-${DAY}`
    return date
}


function leaveRemain() {
    let data            = {}
    let leavecount      = localStorage.getItem('leaveCount')
    let leavecapacity   = localStorage.getItem('leaveCapacity')
    leavecount          = JSON.parse(leavecount)
    leavecapacity       = JSON.parse(leavecapacity)

    let sick            = leavecapacity.sick - leavecount.sick
    let busi            = leavecapacity.business - leavecount.business
    let vaca            = leavecapacity.vacation - leavecount.vacation
    let subs            = leavecount.substitutionMax - leavecount.substitution

    data['leavecountID']= leavecount.leavecountID
    data['sick']        = sick
    data['business']    = busi
    data['vacation']    = vaca
    data['substitution']= subs

    return data
}