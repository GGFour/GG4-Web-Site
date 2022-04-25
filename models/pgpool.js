const { Pool } = require('pg');

const sql = new Pool(); // will use psql environment variables
console.log("Connected to database");

module.exports = sql;