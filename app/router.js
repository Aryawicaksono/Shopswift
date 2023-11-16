const express = require("express");
const router = express.Router();
const authController = require("../app/domain/user/controller/auth-controller");
const brokerController = require("../app/domain/livestock/controller/broker-controller");
const categoryController = require("../app/domain/livestock/controller/category-controller");
const livestockController = require("../app/domain/livestock/controller/livestock-controller");
const auth = require("./middleware/auth");

router.use("/auth", authController);

router.use("/categories", auth, categoryController);
router.use("/brokers", auth, brokerController);
router.use("/livestock", auth, livestockController);

module.exports = router;
