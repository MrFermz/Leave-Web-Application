
const http      =       new XMLHttpRequest()

var TOKEN       =       localStorage.getItem('token')
var DATA
var TYPE


function onLoad() {
    // console.log(TOKEN)

    
    genContent()
}


async function genContent() {

    let headers             =       ['#', 'name', 'user type']
    DATA                    =       await getUsersLists()
    TYPE                    =       await getTypeList()

    console.log(DATA)
    console.log(TYPE)

    // let typeName            =       data.find((item) => { return item.typeID == 0})
    // console.log(typeName)


    
    let createUsers         =       document.createElement('input')
    let table               =       document.createElement('table')
    let trHeader            =       document.createElement('tr')
    
    
    
    createUsers.setAttribute('type', 'button')
    createUsers.setAttribute('id', 'create-users')
    createUsers.setAttribute('value', 'Create user')
    createUsers.onclick         =       () => onCreateusers()

    table.setAttribute('id', 'table-users')
    table.className             =       'center'

    trHeader.setAttribute('id', 'tr-header')

    
    document.getElementById('container').appendChild(createUsers)
    document.getElementById('container').appendChild(table)
    document.getElementById('table-users').appendChild(trHeader)
    
    headers.map((ele, i) => {

        let th                  =       document.createElement('th')

        th.setAttribute('id', `th-${i}`)
        th.innerHTML            =       ele

        document.getElementById('tr-header').appendChild(th)


    })

    

    
    

    DATA.map((ele, i) => {
        // console.log(ele)

        
        
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
        
        let typeName                =       typeCompare(ele, TYPE)
        
        tdUserType.innerHTML        =       typeName
        

        
        
        document.getElementById('table-users').appendChild(trContent)
        document.getElementById(`tr-content-${i}`).appendChild(tdNo)
        document.getElementById(`tr-content-${i}`).appendChild(tdUsername)
        document.getElementById(`tr-content-${i}`).appendChild(tdUserType)

    })
    
    

    // Modal gen
    let modalContainer      =       document.createElement('div')
    let modalContent        =       document.createElement('div')
    let text                =       document.createElement('div')

    modalContainer.setAttribute('id', 'modal-container')
    modalContainer.setAttribute('class', 'modal-container')
    // modalContainer.onclick  =       () => toggleModal()

    modalContent.setAttribute('id', 'modal-content')
    modalContent.setAttribute('class', 'modal-content')

    text.innerHTML          =       'test modal.'
    


    document.getElementById('container').appendChild(modalContainer)
    document.getElementById('modal-container').appendChild(modalContent)
    document.getElementById('modal-content').appendChild(text)

    


}


function getUsersLists() {
    
    http.open('GET', `http://localhost:8081/getuserslists`, true)
    
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


function getTypeList() {
    
    http.open('POST', `http://localhost:8081/usertypelist`, true)
    
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


function typeCompare(ele, type) {
    for (const value of type) {
        if (value.id == ele.typeID) {
            return typeName    =   value.name
        }
    }
}


function onEdit(UID) {

    let data                        =       DATA.filter((item) => { return item.UID == UID})
    let modalFirstname              =       document.createElement('input')
    let modalLastname               =       document.createElement('input')
    let modalNickname               =       document.createElement('input')
    let modalUserType               =       document.createElement('select')
    

    data.forEach(ele => {
        console.log(ele)
        document.getElementById('modal-content').innerHTML      =       ele.UID

        modalFirstname.setAttribute('id', 'modal-first-name')
        modalFirstname.defaultValue     =       ele.firstname

        modalLastname.setAttribute('id', 'modal-last-name')
        modalLastname.defaultValue      =        ele.lastname

        modalNickname.setAttribute('id', 'modal-last-nickname')
        modalNickname.defaultValue      =        ele.nickname

        modalUserType.setAttribute('id', 'modal-user-type')

        




        document.getElementById('modal-content').appendChild(modalFirstname)
        document.getElementById('modal-content').appendChild(modalLastname)
        document.getElementById('modal-content').appendChild(modalNickname)
        document.getElementById('modal-content').appendChild(modalUserType)

        for (const type of TYPE) {
            let modalUserTypeOptions        =       document.createElement('option')
            console.log(ele.typeID)
            modalUserTypeOptions.setAttribute('value', type.id)
            if (ele.typeID == type.id) {
                modalUserTypeOptions.setAttribute('selected', ele.typeID)
            }
            modalUserTypeOptions.innerHTML      =       type.name
            
            document.getElementById('modal-user-type').appendChild(modalUserTypeOptions)
        }
        


        
    })

    toggleModal()
    
}


function toggleModal() {
    let modal               =       document.getElementById('modal-container')

    modal.style.display     =       'block'
}


window.onclick = function (event) {
    let modal               =       document.getElementById('modal-container')
    if (event.target == modal) {
        modal.style.display     =       'none'
    }
}