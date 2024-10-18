const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ userName: decoded.userName });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      error,
    });
  }
};
