const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost:27017/akecomerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to MongoDB");
  });
