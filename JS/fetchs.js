const JSON_URL = "http://localhost:3000/";
const btnAlert = document.querySelector(".container__alert");

export default class fetchs {
  constructor(url) {
    if (fetchs.instance) {
      console.log("creada");
      return fetchs.instance;
    }
    this.url = url;
    fetchs.instance = this;
  }

  async getPost(filterParams) {
    try {
      const request = await fetch(JSON_URL + "posts" + filterParams, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await request.json();
      if (data.length === 0) {
        btnAlert.classList.add("alert");
      } else {
        btnAlert.classList.remove("alert");
      }
      console.log(typeof data);
      return data;
    } catch (error) {
      console.log(error);
      console("oh hubo un problema");
    }
  }

  async postCard(postData, url) {
    try {
      const response = await fetch(`${JSON_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
