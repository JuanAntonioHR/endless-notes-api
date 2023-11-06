const mysql = require('mysql');
const util = require('util');

// Create a pool connection to the database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'endless_notes'
})

pool.query = util.promisify(pool.query)
module.exports = pool