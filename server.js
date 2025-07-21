/* ====================== Dependencies ======================*/
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");
const methodOverride = require("method-override");
const morgan = require("morgan");

/* ====================== Constants ======================*/
const app = express();
/* ====================== Middleware ======================*/
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

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
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  console.log(foundFruit);
  res.send(`This is the edit route for ${foundFruit.name}`);
});
/* ====================== Server ======================*/

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
