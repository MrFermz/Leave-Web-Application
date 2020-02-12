const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function createLeavesDays(req, res, insertId) {
    let token       = await verifyToken(req, res)
    let mongodb     = await mongo()

    return new Promise(function (resolve, reject) {
        if (token) {
            let leave = { id: insertId, sick: 0, business: 0, vacation: 0, substitution: 0 }
            mongodb.collection('leavedays').insertOne(leave, function (error, res) {
                if (error) reject(error)
                else resolve(res.ops[0])
            })
        } else {
            res.end(JSON.stringify(result_failed))
        }
    })
}


module.exports = createLeavesDays