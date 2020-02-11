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


async function countleave(req, res) {
    let token   =   verifyToken(req, res)

    if (token) {
        let sql     =       `SELECT leaves.UID,
                                    leaves.leaveType,
                             COUNT(*) AS cnt
                             FROM leaves
                             GROUP BY leaves.UID, 
                                      leaves.leaveType
                             ORDER BY leaves.UID`
        db.query(sql, function (error, result) {
            if (error) throw error
            else res.end(JSON.stringify(result))
        })
    }
}


module.exports = countleave