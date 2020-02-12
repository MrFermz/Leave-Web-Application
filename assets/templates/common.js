var TYPE            = localStorage.getItem('type')
var USERNAME        = localStorage.getItem('username')
let LEAVE_TYPE      = ['sick', 'business', 'vacation', 'substitution']

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
    let markup
    if (TYPE == 0) {
        markup = `
            <div id="side-bar" class="side-bar">
                <input id="side-close" class="close" type="button" value="x" onclick="closeSidebar()">
                <input type="button" value="Logout" onclick="onLogout()">
                <input type="button" value="Token" onclick="checkToken()">
                <input type="button" value="User Manage" onclick="onUsersManage()">
            </div>
        `
    } else {
        markup = `
            <div id="side-bar" class="side-bar">
                <input id="side-close" class="close" type="button" value="x" onclick="closeSidebar()">
                <input type="button" value="Logout" onclick="onLogout()">
            </div>
        `
    }
    return markup
}


function templateHeader() {
    let markup = `
        <div id="header" class="header">
            ${USERNAME}
            <input id="side-open" class="open" type="button" value="side-menu" onclick="openSidebar()">
        </div>
        <div id="menu-top">
            <input type="button" value="Home" onclick="onHome()">
            <input type="button" value="Approve" onclick="onApprove()">
            <input type="button" value="Leave" onclick="onLeave()">
            <input type="button" value="Report" onclick="onReport()">
        </div>
    `
    return markup
}


function templateCardHome(list, cardType) {
    let markup
    if (cardType == 'leave') {
        markup = `
            <div id="card-leave" class="card center">
                <div id="sick-value">sick: ${list.sick_remain} / ${list.sick}</div>
                <div id="business-value">business: ${list.business_remain} / ${list.business}</div>
                <div id="vacation-value">vacation: ${list.vacation_remain} / ${list.vacation}</div>
                <div id="substitution-value">substitution: ${list.substitution_remain} / ${list.substitution}</div>
            </div>
        `
    } else if (cardType == 'pending') {
        markup = `
            <div id="card-pending" class="card center">
                <div id="pending-value">pending: ${list.cnt}</div>
            </div>
        `
    }
    return markup
}


function templateCardApprove(list) {
    let markup = ``
    list.forEach((ele, i) => {
        let fragment = ``
        if (ele.leaveType == 'sick' || ele.leaveType == 'business') {
            fragment = `
                <div id="card-${i}" class="card center">
                    <div id="nick-name-${i}">Nickname: ${ele.nickname}</div>
                    <div id="employee-id-${i}">ID: ${ele.empID}</div>
                    <div id="leave-type-${i}">Leave Type: ${ele.leaveType}</div>
                    <div id="date-start-${i}">Date Start: ${ele.dateStart}</div>
                    <div id="date-end-${i}">Date End: ${ele.dateEnd}</div>
                    <div id="reasons-${i}">Reasons: ${ele.reasons}</div>
                    <input type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                    <input type="button" value="Reject">
                </div>
            `
        } else {
            fragment = `
                <div id="card-${i}" class="card center">
                    <div id="nick-name-${i}">Nickname: ${ele.nickname}</div>
                    <div id="employee-id-${i}">ID: ${ele.empID}</div>
                    <div id="leave-type-${i}">Leave Type: ${ele.leaveType}</div>
                    <div id="date-start-${i}">Date Start: ${ele.dateStart}</div>
                    <div id="date-end-${i}">Date End: ${ele.dateEnd}</div>
                    <input type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                    <input type="button" value="Reject">
                </div>
            `
        }
        markup += fragment
    })
    return markup
}


function templateFilterReport() {
    let ui          = ['Sick', 'Vacation', 'Business', 'Substitution']
    let markup      = `
        <div id="filter-card" class="card center">
            Start: <input id="date-start" type="date"><br>
            End: <input id="date-end" type="date">
            <div id="filter-summary">SUMMARY</div>
            <ul id="filter-ul">
                ${ui.map((ele, i) => { return `<li id="filter-li-${i}">${ele}</li>` }).join("")}
            </ul>
        </div>
    `
    return markup
}


function templateTableReport(headers, content) {
    let markup  = `
        <div>
            <table id="table" class="table center">
                <tr id="tr-header">
                    ${headers.map((ele, i) => { return `<th id="th-${i}">${ele}</th>` }).join("")}
                </tr>
                ${content.map((ele, i) => { return (
                `<tr id="tr-content-${i}">
                    <td id="td-no-${i}">${i + 1}</td>
                    <td id="td-name-${i}">${ele.UID}</td>
                    <td id="td-sick-${i}">${ele.sick}</td>
                    <td id="td-business-${i}">${ele.business}</td>
                    <td id="td-vacation-${i}">${ele.vacation}</td>
                    <td id="td-substitution-${i}">${ele.substitution}</td>
                </tr>`
                )}).join("")}
            </table>
        </div>
    `
    return markup
}


function templateLeaveSelector() {
    let markup      = `
        <div id="leave-type-bar">
            ${LEAVE_TYPE.map((ele, i) => { return (
                `<input id="leave-select-${i}" class="leave-select" type="radio" name="leaveType" onchange="onChangeLeaveType()" value="${ele}" ${ ele == 'sick' ? `checked="checked"` : `` }>
                <label>${ele}</label>`
            )}).join("")}
        </div>
    `
    return markup
}


function templateCardLeave() {
    let markup      = `
        <div id="leave-card-container" class="leave-card">
            ${LEAVE_TYPE.map((ele, i) => { return (
                `<div id="leave-card-${ele}" class="card center ${ele}">
                    <h3 id="label-${ele}">${ele}</h3>
                    Start: <input type="date" name="date-start-${ele}" onchange="onChange()"><br>
                    End: <input type="date" name="date-end-${ele}" onchange="onChange()">
                    ${ele == 'sick' || ele == 'business' ? `
                        <input type="file" id="upload" onchange="files = document.getElementById('upload').files">
                        <input type="button" id="upload-submit" value="Upload" onclick="onSubmitFile()">
                        Reasons: <input type="text" name="reasons-${ele}" placeholder="Reasons" onchange="onChange()">
                    ` : ``}
                    <input type="button" value="Submit" onclick="onSubmit()">
                </div>`
            )}).join("")}
        </div>
    `
    return markup
}


function templateMenuManage() {
    let markup      = `
        <input type="button" id="create-users" value="Create user" onclick="onCreateusers()">
    `
    return markup
}


function templateTableManage(headers, content) {
    let markup      = `
        <table id="table-users" class="center">
            <tr id="tr-header">
                ${headers.map((ele, i) => { return `<th id="th-${i}">${ele}</th>` }).join("")}
            </tr>
            ${content.map((ele, i) => { return(
                `<tr id="tr-content-${i}" onclick="onEdit(${ele.UID})">
                    <td id="td-no-${i}">${i + 1}</td>
                    <td id="td-username-${i}">${ele.firstname} ${ele.lastname} (${ele.nickname})</td>
                    <td id="td-type-${i}">${ typeCompare(ele, LISTSTYPE) }</td>
                </tr>`
            )}).join("")}
        </table>
    `
    return markup
}


function templateEditManage() {
    let markup      = `
        <div id="modal-container" class="modal-container" onclick="toggleModal()">
            <div id="modal-content" class="modal-content">
            </div>
        </div>
    `
    return markup
}