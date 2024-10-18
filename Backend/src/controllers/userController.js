const Model = require("../models/userModel");

const bcrypt = require("bcrypt");
const { createJsonWebToken } = require("../utils/jsonwebtoken");

// Create user
exports.create = async (req, res) => {
  try {
    const { userName, email, number, password } = req.body;

    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const bcrypt_password = await bcrypt.hash(password, salt);
    const result = await Model.create({
      userName,
      number,
      email,
      password: bcrypt_password,
    });

    res.status(200).json({
      success: true,
      message: "user create success",
      data: result,
    });
  } catch (error) {}
};

// Delete User
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Model.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 2. Load User
    const user = await Model.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = createJsonWebToken({ email, password }, "6h");

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Logged User
exports.getLoggedUser = async (req, res) => {
  try {
    const user = await Model.findOne({ username: req.user.username });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get All User
exports.getUsers = async (req, res) => {
  try {
    const result = await Model.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Users not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All User get success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
