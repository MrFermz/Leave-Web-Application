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


function templateEditManage(content, listsType, department, approver, subsMax, appr) {
    let apprArray   = ''
    let markup      = `
        ${content.map(ele => { return(
            `<div id="modal-content" class="modal-content">
                <div id="modal-empid-container">
                    Employee ID: 
                    <input id="modal-employee-id" value="${ele.empID}" onchange="onChangeEdit()" type="number">
                </div>
                <div id="modal-first-name-container">
                    Firstname: 
                    <input id="modal-first-name" value="${ele.firstname}" onchange="onChangeEdit()">
                </div>
                <div id="modal-last-name-container">
                    Lastname: 
                    <input id="modal-last-name" value="${ele.lastname}" onchange="onChangeEdit()">
                </div>
                <div id="modal-nick-name-container">
                    Nickname: 
                    <input id="modal-nickname" value="${ele.nickname}" onchange="onChangeEdit()">
                </div>
                <div id="modal-select-type-container">
                    User Type: 
                    <select id="modal-user-type" onchange="onChangeEdit()">
                        <option value="" disabled selected>-</option>
                        ${listsType.map(type => { return(
                            `<option value="${type.typeID}" ${ele.typeID == type.typeID ? `selected="${ele.typeID}"` : ''}>${type.typeName}</option>`
                        )}).join("")}
                    </select>
                </div>
                <div id="modal-select-dept-container">
                    Department: 
                    <select id="modal-dept-type" onchange="onChangeEdit()">
                        <option value="" disabled selected>-</option>
                        ${department.map(dept => { return(
                            `<option value="${dept.deptID}" ${ele.deptID == dept.deptID ? `selected="${ele.deptID}"` : ''}>${dept.deptName}</option>`
                        )}).join("")}
                    </select>
                </div>
                <div id="modal-select-type-container">
                    Approver: 
                    <input id="modal-approver" list="modal-approver-lists" onchange="onChangeEdit()" autocomplete="off" ${approver.map(appr => { return(
                        ele.approverID == appr.approverID ? `value="${appr.username}"` : ''
                    )}).join("")}>
                    ${approver.map(appr => { apprArray += `<option id="modal-approver-options" data="${appr.approverID}" value="${appr.username}">` }).join("")}
                    <datalist id="modal-approver-lists">${apprArray}</datalist>
                </div>
                <div id="modal-subs-max-container">
                    Subsitution: 
                    <input id="modal-subs-max" type="number" min="0" value="${subsMax}" onchange="onChangeEdit()">
                </div>
                <div id="modal-make-approver-container">
                    <input id="modal-make-approver" type="checkbox" onchange="onChangeEdit()" ${appr ? `checked="checked"` : ''}>
                    Approver ?
                </div>
                    <input id="modal-submit" value="Submit" type="button" onclick="onSubmit(${ele.UID})">
                </div>`
        )})}
    `
    return markup
}