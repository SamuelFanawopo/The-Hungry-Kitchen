// for recipes api
/*
const APP_ID = "cea45f1d";
const APP_KEY = "6bef5531ed46bbf0c6d5a2abc08cae37";

const searchForm = document.querySelector(".search-box");
const searchResultDiv = document.querySelector(".cards-container");
const container = document.querySelector(".container");
let searchQuery = "";

// save the value of the search and open a new
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector(".search").value;
  window.open("../screens/recipe-search.html"); // trying to display results on results page
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

function generateHTML(results) {
  let generatedHTML = "";
  generateHTML += `    
  <div class="container">
    <!-- Section 1 -->
    <section class="section-1">
      <h1 class="section-heading home">You searched for: ${searchQuery}</h1>
    </section>
  </div>`;
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

module.exports = searchQuery;
*/