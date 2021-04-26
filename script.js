class ApiData {
  API_KEY = "aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL = "https://api.nytimes.com/svc/topstories/v2/";
  URL_HOME =
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_WORLD =
    "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_POLITICS =
    "https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_MAGAZINE =
    "https://api.nytimes.com/svc/topstories/v2/magazine.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_TECHNOLOGY =
    "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_SCIENCE =
    "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_HEALTH =
    "https://api.nytimes.com/svc/topstories/v2/health.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_SPORTS =
    "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_ARTS =
    "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_FASHION =
    "https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_FOOD =
    "https://api.nytimes.com/svc/topstories/v2/food.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
  URL_TRAVEL =
    "https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=aDHarsTnYflL70yqlU9oF43cJGxmupZo";
}

let apiData = new ApiData();
let prevSection = "";
let prevBtn = "";

// Fetch data using fetch api based on the category parameter
async function fetchSectionData(category) {
  try {
    const url = `${apiData.URL}${category}.json?api-key=${apiData.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function fetchData(section) {
  if (prevSection !== "") {
    document.getElementById(prevSection).classList.add("hidden");
  }

  document.getElementById(section).classList.remove("hidden");
  //fetch data using fetch api
  document.getElementById("loadingIndicator").classList.remove("hidden");
  const data = await fetchSectionData(section);
  document.getElementById("loadingIndicator").classList.add("hidden");
  // populate container home with this data
  populateSection(data, section + "Column");
  prevSection = section;
}

function populateSection(data, columnId) {
  const section = data.section || "";
  data.results.forEach((article) => {
    const div = createCard(article, section);
    document.getElementById(columnId).append(div);
  });
}

function createCard(article, section) {
  let imageUrl = "";
  if (article.multimedia) {
    imageUrl = article.multimedia[0].url;
  }
  const card = createDomElement("div", "card mt-3");
  const cardRow = createDomElement("div", "row");
  const column1 = createDomElement("div", "col-md-8 col-12");
  const cardBody = createDomElement("div", "card-body");
  const sectionTitle = createDomElement("h4", "card-title text-uppercase");
  sectionTitle.innerHTML = `${section}`;
  const articleTitle = createDomElement("h6", "card-title text-capitalize");
  articleTitle.innerHTML = `${article.title}`;
  const articlePublishedDate = createDomElement("h6", "card-title");
  articlePublishedDate.innerHTML = `${formatDate(article.published_date)}`;
  const articleAbstract = createDomElement("p", "card-text");
  articleAbstract.innerHTML = `${article.abstract}`;
  const articleLink = createDomElement("a", "text-primary");
  articleLink.innerHTML = `Continue Reading`;
  articleLink.setAttribute("href", `${article.url}`);
  articleLink.setAttribute("target", "_blank");
  cardBody.append(
    sectionTitle,
    articleTitle,
    articlePublishedDate,
    articleAbstract,
    articleLink
  );
  column1.append(cardBody);

  const column2 = createDomElement("div", "col-md-4 col-12");
  const image = createDomElement("img", "img-thumbnail");
  image.setAttribute("src", `${imageUrl}`);
  image.setAttribute("alt", "image not found");
  column2.append(image);
  cardRow.append(column1, column2);
  card.append(cardRow);
  return card;
}

function createDomElement(element, elementClass = "", elementId = "") {
  const newElement = document.createElement(element);
  elementClass !== "" ? newElement.setAttribute("class", elementClass) : "";
  elementId !== "" ? newElement.setAttribute("id", elementId) : "";
  return newElement;
}

function generateLoadingIndicator() {
  const container = createDomElement("div", "container mt-2");
  const row = createDomElement("div", "row");
  const column = createDomElement("div", "col-12 order-lg-12 text-center");
  const div = createDomElement("div", "loading", "loadingIndicator");
  const img = createDomElement("img", "img-fluid");
  img.setAttribute("src", "./images/loading.gif");
  img.setAttribute("alt", "loading");
  div.append(img);
  column.append(div);
  row.append(column);
  container.append(row);
  document.body.append(container);
}

function formattedDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  const monthName = monthNames[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();
  return `${dayName}, ${monthName}, ${date}, ${year}`;
}

function generatePageHeader() {
  const pageHeaderContainer = createDomElement("div", "container mt-2");
  const pageHeaderRow = createDomElement("div", "row");
  const pageHeaderColumn1 = createDomElement(
    "div",
    "col-12 col-lg-2 text-center font-weight-bold dateClass"
  );
  const dateP = createDomElement("p");
  dateP.innerHTML = formattedDate();
  pageHeaderColumn1.append(dateP);
  const pageHeaderColumn2 = createDomElement(
    "div",
    "col-12 col-lg-8 text-center"
  );
  const pageTitle = createDomElement("p", "pageTitle");
  pageTitle.innerHTML = "The New York Times";
  pageHeaderColumn2.append(pageTitle);
  pageHeaderRow.append(pageHeaderColumn1, pageHeaderColumn2);
  pageHeaderContainer.append(pageHeaderRow);
  document.body.append(pageHeaderContainer);
}

function createLink(section) {
  const li = createDomElement("li", "nav-item");
  const a = createDomElement("a", "nav-link text-uppercase", `${section}Btn`);
  a.text = section;
  li.append(a);
  return li;
}

function generateNav() {
  const navContainer = createDomElement("div", "container");
  const navRow = createDomElement("div", "row");
  const navColumn = createDomElement("div", "col-12");
  const nav = createDomElement(
    "nav",
    "navbar navbar-expand-lg navbar-light bg-light"
  );
  const navButton = createDomElement("button", "navbar-toggler");
  navButton.setAttribute("type", "button");
  navButton.setAttribute("data-toggle", "collapse");
  navButton.setAttribute("data-target", "#navbarNav");
  navButton.setAttribute("aria-controls", "navbarNav");
  navButton.setAttribute("aria-expanded", "false");
  navButton.setAttribute("aria-label", "Toggle navigation");
  const span = createDomElement("span", "navbar-toggler-icon");
  navButton.append(span);
  //<a class="navbar-brand" href="#">Navbar</a>

  const navBrand = createDomElement("a", "navbar-brand navBrandClass");
  navBrand.text = "The New York Times";

  const navLinksDiv = createDomElement(
    "div",
    "collapse navbar-collapse",
    "navbarNav"
  );
  const navLinksUl = createDomElement("ul", "navbar-nav");
  const liHome = createLink("home");
  const liWorld = createLink("world");
  const liPolitics = createLink("politics");
  const liMagazine = createLink("magazine");
  const liTechnology = createLink("technology");
  const liScience = createLink("science");
  const liHealth = createLink("health");
  const liSports = createLink("sports");
  const liArts = createLink("arts");
  const liFashion = createLink("fashion");
  const liFood = createLink("food");
  const liTravel = createLink("travel");
  navLinksUl.append(
    liHome,
    liWorld,
    liPolitics,
    liMagazine,
    liTechnology,
    liScience,
    liHealth,
    liSports,
    liArts,
    liFashion,
    liFood,
    liTravel
  );
  navLinksDiv.append(navLinksUl);
  nav.append(navButton);
  nav.append(navBrand);
  nav.append(navLinksDiv);

  navColumn.append(nav);
  navRow.append(navColumn);
  navContainer.append(navRow);
  document.body.append(navContainer);
}

function createContainer(section) {
  const div = createDomElement("div", "container hidden", section);
  const row = createDomElement("div", "row");
  const column = createDomElement("div", "col-12", `${section}Column`);
  row.append(column);
  div.append(column);
  return div;
}

function generateSections() {
  const homeContainer = createContainer("home");
  const worldContainer = createContainer("world");
  const politicsContainer = createContainer("politics");
  const magazineContainer = createContainer("magazine");
  const technologyContainer = createContainer("technology");
  const scienceContainer = createContainer("science");
  const healthContainer = createContainer("health");
  const sportsContainer = createContainer("sports");
  const artsContainer = createContainer("arts");
  const fashionContainer = createContainer("fashion");
  const foodContainer = createContainer("food");
  const travelContainer = createContainer("travel");
  document.body.append(
    homeContainer,
    worldContainer,
    politicsContainer,
    magazineContainer,
    technologyContainer,
    scienceContainer,
    healthContainer,
    sportsContainer,
    artsContainer,
    fashionContainer,
    foodContainer,
    travelContainer
  );
}

function generateHtmlBody() {
  generatePageHeader();
  generateNav();
  generateLoadingIndicator();
  generateSections();
  fetchData("home");
  document.getElementById("homeBtn").classList.add("active");
  prevBtn = "homeBtn";
}

generateHtmlBody();

function formatDate(publishedDate) {
  const _date = new Date(publishedDate);
  const month = _date.toLocaleDateString("default", {
    month: "long",
  });
  const day = _date.getDay();
  return month + " " + day;
}

function delay(timer) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, timer);
  });
}

const links = document.querySelectorAll('a[id*="Btn"]');

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (prevBtn !== "") {
      document.getElementById(prevBtn).classList.remove("active");
    }
    const anchor = event.target;
    anchor.classList.add("active");
    fetchData(anchor.text);
    prevBtn = `${anchor.text}Btn`;
  });
});

window.addEventListener("click", function (event) {
  const btn = document.querySelector(".navbar-toggler");
  const ariaExpanded = btn.getAttribute("aria-expanded") === "true";
  if (ariaExpanded) {
    btn.click();
  }
});
