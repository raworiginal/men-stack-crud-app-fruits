/* ====================== Dependencies ======================*/
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");
/* ====================== Constants ======================*/
const app = express();
/* ====================== Variables ======================*/
/* ====================== Functions ======================*/

/* ====================== Routes ======================*/
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
/* ====================== Listener ======================*/
mongoose.connect(process.env.MONGODB_URI);
//log conneciton status in terminal at start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
