const http          =       new XMLHttpRequest()
var TYPE            =       localStorage.getItem('type')
var TOKEN           =       getToken()
var USERNAME        =       localStorage.getItem('username')
var LEAVEDAY


async function onLoad() {
    let leaveDays       =       await getLeaveDays()
    LEAVEDAY            =       leaveDays[0]

    genContent()

    document.getElementById('header').innerHTML     =       USERNAME
}


function getLeaveDays() {
    let token       =       getToken()

    http.open('POST', `http://localhost:8081/getleavedays`, true)
    http.setRequestHeader('x-access-token', token)
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


function genContent() {
    let menu            =       document.createElement('div')
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

    cardLeave.className      =       'card center'
    cardLeave.setAttribute('id', 'card-leave')

    sick.setAttribute('id', 'sick-value')

    business.setAttribute('id', 'business-value')

    vacation.setAttribute('id', 'vacation-value')

    substitution.setAttribute('id', 'substitution-value')

    cardPending.className   =       'card center'
    cardPending.setAttribute('id', 'card-peding')

    pending.setAttribute('id', 'peding-value')


    sick.innerHTML              =       `sick xx / ${LEAVEDAY.sick}`

    business.innerHTML          =       `business xx / ${LEAVEDAY.business}`

    vacation.innerHTML          =       `vacation xx / ${LEAVEDAY.vacation}`

    substitution.innerHTML      =       `substitution xx / ${LEAVEDAY.substitution}`

    pending.innerHTML           =       `peding xx`
    

    document.getElementById('container').appendChild(menu)
    document.getElementById('container').appendChild(menuTop)
    document.getElementById('menu').appendChild(logout)

    if (TYPE == 0) {
        document.getElementById('menu').appendChild(token)
        document.getElementById('menu').appendChild(userManage)

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