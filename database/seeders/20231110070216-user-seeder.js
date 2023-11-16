"use strict";
const { User, Role } = require("../../app/models");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const role = require("../../app/domain/constants/role");
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query("SELECT * FROM roles", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    const insertUsers = [];

    for (let i = 0; i < 20; i++) {
      insertUsers.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: bcrypt.hashSync(
          "password",
          parseInt(process.env.BCRYPT_ROUNDS, 10)
        ),
        roleId: roles[Math.floor(Math.random() * roles.length)].id,
        phoneNumber: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", insertUsers);

    const roleBroker = await Role.findOne({
      where: {
        name: role.BROKER,
      },
    });
    if (roleBroker) {
      const brokers = await User.findAll({
        where: {
          roleId: roleBroker.id,
        },
      });
      if (brokers.length > 0) {
        const insertBroker = brokers.map((broker) => ({
          userId: broker.id,
          name: broker.name,
          phoneNumber: broker.phoneNumber,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("Brokers", insertBroker);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brokers", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
