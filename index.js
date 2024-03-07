const express = require("express");
const mongoose = require("mongoose");
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config()

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3001);
    console.log("Connected!");
  })
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/api", dataRoutes);

app.get("/", (req, res) => {
  res.json({
    msg: "Working",
  });
});
