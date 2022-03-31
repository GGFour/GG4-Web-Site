var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page compiled from views. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page from static .html. */
router.get('/', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname,'../public/index.html'));
});

router.get('/about', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname,'../public/about.html'));
});

router.get('/shop', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname,'../public/shop.html'));
});

module.exports = router;
