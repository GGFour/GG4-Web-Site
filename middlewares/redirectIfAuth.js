/**
 * Redirects to target page if authorized.
 * @param {String} target url '/' by default
 * @returns
 */
module.exports = function (target) {
  target = target || "/";
  return function (req, res, next) {
    if (req.authorized) {
      return res.redirect(target);
    }
    return next();
  };
};
