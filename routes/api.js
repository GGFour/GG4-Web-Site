/**
 * This file routes the '/api/' requests.
 */

const express = require('express');
const path = require('path');
const controller = require('../controllers/apiController');

var router = express.Router();

router.get('/items', controller.getItems);

router.post('/signup', controller.signUp);

module.exports = router;