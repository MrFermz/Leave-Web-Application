const http              = new XMLHttpRequest()
var TOKEN               = getToken()
var USERNAME
var PASSWORD


function onLoad() {
    let load    = templateLogin()
    document.getElementById('container').innerHTML  =   load
}


function onChange() {
    USERNAME    = document.getElementById('username').value
    PASSWORD    = document.getElementById('password').value
}


function onLogin() {
    const data      = {
                        username    : USERNAME,
                        password    : PASSWORD
                      }
    if (USERNAME, PASSWORD) {
        http.open('POST', 'http://localhost:8081/login', true)
        http.setRequestHeader('Content-Type', 'application/json')
        http.send(JSON.stringify(data))
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let res     = JSON.parse(this.responseText)
                localStorage.setItem('type', res['type'])
                loginCheck(res['result'], res['data'])
            }
        }
    }
}


function loginCheck(result, token) {
    if (result === 'success') {
        localStorage.setItem('token', token)
        localStorage.setItem('username', USERNAME)
        changePage('home')
    }
}