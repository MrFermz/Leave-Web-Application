var TYPE            = Number(localStorage.getItem('type'))
var USERNAME        = localStorage.getItem('username')

function templateLogin() {
    let markup  = `
        <div>LOGIN</div>
        <input id="username" type="text" placeholder="Username" onchange="onChange()">
        <input id="password" type="password" placeholder="Password" onchange="onChange()">
        <input id="submit" type="submit" value="Login" onclick="onLogin()">
        <input id="token" type="button" value="Token" onclick="checkToken()">
    `
    return markup
}


function templateSidebar() {
    let markup = `
        <div id="side-bar" class="side-bar">
            <input id="side-close" class="close" type="button" value="x" onclick="closeSidebar()">
            ${[0, 3].includes(TYPE) 
                    ? `<div class="menu-item-header">Management</div>
                        <input class="menu-item" type="button" value="User Manage" onclick="onUsersManage()">
                        <input class="menu-item" type="button" value="Leave day manage" onclick="onLeaveManage()">`
                    : ''}
           
            <div class="menu-item-header">Others</div>
            ${[0].includes(TYPE)
                    ? `<input class="menu-item" type="button" value="Token" onclick="checkToken()">`
                    : ''}
            <input class="menu-item" type="button" value="Logout" onclick="onLogout()">
        </div>
    `
    return markup
}


function templateHeader() {
    // console.log(TYPE)
    let markup = `
        <div id="header" class="header">
            ${USERNAME}
            <input id="side-open" class="open" type="button" value="side-menu" onclick="openSidebar()">
        </div>
        <div id="menu-top">
            <input type="button" value="Home" onclick="onHome()">
            <input type="button" value="Leave" onclick="onLeave()">
            ${ TYPE != 1 ? `<input type="button" value="Approve" onclick="onApprove()">` : '' }
            ${[0, 3, 4].includes(TYPE) ? `<input type="button" value="Report" onclick="onReport()">` : '' }
        </div>
    `
    return markup
}