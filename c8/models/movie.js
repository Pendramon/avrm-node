const mongoose = require('mongoose');

const Movie = mongoose.model(
  'movie',
  {
    name: String,
    director: String,
    release_date: Date,
    genre: [String],
    actors: [String],
    plot: String
  }
);

const getAllMovies = () => {
  return new Promise((success, fail) => {
    Movie.find((err, result) => {
      if (err) 
        return fail(err);
      
      return success(result);
    });
  });
};

const getMovieById = (id) => {
  return new Promise((success, fail) => {
    Movie.findById(id, (err, result) => {
      if (err)
        return fail(err);

      return success(result);
    });
  });
};

const updateMovie = (id, data) => {
  return new Promise((success, fail) => {
    Movie.update({_id: id}, data, (err) => {
      if (err)
        return fail(err);

      return success();
    });
  });
};

const deleteMovie = (id) => {
  return new Promise((success, fail) => {
    Movie.deleteOne({_id: id}, (err) => {
      if (err)
        return fail(err);

      return success();
    })
  })
}

const save = (data) => {
  return new Promise((success, fail) => {
    let movie = new Movie(data);
    movie.save((err) => {
      if (err) 
        return fail(err);

      return success();
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  save
};