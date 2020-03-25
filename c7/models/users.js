const mongoose = require('mongoose');

const User = mongoose.model('user',{
  full_name: String,
  email: String,
  password: String
});

const getByEmailAddress = (email) => {
  return new Promise((success, fail) => {
    User.findOne({email: email}, (err, data) => {
      if (err)
        return fail(err);

      return success(data);
    });
  });
};

const save = (data) => {
  return new Promise((success, fail) => {
    let user = new User(data);
    user.save((err) => {
      if (err) 
        return fail(err);

      return success();
    });
  })
}

module.exports = {
  getByEmailAddress,
  save
}