const express = require("express");
const router = express.Router();
const permission = require("../../../middleware/permission");
const { Broker, Livestock, User } = require("../../../models");
const allowedTo = require("../../constants/permission");
const BrokerValidator = require("../validators/BrokerValidator");

router.get("/", permission(allowedTo.BROWSE_BROKERS), async (req, res) => {
  const brokers = await Broker.findAll();

  res.json(brokers);
});

router.get("/:id", permission(allowedTo.READ_BROKER), async (req, res) => {
  const brokers = await Broker.findByPk(req.params.id, {
    include: [{ model: Livestock }, { model: User }],
  });

  if (!brokers) {
    return res.status(404).json({ message: "Broker not found" });
  }
});

// router.put(
//   "/:id",
//   [BrokerValidator.validate(), permission(allowedTo.EDIT_BROKER)],
//   async (req, res) => {
//     const broker = await Broker.findByPk(req.params.id);

//     if (!broker) {
//       return res.status(404).json({ message: "Broker not found" });
//     }

//     try {
//       await broker.update(req.body);
//       res.json({ message: "Broker updated" });
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// );

// router.delete("/:id", permission(allowedTo.DELETE_BROKER), async (req, res) => {
//   const broker = await Broker.findByPk(req.params.id, {
//     include: [{ model: Livestock }, { model: User }],
//   });

//   if (!broker) {
//     return res.status(404).json({ message: "Broker not found" });
//   }

//   if (broker.livestock.length > 0 && broker.users.length > 0) {
//     return res.status(400).json({ message: "Broker has livestock and users" });
//   }
//   if (broker.users.length > 0) {
//     return res.status(400);
//   }

// try {
//   await broker.destroy();
//   res.json({ message: "Broker deleted" });
// } catch (error) {
//   return res.status(500).json({ message: error.message });
// }
// });
module.exports = router;
