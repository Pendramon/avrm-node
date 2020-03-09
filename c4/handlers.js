const fileService = require('./fileService');

const index = (req, res) => {
    res.render('main');
}

const name = (req, res) => {
    let data = {
        name: req.params.name,
        denovi: ['pon', 'vto', 'sre', 'cet', 'pet', 'sab', 'ned']
    };
    res.render('name', data);
}

const fileName = 'students.json';

const getStudents = (req, res) => {
    fileService.readFile(fileName)
        .then((students) => {
            let data = { 
                students: JSON.parse(students)
            }
            res.render('students', data);
        })
        .catch(err => {
            console.err(err);
            res.send('An error has occured:', err);
        });
}

const addStudent = (req, res) => {
    const newStudent = {
        Name: req.body.firstName,
        LastName: req.body.lastName,
        Score: req.body.score
    }

    fileService.readFile(fileName)
        .then((data) => {
            let students = JSON.parse(data);
            students.push(newStudent);
            return fileService.writeFile(fileName, JSON.stringify(students));
        })
        .then(() => {
            res.redirect('/students')
        })
        .catch((err) => {
            console.log("An error has occured reading file:", err)
            res.send("An error has occured.")
        })
}

const deleteStudent = (req, res) => {
    let studentIndex = req.params.studentIndex;   
    
    fileService.readFile(fileName)
        .then((data) => {
            let students = JSON.parse(data);
            students.splice(studentIndex, 1);
            return fileService.writeFile(fileName, JSON.stringify(students));
        })
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => {
            console.log("An error has occured deleting student:", err);
            res.send("An error has occured.");
        });
}


module.exports = {
    index,
    name,
    getStudents,
    addStudent,
    deleteStudent
}