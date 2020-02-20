function templateCardHome(list, cardType, leaveMax) {
    let markup
    if (cardType == 'leave') {
        markup = `
            <div id="card-leave" class="card center parent-leave-days">
                <div class="div1" id="leave-days">LEAVE DAYS</div>
                <div class="div2" id="sick-value">${list.sick} / ${leaveMax[0].sick}</div>
                <div class="div3" id="sick-label">SICK</div>
                <div class="div4" id="business-value">${list.business} / ${leaveMax[0].business}</div>
                <div class="div5" id="business-label">BUSINESS</div>
                <div class="div6" id="vacation-value">${list.vacation} / ${leaveMax[0].vacation}</div>
                <div class="div7" id="vacation-label">VACATION</div>
                <div class="div8" id="substitution-value">${list.substitution} / ${list.substitutionMax}</div>
                <div class="div9" id="substitution-label">SUBSTITUTION</div>
            </div>
        `
    } else if (cardType == 'pending') {
        markup = `
            <div id="card-pending" class="card center parent-pending">
                <div class="div10" id="pending-value">${list.cnt}</div>
                <div class="div11" id="pending-label">PENDING</div>
            </div>
        `
    }
    return markup
}