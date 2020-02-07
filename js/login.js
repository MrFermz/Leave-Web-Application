
const http = new XMLHttpRequest()
var username, password


function onChange() {
    username        =       document.getElementById('username').value
    password        =       document.getElementById('password').value
}


function onLogin() {
    const data  =   {
                        username        :       username,
                        password        :       password
                    }

    if (username, password) {
        http.open('POST', 'http://localhost:8081/login', true)
        http.setRequestHeader('Content-Type', 'application/json')
        http.send(JSON.stringify(data))
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let res     =       JSON.parse(this.responseText)
                localStorage.setItem('type', res['type'])
                loginCheck(res['result'], res['data'])
            }
        }
    }
}


function loginCheck(result, token) {
    if (result === 'success') {
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        changePage('home')
    }
}


function init() {


}