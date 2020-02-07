const http      =       new XMLHttpRequest()
var TOKEN       =       getToken()
var LISTS


async function onLoad() {
    LISTS    =   await getLeaveLists()
    genCard()
}


function getLeaveLists() {
    http.open('GET', `http://localhost:8081/getleavelists`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    =   JSON.parse(this.responseText)
                resolve(data)
            }
        }
    })
}


function genCard() {
    LISTS.map((ele, i) =>{
        let card                    =       document.createElement('div')
        let nickname                =       document.createElement('div')
        let employeeID              =       document.createElement('div')
        let leaveType               =       document.createElement('div')
        let dateStart               =       document.createElement('div')
        let dateEnd                 =       document.createElement('div')
        let reasons                 =       document.createElement('div')
        let approveBtn              =       document.createElement('input')
        let rejectBtn               =       document.createElement('input')
        
        card.setAttribute('id', `card-${i}`)
        nickname.setAttribute('id', `nick-name-${i}`)
        employeeID.setAttribute('id', `employee-id-${i}`)
        leaveType.setAttribute('id', `leave-type-${i}`)
        dateStart.setAttribute('id', `date-start-${i}`)
        dateEnd.setAttribute('id', `date-end-${i}`)
        reasons.setAttribute('id', `reasons-${i}`)

        approveBtn.setAttribute('type', 'button')
        approveBtn.setAttribute('value', 'Approve')
        approveBtn.onclick          =       () => onApprove(ele)

        rejectBtn.setAttribute('type', 'button')
        rejectBtn.setAttribute('value', 'Reject')
        
        card.className              =       'card center'

        nickname.innerHTML          =       `Nickname: ${ele.nickname}`
        employeeID.innerHTML        =       `ID: ${ele.empID}`
        leaveType.innerHTML         =       `Leave Type: ${ele.leaveType}`
        dateStart.innerHTML         =       `Date Start: ${ele.dateStart}`
        dateEnd.innerHTML           =       `Date End: ${ele.dateEnd}`
        reasons.innerHTML           =       `Reasons: ${ele.reasons}`

        document.getElementById('container').appendChild(card)
        document.getElementById(`card-${i}`).appendChild(nickname)
        document.getElementById(`card-${i}`).appendChild(employeeID)
        document.getElementById(`card-${i}`).appendChild(leaveType)
        document.getElementById(`card-${i}`).appendChild(dateStart)
        document.getElementById(`card-${i}`).appendChild(dateEnd)
        document.getElementById(`card-${i}`).appendChild(reasons)
        document.getElementById(`card-${i}`).appendChild(approveBtn)
        document.getElementById(`card-${i}`).appendChild(rejectBtn)
    })
}


function onApprove(value) {
    let today               =       new Date()
    value['dateApprove']    =       `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    let data                =       value

    http.open('POST', `http://localhost:8081/approve`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send(JSON.stringify(data))
    http.onreadystatechange = async function () {
        if (this.readyState === 4 && this.status === 200) {
            let data    =   JSON.parse(this.responseText)
            console.log(data)
            if (data.result === 'success') {
                location.reload()
            }
        }
    }
}