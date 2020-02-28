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
        let res     = await sqlQueriesPOST('login', data)
        loginCheck(res)
    } 
    else {
        document.getElementById('message').innerHTML    = 'incorrect.'
    }
}


function loginCheck(result) {
    let data    = result.data
    if (result.result === 'success') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('type', data.type)
        localStorage.setItem('nickname', data.nickname)
        changePage('home')
    } else {
        document.getElementById('message').innerHTML    = 'Username or Password incorrect.'
    }
}