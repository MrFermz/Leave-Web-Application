const http              = new XMLHttpRequest()
var TYPE                = localStorage.getItem('type')
var USERNAME            = localStorage.getItem('username')
var TOKEN               = getToken()
var LEAVETYPE           = 'sick'
let LEAVETYPEVALUES     = ['sick', 'business', 'vacation', 'substitution']
var DATESTART
var DATEEND
var REASONS
var VALUES



async function onLoad() {
    if (TOKEN) {
        await genContent()
        await genCard()
    } else {
        notFound()
    }
}


function onChangeLeaveType() {
    let type        =       document.getElementsByName('leaveType')
    for (let i = 0; i < type.length; i++) {
        if (type[i].checked) {
            let value       =       type[i].value
            LEAVETYPE       =       value
            VALUES          =       undefined
            switch (value) {
                case 'sick'             :   {
                                                document.getElementById('leave-card-sick').style.display            =   'block'
                                                document.getElementById('leave-card-business').style.display        =   'none'
                                                document.getElementById('leave-card-vacation').style.display        =   'none'
                                                document.getElementById('leave-card-substitution').style.display    =   'none'
                                                document.getElementsByName(`reasons-${value}`)[0].value             =   ''
                                                document.getElementsByName(`date-start-${value}`)[0].value          =   ''
                                                document.getElementsByName(`date-end-${value}`)[0].value            =   ''
                                            }    
                    break

                case 'business'         :   {
                                                document.getElementById('leave-card-sick').style.display            =   'none'
                                                document.getElementById('leave-card-business').style.display        =   'block'
                                                document.getElementById('leave-card-vacation').style.display        =   'none'
                                                document.getElementById('leave-card-substitution').style.display    =   'none'
                                                document.getElementsByName(`reasons-${value}`)[0].value             =   ''
                                                document.getElementsByName(`date-start-${value}`)[0].value          =   ''
                                                document.getElementsByName(`date-end-${value}`)[0].value            =   ''
                                            } 
                    break

                case 'vacation'         :   {
                                                document.getElementById('leave-card-sick').style.display            =   'none'
                                                document.getElementById('leave-card-business').style.display        =   'none'
                                                document.getElementById('leave-card-vacation').style.display        =   'block'
                                                document.getElementById('leave-card-substitution').style.display    =   'none'
                                                document.getElementsByName(`date-start-${value}`)[0].value          =   ''
                                                document.getElementsByName(`date-end-${value}`)[0].value            =   ''
                                            } 
                    break

                case 'substitution'     :   {
                                                document.getElementById('leave-card-sick').style.display            =   'none'
                                                document.getElementById('leave-card-business').style.display        =   'none'
                                                document.getElementById('leave-card-vacation').style.display        =   'none'
                                                document.getElementById('leave-card-substitution').style.display    =   'block'
                                                document.getElementsByName(`date-start-${value}`)[0].value          =   ''
                                                document.getElementsByName(`date-end-${value}`)[0].value            =   ''
                                            } 
                    break

                default:
                    break
            }
        }
    }
}


function onChange() {
    let leaveType       =       LEAVETYPE
    DATESTART           =       document.getElementsByName(`date-start-${leaveType}`)
    DATEEND             =       document.getElementsByName(`date-end-${leaveType}`)

    if (leaveType === 'sick' || leaveType === 'business') {
        REASONS         =       document.getElementsByName(`reasons-${leaveType}`)
    } else {
        REASONS         =       ''
    }

    if (leaveType === 'sick' || leaveType === 'business') {
        VALUES              =       {
                                        leaveType   :   leaveType,
                                        dateStart   :   DATESTART[0].value,
                                        dateEnd     :   DATEEND[0].value,
                                        reasons     :   REASONS[0].value,
                                        status      :   0
                                    }
    } else {
        VALUES              =       {
                                        leaveType   :   leaveType,
                                        dateStart   :   DATESTART[0].value,
                                        dateEnd     :   DATEEND[0].value,
                                        reasons     :   '',
                                        status      :   0
                                    }
    }
}


