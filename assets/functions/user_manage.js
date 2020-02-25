var VALUES          = {}
var PERM            = [0, 3]
var DATA, LISTSTYPE, DEPT, APPROVERLIST, SUBS, LEAVEDAYSID


function onLoad() {
    if (PERM.includes(TYPE) && TOKEN) {
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
    let card            = await templateTableManage(tbHeader, DATA)
    let markup          = sidebar + header + menu
    document.getElementById('container').innerHTML          = markup
    document.getElementById('card-user-detail').innerHTML   = card
}


async function onEdit(UID) {
    let edit
    let data        = DATA.filter((item) => { return item.UID == UID })
    let LEAVEDAYSID = data[0].leaveDaysID
    let subsMax     = await sqlQueriesLEAVEDAYS('listsusersleaves', LEAVEDAYSID)
    SUBS            = subsMax[0]
    let appr        = await sqlQueriesAPPROVER('haveapprover', UID)
    if (APPROVERLIST) {
        edit        = await templateEditManage(data, LISTSTYPE, DEPT, APPROVERLIST, SUBS.substitutionMax, appr)
        toggleModal()
    } else {
        edit        = ''
    }
    document.getElementById('modal-container').innerHTML = edit
}


function onChangeEdit() {
    let approver            = APPROVERLIST.find((item)=>{ return item.username == document.getElementById('modal-approver').value })
    VALUES['empID']         = document.getElementById('modal-employee-id').value
    VALUES['firstname']     = document.getElementById('modal-first-name').value
    VALUES['lastname']      = document.getElementById('modal-last-name').value
    VALUES['nickname']      = document.getElementById('modal-nickname').value
    VALUES['usertype']      = Number(document.getElementById('modal-user-type').value)
    VALUES['deptType']      = Number(document.getElementById('modal-dept-type').value)
    if (approver) {
        VALUES['approver']  = approver.approverID
    } else {
        VALUES['approver']  = 'null'
    }
    VALUES['leavedaysID']   = SUBS.leavedaysID
    VALUES['subsMax']       = Number(document.getElementById('modal-subs-max').value)
    VALUES['makeAppr']      = document.getElementById('modal-make-approver').checked
    console.log(VALUES)
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
    let side                    = document.getElementById('side-container')
    if (event.target == modal) {
        modal.style.display     = 'none'
        VALUES                  = {}
    }
    if (event.target == side) {
        side.style.display     = 'none'
    }
}