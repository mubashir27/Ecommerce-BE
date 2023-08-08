const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validMongoDbId = require("../utils/validMongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

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
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findOneAndUpdate(
      findUser?._id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
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

// get users
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // validMongoDbId(id);
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

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie?.refreshToken)
    throw new Error("No Refresh token in cookies");
  const refreshToken = cookie?.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    console.log("decoded", decoded);

    if (err || user.id !== decoded.id) {
      throw new Error("something wrong with refresh token");
    }
    const accessToken = generateToken(user?.id);
    res.json({ accessToken });
  });
  res.json(user);
});

// logut

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie?.refreshToken)
    throw new Error("No Refresh token in cookies");
  const refreshToken = cookie?.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    req.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // frobidden
  }
  await User.findByIdAndUpdate(refreshToken, { refreshToken: "" });
  req.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // frobidden
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
  handleRefreshToken,
  logout,
};
