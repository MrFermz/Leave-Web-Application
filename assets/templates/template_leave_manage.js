function templateLeaveMax(max) {
    let MAX         = max[0]
    let markup      = `
        <div class="card center">
            <div class="container-content">
                <div class="content">
                    <label>Sick:</label>
                    <input id="max-sick" type="number" placeholder="(1-99)" min="0" max="99" value="${MAX.sick}" onchange="onChange()" onkeypress="if(this.value.length==2) return false; return event.charCode >= 48 && event.charCode <= 57">
                </div>
                <div class="content">
                    <label>Business:</label>
                    <input id="max-business" type="number" placeholder="(1-99)" min="0" max="99" value="${MAX.business}" onchange="onChange()" onkeypress="if(this.value.length==2) return false; return event.charCode >= 48 && event.charCode <= 57">
                </div>
                <div class="content">
                    <label>Vacation:</label>
                    <input id="max-vacation" type="number" placeholder="(1-99)" min="0" max="99" value="${MAX.vacation}" onchange="onChange()" onkeypress="if(this.value.length==2) return false; return event.charCode >= 48 && event.charCode <= 57">
                </div>
            </div>
            <input class="submit" type="button" value="Submit" onclick="onSubmit(${MAX.leavemaxID})">
        </div>
    `
    return markup
}