const express = require('express');
const { body } = require('express-validator');

const controller = require('../controllers/authController');

var router = express.Router();

router.post('/signup',
    body('email', 'Bad email format').isEmail().normalizeEmail(),
    body('username', 'Login can not be empty').notEmpty().isString().toLowerCase(),
    body('password', 'Password shoud be from 8 to 24 characters!').isLength({min: 8, max: 24}),
    body('firstname', 'Firstame can not be empty').notEmpty().isString().toLowerCase(),
    body('lastname', 'Lastname can not be empty').notEmpty().isString().toLowerCase(), 
    controller.signUp);

module.exports = router;