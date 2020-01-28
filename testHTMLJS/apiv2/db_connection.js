
const mysql     =   require('mysql')
const config    =   require('./config.json')


const conn      =   mysql.createConnection({
    host        :   config.host,
    user        :   config.user,
    password    :   config.pass,
    database    :   config.db
})  




function connection() {
    conn.connect( async function (error) {
        console.log('MySQL Connected.')

        await createTableUsers()
        await createTableUsersType()

        await createFK()

        if (error) {
            setTimeout(connection(), 2000)
        }

    })

    conn.on('error', function (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            connection()
        } else {
            throw error
        }
    })
}


// users
function createTableUsers() {

    let sql     =   'CREATE TABLE IF NOT EXISTS users (                         \
            UID                 INT                     AUTO_INCREMENT,         \
            empID               VARCHAR(20),                                    \
            firstname           VARCHAR(255),                                   \
            lastname            VARCHAR(255),                                   \
            nickname            VARCHAR(255),                                   \
            username            VARCHAR(255)            NOT NULL,               \
            password            VARCHAR(255)            NOT NULL,               \
            deptID              INT,                                            \
            typeID              INT,                                            \
            approverID          INT,                                            \
            leaveDaysID         INT,                                            \
            PRIMARY KEY         (UID),                                          \
            UNIQUE              (username)                                      \
        )ENGINE=InnoDB DEFAULT CHARSET=utf8'

    conn.query(sql, function (error, result) {
        if (error) throw error
        console.log('users created.')
    })
}


// user type
function createTableUsersType() {
    
    let sql     =   'CREATE TABLE IF NOT EXISTS usersType (                     \
            typeID              INT                     AUTO_INCREMENT,         \
            typeName            VARCHAR(255)            NOT NULL,               \
            PRIMARY KEY         (typeID),                                       \
            UNIQUE              (typename)                                      \
        )ENGINE=InnoDB DEFAULT CHARSET=utf8'

    conn.query(sql, function (error, result) {
        if (error) throw error
        console.log('users type created.')
    })
}


// FK create
function createFK() {
    
    let sql     =   'ALTER TABLE users          \
            ADD FOREIGN KEY (typeID)            \
            REFERENCES usersType(typeID)'

    conn.query(sql, function (error, result) {
        if (error) throw error
        console.log('Added FK typeID')
    })

}



connection()

module.exports = conn