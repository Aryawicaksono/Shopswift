const { Token, User } = require("../models");

module.exports = async (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    res.status(401).send({ error: "No token provided" });
    return;
  }

  const userToken = await Token.findOne({
    where: { token: authToken },
  });

  if (!userToken) {
    res.status(403).send({ error: "Invalid token" });
    return;
  }

  const user = await User.findByPk(userToken.userId);
  req.user = user.toJSON();

  next();
};
