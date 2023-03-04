// for recipes api
const APP_ID = "cea45f1d";
const APP_KEY = "6bef5531ed46bbf0c6d5a2abc08cae37";
const signupForm = document.querySelector(".signup-form");
let searchQuery = "";

// email signup form
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userEmail = e.target.querySelector(".signup-form-input").value;
  // in the future insert these values into a database
  console.log(userEmail);
});

// navbar menu
document.querySelector(".menu").addEventListener("click", () => {
  document.querySelectorAll(".target").forEach((item) => {
    item.classList.toggle("change");
  });
});

// icon slideshow

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
