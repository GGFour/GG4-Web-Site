/**
 * This is controller for '/' requests.
 */

const path = require("path");

// Sends index.html file
exports.sendIndex = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};

// Sends about.html file
exports.sendAbout = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/about.html"));
};

// Sends shop.html file
exports.sendShop = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/shop.html"));
};

// Sends login.html file
exports.sendLogin = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/log.html"));
};

// Sends sign.html file
exports.sendSignup = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/signUp.html"));
};

// Sends game.html file
exports.sendGame = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/game.html"));
};
