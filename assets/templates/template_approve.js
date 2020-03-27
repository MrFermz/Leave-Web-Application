var EXT, LENGTH

function templateMenuManage() {
    let markup      = `
        <div id="modal-container" class="modal-container"></div>
    `
    return markup
}


function templateCardApprove(list) {
    let markup  = ``
    LENGTH      = list.length
    let length  = LENGTH
    if (list.length > 10) {
        length  = 10
    }
    if (list.length == 0) {
        markup  = `<div style="text-align: center">- Empty -</div>`
    } else {
        const ele       = list[0]
        let ext         = ''
        if (ele.img) {
            ext         = ele.img
            EXT         = ext.split('.')[1]
        }
        let fragment    = ``
        let dateStart   = formatDate(ele.dateStart)
        let dateEnd     = formatDate(ele.dateEnd)
        let days        = rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))
        let more        = `You have must approve ${length - 1} more.`
        if (length == 1) {
            more        = ``
        }
        if (ele.leaveType == 'sick' || ele.leaveType == 'business') {
            markup = `
                <div id="card" class="card center">
                    <div class="parent">
                        <div class="avatar">
                            <img src="../assets/images/account.svg">
                        </div>
                        <div class="container-detail">
                            <div class="detail" id="nick-name">Nickname: ${ele.nickname}</div>
                            <div class="detail" id="employee-id">Employee ID: ${ele.empID}</div>
                            <div class="detail" id="leave-type">Leave: ${ele.leaveType.toUpperCase()}</div>
                        </div>
                    </div>
                    <div class="parent-date">
                        <div class="div-1-date label">START</div>
                        <div class="div-2-date value">${dateStart}</div>
                        <div class="div-3-date label">END</div>
                        <div class="div-4-date value">${dateEnd}</div>
                    </div>
                    <div class="days" id="days-${ele.leaveType}">${days} DAYS</div>
                    <div class="reasons" id="reasons">${ele.reasons}</div>
                    <div class="container-toggle-modal">
                        ${ele.img ? `<button class="toggle-modal" onclick="onZoom('${ele.img}')"><img class="icon" src="../assets/images/paper-clip.svg"></button>` : ''}
                    </div>

                    <div class="container-reject">
                        <label>Reject resons (<span>*</span> if you want to reject.)</label>
                        <input id="reasons-reject" class="reasons-reject" placeholder="Reject reasons" onchange="onChange()">
                    </div>

                    <div class="input-container" id="input-container">
                        <input id="approve" class="approve" type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                        <input id="reject" class="reject" type="button" value="Reject" onclick="onReject(${ele.leaveID}, ${ele.leaveCount}, '${ele.leaveType}', ${days})">
                    </div>
                </div>
                <div class="more">
                    <label>${more}</label>
                </div>
            `
        } else {
            markup = `
                <div id="card" class="card center">
                    <div class="parent">
                        <div class="avatar">
                            <img src="../assets/images/account.svg">
                        </div>
                        <div class="container-detail">
                            <div class="detail" id="nick-name">Nickname: ${ele.nickname}</div>
                            <div class="detail" id="employee-id">Employee ID: ${ele.empID}</div>
                            <div class="detail" id="leave-type">Leave: ${ele.leaveType}</div>
                        </div>
                    </div>
                    <div class="parent-date">
                        <div class="div-1-date label">START</div>
                        <div class="div-2-date value">${dateStart}</div>
                        <div class="div-3-date label">END</div>
                        <div class="div-4-date value">${dateEnd}</div>
                    </div>
                    <div class="days" id="days-${ele.leaveType}">${days} DAYS</div>
                    <div class="container-reject">
                        <label>Reject resons <span>*</span></label>
                        <input id="reasons-reject" class="reasons-reject" placeholder="Reject reasons" onchange="onChange()">
                    </div>
                    <div class="input-container" id="input-container">
                        <input id="approve" class="approve" type="button" value="Approve" onclick="onApprove(${ele.leaveID})">
                        <input id="reject" class="reject" type="button" value="Reject" onclick="onReject(${ele.leaveID}, ${ele.leaveCount}, '${ele.leaveType}', ${days})">
                    </div>
                </div>
                <div class="more">
                    <label>${more}</label>
                </div>
            `
        }
    }
    return markup
}


function templateModal(img) {
    let markup = `
        <div class="modal-close" onclick="toggleModal()"><label><img src="../assets/images/wrong.svg"></label></div>
        <div id="modal-content" class="card center modal-content">
        ${ EXT == 'pdf'
            ? `<iframe class="modal-preview" src="${UPLOADER}${img}" frameborder="0"></iframe>` 
            : `<iframe class="modal-preview" src="${UPLOADER}${img}" frameborder="0"></iframe>` }
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