function init() {
    console.log('index Loaded.')
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


function onUsersManage() {
    changePage('user_manage')
}


function onLeaveManage() {
    changePage('leave_manage')
}


function openSidebar() {
    document.getElementById("side-bar").style.display = "block"
}

  
function closeSidebar() {
    document.getElementById("side-bar").style.display = "none"
}