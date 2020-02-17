const db                                    = require('../../db_connection')
const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsusersleaves(req, res) {
    let token   = await verifyToken(req, res)

    if (token) {
        let mongodb         = await mongo()
        let leaveDaysID     = req.headers['leavedaysid']
        let queryLeave      = { id: Number(leaveDaysID) }
        
        mongodb.collection('leavedays').find(queryLeave).toArray((error, result) => {
            if (error) {
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


module.exports = listsusersleaves