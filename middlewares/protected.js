/**
 * Returns 403 if unauthorized.
 * @returns
 */
module.exports = function (req, res, next) {
  if (req.authorized) {
    return next();
  }
  return res.status(403).json({ message: "forbidden" });
};
