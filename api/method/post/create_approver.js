const db                                    = require('../../db_connection')
const { result_success, result_failed }     = require('../result')


function createApprover(UID) {
    return new Promise(function (resolve, reject) {
        let sql = `INSERT INTO approver (UID) VALUES (${UID})`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                reject(result_failed)
            } 
            else resolve(result_success)
        })
    })
}


module.exports = createApprover