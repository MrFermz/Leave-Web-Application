const http              = new XMLHttpRequest()
const TOKEN             = getToken()
const config            = { host: 'localhost', port: '9000' }
// const config            = { host: '103.22.183.171', port: '9000' }

function sqlQueriesGET(path) {
    http.open('GET', `http://${config.host}:${config.port}/${path}`, true)
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
    http.open('POST', `http://${config.host}:${config.port}/${path}`, true)
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