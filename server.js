const app = require("./index");
require("dotenv").config();

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
