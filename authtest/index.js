const express = require("express");
const connectDB = require("./src/config/db_config");
const cors = require("cors");
const { createStudent } = require("./src/controller/student.controller");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.post("/createStudent", createStudent);
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
