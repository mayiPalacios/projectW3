import data from "./instance.js";
import { getData, getNewCard } from "./helper.js";
import { factoryPublication } from "./factoryPublication.js";
const btnAlertContainer = document.querySelector(".container__alert");
const selectTags = document.querySelector("#select__tags");
const btnAlert = document.querySelector(".btn__accept");
const urlDefaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Nintendo_Logo_2017.png/640px-Nintendo_Logo_2017.png";
const containerCards = document.querySelector(".container__cards");

const inptSearch = document.querySelector("#inpt__search");
document.addEventListener("DOMContentLoaded", () => {
  if ("newCard" in localStorage) {
    const localStoreNewData = getNewCard();
    console.log({ localStoreNewData });
    localStoreNewData?.map((request) => {
      console.log({ request });
      data.postCard(request, "posts");
    });
    localStorage.removeItem("newCard");
  }
  regularSection();
  createFeature();
});

const factoryPost = new factoryPublication();
let filter = {
  search: "",
};

let elementStart, limitElement;

const createFeature = async () => {
  const apiLenght = await data.getPost("", "posts");
  elementStart = apiLenght.length - 3;
  limitElement = 3;
  console.log(elementStart);

  const featureFactory = await factoryPost.chooseOptionPublication("feature");
  const apiFeature = await data.getDetails(
    `_start=${elementStart}&_limit=${limitElement}`,
    "posts?"
  );
  elementStart = 0;
  const lastApiFeature = await data.getDetails(
    `_start=${elementStart}&_limit=${limitElement}`,
    "posts?"
  );
  lastApiFeature.forEach((element) => {
    featureFactory.createPublication(element);
  });
  apiFeature.forEach((e) => {
    featureFactory.createPublication(e);
  });
};

const regularSection = async () => {
  const apiLenght = await data.getPost("", "posts");
  elementStart = 0;
  limitElement = apiLenght.length - 3;

  const featureFactory = await factoryPost.chooseOptionPublication("single");
  const apiFeature = await data.getDetails(
    `_start=${elementStart}&_limit=${limitElement}`,
    "posts?"
  );
  apiFeature.forEach((element) => {
    featureFactory.createPublication(element);
  });
};

const makeContainer = async () => {
  const localStorageData = getData();
  console.log(typeof localStorageData.search);
  const dataCopy = await data.getPost(localStorageData.search, "posts");
  const indexPublication = await factoryPost.chooseOptionPublication("single");
  dataCopy.forEach((element) => {
    indexPublication.createPublication(element);
  });

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
    filter.search = "q=" + inptSearch.value;
    localStorage.setItem("filters", JSON.stringify(filter));
    makeContainer();
  }, 1000)
);

btnAlert.addEventListener("click", () => {
  btnAlertContainer.classList.remove("alert");
  localStorage.removeItem("filters");
});

selectTags.addEventListener("change", () => {
  while (document.querySelector(".card") !== null) {
    if (document.querySelector(".card") !== null) {
      const card = document.querySelector(".card");
      containerCards.removeChild(card);
      continue;
    } else {
      break;
    }
  }
  filterTag();
});

const filterTag = async () => {
  const postTags = await data.getDetails("", "posts");
  const tagsFactory = await factoryPost.chooseOptionPublication("single");

  postTags.forEach((e) => {
    e.tags.forEach((tag) => {
      if (tag == selectTags.value) {
        tagsFactory.createPublication(e);
      }
    });
  });
};
