import fetchs from "./fetchs.js";
import { getData } from "./helper.js";
const btnAlertContainer = document.querySelector(".container__alert");
const JSON_URL = "http://localhost:3000/";
const btnAlert = document.querySelector(".btn__accept");
const urlDefaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Nintendo_Logo_2017.png/640px-Nintendo_Logo_2017.png";
const containerCards = document.querySelector(".container__cards");

const inptSearch = document.querySelector("#inpt__search");
document.addEventListener("DOMContentLoaded", () => {
  if ("filters" in localStorage) {
    const localStoragaData = getData();
    makeContainer();
  } else {
    console.log(JSON.stringify(filter));
    localStorage.setItem("filters", JSON.stringify(filter));
    makeContainer();
  }
});

const data = new fetchs(JSON_URL);

let filter = {
  search: "",
  number: "",
};

const makeContainer = async () => {
  const localStorageData = getData();
  console.log(localStorageData.search);
  const data2 = await data.getPost(localStorageData.search);

  data2.forEach((element) => {
    createCard(element);
  });
};

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  const tittle = document.createElement("h2");
  tittle.textContent = `${data.title}`;

  const image = document.createElement("img");
  if (data.image == undefined) {
    image.src = urlDefaultImg;
  } else {
    image.src = data.image;
  }

  card.appendChild(tittle);
  card.appendChild(image);
  containerCards.appendChild(card);
}
const debounce = (fn, delay) => {
  let timeoutID;
  return function (...args) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function UpdateFilters() {
  filter.search = "?q=" + inptSearch.value;
  filter.number = "";
}

function UpdateLocalStorage() {
  if ("filters" in localStorage) {
    localStorage.removeItem("filters");
    localStorage.setItem("filters", JSON.stringify(filter));
  } else {
    localStorage.setItem("filters", JSON.stringify(filter));
  }

  makeContainer();
}

inptSearch.addEventListener(
  "keyup",
  debounce((e) => {
    while (document.querySelector(".card") !== null) {
      if (document.querySelector(".card") !== null) {
        const card = document.querySelector(".card");
        containerCards.removeChild(card);
        continue;
      } else {
        break;
      }
    }
    UpdateFilters();
    UpdateLocalStorage();
  }, 1000)
);

btnAlert.addEventListener("click", () => {
  btnAlertContainer.classList.remove("alert");
  localStorage.removeItem("filters");
});
