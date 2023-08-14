const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBlogCategory,
  updateBlogCategory,
  deletedBlogCategory,
  getBlogCategory,
  getAllBlogCategory,
} = require("../controller/blogCategoryCtrl");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deletedBlogCategory);
router.get("/get-all-blogCategory", getAllBlogCategory);
router.get("/:id", getBlogCategory);

module.exports = router;
