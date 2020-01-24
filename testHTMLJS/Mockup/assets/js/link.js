function setValue() {
    let message = getUrlParams()['message']
    let name = getUrlParams()['name']

    document.getElementById('message').innerHTML = message
    document.getElementById('name').innerHTML = name
}