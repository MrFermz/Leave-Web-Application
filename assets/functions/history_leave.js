var PERM            = [0, 1, 2, 3, 4]
var REQUEST, HISTORY


async function onLoad() {
    let TYPE_FROM_SYS   = await sqlQueriesGET('gettypeid')
    let _TYPE           = TYPE_FROM_SYS.data[0].typeID
    if ((PERM.includes(TYPE) && TYPE === _TYPE) && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let historySelector = await templateHistorySelector()
    REQUEST             = await sqlQueriesGET('historyrequest')
    HISTORY             = await sqlQueriesGET('historyleaves')
    console.log(REQUEST, HISTORY)
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let modal           = await templateModal()
    let cardRequest     = await templateHistoryLeave(REQUEST, HISTORY)
    let markup          = sidebar + header + modal + historySelector + cardRequest
    document.getElementById('container').innerHTML = markup
}


function onChangeTab(type) {
    console.log(type)

    let request             = document.getElementById('card-request')
    let history             = document.getElementById('card-history')
    let requestSelect       = document.getElementById('history-select-request')
    let historySelect       = document.getElementById('history-select-history')

    if (request) {
        requestSelect.style.backgroundColor     = ''
        request.style.display                   = 'none'
    } if (history) {
        historySelect.style.backgroundColor     = ''
        history.style.display                   = 'none'
    }

    switch (type) {
        case 'request'  :   {
                                requestSelect.style.backgroundColor    = '#2ECC71'
                                request.style.display                  = 'block'
                            }    
            break
        case 'history'  :   {
                                historySelect.style.backgroundColor    = '#3498DB'
                                history.style.display                  = 'block'
                            } 
            break
        default:            
            break
    }
}


async function onModalDetail(id, type) {
    console.log(id)
    let content
    if (type == 'request') {
        content = REQUEST.data.find((item) => {return id == item.leaveID})
    }
    if (type == 'history') {
        content = HISTORY.data.find((item) => {return id == item.leaveID})
    }
    console.log(content)
    let edit = await templateMoreDetail(content)
    toggleModal()
    document.getElementById('modal-container').innerHTML = edit
}


function onCancel(id, i) {
    let btn = document.getElementById(`detail-bin-${i}`)
    btn.style.width = '90px'
    setTimeout(() => { btn.innerHTML    = `<div class="confirm" onclick="onConfirm(${id}, '${btn.style.width}', ${i})">Confirm</div>` }, 100)
    setTimeout(() => {
        btn.style.width = '40px'
        btn.innerHTML   = '<img src="../assets/images/wrong.svg"></div>'
    }, 3000)
}


async function onConfirm(id, width, index) {
    let data    = {}
    data['id']  = id
    if (width === '90px') {
        let query = await sqlQueriesPOST('cancel', data)
        if (query.result == 'success') {
            genContent()
        }
        if (query.data == 'desync') {
            let btn             = document.getElementById(`detail-bin-${index}`)
            let status          = document.getElementById(`detail-status-${index}`)
            status.innerHTML    = 'Please reload'
            status.style.color  = 'red'
            btn.style.display   = 'none'
        }
    }
}


function toggleModal() {
    let body                        = document.body
    let modal                       = document.getElementById('modal-container')
    if (modal.style.display == 'block') {
        modal.style.display         = 'none'
        body.style.overflowY        = 'scroll'
    } else {
        modal.style.display         = 'block'
        body.style.overflow         = 'hidden'
    }
}


window.onclick = function (event) {
    let modal                   = document.getElementById('modal-container')
    let side                    = document.getElementById('side-container')
    let body                    = document.body
    if (event.target == modal) {
        body.style.overflowY    = 'scroll'
        modal.style.display     = 'none'
        VALUES                  = {}
    }
    if (event.target == side) {
        side.style.display      = 'none'
    }
}