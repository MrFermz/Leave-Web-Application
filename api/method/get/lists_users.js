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


async function listsusers(req, res) {
    let token       =       await verifyToken(req, res)

    if (token) {
        let sql     =       `SELECT users.UID,
                                    users.empID,
                                    users.firstname, 
                                    users.lastname, 
                                    users.nickname, 
                                    users.departmentID, 
                                    users.typeID, 
                                    users.approverID
                             FROM users`
        db.query(sql, async function (error, result) {
            if (error) throw error
            else {
                res.end(JSON.stringify(result))
            }
        })
    }
}


module.exports = listsusers