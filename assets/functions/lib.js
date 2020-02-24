
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
    const oneDay        = 24 * 60 * 60 * 1000
    let result          = Math.round(Math.abs((start - end) / oneDay))
    return result + 1
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