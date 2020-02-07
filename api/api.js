
const db                            =   require('./db_connection')
const mongo                         =   require('../api/mg_connection')
const bcrypt                        =   require('bcryptjs')
const { getToken, verifyToken }     =   require('./jwt')
const result_failed                 =   {
                                            result  :   'failed',
                                            data    :   ''
                                        }
const result_success                =   {
                                            result  :   'success',
                                            data    :   ''
                                        }


function callAPI(req, res, body) {
    let path    =   req.url.toLowerCase()
    let verb    =   req.method

    // POST
    if (verb === 'POST') {
        switch (path) {

            case '/register'            :       register(req, res, body)
                break

            case '/login'               :       login(req, res, body)
                break

            case '/usertypelist'        :       usertypelist(req, res)
                break

            case '/userdeptlist'        :       userdeptlist(req, res)
                break

            case '/userapprlist'        :       userapprlist(req, res)
                break

            case '/createuser'          :       createuser(req, res, body)
                break

            case '/getleavedays'        :       getleavedays(req, res)
                break

            case '/createleave'         :       createleave(req, res, body)
                break

            case '/approve'             :       approve(req, res, body)
                break

            case '/usersupdate'         :       usersupdate(req, res, body)
                break

            default:
                res.end('404')
                break
        }
    }

    // GET
    else if (verb === 'GET') {
        switch (path) {

            case '/getleavelists'       :       getleavelist(req, res)
                break

            case '/getuserslists'       :       getuserslists(req, res)
                break

            case '/getallleaves'         :       getallleaves(req, res)
                break

            default:
                res.end('404')
                break
        }
    } 
    
    else res.end('404')
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
                let leaveDays       =       await createLeaveDays(req, res, insertId)
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


async function usertypelist(req, res) {
    let result      =       await verifyToken(req, res)

    if (result) {
        let mongodb      =      await mongo()
        mongodb.collection('usertype').find({}).toArray((error, result) => {
            res.end(JSON.stringify(result))
        })
    }
}


async function userdeptlist(req, res) {
    let result      =       await verifyToken(req, res)

    if (result) {
        let mongodb      =      await mongo()
        mongodb.collection('departments').find({}).toArray((error, result) => {
            res.end(JSON.stringify(result))
        })
    }
}


async function userapprlist(req, res) {
    let result      =       await verifyToken(req, res)

    if (result) {
        let sql     =       `SELECT approver.approverID, 
                                    users.username
                             FROM   approver
                             INNER JOIN users ON approver.UID = users.UID`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                if (result.length > 0) {
                    res.end(JSON.stringify(result))
                } else {
                    res.end(JSON.stringify(result_failed))
                }
            }
        })
    }
}


async function getleavedays(req, res) {
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


async function createLeaveDays(req, res, insertId) {
    let token       =       await verifyToken(req, res)
    let mongodb     =       await mongo()

    return new Promise(function (resolve, reject) {
        if (token) {
            let leave       =       {id: insertId, sick: 0, business: 0, vacation: 0, substitution: 0 }
            mongodb.collection('leavedays').insertOne(leave, function (error, res) {
                if (error) reject(error)
                else resolve(res.ops[0])
            })
        }
    })
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


async function getleavelist(req, res) {
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
                                 LIMIT 3`
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



async function approve(req, res, body) {
    let token       =       verifyToken(req, res)

    if (token) {
        let data        =       JSON.parse(body)
        let sql         =       `UPDATE leaves
                                 SET    status      = 1, 
                                        dateApprove = '${data.dateApprove}'
                                 WHERE  leaveID     = ${data.leaveID}`
        db.query(sql, function (error, result) {
            if(error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result_success))
            }
        })
    }
}


async function getuserslists(req, res) {
    let token       =       await verifyToken(req, res)

    if (token) {
        let sql     =       `SELECT users.UID, 
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


async function usersupdate(req, res, body) {
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


async function getallleaves(req, res) {
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


module.exports.callAPI = callAPI