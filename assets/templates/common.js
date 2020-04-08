var TYPE            = Number(localStorage.getItem('type'))
var NICKNAME        = localStorage.getItem('nickname')
var URI             = URLsplit()
var currentURL      = currentURL(URI)
document.title      = currentURL
var TYPE_NAME       = ['admin', 'employee', 'supervisor', 'hr', 'producer']
function templateSidebar() {
    let markup = `
        <div id="side-container" class="side-container">
            <div id="side-bar" class="side-bar">
                <div>
                    <div class="menu-item-close" onclick="closeSidebar()">
                        <a class="item-close">| | |</a>
                    </div>
                    <div>
                        ${NICKNAME} [${TYPE_NAME[TYPE][0].toUpperCase() + TYPE_NAME[TYPE].slice(1)}]
                    </div>
                    <div>
                        ${[0, 3, 4].includes(TYPE)
                            ? `<div class="menu-item-header">Management</div>
                                <input class="menu-item" type="button" value="User Manage" onclick="onUsersManage()" ${URI == 'user_manage'|| URI == 'create_users' ? 'style="background-color: #85929E"' : ''}>
                                ${TYPE !== 4 
                                    ? `<input class="menu-item" type="button" value="Leave capacity manage" onclick="onLeaveManage()" ${URI == 'leave_manage' ? 'style="background-color: #85929E"' : ''}>`
                                    : ''}`
                            : ''}
                    </div>
                    <div>
                        <div class="menu-item-header">History</div>
                        <input class="menu-item" type="button" value="Leave history" onclick="onHistoryLeave()" ${URI == 'history_leave' ? 'style="background-color: #85929E"' : ''}>
                        ${[0, 2, 3, 4].includes(TYPE)
                            ? `<input class="menu-item" type="button" value="Approve history" onclick="onHistoryApprove()" ${URI == 'history_approve' ? 'style="background-color: #85929E"' : ''}>`
                            : ''}
                    </div>
                </div>
                <div>
                    ${[0].includes(TYPE)
                        ? `<!--<input class="menu-item" type="button" value="Token" onclick="checkToken()">-->`
                        : ''}
                    <input class="menu-item logout" type="button" value="LOGOUT" onclick="onLogout()">
                </div>
            </div>
        </div>
    `
    return markup
}


function templateHeader() {
    let markup = `
        <div id="header" class="header">
            <a class="side-burger-container-open" onclick="openSidebar()">| | |</a>
            <div class="header-name">${currentURL}</div>
        </div>
        <div id="menu-top" class="menu-top">
            <input id="header-menu-home" type="button" value="Home" onclick="onHome()" ${URI == 'home' ? `style="background-color: #85929E"` : ''}>
            <input id="header-menu-leave" type="button" value="Leave" onclick="onLeave()" ${URI == 'leave' ? `style="background-color: #85929E"` : ''}>
            ${ TYPE != 1 ? `<input id="header-menu-approve" type="button" value="Approve" onclick="onApprove()" ${URI == 'approve' ? `style="background-color: #85929E"` : ''}>` : '' }
            ${[0, 3, 4].includes(TYPE) ? `<input id="header-menu-report" type="button" value="Report" onclick="onReport()" ${URI == 'report_home' || URI == 'report_detail' ? `style="background-color: #85929E"` : ''}>` : '' }
        </div>
    `
    return markup
}