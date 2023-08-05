const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  console.log("findUser", findUser);
  if (!findUser) {
    const user_ = await User.create({
      ...req.body,
    });

    res.json({ user_ });
  } else {
    throw new Error("User already Exists");
  }
});

module.exports = { createUser };
