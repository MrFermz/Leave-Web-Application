const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function countleavesfilter(req, res) {
    let token   =   verifyToken(req, res)

    if (token) {
        let now         = new Date()
        let future      = new Date(now.setDate(now.getDate() - 31))
        let today       = new Date()
        dateStart       = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        dateEnd         = `${future.getFullYear()}-${future.getMonth() + 1}-${future.getDate()}`
        let sql         = `SELECT   leaves.leaveType,
                           COUNT(*) AS cnt
                           FROM     leaves
                           WHERE    timeStamp >= '${dateEnd}' AND timeStamp <= '${dateStart}'
                           GROUP BY leaves.leaveType
                           ORDER BY leaves.leaveType`
        db.query(sql, function (error, result) {
            if (error) {
                console.log(error)
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                result_success['data']  = result
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = countleavesfilter