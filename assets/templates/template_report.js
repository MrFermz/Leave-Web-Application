function templateFilterReport(users) {
    let url         = URLsplit()
    let usersArray  = ''
    let markup      = ''
    if (url == 'report_home') {
        markup      = `
            <div id="desktop-container" class="center">
                <div class="desktop-label">START: </div>
                <input name="date-start" type="date" onchange="onChange()">
                <div class="desktop-label">END: </div>
                <input name="date-end" type="date" onchange="onChange()">
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
                    <input name="date-start" type="date" onchange="onChange()">
                    <div class="desktop-label">END: </div>
                    <input name="date-end" type="date" onchange="onChange()">
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