const express = require("express");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const connectDataBase = require("./db/mongoose");
const authRouter = require("./routes/auth");

const app = express();

connectDataBase();

// 개발 환경을 위한 출처 추가
const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOption));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
