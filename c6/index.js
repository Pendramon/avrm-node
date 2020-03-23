const express =  require('express');
const bodyParser = require('body-parser');
const student = require('./handlers/students');
const db = require('./db');
const cors = require('cors');

db.init();

const api = express();

api.use(bodyParser.json());
api.use(cors());
// RESOURCE: students
api.get('/api/v1/students', student.getAll); // Get all students.
api.get('/api/v1/students/:id', student.getOne); // Get single student by id
api.post('/api/v1/students', student.addOne); // save one (create) student
api.put('/api/v1/students/:id', student.updateOne); // updates single student
api.delete('/api/v1/students/:id', student.deleteOne); // delete student from db

const port = 9000;

api.listen(port, (err) => {
  if (err) {
    return Console.err(err);
  }
  console.log('API is now listening on:', port)
})