/* ====================== Dependencies ======================*/
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");

/* ====================== Constants ======================*/
const app = express();
/* ====================== Middleware ======================*/
app.use(express.urlencoded({ extended: false }));

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

app.get("/fruits/new", async (req, res) => {
  res.render("fruits/new.ejs");
});

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find({});
  res.render("fruits/index.ejs", { fruits: allFruits });
});

app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits");
});
/* ====================== Server ======================*/

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
