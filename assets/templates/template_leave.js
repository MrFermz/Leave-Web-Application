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
                    <div class="leave-content">
                        <div class="parent">
                            <div class="div1">
                                <div class="leave-label">START</div>
                            </div>
                            <div class="div2">
                                <input type="date" name="date-start-${ele}" onchange="onChange()">
                            </div>
                            <div class="div3">
                                <div class="leave-label">END</div>
                            </div>
                            <div class="div4">
                                <input type="date" name="date-end-${ele}" onchange="onChange()">
                            </div>
                        </div>                   
                        ${ele == 'sick' || ele == 'business' ? `
                            <div class="upload-btn-wrapper">
                                <input type="button" class="btn-file" value="FILE">
                                <input type="file" id="upload-${ele}" onchange="FILES = document.getElementById('upload-${ele}').files">
                            </div>
                            <div class="reasons-container">
                                <input class="input-reasons" type="text" name="reasons-${ele}" placeholder="Reasons" onchange="onChange()">
                            </div>
                        ` : ``}
                        <div class="summary" id="summary">SUMMARY</div>
                        <input class="card-submit" type="button" value="Submit" onclick="onSubmit()">
                    </div>
                </div>`
            )}).join("")}
        </div>
    `
    return markup
}