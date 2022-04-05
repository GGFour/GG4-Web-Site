const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 3306,
    user: process.env.DB_USER ?? "app",
    password: process.env.DB_PSSWD ?? "app",
    database: process.env.DATABASE ?? "ecommerce_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// pool.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
  
//     console.log('connected as id ' + connection.threadId);
//   });

module.exports = pool;