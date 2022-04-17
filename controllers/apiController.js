/**
 * This is controller for '/api/' requests.
 */

const database = require('../models/mysql');

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

exports.getPersonalInfo = (req, res, next) => {
    let userId = req.user.id;
    database.getPersonalInfo(userId, function (err, result, fields) {
        if (err) {
            res.status(500);
            res.send('Whoops');
        } else {
            res.status(200);
            res.json(result);
        }
    }); 
}

// exports.placeOrder = (req, res, next) => {
//     let user = req.user;
//     let items = req.body.items;

//     if (!items || items.length == 0) {
//         return res.status(400).json({message: "Cart is empty"});
//     }

    
// }