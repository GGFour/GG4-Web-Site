/**
 * This is controller for '/api/' requests.
 */

const database = require("../models/postgres");

// Returns json containing all items from database.
exports.getItems = async (req, res, next) => {
  database.getItems(function (err, result, fields) {
    if (err) {
      res.status(500);
      res.send("Whoops");
    } else {
      res.status(200);
      res.json(result);
    }
  });
};

exports.getPersonalInfo = async (req, res, next) => {
  let userId = req.user.id;
  database.getPersonalInfo(userId, function (err, result, fields) {
    if (err) {
      res.status(500);
      res.send("Whoops");
    } else {
      res.status(200);
      res.json(result[0]);
    }
  });
};

exports.placeOrder = async (req, res, next) => {
  let user = req.user;
  let itemsInfo = req.body.items;

  try {
    let result = await database.placeOrder(user.id, req.total, itemsInfo);
    if (result) {
      return res.status(200).json({ message: "ok", result });
    } else {
      return res.status(500).json({ message: "error", result });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
};

exports.getInventory = async (req, res, next) => {
  let userId = req.user.id;
  database.getInventory(userId, function (err, result, fields) {
    if (err) {
      res.status(500);
      res.send("Whoops");
    } else {
      res.status(200);
      res.json(result);
    }
  });
};