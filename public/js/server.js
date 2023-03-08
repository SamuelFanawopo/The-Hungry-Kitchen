const express = require("express");
const emailRouter = require("../routes/emails");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("../config/db");
require("dotenv").config();

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/emails", emailRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/signup", async (req, res) => {
  const data = {
    email: req.body.email,
  };
  
  await connectDB.insertMany([data]);
  res.render("add-user-success");
});

app.listen(5000, () => {
  console.log("port connected");
});
