const { verifyToken }                       = require('../../jwt')
const { result_success, result_failed }     = require('../result')


async function uploaders(req, res, body) {
    let token       =       verifyToken(req, res)

    if (token) {
        let data        =       body
        console.log(req.headers)
        // fs.writeFile('test.jpg', data, function (error) {
        //     if (error) throw error
        //     console.log('saved.')
        // })
    }
}


module.exports = uploaders