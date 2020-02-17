var TYPE            = Number(localStorage.getItem('type'))
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
    console.log(TYPE)
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


function templateCardHome(list, cardType, leaveMax) {
    let markup
    if (cardType == 'leave') {
        markup = `
            <div id="card-leave" class="card center">
                <div id="sick-value">sick: ${list.sick} / ${leaveMax[0].sick}</div>
                <div id="business-value">business: ${list.business} / ${leaveMax[0].business}</div>
                <div id="vacation-value">vacation: ${list.vacation} / ${leaveMax[0].vacation}</div>
                <div id="substitution-value">substitution: ${list.substitution} / ${list.substitution_max}</div>
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
    let length = list.length
    if (list.length > 10) {
        length = 10
    }
    if (list.length == 0) {
        markup = `<div>No more leave.</div>`
    }
    for (let i = 0; i < length; i++) {
        const ele   = list[i]
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
                    <img ${ele.img ? `src="/api/uploads/${ele.img}"` : ''} width="40%">
                    <div id="input-container">
                        <input type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                        <input type="button" value="Reject">
                    </div>
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
    }
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
                `<input id="leave-select-${ele}" class="leave-select" type="radio" name="leaveType" onchange="onChangeLeaveType()"
                    value="${ele}" ${ ele == 'sick' ? `checked="checked"` : `` }>
                <label id="leave-label-${ele}">${ele}</label>`
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
                        <input type="file" id="upload-${ele}" onchange="FILES = document.getElementById('upload-${ele}').files">
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
        <div id="modal-container" class="modal-container" onclick="toggleModal()"></div>
    `
    return markup
}


function templateTableManage(headers, content) {
    let markup      = `
        <table id="table-users" class="center">
        <thead>
            <tr id="tr-header">
                ${headers.map((ele, i) => { return `<th id="th-${i}">${ele}</th>` }).join("")}
            </tr>
        </thead>
        <tbody>
            ${content.map((ele, i) => { return(
                `<tr id="tr-content-${i}" class="tr-content" onclick="onEdit(${ele.UID})">
                    <td id="td-no-${i}">${i + 1}</td>
                    <td id="td-username-${i}">${ele.firstname} ${ele.lastname} (${ele.nickname})</td>
                    <td id="td-type-${i}">${ typeCompare(ele, LISTSTYPE) }</td>
                </tr>`
            )}).join("")}
        </tbody>
        </table>
    `
    return markup
}


function templateEditManage(content, listsType, department, approver, subsMax) {
    let apprArray   = ''
    let markup      = `
        ${content.map(ele => { return(
            `<div id="modal-content" class="modal-content">
                <div id="modal-empid-container">
                    <input id="modal-employee-id" value="${ele.empID}" onchange="onChangeEdit()" type="number">
                    </div>
                <div id="modal-name-container">
                    <input id="modal-first-name" value="${ele.firstname}" onchange="onChangeEdit()">
                    <input id="modal-last-name" value="${ele.lastname}" onchange="onChangeEdit()">
                    <input id="modal-nickname" value="${ele.nickname}" onchange="onChangeEdit()">
                </div>
                <div id="modal-select-container">
                    <select id="modal-user-type" onchange="onChangeEdit()">
                        ${listsType.map(type => { return(
                            `<option value="${type.id}" ${ele.typeID == type.id ? `selected="${ele.typeID}"` : ''}>${type.name}</option>`
                        )}).join("")}
                    </select>
                    <select id="modal-dept-type" onchange="onChangeEdit()">
                        ${department.map(dept => { return(
                            `<option value="${dept.id}" ${ele.departmentID == dept.id ? `selected="${ele.deptID}"` : ''}>${dept.name}</option>`
                        )}).join("")}
                    </select>
                    <input id="modal-approver" list="modal-approver-lists" onchange="onChangeEdit()" autocomplete="off" ${approver.map(appr => { return(
                            ele.approverID == appr.approverID ? `value="${appr.username}"` : ''
                        )}).join("")}>
                        ${approver.map(appr => { apprArray += `<option id="modal-approver-options" data="${appr.approverID}" value="${appr.username}">` }).join("")}
                        <datalist id="modal-approver-lists">${apprArray}</datalist>
                    </div>
                    <div id="modal-subs-max-container">
                        <input id="modal-subs-max" type="number" min="0" value="${subsMax}" onchange="onChangeEdit()">
                    </div>
                <input id="modal-submit" value="Submit" type="button" onclick="onSubmit(${ele.UID})">
            </div>`
        )})}
    `
    return markup
}


function templateCreateUsers(deptList, typeList, apprList) {
    let apprArray   = ''
    let markup      = `
        <div id="empid-container">
            <input id="empID" type="text" placeholder="Employee ID" onchange="onChangeCreate()">
        </div>
        <div id="name-container">
            <input id="firstname" type="text" placeholder="Firstname" onchange="onChangeCreate()">
            <input id="lastname" type="text" placeholder="Lastname" onchange="onChangeCreate()">
            <input id="nickname" type="text" placeholder="Nickname" onchange="onChangeCreate()">
        </div>
        <div id="user-pwd-container">
            <input id="username" type="text" placeholder="Username" onchange="onChangeCreate()">
            <input id="password" type="password" placeholder="Password" onchange="onChangeCreate()">
        </div>
        <div id="select-container">
            <select id="deptSelect" onchange="onChangeCreate()">
                <option value="" disabled selected>-</option>
                ${deptList.map(dept => { return `<option value="${dept.id}">${dept.name}</option>`}).join("")}
            </select>
            <select id="typeSelect" onchange="onChangeCreate()">
                <option id="typeOptions" value="" disabled selected>-</option>
                ${typeList.map(type => { return `<option value="${type.id}">${type.name}</option>`}).join("")}
            </select>
            <input id="approverID" list="approverlists" onchange="onChangeCreate()">
            ${apprList.map(appr => { apprArray += `<option data=${appr.UID} value=${appr.username}>`}).join("")}
            <datalist id="approverlists">${apprArray}</datalist>
        </div>
        <input id="create" type="button" value="Create" onclick="onCreate()">
    `
    return markup
}


function templateLeaveMax(max) {
    let MAX         = max[0]
    let markup      = `
        <div>
            Sick: <input id="max-sick" type="number" value="${MAX.sick}" onchange="onChange()">
        </div>
        <div>
            Business: <input id="max-business" type="number" value="${MAX.business}" onchange="onChange()">
        </div>
        <div>
            Vacation: <input id="max-vacation" type="number" value="${MAX.vacation}" onchange="onChange()">
        </div>
        <div><input type="button" value="Submit" onclick="onSubmit(${MAX.id})"></div>
    `
    return markup
}