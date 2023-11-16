const { check } = require("express-validator");
const Validator = require("../../../support/Validator");

class CategoryValidator extends Validator {
  rules = [check("name").notEmpty().withMessage("Category required a name")];
}

module.exports = new CategoryValidator();
