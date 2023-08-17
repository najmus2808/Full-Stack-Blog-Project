const Blog = require("./Model.js");
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const blog = await new Blog({
      title,
      content,
      author,
    }).save();

    res.json({
      blog,
    });
  } catch (error) {
    res.json({ message: "Error adding blog", error: error });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    res.json({
      blogs,
    });
  } catch (error) {
    res.json({ message: "Error getting blogs", error: error });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json({
      blog,
    });
  } catch (error) {
    res.json({ message: "Error getting blog", error: error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // Check if any of the fields are being updated before creating updatedBlogData
    const updatedBlogData = {};
    if (title) updatedBlogData.title = title;
    if (content) updatedBlogData.content = content;
    if (author) updatedBlogData.author = author;

    // Update the blog data in the database
    const blog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ blog });
  } catch (error) {
    res.json({ message: "Error updating blog", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({ message: "Error deleting blog", error: error });
  }
};

const searchBlog = async (req, res) => {
  const { keyword } = req.query;

  try {
    let blogs;

    if (keyword) {
      // Search based on the keyword
      blogs = await Blog.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { author: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } },
        ],
      });
    } else {
      // Return an empty array if no keyword is provided
      blogs = [];
    }

    res.json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  searchBlog,
};
