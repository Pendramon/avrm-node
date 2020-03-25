const register = {
  full_name: "required|string|minLength:5",
  password: "required|string",
  email: "required|email"
};

const login = {
  email: "required|email",
  password: "required|string"
}

module.exports = {
  register
};