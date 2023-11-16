const { check } = require("express-validator");
const Validator = require("../../../support/Validator");
const { User } = require("../../../models");

class BrokerValidator extends Validator {
  rules = [
    check("name").notEmpty().withMessage("name must not empty"),
    check("phoneNumber").notEmpty().withMessage("phone number must not empty"),
  ];
}

module.exports = new BrokerValidator();
