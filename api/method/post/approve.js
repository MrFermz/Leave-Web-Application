const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')

async function approve(req, res, body) {
    let token       = verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let sql         = `UPDATE leaves
                           SET    status      = 1, 
                                  dateApprove = '${data.dateApprove}'
                           WHERE  leaveID     = ${data.leaveID}`
        db.query(sql, function (error, result) {
            if(error) {
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


module.exports  =   approve