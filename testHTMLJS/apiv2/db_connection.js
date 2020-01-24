const mysql = require('mysql')
const config = require('./config.json')

const conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.pass
})

conn.connect(function (error) {
    if (error) throw error
    console.log('MySQL Connected.')
    createDatabase()
})

function createDatabase() {
    conn.query(`CREATE DATABASE IF NOT EXISTS ${config.db} CHARACTER SET utf8 COLLATE utf8_general_ci`, function (error, res) {
        if (error) throw error
        console.log('DB Created.')
    })
}

module.exports = conn