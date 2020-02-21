function sortUsers(lists) {
    let data                = []
    let unsortUID           = []
    let sortedUID           = []
    return new Promise(function (resolve, reject) {
        for (const ele of lists) {
            unsortUID.push(ele.UID)
        }
        sortedUID = [...new Set(unsortUID)]
        console.log(sortedUID)
        sortedUID.forEach((uid_ele, uid_i) => {
            let sick                = 0
            let vacation            = 0
            let business            = 0
            let substitution        = 0
            data.push({UID: uid_ele, sick, vacation, business, substitution})
            for (const data_ele of lists) {
                if (data_ele.UID == uid_ele) {
                    switch (data_ele.leaveType) {
                        case 'sick'             : sick          = data_ele.cnt
                            break
                        case 'vacation'         : vacation      = data_ele.cnt
                            break
                        case 'business'         : business      = data_ele.cnt
                            break
                        case 'substitution'     : substitution  = data_ele.cnt
                            break
                        default:
                            break
                    }
                    data[uid_i] = {UID: data_ele.UID, sick, vacation, business, substitution}
                }
            }
        })
        resolve(data)
    })
}