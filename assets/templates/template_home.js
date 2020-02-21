function templateCardHome(list, cardType, leaveMax) {
    let markup
    if (cardType == 'leave') {
        markup = `
            <div id="card-leave" class="card center parent-leave-days">
                <div class="div1" id="leave-days">
                    <div class="header-label">LEAVE DAYS</div>
                </div>
                <div class="div2" id="sick-value">
                    <div class="value">${list.sick} / ${leaveMax[0].sick}</div>
                </div>
                <div class="div3" id="sick-label">
                    <div class="label">SICK</div>
                </div>
                <div class="div4" id="business-value">
                    <div class="value">${list.business} / ${leaveMax[0].business}</div>
                </div>
                <div class="div5" id="business-label">
                    <div class="label">BUSINESS</div>
                </div>
                <div class="div6" id="vacation-value">
                    <div class="value">${list.vacation} / ${leaveMax[0].vacation}</div>
                </div>
                <div class="div7" id="vacation-label">
                    <div class="label">VACATION</div>
                </div>
                <div class="div8" id="substitution-value">
                    <div class="value">${list.substitution} / ${list.substitutionMax}</div>
                </div>
                <div class="div9" id="substitution-label">
                    <div class="label">SUBSTITUTION</div>
                </div>
            </div>
        `
    } else if (cardType == 'pending') {
        markup = `
            <div id="card-pending" class="card center parent-pending">
                <div class="div10" id="pending-value">
                    <div class="value">${list.cnt}</div>
                </div>
                <div class="div11" id="pending-label">
                    <div class="label">PENDING</div>
                </div>
            </div>
        `
    }
    return markup
}