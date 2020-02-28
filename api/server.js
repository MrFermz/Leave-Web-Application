const http          = require('http')
const db            = require('./db_connection')
const config        = require('./config.json')
const api           = require('./api')
const contentImages = [
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'application/pdf'
                      ]

const app           = http.createServer(function (req, res) {
    let body        = []
    let contentType = req.headers['content-type']

    // set headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', '*')

    // get data
    req.on('data', chunk => {
        body.push(chunk)
    }).on('end', () => {
        if (contentImages.includes(contentType)) {
            body = Buffer.concat(body)
        } else {
            body = Buffer.concat(body).toString()
        }
        res.writeHead(200, { 'Content-Type': `${contentType}` })
        api.callAPI(req, res, body)
    })
})


app.listen(config.sql.port, () => {
    console.log(`Running... ${config.sql.port}`)
})