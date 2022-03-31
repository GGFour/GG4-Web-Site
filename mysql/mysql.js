const connection = require('./queries')

class Database {
    constructor(connection) {
        this.connection = connection;
    }
}

let database = new Database(connection);

module.exports = database;