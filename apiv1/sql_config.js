const mysql = require('mysql')
const config = require('./config.json')


// CONFIG
const HOST = config.sql.host
const USER = config.sql.user
const PASS = config.sql.pass
const DB = config.sql.db


// CREATE CONNECT
const conn = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASS,
    database: DB
})


// CONNECT DB
function connectDB() {

    const conn = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASS
    })

    conn.connect((error) => {
        if (error) {
            console.log(error)
            setTimeout(connectDB, 2000)
        }

        let sql = `CREATE DATABASE IF NOT EXISTS ${DB} CHARACTER SET utf8 COLLATE utf8_general_ci`
        conn.query(sql, (error, result) => {
            console.log('DATABASE Available')
        })

    })
}

connectDB()

module.exports.conn = conn