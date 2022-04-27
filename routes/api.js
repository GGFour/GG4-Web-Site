/**
 * This file routes the '/api/' requests.
 */

const express = require("express");
const path = require("path");
const controller = require("../controllers/apiController");
const authenticated = require("../middlewares/authenticated");
const protected = require("../middlewares/protected");
const checkOrder = require("../middlewares/checkItems");

var router = express.Router();

router.get("/items", controller.getItems);

router.get(
  "/personalInfo",
  authenticated,
  protected,
  controller.getPersonalInfo
);

router.get('/getInventory',
    authenticated, 
    protected, 
    controller.getInventory
);

router.post('/placeOrder', 
    authenticated,
    protected,
    checkOrder,
    controller.placeOrder
);

module.exports = router;
