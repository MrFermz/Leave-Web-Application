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

async function createleave(req, res, body) {
    let token       =       await verifyToken(req, res)

    if (token) {
        let data        =   JSON.parse(body)
        let sql         =   `INSERT INTO leaves (leaveType, 
                                                 dateStart, 
                                                 dateEnd, 
                                                 reasons, 
                                                 status, 
                                                 UID) 
                             VALUES ?`
        let values      =   [[
                                data.leaveType,
                                data.dateStart,
                                data.dateEnd,
                                data.reasons,
                                data.status,
                                token.id
                            ]]
        db.query(sql, [values], function (error, result) {
            if(error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result_success))
            }
        })
    }
}


module.exports = createleave