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
    "SELECT * FROM user WHERE email = :email",
    {
      email: email,
    },
    (err, result, fields) => {
      if (err) {
        console.log(error.message);
      }
      response(err, result, fields);
    }
  );
}