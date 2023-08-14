const express = require("express");
const connectDB = require("./config/dbConfig");
const app = express();
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
connectDB();
const port = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/user", require("./routes/authRoutes"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/blog-category", require("./routes/blogCategoryRoute"));
app.use("/api/brand", require("./routes/brandRoute"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running in post ${port} `);
});
