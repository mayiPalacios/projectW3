import data from "./instance.js";
import { getData, getNewCard } from "./helper.js";
import { factoryPublication } from "./factoryPublication.js";
const btnAlertContainer = document.querySelector(".container__alert");
const btnAlert = document.querySelector(".btn__accept");
const urlDefaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Nintendo_Logo_2017.png/640px-Nintendo_Logo_2017.png";
const containerCards = document.querySelector(".container__cards");

const inptSearch = document.querySelector("#inpt__search");
document.addEventListener("DOMContentLoaded", () => {
  if ("filters" in localStorage) {
    const localStoragaData = getData();
    console.log({ localStoragaData });
    makeContainer();
  } else {
    localStorage.setItem("filters", JSON.stringify(filter));
    makeContainer();
  }

  if ("newCard" in localStorage) {
    const localStoreNewData = getNewCard();
    console.log({ localStoreNewData });
    localStoreNewData?.map((request) => {
      console.log({ request });
      data.postCard(request, "posts");
    });
    localStorage.removeItem("newCard");
  }
});

const factoryPost = new factoryPublication();
let filter = {
  search: "",
  number: "",
};

let elementStart, limitElement;

async function getLengthAPI() {
  const apiLenght = await data.getPost("", "posts");
  return apiLenght;
}

const createFeature = async () => {
  elementStart = getLengthAPI() - 3;
  limitElement = 3;
  const apiFeature = await data.getDetails(
    `_start=${elementStart}&_limit=${limitElement}`,
    "posts"
  );

  /*  
    const apiLimits = data.getDetails(`_=start=${}&_limit=${}`);*/
};

const makeContainer = async () => {
  const localStorageData = getData();
  const dataCopy = await data.getPost(localStorageData.search, "posts");
  const indexPublication = await factoryPost.chooseOptionPublication("single");
  dataCopy.forEach((element) => {
    indexPublication.createPublication(element);

    /* createCard(element);*/
  });
  /* localStorage.setItem("lastID",data2[data2.length -1].posts.id);*/
  localStorage.setItem("lastID", Math.floor(Math.random() * 1000));
};

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
  filter.search = "q=" + inptSearch.value;
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
