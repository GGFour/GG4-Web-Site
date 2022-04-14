const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({message: "Unauthorized"});
    }
    try {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = data;
      return next();
    } catch {
      return res.status(403).json({message: "Unauthorized"});
    }
}