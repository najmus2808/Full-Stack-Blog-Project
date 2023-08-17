const { validationResult } = require("express-validator");

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length) {
    res.status(400).send({ errors: mappedErrors, message: "Model Validation failed!" });
  } else {
    next();
  }
};

module.exports = validationHandler;
