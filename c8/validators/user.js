const register = {
  username: "required|string|minLength:3",
  password: "required|string",
  email: "required|email"
};

const login = {
  username: "required|string",
  password: "required|string"
};

module.exports = {
  register,
  login
}