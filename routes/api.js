/**
 * This file routes the '/api/' requests.
 */

const express = require("express");
const path = require("path");
const controller = require("../controllers/apiController");
const authenticated = require("../middlewares/authenticated");
const protected = require("../middlewares/protected");

var router = express.Router();

router.get("/items", controller.getItems);

router.get(
  "/personalInfo",
  authenticated,
  protected,
  controller.getPersonalInfo
);

router.post("/placeOrder", authenticated, protected, controller.placeOrder);

module.exports = router;
