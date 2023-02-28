const urlDefaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Nintendo_Logo_2017.png/640px-Nintendo_Logo_2017.png";
const containerCards = document.querySelector(".container__cards");
const containerComments = document.querySelector(
  ".container__comments--values"
);
const card = document.querySelector(".card");
const featureContainer = document.querySelector(".container__feature");
class publication {
  createPublication() {}
}

class singlePost extends publication {
  createPublication(data) {
    const card = document.createElement("div");
    card.classList.add("card");
    const contBtnTitle = document.createElement("div");
    contBtnTitle.classList.add("container__btn--title");
    const tittle = document.createElement("h2");
    tittle.textContent = `${data.title}`;
    const infoBtn = document.createElement("a");
    infoBtn.href = "../singlePage.html?id=" + `${data.id}`;
    const imgInf = document.createElement("img");
    imgInf.src = "https://cdn-icons-png.flaticon.com/512/8265/8265234.png";
    infoBtn.classList.add("btn__more--info");
    const image = document.createElement("img");

    if (data.image === "") {
      image.src = urlDefaultImg;
    } else {
      image.src = data.image;
    }
    infoBtn.appendChild(imgInf);
    contBtnTitle.appendChild(tittle);
    contBtnTitle.appendChild(infoBtn);
    card.appendChild(image);
    card.appendChild(contBtnTitle);
    containerCards.appendChild(card);
  }
  deletePublication() {}
}

class summaryPublication extends publication {
  createPublication(data, tag, comments, users) {
    const containerLeft = document.createElement("div");
    const containerRight = document.createElement("div");
    const containerImg = document.createElement("div");
    /*   div left     */
    const image = document.createElement("img");
    if (data.image == "") {
      image.src = urlDefaultImg;
    } else {
      image.src = data[0].image;
    }
    image.classList.add("img__circle");
    const tittle = document.createElement("h2");
    tittle.textContent = `${data[0].title}`;
    const ul = document.createElement("ul");

    tag.forEach((element) => {
      let li = document.createElement("li");
      let text = document.createTextNode(element);
      li.appendChild(text);
      ul.appendChild(li);
    });
    containerImg.appendChild(image);
    containerLeft.appendChild(containerImg);
    containerLeft.appendChild(tittle);
    containerLeft.appendChild(ul);

    /* div right */
    const subti = document.createElement("h2");
    subti.textContent = `${data[0].subTitle}`;
    const body = document.createElement("p");
    body.textContent = `${data[0].body}`;
    const author = document.createElement("h6");
    author.textContent = `${data[0].author}`;
    const date = document.createElement("h6");
    date.textContent = `${data[0].date}`;
    const btnLike = document.createElement("button");
    btnLike.classList.add("btn__like");
    /* const iconLike = document.createElement("img");*/
    /*iconLike.src = "https://cdn-icons-png.flaticon.com/512/2961/2961957.png";*/
    /* btnLike.appendChild(iconLike);*/

    containerRight.appendChild(subti);
    containerRight.appendChild(body);
    containerRight.appendChild(author);
    containerRight.appendChild(date);
    containerRight.appendChild(btnLike);
    /*    comments          */
    comments.forEach((e) => {
      let commentsValues = document.createElement("h6");
      commentsValues = document.createTextNode(e.comment);
      let userComments = document.createElement("h6");
      users.forEach((element) => {
        if (e.user == element.id) {
          userComments = document.createTextNode(
            element.name + " " + element.lastName
          );
        }
      });
      containerComments.appendChild(commentsValues);
      containerComments.appendChild(userComments);
    });

    card.classList.add("card");
    card.appendChild(containerLeft);
    card.appendChild(containerRight);
    containerCards.appendChild(card);
  }
}

class featuredPost {
  createPublication(data) {
    const card = document.createElement("div");
    card.classList.add("card__feature");
    const contBtnTitle = document.createElement("div");
    contBtnTitle.classList.add("container__btn--title");
    const tittle = document.createElement("h2");
    tittle.textContent = `${data.title}`;
    const infoBtn = document.createElement("a");
    infoBtn.href = "../singlePage.html?id=" + `${data.id}`;
    const imgInf = document.createElement("img");
    imgInf.src = "https://cdn-icons-png.flaticon.com/512/8265/8265234.png";
    infoBtn.classList.add("btn__more--feature");
    const image = document.createElement("img");

    if (data.image === "") {
      image.src = urlDefaultImg;
    } else {
      image.src = data.image;
    }
    infoBtn.appendChild(imgInf);
    contBtnTitle.appendChild(tittle);
    contBtnTitle.appendChild(infoBtn);
    card.appendChild(image);
    card.appendChild(contBtnTitle);
    featureContainer.appendChild(card);
  }
}

export { singlePost, summaryPublication, featuredPost };
