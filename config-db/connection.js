
    const Pool = require('pg').Pool

    const connection = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'db_lottery',
        password: '12345',
        port: 5432,
    });
    
    connection.connect().then(res => {
        console.log('Connected')
    }).catch(err => {
        console.log("Connect failed")
    })

    module.exports = connection