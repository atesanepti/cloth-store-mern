const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const app = express();

const { singleFile } = require("./middlewares/fileHandlers");
const { errorRes } = require("./helpers/response");
//routers
const productRouter = require("./routes/product")
const userRouter = require("./routes/user");

//application middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/images", express.static("upload/images"));


//routes
app.use("/products",productRouter)
app.use("/user", userRouter);


app.use((req, res, next) => {
  next(createHttpError(404, "page was not found"));
});


app.use((error, req, res, next) => {
  console.log("Dev error : ", error);
  const statusCode = error.status || 500;
  const errorMessage = error.message || "server error";

  return errorRes(res, {
    statusCode: statusCode,
    message: errorMessage,
  });
});

module.exports = app;
