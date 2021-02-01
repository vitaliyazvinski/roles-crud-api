const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./resources/api.router');
const authRouter = require('./resources/auth.router');

function startServer(port = 3000) {
  const app = express();
  app.get('/', (req, res) => {
    res.send('See README.md to get more details');
  });
  app.use(bodyParser.json());
  app.use('/api', apiRouter);
  app.use('/auth', authRouter);

  return new Promise(resolve => {
    var server = app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
      var close = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          close(resolveClose);
        });
      };
      resolve(server);
    });
  });
}

module.exports = { startServer };
