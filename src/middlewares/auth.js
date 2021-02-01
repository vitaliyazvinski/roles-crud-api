const { verifyToken } = require('../auth');

module.exports = {
  ensureAuthenticated(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    verifyToken(authHeader.split(' ')[1], (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  },
  ensureOwnerAuthorizated(req, res, next) {
    const { role } = req.user;
    if (role !== 'owner') return res.sendStatus(403);
    return next();
  },
};
