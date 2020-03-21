var HISTORY_TYPE    = ['request', 'history']
var STATUS          = ['requesting', 'approved', 'rejected', 'canceled']


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


function templateHistorySelector() {
    let markup = `
        <div class="history-bar">
            ${HISTORY_TYPE.map((ele, i) => { return (
                `<input id="history-select-${ele}" class="history-select-${ele}" type="button" onclick="onChangeTab('${ele}')" value="${ele.toUpperCase()}"
                style="background-color: ${ele == 'request' ? `#2ECC71` : ''}">`
            )}).join("")}
        </div>
    `
    return markup
}


function templateHistoryLeave(request, history) {
    let reqData = request.data
    let hisData = history.data
    let reqLen  = reqData.length
    let hisLen  = hisData.length
    let markup  = HISTORY_TYPE.map((eleType, i) => { return (
        `<div id="card-${eleType}" class="card2 center">
            ${eleType == 'request' 
            ? `${ reqLen > 0 ? reqData.map((ele, i) => { return (
                    `<div class="list">
                        <div class="detail-left" onclick="onModalDetail('${ele.leaveID}', 'request')">
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
                            <div id="detail-status-${i}" class="detail-status">${ele.status == 0 ? STATUS[0].toUpperCase() : ``}</div>
                            <div class="detail-bin-container"><div id="detail-bin-${i}" class="detail-bin" onclick="onCancel('${ele.leaveID}', ${i})"><img src="../assets/images/wrong.svg"></div></div>
                        </div>
                    </div>`
                )}).join('') : '- Empty -'}`
            : `${ hisLen > 0 ? hisData.map((ele, i) => { return (
                    `<div class="list" onclick="onModalDetail('${ele.leaveID}', 'history')">
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
                            ${ele.status == 1 ? `<div class="detail-status">${STATUS[1].toUpperCase()}</div>` : ``}
                            ${ele.status == 2 ? `<div class="detail-status">${STATUS[2].toUpperCase()}</div>` : ``}
                            ${ele.status == 3 ? `<div class="detail-status">${STATUS[3].toUpperCase()}</div>` : ``}
                        </div>
                    </div>`
                )}).join('') : '- Empty -'}`}
        </div>`)}).join('')
    return markup
}