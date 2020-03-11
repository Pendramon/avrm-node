const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const handlers = require('./handlers');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(`views/partials`);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const port = 8080;

app.get('/', handlers.index);
app.get('/blogs', handlers.getBlogs)

app.listen(port, (err) => {
    if (err) {
        console.log("An error has occured", err);
        return;
    }
    console.log("Express server has started listening on port", port);
})