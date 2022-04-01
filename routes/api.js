var express = require('express');
var path = require('path');
var database = require('../mysql/mysql.js')

var router = express.Router();

router.get('/items', (req, res, next) => {
    database.getItems(function (err, result, fields) {
        if (err) {
            res.status(500);
            res.send('Whoops');
        } else {
            res.status(200);
            res.json(result);
        }
    }); 
});

module.exports = router;