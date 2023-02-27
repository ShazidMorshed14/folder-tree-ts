const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

//importing mongoDB connection function
const connectDB = require("./db/connect");

const PORT = process.env.PORT | 5000;

//importing the routes
const data_routes = require("./routes/data");

app.use("/api/data", data_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
