const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function listsleavemax(req, res) {
    let result      = await verifyToken(req, res)

    if (result) {
        let mongodb     = await mongo()
        mongodb.collection('leavemax').find({}).toArray((error, result) => {
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


module.exports = listsleavemax