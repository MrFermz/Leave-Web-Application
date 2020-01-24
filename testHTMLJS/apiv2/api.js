const db = require('./db_connection')

function callAPI(req, res) {
    let path = req.url.toLowerCase()
    let verb = req.method

    if (verb === 'GET') {
        if (path === '/') {
            return 'HOME'
        } else if (path === '/test') {
            return 'TEST'
        }
    } else {
        return ''
    }
}

module.exports.callAPI = callAPI