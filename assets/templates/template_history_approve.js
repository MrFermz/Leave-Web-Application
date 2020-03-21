var STATUS          = ['approved', 'rejected']


function templateModal() {
    let markup = `
        <div id="modal-container" class="modal-container"></div>
    `
    return markup    
}


function templateMoreDetail(content) {
    let markup = `
        <div id="modal-content" class="card center modal-content">
            ${content.leaveID}
        </div>
    `
    return markup
}


function templateHistoryApprove(content) {
    let markup = `
        ${content.length > 0 ? content.map((ele, i) => { return (
            `<div id="card" class="card2 center">
                <div class="list" onclick="onModalDetail('${ele.leaveID}')">
                    <div class="detail-left">
                        <div class="detail-type">${ele.leaveType.toUpperCase()}</div>
                        <div class="detail-date">
                            <div class="detail-date-container">
                                <div>${formatDate(ele.dateStart)}</div>
                                <div class="space">-</div>
                                <div>${formatDate(ele.dateEnd)}</div>
                            </div>
                            <div class="summary">(${rangeDays(new Date(ele.dateStart), new Date(ele.dateEnd))} DAYS)</div>
                        </div>
                    </div>
                    <div class="detail-right">
                        ${ele.status == 1 ? `<div class="detail-status">${STATUS[0].toUpperCase()}</div>` : ``}
                        ${ele.status == 2 ? `<div class="detail-status">${STATUS[1].toUpperCase()}</div>` : ``}
                    </div>
                </div>
            </div>
        `)}).join('') : `- Empty -`}`
    return markup
}