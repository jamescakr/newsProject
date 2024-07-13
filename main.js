const API_KEY = `d2bb588d15db43cabd709a13297a0071`;
let newsList = [];
let category = "";
let keyword = "";
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

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

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    console.log("dddata", data);

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No articles available");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );

  //과제제출용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${pageSize}&page=${page}${category}${keyword}`
  );

  await getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();

  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  // );

  //과제제출용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );

  await getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);

  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  // );

  //과제제출용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );

  await getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `
    <li class="page-item ${page === 1 ? "disabled" : ""}" ${
    page !== 1 ? `onclick="moveToPage(1)"` : ""
  }>
      <a class="page-link" href="#" aria-label="First">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item ${page === 1 ? "disabled" : ""}" ${
    page !== 1 ? `onclick="moveToPage(${page - 1})"` : ""
  }>
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&lsaquo;</span>
      </a>
    </li>
  `;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
      <li class="page-item ${
        i === page ? "active" : ""
      }" onclick="moveToPage(${i})">
        <a class="page-link" href="#">${i}</a>
      </li>
    `;
  }

  // 수정된 부분: 처음 및 마지막 페이지로 이동하는 버튼 추가
  paginationHTML += `
    <li class="page-item ${page === totalPages ? "disabled" : ""}" ${
    page !== totalPages ? `onclick="moveToPage(${page + 1})"` : ""
  }>
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&rsaquo;</span>
      </a>
    </li>
    <li class="page-item ${page === totalPages ? "disabled" : ""}" ${
    page !== totalPages ? `onclick="moveToPage(${totalPages})"` : ""
  }>
      <a class="page-link" href="#" aria-label="Last">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("movetopage", pageNum);
  page = pageNum;
  getNews();
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
