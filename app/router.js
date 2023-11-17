const express = require("express");
const router = express.Router();
const authController = require("../app/domain/user/controller/auth-controller");
const brokerController = require("../app/domain/livestock/controller/broker-controller");
const userController = require("../app/domain/livestock/controller/user-controller");
const livestockController = require("../app/domain/livestock/controller/livestock-controller");
const categoriesController = require("../app/domain/livestock/controller/category-controller")
const auth = require("./middleware/auth");

router.use("/auth", authController);

router.use("/users", auth, userController);
router.use("/brokers", auth, brokerController);
router.use("/livestock", auth, livestockController);
router.use("/categories", auth, categoriesController);

module.exports = router;
