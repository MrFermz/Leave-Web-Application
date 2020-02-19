function templateCreateUsers(deptList, typeList, apprList) {
    let apprArray   = ''
    let markup      = `
        <div class="container-create">
                <label>Employee ID: </label>
                <input id="empID" type="text" placeholder="Employee ID" onchange="onChangeCreate()">
        </div>
        <div class="container-create">
                <label>Firstname: </label>
                <input id="firstname" type="text" placeholder="Firstname" onchange="onChangeCreate()">
        </div>
        <div class="container-create">
                <label>Lastname: </label>
                <input id="lastname" type="text" placeholder="Lastname" onchange="onChangeCreate()">
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>Nickname: </label>
            </div>
            <div class="col-50 text">
                <input id="nickname" type="text" placeholder="Nickname" onchange="onChangeCreate()">
            </div>
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>Username: </label>
            </div>
            <div class="col-50 text">
                <input id="username" type="text" placeholder="Username" onchange="onChangeCreate()">
            </div>
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>Password: </label>
            </div>
            <div class="col-50 text">
                <input id="password" type="password" placeholder="Password" onchange="onChangeCreate()">
            </div>
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>Re-Password: </label>
            </div>
            <div class="col-50 text">
                <input id="re-password" type="password" placeholder="Re-Password" onchange="onChangeCreate()">
            </div>
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>User Type: </label>
            </div>
            <div class="col-50 text">
                <select id="typeSelect" onchange="onChangeCreate()">
                    <option value="-1" disabled selected>-</option>
                    ${typeList.map(type => { return `<option value="${type.typeID}">${type.typeName}</option>`}).join("")}
                </select>
            </div>
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>Department: </label>
            </div>
            <div class="col-50 text">
                <select id="deptSelect" onchange="onChangeCreate()">
                    <option value="-1" disabled selected>-</option>
                    ${deptList.map(dept => { return `<option value="${dept.deptID}">${dept.deptName}</option>`}).join("")}
                </select>
            </div>
        </div>
        <div class="create-container">
            <div class="col-50 label">
                <label>Approver: </label>
            </div>
            <div class="col-50 text">
                <input id="approverID" list="approverlists" onchange="onChangeCreate()">
                ${apprList.map(appr => { apprArray += `<option data=${appr.UID} value=${appr.username}>`}).join("")}
                <datalist id="approverlists">${apprArray}</datalist>
            </div>
        </div>
        <div class="create-container">
            Subsitution: 
            <input id="subs-max" type="number" min="0" onchange="onChangeCreate()">
        </div>
        <div class="create-container">
            <input id="make-approver" type="checkbox" onchange="onChangeCreate()">
            Approver ?
        </div>
        <input id="create" type="button" value="Create" onclick="onCreate()">
    `
    return markup
}