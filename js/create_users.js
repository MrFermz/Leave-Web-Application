const http          =       new XMLHttpRequest()
var TYPE            =       localStorage.getItem('type')
var USERNAME        =       localStorage.getItem('username')
var TOKEN           =       getToken()
var values          =       {}
var APPROVERLIST
var DEPTLIST


function onLoad() {
    if (TYPE == 0 && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


function onChangeCreate() {
    let apprList                =       APPROVERLIST
    let appApprover             =       apprList.find((item)=>{return item.username == document.getElementById('approverID').value})
    values['empID']             =       document.getElementById('empID').value
    values['firstname']         =       document.getElementById('firstname').value
    values['lastname']          =       document.getElementById('lastname').value
    values['nickname']          =       document.getElementById('nickname').value
    values['username']          =       document.getElementById('username').value
    values['password']          =       document.getElementById('password').value
    values['departmentID']      =       document.getElementById('deptSelect').value
    values['typeID']            =       document.getElementById('typeSelect').value
    if (appApprover) {
        values['approverID']        =       appApprover.approverID
    } else {
        values['approverID']        =       ''
    }

    // console.log(values)
}


function getList(path) {
    http.open('GET', `http://localhost:8081/${path}`, true)
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


function onCreate() {
    let data        =       values
    if (data.username) {
        http.open('POST', `http://localhost:8081/createuser`, true)
        http.setRequestHeader('x-access-token', TOKEN)
        http.setRequestHeader('Content-Type', 'application/json')
        http.send(JSON.stringify(data))
    }
}


async function genContent() {
    let header              =       document.createElement('div')
    let empID               =       document.createElement('input')
    let firstname           =       document.createElement('input')
    let lastname            =       document.createElement('input')
    let nickname            =       document.createElement('input')
    let username            =       document.createElement('input')
    let password            =       document.createElement('input')
    let deptSelect          =       document.createElement('select')
    let deptOptions         =       document.createElement('option')
    let typeSelect          =       document.createElement('select')
    let typeOptions         =       document.createElement('option')
    let apprInput           =       document.createElement('input')
    let apprDataList        =       document.createElement('datalist')
    let apprOptions         =       document.createElement('option')
    let createBtn           =       document.createElement('input')

    header.innerHTML        =       'create user'

    empID.setAttribute('id', 'empID')
    empID.setAttribute('type', 'text')
    empID.setAttribute('placeholder', 'Employee ID')
    empID.onchange  =       () => onChangeCreate()

    firstname.setAttribute('id', 'firstname')
    firstname.setAttribute('type', 'text')
    firstname.setAttribute('placeholder', 'Firstname')
    firstname.onchange          =       () => onChangeCreate()

    lastname.setAttribute('id', 'lastname')
    lastname.setAttribute('type', 'text')
    lastname.setAttribute('placeholder', 'Lastname')
    lastname.onchange           =       () => onChangeCreate()

    nickname.setAttribute('id', 'nickname')
    nickname.setAttribute('type', 'text')
    nickname.setAttribute('placeholder', 'Nickname')
    nickname.onchange           =       () => onChangeCreate()

    username.setAttribute('id', 'username')
    username.setAttribute('type', 'text')
    username.setAttribute('placeholder', 'Username')
    username.onchange           =       () => onChangeCreate()

    password.setAttribute('id', 'password')
    password.setAttribute('type', 'password')
    password.setAttribute('placeholder', 'Password')
    password.onchange           =       () => onChangeCreate()

    deptSelect.setAttribute('id', 'deptSelect')
    deptSelect.onchange         =       () => onChangeCreate()

    deptOptions.setAttribute('id', 'deptOptions')
    deptOptions.setAttribute('value', '')
    deptOptions.disabled        =       true
    deptOptions.selected        =       true
    deptOptions.innerHTML       =       '-'

    typeSelect.setAttribute('id', 'typeSelect')
    typeSelect.onchange         =       () => onChangeCreate()

    typeOptions.setAttribute('id', 'typeOptions')
    typeOptions.disabled        =       true
    typeOptions.selected        =       true
    typeOptions.innerHTML       =       '-'

    apprInput.setAttribute('id', 'approverID')
    apprInput.setAttribute('list', 'approverlists')
    apprInput.onchange          =       () => onChangeCreate()

    apprDataList.setAttribute('id', 'approverlists')

    apprOptions.setAttribute('id', 'approverOptions')

    createBtn.setAttribute('id', 'create')
    createBtn.setAttribute('type', 'button')
    createBtn.setAttribute('value', 'Create')
    createBtn.onclick           =       () => onCreate()

    document.getElementById('container').appendChild(header)
    document.getElementById('container').appendChild(empID)
    document.getElementById('container').appendChild(firstname)
    document.getElementById('container').appendChild(lastname)
    document.getElementById('container').appendChild(nickname)
    document.getElementById('container').appendChild(username)
    document.getElementById('container').appendChild(password)
    document.getElementById('container').appendChild(deptSelect)
    document.getElementById('deptSelect').appendChild(deptOptions)
    document.getElementById('container').appendChild(typeSelect)
    document.getElementById('typeSelect').appendChild(typeOptions)
    document.getElementById('container').appendChild(apprInput)
    document.getElementById('container').appendChild(apprDataList)
    document.getElementById('approverlists').appendChild(apprOptions)
    document.getElementById('container').appendChild(createBtn)

    const deptList          =       await getList('getdeptlist')
    const typeList          =       await getList('gettypelist')
    const apprList          =       await getList('getapprlist')
    APPROVERLIST            =       apprList
    let deptValue           =       document.getElementById('deptSelect').options
    let typeValue           =       document.getElementById('typeSelect').options
    let apprArray           =       ''

    deptList.forEach(option => {
        deptValue.add(
            new Option(option.name, option.id)
        )
    })

    typeList.forEach(option => {
        typeValue.add(
            new Option(option.name, option.id)
        )
    })

    for (let i = 0; i < apprList.length; i++) {
        const ele = apprList[i]
        apprArray += `<option data=${ele.UID} value=${ele.username}>`
    }

    document.getElementById('approverlists').innerHTML  =   apprArray
    
}