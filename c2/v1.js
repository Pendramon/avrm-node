let fs = require('fs');
const studentsJson = require('./studenti.json');

const fileName = "data.txt";

const writeFile = (fileName, dataToWrite) => {
    return new Promise((success, error) => {
        fs.writeFile(fileName, dataToWrite, (err) => {
            if (err) {
                return error(err);
            }
            return success();
        });    
    });
}

// Using writeFile
const appendFileV1 = (fileName, dataToAppend) => {
    return new Promise((success, error) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                return err(error);
            }
            fs.writeFile(fileName, data + dataToAppend, (err) => {
                if (err) {
                    return err(error);
                }
                return success();
            }); 
        });
    });
}

// Using append
const appendFile = (fileName, dataToAppend) => {
    return new Promise((success, error) => {
        fs.appendFile(fileName, dataToAppend, (err) => {
            if (err) {
                return error(error);
            }
            return success();
        })
    });
}

//writeFile(fileName, "Starting Point |");
//appendDataV2(fileName, " I'd like to append this.");

const readFile = (fileName) => {
    return new Promise((success, error) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                return error(err);
            }
            return success(data);
        });
    });
}
/*
writeFile(fileName, "Starting Point |")
    .then(() => {
        console.log("Writing to File finished successfully!");
        return appendFile(fileName, " I am appending this |");
    })
    .then(() => {
        console.log("Appending to File finished successfully");
        return readFile(fileName);
    }).then((data) => {
        console.log("Reading file finished successfully. The containing data was: \n", data);
    })
    .catch((err) => {
        console.error(err);
    });
*/

let students = JSON.parse(JSON.stringify(studentsJson));

// 1. Student so najkratko ime

function getStudentWithShortestName(students) {
    let studentWithShortestName = students.sort((a, b) => {
        if (a.Ime.length < b.Ime.length) {
            return -1;
        } else {
            return 1;
        }
    });
    return studentWithShortestName[0];
}

console.log("Shortest Name: ", getStudentWithShortestName(students));

// 2. Student so najdolgo prezime

function getStudentWithLongestName(students) {
    let studentWithLongestName = students.sort((a, b) => {
        if (a.Ime.length > b.Ime.length) {
            return -1;
        } else {
            return 1;
        }
    });
    return studentWithLongestName[0];
}

console.log("Longest Name: ", getStudentWithLongestName(students));

// 3. Student so naj visok prosek

function getStudentWithHighestScore(students) {
    let studentWithHighestScore = students.sort((a, b) => {
        if (a.Prosek > b.Prosek) {
            return -1;
        } else {
            return 1;
        }
    });
    return studentWithHighestScore[0];
}

console.log("Highest Score: " + JSON.stringify(getStudentWithHighestScore(students)));

// 4. Student so naj nizok prosek

function getStudentWithLowestScore(students) {
    let studentWithLowestScore = students.sort((a, b) => {
        if (a.Prosek < b.Prosek) {
            return -1;
        } else {
            return 1;
        }
    });
    return studentWithLowestScore[0];
}

console.log("Lowest Score: " + JSON.stringify(getStudentWithLowestScore(students)));

// 5. Studenti chie prezime ne zavrshuva na ski

function filterStudentsByLastNameEndingWith(students, endsWith) {
    let filteredStudents = students.filter(student => !student.Prezime.endsWith(endsWith));
    return filteredStudents;
}

console.log("Students with last name not ending with \"ski\":", JSON.stringify(filterStudentsByLastNameEndingWith(students, 'ski')));

// 6. Groupen prosek

function calculateGroupScore(students) {
    students.reduce((previousStudent, currentStudent) => {
        if (previousStudent === undefined) {
            return currentStudent;
        }

        // Unfinished
    })
}

console.log("Group Score: ", calculateGroupScore(students));

// 7. Prosek / 2

// I don't god damn know what to name it don't judge
function calculateScore(students) {
    let 
}