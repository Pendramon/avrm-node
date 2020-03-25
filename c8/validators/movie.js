const movie = {
  name: "required|string",
  director: "required|string",
  release_date: "required|dateiso",
  genre: "required|arrayUnique",
  actors: "required|arrayUnique",
  plot: "required|string"
};

const movieNotStrict = {
  name: "string",
  director: "string",
  release_date: "dateiso",
  genre: "arrayUnique",
  actors: "arrayUnique",
  plot: "string"
}

module.exports = {
  movie,
  movieNotStrict
};