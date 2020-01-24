
// href params get
function getUrlParams() {
    let val = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        val[key] = value
    })
    return val
}