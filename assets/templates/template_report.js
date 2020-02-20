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


function templateTableReport(headers, content) {
    let markup  = `
        <div>
            <table id="table" class="table center">
                <tr id="tr-header">
                    ${headers.map((ele, i) => { return `<th id="th-${i}">${ele}</th>` }).join("")}
                </tr>
                ${content.map((ele, i) => { return (
                `<tr class="tr-content" id="tr-content-${i}">
                    <td id="td-no-${i}">${i + 1}</td>
                    <td id="td-name-${i}">${ele.UID}</td>
                    <td id="td-sick-${i}">${ele.sick}</td>
                    <td id="td-business-${i}">${ele.business}</td>
                    <td id="td-vacation-${i}">${ele.vacation}</td>
                    <td id="td-substitution-${i}">${ele.substitution}</td>
                </tr>`
                )}).join("")}
            </table>
        </div>
    `
    return markup
}