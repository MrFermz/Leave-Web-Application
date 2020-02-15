const mongo                                 = require('../../mg_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function updatelieavemax(req, res, body) {
    let token       = await verifyToken(req, res)

    if (token) {
        let data        = JSON.parse(body)
        let mongodb     = await mongo()
        let id          = { id: data.id }
        data            = { $set: data }
        mongodb.collection('leavemax').updateOne(id, data, function (error, result) {
            if (error) {
                console.log(error)
                result_failed['data']   = error
                res.end(JSON.stringify(result_failed))
            } else {
                res.end(JSON.stringify(result_success))
            }
        })
    } else {
        res.end(JSON.stringify(result_failed))
    }
}


module.exports = updatelieavemax