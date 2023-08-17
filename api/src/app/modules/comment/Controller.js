const Blog = require("../blog/Model");
const Comment = require("./Model");

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, username } = req.body;

    // Create and save a new comment
    const newComment = new Comment({ text, username }); // Include the username
    const savedComment = await newComment.save();

    // Find the blog and associate the comment
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push(savedComment); // Associate the comment using its ObjectId
    await blog.save();

    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("comments");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addComment,
  getComments,
};
