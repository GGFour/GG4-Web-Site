/**
 * This is controller for '/api/' requests.
 */

const database = require('../models/mysql');
const bcrypt = require('bcrypt')

// Returns json containing all items from database.
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

// Takes 'credentials' object from req and adds user to DB.
exports.signUp = async (req, res, next) => {
    let credentials = req.body.credentials;
    if (!credentials.email || !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(credentials.email)|| !credentials.password || !credentials.username || !credentials.firstname || !credentials.lastname) {
        res
        .status(406)
        .send('Bad credentials');
    }
    credentials.password = await bcrypt.hash(credentials.password, 10);
    database.createUser(credentials, (err, rows, fields) => {
        if (err.code == 'ER_DUP_ENTRY') {
            res
            .status(406)
            .send(err.sqlMessage.split(' ').slice(0, 3).join(' '));
            return;
        } else if (err) {
            res
            .status(406)
            .send('Bad credentials');
            return;
        }

        res
        .status(200)
        .send('OK');
    });
}
