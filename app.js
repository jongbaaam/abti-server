const express = require("express");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { CLIENT_ORIGIN } = require("./constants/config");
const connectDataBase = require("./db/mongoose");

const projectService = require("./services/projectService");

const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");
const testRouter = require("./routes/test");
const abtiRouter = require("./routes/abti");

const app = express();

connectDataBase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOption = {
  origin: async (origin, callback) => {
    if (CLIENT_ORIGIN === origin) {
      return callback(null, true);
    }

    const isValidationUrl =
      await projectService.validateProjectByProjectUrl(origin);

    if (isValidationUrl) {
      return callback(null, true);
    }

    callback(new Error("허용되지 않은 접근입니다."));
  },
  credentials: true,
};
app.use(cors(corsOption));

app.use("/auth", authRouter);
app.use("/users", projectRouter);
app.use("/users", testRouter);
app.use("/abti", abtiRouter);

app.use("/", (req, res, next) => {
  res.json({
    message: "Server Health Check!!",
  });
});

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
