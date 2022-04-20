/**
 * Checks if user authenticated and set corresponding
 * flag to request object.
 */

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.access_token;
  req.authorized = false;
  if (!token) {
    return next();
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = data;
    req.authorized = true;
    return next();
  } catch {
    return next();
  }
};
