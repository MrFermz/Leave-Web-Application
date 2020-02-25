const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function countleavesfilter(req, res, body) {
    let token   =   verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let start       = data.start
        let end         = data.end
        let UID         = data.user
        let sql         = ''
        if (start && end && !UID) {
            sql         = `SELECT   leaves.leaveType,
                           COUNT(*) AS cnt
                           FROM     leaves
                           WHERE    timeStamp >= '${start}' AND timeStamp <= '${end}'
                           GROUP BY leaves.leaveType
                           ORDER BY leaves.leaveType`
        }
        if (start && end && UID) {
            sql         = `SELECT   leaves.leaveType,
                           COUNT(*) AS cnt
                           FROM     leaves
                           WHERE    timeStamp >= '${start}' AND timeStamp <= '${end}' AND UID = ${UID}
                           GROUP BY leaves.leaveType
                           ORDER BY leaves.leaveType`
        }
        if (UID && (!start || !end)) {
            sql         = `SELECT   leaves.leaveType,
                           COUNT(*) AS cnt
                           FROM     leaves
                           WHERE    UID = ${UID}
                           GROUP BY leaves.leaveType
                           ORDER BY leaves.leaveType`
        }
        if (sql !== '') {
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
    } else {
        result_failed['data']   = error
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = countleavesfilter