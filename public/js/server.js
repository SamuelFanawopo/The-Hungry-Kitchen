const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const connectDB = require("../config/db");
require("dotenv").config();

app.set("views", "./public/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const app_ID = process.env.APP_ID;
  const app_key = process.env.APP_KEY;
  const search = "n";

  const num1 = Math.floor(Math.random() * 16);
  let num2 = Math.floor(Math.random() * 16);
  let num3 = Math.floor(Math.random() * 16);

  while (num1 === num2 || num1 === num3 || num2 === num3) {
    num2 = Math.floor(Math.random() * 16);
    num3 = Math.floor(Math.random() * 16);
  }

  try {
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${app_ID}&app_key=${app_key}`;
    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
    const response = await fetch(baseURL);
    const data = await response.json();

    const parameters = {
      num1: num1,
      num2: num2,
      num3: num3,
      recipes: data.hits, // your recipe data here
    };

    res.render("home", parameters);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid Search");
  }
});

app.post("/search", async (req, res) => {
  const app_ID = process.env.APP_ID;
  const app_key = process.env.APP_KEY;
  const search = req.body.search;

  try {
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${app_ID}&app_key=${app_key}`;
    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
    const response = await fetch(baseURL);
    const data = await response.json();
    res.render("search", { recipes: data.hits });
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid Search");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const data = {
      email: req.body.email,
    };

    await connectDB.insertMany([data]);
    console.log("user added to the database");

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"noreply@thehungrykitchen" <${process.env.EMAIL_USERNAME}>`, // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "TheHungryKitchen", // Subject line
      text: "This is a confirmation message for you successfully signing up to recive news about any updates or changes to the website", // plain text body
      html: "<b>This is a confirmation message for you successfully signing up to recive news about any updates or changes to the website</b>", // html body
    });

    console.log("message sent");

    res.render("success");
  } catch {
    console.log("user failed to be added to the database");
    res.render("failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
