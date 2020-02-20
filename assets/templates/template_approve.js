function templateCardApprove(list) {
    let markup  = ``
    let length  = list.length
    if (list.length > 10) {
        length  = 10
    }
    if (list.length == 0) {
        markup  = `<div>No more leave.</div>`
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
                    <img ${ele.img ? `src="../api/uploads/${ele.img}"` : ''} width="40%">
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