const API_KEY = `d2bb588d15db43cabd709a13297a0071`;
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://james-news-project.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("dddd", news);
};
getLatestNews();
