/**
 * This is controller for '/api/' requests.
 */

const database = require('../models/mysql');

// Returns json containing all items in database.
exports.getItems = (req, res, next) => {
    database.getItems(function (err, result, fields) {
        if (err) {
            res.status(500);
            res.send('Whoops');
        } else {
            res.status(200);
            res.json(result);
        }
    }); 
}
