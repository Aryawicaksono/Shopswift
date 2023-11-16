const { check } = require("express-validator");
const Validator = require("../../../support/Validator");

class AuthValidator extends Validator {
  rules = [
    check("email").isEmail().notEmpty().withMessage("email is required"),
    check("password").notEmpty().withMessage("password is required"),
  ];
}
module.exports = new AuthValidator();
