const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");

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

module.exports = { createUser, loginUser };
