var STATUS          = ['approved', 'rejected']


function templateModal() {
    let markup = `
        <div id="modal-container" class="modal-container"></div>
    `
    return markup    
}


function templateHistoryApprove(content) {
    let markup = `
        <div id="card" class="card2 center">
            ${content.length > 0 ? content.map((ele, i) => { return (
                `<div class="list">
                    <div class="detail-left-history" onclick="onModalDetail('${ele.leaveID}', 'history')">
                        <div class="detail-type"><label>${ele.leaveType.toUpperCase()}</label></div>
                        <div class="detail-date">
                            <div class="detail-date-container">
                                <div>${formatDate(ele.dateStart)}</div>
                                <div class="space">-</div>
                                <div>${formatDate(ele.dateEnd)}</div>
                            </div>
                            <div class="summary">(${rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))} DAYS)</div>
                        </div>
                    </div>
                    <div class="detail-right-history">
                        ${ele.status == 1 ? `<div class="detail-status">${STATUS[1].toUpperCase()}</div>` : ``}
                        ${ele.status == 2 ? `<div class="detail-status">${STATUS[2].toUpperCase()}</div>` : ``}
                        ${ele.status == 3 ? `<div class="detail-status">${STATUS[3].toUpperCase()}</div>` : ``}
                        <div class="detail-action">
                            <div class="detail-bin-container">
                                ${ele.URL
                                    ? `<div id="detail-img-${i}" class="detail-img" onclick="onModalFile('${ele.leaveID}', 'history')">
                                            <img src="../assets/images/paper-clip.svg">
                                        </div>`
                                    : ``}
                            </div>
                        </div>
                    </div>
                </div>`
            )}).join('') : `- Empty -`}
        </div>`
    return markup
}


function templateMoreFile(content) {
    let ext     = content.URL
    ext         = ext.split('.')
    ext         = ext[ext.length - 1]
    let markup = `
        <div class="modal-close" onclick="toggleModal()"><label><img src="../assets/images/wrong.svg"></label></div>
        <div id="modal-content" class="card center modal-content">
            ${ext == 'pdf'
                ? `<iframe class="modal-preview" src="${UPLOADER}${content.URL}" frameborder="0"></iframe>`
                : `<iframe class="modal-preview" src="${UPLOADER}${content.URL}" frameborder="0"></iframe>`}
        </div>`
    return markup
}


function templateMoreDetail(content) {
    let markup = `
        <div class="modal-close" onclick="toggleModal()"><label><img src="../assets/images/wrong.svg"></label></div>
        <div id="card" class="card3 center">
            <div class="info-container">
                <div class="avatar">
                    <img src="../assets/images/account.svg">
                </div>
                <div class="container-detail">
                    <div class="detail" id="nick-name">Nickname: ${content.nickname}</div>
                    <div class="detail" id="employee-id">ID: ${content.empID}</div>
                    <div class="detail" id="leave-type">Leave: ${content.leaveType}</div>
                </div>
            </div>
            <div class="container-date">
                <div class="container-date-detail">
                    <div class="label">START</div>
                    <div class="value">${formatDate(content.dateStart)}</div>
                </div>
                <div class="container-date-detail">
                    <div class="label">END</div>
                    <div class="value">${formatDate(content.dateEnd)}</div>
                </div>
            </div>
            <div class="days" id="days-${content.leaveType}">${rangeDays(new Date(content.dateStart), new Date(content.dateEnd))} DAYS</div>
            ${content.reasons ? `<div class="reasons" id="reasons">${content.reasons}</div>` : ``}
        </div>`
    return markup
}