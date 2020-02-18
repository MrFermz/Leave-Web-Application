const db                                    = require('../../db_connection')
const updateSubsMax                         = require('./update_subs_max')
const createApprover                        = require('./create_approver')
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
                                  deptID        = '${data.deptType}', 
                                  approverID    = '${data.approver}'
                           WHERE  UID           = ${data.UID}`
        db.query(sql, async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                await updateSubsMax(data.leavedaysID, Number(data.subsMax))
                if (data.makeAppr) {
                    await createApprover(data.UID)
                } else {
                    await unmakeApprover(data.UID)
                }
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function unmakeApprover(UID) {
    return new Promise(function (resolve, reject) {
        let sql = `DELETE FROM approver WHERE UID = ${UID}`
        db.query(sql, function (error, result) {
            if (error) reject(error)
            else resolve(result_success)
        })
    })
}


module.exports = updateusers