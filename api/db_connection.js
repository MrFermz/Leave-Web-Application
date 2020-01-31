
const mysql     =   require('mysql')
const config    =   require('./config.json')


const conn      =   mysql.createConnection({
                        host                    :       config.host,
                        user                    :       config.user,
                        password                :       config.pass,
                        database                :       config.db,
                        queueLimit              :       0,
                        waitForConnections      :       true
                    })  




function connection() {
    conn.connect( async function (error) {
        console.log('MySQL Connected.')

        await createTableUsers()
        await createTableLeaves()
        await createTableApprover()

        await createFK()

        if (error) {
            setTimeout(connection(), 2000)
        }

    })

    conn.on('error', function (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST' ||
            error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
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
            departmentID        INT,                                            \
            typeID              INT,                                            \
            approverID          INT,                                            \
            leaveDaysID         VARCHAR(255),                                            \
            PRIMARY KEY         (UID),                                          \
            UNIQUE              (username)                                      \
        )ENGINE=InnoDB DEFAULT CHARSET=utf8'

    conn.query(sql, function (error, result) {
        if (error) throw error
        console.log('users created.')
    })
}



// leave
function createTableLeaves() {
    
    let sql     =   'CREATE TABLE IF NOT EXISTS leaves (                        \
            leaveID             INT                     AUTO_INCREMENT,         \
            leaveType           VARCHAR(255),                                   \
            dateStart           DATE,                                           \
            dateEnd             DATE,                                           \
            reasons             VARCHAR(255),                                   \
            status              VARCHAR(255),                                   \
            dateApprove         DATE,                                           \
            dateReject          DATE,                                           \
            rejectReasons       VARCHAR(255),                                   \
            UID                 INT,                                            \
            uploadID            INT,                                            \
            PRIMARY KEY         (leaveID)                                       \
        )ENGINE=InnoDB DEFAULT CHARSET=utf8'

    conn.query(sql, function (error, result) {
        if (error) throw error
        console.log('leave created.')
    })
        
}



// approver
function createTableApprover() {

    let sql     =   'CREATE TABLE IF NOT EXISTS approver (                          \
            approverID              INT                     AUTO_INCREMENT,         \
            UID                     INT,                                            \
            PRIMARY KEY             (approverID)                                    \
    )ENGINE=InnoDB DEFAULT CHARSET=utf8'

    conn.query(sql, function (error, result) {
        if (error) throw error
        console.log('approver created.')
    })

}



// FK create
function createFK() {
 

    // FK users
    let sqlUSERS        =       'ALTER TABLE users                                                         \
                                 ADD FOREIGN KEY (approverID)       REFERENCES approver(approverID)'

    conn.query(sqlUSERS, function (error, result) {
        if (error) throw error
        console.log('Added FK users.')
    })



    // FK leaves
    let sqlLEAVES        =      'ALTER TABLE leaves                                                         \
                                 ADD FOREIGN KEY (UID)              REFERENCES users(UID)'

    conn.query(sqlLEAVES, function (error, result) {
        if (error) throw error
        console.log('Added FK leaves.')
    })


}



connection()

module.exports = conn