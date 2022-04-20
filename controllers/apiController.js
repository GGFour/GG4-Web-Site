/**
 * This is controller for '/api/' requests.
 */

const database = require("../models/mysql");

/**
 * Checks if user can place order
 * @param {Number} uBalance - balance of the user
 * @param {Array} itemsInfo - array containing objects {id:, quantity:}
 * @param {Array} actualItems - array containing objects with information from database
 * @returns
 */

function checkBalance(uBalance, itemsInfo, actualItems) {
  let itemsInfoObj = itemsInfo.reduce((obj, item) => {
    obj[item.id] = item.quantity;
    return obj;
  }, {});
  let items = actualItems.map((item) => {
    item.reqQuantity = itemsInfoObj[item.id];
    return item;
  });

  let notEnoughItems = false;
  let total = items.reduce((res, item) => {
    if (item.reqQuantity > item.quantity) {
      notEnoughItems = true;
    }
    res += item.price * item.reqQuantity;
    return res;
  }, 0);

  if (uBalance < total || notEnoughItems) {
    return undefined;
  }

  return total;
}

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

  if (!itemsInfo || itemsInfo.length == 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    let actualItems = await database.getItemsForOrder(
      itemsInfo.map((item) => item.id)
    );
    if (actualItems.length === 0) {
      return res.status(500).json({ message: "error" });
    }
    let userBalance = await database.getUserBalance(user.id);
    let total = checkBalance(userBalance, itemsInfo, actualItems);
    if (!total) {
      return res.status(400).json({
        message: "not enough coins or not enough items available for bying",
      });
    }

    let result = await database.placeOrder(user.id, total, itemsInfo);
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