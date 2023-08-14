const BlogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validMongoDbId = require("../utils/validMongoDbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const createCategory = await BlogCategory.create(req.body);
    res.json(createCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const updateCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {
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
    const deleteCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const getCategory = await BlogCategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await BlogCategory.find();
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
