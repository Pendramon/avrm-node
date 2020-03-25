const movieModel = require('../models/movie');
const movieValidator = require('../validators/movie');
const Validator = require('node-input-validator').Validator;
const ValidationError = require('../errors/ValidationError').ValidationError;

const getAllMovies = (req, res) => {
  movieModel.getAllMovies().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send("An error has occurred on the server");
  });
};

const getMovie = (req, res) => {
  movieModel.getMovieById(req.params.id).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send("An error has occurred on the server");
  });
};

const addMovie = (req, res) => {
  let v = new Validator(req.body, movieValidator.movie);
  v.check().then(match => {
    if (!match)
      throw new ValidationError("Validation error", v.errors);

    const movie = {
      name: req.body.name,
      director: req.body.director,
      release_date: req.body.release_date,
      genre: req.body.genre,
      actors: req.body.actors,
      plot: req.body.plot
    };

    return movieModel.save(movie);
  }).then(() => {
    res.status(200).send("Ok");
  }).catch(err => {
    switch(err.message) {
      case "Validation error":
        res.status(422).send(v.errors);
        break;
      default:
        res.status(500).send("An error has occurred on the server");
        break;
    }
  });
};

const editMovie = (req, res) => {
  let v = new Validator(req.body, movieValidator.movieNotStrict);
  v.check().then(match => {
    if (!match) 
      throw new ValidationError("Validation error", v.errors);

    return movieModel.updateMovie(req.params.id, req.body);
  }).then(() => {
    res.status(200).send("Ok");
  }).catch(err => {
    switch(err.message) {
      case "Validation error":
        res.status(422).send(v.errors);
        break;
      default: 
        res.status(500).send("An error has occurred on the server");
        break;
    }
  });
};

const deleteMovie = (req, res) => {
  movieModel.deleteMovie(req.params.id).then(() => {
    res.status(200).send("Ok");
  }).catch(err => {
    console.error(err);
    res.status(500).send("An error has occurred on the server");
  })
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  editMovie,
  deleteMovie
};