const mongoose = require('mongoose');

const username = 'dev';
const password = 'dev123';
const host = 'cluster0-mqrlf.mongodb.net';
const dbname = 'avrmnode';

const cstring = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

const init = () => {
    mongoose.connect(
        cstring, 
        {useNewUrlParser: true, useUnifiedTopology: true},
        (err) => {
            if(err){
                return console.error(err);
            }
            console.log('DB connection successfull!');
        }
    )
};

module.exports = {
    init
};