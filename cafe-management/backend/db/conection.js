const mysql = require('mysql');

let connection = mysql.createConnection({
    port     : process.env.DB_PORT,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

connection.connect((err, connection) => {
    if(!err){
        console.log('connected to mysql');
    }else{
        console.log(err);
    }
})


module.exports = connection;

