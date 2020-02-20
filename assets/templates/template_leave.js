let LEAVE_TYPE      = ['sick', 'business', 'vacation', 'substitution']


function templateLeaveSelector() {
    let markup      = `
        <div class="leave-type-bar" id="leave-type-bar">
            ${LEAVE_TYPE.map((ele, i) => { return (
                `<input id="leave-select-${ele}" class="leave-select-${ele}" type="button" onclick="onChangeLeaveType('${ele}')" value="${ele.toUpperCase()}">`
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
                    <h3>${ele}</h3>
                    <div class="leave-content">
                        <div class="leave-label">START</div>
                        <input type="date" name="date-start-${ele}" onchange="onChange()"><br>
                        <div class="leave-label">END</div>
                        <input type="date" name="date-end-${ele}" onchange="onChange()">
                        ${ele == 'sick' || ele == 'business' ? `
                            <input type="file" id="upload-${ele}" onchange="FILES = document.getElementById('upload-${ele}').files">
                            Reasons: <input type="text" name="reasons-${ele}" placeholder="Reasons" onchange="onChange()">
                        ` : ``}
                        <div>SUMMARY</div>
                        <input type="button" value="Submit" onclick="onSubmit()">
                    </div>
                </div>`
            )}).join("")}
        </div>
    `
    return markup
}