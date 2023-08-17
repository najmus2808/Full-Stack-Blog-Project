const express = require("express");

const { register, login, getUser } = require("./Controller");
const { doRegisterValidator, doLoginValidator } = require("./Validation");
const checkAuth = require("../../middlewares/checkAuth");
const validationHandler = require("../../middlewares/validationHandler");

const router = express.Router();

router.post("/register", doRegisterValidator, validationHandler, register);
router.post("/login", doLoginValidator, validationHandler, login);
router.get("/users", checkAuth, getUser);

module.exports = router;
