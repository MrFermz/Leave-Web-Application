var mysql = require('mysql')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'internship'
})

con.connect(function (error) {
    if (error) throw error
    console.log('Connected!')
    Delete()
})

function Delete() {
    var sql = "DELETE FROM customers WHERE address = 'Mountain 21'"

    con.query(sql, function (error, result) {
        if (error) throw error
        console.log(`${result.affectedRows} rows deleted`)
    })
}

function Select() {
    var sql = "SELECT * FROM customers"

    con.query(sql, function (error, result) {
        if (error) throw error
        console.log(result)
    })
}

function Insert() {
    var sql = "INSERT INTO customers(\
        name, address) \
        VALUES ?"
    var values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple st 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345'],
        ['Sandy', 'Ocean blvd 2'],
        ['Betty', 'Green Grass 1'],
        ['Richard', 'Sky st 331'],
        ['Susan', 'One way 98'],
        ['Vicky', 'Yellow Garden 2'],
        ['Ben', 'Park Lane 38'],
        ['William', 'Central st 954'],
        ['Chuck', 'Main Road 989'],
        ['Viola', 'Sideway 1633']
    ]

    con.query(sql, [values], function (error, result) {
        if (error) throw error
        console.log(`${result.affectedRows} record inserted`)
    })
}

function createTable() {
    var sql = 'CREATE TABLE customers (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        name VARCHAR(255), \
        address VARCHAR(255))'

    con.query(sql, function (error, result) {
        if (error) throw error
        console.log('Table created')
    })
}

function createDatabase() {
    con.query('CREATE DATABASE internship', function (error, res) {
        if (error) throw error
        console.log('DB Create!')
    })
}