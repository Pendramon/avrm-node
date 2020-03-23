const mongoose = require('mongoose');

const Student = mongoose.model(
  'student',
  {
    first_name: String,
    last_name: String,
    avg: Number
  }
);

const addOne = (data) => {
  return new Promise((success, fail) => {
    let s = new Student(data);
    s.save((err) => {
      if (err)
        return fail(err);
      
      return success();
    });
  });
};

const getAll = () => {
  return new Promise((success, fail) => {
    Student.find({}, (err, data) => {
      if (err)
        return fail(err);

      return success(data);
    });
  });
};

const getOne = (id) => {
  return new Promise((success, fail) => {
    Student.find({_id: id}, (err, data) => {
      if (err)
        return fail(err);

      return success(data);
    });
  });
};

const updateOne = (id, data) => {
  return new Promise((success, fail) => {
    Student.update({_id: id}, data, (err) => {
      if (err)
        return fail(err);

      return success();
    });
  });
};

const deleteOne = (id) => {
  return new Promise((success, fail) => {
    Student.delete({_id: id}, (err) => {
      if (err)
        return fail(err);

      return success();
    });
  });
};

module.exports = {
  addOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
}