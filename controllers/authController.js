/**
 * This is controller for '/auth/' requests.
 */
const database = require("../models/postgres");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This function is generates token for 1 hour.
const generateAccessToken = (path_to_image, uid, usertype) => {
  const payload = {
    id: uid,
    path_to_image: path_to_image,
    type: usertype,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1 h",
  });
};

// Generates normal text to send when bad signup.
const messageFromError = (errorMessage) => {
  return 'User with the ' + errorMessage.split(' ').slice(1).join(' ');
};

/**
 * Takes credentials from req body and adds user to DB.
 *  'email'
 *  'password'
 *  'username'
 *  'firstname'
 *  'lastname'
 */
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(400)
      .json({ message: "Registration error:\n  " + errors.errors.map(err => err.msg).join('\n  ') });
  }

  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  database.createUser(
    {
      email: req.body.email,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
    },
    function (err, rows, fields) {
      if (err && err.code == "23505") {
        return res
          .status(400)
          .json({ message: messageFromError(err.detail) });
      } else if (err) {
        return res.status(400).json({ message: "Registration error" });
      }

      return res.status(200).send("OK");
    }
  );
};

// Checks that the password is correct
exports.logIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Login error", errors: errors.errors });
  }
  database.getPassword(req.body.email, function (err, rows, fields) {
    if (err) {
      return res.status(400).json({ message: "Login error" });
    }
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "User not found or password incorrect" });
    }

    let user = rows[0]; // Contains data from db

    // Compare password from db and fro request
    let pwdCorrect = bcrypt.compareSync(req.body.password, user.pswd);
    if (!pwdCorrect) {
      return res
        .status(400)
        .json({ message: "User not found or password incorrect" });
    }
    return res
      .cookie(
        "access_token",
        generateAccessToken(user.path_to_image, user.id, user.type),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        }
      )
      .status(200)
      .json({ message: "Logged in successfully!" });
  });
};

exports.logout = function (req, res, next) {
  return res.clearCookie("access_token").redirect("/");
};
