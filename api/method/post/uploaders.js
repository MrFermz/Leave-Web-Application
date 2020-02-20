const fs                                    = require('fs')
const path                                  = require('path')
const db                                    = require('../../db_connection')
const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function uploaders(req, res, body) {
    let token       = await verifyToken(req, res)
    if (token) {
        let data        = body
        let type        = req.headers['content-type'].split('/')[1]
        let timeStamp   = Date.now()
        let filename    = `${token.id}_${timeStamp}.${type}`
        fs.writeFile(`uploads/${filename}`, data, async function (error) {
            if (error) {
                result_failed['data']       = error
                res.end(JSON.stringify(result_failed))
            } else {
                let paths           = path.join(__dirname, '../../uploads', filename)
                let upload          = await createUploads(paths)
                let insertId        = upload.data.insertId
                if (upload.result == 'success') {
                    result_success['data']      = insertId
                    res.end(JSON.stringify(result_success))
                }
            }
        })
    }
}


function createUploads(path) {
    let values    = [[ path ]]
    return new Promise(function (resolve, reject) {
        let sql     = `INSERT INTO uploads (URL) VALUE ?`
        db.query(sql, [values], function (error, res) {
            if (error) {
                reject(error)
            } else {
                result_success['data']  = res
                resolve(result_success)
            }
        })
    })
}


module.exports = uploaders