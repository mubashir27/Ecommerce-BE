const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  deletedCategory,
  getCategory,
  getAllCategory,
} = require("../controller/categoryCtrl");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deletedCategory);
router.get("/get-all-category", getAllCategory);
router.get("/:id", getCategory);

module.exports = router;
