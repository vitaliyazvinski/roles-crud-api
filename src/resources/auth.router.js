const { Router } = require('express');
const { getUser } = require('./user/user.model');
const { getSignedToken } = require('../auth');
const router = new Router();

router.post('/login', (req, res) => {
  var { username, password } = req.body;
  var user = getUser({ username, password });
  if (!user) return res.send('Credentials are incorrect');
  var authToken = getSignedToken({ username, password, role: user.role });
  res.json({ authToken });
});

module.exports = router;
