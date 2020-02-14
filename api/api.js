

// ======================================== POST METHOD ========================================
const approve           = require('./method/post/approve')
const create_leaves     = require('./method/post/create_leaves')
const create_users      = require('./method/post/create_users')
const login             = require('./method/post/login')
const update_users      = require('./method/post/update_users')
const uploaders         = require('./method/post/uploaders')


// ======================================== GET METHOD ========================================
const count_leaves      = require('./method/get/count_leaves')
const lists_approver    = require('./method/get/lists_approver')
const lists_dept        = require('./method/get/lists_dept')
const lists_leave_days  = require('./method/get/lists_leaves_days')
const lists_appr_users  = require('./method/get/lists_appr_users')
const lists_appr_leaves = require('./method/get/lists_appr_leaves')
const lists_pendings    = require('./method/get/lists_pendings')
const lists_type        = require('./method/get/lists_type')
const lists_users       = require('./method/get/lists_users')


// ======================================== VERB LIST ========================================
const verbs             =   ['POST', 'GET']


async function callAPI(req, res, body) {
    let path    =   req.url.toLowerCase()
    let verb    =   req.method

    // POST
    if (verb === verbs[0]) {
        switch (path) {
            case '/login'           : login(req, res, body)
                break
            case '/createusers'     : create_users(req, res, body)
                break
            case '/createleaves'    : create_leaves(req, res, body)
                break
            case '/approve'         : approve(req, res, body)
                break
            case '/updateusers'     : update_users(req, res, body)
                break
            case '/uploaders'       : uploaders(req, res, body)
                break
            default                 : res.end('404')
                break
        }
    }

    // GET
    else if (verb === verbs[1]) {
        switch (path) {
            case '/listsleavedays'  : lists_leave_days(req, res)  
                break
            case '/listspendings'   : lists_pendings(req, res)
                break
            case '/listsapprusers'  : lists_appr_users(req, res)
                break
            case '/listsappleaves'  : lists_appr_leaves(req, res)
                break
            case '/listsusers'      : lists_users(req, res)
                break
            case '/countleaves'     : count_leaves(req, res)
                break
            case '/liststype'       : lists_type(req, res)
                break
            case '/listsdept'       : lists_dept(req, res)
                break
            case '/listsapprover'   : lists_approver(req, res)
                break
            default                 : res.end('404')
                break
        }
    } 
    else res.end('404')
}


module.exports.callAPI = callAPI