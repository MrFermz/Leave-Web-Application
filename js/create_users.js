const http          =       new XMLHttpRequest()
var values          =       {}
var APPROVERLIST
var TOKEN           =       getToken()


function onChangeCreate() {
    let apprList                =       APPROVERLIST
    let appApprover             =       apprList.find((item)=>{return item.username == document.getElementById('approverID').value})
    values['empID']             =       document.getElementById('empID').value
    values['firstname']         =       document.getElementById('firstname').value
    values['lastname']          =       document.getElementById('lastname').value
    values['nickname']          =       document.getElementById('nickname').value
    values['username']          =       document.getElementById('username').value
    values['password']          =       document.getElementById('password').value
    values['departmentID']      =       document.getElementById('departmentID').value
    values['typeID']            =       document.getElementById('typeID').value
    values['approverID']        =       appApprover.approverID
}


async function initData() {
    let apprArray       =       ''
    let typeList        =       await getList('usertypelist')
    let deptList        =       await getList('userdeptlist')
    const apprList      =       await getList('userapprlist')
    APPROVERLIST        =       apprList
    let typeOptions     =       document.getElementById('typeID').options
    let deptOptions     =       document.getElementById('departmentID').options

    typeList.forEach(option => {
        typeOptions.add(
            new Option(option.name, option.id)
        )
    })

    deptList.forEach(option => {
        deptOptions.add(
            new Option(option.name, option.id)
        )
    })

    for (let i = 0; i < apprList.length; i++) {
        const ele = apprList[i]
        apprArray += `<option data=${ele.UID} value=${ele.username}>`
    }

    document.getElementById('approverlists').innerHTML  =   apprArray
}


function getList(path) {
    let token               =   getToken()
    http.open('POST', `http://localhost:8081/${path}`, true)
    
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


function onCreate() {
    let data        =       values
    if (data.username) {
        http.open('POST', `http://localhost:8081/createuser`, true)
        http.setRequestHeader('x-access-token', TOKEN)
        http.setRequestHeader('Content-Type', 'application/json')
        http.send(JSON.stringify(data))
    }
}