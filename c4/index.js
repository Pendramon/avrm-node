const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fileService = require('./fileService');
const handlers = require('./handlers');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', handlers.index);

app.get('/name/:name', handlers.name);

app.get('/students', handlers.getStudents);

app.post('/students', handlers.addStudent);

app.get('/students/delete/:studentIndex', handlers.deleteStudent);

const port = 8080;

app.listen(port, (err) => {
    if (err) {
        console.log("Error starting express server", err);
        return;
    }
    console.log('Express server listening on port', port);
});