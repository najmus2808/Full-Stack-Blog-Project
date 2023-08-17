const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return next(createError(401, "Authentication failure!"));

    const token = authorization?.split(" ")[1];
    if (!token) return next(createError(401, "Authentication failure!"));

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) return next(createError(401, "Authentication failure!"));

    const { userName, userId, role } = payload;

    req.userName = userName;
    req.userId = userId;
    req.isAdmin = role === "admin";
    next();
    return null;
  } catch (error) {
    next(createError(401, "Authentication failure!"));
    return null;
  }
};

module.exports = checkAuth;
