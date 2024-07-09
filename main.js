// const API_KEY = `d2bb588d15db43cabd709a13297a0071`;
// const apiKey =
//   "http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines";

// let page = 2;
// let category = "";
// let keyword = "";
// let pageSize = 10;
// let news = [];

// const getLatestNews = async () => {
//   //   const url = new URL(
//   //     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//   //   );
//   const url = new URL(
//     `https://james-news-project.netlify.app/top-headlines?country=us&pageSize=${pageSize}&page=${page}${category}${keyword}`
//   );

//   //   const url = new URL(``);
//   const response = await fetch(url);
//   const data = await response.json();
//   news = data.articles;
//   console.log("dddd", news);
// };
// getLatestNews();

let news = [];
const pageSize = 10;
let page = 2;
let category = "";
let keyword = "";
const getLatestNews = async () => {
  const url = new URL(
    `https://james-news-project.netlify.app/top-headlines?country=us&pageSize=${pageSize}&page=${page}${category}${keyword}`
  );

  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("news=", news);
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
