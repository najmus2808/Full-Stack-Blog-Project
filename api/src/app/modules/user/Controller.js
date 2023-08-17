const User = require("./Model");
const jwt = require("jsonwebtoken");

const { jwt_secret } = require("../../../config");
const { hashPassword, comparePassword } = require("../../utility/auth");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ error: "Username is taken" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      username,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, jwt_secret, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Username not found. Please check your username or register a new account.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ message: "Login failed!" });
    }

    const token = jwt.sign({ _id: user._id }, jwt_secret, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      users,
    });
  } catch (error) {
    res.json({ message: "Error getting users", error: error });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
