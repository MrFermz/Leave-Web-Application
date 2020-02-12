const http          = new XMLHttpRequest()
var TYPE            = localStorage.getItem('type')
var USERNAME        = localStorage.getItem('username')
var TOKEN           = getToken()
var VALUES          = {}
var DATA
var TYPE
var DEPT
var APPROVERLIST


function onLoad() {
    if (TYPE == 0 && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let headers             = ['#', 'name', 'user type']
    DATA                    = await getList('listsusers')
    TYPE                    = await getList('liststype')
    DEPT                    = await getList('listsdept')
    APPROVERLIST            = await getList('listsapprover')
    let createUsers         = document.createElement('input')
    let table               = document.createElement('table')
    let trHeader            = document.createElement('tr')
    
    createUsers.setAttribute('type', 'button')
    createUsers.setAttribute('id', 'create-users')
    createUsers.setAttribute('value', 'Create user')
    createUsers.onclick         = () => onCreateusers()

    table.setAttribute('id', 'table-users')
    table.className             = 'center'

    trHeader.setAttribute('id', 'tr-header')

    document.getElementById('container').appendChild(createUsers)
    document.getElementById('container').appendChild(table)
    document.getElementById('table-users').appendChild(trHeader)
    
    headers.map((ele, i) => {
        let th                  = document.createElement('th')
        th.setAttribute('id', `th-${i}`)
        th.innerHTML            = ele
        document.getElementById('tr-header').appendChild(th)
    })
    
    DATA.map((ele, i) => {
        let typeName
        let trContent           =       document.createElement('tr')
        let tdNo                =       document.createElement('td')
        let tdUsername          =       document.createElement('td')
        let tdUserType          =       document.createElement('td')

        trContent.setAttribute('id', `tr-content-${i}`)
        trContent.onclick       =       () => onEdit(ele.UID)

        tdUsername.setAttribute('id', `td-username-${i}`)
        tdNo.setAttribute('id', `td-no-${i}`)
        tdUserType.setAttribute('id', `td-type-${i}`)
        
        tdNo.innerHTML              =       i + 1
        tdUsername.innerHTML        =       `${ele.firstname} ${ele.lastname} (${ele.nickname})`
        
        typeName                    =       typeCompare(ele, TYPE)
        
        tdUserType.innerHTML        =       typeName
        
        document.getElementById('table-users').appendChild(trContent)
        document.getElementById(`tr-content-${i}`).appendChild(tdNo)
        document.getElementById(`tr-content-${i}`).appendChild(tdUsername)
        document.getElementById(`tr-content-${i}`).appendChild(tdUserType)
    })
}


function getList(path) {
    http.open('GET', `http://localhost:8081/${path}`, true)
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


function typeCompare(ele, type) {
    for (const value of type) {
        if (value.id == ele.typeID) {
            return typeName    =   value.name
        }
    }
}


function onEdit(UID) {
    let data                        =       DATA.filter((item) => { return item.UID == UID})

    let modalContainer              =       document.createElement('div')
    let modalContent                =       document.createElement('div')

    let modalEmpIDContainer         =       document.createElement('div')
    let modalEmployeeID             =       document.createElement('input')

    let modalNameContainer          =       document.createElement('div')
    let modalFirstname              =       document.createElement('input')
    let modalLastname               =       document.createElement('input')
    let modalNickname               =       document.createElement('input')

    let modalSelectContainer        =       document.createElement('div')
    let modalUserType               =       document.createElement('select')
    let modalUserDept               =       document.createElement('select')

    let modalApprInput              =       document.createElement('input')
    let modalApprDataList           =       document.createElement('datalist')
    let modalApprOptions            =       document.createElement('option')

    let submitBtn                   =       document.createElement('input')

    modalContainer.setAttribute('id', 'modal-container')
    modalContainer.setAttribute('class', 'modal-container')
    modalContainer.onclick          =       () => toggleModal()
    
    modalContent.setAttribute('id', 'modal-content')
    modalContent.setAttribute('class', 'modal-content')
    
    modalNameContainer.setAttribute('id', 'modal-name-container')

    modalEmpIDContainer.setAttribute('id', 'modal-empid-container')

    modalSelectContainer.setAttribute('id', 'modal-select-container')

    data.forEach(ele => {
        modalEmployeeID.setAttribute('id', 'modal-employee-id')
        modalEmployeeID.setAttribute('type', 'number')
        modalEmployeeID.defaultValue    =       ele.empID
        modalEmployeeID.onchange        =       () => onChangeEdit()

        modalFirstname.setAttribute('id', 'modal-first-name')
        modalFirstname.defaultValue     =       ele.firstname
        modalFirstname.onchange         =       () => onChangeEdit()
        
        modalLastname.setAttribute('id', 'modal-last-name')
        modalLastname.defaultValue      =        ele.lastname
        modalLastname.onchange          =       () => onChangeEdit()
        
        modalNickname.setAttribute('id', 'modal-nickname')
        modalNickname.defaultValue      =        ele.nickname
        modalNickname.onchange          =       () => onChangeEdit()
        
        modalUserType.setAttribute('id', 'modal-user-type')
        modalUserType.onchange          =       () => onChangeEdit()

        modalUserDept.setAttribute('id', 'modal-dept-type')
        modalUserDept.onchange          =       () => onChangeEdit()



        document.getElementById('container').appendChild(modalContainer)
        document.getElementById('modal-container').appendChild(modalContent)

        document.getElementById('modal-content').appendChild(modalEmpIDContainer)
        document.getElementById('modal-empid-container').appendChild(modalEmployeeID)

        document.getElementById('modal-content').appendChild(modalNameContainer)
        document.getElementById('modal-name-container').appendChild(modalFirstname)
        document.getElementById('modal-name-container').appendChild(modalLastname)
        document.getElementById('modal-name-container').appendChild(modalNickname)
        
        document.getElementById('modal-content').appendChild(modalSelectContainer)
        document.getElementById('modal-select-container').appendChild(modalUserType)
        document.getElementById('modal-select-container').appendChild(modalUserDept)


        for (const type of TYPE) {
            let modalUserTypeOptions            =       document.createElement('option')
            modalUserTypeOptions.setAttribute('value', type.id)
            if (ele.typeID == type.id) {
                modalUserTypeOptions.setAttribute('selected', ele.typeID)
            }
            modalUserTypeOptions.innerHTML      =       type.name
            
            document.getElementById('modal-user-type').appendChild(modalUserTypeOptions)
        }

        for (const dept of DEPT) {
            let modalUserDeptOptions            =       document.createElement('option')
            modalUserDeptOptions.setAttribute('value', dept.id)
            if (ele.departmentID == dept.id) {
                modalUserDeptOptions.setAttribute('selected', ele.departmentID)
            }
            modalUserDeptOptions.innerHTML      =       dept.name

            document.getElementById('modal-dept-type').appendChild(modalUserDeptOptions)
        }

        let apprArray       =       ''
        for (let i = 0; i < APPROVERLIST.length; i++) {
            const appr = APPROVERLIST[i]
            // console.log(ele.approverID, appr.approverID)
            if (ele.approverID == appr.approverID) {
                modalApprInput.setAttribute('value', `${appr.username}`)
            }
            apprArray += `<option data=${appr.approverID} value=${appr.username}>`
        }

        modalApprInput.setAttribute('id', 'modal-approver')
        modalApprInput.setAttribute('list', 'modal-approver-lists')
        modalApprInput.onchange         =      () => onChangeEdit()
    
        modalApprDataList.setAttribute('id', 'modal-approver-lists')
    
        modalApprOptions.setAttribute('id', 'modal-approver-options')

        submitBtn.setAttribute('id', 'modal-submit')
        submitBtn.setAttribute('value', 'submit')
        submitBtn.setAttribute('type', 'button')
        submitBtn.onclick               =       () => onSubmit(ele.UID)

        document.getElementById('modal-select-container').appendChild(modalApprInput)
        document.getElementById('modal-approver').appendChild(modalApprDataList)
        document.getElementById('modal-approver-lists').appendChild(modalApprOptions)
        document.getElementById('modal-approver-lists').innerHTML       =       apprArray
        document.getElementById('modal-content').appendChild(submitBtn)
        
    })
    toggleModal()
}


function toggleModal() {
    let modal               =       document.getElementById('modal-container')
    modal.style.display     =       'block'
}


window.onclick = function (event) {
    let modal                   =       document.getElementById('modal-container')
    let modalContent            =       document.getElementById('modal-content')

    if (event.target == modal) {
        modal.style.display     =       'none'
        VALUES                  =       {}
        modalContent.parentNode.removeChild(modalContent)
    }
}


function onChangeEdit() {
    let approver            =       APPROVERLIST.find((item)=>{return item.username == document.getElementById('modal-approver').value})
    VALUES['empID']         =       document.getElementById('modal-employee-id').value
    VALUES['firstname']     =       document.getElementById('modal-first-name').value
    VALUES['lastname']      =       document.getElementById('modal-last-name').value
    VALUES['nickname']      =       document.getElementById('modal-nickname').value
    VALUES['usertype']      =       Number(document.getElementById('modal-user-type').value)
    VALUES['deptType']      =       Number(document.getElementById('modal-dept-type').value)
    VALUES['approver']      =       approver.approverID

    console.log(VALUES)
}


function onSubmit(UID) {
    VALUES['UID']           =       UID
    let data                =       VALUES
    http.open('POST', `http://localhost:8081/updateusers`, true)
    http.setRequestHeader('x-access-token', TOKEN)
    http.setRequestHeader('Content-Type', 'application/json')
    http.send(JSON.stringify(data))
    location.reload()
}