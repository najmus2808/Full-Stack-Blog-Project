const { check } = require("express-validator");

// register validation
const doRegisterValidator = [
  check("username").isLength({ min: 1 }).withMessage("UserName is required"),
  check("password").isLength({ min: 6 }).withMessage("Password is required"),
];

// login validation
const doLoginValidator = [
  check("username").isLength({ min: 1 }).withMessage("Mobile number or email is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

module.exports = { doLoginValidator, doRegisterValidator };
