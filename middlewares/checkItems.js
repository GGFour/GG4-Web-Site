/**
 * This middleware checks a data that is sent to server during checkout
 */
const database = require('../models/postgres');

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

module.exports = async function (req, res, next) {
    let items = req.body.items;
    if (!items || items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }
    for(i = 0; i < items.length; i++) {
        if (items[i].quantity < 0) {
            return res.status(400).json({ message: "Are you stupid? You can't buy negative amount, but you can by early access to upcoming DLC that will allow you to sell items at store!"});
        }
    }
    let actualItems = await database.getItemsForOrder(items.map((item) => item.id));
    if (actualItems.length === items.length) {
        return res.status(400).json({ message: "According to our information, you've tried to buy unexisting items. Please, buy early access to upcoming DLC that will allow you to create your items" });
    }
    let userBalance = await database.getUserBalance(req.user.id);
    // console.log(userBalance);
    let total = checkBalance(userBalance, items, actualItems);
    if (!total) {
        return res.status(400).json({
            message: "Not enough coins or not enough items available for bying",
            });
    }
    req.total = total;

    return next();
}