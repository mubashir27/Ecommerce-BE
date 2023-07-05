const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { email, firstname, lastname, mobile, password } = req.body;
  const findUser = User.findOne({ email });
  if (findUser) {
    res.status(400);
    throw Error("User already registerd");
  }
  const user_ = await User.create({
    ...req.body,
  });
  console.log("user_", user_);
  if (user_) {
    res.status(201).json({ email: user_.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.json({ message: "account registered" });
};

module.exports = { createUser };
