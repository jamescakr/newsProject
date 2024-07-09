const API_KEY = `d2bb588d15db43cabd709a13297a0071`;
let newsList = [];
let page = 2;
let category = "";
let keyword = "";
let pageSize = 10;

const getLatestNews = async () => {
  //   const url = new URL(
  //     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  //   );

  const url = new URL(
    `https://james-news-project.netlify.app/top-headlines?country=us&pageSize=${pageSize}&page=${page}${category}${keyword}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news-section">
                <div class="col-lg-4">
                    <img class="news-img-size"
                        src=${news.urlToImage} />
                </div>
                <div class="col-lg-8">
                    <h2>
                        ${news.title}
                    </h2>
                    <p>
                        ${news.description}
                    </p>
                    <div>${news.source.name} * ${news.publishedAt}</div>
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
