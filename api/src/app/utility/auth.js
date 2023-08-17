const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hashed) => {
  const match = await bcrypt.compare(password, hashed);
  return match;
};

module.exports = { hashPassword, comparePassword };
