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


async function onLogin() {
    const data      = {
                        username    : USERNAME,
                        password    : PASSWORD
                      }
    if (USERNAME, PASSWORD) {
        let res     = await sqlQueriesLOGIN('login', data)
        localStorage.setItem('type', res['type'])
        loginCheck(res['result'], res['data'])
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