const CONFIG_ENV = {
    PRODUCTION: {
        HOST     : "localhost",
        PORT     : "9000",
        UPLOADER : "../uploads/"
    },
    DEVELOPMENT: {
        HOST     : "192.168.1.6",
        PORT     : "9000",
        UPLOADER : "../../uploads/"
    }
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
    changePage('report_home')
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

function onReportDetail() {
    changePage('report_detail')
}


function openSidebar() {
    document.getElementById("side-container").style.display = 'block'
}

  
function closeSidebar() {
    document.getElementById("side-container").style.display = 'none'
}


window.onmouseover = function (event) {
    let side                    = document.getElementById('side-container')
    if (event.target == side) {
        side.style.display      = 'none'
    }
}


function onHistoryLeave() {
    changePage('history_leave')
}


function onHistoryApprove() {
    changePage('history_approve')
}