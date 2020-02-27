let LEAVE_TYPE      = ['sick', 'business', 'vacation', 'substitution']


function templateLeaveSelector() {
    let markup      = `
        <div class="leave-type-bar" id="leave-type-bar">
            ${LEAVE_TYPE.map((ele, i) => { return (
                `<input id="leave-select-${ele}" class="leave-select-${ele}" type="button" onclick="onChangeLeaveType('${ele}')" value="${ele.toUpperCase()}"
                style="background-color: ${ele == 'sick' ? `#E74C3C` : ''}">`
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
                    <div class="leave-content">
                        <div class="parent">
                            <div class="container-date">
                                <div class="leave-label">START:</div>
                                <input class="start" type="date" name="date-start-${ele}" onchange="onChange()">
                            </div>
                            <div class="container-date">
                                <div class="leave-label">END:</div>
                                <input class="end" type="date" name="date-end-${ele}" onchange="onChange()">
                            </div>
                        </div>                   
                        ${ele == 'sick' || ele == 'business' ? `
                            <div class="upload-btn-wrapper">
                                <input type="button" class="btn-file" value="FILE">
                                <input type="file" id="upload-${ele}" onchange="onChangeFile('${ele}')">
                            </div>
                            <label id="file-name">No file</label>
                            <div class="reasons-container">
                                <input class="input-reasons" type="text" name="reasons-${ele}" placeholder="Reasons" onchange="onChange()">
                            </div>
                        ` : ``}
                        <div class="summary" id="summary-${ele}">START - END</div>
                        <div class="days" id="days-${ele}">DAYS</div>
                        <input class="card-submit" type="button" value="Submit" onclick="onSubmit()">
                    </div>
                </div>`
            )}).join("")}
        </div>
    `
    return markup
}