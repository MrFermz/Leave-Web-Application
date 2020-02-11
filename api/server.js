const http          =       require('http')
const db            =       require('./db_connection')
const config        =       require('./config.json')
const api           =       require('./api')

const app           =   http.createServer(function (req, res) {
    let body    =   []

    // set headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Content-Type', `${req.headers["content-type"]}`)

    // get data
    req.on('data', chunk => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        res.writeHead(200, { 'Content-Type': `${req.headers["content-type"]}` })
        api.callAPI(req, res, body)
    })
})


app.listen(config.port, () => {
    console.log(`Running... ${config.port}`)
})