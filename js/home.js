const http          = new XMLHttpRequest()
var TYPE            = localStorage.getItem('type')
var USERNAME        = localStorage.getItem('username')
var TOKEN           = getToken()
var LEAVEDAY
var PENDING


async function onLoad() {
    if (TOKEN) {
        let leaveDays       = await getLeaveDays()
        let pendings        = await getPendings()
        LEAVEDAY            = leaveDays[0]
        PENDING             = pendings[0]
        genContent()
    } else {
        notFound()
    }
}


function genContent() {
    let sideBar         =       document.createElement('div')
    let sideOpen        =       document.createElement('input')
    let sideClose       =       document.createElement('input')
    let header          =       document.createElement('div')
    let sideMenu        =       document.createElement('div')
    let headerName      =       document.createElement('div')
    let menuTop         =       document.createElement('div')
    let logout          =       document.createElement('input')
    let token           =       document.createElement('input')
    let userManage      =       document.createElement('input')
    let home            =       document.createElement('input')
    let approve         =       document.createElement('input')
    let leave           =       document.createElement('input')
    let report          =       document.createElement('input')
    let cardLeave       =       document.createElement('div')
    let sick            =       document.createElement('div')
    let business        =       document.createElement('div')
    let vacation        =       document.createElement('div')
    let substitution    =       document.createElement('div')
    let cardPending     =       document.createElement('div')
    let pending         =       document.createElement('div')

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
    header.setAttribute('class', 'header')

    sideMenu.setAttribute('id', 'side-menu')
    sideMenu.setAttribute('class', 'side-menu')

    headerName.setAttribute('id', 'header-name')
    headerName.setAttribute('class', 'header-name')

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

    cardLeave.className      =       'card center'
    cardLeave.setAttribute('id', 'card-leave')

    sick.setAttribute('id', 'sick-value')

    business.setAttribute('id', 'business-value')

    vacation.setAttribute('id', 'vacation-value')

    substitution.setAttribute('id', 'substitution-value')

    cardPending.className   =       'card center'
    cardPending.setAttribute('id', 'card-peding')

    pending.setAttribute('id', 'peding-value')


    headerName.innerHTML        =       USERNAME
    sick.innerHTML              =       `sick: ${LEAVEDAY.sick_remain} / ${LEAVEDAY.sick}`
    business.innerHTML          =       `business: xx / ${LEAVEDAY.business}`
    vacation.innerHTML          =       `vacation: xx / ${LEAVEDAY.vacation}`
    substitution.innerHTML      =       `substitution: xx / ${LEAVEDAY.substitution}`
    pending.innerHTML           =       `peding: ${PENDING.cnt}`
    

    document.getElementById('container').appendChild(sideBar)
    document.getElementById('side-bar').appendChild(sideClose)
    document.getElementById('container').appendChild(header)
    document.getElementById('header').appendChild(sideMenu)
    document.getElementById('header').appendChild(headerName)
    document.getElementById('side-menu').appendChild(sideOpen)
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

    document.getElementById('container').appendChild(cardLeave)
    document.getElementById('card-leave').appendChild(sick)
    document.getElementById('card-leave').appendChild(business)
    document.getElementById('card-leave').appendChild(vacation)
    document.getElementById('card-leave').appendChild(substitution)

    document.getElementById('container').appendChild(cardPending)
    document.getElementById('card-peding').appendChild(pending)
}


function getLeaveDays() {
    http.open('GET', `http://localhost:8081/listsleavedays`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    = JSON.parse(this.responseText)
                resolve(data.data)
            }
        }
    })
}


function getPendings() {
    http.open('GET', `http://localhost:8081/listspendings`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send()
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data    =   JSON.parse(this.responseText)
                resolve(data.data)
            }
        }
    })
}