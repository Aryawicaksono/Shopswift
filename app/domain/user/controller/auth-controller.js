const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const randomString = require("randomstring");
const { Token, User } = require("../../../models");
const AuthValidator = require("../validators/AuthValidator");
const RegisterValidator = require("../validators/RegisterValidator");

router.post("/", AuthValidator.validate(), async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    res.status(422).send({ error: "Invalid credentials" });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(422).send({ error: "Invalid credentials" });
    return;
  }
  const token = randomString.generate();
  await Token.create({ userId: user.id, token });
  res.json({ token });
});

router.post("/register", RegisterValidator.validate(), async (req, res) => {
  try {
    const { email, password, name, phoneNumber } = req.body;

    // Hash password
    const bcryptRound = 14;
    const hashedPassword = await bcrypt.hash(password, bcryptRound);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      roleId: 3, // Set default roleId to 3 for Customer
    });

    // Generate and save token
    const token = randomString.generate();
    await Token.create({ userId: user.id, token });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
router.post("/registerbroker", RegisterValidator.validate(), async (req, res) => {
  try {
    const { email, password, name, phoneNumber } = req.body;

    // Hash password
    const bcryptRound = 14;
    const hashedPassword = await bcrypt.hash(password, bcryptRound);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      roleId: 2, // Set default roleId to 3 for Customer
    });

    // Generate and save token
    const token = randomString.generate();
    await Token.create({ userId: user.id, token });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
module.exports = router;
