const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');

const db = require('./db');
const user = require('./handlers/user');
const movies = require('./handlers/movies');

db.init();

const api = express();

api.use(bodyParser.json());
api.use(cors());

api.use(
  jwt({secret: 'Superstrongsecret'}) // TODO: Create a configuration service and read secret
  .unless({path: [
  {url:'/user/register'},
  {url:'/user/login'},
  {url:'/api/v1/movies', methods: ["GET"]},
  {url: /\/api\/v1\/movies\/.*/, methods: ["GET"]}
  ]}) // ??? Test this, might not have implemented it correctly.
);

api.post("/user/register", user.register); // public
api.post("/user/login", user.login); // public
api.get("/api/v1/movies", movies.getAllMovies); // public
api.get("/api/v1/movies/:id", movies.getMovie); // public
api.post("/api/v1/movies", movies.addMovie);
api.put("/api/v1/movies/:id", movies.editMovie);
api.delete("/api/v1/movies/:id", movies.deleteMovie);

const port = 9000;

api.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Express server started on:", port);
})