const express = require("express");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { CLIENT_ORIGIN } = require("./constants/config");
const connectDataBase = require("./db/mongoose");

const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");

const app = express();

connectDataBase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOption = {
  origin: [CLIENT_ORIGIN],
  credentials: true,
};
app.use(cors(corsOption));

app.use("/auth", authRouter);
app.use("/users", projectRouter);

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
