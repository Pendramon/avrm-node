const mongoose = require('mongoose');

const username = 'dev';
const password = 'dev123';
const host = 'cluster0-mqrlf.mongodb.net';
const dbName = 'avrmnode';

const connectionString = `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;

const init = () => {
  mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) 
        return console.error(err);

      console.log('DB connection successfull!');
    });
}

module.exports = {
  init
}