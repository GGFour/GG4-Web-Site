const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL ?? `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const sql = (() => {
    if (process.env.NODE_ENV !== 'production') {
    return new Pool({
    connectionString: connectionString,
    ssl: false
    });
    } else {
    return new Pool({
    connectionString: connectionString,
    ssl: {
    rejectUnauthorized: false
    }
    });
    } })();
    ; // will use psql environment variables
console.log("Connected to database");

module.exports = sql;