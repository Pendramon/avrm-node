const fs = require('fs');

const readFile = (file) => {
    return new Promise((success, fail) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            };
            return success(data);
        });
    });
};

const writeFile = (file, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}

module.exports = {
    readFile,
    writeFile
}