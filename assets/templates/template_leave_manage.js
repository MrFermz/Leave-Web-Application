function templateLeaveMax(max) {
    let MAX         = max[0]
    let markup      = `
        <div>
            Sick: <input id="max-sick" type="number" value="${MAX.sick}" onchange="onChange()">
        </div>
        <div>
            Business: <input id="max-business" type="number" value="${MAX.business}" onchange="onChange()">
        </div>
        <div>
            Vacation: <input id="max-vacation" type="number" value="${MAX.vacation}" onchange="onChange()">
        </div>
        <div><input type="button" value="Submit" onclick="onSubmit(${MAX.leavemaxID})"></div>
    `
    return markup
}