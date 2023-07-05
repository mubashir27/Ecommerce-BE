const express = require("express");
const connectDB = require("./config/dbConfig");
const app = express();
const dotenv = require("dotenv").config();
connectDB();
const port = process.env.PORT || 5000;
app.use(express.json());
// routes
app.use("/api/user", require("./routes/authRoutes"));
app.listen(port, () => {
  console.log(`server running in post ${port} `);
});
