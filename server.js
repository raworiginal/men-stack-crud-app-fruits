/* ====================== Modules ======================*/
const express = require("express");

/* ====================== Constants ======================*/
const app = express();
/* ====================== Variables ======================*/
/* ====================== Functions ======================*/

/* ====================== Routes ======================*/
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
/* ====================== Listener ======================*/
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
