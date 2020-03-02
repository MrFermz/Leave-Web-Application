var PERM            = [0, 3, 4]
var VALUES          = {}
var DATA, LISTSTYPE, DEPT, APPROVERLIST, SUBS, LEAVEDAYSID


function onLoad() {
    if (PERM.includes(TYPE) && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    DATA                = await sqlQueriesGET('listsusers')
    LISTSTYPE           = await sqlQueriesGET('liststype')
    DEPT                = await sqlQueriesGET('listsdept')
    APPROVERLIST        = await sqlQueriesGET('listsapprover')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    let menu            = await templateMenuManage()
    let card            = await templateTableManage(DATA.data)
    DATA                = DATA.data
    let markup          = sidebar + header + menu
    document.getElementById('container').innerHTML          = markup
    document.getElementById('card-user-detail').innerHTML   = card
}


async function onChange() {
    let card, res
    let data            = {}
    let user            = DATA.find((item) => { return item.nickname == document.getElementById('user').value })
    if (user) {
        data['UID']     = user.UID
        res             = await sqlQueriesPOST('listsuserwhere', data)
        card            = await templateTableManage(res.data, 'filter')
    } else {
        res             = await sqlQueriesGET('listsusers')
        card            = await templateTableManage(res.data, 'filter')
    }
    document.getElementById('table-card').innerHTML   = card
}


async function onEdit(UID) {
    let edit
    let data        = DATA.filter((item) => { return item.UID == UID })
    let LEAVEDAYSID = { id: data[0].leaveDaysID }
    let subsMax     = await sqlQueriesPOST('listsusersleaves', LEAVEDAYSID)
    SUBS            = subsMax.data[0]
    UID             = { UID }
    let appr        = await sqlQueriesPOST('haveapprover', UID)
    if (appr.result == 'success') {
        appr        = appr.data[0]
    } else {
        appr        = ''
    }
    if (APPROVERLIST.result == 'success') {
        edit        = await templateEditManage(data, LISTSTYPE.data, DEPT.data, APPROVERLIST.data, SUBS.substitutionMax, appr)
        toggleModal()
    } else {
        edit        = ''
    }
    document.getElementById('modal-container').innerHTML = edit
}


function onChangeEdit() {
    let approver            = APPROVERLIST.data.find((item)=>{return item.nickname == document.getElementById('modal-approver').value })
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
}


async function onSubmit(UID) {
    VALUES['UID']       = UID
    let data            = VALUES
    if (data.empID) {
        let query           = await sqlQueriesPOST('updateusers', data)
        if (query.result == 'success') {
            toggleModal()
            genContent()
        }
    } else {
        toggleModal()
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