const express = require('express');
const bodyParser = require('body-parser');
const handlers = require('./handlers');

// Setup
const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get("/:file", handlers.getStudents);
app.post("/:file", handlers.addStudent);

// Configuration
const port = 8080;

// Startup
app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Express server listening on port " + port);
})