const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsApprLeaves(req, res) {
    let token       = await verifyToken(req, res)
    if (token) {
        let sql     = `SELECT   leaves.leaveID,
                                leaves.leaveType,
                                leaves.timeStamp,
                                leaves.dateStart,
                                leaves.dateEnd,
                                leaves.reasons,
                                leaves.status,
                                leaves.UID,
                                leaves.uploadID
                       FROM     leaves
                       WHERE    leaves.status = 0
                       ORDER BY leaves.timeStamp ASC`
        db.query(sql, async function (error, result) {
            let leaves              = result
            let images              = []
            if (error) {
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                let sql     = `SELECT * FROM uploads`
                db.query(sql, function (error, image) {
                    images      = image
                    for (const leave of leaves) {
                        let uploadID        = leave.uploadID
                        for (const image of images) {
                            let imageID     = image.uploadID
                            if (uploadID == imageID) {
                                leave.path = image.URL
                            }
                        }
                    }
                    if (error) {
                        result_failed['data']   = error
                        res.end(JSON.stringify(result_failed))
                    } else {
                        result_success['data']  = result
                        res.end(JSON.stringify(result_success))
                    }
                })
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = listsApprLeaves