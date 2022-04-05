/**
 * This is controller for '/' requests.
 */

const path = require('path');

// Sends index.html file
exports.sendIndex = (req, res, next) => {
    res
    .status(200)
    .sendFile(path.join(__dirname,'../public/index.html'));
};

// Sends about.html file
exports.sendAbout = (req, res, next) => {
    res
    .status(200)
    .sendFile(path.join(__dirname,'../public/about.html'));
};