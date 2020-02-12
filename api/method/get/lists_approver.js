const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsapprover(req, res) {
    let result      =       await verifyToken(req, res)

    if (result) {
        let sql     =       `SELECT approver.approverID, 
                                    users.username
                             FROM   approver
                             INNER JOIN users ON approver.UID = users.UID`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                if (result.length > 0) {
                    result_success['data']  = result
                    res.end(JSON.stringify(result_success))
                } else {
                    result_failed['data']   = error
                    res.end(JSON.stringify(result_failed))
                }
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = listsapprover