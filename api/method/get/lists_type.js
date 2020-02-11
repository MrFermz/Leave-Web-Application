const mongo                         =   require('../../mg_connection')
const { verifyToken }               =   require('../../jwt')
const result_failed                 =   {
    result  :   'failed',
    data    :   ''
}
const result_success                =   {
    result  :   'success',
    data    :   ''
}


async function liststype(req, res) {
    let result      =       await verifyToken(req, res)

    if (result) {
        let mongodb      =      await mongo()
        mongodb.collection('usertype').find({}).toArray((error, result) => {
            res.end(JSON.stringify(result))
        })
    }
}


module.exports = liststype