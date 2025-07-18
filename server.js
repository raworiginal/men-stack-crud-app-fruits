/* ====================== Dependencies ======================*/
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");
/* ====================== Middleware ======================*/
/* ====================== Constants ======================*/
const app = express();
/* ====================== Variables ======================*/

/* ====================== Functions ======================*/

/* ====================== Query Functions ======================*/

/* ====================== DB Connection ======================*/
mongoose.connect(process.env.MONGODB_URI);
//log conneciton status in terminal at start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});
/* ====================== Routes ======================*/
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});
/* ====================== Server ======================*/

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
