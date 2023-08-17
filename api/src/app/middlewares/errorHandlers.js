const createError = require("http-errors");

// 404 not found handler
const notFoundHandler = (req, res, next) => {
  next(
    createError(404, {
      message: "Your requested content was not found!",
    })
  );
};

// default error handler
const errorHandler = (err, req, res, next) => {
  // status code set
  res.status(err.status || 500);

  // json response
  res.json({
    message: err.message,
  });
};

module.exports = { notFoundHandler, errorHandler };
