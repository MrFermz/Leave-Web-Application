const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsusersleaves(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data    = JSON.parse(body)
        let id      = data.id
        let sql     = `SELECT leavedaysID, substitutionMax FROM leavedays WHERE leavedaysID = ${id}`
        db.query(sql, function name(error, result) {
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


module.exports = listsusersleaves