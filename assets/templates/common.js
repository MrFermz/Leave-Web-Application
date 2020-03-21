var TYPE            = Number(localStorage.getItem('type'))
var NICKNAME        = localStorage.getItem('nickname')
var URL             = URLsplit()
var currentURL      = currentURL(URL)
document.title      = currentURL
function templateSidebar() {
    let markup = `
        <div id="side-container" class="side-container">
            <div id="side-bar" class="side-bar">
                <div class="menu-item-close" onclick="closeSidebar()">
                    <a class="item-close">| | |</a>
                </div>
                ${[0, 3, 4].includes(TYPE)
                        ? `<div class="menu-item-header">Management</div>
                            <input class="menu-item" type="button" value="User Manage" onclick="onUsersManage()" ${URL == 'user_manage' ? 'style="background-color: #85929E"' : ''}>
                            ${TYPE !== 4 
                                ? `<input class="menu-item" type="button" value="Leave day manage" onclick="onLeaveManage()" ${URL == 'leave_manage' ? 'style="background-color: #85929E"' : ''}>`
                                : ''}`
                        : ''}
                <div class="menu-item-header">History</div>
                <input class="menu-item" type="button" value="Leave history" onclick="onHistoryLeave()" ${URL == 'history_leave' ? 'style="background-color: #85929E"' : ''}>
                ${[0, 2, 3, 4].includes(TYPE)
                    ? `<input class="menu-item" type="button" value="Approve history" onclick="onHistoryApprove()" ${URL == 'history_approve' ? 'style="background-color: #85929E"' : ''}>`
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
    let markup = `
        <div id="header" class="header">
            <!-- <a class="side-burger-container" onclick="openSidebar()"><i class="fas fa-bars fa-2x"></i></a> -->
            <a class="side-burger-container-open" onclick="openSidebar()">| | |</a>
            <div class="header-name">${currentURL} (${NICKNAME})</div>
        </div>
        <div id="menu-top" class="menu-top">
            <input id="header-menu-home" type="button" value="Home" onclick="onHome()" ${URL == 'home' ? `style="background-color: #85929E"` : ''}>
            <input id="header-menu-leave" type="button" value="Leave" onclick="onLeave()" ${URL == 'leave' ? `style="background-color: #85929E"` : ''}>
            ${ TYPE != 1 ? `<input id="header-menu-approve" type="button" value="Approve" onclick="onApprove()" ${URL == 'approve' ? `style="background-color: #85929E"` : ''}>` : '' }
            ${[0, 3, 4].includes(TYPE) ? `<input id="header-menu-report" type="button" value="Report" onclick="onReport()" ${URL == 'report_home' || URL == 'report_detail' ? `style="background-color: #85929E"` : ''}>` : '' }
        </div>
    `
    return markup
}