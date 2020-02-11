const db                            =   require('../../db_connection')
const bcrypt                        =   require('bcryptjs')
const { getToken }     =   require('../../jwt')
const result_failed                 =   {
    result  :   'failed',
    data    :   ''
}
const result_success                =   {
    result  :   'success',
    data    :   ''
}


function login(req, res, body) {
    // parse body
    let data        =       JSON.parse(body)

    // database query
    let sql         =       `SELECT * FROM users 
                             WHERE username = '${data.username}'`
    db.query(sql, function (error, result) {
        if (error) {
            result_failed['data']   =   error
            res.end(JSON.stringify(result_failed))
        } else {
            if (result.length > 0) {
                const pwdValid              =       bcrypt.compareSync(data.password, result[0].password)
                let username                =       result[0].username
                let id                      =       result[0].UID
                let token                   =       getToken({ id, username })

                if (pwdValid) {
                    result_success['data']      =      token
                    result_success['type']      =      result[0].typeID
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