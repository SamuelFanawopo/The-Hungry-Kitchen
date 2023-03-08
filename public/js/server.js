const express = require("express");
const app = express();
const connectDB = require("../config/db");
require("dotenv").config();

app.set("views", "./public/views");
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/signup", async (req, res) => {
  try {
    const data = {
      email: req.body.email,
    };

    await connectDB.insertMany([data]);
    res.send(
      "You have successfully signed up to be notified of any updates to the website - We promise we don't spam. "
    );
  } catch {
    res.send("Email is already in use, try again!");
  }
});

app.listen(5000, () => {
  console.log("port connected");
});
