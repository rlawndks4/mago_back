const mysql = require('mysql')

const db = mysql.createConnection({
    host : "dooseob25.cafe24.com",
    user : 'root',
    password : 'qjfwk100djr!',
    port : 3306,
    database:'mago',
    timezone: 'Asia/Seoul',
    charset: 'utf8mb4'
})
db.connect();

module.exports = db;