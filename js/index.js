


function init() {

    

}

function checkToken() {
    let token = getToken()
    console.log(token)
}


function onLogout() {

    localStorage.clear()
    changePage('login')

}


function onHome() {
    changePage('home')
}


function onApprove() {
    changePage('approve')
}


function onLeave() {
    
    changePage('leave')

}


function onReport() {
    changePage('report')
}


function onCreateusers() {
    changePage('create_users')
}
