const mysql = require('mysql2');

class MySQLClient{
    static db;

    static init(){
        this.db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            connectionLimit: 10,
        });
    }
}

module.exports = MySQLClient