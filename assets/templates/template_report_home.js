function templateCardReport(content) {
    let date        = defaultFilter()
    let markup  = `
        ${content.map(ele => { return (
            `<div id="card-report-main" class="parent">
                <div class="div1">${formatDate(date.dateEnd)} - ${formatDate(date.dateStart)}</div>
                <div class="div2 card-report-home">
                    <div class="card-report-label">${ele.sick}</div>
                    <img src="../assets/images/sick.svg">
                </div>
                <div class="div3 card-report-home">
                    <div class="card-report-label">${ele.vacation}</div>
                    <img src="../assets/images/sun-umbrella.svg">
                </div>
                <div class="div4 card-report-home">
                    <div class="card-report-label">${ele.business}</div>
                    <img src="../assets/images/suitcase.svg">
                </div>
                <div class="div5 card-report-home">
                    <div class="card-report-label">${ele.substitution}</div>
                    <img src="../assets/images/clock.svg">
                </div>
            </div>`
        )})}
        <div class="detail-go">
            <input type="button" class="detail-btn" value="More detail" onclick="onReportDetail()">
        </div>
    `
    return markup
}


function templateCardReportFilter(content, data) {
    let markup  = `
        ${content.map(ele => { return (
            `<div id="card-report-main" class="parent">
                <div class="div1">${data.start || data.end ? `${formatDate(data.start)} - ${formatDate(data.end)}` : ``}</div>
                <div class="div2 card-report-home">
                    <div class="card-report-label">${ele.sick}</div>
                    <img src="../assets/images/sick.svg">
                </div>
                <div class="div3 card-report-home">
                    <div class="card-report-label">${ele.vacation}</div>
                    <img src="../assets/images/sun-umbrella.svg">
                </div>
                <div class="div4 card-report-home">
                    <div class="card-report-label">${ele.business}</div>
                    <img src="../assets/images/suitcase.svg">
                </div>
                <div class="div5 card-report-home">
                    <div class="card-report-label">${ele.substitution}</div>
                    <img src="../assets/images/clock.svg">
                </div>
            </div>`
        )})}
        <div class="detail-go">
            <input type="button" class="detail-btn" value="More detail" onclick="onReportDetail()">
        </div>
    `
    return markup
}