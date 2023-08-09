const express = require("express");
const { createProduct } = require("../controller/productCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createProduct);
module.exports = router;
