
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
    return window.location.href = `/src/${ref}.html`
}


// 404
function notFound() {
    return document.getElementById('container').innerHTML   =   '404 NOT FOUND'
}