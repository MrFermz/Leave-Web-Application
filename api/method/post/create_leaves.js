const db                                    = require('../../db_connection')
const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')

async function createleaves(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let sql         = `INSERT INTO leaves (leaveType, 
                                               dateStart, 
                                               dateEnd, 
                                               reasons, 
                                               status, 
                                               UID) 
                           VALUES ?`
        let values      = [[
                            data.leaveType,
                            data.dateStart,
                            data.dateEnd,
                            data.reasons,
                            data.status,
                            token.id
                          ]]
        db.query(sql, [values], async function (error, result) {
            let insertId        = result.insertId
            
            if (error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                let leavedays       = await usedleavedays(token.id, data.leaveType)
                if (leavedays.result == 'success') {
                    let updateleave         = await updateleaves(insertId)
                    if (updateleave.result == 'success') {
                        res.end(JSON.stringify(result_success))
                    } else {
                        res.end(JSON.stringify(result_failed))
                    }
                } else {
                    res.end(JSON.stringify(result_failed))
                }
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function usedleavedays(id, type) {
    return new Promise(async function (resolve, reject) {
        let sql     = `SELECT leaveDaysID FROM users WHERE UID = ${id}`
        db.query(sql, async function (error, result) {
            if (error) reject(error)
            else {
                let leaveDaysID     = result[0].leaveDaysID
                let ID              = { id: Number(leaveDaysID) }
                let mongodb         = await mongo()

                mongodb.collection('leavedays').find(ID).toArray((error, result) => {
                    if (error) reject(error)
                    else {
                        let value           = 0
                        let rawResult       = result[0]
                        let sick            = rawResult.sick
                        let vacation        = rawResult.vacation
                        let business        = rawResult.business
                        let substitution    = rawResult.substitution
                        switch (type) {
                            case 'sick': {
                                value = sick + 1
                            } break
                            case 'vacation': {
                                value = vacation + 1
                            } break
                            case 'business': {
                                value = business + 1
                            } break
                            case 'substitution': {
                                value = substitution + 1
                            } break
                            default:
                                break
                        }
                        let data            = { id, [type]: value }
                        data                = { $set: data }
                        
                        mongodb.collection('leavedays').updateOne(ID, data, function (error, result) {
                            if (error) reject(error)
                            else resolve(result_success)
                        })
                    }
                })
            }
        })
    })
}


function updateleaves(insertId) {
    return new Promise(function (resolve, reject) {
        let sql     = `UPDATE   leaves
                       SET      uploadID    = ${insertId}
                       WHERE    leaveID     = ${insertId}`
        db.query(sql, function (error, result) {
            if (error) reject(error)
            else resolve(result_success)
        })
    })
}


module.exports = createleaves