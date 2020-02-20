const bcrypt                                = require('bcryptjs')
const db                                    = require('../../db_connection')
const { getToken }                          = require('../../jwt')
const { result_success, result_failed }     = require('../result')


function login(req, res, body) {
    let data        = JSON.parse(body)
    data.username   = data.username.toLowerCase()
    let sql         = `SELECT * 
                       FROM     users 
                       WHERE    username = '${data.username}'`
    db.query(sql, function (error, result) {
        if (error) {
            result_failed['data']   = error
            res.end(JSON.stringify(result_failed))
        } else {
            if (result.length > 0) {
                const pwdValid              = bcrypt.compareSync(data.password, result[0].password)
                let username                = result[0].username
                let id                      = result[0].UID
                let token                   = getToken({ id, username })

                if (pwdValid) {
                    result_success['data']      = token
                    result_success['type']      = result[0].typeID
                    res.end(JSON.stringify(result_success))
                } else {
                    res.end(JSON.stringify(result_failed))
                }
            } else {
                res.end(JSON.stringify(result_failed))
            }
        }
    })
}


module.exports = login