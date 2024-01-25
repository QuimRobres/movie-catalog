const mongoose = require("mongoose");
mongoose
  .connect(`${process.env.DBURL}`)
  .then(() => console.log("Connected to Mongo"))
  .catch((error) => console.error("kimo error", error));

module.exports = mongoose;
