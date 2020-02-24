function templateFilterReport() {
    let ui          = ['Sick', 'Vacation', 'Business', 'Substitution']
    let colors      = ['red', 'orange', 'blue', 'green']
    let markup      = `
        <div id="filter-card" class="card center">
            Start: <input id="date-start" type="date"><br>
            End: <input id="date-end" type="date">
            <div id="filter-summary">SUMMARY</div>
            <div class="parent-list">
                ${ui.map((ele, i) => { return (`
                    <div class="div-${i}-list list">
                        <div class="list-dot" style="color: ${colors[i]}">●</div>
                        <div class="list-label">${ele.toUpperCase()}</div>
                    </div>`
                )}).join('')}
            </div>
        </div>
    `
    return markup
}


function templateCardReport(content) {
    let date        = defaultFilter()
    let markup  = `
        <div class="card center">
            ${content.map(ele => { return (
                `<div class="parent">
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
        </div>
    `
    return markup
}


function defaultFilter() {
    let now         = new Date()
    let future      = new Date(now.setDate(now.getDate() - 31))
    let today       = new Date()
    dateStart       = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    dateEnd         = `${future.getFullYear()}-${future.getMonth() + 1}-${future.getDate()}`
    return { dateStart, dateEnd }
}


function formatDate(date) {
    const days              = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months            = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let DATE                = new Date(date)
    let DATE_day_short      = days[DATE.getDay()]
    let DATE_day            = DATE.getDate()
    let DATE_month          = DATE.getMonth()
    let DATE_month_short    = months[DATE_month]
    let DATE_year           = DATE.getUTCFullYear()
    DATE_final              = `${DATE_day_short} ${DATE_day} ${DATE_month_short} ${DATE_year}`
    return DATE_final
}