"use strict";
const bcrypt = require("bcrypt");
const auth = require("../../config/config");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Token);
      models.User.belongsTo(models.Role);
      models.User.hasOne(models.Broker);
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    try {
      const hash = await bcrypt.hash(user.password, auth.bcryptRound);
      user.password = hash;
    } catch (err) {
      throw new Error(err);
    }
  });
  return User;
};
