function templateCardHome(list, cardType, leaveMax) {
    let markup
    if (cardType == 'leave') {
        markup = `
            <div id="card-leave" class="card center">
                <div id="sick-value">sick: ${list.sick} / ${leaveMax[0].sick}</div>
                <div id="business-value">business: ${list.business} / ${leaveMax[0].business}</div>
                <div id="vacation-value">vacation: ${list.vacation} / ${leaveMax[0].vacation}</div>
                <div id="substitution-value">substitution: ${list.substitution} / ${list.substitutionMax}</div>
            </div>
        `
    } else if (cardType == 'pending') {
        markup = `
            <div id="card-pending" class="card center">
                <div id="pending-value">pending: ${list.cnt}</div>
            </div>
        `
    }
    return markup
}