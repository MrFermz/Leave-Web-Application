var http            = new XMLHttpRequest()  
var TOKEN           = getToken()

function sqlQueriesGET(path) {
    http.open('GET', `http://localhost:8081/${path}`, true)
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
    http.open('POST', `http://localhost:8081/${path}`, true)
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


