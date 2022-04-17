/**
 * Redirects to target page if unauthorized.
 * @param {String} target url '/login' by default
 * @returns 
 */
module.exports = function (target) {
    target = target || '/login';
    return function (req, res, next){
        if (!req.authorized) {
            return res.redirect(target);
        }
        return next();
    };
}