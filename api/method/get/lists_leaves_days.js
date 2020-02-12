const db                                    = require('../../db_connection')
const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsleavedays(req, res) {
    let token   = await verifyToken(req, res)

    if (token) {
        let mongodb     = await mongo()
        let sql         = `SELECT leaveDaysID 
                           FROM   users
                           WHERE  UID = ${token.id}`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                if (result.length > 0) {
                    let leaveDaysID     = result[0].leaveDaysID
                    let queryLeave      = { id: Number(leaveDaysID) }
                    
                    mongodb.collection('leavedays').find(queryLeave).toArray((error, result) => {
                        if (error) {
                            result_failed['data']   = error
                            res.end(JSON.stringify(result_failed))
                        } else {
                            result_success['data']  = result
                            res.end(JSON.stringify(result_success))
                        }
                    })
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


module.exports = listsleavedays