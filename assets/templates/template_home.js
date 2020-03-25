function templateCardHome(lists, cardType, leaveCapacity) {
    let markup
    let list        = lists.data
    if (cardType == 'leave') {
        markup = `
            <div id="card-leave" class="card center">
                <div class="leave-remain-container">
                    <div class="header-label">LEAVE DAYS</div>
                    <div class="leave-days-container">
                        <div class="leave-days">
                            <div class="value">${list.sick} / ${leaveCapacity.data[0].sick}</div>
                            <div class="label">SICK</div>
                        </div>
                        <div class="leave-days">
                            <div class="value">${list.business} / ${leaveCapacity.data[0].business}</div>
                            <div class="label">BUSINESS</div>
                        </div>
                    </div>
                    <div class="leave-days-container">
                        <div class="leave-days">
                            <div class="value">${list.vacation} / ${leaveCapacity.data[0].vacation}</div>
                            <div class="label">VACATION</div>
                        </div>
                        <div class="leave-days">
                            <div class="value">${list.substitution} / ${list.substitutionMax}</div>
                            <div class="label">SUBSTITUTION</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    } else if (cardType == 'pending') {
        markup = `
            <div id="card-pending" class="card center">
                <div class="leave-remain-container">
                    <div class="leave-days-container">
                        <div class="leave-days-2">
                            <div class="value">${list.cnt}</div>
                            <div class="label">PENDING</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    } else if (cardType == 'requesting') {
        markup = `
            <div id="card-${cardType}" class="card center">
                <div class="leave-remain-container">
                    <div class="leave-days-container">
                        <div class="leave-days-2">
                            <div class="value">${lists}</div>
                            <div class="label">REQUESTING</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    return markup
}