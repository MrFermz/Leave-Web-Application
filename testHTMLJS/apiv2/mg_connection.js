const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = "mongodb://localhost:27017"

// Database Name
const dbName = 'internship'

// Create a new MongoClient
const client = new MongoClient(url)

// Use
client.connect(function (error) {
    console.log('Connected')

    const db = client.db(dbName)

    insertDoc(db, function () {
        client.close()
    })
})

const insertDoc = function (db, callback) {
    const collection = db.collection('documents')

    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (error, result) {
        console.log("Inserted documents into the collection")
        callback(result)
    })
}