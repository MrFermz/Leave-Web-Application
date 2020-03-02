const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function createleaves(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let sql         = `INSERT INTO leaves (leaveType, 
                                               timeStamp,
                                               dateStart, 
                                               dateEnd, 
                                               reasons, 
                                               status, 
                                               UID,
                                               uploadID) 
                           VALUES ?`
        let values      = [[
                            data.leaveType,
                            new Date(),
                            data.dateStart,
                            data.dateEnd,
                            data.reasons,
                            data.status,
                            token.id,
                            data.uploadid
                          ]]
        db.query(sql, [values], async function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                await usedleavedays(token.id, data.leaveType)
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function usedleavedays(id, type) {
    return new Promise(async function (resolve, reject) {
        let sql     = `SELECT leavedaysID FROM users WHERE UID = ${id}`
        db.query(sql, async function (error, result) {
            if (error) reject(error)
            else {
                let ID      = result[0].leavedaysID
                let sql     = `SELECT * FROM leavedays WHERE leavedaysID = ${ID}`
                db.query(sql, function (error, result) {
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
                                value   = sick + 1
                            } break
                            case 'vacation': {
                                value   = vacation + 1
                            } break
                            case 'business': {
                                value   = business + 1
                            } break
                            case 'substitution': {
                                value   = substitution + 1
                            } break
                            default:
                                break
                        }
                        let sql     = `UPDATE leavedays SET ${type} = ${value} WHERE leavedaysID = ${ID}`
                        db.query(sql, function (error, result) {
                            if (error) reject(error)
                            else resolve(result_success)
                        })
                    }
                })
            }
        })
    })
}


module.exports = createleaves