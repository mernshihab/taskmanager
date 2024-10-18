const express = require("express");
const router = express.Router();

// Imports routers
const user = require("./userRoute");
const task = require("./taskRoute");

// Use Routes

router.use("/user", user);
router.use("/task", task);

module.exports = router;
