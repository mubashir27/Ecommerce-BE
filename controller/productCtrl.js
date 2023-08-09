const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  //   const product = await Product.create({
  //     ...req.user,
  //   });
  console.log("product", req.body);
});

// exporting the page
module.exports = { createProduct };
