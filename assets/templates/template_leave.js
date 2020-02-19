let LEAVE_TYPE      = ['sick', 'business', 'vacation', 'substitution']


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