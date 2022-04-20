/**
 * This file routes '/' requests.
 */

const express = require("express");
const path = require("path");
const controller = require("../controllers/indexController");
const authenticated = require("../middlewares/authenticated");
const redirectAuthed = require("../middlewares/redirectIfAuth");
const redirectUnauthed = require("../middlewares/redirectIfUnauth");

var router = express.Router();

/* GET home page compiled from views. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page from static .html */
router.get("/", controller.sendIndex);

/* GET about page from static .html */
router.get("/about", controller.sendAbout);

/**
 * Returns shop page
 * - may be it would make sence to move this functionality to separate router
 */
router.get("/shop", controller.sendShop);

/* Returns login page*/
router.get("/login", authenticated, redirectAuthed(), controller.sendLogin);

/* Returns signup page redirects '/' if logged in */
router.get("/signup", authenticated, redirectAuthed(), controller.sendSignup);

/* Returns game page redirects to '/' if logged in */
router.get("/game", controller.sendGame);

module.exports = router;
