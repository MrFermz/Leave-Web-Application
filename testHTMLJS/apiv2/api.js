
const db                            =   require('./db_connection')
const bcrypt                        =   require('bcryptjs')
const { getToken, verifyToken }     =   require('./jwt')


const result_failed         =   {
                                    result  :   'failed',
                                    data    :   ''
                                }

const result_success        =   {
                                    result  :   'success',
                                    data    :   ''
                                }

function callAPI(req, res, body) {


    let path    =   req.url.toLowerCase()
    let verb    =   req.method


    // POST
    if (verb === 'POST') {
        switch (path) {


            case '/register'    :       register(req, res, body)
                break


            case '/login'       :       login(req, res, body)
                break



            default:
                res.end('404')
                break
        }
    }


    // GET
    else if (verb === 'GET') {
        switch (path) {


            case '/feed'        :       feed(req, res)




            default:
                res.end('404')
                break
        }
    }

    else res.end('404')
}



function register(req, res, body) {


    // parse data
    let data        =   JSON.parse(body)


    // encrypt password
    let hashedpwd   =   bcrypt.hashSync(data.password, 8)
    data.password   =   hashedpwd


    // database query
    let sql         =   'INSERT INTO users (username, password, typeID) VALUES ?'
    let values      =   [[

                            data.username,
                            data.password,
                            data.typeID
                            
                        ]]

    db.query(sql, [values], function (error, result) {

        if(error) {

            result_failed['data']   =   error

            res.end(JSON.stringify(result_failed))

        } else {

            res.end(JSON.stringify(result_success))

        }

    })

}



function login(req, res, body) {


    // parse data
    let data    =   JSON.parse(body)


    // database query
    let sql     =   `SELECT * FROM users WHERE username = '${data.username}'`

    db.query(sql, function (error, result) {
        
        const pwdValid              =   bcrypt.compareSync(data.password, result[0].password)
        let username                =   result[0].username
        let id                      =   result[0].UID
        let token                   =   getToken({ id, username })
        result_success['data']      =   token

        if(pwdValid) {

            res.end(JSON.stringify(result_success))

        } else {

            res.end(JSON.stringify(result_failed))

        }

    })

}



function feed(req, res) {

    verifyToken(req, res)
    // res.end(JSON.stringify(result_success))

}



module.exports.callAPI = callAPI