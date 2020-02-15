const bcrypt                                = require('bcryptjs')
const db                                    = require('../../db_connection')
const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function createusers(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data            = JSON.parse(body)
        let hashedpwd       = bcrypt.hashSync(data.password, 8)
        data.password       = hashedpwd
        let sql             = `INSERT INTO users (empID,                  
                                                  firstname,              
                                                  lastname,               
                                                  nickname,               
                                                  username,               
                                                  password,               
                                                  departmentID,           
                                                  typeID,                 
                                                  approverID)             
                               VALUES ?`
        let values          = [[
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
            let insertId    = result.insertId

            if(error) {
                result_failed['data']   =   error
                res.end(JSON.stringify(result_failed))
            } else {
                let leaveDays       = await createLeavesDays(insertId)
                let leaveDaysID     = leaveDays.id
                let sqlLeaveDays    = `UPDATE users
                                       SET    leaveDaysID     = ${leaveDaysID}
                                       WHERE  UID             = ${insertId}`
                db.query(sqlLeaveDays, function(error, result){
                    if (error) {
                        result_failed['data']   = error
                        res.end(JSON.stringify(result_failed))
                    } else {
                        res.end(JSON.stringify(result_success))
                    }
                })
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function createLeavesDays(insertId) {
    return new Promise(async function (resolve, reject) {
        let mongodb     = await mongo()
        let leave = { id: insertId, sick: 0, business: 0, vacation: 0, substitution: 0, substitution_max: 0 }
        mongodb.collection('leavedays').insertOne(leave, function (error, res) {
            if (error) reject(error)
            else resolve(res.ops[0])
        })
    })
}


module.exports = createusers