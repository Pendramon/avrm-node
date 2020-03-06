const express = require('express');
const bodyPaser = require('body-parser');
const handlers = require('./handlers');

// Setup
let app = express();

// Middleware
app.use(bodyPaser.urlencoded({extended: true}));

// Routes
app.get("/", handlers.index);
app.post("/", handlers.post);
app.get("/pero", handlers.pero);
app.get("/ime/:name", handlers.name);
app.get("/calc/:op/:a/:b", handlers.calc);

// Configuration
const port = 8080;

// Startup
app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Express server listening on port " + port)
});