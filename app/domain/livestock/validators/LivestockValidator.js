const { check } = require("express-validator");
const Validator = require("../../../support/Validator");
const { Broker, Category } = require("../../../models");

class LivestockValidator extends Validator {
  rules = [
    check("categoryId")
      .notEmpty()
      .custom(async (categoryId) => {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          throw new Error("invalid categoryId");
        }
      }),
    check("price").notEmpty().withMessage("price must not empty"),
    check("brokerId")
      .notEmpty()
      .custom(async (brokerId) => {
        const broker = await Broker.findByPk(brokerId);
        if (!broker) {
          throw new Error("invalid brokerId");
        }
      }),
  ];
}

module.exports = new LivestockValidator();
