const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validMongoDbId = require("../utils/validMongoDbId");

// register a user
const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const user_ = await User.create({
      ...req.body,
    });

    res.json({ user_ });
  } else {
    throw new Error("User already Exists");
  }
});
// login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatch(password))) {
    // res.json(findUser);
    res.json({
      _id: findUser._id,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid crediantials");
  }
});
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get all users
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a users
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      message: "User Deleted Sucessfully",
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update a users
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validMongoDbId(_id);
    const updateUser = await User.findByIdAndUpdate(
      _id,
      { ...req?.body },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// update a users
const blockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);
    const blockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked ",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update a users
const unBlockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validMongoDbId(id);

    const unBlockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      {
        new: true,
      }
    );
    res.json({
      message: "User unBlocked ",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
};
