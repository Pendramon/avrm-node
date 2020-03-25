class ValidationError extends Error {
  constructor(message, errors, ...params) {
    super(...params);

    this.message = message;
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

module.exports = {
  ValidationError
};