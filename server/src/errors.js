class DoubleOperandError extends Error {
  constructor(message) {
    super(message);
    this.name = "DoubleOperanderror";
  }
}

class DoubleOperatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "DoubleOperatorError";
  }
}

class UnknownTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnkownTokenError";
  }
}

class ParenthesesError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParenthesesError";
  }
}

exports.DoubleOperandError = DoubleOperandError;
exports.DoubleOperatorError = DoubleOperatorError;
exports.UnknownTokenError = UnknownTokenError;
exports.ParenthesesError = ParenthesesError;
