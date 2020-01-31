
const http          =   new XMLHttpRequest()

var values          =   {}

function onChangeCreate() {

    
    values['empID']             =       document.getElementById('empID').value
    values['firstname']         =       document.getElementById('firstname').value
    values['lastname']          =       document.getElementById('lastname').value
    values['nickname']          =       document.getElementById('nickname').value
    values['username']          =       document.getElementById('username').value
    values['password']          =       document.getElementById('password').value
    values['departments']       =       document.getElementById('departments').value
    values['userType']          =       document.getElementById('userType').value
    values['approver']          =       document.getElementById('approver').value
    



    console.log(values)

}


async function initData() {

    let apprArray       =       ''
    
    let typeList        =       await getList('usertypelist')
    let deptList        =       await getList('userdeptlist')
    let apprList        =       await getList('userapprlist')


    let typeOptions     =       document.getElementById('userType').options
    let deptOptions     =       document.getElementById('departments').options

    console.log(typeList)
    console.log(deptList)
    console.log(apprList)

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

        console.log(ele)

        apprArray += `<option value=${ele.UID} />${ele.username}`
        
    }

    console.log(apprArray)
    document.getElementById('approverlists').innerHTML  =   apprArray

}


function getList(path) {

    let token               =   localStorage.getItem('token')


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
