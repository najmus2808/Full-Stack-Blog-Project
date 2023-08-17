const express = require("express");
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, searchBlog } = require("./Controller");
const validationHandler = require("../../middlewares/validationHandler");
const { doBlogValidator } = require("./Validation");
const checkAuth = require("../../middlewares/checkAuth");

const router = express.Router();

router.post("/create", checkAuth, doBlogValidator, validationHandler, createBlog);
router.get("/", getAllBlogs);
router.get("/post/:id", getBlogById);
router.put("/edit/:id", checkAuth, updateBlog);
router.delete("/post/:id", checkAuth, deleteBlog);
router.get("/search", searchBlog);

module.exports = router;
