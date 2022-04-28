const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");
var authRouter = require("./routes/auth");

var app = express();

// View engine setup.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Seitting up middleware.
app.use(logger(process.env.NODE_ENV !== 'production' ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setting up routes.
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
