const jwt               =   require('jsonwebtoken')

const secreteKey        =   'MrFermz'
const result            =   {

                                auth        :   false,
                                message     :   ''

                            }

function getToken(json) {
    return token    =   jwt.sign(json, secreteKey, {
        expiresIn: 8640000 // expires in 24 hours
    })
}

function verifyToken(req, res) {

    let token       =   req.headers['x-access-token']
    // console.log(token)

    if(!token){

        result['message']       =       'No Token'
        res.end(JSON.stringify(result))

    } else {

        jwt.verify(token, secreteKey, function (error, decoded) {
            if(error){
    
                result['message']       =       error
                res.end(JSON.stringify(result))
    
            } else {
    
                result['auth']          =       true
                res.end(JSON.stringify(result))
    
            }
    
        })
    
    }


}

module.exports = { getToken, verifyToken }