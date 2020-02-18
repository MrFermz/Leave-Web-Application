const db                                    = require('../../db_connection')
const { result_success, result_failed }     = require('../result')


function updateSubsMax(ID, subs) {
    return new Promise(async function (resolve, reject) {
        let sql             = `UPDATE leavedays SET substitutionMax = ${subs} WHERE leavedaysID = ${ID}`
        db.query(sql, function (error, result) {
            if (error) {
                result_failed['data']   = error
                reject(result_failed)
            }
            else resolve(result_success)
        })
    })
}


module.exports = updateSubsMax