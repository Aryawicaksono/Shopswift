"use strict";
const { Category, Broker, Livestock } = require("../../app/models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const sale = ["SOLD", "FOR SALE"];
    const brokers = await Broker.findAll();
    const categories = await Category.findAll();
    if (brokers.length > 0 && categories.length > 0) {
      for (let i = 0; i < 30; i++) {
        await Livestock.create({
          categoryId:
            categories[Math.floor(Math.random() * categories.length)].id,
          price: faker.commerce.price({
            min: 1000000,
            max: 10000000,
            dec: 2,
            symbol: "Rp",
          }),
          brokerId: brokers[Math.floor(Math.random() * brokers.length)].id,
          status: sale[Math.floor(Math.random() * sale.length)],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Livestock", null, {});
  },
};
