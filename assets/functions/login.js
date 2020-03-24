var PERM            = [0, 1, 2, 3, 4]


function onLoad() {
    let load    = templateLogin()
    document.getElementById('container').innerHTML  =   load
    if (PERM.includes(TYPE) && TOKEN) {
        changePage('home')
    }
}


async function handleEnter(e) {
    if(e.keyCode === 13){
        await onLogin()
    }
  }


async function onLogin() {
    let username    = document.getElementById('username').value
    let password    = document.getElementById('password').value
    const data      = { username, password }
    if (username, password) {
        let res     = await sqlQueriesPOST('login', data)
        loginCheck(res)
    } else {
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