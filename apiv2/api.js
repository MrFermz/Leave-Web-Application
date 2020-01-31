
const db                            =   require('./db_connection')
const MongoClient                   =   require('mongodb').MongoClient
const mongo                         =   require('../apiv2/mg_connection')
const url                           =   'mongodb://root:1234@localhost:27017/'
const options                       =   { useNewUrlParser: true, useUnifiedTopology: true }
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


            case '/register'            :       register(req, res, body)
                break


            case '/login'               :       login(req, res, body)
                break


            case '/usertypelist'        :       usertypelist(req, res)
                break


            case '/userdeptlist'        :       userdeptlist(req, res)
                break


            case '/userapprlist'        :       userapprlist(req, res)
                break


            default:
                res.end('404')
                break
        }
    }


    // GET
    else if (verb === 'GET') {
        switch (path) {


            


            


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
        
        if (error) {
                
            result_failed['data']   =   error
            res.end(JSON.stringify(result_failed))
        
        } else {
            if (result.length > 0) {

                const pwdValid              =   bcrypt.compareSync(data.password, result[0].password)
                let username                =   result[0].username
                let id                      =   result[0].UID
                let token                   =   getToken({ id, username })
                
                
                if (pwdValid) {
                    
                    result_success['data']      =   token
                    res.end(JSON.stringify(result_success))

                } else {

                    res.end(JSON.stringify(result_failed))

                }

            } else {

                res.end(JSON.stringify(result_failed))

            }

        }

    })


}



async function usertypelist(req, res) {
    
    let result  =   await verifyToken(req, res)
    // console.log(result)

    if (result) {

        let mongodb      =   await mongo()

        mongodb.collection('usertype').find({}).toArray((error, result) => {
            // console.log(result)
            res.end(JSON.stringify(result))
                
        })

    }
    
}



async function userdeptlist(req, res) {
    
    let result  =   await verifyToken(req, res)
    // console.log(result)

    if (result) {

        let mongodb      =   await mongo()
    
        mongodb.collection('departments').find({}).toArray((error, result) => {
            // console.log(result)
            res.end(JSON.stringify(result))
                
        })
   

    }
    
}



async function userapprlist(req, res) {
    
    let result  =   await verifyToken(req, res)
    // console.log(result)

    if (result) {
                
            let sql     =   'SELECT UID, username FROM users'
    
            db.query(sql, function (error, result) {
    

                if (error) {
                        
                    result_failed['data']   =   error
                    res.end(JSON.stringify(result_failed))
                
                } else {
                    if (result.length > 0) {
                        
                        res.end(JSON.stringify(result))
        
                    } else {
        
                        res.end(JSON.stringify(result_failed))
        
                    }
        
                }
        
            })

    }
    
}




module.exports.callAPI = callAPI