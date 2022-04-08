/**
 * This is controller for '/auth/' requests.
 */
const database = require('../models/mysql');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * Takes credentials from req body and adds user to DB.
 *  'email' 
 *  'password'
 *  'username'
 *  'firstname'
 *  'lastname'
 */
exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Registration error", errors: errors.errors});
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    database.createUser({
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword
        },
        (err, rows, fields) => {
            if (err && err.code == 'ER_DUP_ENTRY') {
                return res
                .status(400)
                .json({message: err.sqlMessage.split(' ').slice(0, 3).join(' ')});
            } else if (err) {
                return res
                .status(400)
                .json({message: "Registration error"});
            }

            return res
            .status(200)
            .send('OK');
        });
}
