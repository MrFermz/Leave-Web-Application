
const MongoClient       =   require('mongodb').MongoClient
const url               =   'mongodb://root:1234@localhost:27017/'
const options           =   { useNewUrlParser: true, useUnifiedTopology: true }


function connect() {
    
    return new Promise(function (resolve, reject) {
        
        MongoClient.connect(url, options, function (error, db) {
            
            let mongo  =   db.db('internship')
    
            if (error) reject(error)

            else resolve(mongo)
        
        })
    
    })

}

module.exports  =   connect