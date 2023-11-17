const router = require("express").Router();
const { Order, Livestock, User } = require("../../../models");


router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Livestock,
        },{model:User}
      ],
    });

    res.json(orders);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, livestockId } = req.user;

    // Dapatkan data Livestock berdasarkan livestockId
    const livestock = await Livestock.findByPk(req.body.livestockId);

    if (!livestock) {
      return res.status(404).json({ error: "Livestock not found" });
    }

    // Hitung total berdasarkan harga Livestock
    const total = livestock.price;

    // Buat objek Order
    const order = await Order.create({
      userId: req.user.id,
      livestockId: req.body.livestockId,
      total
    });
    res.status(201).json({message: "Order created successfully", order})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/", async (req, res) => {
//     const {userId, ...orderData} = req.body

//     if (!userId) {
//         return res.status(400).json({error: "userId is required"})
//     }

//     const order = await Order.create({
//         userId,
//         ...orderData,
//     })

//     res.status(200).json({message: "Order created successfully",order})
// }
// )
module.exports = router;
