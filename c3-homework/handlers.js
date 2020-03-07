const fileService = require("./fileService");

const fileName = "students.json";

const getStudentsFromFile = (file) => {
  return new Promise((success, fail) => {
    fileService.readFile(file).then((data) => {
      return success(JSON.parse(data));
    }).catch((err) => {
      if (err.errno === -4058) {
        return success([]);
      }
      return fail(err);
    });
  });
}

const addStudentToFile = (file, student) => {
  return new Promise((success, fail) => {
    getStudentsFromFile(file).then(students => {
      const newStudents = students;
      newStudents.push(student);
      return fileService.writeFile(file, JSON.stringify(newStudents));
    })
    .then(() => {
      console.log("Successfully added new student to file.");
      return success();
    })
    .catch(err => {
      return fail(err);
    })
  });
}

const getStudents = (req, res) => {
  const file = req.params.file;

  getStudentsFromFile(file).then(students => {
    const studentsString = students.join(' ');
    res.send(studentsString);
  }).catch(err => {
    console.error(err);
    res.send("error");
  });

}

const addStudent = (req, res) => {
  const file = req.params.file;
  const student = req.body.name + " " + req.body.lastName;

  addStudentToFile(file, student).then(() => {
    res.send("Successfully added " + student + " to file!")
  }).catch(err => {
    console.error(err);
    res.send("Error adding student to file.")
  });
}

module.exports = {
  getStudents,
  addStudent
}