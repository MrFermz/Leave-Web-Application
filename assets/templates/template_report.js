function templateFilterReport(users) {
    let now         = new Date()
    let past        = new Date(now.setDate(now.getDate() - 31))
    let today       = new Date()
    let dateStart   = formatDefaultDate(`${today.getFullYear()}`, `${today.getMonth() + 1}`, `${today.getDate()}`)
    let dateEnd     = formatDefaultDate(`${past.getFullYear()}`, `${past.getMonth() + 1}`, `${past.getDate()}`)
    let url         = URLsplit()
    let usersArray  = ''
    let markup      = ''
    if (url == 'report_home') {
        markup      = `
            <div id="desktop-container" class="center">
                <div class="desktop-label">START: </div>
                <input name="date-start" type="date" onchange="onChange()" value="${dateEnd}">
                <div class="desktop-label">END: </div>
                <input name="date-end" type="date" onchange="onChange()" value="${dateStart}">
                <div class="desktop-label">USERS: </div>
                <input id="user" class="filter-users" list="users" onchange="onChange()" autocomplete="off">
                ${users.map(user => { usersArray += `<option data=${user.UID} value="${user.nickname}">(${user.empID}) ${user.firstname} ${user.lastname}</option>` }).join("")}
                <datalist id="users">${usersArray}</datalist>
            </div>
            ${url == 'report_home' ? `<div id="card-report-home" class="card center container"></div>` : '<div id="card-report-detail" class="card2 center container"></div>'}
        `
    } else if (url == 'report_detail') {
        markup      = `
            <div id="desktop-container" class="center">
                    <div class="desktop-label">START: </div>
                    <input name="date-start" type="date" onchange="onChange()" value="${dateEnd}">
                    <div class="desktop-label">END: </div>
                    <input name="date-end" type="date" onchange="onChange()" value="${dateStart}">
                    <div class="desktop-label">USERS: </div>
                    <input id="user" class="filter-users" list="users" onchange="onChange()" autocomplete="off">
                    ${users.map(user => { usersArray += `<option data=${user.UID} value="${user.nickname}">(${user.empID}) ${user.firstname} ${user.lastname}</option>` }).join("")}
                    <datalist id="users">${usersArray}</datalist>
            </div>
            ${url == 'report_home' ? `<div id="card-report-home" class="card center container"></div>` : '<div id="card-report-detail" class="card2 center container"></div>'}
        `
    }
    return markup
}