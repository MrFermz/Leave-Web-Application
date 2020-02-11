const jwt               =       require('jsonwebtoken')
const secreteKey        =       'MrFermz'
const result            =       {
                                    auth        :   false,
                                    message     :   ''
                                }

function getToken(json) {
    return token        =       jwt.sign(
                                    json, 
                                    secreteKey, {
                                        expiresIn: 8640000 // expires in 24 hours
                                    }
                                )
}


function verifyToken(req, res) {
    let token       =       req.headers['x-access-token']
    return new Promise(function (resolve, reject) {
        if (token) {
            jwt.verify(token, secreteKey, function (error, decoded) {
                if (error) reject(error)
                else {
                    result['auth']      =   true
                    resolve(decoded)
                }
            })
        }
    })
}

module.exports = { getToken, verifyToken }