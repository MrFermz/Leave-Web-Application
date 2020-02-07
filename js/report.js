const http      =       new XMLHttpRequest()
var TOKEN       =       localStorage.getItem('token')
var DATA


async function onLoad() {
    DATA        =       await getAllLeaves()
    await genFilter()
    await genReportTable()
}


function genFilter() {
    let uiLists             =       ['Sick', 'Vacation', 'Business', 'Substitution']
    let filterCard          =       document.createElement('div')
    let dateStart           =       document.createElement('input')
    let dateEnd             =       document.createElement('input')
    let summary             =       document.createElement('div')
    let ul                  =       document.createElement('ul')

    filterCard.setAttribute('class', 'card center')
    filterCard.setAttribute('id', 'filter-card')

    dateStart.setAttribute('id', 'date-start')
    dateStart.setAttribute('type', 'date')
    
    dateEnd.setAttribute('id', 'date-end')
    dateEnd.setAttribute('type', 'date')

    summary.setAttribute('id', 'filter-summary')
    summary.innerHTML       =       'SUMMARY'
    
    ul.setAttribute('id', 'filter-ul')

    document.getElementById('container').appendChild(filterCard)
    document.getElementById('filter-card').appendChild(dateStart)
    document.getElementById('filter-card').appendChild(dateEnd)
    document.getElementById('filter-card').appendChild(summary)
    document.getElementById('filter-card').appendChild(ul)
    
    uiLists.map((ele, i) => {
        let li          =       document.createElement('li')
        li.setAttribute('id', `filter-ui-${i}`)
        li.innerHTML    =       ele
        document.getElementById('filter-ul').appendChild(li)
    })
}


async function genReportTable() {
    let users
    let headers             =       ['#', 'Name', 'Sick', 'Business', 'Vacation', 'Substitution']
    let reportContainer     =       document.createElement('div')
    let table               =       document.createElement('table')
    let trHeader            =       document.createElement('tr')

    reportContainer.setAttribute('class', 'report-table center')
    reportContainer.setAttribute('id', 'report-table')

    table.setAttribute('id', 'table')

    trHeader.setAttribute('id', 'tr-header')

    document.getElementById('container').appendChild(reportContainer)
    document.getElementById('report-table').appendChild(table)
    document.getElementById('table').appendChild(trHeader)

    headers.map((ele, i) => {
        let th          =           document.createElement('th')
        th.setAttribute('id', `th-${i}`)
        th.innerHTML    =           ele
        document.getElementById('tr-header').appendChild(th)
    })

    users   =   await sortUsers()

    users.map((ele, i) => {
        let tr                  =       document.createElement('tr')
        let tdNo                =       document.createElement('td')
        let tdName              =       document.createElement('td')
        let tdSick              =       document.createElement('td')
        let tdBusiness          =       document.createElement('td')
        let tdVacation          =       document.createElement('td')
        let tdSubstitution      =       document.createElement('td')

        tr.setAttribute('id', `tr-content-${i}`)

        tdNo.setAttribute('id', `td-no-${i}`)
        tdNo.innerHTML      =       i + 1

        tdName.setAttribute('id', `td-name-${i}`)
        tdName.innerHTML      =       ele.UID

        tdSick.setAttribute('id', `td-sick-${i}`)
        tdSick.innerHTML    =       ele.sick

        tdBusiness.setAttribute('id', `td-business-${i}`)
        tdBusiness.innerHTML    =       ele.business

        tdVacation.setAttribute('id', `td-vacation-${i}`)
        tdVacation.innerHTML    =       ele.vacation

        tdSubstitution.setAttribute('id', `td-substitution-${i}`)
        tdSubstitution.innerHTML    =       ele.substitution

        document.getElementById('table').appendChild(tr)
        document.getElementById(`tr-content-${i}`).appendChild(tdNo)
        document.getElementById(`tr-content-${i}`).appendChild(tdName)
        document.getElementById(`tr-content-${i}`).appendChild(tdSick)
        document.getElementById(`tr-content-${i}`).appendChild(tdBusiness)
        document.getElementById(`tr-content-${i}`).appendChild(tdVacation)
        document.getElementById(`tr-content-${i}`).appendChild(tdSubstitution)
    })
}


function getAllLeaves() {
    http.open('GET', `http://localhost:8081/getallleaves`, true)
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


function sortUsers() {
    let data                =       []
    let unsortUID           =       []
    let sortedUID           =       []
    let sick                
    let vacation            
    let business            
    let substitution        
    return new Promise(function (resolve, reject) {
        DATA.forEach((ele, i) => {
            unsortUID.push(ele.UID)
        })

        sortedUID = [...new Set(unsortUID)]

        sortedUID.forEach((uid_ele, uid_i) => {
            data.push({UID: uid_ele, sick, vacation, business, substitution})
            sick                =   0
            vacation            =   0
            business            =   0
            substitution        =   0
            DATA.forEach((data_ele, data_i) => {
                if (data_ele.UID == uid_ele) {
                    switch (data_ele.leaveType) {
                        case 'sick'             :       sick = data_ele.cnt
                            break

                        case 'vacation'         :       vacation = data_ele.cnt
                            break

                        case 'business'         :       business = data_ele.cnt
                            break

                        case 'substitution'     :       substitution = data_ele.cnt
                            break
                    
                        default:
                            break
                    }
                    data[uid_i] = {UID: data_ele.UID, sick, vacation, business, substitution}
                }
            })
        })
        resolve(data)
    })
}
