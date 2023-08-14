const BlogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validMongoDbId = require("../utils/validMongoDbId");

const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const createBlogCategory = await BlogCategory.create(req.body);
    res.json(createBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const updateBlogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deletedBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const deleteBlogCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deleteBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const getBlogCategory = await BlogCategory.findById(id);
    res.json(getBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategory = asyncHandler(async (req, res) => {
  try {
    const getAllBlogCategory = await BlogCategory.find();
    res.json(getAllBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deletedBlogCategory,
  getBlogCategory,
  getAllBlogCategory,
};
