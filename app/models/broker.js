"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Broker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Broker.belongsTo(models.User);
      models.Broker.hasMany(models.Livestock);
      // define association here
    }
  }
  Broker.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Broker",
    }
  );
  return Broker;
};
