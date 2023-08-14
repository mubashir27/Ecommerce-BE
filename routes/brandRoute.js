const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBrand,
  updateBrand,
  deletedBrand,
  getBrand,
  getAllBrand,
} = require("../controller/brandCtrl");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deletedBrand);
router.get("/get-all-brands", getAllBrand);
router.get("/:id", getBrand);

module.exports = router;
