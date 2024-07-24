const mysql = require('mysql2');
const dbconfig = require('./db.config');

const connection = mysql.createPool({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    database: dbconfig.DATABASE,
    password: dbconfig.PASSWORD,
    port: dbconfig.PORT,
});
module.exports = connection.promise();