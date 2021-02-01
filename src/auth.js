const jwt = require('jsonwebtoken');
const accessTokenSecret = 'secretSecureToken';

module.exports = {
  verifyToken(token, cb) {
    return jwt.verify(token, accessTokenSecret, cb);
  },
  getSignedToken({ username, password, role }) {
    return jwt.sign({ username, password, role }, accessTokenSecret);
  },
};
