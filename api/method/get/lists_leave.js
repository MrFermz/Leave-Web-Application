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


async function leavelists(req, res) {
    let token       =       await verifyToken(req, res)

    if (token) {
        let sql         =       `SELECT leaves.leaveID, 
                                        leaves.leaveType, 
                                        leaves.dateStart, 
                                        leaves.dateEnd, 
                                        leaves.reasons, 
                                        leaves.status, 
                                        users.nickname, 
                                        users.empID
                                 FROM leaves
                                 INNER JOIN users ON leaves.UID = users.UID
                                 WHERE leaves.status = 0 AND users.approverID = ${token.id}
                                 LIMIT 10`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result))
            }
        })
    } 
}


module.exports = leavelists