const http = new XMLHttpRequest()
var username, password


function onLoad() {
    genContent()
}


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


function genContent() {
    let header          =           document.createElement('div')
    let username        =           document.createElement('input')
    let password        =           document.createElement('input')
    let submit          =           document.createElement('input')
    let token      =           document.createElement('input')

    header.innerHTML    =           'LOGIN'

    username.setAttribute('id', 'username')
    username.setAttribute('type', 'text')
    username.setAttribute('placeholder', 'Username')
    username.onchange   =           () => onChange()

    password.setAttribute('id', 'password')
    password.setAttribute('type', 'password')
    password.setAttribute('placeholder', 'Password')
    password.onchange   =           () => onChange()

    submit.setAttribute('id', 'submit')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Login')
    submit.onclick      =           () => onLogin()

    token.setAttribute('id', 'token')
    token.setAttribute('type', 'button')
    token.setAttribute('value', 'Token')
    token.onclick      =           () => checkToken()

    document.getElementById('container').appendChild(header)
    document.getElementById('container').appendChild(username)
    document.getElementById('container').appendChild(password)
    document.getElementById('container').appendChild(submit)
    document.getElementById('container').appendChild(token)
}