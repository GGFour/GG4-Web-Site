/**
 * This file routes the '/api/' requests.
 */

const express = require('express');
const path = require('path');
const controller = require('../controllers/apiController');
const authenticated = require('../middlewares/authenticated');

var router = express.Router();

router.get('/items', controller.getItems);

router.get('/personalInfo', authenticated, controller.getPersonalInfo);

module.exports = router;