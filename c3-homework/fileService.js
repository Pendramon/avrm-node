const fs = require('fs');

const readFile = (file) => {
  return new Promise((success, error) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return error(err);
      }
      return success(data);
    });
  });
};

const writeFile = (file, dataToWrite) => {
  return new Promise((success, error) => {
    fs.writeFile(file, dataToWrite, (err) => {
      if (err) {
        return error(err);
      }
      return success();
    });
  });
};

module.exports = {
  readFile,
  writeFile
};