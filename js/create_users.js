var VALUES          = {}
var APPROVERLIST, DEPTLIST


function onLoad() {
    if (TYPE == 0 && TOKEN) {
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
    let appApprover             = apprList.find((item)=>{return item.username == document.getElementById('approverID').value})
    VALUES['empID']             = document.getElementById('empID').value
    VALUES['firstname']         = document.getElementById('firstname').value
    VALUES['lastname']          = document.getElementById('lastname').value
    VALUES['nickname']          = document.getElementById('nickname').value
    VALUES['username']          = document.getElementById('username').value
    VALUES['password']          = document.getElementById('password').value
    VALUES['departmentID']      = document.getElementById('deptSelect').value
    VALUES['typeID']            = document.getElementById('typeSelect').value
    if (appApprover) {
        VALUES['approverID']        = appApprover.approverID
    } else {
        VALUES['approverID']        = ''
    }
}


async function onCreate() {
    let data        = VALUES
    let query       = await sqlQueriesPOST('createusers', data)
    if (query == 'success') {
        location.reload()
    }
}