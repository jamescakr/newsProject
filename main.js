const API_KEY = `d2bb588d15db43cabd709a13297a0071`;
let newsList = [];
let page = 2;
let category = "";
let keyword = "";
let pageSize = 10;

const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const sideMenu = document.querySelectorAll(".side-menu a");
sideMenu.forEach((item) =>
  item.addEventListener("click", (event) => getNewsByCategory(event))
);

let searchInput = document.getElementById("search-input");
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getNewsByKeyword();
  }
});

const getLatestNews = async () => {
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );

  //과제제출용
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${pageSize}&page=${page}${category}${keyword}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  // );

  //과제제출용
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  let data = await response.json();
  console.log("data", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  // );

  //과제제출용
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data);
  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news-section">
                <div class="col-lg-4">
                    <img class="news-img-size"
                        src=${
                          news.urlToImage
                            ? news.urlToImage
                            : "https://cdn.vectorstock.com/i/500p/32/45/no-image-symbol-missing-available-icon-gallery-vector-45703245.jpg"
                        } />
                </div>
                <div class="col-lg-8">
                    <h2>
                        ${news.title}
                    </h2>
                    <p>
                        ${
                          news.description
                            ? news.description.length > 200
                              ? news.description.slice(0, 200) + "..."
                              : news.description
                            : "No content available"
                        }
                    </p>
                    <div>${
                      news.source && news.source.name
                        ? news.source.name
                        : "No Source"
                    } * ${moment(news.publishedAt).fromNow()}</div>
                </div>
            </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

function toggleMenu() {
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu.style.left === "0px") {
    sideMenu.style.left = "-250px";
  } else {
    sideMenu.style.left = "0px";
  }
}

function toggleSearchIcon() {
  let searchBar = document.getElementById("searchBar");
  if (searchBar.style.display === "none" || searchBar.style.display === "") {
    searchBar.style.display = "block";
  } else {
    searchBar.style.display = "none";
  }
}

function cleanSearch() {
  let searchInput = document.getElementById("search-input");
  searchInput.value = "";
}
