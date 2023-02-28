import data from "./instance.js";
import { factoryPublication } from "./factoryPublication.js";
const inptComment = document.querySelector(".inpt__comment");
const btnComment = document.querySelector(".btn__comment");
const alertAcceptBtn = document.querySelector(".btn__accept");
const alertCancelBtn = document.querySelector(".btn__cancel");
const editCancelBtn = document.querySelector("#btn__cancel--edit");
const editAcceptBtn = document.querySelector("#btn__accept--edit");
const btnTrash = document.querySelector(".btn__trash");
const btnEdit = document.querySelector(".btn__edit");
const containerAlert = document.querySelector(".container__alert");
const containerEdit = document.querySelector(".container__edit");
const btnlike = document.querySelector(".btn__like");
const iconHeart = document.querySelector("#icon__heart");
const userComment = document.querySelector("#select__user--comment");
const id = new URLSearchParams(window.location.search).get("id");
/* form edit post */
const imgInpt = document.getElementById("image");
const titleInpt = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const bodyInpt = document.getElementById("description");
const saveData = document.querySelector(".btn__accept");
const checkboxes = document.querySelectorAll(".checkbox");
const selectAuthor = document.getElementById("select__author");

let arraycomments = [];
let arrayTag = [];

const newComment = {
  id: null,
  comment: "",
  postId: null,
  user: null,
};

const patchPost = {
  image: "",
  title: "",
  subTitle: "",
  author: "",
  date: "",
  body: "",
  tags: "",
  likes: 0,
};

const newLikeObject = {
  likes: null,
};

document.addEventListener("DOMContentLoaded", () => {
  makeContainerSinglePage();
});

const makeContainerSinglePage = async () => {
  try {
    const getDetails = await data.getDetails("?id=" + id, "posts");
    const tags = await data.getDetails("", "tags");
    const comments = await data.getDetails("", "comments");
    const users = await data.getDetails("", "users");
    const factoryGet = new factoryPublication();
    const domCreate = await factoryGet.chooseOptionPublication("publication");
    let arrayTags = [];
    /*   console.log(getDetails[0].tags);*/
    comments.forEach((e) => {
      if (e.postId == id) {
        arraycomments.push(e);
      }
    });

    getDetails[0].tags.forEach((e) => {
      tags.forEach((element) => {
        if (e == element.id) {
          arrayTags.push(element.name);
        }
      });
    });

    domCreate.createPublication(getDetails, arrayTags, arraycomments, users);
  } catch (error) {
    console.log(error);
  }
};

btnComment.addEventListener("click", () => {
  newComment.comment = inptComment.value;
  newComment.postId = id;
  newComment.user = parseInt(userComment.value);
  newComment.id = Math.floor(Math.random() * 1000);
  data.postCard(newComment, "comments");
});

btnlike.addEventListener("click", () => {
  iconHeart.setAttribute(
    "src",
    "https://cdn-icons-png.flaticon.com/512/833/833472.png"
  );
  setTimeout(() => {
    iconHeart.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/833/833300.png"
    );
  }, "1000");
  addLikes();
});

const addLikes = async () => {
  const numberLikeApi = await data.getDetails("?id=" + id, "posts");
  console.log(numberLikeApi[0].likes);
  const counterLikes = numberLikeApi[0].likes + 1;
  newLikeObject.likes = counterLikes;
  data.patchPost(newLikeObject, "posts/", id);
};

btnTrash.addEventListener("click", () => {
  containerAlert.classList.add("container__alert--active");
});

alertCancelBtn.addEventListener("click", () => {
  containerAlert.classList.remove("container__alert--active");
});

alertAcceptBtn.addEventListener("click", () => {
  containerAlert.classList.remove("container__alert--active");
  removePost();
  setTimeout(() => (location.href = "./index.html"), 100);
});

const removePost = async () => {
  data.deletePost("posts/", id);
};

btnEdit.addEventListener("click", () => {
  containerEdit.classList.add("container__alert--active");
});

editCancelBtn.addEventListener("click", () => {
  containerEdit.classList.remove("container__alert--active");
});

editAcceptBtn.addEventListener("click", () => {
  editPatchFunction();
});

const editPatchFunction = async () => {
  checkboxes.forEach((e) => {
    if (e.checked == true) {
      arrayTag.push(parseInt(e.value));
    }
  });
  patchPost.image = imgInpt.value;
  patchPost.title = titleInpt.value;
  patchPost.subTitle = subtitle.value;
  patchPost.author = selectAuthor.value;
  patchPost.date = date();
  patchPost.body = bodyInpt.value;
  patchPost.tags = arrayTag;
  data.patchPost(patchPost, "posts/", id);
};

function date() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hora = date.getHours();
  let minuto = date.getMinutes();

  let uDates = day + "-" + month + "-" + year + "-" + hora + "-" + minuto;

  return uDates;
}
