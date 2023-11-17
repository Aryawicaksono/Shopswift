const router = require("express").Router();
const Livestock = require("../../../models/livestock");
const { Category } = require("../../../models");
const permission = require("../../../middleware/permission");
const allowedTo = require("../../constants/permission");

router.get("/", permission(allowedTo.BROWSE_CATEGORIES), async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.get("/:id", permission(allowedTo.READ_CATEGORY), async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [ "Livestock" ],
      });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
