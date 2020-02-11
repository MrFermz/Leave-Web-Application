

// ======================================== POST METHOD ========================================
const login             = require('./method/post/login')
const create_user       = require('./method/post/create_user')
const approve           = require('./method/post/approve')
const create_leave      = require('./method/post/create_leave')
const update_users      = require('./method/post/update_users')
const upload            = require('./method/post/upload')


// ======================================== GET METHOD ========================================
const leave_days        = require('./method/get/leavedays')
const pending           = require('./method/get/pending')
const lists_leave       = require('./method/get/lists_leave')
const lists_users       = require('./method/get/lists_users')
const all_leave         = require('./method/get/all_leave')
const lists_type        = require('./method/get/lists_type')
const lists_dept        = require('./method/get/lists_dept')
const lists_approver    = require('./method/get/lists_approver')


async function callAPI(req, res, body) {
    let path    =   req.url.toLowerCase()
    let verb    =   req.method

    // POST
    if (verb === 'POST') {
        switch (path) {
            case '/login'       : login(req, res, body)
                break
            case '/createuser'  : create_user(req, res, body)
                break
            case '/createleave' : create_leave(req, res, body)
                break
            case '/approve'     : approve(req, res, body)
                break
            case '/usersupdate' : update_users(req, res, body)
                break
            case '/upload'      : upload(req, res, body)
                break
            default             : res.end('404')
                break
        }
    }

    // GET
    else if (verb === 'GET') {
        switch (path) {
            case '/getleavedays'    : leave_days(req, res)  
                break
            case '/getpendings'     : pending(req, res)
                break
            case '/getleavelists'   : lists_leave(req, res)
                break
            case '/getuserslists'   : lists_users(req, res)
                break
            case '/getallleaves'    : all_leave(req, res)
                break
            case '/gettypelist'     : lists_type(req, res)
                break
            case '/getdeptlist'     : lists_dept(req, res)
                break
            case '/getapprlist'     : lists_approver(req, res)
                break
            default                 : res.end('404')
                break
        }
    } 
    else res.end('404')
}


module.exports.callAPI = callAPI