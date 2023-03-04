const express = require("express");
const connectDB = require("../config/db");
const emailRouter = require("../routes/emails");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

connectDB();

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/emails", emailRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(5000);
