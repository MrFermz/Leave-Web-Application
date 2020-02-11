const db                            =   require('../../db_connection')
const mongo                         =   require('../../mg_connection')
const { verifyToken }               =   require('../../jwt')
const result_failed                 =   {
    result  :   'failed',
    data    :   ''
}
const result_success                =   {
    result  :   'success',
    data    :   ''
}


async function leavedays(req, res) {
    let token       =       await verifyToken(req, res)

    if (token) {
        let mongodb     =       await mongo()
        let sql         =       `SELECT leaveDaysID 
                                 FROM   users
                                 WHERE  UID = ${token.id}`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                if (result.length > 0) {
                    let leaveDaysID         =   result[0].leaveDaysID
                    let queryLeave          =   { id: Number(leaveDaysID)}
                    
                    mongodb.collection('leavedays').find(queryLeave).toArray((error, result) => {
                        res.end(JSON.stringify(result))
                    })
                } else {
                    res.end(JSON.stringify(result_failed))
                }
            }
        })
    }
}


module.exports = leavedays