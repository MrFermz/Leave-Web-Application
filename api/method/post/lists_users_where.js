const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsuserswhere(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data    = JSON.parse(body)
        let UID     = data.UID
        let sql     = `SELECT users.UID,
                              users.empID,
                              users.firstname, 
                              users.lastname, 
                              users.nickname, 
                              users.deptID, 
                              users.typeID, 
                              users.approverID,
                              users.leaveDaysID
                       FROM users
                       WHERE UID = ${UID}`
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


module.exports = listsuserswhere