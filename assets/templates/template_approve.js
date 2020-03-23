var EXT

function templateMenuManage() {
    let markup      = `
        <div id="modal-container" class="modal-container"></div>
    `
    return markup
}


function templateCardApprove(list) {
    let markup  = ``
    let length  = list.length
    if (list.length > 10) {
        length  = 10
    }
    if (list.length == 0) {
        markup  = `<div style="text-align: center">No more leave.</div>`
    }
    for (let i = 0; i < length; i++) {
        const ele       = list[i]
        let ext         = ''
        if (ele.img) {
            ext         = ele.img
            EXT         = ext.split('.')[1]
        }
        let fragment    = ``
        let dateStart   = formatDate(ele.dateStart)
        let dateEnd     = formatDate(ele.dateEnd)
        if (ele.leaveType == 'sick' || ele.leaveType == 'business') {
            fragment = `
                <div id="card-${i}" class="card center">
                    <div class="parent">
                        <div class="avatar">
                            <img src="../assets/images/account.svg">
                        </div>
                        <div class="container-detail">
                            <div class="detail" id="nick-name-${i}">Nickname: ${ele.nickname}</div>
                            <div class="detail" id="employee-id-${i}">ID: ${ele.empID}</div>
                            <div class="detail" id="leave-type-${i}">Leave: ${ele.leaveType}</div>
                        </div>
                    </div>
                    <div class="parent-date">
                        <div class="div-1-date label">START</div>
                        <div class="div-2-date value">${dateStart}</div>
                        <div class="div-3-date label">END</div>
                        <div class="div-4-date value">${dateEnd}</div>
                    </div>
                    <div class="days" id="days-${ele.leaveType}">${rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))} DAYS</div>
                    <div class="reasons" id="reasons-${i}">${ele.reasons}</div>
                    <div class="container-toggle-modal">
                        ${ele.img ? `<button class="toggle-modal" onclick="onZoom('${ele.img}')"><img class="icon" src="../assets/images/paper-clip.svg"></button>` : ''}
                    </div>
                    ${i == 0 
                        ? `<div class="container-reject">
                                <label>Reject resons (<span>*</span> if you want to reject.)</label>
                                <input id="reasons-reject-${i}" class="reasons-reject" placeholder="Reject reasons" onchange="onChange(${i})">
                            </div>
                            <div class="input-container" id="input-container">
                                <input id="approve" class="approve" type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                                <input id="reject" class="reject" type="button" value="Reject" onclick="onReject(${ele.leaveID}, ${ele.leaveCount}, '${ele.leaveType}')">
                            </div>` 
                        : ''}
                </div>
            `
        } else {
            fragment = `
                <div id="card-${i}" class="card center">
                    <div class="parent">
                        <div class="avatar">
                            <img src="../assets/images/account.svg">
                        </div>
                        <div class="container-detail">
                            <div class="detail" id="nick-name-${i}">Nickname: ${ele.nickname}</div>
                            <div class="detail" id="employee-id-${i}">ID: ${ele.empID}</div>
                            <div class="detail" id="leave-type-${i}">Leave: ${ele.leaveType}</div>
                        </div>
                    </div>
                    <div class="parent-date">
                        <div class="div-1-date label">START</div>
                        <div class="div-2-date value">${dateStart}</div>
                        <div class="div-3-date label">END</div>
                        <div class="div-4-date value">${dateEnd}</div>
                    </div>
                    <div class="days" id="days-${ele.leaveType}">${rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))} DAYS</div>
                    ${i == 0 
                        ? `<div class="container-reject">
                                <label>Reject resons <span>*</span></label>
                                <input id="reasons-reject-${i}" class="reasons-reject" placeholder="Reject reasons" onchange="onChange(${i})">
                            </div>
                            <div class="input-container" id="input-container">
                                <input id="approve" class="approve" type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                                <input id="reject" class="reject" type="button" value="Reject" onclick="onReject(${ele.leaveID}, ${ele.leaveCount}, '${ele.leaveType}')">
                            </div>` 
                        : ''}
                </div>
            `
        }
        markup += fragment
    }
    return markup
}


function templateModal(img) {
    let markup = `
        <div class="modal-close" onclick="toggleModal()"><label><img src="../assets/images/wrong.svg"></label></div>
        <div id="modal-content" class="card center modal-content">
        ${ EXT == 'pdf'
        // src="../api/uploads/${img}"
            ? `<iframe class="modal-preview" src="../../leaveAppAPI/uploads/${img}" frameborder="0"></iframe>` 
            : `<iframe class="modal-preview" src="../../leaveAppAPI/uploads/${img}" frameborder="0"></iframe>` }
        </div>
    `
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