function onSubmit() {
    let data            =       VALUES
    http.open('POST', `http://localhost:8081/createleaves`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.setRequestHeader('Content-Type', 'application/json')
    http.send(JSON.stringify(data))
}


function genContent() {
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
    let leaveType       =       document.createElement('div')

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

    leaveType.setAttribute('id', 'leave-type-bar')
    
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

    document.getElementById('container').appendChild(leaveType)
    LEAVETYPEVALUES.forEach((ele, i) => {
        let leaveSelect         =       document.createElement('input')
        let leaveLabel          =       document.createElement('div')

        leaveSelect.setAttribute('class', 'leave-select')
        leaveSelect.setAttribute('id', `leave-select-${i}`)
        leaveSelect.setAttribute('type', 'radio')
        leaveSelect.setAttribute('name', 'leaveType')
        if (ele == 'sick') {
            leaveSelect.setAttribute('checked', 'checked')
        }
        leaveSelect.setAttribute('value', ele)
        leaveSelect.onchange    =       () => onChangeLeaveType()

        leaveLabel.innerHTML    =       ele

        document.getElementById('leave-type-bar').appendChild(leaveSelect)
        document.getElementById('leave-type-bar').appendChild(leaveLabel)
    })
}


var files

async function onSubmitFile() {
    let data        =       files[0]

    console.log(data)
    let res         =       await onUpload(data)
    console.log(res)
}

function onUpload(data) {
    http.open('POST', `http://localhost:8081/uploaders`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.send(data)
    return new Promise(function (resolve, reject) {
        http.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // let data    =   JSON.parse(this.responseText)
                let data    =   this.responseText
                resolve(data)
            }
        }
    })
}


function genCard() {
    let leaveCardContainer       =       document.createElement('div')

    leaveCardContainer.setAttribute('id', 'leave-card-container')
    leaveCardContainer.setAttribute('class', 'leave-card')

    document.getElementById('container').appendChild(leaveCardContainer)

    LEAVETYPEVALUES.forEach((ele, i) => {
        let leaveCard       =       document.createElement('div')
        let h3              =       document.createElement('h3')
        let dateStart       =       document.createElement('input')
        let dateEnd         =       document.createElement('input')
        let fileSelect      =       document.createElement('input')
        let fileSubmit      =       document.createElement('input')
        let reasons         =       document.createElement('input')
        let leaveSubmit     =       document.createElement('input')

        leaveCard.setAttribute('id', `leave-card-${ele}`)
        leaveCard.setAttribute('class', `card center ${ele}`)

        h3.setAttribute('id', `label-${ele}`)
        h3.innerHTML        =       ele

        dateStart.setAttribute('type', 'date')
        dateStart.setAttribute('name', `date-start-${ele}`)
        dateStart.onchange  =       () => onChange()

        dateEnd.setAttribute('type', 'date')
        dateEnd.setAttribute('name', `date-end-${ele}`)
        dateEnd.onchange    =       () => onChange()

        fileSelect.setAttribute('id', 'upload')
        fileSelect.setAttribute('type', 'file')
        fileSelect.onchange =       () => { files = document.getElementById('upload').files}

        fileSubmit.setAttribute('id', 'upload-submit')
        fileSubmit.setAttribute('type', 'button')
        fileSubmit.setAttribute('value', 'Upload')
        fileSubmit.onclick  =       () => onSubmitFile()

        reasons.setAttribute('type', 'text')
        reasons.setAttribute('name', `reasons-${ele}`)
        reasons.setAttribute('placeholder', 'Reasons')
        reasons.onchange    =       () => onChange()

        leaveSubmit.setAttribute('type', 'button')
        leaveSubmit.setAttribute('value', 'Submit')
        leaveSubmit.onclick =       () => onSubmit()

        document.getElementById('leave-card-container').appendChild(leaveCard)
        document.getElementById(`leave-card-${ele}`).appendChild(h3)
        document.getElementById(`leave-card-${ele}`).appendChild(dateStart)
        document.getElementById(`leave-card-${ele}`).appendChild(dateEnd)
        if (ele == 'sick' || ele == 'business') {
            document.getElementById(`leave-card-${ele}`).appendChild(fileSelect)
            document.getElementById(`leave-card-${ele}`).appendChild(fileSubmit)
            document.getElementById(`leave-card-${ele}`).appendChild(reasons)
        }
        document.getElementById(`leave-card-${ele}`).appendChild(leaveSubmit)
    })
}