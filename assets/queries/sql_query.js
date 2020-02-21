var http            = new XMLHttpRequest()  
var TOKEN           = getToken()
const config        = { host: 'localhost', port: '8081' }

function sqlQueriesGET(path) {
    http.open('GET', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data.data)
            }
        }
    })
}


function sqlQueriesPOST(path, data) {
    http.open('POST', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send(JSON.stringify(data))
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data.result)
            }
        }
    })
}


function sqlQueriesLOGIN(path, data) {
    http.open('POST', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send(JSON.stringify(data))
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data)
            }
        }
    })
}


function sqlQueriesLEAVEDAYS(path, id) {
    http.open('GET', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.setRequestHeader('leaveDaysID', id)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data.data)
            }
        }
    })
}


function sqlQueriesLEAVE(path, data) {
    http.open('POST', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send(JSON.stringify(data))
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data)
            }
        }
    })
}


function queryUploader(path, file) {
    console.log(file)
    http.open('POST', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send(file)
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data)
            }
        }
    })
}


function sqlQueriesAPPROVER(path, uid) {
    http.open('GET', `http://${config.host}:${config.port}/${path}`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.setRequestHeader('uid', uid)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data.data)
            }
        }
    })
}