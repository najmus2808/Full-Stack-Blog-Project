const { check } = require("express-validator");

// blog validator
const doBlogValidator = [
  check("title").isLength({ min: 1 }).withMessage("Title is required"),
  check("content").isLength({ min: 1 }).withMessage("Content is required"),
];

module.exports = {
  doBlogValidator,
};
