const http              = new XMLHttpRequest()
const TOKEN             = getToken()
const ENV               = CONFIG_ENV.PRODUCTION
var HOST                = ENV.HOST
var PORT                = ENV.PORT
var UPLOADER            = ENV.UPLOADER

function sqlQueriesGET(path) {
    http.open('GET', `http://${HOST}:${PORT}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data)
            }
        }
    })
}


function sqlQueriesPOST(path, data, type = '') {
    http.open('POST', `http://${HOST}:${PORT}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    if (type == 'file') {
        http.send(data)
    } else {
        http.send(JSON.stringify(data))
    }
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data)
            }
        }
    })
}