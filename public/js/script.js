const searchForm = document.querySelector(".search-box");
const testButton = document.querySelector(".test");
const searchResultDiv = document.querySelector(".cards-container");
const container = document.querySelector(".container");
const signupForm = document.querySelector(".signup-form");
let searchQuery = "";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require('dotenv').config()

const CLIENT_EMAIL = process.env.GMAIL_ADDRESS; //your email from where you'll be sending emails to users
const CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID; // Client ID generated on Google console cloud
const CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET; // Client SECRET generated on Google console cloud
const REDIRECT_URI = process.env.GMAIL_OAUTH_REDIRECT_URL; // The OAuth2 server (playground)
const APP_ID = process.env.APP_ID; // The refreshToken we got from the the OAuth2 playground
const APP_key = process.env.APP_KEY;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userEmail = e.target.querySelector(".signup-form-input").value;
  console.log(userEmail);
});

document.querySelector(".menu").addEventListener("click", () => {
  document.querySelectorAll(".target").forEach((item) => {
    item.classList.toggle("change");
  });
});

testButton.addEventListener("click", () => {
  sendMail()
    .then((result) => console.log("Email sent...", result))
    .catch((error) => console.log(error.message));
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector(".search").value;
  window.open("../screens/results_page.html"); // trying to display results on results page
  fetchAPI();
});

async function fetchAPI() {
  try {
    // potentially make new pages, like 1, 2 after results to load page faster, e.g to 20, then next page from 21 to 40 etc.
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=${APP_ID}&app_key=${APP_key}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    generateHTML(data.hits);
    console.log(data);
  } catch (error) {
    return error;
  }
}

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: CLIENT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `THEHUNGRYKITCHEN <${CLIENT_EMAIL}>`,
      to: userEmail,
      subject: "The Hungry Kitchen",
      text: "You have signed up to receive updates when there are any new changes on the website. Thanks for supporting the website!",
      html: "<h1>You have signed up to receive updates when there are any new changes on the website. Thanks for supporting the website!</h1>",
    };

    const emailResult = await transport.sendMail(mailOptions);
    return emailResult;
  } catch (error) {
    return error;
  }
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((results) => {
    generatedHTML += `<div class="card">
    <img
      src="../assets/images/temp-meal.jpg"
      class="card-img"
      width="230"
      height="230"
    />
    <h3 class="card-name">temp</h3>
    <button class="card-btn">View Recipe</button>
  </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

const icons = document.querySelectorAll(".section-1-icons i");
let i = 1;

setInterval(() => {
  i++;
  const icon = document.querySelector(".section-1-icons .change");
  icon.classList.remove("change");

  if (i > icons.length) {
    icons[0].classList.add("change");
    i = 1;
  } else {
    icon.nextElementSibling.classList.add("change");
  }
}, 4000);
