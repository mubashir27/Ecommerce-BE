const express = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
} = require("../controller/userCtrl");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id", getUser);

module.exports = router;
