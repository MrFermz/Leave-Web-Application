const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsleavedays(req, res) {
    let token   = await verifyToken(req, res)

    if (token) {
        let sql         = `SELECT leaveDaysID 
                           FROM   users
                           WHERE  UID = ${token.id}`
        db.query(sql, async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                if (result.length > 0) {
                    let leaveDaysID         = result[0].leaveDaysID
                    let days                = await getLeaveDays(leaveDaysID)
                    result_success['data']  = days
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


function getLeaveDays(id) {
    return new Promise(function (resolve, reject) {
        let sql     = `SELECT * FROM leavedays WHERE leavedaysID = ${id}`
        db.query(sql, function (error, result) {
            if (error) reject(error)
            else resolve(result[0])
        })
    })
}


module.exports = listsleavedays