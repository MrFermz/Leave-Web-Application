const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config.json')
const api = require('./sql_api')

const PORT = config.sql.port
const PATH = config.sql.path

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(`/${PATH}`, api)

app.listen(PORT, () => {
    console.log(`Running: ${PORT}`)
})