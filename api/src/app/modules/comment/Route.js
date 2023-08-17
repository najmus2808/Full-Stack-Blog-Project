const express = require("express");
const { addComment, getComments } = require("./Controller");

const router = express.Router();

router.post("/createCommentByPostId/:id", addComment);
router.get("/getCommentByPostId/:id", getComments);

module.exports = router;
