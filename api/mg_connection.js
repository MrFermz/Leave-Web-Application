const MongoClient       =       require('mongodb').MongoClient
const config            =       require('./config.json')
const url               =       `mongodb://${config.mongo.user}:${config.mongo.pass}@${config.mongo.host}:${config.mongo.port}/`
const options           =       { useNewUrlParser: true, useUnifiedTopology: true }


function connect() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, options, function (error, db) {
            let mongo  =   db.db(`${config.mongo.db}`)
            if (error) reject(error)
            else resolve(mongo)
        })
    })
}

module.exports  =   connect