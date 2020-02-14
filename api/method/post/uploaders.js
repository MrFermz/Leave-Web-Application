const fs                                    = require('fs')
const path                                  = require('path')
const mongo                                 = require('../../mg_connection')
const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function uploaders(req, res, body) {
    let token       = await verifyToken(req, res)
    if (token) {
        let data        = body
        let id          = req.headers['uploadid']
        let type        = req.headers['content-type'].split('/')[1]
        let timeStamp   = Date.now()
        let filename    = `${token.id}_${timeStamp}.${type}`
        fs.writeFile(`uploads/${filename}`, data, async function (error) {
            if (error) {
                result_failed['data']       = error
                res.end(JSON.stringify(result_failed))
            } else {
                let paths           = path.join(__dirname, '../../uploads', filename)
                let result          = await updateUploadID(id, paths)
                if (result.id == id) {
                    res.end(JSON.stringify(result_success))
                }
            }
        })
    }
}


function updateUploadID(id, path) {
    let data    = {id, path}
    return new Promise(async function (resolve, reject) {
        let mongodb     = await mongo()
        mongodb.collection('uploads').insertOne(data, function (error, res) {
            if (error) {
                reject(error)
            } else {
                resolve(res.ops[0])
            }
        })
    })
}


module.exports = uploaders