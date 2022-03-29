const connection = require('./connection')

class Database {
    constructor(connection) {
        this.connection = connection;
    }
}

let database = new Database(connection);

module.exports = database;