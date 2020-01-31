
const http = new XMLHttpRequest()



var username, password


function onChange() {

    username        =       document.getElementById('username').value
    password        =       document.getElementById('password').value

    // console.log(username, password)
}


function onLogin() {


    const data  =   {

                        username        :       username,
                        password        :       password

                    }

    console.log(data)
    if (username, password) {


        http.onreadystatechange = function () {
            
            if (this.readyState === 4 && this.status === 200) {

                let res     =       JSON.parse(this.responseText)

                loginCheck(res['result'], res['data'])


            }

        }

        http.open('POST', 'http://localhost:8081/login', true)

        http.setRequestHeader('Content-Type', 'application/json')

        http.send(JSON.stringify(data))


    }

}


function loginCheck(result, token) {


    console.log(result, token)

    localStorage.setItem('token', token)

    if (result === 'success') {

        localStorage.setItem('token', token)
        changePage('home')


    } else {

        

    }

}


function init() {


}