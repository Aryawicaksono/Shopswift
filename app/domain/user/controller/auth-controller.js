const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const randomString = require("randomstring");
const { Token, User } = require("../../../models");
const AuthValidator = require("../validators/AuthValidator");

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
module.exports = router;
