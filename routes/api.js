var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/items', (req, res, next) => {
    res.send('fish');
});

module.exports = router;