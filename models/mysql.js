/**
 * This file responds for communicating with the database.
 * Could be splited into different files according to 
 * functionality later.
 */

const pool = require("./pool");
const queries = require("./queries");


/**
 * Gets all items from db and passes them to response collback.
 * @param { function } response - callback function takes (err, result, fields)
 */
exports.getItems = (response) => {
  pool.query(
    queries.getItems,
    function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
      response(err, result, fields);
    }
  );
}

/**
 * Gets user pswd by given email and passes it to response callback.
 * @param { String } email - email of requested user
 * @param { function } response - callback function takes (err, result, fields)
 */
exports.getPassword = (email, response) => {
  pool.query(
    "SELECT user.id, user.path_to_logo, user.pswd, user_type.name as 'type' FROM user, user_type WHERE user.email = ? AND user.usertype_id = user_type.id",
    [
      email
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
      response(err, result, fields);
    }
  );
}

/**
 * Adds user to database.
 * @param { Object } credentials 
 * @param { function } response - callback function
 */
exports.createUser = (credentials, response) => {
  pool.query(queries.createUser, [
    credentials.email,
    credentials.username,
    credentials.firstname,
    credentials.lastname,
    credentials.password
  ],
  (err, result, field) => {
    if (err) {
      console.log(err);
    }
    response(err, result, field);
  });
}

exports.getPersonalInfo = (userId, response) => {
  pool.query(
    queries.personalInfo,
    [
      userId
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
      response(err, result, fields);
    }
  );
}