const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
      return next();
    }
    try {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = data;
      return res.redirect('/');
    } catch {
      return next();
    }
}

