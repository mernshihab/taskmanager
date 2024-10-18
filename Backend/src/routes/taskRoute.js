const express = require("express");

const router = express.Router();

const {
  getAll,
  create,
  destroy,
  update,
} = require("../controllers/taskController");

router.get("/all", getAll);
router.post("/add", create);
router.post("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
