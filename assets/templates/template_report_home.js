function templateFilterReport(users) {
    let ui          = ['Sick', 'Vacation', 'Business', 'Substitution']
    let colors      = ['red', 'orange', 'blue', 'green']
    let usersArray  = ''
    let markup      = `
        <div id="filter-card" class="card center">
            <div class="parent-filter">
                <div class="div-1-filter">
                    <div class="filter-label">START</div>
                </div>
                <div class="div-2-filter">
                    <input name="date-start" type="date" onchange="onChange()">
                </div>
                <div class="div-3-filter">
                    <div class="filter-label">END</div>
                </div>
                <div class="div-4-filter">
                    <input name="date-end" type="date" onchange="onChange()">
                </div>
                <div class="div-5-filter">
                    <div class="filter-label">USERS</div>
                </div>
            </div>
            <div class="div-6-filter">
                <input id="user" class="filter-users" list="users" onchange="onChange()" autocomplete="off">
                ${users.map(user => { usersArray += `<option data=${user.UID} value="${user.nickname}">(${user.empID}) ${user.firstname} ${user.lastname}</option>` }).join("")}
                <datalist id="users">${usersArray}</datalist>
            </div>
            <div class="parent-list">
                ${ui.map((ele, i) => { return (`
                    <div class="div-${i}-list list">
                        <div class="list-dot" style="color: ${colors[i]}">●</div>
                        <div class="list-label">${ele.toUpperCase()}</div>
                    </div>`
                )}).join('')}
            </div>
        </div>
        <div id="card-report-home" class="card center"></div>
    `
    return markup
}


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
            <input type="button" class="detail-btn" value="More detail" onclick="onDetail()">
        </div>
    `
    return markup
}


function templateCardReportFilter(content, data) {
    console.log(content, data)
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
            <input type="button" class="detail-btn" value="More detail" onclick="onDetail()">
        </div>
    `
    return markup
}


function templateCardReportDetail() {
    let markup = `
        <div id="card-report-detail">
            <input type="button" value="BACK" onclick="backToHome()">
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