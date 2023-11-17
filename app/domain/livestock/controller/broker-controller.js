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
  const broker = await Broker.findByPk(req.params.id, {
    include: [{ model: Livestock }],
  });

  if (!broker) {
    return res.status(404).json({ message: "Broker not found" });
  }
  res.json(broker);
});

module.exports = router;
