const db                            =   require('../../db_connection')
const bcrypt                        =   require('bcryptjs')
const { verifyToken }               =   require('../../jwt')
const create_leave_days             =   require('./create_leave_days')
const result_failed                 =   {
    result  :   'failed',
    data    :   ''
}
const result_success                =   {
    result  :   'success',
    data    :   ''
}


async function createuser(req, res, body) {
    let token       =       await verifyToken(req, res)

    if (token) {
        // parse body
        let data            =       JSON.parse(body)

        // encrypt password
        let hashedpwd       =       bcrypt.hashSync(data.password, 8)
        data.password       =       hashedpwd
    
        // database query
        let sql             =       `INSERT INTO users (empID,                  
                                                        firstname,              
                                                        lastname,               
                                                        nickname,               
                                                        username,               
                                                        password,               
                                                        departmentID,           
                                                        typeID,                 
                                                        approverID)             
                                     VALUES ?`
        let values          =       [[
                                        data.empID,
                                        data.firstname,
                                        data.lastname,
                                        data.nickname,
                                        data.username,
                                        data.password,
                                        data.departmentID,
                                        data.typeID,
                                        data.approverID
                                    ]]
        db.query(sql, [values], async function (error, result) {
            let insertId        =       result.insertId

            if(error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result_success))
                let leaveDays       =       await create_leave_days(req, res, insertId)
                let leaveDaysID     =       leaveDays.id
                let sqlLeaveDays    =       `UPDATE users
                                             SET    leaveDaysID     =   ${leaveDaysID}
                                             WHERE  UID             =   ${insertId}`
                db.query(sqlLeaveDays, function(error, result){
                    if (error) throw error
                    else res.end(JSON.stringify(result_success))
                })
            }
        })
    }
}

module.exports = createuser