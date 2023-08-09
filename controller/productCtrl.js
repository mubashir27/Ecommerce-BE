const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log("product", req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// exporting the page
module.exports = { createProduct };
