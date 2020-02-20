var TYPE            = Number(localStorage.getItem('type'))
var USERNAME        = localStorage.getItem('username')


function templateSidebar() {
    let markup = `
        <div id="side-container" class="side-container">
            <div id="side-bar" class="side-bar">
                <!-- <a class="side-burger-container" onclick="closeSidebar()"><i class="fas fa-bars fa-2x"></i></a> -->
                <div class="menu-item-close" onclick="closeSidebar()">
                    <a class="item-close">| | |</a>
                </div>
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
        </div>
    `
    return markup
}


function templateHeader() {
    let URL     = window.location.href
    URL         = URL.split('/')
    URL         = URL[URL.length - 1].split('.')[0]
    let markup = `
        <div id="header" class="header">
            <!-- <a class="side-burger-container" onclick="openSidebar()"><i class="fas fa-bars fa-2x"></i></a> -->
            <a class="side-burger-container-open" onclick="openSidebar()">| | |</a>
            <div class="header-name">${USERNAME}</div>
        </div>
        <div id="menu-top" class="menu-top">
            <input id="header-menu-home" type="button" value="Home" onclick="onHome()" ${URL == 'home' ? `style="background-color: gray"` : ''}>
            <input id="header-menu-leave" type="button" value="Leave" onclick="onLeave()" ${URL == 'leave' ? `style="background-color: gray"` : ''}>
            ${ TYPE != 1 ? `<input id="header-menu-approve" type="button" value="Approve" onclick="onApprove()" ${URL == 'approve' ? `style="background-color: gray"` : ''}>` : '' }
            ${[0, 3, 4].includes(TYPE) ? `<input id="header-menu-report" type="button" value="Report" onclick="onReport()" ${URL == 'report' ? `style="background-color: gray"` : ''}>` : '' }
        </div>
    `
    return markup
}