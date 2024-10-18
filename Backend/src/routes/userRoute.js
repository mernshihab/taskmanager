const express = require("express");
const router = express.Router();

const {
  create,
  destroy,
  login,
  getLoggedUser,
  getUsers,
} = require("../controllers/userController");

const verifyUser = require("../middleware/verifyUser");
const verifyToken = require("../middleware/verifyToken");

router.get("/all", getUsers);
router.post("/add", create);
router.post("/login", login);
router.get("/logged", verifyToken, getLoggedUser);
router.delete("/delete/:id", verifyUser, destroy);

module.exports = router;
