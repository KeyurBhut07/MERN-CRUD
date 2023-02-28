const express = require("express");
const cors = require("cors");
require("./db/conn");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// app.use(userRouter);

// Avialeble Route
// -- User Route
app.use("/ak/users", require("./route/UserRoute"));

// -- Product Route
app.use("/ak/products", require("./route/ProductRoute"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
