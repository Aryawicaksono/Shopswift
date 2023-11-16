const express = require("express");
const router = express.Router();
const permission = require("../../../middleware/permission");
const { Category, Livestock } = require("../../../models");
const allowedTo = require("../../constants/permission");

router.get("/", permission(allowedTo.BROWSE_CATEGORIES), async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.get("/:id", permission(allowedTo.READ_CATEGORY), async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Livestock }],
  });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});
module.exports = router;
