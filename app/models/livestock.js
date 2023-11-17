"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Livestock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Livestock.belongsTo(models.Broker);
      models.Livestock.belongsTo(models.Category);
      models.Livestock.hasMany(models.Order)
      // define association here
    }
  }
  Livestock.init(
    {
      categoryId: DataTypes.INTEGER,
      price: DataTypes.STRING,
      brokerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Livestock",
    }
  );
  return Livestock;
};
