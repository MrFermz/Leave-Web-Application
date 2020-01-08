

function hello() {
    token()
    login()
}


function name() {
    let hello = 'hello'
    console.log(hello)
    document.getElementById('demo').innerHTML = hello
}

function token() {
    let storeToken = localStorage.getItem('token')
    document.getElementById('demo').innerHTML = storeToken
}