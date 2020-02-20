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
        document.getElementById('message').innerHTML = USERNAME
        http.open('POST', 'http://192.168.42.134:8081/login', true)
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
    else {
        document.getElementById('message').innerHTML    = 'incorrect.'
        document.getElementById('message').style.color  = 'red'
    }
}


function loginCheck(result, token) {
    if (result === 'success') {
        localStorage.setItem('token', token)
        localStorage.setItem('username', USERNAME)
        changePage('home')
    } else {
        document.getElementById('message').innerHTML    = 'Username or Password incorrect.'
        document.getElementById('message').style.color  = 'red'
    }
}