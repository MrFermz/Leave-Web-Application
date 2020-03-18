var PERM            = [0, 1, 2, 3, 4]
var USERNAME
var PASSWORD


function onLoad() {
    let load    = templateLogin()
    document.getElementById('container').innerHTML  =   load
    if (PERM.includes(TYPE) && TOKEN) {
        changePage('home')
    }
}


function onChange() {
    USERNAME    = document.getElementById('username').value
    PASSWORD    = document.getElementById('password').value
}


function handleEnter(e) {
    if(e.keyCode === 13){
        onLogin()
    }
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