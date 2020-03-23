const express = require('express');
const bodyParser = require('body-parser');
const students = require('./handlers/students');
const db = require('./db');
const cors = require('cors');

db.init();

const api = express();
api.use(bodyParser.json());
api.use(cors());
// RESOURCE: students
api.get('/api/v1/students', students.getAll); // Get all students
api.get('/api/v1/students/:id', students.getOne); // Get student by id
api.post('/api/v1/students', students.addOne); // Create new student
api.put('/api/v1/students/:id', students.updateOne); // Update existing student by id
api.delete('/api/v1/students/:id', students.deleteOne); // Delete student by id

const port = 9000;

api.listen(port, (err) => {
    if(err){
        return console.error(err);
    }
    console.log('Express server listening on port:', port);
});











