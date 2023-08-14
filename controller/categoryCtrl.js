const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validMongoDbId = require("../utils/validMongoDbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.json(createCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deletedCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deletedCategory,
  getCategory,
  getAllCategory,
};
