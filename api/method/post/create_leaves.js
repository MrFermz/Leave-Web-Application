const db                                    = require('../../db_connection')
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
        db.query(sql, [values], function (error, result) {
            let insertId        = result.insertId

            if (error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                let sql     = `UPDATE   leaves
                               SET      uploadID    = ${insertId}
                               WHERE    leaveID     = ${insertId}`
                db.query(sql, function (error, result) {
                    if (error) {
                        result_failed['data']       = error
                        res.end(JSON.stringify(result_failed))
                    } else {
                        result_success['data']      = insertId
                        res.end(JSON.stringify(result_success))
                    }
                })
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = createleaves