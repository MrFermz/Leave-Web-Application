const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function updatelieavemax(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let sql         = `UPDATE   leavemax
                           SET      sick        = ${data.sick},
                                    business    = ${data.business},
                                    vacation    = ${data.vacation}
                           WHERE    leavemaxID  = ${data.id}`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = updatelieavemax