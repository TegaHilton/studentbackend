const mongoose = require("mongoose");

require("dotenv").config();
const dbstring = process.env.DBSTRING;

const connectDB = async () => {
  try {
    console.log("connecting to database...");
    await mongoose.connect(dbstring, {});
    console.log("connection to database established successfully");
  } catch (err) {
    console.error("Error connecting to database: ", err);
  }
};

module.exports = connectDB;
