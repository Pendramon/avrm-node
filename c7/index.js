const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');

const auth = require('./handlers/auth');
const db = require('./db');

db.init();

const api = express();

// Middleware
api.use(bodyParser.json());
api.use(cors());
api.use(
  jwt({secret: 'tajna123'})
  .unless({path: ['/register', '/login', '/public']})
);

api.post('/register', auth.register);
api.post('/login', auth.login);
api.get('/private', auth.privateTest);
api.get('/public', auth.publicTest);

// Configuration
const port = 9000;

// Start-up
api.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Express server listening on port:", port);
});
