const imgInpt = document.getElementById("image");
const titleInpt = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const bodyInpt = document.getElementById("description");
const saveData = document.querySelector(".btn__accept");
const checkboxes = document.querySelectorAll(".checkbox");
const selectAuthor = document.getElementById("select__author");
let arrayTag = [];
let selectValueAuthor;

const cardObject = {
  id: "",
  image: "",
  title: "",
  subTitle: "",
  author: "",
  date: "",
  body: "",
  tags: "",
  likes: 0,
};

saveData.addEventListener("click", function() {
  const idCont = parseInt(localStorage.getItem("lastID"));
  checkboxes.forEach((e) => {
    if (e.checked == true) {
      arrayTag.push(parseInt(e.value));
    
    }
  });
  cardObject.tags = arrayTag;
  cardObject.title = titleInpt.value;
  cardObject.image = imgInpt.value;
  cardObject.subtitle = subtitle.value;
  cardObject.body = bodyInpt.value;
  cardObject.id = idCont+1;
  cardObject.date = date();
  cardObject.author = selectAuthor.value;
  const currentCards = JSON.parse(localStorage.getItem("newCard"));
  const totalNewCards = [...(currentCards ?? []), cardObject];
  const newId = Math.floor(Math.random() * 1000);
  
  localStorage.setItem("lastID", newId);
  localStorage.setItem("newCard", JSON.stringify(totalNewCards));
  location.reload();
});

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

