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
        const ele       = list[i]
        let fragment    = ``
        let dateStart   = formatDate(ele.dateStart)
        let dateEnd     = formatDate(ele.dateEnd)
        if (ele.leaveType == 'sick' || ele.leaveType == 'business') {
            fragment = `
                <div id="card-${i}" class="card center">
                    <div class="parent">
                        <div class="div1 avatar">
                            <img src="../assets/images/account.svg">
                        </div>
                        <div class="div2">
                            <div class="container-detail">
                                <div class="detail" id="nick-name-${i}">Nickname: ${ele.nickname}</div>
                                <div class="detail" id="employee-id-${i}">ID: ${ele.empID}</div>
                                <div class="detail" id="leave-type-${i}">Leave: ${ele.leaveType}</div>
                            </div>
                        </div>
                    </div>
                    <div class="parent-date">
                        <div class="div-1-date label">START</div>
                        <div class="div-2-date value">${dateStart}</div>
                        <div class="div-3-date label">END</div>
                        <div class="div-4-date value">${dateEnd}</div>
                    </div>
                    <div class="days" id="days-${ele}">${rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))} DAYS</div>
                    <div class="reasons" id="reasons-${i}">${ele.reasons}</div>
                    <img ${ele.img ? `src="../api/uploads/${ele.img}"` : ''} width="40%">
                    <div class="input-container" id="input-container">
                        <input class="approve" type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                        <input class="reject" type="button" value="Reject">
                    </div>
                </div>
            `
        } else {
            fragment = `
                <div id="card-${i}" class="card center">
                    <div class="parent">
                        <div class="div1 avatar">
                            <img src="../assets/images/account.svg">
                        </div>
                        <div class="div2">
                            <div class="container-detail">
                                <div class="detail" id="nick-name-${i}">Nickname: ${ele.nickname}</div>
                                <div class="detail" id="employee-id-${i}">ID: ${ele.empID}</div>
                                <div class="detail" id="leave-type-${i}">Leave: ${ele.leaveType}</div>
                            </div>
                        </div>
                    </div>
                    <div class="parent-date">
                        <div class="div-1-date label">START</div>
                        <div class="div-2-date value">${dateStart}</div>
                        <div class="div-3-date label">END</div>
                        <div class="div-4-date value">${dateEnd}</div>
                    </div>
                    <div class="days" id="days-${ele}">${rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))} DAYS</div>
                    <div class="input-container" id="input-container">
                        <input class="approve" type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                        <input class="reject" type="button" value="Reject">
                    </div>
                </div>
            `
        }
        markup += fragment
    }
    return markup
}


function formatDate(date) {
    const months            = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let DATE                = new Date(date)
    let DATE_day            = DATE.getDate()
    let DATE_month          = DATE.getMonth()
    let DATE_month_short    = months[DATE_month]
    let DATE_year           = DATE.getUTCFullYear()
    DATE_final              = `${DATE_day} ${DATE_month_short} ${DATE_year}`
    return DATE_final
}