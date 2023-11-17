const { check } = require("express-validator");
const Validator = require("../../../support/Validator");

class RegisterValidator extends Validator {
  rules = [
    check("email").isEmail().notEmpty().withMessage("email is required"),
    check("password").notEmpty().withMessage("password is required"),
    check("name").notEmpty().withMessage("name is required"),
    check("phoneNumber").notEmpty().withMessage("Phone Number is required")
  ];
}
module.exports = new RegisterValidator();
