function templateMenuManage() {
    let markup      = `
        <div id="card-user-detail"></div>
        <div id="modal-container" class="modal-container"></div>
    `
    return markup
}


function templateTableManage(content, filter) {
    let usersArray  = ''
    let headers     = ['#', 'name', 'user type']
    let markup      = ''
    if (filter !== 'filter') {
        markup      = `
            <div class="container-sub">
                <div class="container-button">
                    <div class="container-users">
                        <input id="user" class="filter-users" list="users" onchange="onChange()" autocomplete="off">
                        ${content.map(user => { usersArray += `<option data=${user.UID} value="${user.nickname}">(${user.empID}) ${user.firstname} ${user.lastname}</option>` }).join("")}
                        <datalist id="users">${usersArray}</datalist>
                    </div>
                    ${TYPE !== 4 
                        ? `<div class="button-create" id="create-users" onclick="onCreateusers()">
                                <img src="../assets/images/add.svg">
                            </div>` 
                        : ''}
                    
                </div>
                <div id="table-card" class="card2 center">
                    <table id="table-users" class="table-manage">
                    <thead>
                        <tr id="tr-header">
                            ${headers.map((ele, i) => { return `<th id="th-${i}">${ele.charAt(0).toUpperCase() + ele.slice(1)}</th>` }).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${content.map((ele, i) => { return(
                            `<tr id="tr-content-${i}" class="tr-content ${i % 2 == 0 ? 'tr-odd' : ''}" onclick="onEdit(${ele.UID})">
                                <td id="td-no-${i}">${i + 1}</td>
                                <td id="td-name">
                                    <div class="name">
                                        <div id="td-fname" class="td-fname">${ele.firstname}</div>
                                        <div id="td-lname" class="td-lname">${ele.lastname}</div>
                                        <div id="td-nickname" class="td-nickname">(${ele.nickname})</div>
                                    </div>
                                </td>
                                <td id="td-type-${i}">${ typeCompare(ele, LISTSTYPE.data) }</td>
                            </tr>`
                        )}).join("")}
                    </tbody>
                    </table>
                </div>
            </div>
        `
    } else {
        markup      = `
            <table id="table-users" class="table-manage">
            <thead>
                <tr id="tr-header">
                    ${headers.map((ele, i) => { return `<th id="th-${i}">${ele.charAt(0).toUpperCase() + ele.slice(1)}</th>` }).join("")}
                </tr>
            </thead>
            <tbody>
                ${content.map((ele, i) => { return(
                    `<tr id="tr-content-${i}" class="tr-content ${i % 2 == 0 ? 'tr-odd' : ''}" onclick="onEdit(${ele.UID})">
                        <td id="td-no-${i}">${i + 1}</td>
                        <td id="td-name">
                            <div class="name">
                                <div id="td-fname" class="td-fname">${ele.firstname}</div>
                                <div id="td-lname" class="td-lname">${ele.lastname}</div>
                                <div id="td-nickname" class="td-nickname">(${ele.nickname})</div>
                            </div>
                        </td>
                        <td id="td-type-${i}">${ typeCompare(ele, LISTSTYPE.data) }</td>
                    </tr>`
                )}).join("")}
            </tbody>
            </table>
        `
    }
    return markup
}


function templateEditManage(content, listsType, department, approver, subsMax, appr) {
    let apprArray   = ''
    let markup      = `
        ${content.map(ele => { return(
            `<div id="modal-content" class="card center modal-content">
                <div class="modal-input">
                    <label>Employee ID <span>*</span></label>
                    <input id="modal-employee-id" placeholder="Employee ID (1-20 character)" value="${ele.empID}" onchange="onChangeEdit()" type="text" ${TYPE == 4 ? 'disabled' : ''} onkeypress="if(this.value.length==20) return false;">
                </div>
                <div class="modal-input">
                    <label>Firstname <span>*</span></label>
                    <input id="modal-first-name" value="${ele.firstname}" onchange="onChangeEdit()" type="text" ${TYPE == 4 ? 'disabled' : ''}>
                </div>
                <div class="modal-input">
                    <label>Lastname <span>*</span></label>
                    <input id="modal-last-name" value="${ele.lastname}" onchange="onChangeEdit()" type="text" ${TYPE == 4 ? 'disabled' : ''}>
                </div>
                <div class="modal-input">
                    <label>Nickname <span>*</span></label>
                    <input id="modal-nickname" value="${ele.nickname}" onchange="onChangeEdit()" type="text" ${TYPE == 4 ? 'disabled' : ''}>
                </div>
                <div class="modal-input">
                    <label>User Type <span>*</span></label>
                    <select id="modal-user-type" onchange="onChangeEdit()" ${TYPE == 4 ? 'disabled' : ''}>
                        <option value="" disabled selected>-</option>
                        ${listsType.map(type => { return(
                            `<option value="${type.typeID}" ${ele.typeID == type.typeID ? `selected="${ele.typeID}"` : ''}>${type.typeName}</option>`
                        )}).join("")}
                    </select>
                </div>
                <div class="modal-input">
                    <label>Department <span>*</span></label>
                    <select id="modal-dept-type" onchange="onChangeEdit()" ${TYPE == 4 ? 'disabled' : ''}>
                        <option value="" disabled selected>-</option>
                        ${department.map(dept => { return(
                            `<option value="${dept.deptID}" ${ele.deptID == dept.deptID ? `selected="${ele.deptID}"` : ''}>${dept.deptName}</option>`
                        )}).join("")}
                    </select>
                </div>
                <div class="modal-input">
                    <label>Approver <span>*</span></label>
                    <input class="modal-datalist" id="modal-approver" list="modal-approver-lists" onchange="onChangeEdit()" autocomplete="off" ${approver.map(appr => { return(
                        ele.approverID == appr.approverID ? `value="${appr.nickname}"` : ''
                    )}).join("")} ${TYPE == 4 ? 'disabled' : ''}>
                    ${approver.map(appr => { apprArray += `<option id="modal-approver-options" data="${appr.approverID}" value="${appr.nickname}">(${appr.empID}) ${appr.firstname} ${appr.lastname}</option>` }).join("")}
                    <datalist id="modal-approver-lists">${apprArray}</datalist>
                </div>
                <div class="modal-input">
                    <label>Subsitution </label>
                    <input id="modal-subs-max" type="number" placeholder="(1-99)" min="0" max="99" onkeypress="if(this.value.length==2) return false; return event.charCode >= 48 && event.charCode <= 57" value="${subsMax}" onchange="onChangeEdit()">
                </div>
                <div class="modal-check">
                    <input class="checkbox-custom" id="modal-make-approver" type="checkbox" onchange="onChangeEdit()" ${appr ? `checked="checked"` : ''}  ${TYPE == 4 ? 'disabled' : ''}>
                    <label class="checkbox-custom-label" for="modal-make-approver">Approver ?</label>
                </div>
                <div class="modal-button">
                    <input id="modal-submit" value="Submit" type="button" onclick="onSubmit(${ele.UID})">
                    <input id="modal-cancel" value="Cancel" type="button" onclick="toggleModal()">
                </div>
            </div>
            `
        )})}
    `
    return markup
}