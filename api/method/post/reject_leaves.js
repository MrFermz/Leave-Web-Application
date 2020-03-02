const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function rejectLeaves(req, res, body) {
    let token           = await verifyToken(req, res)
    
    if (token) {
        let data        = JSON.parse(body)
        let sql         = `UPDATE leaves
                           SET    status        = 2, 
                                  dateReject    = '${data.dateReject}',
                                  rejectReasons = '${data.reasons}'
                           WHERE  leaveID       = ${data.leaveID}`
        db.query(sql, async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                let response    = await restoreDays(data.leaveDaysID, data.leaveType)
                if (response.result == 'success') {
                    res.end(JSON.stringify(result_success))
                } else {
                    res.end(JSON.stringify(result_failed))
                }
            }
        })
    }
}


function restoreDays(leaveDaysID, leaveType) {
    return new Promise(function (resolve, reject) {
        let sql     = `SELECT ${leaveType} FROM leavedays WHERE leavedaysID = ${leaveDaysID}`
        db.query(sql, function (error, result) {
            if (error) reject(error)
            else {
                let remain          = result[0]
                let key             = Object.keys(remain)[0]
                let value           = remain[key] - 1
                let sql     = `UPDATE leavedays SET ${key} = ${value} WHERE leavedaysID = ${leaveDaysID}`
                db.query(sql, function (error, result) {
                    if (error) reject(error)
                    else resolve(result_success)
                })
            }
        })
    })
}


module.exports = rejectLeaves