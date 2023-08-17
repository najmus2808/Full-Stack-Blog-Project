// Basic imports
const express = require("express");
const app = express();

// Security Middleware
const cors = require("cors");

const { notFoundHandler, errorHandler } = require("./app/middlewares/errorHandlers");
const blog = require("./app/modules/blog");
const user = require("./app/modules/user");
const comment = require("./app/modules/comment");

// Security Middleware Implementation
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Implementation
app.use("/api/v1/user", user.Route);
app.use("/api/v1/blog", blog.Route);
app.use("/api/v1/comment", comment.Route);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

module.exports = app;
