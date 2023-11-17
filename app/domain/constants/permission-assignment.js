const role = require("./role");
const permission = require("./permission");

module.exports = {
  [role.ADMINISTRATOR]: [
    permission.BROWSE_LIVESTOCK,
    permission.READ_LIVESTOCK,
    permission.EDIT_LIVESTOCK,
    permission.ADD_LIVESTOCK,
    permission.DELETE_LIVESTOCK,

    permission.BROWSE_BROKERS,
    permission.READ_BROKER,
    permission.EDIT_BROKER,
    permission.ADD_BROKER,
    permission.DELETE_BROKER,

    permission.BROWSE_CATEGORIES,
    permission.READ_CATEGORY,

    permission.BROWSE_ORDERS,
    permission.ADD_ORDERS
  ],
  [role.BROKER]: [
    permission.BROWSE_LIVESTOCK,
    permission.READ_LIVESTOCK,
    permission.ADD_LIVESTOCK,

    permission.BROWSE_BROKERS,
    permission.READ_BROKER,

    permission.BROWSE_CATEGORIES,
    permission.READ_CATEGORY,

    permission.BROWSE_ORDERS,
    permission.ADD_ORDERS
  ],
  [role.CUSTOMER]: [
    permission.BROWSE_LIVESTOCK,
    permission.READ_LIVESTOCK,

    permission.BROWSE_BROKERS,
    permission.READ_BROKER,

    permission.BROWSE_CATEGORIES,
    permission.READ_CATEGORY,
    
    permission.BROWSE_ORDERS,
    permission.ADD_ORDERS
  ],
};
