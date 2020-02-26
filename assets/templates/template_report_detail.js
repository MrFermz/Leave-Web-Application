var headers     = ['no', 'id', 'name', 'sick', 'vacation', 'business', 'substitution']


function templateCardReportDetail(content) {
    let date        = defaultFilter()
    let markup = `
        <div id="card-report-main">
            <div class="summary">${formatDate(date.dateEnd)} - ${formatDate(date.dateStart)}</div>
            ${content.length > 0 
                ? `<table id="table-users" class="table-report">
                        <thead>
                            <tr id="tr-header">
                                ${headers.map((ele, i) => { return `<th id="th-${ele}" class="th-${ele}">${ele == 'no' ? '#' : `${ele.charAt(0).toUpperCase() + ele.slice(1)}`}</th>` }).join("")}
                            </tr>
                        </thead>
                        <tbody>
                            ${content.map((ele, i) => { return(
                                `<tr id="tr-content-${i}" class="tr-content ${i % 2 == 0 ? 'tr-odd' : ''}">
                                    <td id="td-no-${i}">${i + 1}</td>
                                    <td id="td-empID-${i}">${ele.empID}</td>
                                    <td id="td-name">
                                        <div class="name">
                                            <div id="td-fname" class="td-fname">${ele.fname}</div>
                                            <div id="td-lname" class="td-lname">${ele.lname}</div>
                                            <div id="td-nickname" class="td-nickname">(${ele.nickname})</div>
                                        </div>
                                    </td>
                                    <td id="td-sick-${i}" class="td-sick value">${ele.sick}</td>
                                    <td id="td-vacation-${i}" class="td-vacation value">${ele.vacation}</td>
                                    <td id="td-business-${i}" class="td-business value">${ele.business}</td>
                                    <td id="td-substitution-${i}" class="td-substitution value">${ele.substitution}</td>
                                </tr>`
                            )}).join("")}
                        </tbody>
                    </table>`
                : `<div>- Nothing -</div>`
            }
        </div>
    `
    return markup
}


function templateCardReportDetailFilter(content, data) {
    let markup  = `
        <div id="card-report-main">
            <div class="summary">${data.start || data.end ? `${formatDate(data.start)} - ${formatDate(data.end)}` : ``}</div>
            ${content.length > 0 
                ? `<table id="table-users" class="table-report">
                        <thead>
                            <tr id="tr-header">
                                ${headers.map((ele, i) => { return `<th id="th-${ele}" class="th-${ele}">${ele == 'no' ? '#' : `${ele.charAt(0).toUpperCase() + ele.slice(1)}`}</th>` }).join("")}
                            </tr>
                        </thead>
                        <tbody>
                            ${content.map((ele, i) => { return(
                                `<tr id="tr-content-${i}" class="tr-content ${i % 2 == 0 ? 'tr-odd' : ''}">
                                    <td id="td-no-${i}">${i + 1}</td>
                                    <td id="td-empID-${i}">${ele.empID}</td>
                                    <td id="td-name">
                                        <div class="name">
                                            <div id="td-fname" class="td-fname">${ele.fname}</div>
                                            <div id="td-lname" class="td-lname">${ele.lname}</div>
                                            <div id="td-nickname" class="td-nickname">(${ele.nickname})</div>
                                        </div>
                                    </td>
                                    <td id="td-sick-${i}" class="td-sick value">${ele.sick}</td>
                                    <td id="td-vacation-${i}" class="td-vacation value">${ele.vacation}</td>
                                    <td id="td-business-${i}" class="td-business value">${ele.business}</td>
                                    <td id="td-substitution-${i}" class="td-substitution value">${ele.substitution}</td>
                                </tr>`
                            )}).join("")}
                        </tbody>
                    </table>`
                : `<div>- Nothing -</div>`
            }
        </div>
    `
    return markup
}