const express = require("express");
const router = express.Router();
const permission = require("../../../middleware/permission");
const { Category, Livestock } = require("../../../models");
const allowedTo = require("../../constants/permission");


module.exports = router;
