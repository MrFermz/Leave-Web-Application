const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsApprUsers(req, res) {
    let token       = await verifyToken(req, res)
    if (token) {
        let sql     = `SELECT       approverID
                       FROM         approver
                       WHERE        UID = ${token.id}`
        db.query(sql, async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                if (result.length > 0) {
                    let id                      = result[0].approverID
                    let rawdata                 = await getUsers(id)
                    let data                    = { id, rawdata }
                    result_success['data']      = data
                    res.end(JSON.stringify(result_success))
                } else {
                    res.end(JSON.stringify(result_failed))
                }
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function getUsers(id) {
    return new Promise(function (resolve, reject) {
        let sql     = `SELECT   UID,
                                empID,
                                firstname,
                                lastname,
                                nickname,
                                departmentID,
                                typeID,
                                approverID,
                                leavedaysID
                       FROM users
                       WHERE approverID = ${id}`
        db.query(sql, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = listsApprUsers