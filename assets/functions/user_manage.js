var VALUES          = {}
var DATA, LISTSTYPE, DEPT, APPROVERLIST


function onLoad() {
    if (TYPE == 0 && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    let tbHeader        = ['#', 'name', 'user type']
    DATA                = await sqlQueriesGET('listsusers')
    LISTSTYPE           = await sqlQueriesGET('liststype')
    DEPT                = await sqlQueriesGET('listsdept')
    APPROVERLIST        = await sqlQueriesGET('listsapprover')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let menu            = await templateMenuManage()
    let table           = await templateTableManage(tbHeader, DATA)
    let markup          = sidebar + header + menu + table
    document.getElementById('container').innerHTML = markup
}


async function onEdit(UID) {
    let data        = DATA.filter((item) => { return item.UID == UID })
    let edit        = await templateEditManage(data, LISTSTYPE, DEPT, APPROVERLIST)
    document.getElementById('modal-container').innerHTML = edit
    toggleModal()
}


function onChangeEdit() {
    let approver            = APPROVERLIST.find((item)=>{return item.username == document.getElementById('modal-approver').value})
    VALUES['empID']         = document.getElementById('modal-employee-id').value
    VALUES['firstname']     = document.getElementById('modal-first-name').value
    VALUES['lastname']      = document.getElementById('modal-last-name').value
    VALUES['nickname']      = document.getElementById('modal-nickname').value
    VALUES['usertype']      = document.getElementById('modal-user-type').value
    VALUES['deptType']      = document.getElementById('modal-dept-type').value
    VALUES['approver']      = approver.approverID
}


async function onSubmit(UID) {
    VALUES['UID']       = UID
    let data            = VALUES
    let query           = await sqlQueriesPOST('updateusers', data)
    if (query == 'success') {
        location.reload()
    }
}


function toggleModal() {
    let modal                   = document.getElementById('modal-container')
    modal.style.display         = 'block'
}


window.onclick = function (event) {
    let modal                   = document.getElementById('modal-container')

    if (event.target == modal) {
        modal.style.display     = 'none'
        VALUES                  = {}
    }
}