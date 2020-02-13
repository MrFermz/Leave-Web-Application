const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function updateusers(req, res, body) {
    let token       = verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let sql         = `UPDATE users
                           SET    empID         = '${data.empID}', 
                                  firstname     = '${data.firstname}', 
                                  lastname      = '${data.lastname}', 
                                  nickname      = '${data.nickname}', 
                                  typeID        = '${data.usertype}', 
                                  departmentID  = '${data.deptType}', 
                                  approverID    = '${data.approver}'
                           WHERE  UID           = ${data.UID}`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = updateusers