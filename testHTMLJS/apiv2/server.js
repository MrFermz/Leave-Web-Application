const http = require('http')
const mysql = require('./db_connection')
const config = require('./config.json')
const api = require('./api')

const app = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json')

    res.write(api.callAPI(req, res))

    res.end()
})

app.listen(config.port, () => {
    console.log(`Running... ${config.port}`)
})