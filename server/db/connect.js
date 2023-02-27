const mongoose = require("mongoose");

const connectDB = (MONGOURI) => {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("We are connected to mongodb");
  });

  mongoose.connection.on("error", () => {
    console.log("We are not connected to mongodb");
  });
};

module.exports = connectDB;
