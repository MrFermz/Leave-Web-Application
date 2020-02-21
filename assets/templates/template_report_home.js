function templateFilterReport() {
    let ui          = ['Sick', 'Vacation', 'Business', 'Substitution']
    let markup      = `
        <div id="filter-card" class="card center">
            Start: <input id="date-start" type="date"><br>
            End: <input id="date-end" type="date">
            <div id="filter-summary">SUMMARY</div>
            <ul id="filter-ul">
                ${ui.map((ele, i) => { return `<li id="filter-li-${i}">${ele}</li>` }).join("")}
            </ul>
        </div>
    `
    return markup
}


function templateCardReport(content) {
    let markup  = `
        <div class="card center">
            ${content.map(ele => { return (
                `<div>sick: ${ele.sick}</div>
                <div>vacation: ${ele.vacation}</div>
                <div>business: ${ele.business}</div>
                <div>substitution: ${ele.substitution}</div>`
            )})}
        </div>
    `
    return markup
}