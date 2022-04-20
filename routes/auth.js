const express = require("express");
const { body } = require("express-validator");
const authenticated = require("../middlewares/authenticated");
const redirectAuthed = require("../middlewares/redirectIfAuth");
const redirectUnauthed = require("../middlewares/redirectIfUnauth");
const protected = require("../middlewares/protected");

const controller = require("../controllers/authController");

var router = express.Router();

router.post(
  "/signup",
  body("email", "Bad email format").isEmail().normalizeEmail(),
  body("username", "Login can not be empty")
    .notEmpty()
    .isString()
    .isAlphanumeric()
    .toLowerCase(),
  body("password", "Password should be from 8 to 24 characters!")
    .isLength({ min: 8, max: 24 })
    .isAscii(),
  body("firstname", "Firstname can not be empty")
    .notEmpty()
    .isString()
    .isAlpha()
    .toLowerCase(),
  body("lastname", "Lastname can not be empty")
    .notEmpty()
    .isString()
    .isAlpha()
    .toLowerCase(),
  controller.signUp
);

router.post(
  "/login",
  body("email", "Bad email format").isEmail().normalizeEmail(),
  body("password", "Password should be from 8 to 24 characters!")
    .isLength({ min: 8, max: 24 })
    .isAscii(),
  controller.logIn
);

router.get("/logout", authenticated, protected, controller.logout);

module.exports = router;
