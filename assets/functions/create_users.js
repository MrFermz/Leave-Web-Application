var PERM            = [0, 3]
var VALUES          = {}
var APPROVERLIST, DEPTLIST


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
    const deptList      = await sqlQueriesGET('listsdept')
    const typeList      = await sqlQueriesGET('liststype')
    const apprList      = await sqlQueriesGET('listsapprover')
    let sidebar         = await templateSidebar()
    let header          = await templateHeader()
    APPROVERLIST        = apprList.data
    let form            = await templateCreateUsers(deptList.data, typeList.data, APPROVERLIST)
    let markup          = sidebar + header + form
    document.getElementById('container').innerHTML = markup
}


function onChangeCreate() {
    let apprList                = APPROVERLIST
    let appApprover             = apprList.find((item) => { return item.nickname == document.getElementById('approverID').value })
    VALUES['empID']             = document.getElementById('empID').value
    VALUES['firstname']         = document.getElementById('firstname').value
    VALUES['lastname']          = document.getElementById('lastname').value
    VALUES['nickname']          = document.getElementById('nickname').value
    VALUES['username']          = document.getElementById('username').value
    let pass                    = document.getElementById('password').value
    let rePass                  = document.getElementById('re-password').value
    if (pass === rePass) {
        VALUES['password']      = pass
    }
    VALUES['departmentID']      = Number(document.getElementById('deptSelect').value)
    VALUES['typeID']            = Number(document.getElementById('typeSelect').value)
    if (appApprover) {
        VALUES['approverID']        = appApprover.approverID
    } else {
        VALUES['approverID']        = ''
    }
    VALUES['subsMax']           = Number(document.getElementById('subs-max').value)
    VALUES['makeAppr']          = document.getElementById('make-approver').checked
}


async function onCreate() {
    let btn     = document.getElementById('create')
    let data    = VALUES
    if (Object.entries(data).length > 0 
            && data.empID.length > 0
            && data.firstname.length > 0
            && data.lastname.length > 0
            && data.nickname.length > 0
            && data.username.length > 0
            && data.password.length > 0
            && data.departmentID > -1
            && data.typeID > -1
            && data.approverID > -1) {
        btn.disabled    = true
        let query       = await sqlQueriesPOST('createusers', data)
        if (query.result == 'success') {
            onUsersManage()
        }
    }
}