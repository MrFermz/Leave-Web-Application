const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')

async function listsleaves(req, res) {
    let token       = await verifyToken(req, res)
    if (token) {
        // let sql     = `SELECT leaves.leaveID, 
        //                       leaves.leaveType, 
        //                       leaves.dateStart, 
        //                       leaves.dateEnd, 
        //                       leaves.reasons, 
        //                       leaves.status, 
        //                       users.nickname, 
        //                       users.empID
        //                FROM leaves
        //                INNER JOIN users ON leaves.UID = users.UID
        //                WHERE leaves.status = 0 AND approver.UID = ${token.id}
        //                LIMIT 10`
        let sql     = `SELECT       approverID
                       FROM         approver
                       WHERE        UID = ${token.id}`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                // result_success['data']  = result
                // res.end(JSON.stringify(result_success))
                let res     = listsLeaves(result[0].approverID)
                // console.log(res)
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


function listsLeaves(id) {
    console.log(id)
    return new Promise(function (resolve, reject) {

    })
}


module.exports = listsleaves