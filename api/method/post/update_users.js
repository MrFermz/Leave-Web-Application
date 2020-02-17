const db                                    = require('../../db_connection')
const mongo                                 = require('../../mg_connection')
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
        db.query(sql, async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                let subs        = await updateSubsMax(data.leaveDaysID, Number(data.subsMax))
                if (subs.result == 'success') {
                    res.end(JSON.stringify(result_success))
                }
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function updateSubsMax(ID, subs) {
    return new Promise(async function (resolve, reject) {
        let mongodb         = await mongo()
        let id              = { id: ID }
        let substitution    = { substitution_max: subs }
        let data            = { $set: substitution }
        mongodb.collection('leavedays').updateOne(id, data, function (error, result) {
            if (error) reject(error)
            else resolve(result_success)
        })
    })
}


module.exports = updateusers