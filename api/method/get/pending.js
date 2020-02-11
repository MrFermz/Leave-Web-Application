const db                        =   require('../../db_connection')
const { verifyToken }           =   require('../../jwt')


async function pending(req, res) {
    let token       =       await verifyToken(req, res)

    if (token) {
        let sql     =       `SELECT COUNT(leaveID) AS cnt
                             FROM   leaves
                             WHERE  UID = ${token.id} AND status = 0`
        db.query(sql, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                res.end(JSON.stringify(result))
            }
        })
    }
}


module.exports = pending