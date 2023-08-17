const express = require("express");
const { createCoupon, getAllCoupon } = require("../controller/couponCtrl");
const router = express.Router();

router.post("/", createCoupon);
router.get("/get-all-coupon", getAllCoupon);

module.exports = router;
