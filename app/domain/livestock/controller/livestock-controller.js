const express = require("express");
const router = express.Router();
const permission = require("../../../middleware/permission");
const { Livestock, Category, Broker } = require("../../../models");
const allowedTo = require("../../constants/permission");
const LivestockValidator = require("../validators/LivestockValidator");

router.get("/", permission(allowedTo.BROWSE_LIVESTOCK), async (req, res) => {
  const livestock = await Livestock.findAll({
    include: [{ model: Category }, { model: Broker }],
  });
  res.json(livestock);
});

router.get("/:id", permission(allowedTo.READ_LIVESTOCK), async (req, res) => {
  const livestock = await Livestock.findByPk(req.params.id, {
    include: [{ model: Category }, { model: Broker }],
  });

  if (!livestock) {
    return res.status(404).json({ message: "Livestock not found" });
  }

  res.json(book);
});

router.post(
  "/:brokerId/add",
  [permission(allowedTo.ADD_LIVESTOCK), LivestockValidator.validate()],
  async (req, res) => {
    try {
      const { brokerId } = req.params;
      const { categoryId, price } = req.body;

      // Cek apakah broker dengan brokerId tertentu ada
      const existingBroker = await Broker.findByPk(brokerId);
      if (!existingBroker) {
        return res.status(404).json({ message: "Broker not found" });
      }

      // Buat livestock dengan mengaitkannya dengan broker yang ada
      const livestock = await Livestock.create({
        categoryId,
        price,
        brokerId,
      });

      res.status(201).json({ message: "Livestock created" });
    } catch (error) {
      console.error("Livestock Creation Error:", error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  [permission(allowedTo.EDIT_LIVESTOCK), LivestockValidator.validate()],
  async (req, res) => {
    const livestock = await Livestock.findByPk(req.params.id);

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    try {
      await livestock.update(req.body);
      res.json({ message: "Livestock updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  permission(allowedTo.DELETE_LIVESTOCK),
  async (req, res) => {
    const livestock = await Livestock.findByPk(req.params.id);

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    try {
      await livestock.destroy();
      res.json({ message: "Livestock deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
