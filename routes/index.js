/**
 * This file routes '/' requests.
 */

const express = require('express');
const path = require('path');
const controller = require('../controllers/indexController');

var router = express.Router();

/* GET home page compiled from views. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page from static .html */
router.get('/', controller.sendIndex);

/* GET about page from static .html */
router.get('/about', controller.sendAbout);

/**
 * Returns shopt page 
 * - may be it would make sence to move this functionality to separate router
 */
router.get('/shop', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname,'../public/shop.html'));
});

module.exports = router;
