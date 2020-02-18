const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function liststype(req, res) {
    let token       = await verifyToken(req, res)

    if (token) {
        let sql     = `SELECT * FROM usertypes`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                result_success['data']  = result
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = liststype