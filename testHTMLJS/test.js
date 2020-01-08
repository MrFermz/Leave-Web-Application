function login() {
    const Http = new XMLHttpRequest()
    const url = 'http://localhost:9000/api/login'
    const data = JSON.stringify({ "username": "test", "password": "1234" })
    Http.open('POST', url)
    Http.setRequestHeader('Content-Type', 'application/json')
    Http.send(data)

    Http.onload = function () {
        let parse = JSON.parse(this.responseText)
        let token = localStorage.setItem('token', parse.data)
        // console.log(parse.data)
    }
}