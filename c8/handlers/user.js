const Validator = require('node-input-validator').Validator;
const userValidator = require('../validators/user');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const ValidationError = require('../errors/ValidationError').ValidationError;
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  let v = new Validator(req.body, userValidator.register)
  v.check().then(match => {
    if (!match)
      throw new ValidationError("Validation error", v.errors);
    
    return userModel.getByEmailAddress(req.body.email);
  }).then(data => {
    if (data) 
      throw new Error("Email is already in use");

    return userModel.getByUsername(req.body.username);
  }).then(data => {
    if (data)
      throw new Error("Username is already in use")

    return bcrypt.genSalt(10);
  }).then(salt => {
    return bcrypt.hash(req.body.password, salt);
  }).then(passwordHash => {
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: passwordHash
    }

    return userModel.save(user);
  }).then(() => {
    res.status(200).send("Ok");
  }).catch(err => {
    switch (err.message) { // TODO: Create new custom error and check for some application defined error code.
      case "Validation error":
        res.status(422).send(v.errors);
        break;
      case "Email is already in use":
        res.status(400).send(err.message); // TODO: Find appropriate status code
        break;
      case "Username is already in use":
        res.status(400).send(err.message); // TODO: Find appropriate status code
        break;
      default:
        console.error(err);
        res.status(500).send("An error has occurred on the server");
        break;
    }
  });
};

const login = (req, res) => {
  let v = new Validator(req.body, userValidator.login);
  v.check().then(match => {
    if (!match) {
      throw new ValidationError("Validation error", v.errors);
    } 
    
    return userModel.getByUsername(req.body.username);
  }).then(user => {
    if (!user)
      throw new Error("Wrong username or password");
    
    if (!bcrypt.compareSync(req.body.password, user.password))
      throw new Error("Wrong username or password");

    let tokenData = {
      userId: user.userId,
      username: user.username
    }

    let token = jwt.sign(tokenData, 'Superstrongsecret') // TODO: Create a configuration service and read secret
    res.status(200).send({ jwt: token });
  }).catch(err => { // TODO: Create new custom error and check for some application defined error code.
    switch(err.message) {
      case "Validation error":
        res.status(422).send(v.errors);
        break;
      case "Wrong username or password":
        res.status(403).send(err.message);
        break;
      default: 
        console.error(err);
        res.status(500).send("An error has occurred on the server")
        break;
    }
  });
};

module.exports = {
  register,
  login
};