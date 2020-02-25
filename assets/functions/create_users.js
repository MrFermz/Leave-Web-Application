var VALUES          = {}
var PERM            = [0, 3]
var APPROVERLIST, DEPTLIST


function onLoad() {
    if (PERM.includes(TYPE) && TOKEN) {
        genContent()
    } else {
        notFound()
    }
}


async function genContent() {
    const deptList      = await sqlQueriesGET('listsdept')
    const typeList      = await sqlQueriesGET('liststype')
    const apprList      = await sqlQueriesGET('listsapprover')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    APPROVERLIST        = apprList
    let form            = await templateCreateUsers(deptList, typeList, apprList)
    let markup          = sidebar + header + form
    document.getElementById('container').innerHTML = markup
}


function onChangeCreate() {
    let apprList                = APPROVERLIST
    let appApprover             = apprList.find((item) => { return item.username == document.getElementById('approverID').value })
    VALUES['empID']             = document.getElementById('empID').value
    VALUES['firstname']         = document.getElementById('firstname').value
    VALUES['lastname']          = document.getElementById('lastname').value
    VALUES['nickname']          = document.getElementById('nickname').value
    VALUES['username']          = document.getElementById('username').value
    VALUES['password']          = document.getElementById('password').value
    VALUES['departmentID']      = Number(document.getElementById('deptSelect').value)
    VALUES['typeID']            = Number(document.getElementById('typeSelect').value)
    if (appApprover) {
        VALUES['approverID']        = appApprover.approverID
    } else {
        VALUES['approverID']        = ''
    }
    VALUES['subsMax']           = Number(document.getElementById('subs-max').value)
    VALUES['makeAppr']          = document.getElementById('make-approver').checked
    console.log(VALUES)
}


async function onCreate() {
    let data        = VALUES
    if (data) {
        let query       = await sqlQueriesPOST('createusers', data)
        if (query == 'success') {
            location.reload()
        }
    }
}