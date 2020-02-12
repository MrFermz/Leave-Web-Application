const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsusers(req, res) {
    let token       = await verifyToken(req, res)

    if (token) {
        let sql     = `SELECT users.UID,
                              users.empID,
                              users.firstname, 
                              users.lastname, 
                              users.nickname, 
                              users.departmentID, 
                              users.typeID, 
                              users.approverID
                       FROM users`
        db.query(sql, async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                result_success['data']  = result
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = listsusers