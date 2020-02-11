const db                            =   require('../../db_connection')
const { verifyToken }               =   require('../../jwt')
const result_failed                 =   {
    result  :   'failed',
    data    :   ''
}
const result_success                =   {
    result  :   'success',
    data    :   ''
}


async function updateusers(req, res, body) {
    let token       =       verifyToken(req, res)

    if (token) {
        let data        =       JSON.parse(body)
        let sql         =       `UPDATE users
                                 SET    firstname   =   '${data.firstname}', 
                                        lastname    =   '${data.lastname}', 
                                        nickname    =   '${data.nickname}', 
                                        typeID      =   '${data.usertype}' 
                                 WHERE  UID         =    ${data.UID}`
        db.query(sql, function (error, result) {
            if (error) throw error
            else console.log('updated')
        })
    }
}


module.exports = updateusers