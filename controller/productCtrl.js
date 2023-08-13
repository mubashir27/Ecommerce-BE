const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body);
    console.log("product", req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    res.json({ findProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  // Filtring the products
  try {
    const queryObject = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((item) => delete queryObject[item]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Product.find(JSON.parse(queryStr));
    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numberOfProducts = await Product.countDocuments();
      if (skip >= numberOfProducts) {
        throw new Error("This Page does not exist");
      }
    }
    console.log("page", page, limit, skip);
    const product = await query;

    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id; // Extract the ID from req.params
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id; // Extract the ID from req.params
  try {
    const deleteProduct = await Product.findOneAndDelete({ _id: id });
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// exporting the page
module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
