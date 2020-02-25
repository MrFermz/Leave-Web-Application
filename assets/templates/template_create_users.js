function templateCreateUsers(deptList, typeList, apprList) {
    let apprArray   = ''
    let markup      = `
        <div class="card2 center">
            <div class="parent">
                <div class="div1 create-label">
                    <label>Employee ID </label>
                </div>
                <div class="div2 create-input">
                    <input id="empID" type="text" placeholder="Employee ID" onchange="onChangeCreate()">
                </div>
                <div class="div3 create-label">
                    <label>Firstname </label>
                </div>
                <div class="div4 create-input">
                    <input id="firstname" type="text" placeholder="Firstname" onchange="onChangeCreate()">
                </div>
                <div class="div5 create-label">
                    <label>Lastname </label>
                </div>
                <div class="div6 create-input">
                    <input id="lastname" type="text" placeholder="Lastname" onchange="onChangeCreate()">
                </div>
                <div class="div7 create-label">
                    <label>Nickname </label>
                </div>
                <div class="div8 create-input">
                    <input id="nickname" type="text" placeholder="Nickname" onchange="onChangeCreate()">
                </div>
                <div class="div9 create-label">
                    <label>Username </label>
                </div>
                <div class="div10 create-input">
                    <input id="username" type="text" placeholder="Username" onchange="onChangeCreate()">
                </div>
                <div class="div11 create-label">
                    <label>Password </label>
                </div>
                <div class="div12 create-input">
                    <input id="password" type="password" placeholder="Password" onchange="onChangeCreate()">
                </div>
                <div class="div13 create-label">
                    <label>Re-Password </label>
                </div>
                <div class="div14 create-input">
                    <input id="re-password" type="password" placeholder="Re-Password" onchange="onChangeCreate()">
                </div>
                <div class="div15 create-label">
                    <label>User Type </label>
                </div>
                <div class="div16 create-input">
                    <select id="typeSelect" onchange="onChangeCreate()">
                        <option value="-1" disabled selected>-</option>
                        ${typeList.map(type => { return `<option value="${type.typeID}">${type.typeName}</option>`}).join("")}
                    </select>
                </div>
                <div class="div17 create-label">
                    <label>Department </label>
                </div>
                <div class="div18 create-input">
                    <select id="deptSelect" onchange="onChangeCreate()">
                        <option value="-1" disabled selected>-</option>
                        ${deptList.map(dept => { return `<option value="${dept.deptID}">${dept.deptName}</option>`}).join("")}
                    </select>
                </div>
                <div class="div19 create-label">
                    <label>Approver </label>
                </div>
                <div class="div20 create-input">
                    <input class="create-datalist" id="approverID" list="approverlists" onchange="onChangeCreate()">
                    ${apprList.map(appr => { apprArray += `<option data=${appr.UID} value=${appr.username}>`}).join("")}
                    <datalist id="approverlists">${apprArray}</datalist>
                </div>
                <div class="div21 create-label">
                    <label>Subsitution </label>
                </div>
                <div class="div22 create-input">
                    <input id="subs-max" type="number" min="0" onchange="onChangeCreate()">
                </div>
                <div class="div23 create-label">
                    <label>Make approver ?</label>
                </div>
                <div class="div24 create-check">
                    <input class="checkbox" id="make-approver" type="checkbox" onchange="onChangeCreate()">
                </div>
            </div>
            <input id="create" type="button" value="Create" onclick="onCreate()">
        </div>
    `
    return markup
}