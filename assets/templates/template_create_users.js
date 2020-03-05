function templateCreateUsers(deptList, typeList, apprList) {
    let apprArray   = ''
    let markup      = `
        <div class="card center">
            <div class="container-create">
                <div class="create-input">
                    <label>Employee ID <span>*</span></label>
                    <input id="empID" type="text" placeholder="Employee ID (1-20 character)" onchange="onChangeCreate()" onkeypress="if(this.value.length==20) return false;">
                </div>
                <div class="create-input">
                    <label>Firstname <span>*</span></label>
                    <input id="firstname" type="text" placeholder="Firstname" onchange="onChangeCreate()">
                </div>
                <div class="create-input">
                    <label>Lastname <span>*</span></label>
                    <input id="lastname" type="text" placeholder="Lastname" onchange="onChangeCreate()">
                </div>
                <div class="create-input">
                    <label>Nickname <span>*</span></label>
                    <input id="nickname" type="text" placeholder="Nickname" onchange="onChangeCreate()">
                </div>
                <div class="create-input">
                    <label>Username <span>*</span></label>
                    <input id="username" type="text" placeholder="Username" onchange="onChangeCreate()">
                </div>
                <div class="create-input">
                    <label>Password <span>*</span></label>
                    <input id="password" type="password" placeholder="Password" onchange="onChangeCreate()">
                </div>
                <div class="create-input">
                    <label>Re-Password <span>*</span></label>
                    <input id="re-password" type="password" placeholder="Re-Password (same password)" onchange="onChangeCreate()">
                </div>
                <div class="create-input">
                    <label>User Type <span>*</span></label>
                    <select id="typeSelect" onchange="onChangeCreate()">
                        <option value="-1" disabled selected>-</option>
                        ${typeList.map(type => { return `<option value="${type.typeID}">${type.typeName}</option>`}).join("")}
                    </select>
                </div>
                <div class="create-input">
                    <label>Department <span>*</span></label>
                    <select id="deptSelect" onchange="onChangeCreate()">
                        <option value="-1" disabled selected>-</option>
                        ${deptList.map(dept => { return `<option value="${dept.deptID}">${dept.deptName}</option>`}).join("")}
                    </select>
                </div>
                <div class="create-input">
                    <label>Approver <span>*</span></label>
                    <input class="create-datalist" id="approverID" list="approverlists" onchange="onChangeCreate()">
                    ${apprList.map(appr => { apprArray += `<option data=${appr.UID} value=${appr.nickname}>(${appr.empID}) ${appr.firstname} ${appr.lastname}</option>`}).join("")}
                    <datalist id="approverlists">${apprArray}</datalist>
                </div>
                <div class="create-input">
                    <label>Subsitution</label>
                    <input id="subs-max" placeholder="(1-99)" type="number" min="0" max="99" onkeypress="if(this.value.length==2) return false; return event.charCode >= 48 && event.charCode <= 57" onchange="onChangeCreate()">
                </div>
                <div class="create-check">
                    <input class="checkbox-custom" id="make-approver" type="checkbox" onchange="onChangeCreate()">
                    <label class="checkbox-custom-label" for="make-approver">Make approver ?</label>
                </div>
            </div>
            <input id="create" type="button" value="Create" onclick="onCreate()">
        </div>
    `
    return markup
}