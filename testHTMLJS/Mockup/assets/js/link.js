const http = new XMLHttpRequest()

const dummy = {
	"username": "MrFermz",
	"password": "1234"
}

function setValue() {

    
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let data    =   JSON.parse(this.responseText)
            localStorage.setItem('token', data['data'])
            console.log(data['data'])

        }
    }
    
    http.open('POST', 'http://localhost:8081/login', true)
    
    http.setRequestHeader('Content-Type', 'application/json')
    
    http.send(JSON.stringify(dummy))


}

function feed() {

    let token       =   localStorage.getItem('token')
    console.log(token)

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let data    =   JSON.parse(this.responseText)
            console.log(data)

        }
    }
    
    http.open('GET', 'http://localhost:8081/feed', true)

    http.setRequestHeader('x-access-token', token)

    http.send()
}