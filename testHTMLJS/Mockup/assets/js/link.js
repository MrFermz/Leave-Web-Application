const http = new XMLHttpRequest()

function setValue() {
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = this.responseText
            let list = []
            list.push(data)
            console.log(list)
            // document.getElementById('message').innerHTML = list
        }
    }
    http.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true)
    http.send()
    // http.get('https://reqres.in/api/users', (res) => {
    //     let data = '';

    //     // called when a data chunk is received.
    //     res.on('data', (chunk) => {
    //         data += chunk;
    //     });

    //     // called when the complete response is received.
    //     res.on('end', () => {
    //         console.log(JSON.parse(data));
    //     });

    // }).on("error", (err) => {
    //     console.log("Error: ", err.message);
    // });
}