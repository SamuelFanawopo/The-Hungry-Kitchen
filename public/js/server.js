const express = require("express");
const app = express();
const connectDB = require("../config/db");
require("dotenv").config();

app.set("views", "./public/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

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
    console.log("user added to the database");
    res.render("success");
  } catch {
    console.log("user failed to be added to the database");
    res.render("failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
