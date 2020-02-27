function templateLeaveMax(max) {
    let MAX         = max[0]
    let markup      = `
        <div class="card center">
            <div class="container-content">
                <div class="content">
                    <label>Sick:</label>
                    <input id="max-sick" type="number" value="${MAX.sick}" onchange="onChange()">
                </div>
                <div class="content">
                    <label>Business:</label>
                    <input id="max-business" type="number" value="${MAX.business}" onchange="onChange()">
                </div>
                <div class="content">
                    <label>Vacation:</label>
                    <input id="max-vacation" type="number" value="${MAX.vacation}" onchange="onChange()">
                </div>
            </div>
            <input class="submit" type="button" value="Submit" onclick="onSubmit(${MAX.leavemaxID})">
        </div>
    `
    return markup
}