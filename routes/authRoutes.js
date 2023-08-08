const express = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  unBlockUser,
  blockUser,
  handleRefreshToken,
  logout,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.get("/logout", logout);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);
module.exports = router;
