const http          =       new XMLHttpRequest()
var TYPE            =       localStorage.getItem('type')
var USERNAME        =       localStorage.getItem('username')
var TOKEN           =       getToken()
var LISTS


async function onLoad() {
    if (TOKEN) {
        LISTS    =   await getLeaveLists()
        genCard()
    } else {
        notFound()
    }
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
    let sideBar         =       document.createElement('div')
    let sideOpen        =       document.createElement('input')
    let sideClose       =       document.createElement('input')
    let header          =       document.createElement('div')
    let menu            =       document.createElement('div')
    let menuTop         =       document.createElement('div')
    let logout          =       document.createElement('input')
    let token           =       document.createElement('input')
    let userManage      =       document.createElement('input')
    let home            =       document.createElement('input')
    let approve         =       document.createElement('input')
    let leave           =       document.createElement('input')
    let report          =       document.createElement('input')

    sideBar.setAttribute('id', 'side-bar')
    sideBar.setAttribute('class', 'side-bar')

    sideOpen.setAttribute('id', 'side-open')
    sideOpen.setAttribute('class', 'open')
    sideOpen.setAttribute('type', 'button')
    sideOpen.setAttribute('value', 'side menu')
    sideOpen.onclick    =       () => openSidebar()
    
    sideClose.setAttribute('id', 'side-close')
    sideClose.setAttribute('class', 'close')
    sideClose.setAttribute('type', 'button')
    sideClose.setAttribute('value', 'X')
    sideClose.onclick   =       () => closeSidebar()

    header.setAttribute('id', 'header')

    menu.setAttribute('id', 'menu')

    menuTop.setAttribute('id', 'menu-top')

    logout.setAttribute('type', 'button')
    logout.setAttribute('value', 'Logout')
    logout.onclick  =   () => onLogout()

    token.setAttribute('type', 'button')
    token.setAttribute('value', 'Token')
    token.onclick  =   () => checkToken()

    userManage.setAttribute('type', 'button')
    userManage.setAttribute('value', 'User manage')
    userManage.onclick  =   () => onUsersManage()

    home.setAttribute('type', 'button')
    home.setAttribute('value', 'Home')
    home.onclick  =   () => onHome()

    approve.setAttribute('type', 'button')
    approve.setAttribute('value', 'Approve')
    approve.onclick  =   () => onApprove()

    leave.setAttribute('type', 'button')
    leave.setAttribute('value', 'Leave')
    leave.onclick  =   () => onLeave()

    report.setAttribute('type', 'button')
    report.setAttribute('value', 'Report')
    report.onclick  =   () => onReport()

    header.innerHTML            =       USERNAME

    document.getElementById('container').appendChild(sideBar)
    document.getElementById('side-bar').appendChild(sideClose)
    document.getElementById('container').appendChild(header)
    document.getElementById('header').appendChild(sideOpen)
    document.getElementById('container').appendChild(header)
    document.getElementById('container').appendChild(menu)
    document.getElementById('container').appendChild(menuTop)
    document.getElementById('side-bar').appendChild(logout)
    if (TYPE == 0) {
        document.getElementById('side-bar').appendChild(token)
        document.getElementById('side-bar').appendChild(userManage)
    }
    document.getElementById('menu-top').appendChild(home)
    document.getElementById('menu-top').appendChild(approve)
    document.getElementById('menu-top').appendChild(leave)
    document.getElementById('menu-top').appendChild(report)

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
        if (ele.leaveType == 'sick' || ele.leaveType == 'business') {
            document.getElementById(`card-${i}`).appendChild(reasons)
        }
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