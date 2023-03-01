const JSON_URL = "https://uttermost-sulfuric-step.glitch.me/";
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

  async getPost(filterParams, method) {
    try {
      const request = await fetch(
        JSON_URL + method + "?_order=desc&_sort=likes&" + filterParams,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await request.json();
      if (data.length === 0) {
        btnAlert.classList.add("alert");
      } else {
        btnAlert.classList.remove("alert");
      }
      return data;
    } catch (error) {
      console.log(error);
      console("oh hubo un problema");
    }
  }

  async getDetails(filterParams, method) {
    try {
      const request = await fetch(JSON_URL + method + filterParams, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await request.json();
      return data;
    } catch (error) {
      console.log(error);
      console("oh hubo un problema");
    }
  }

  async postCard(postData, params) {
    try {
      console.log({ request: true });
      const response = await fetch(JSON_URL + params, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async patchPost(patchData, params, id) {
    try {
      const response = await fetch(JSON_URL + params + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async deletePost(params, id) {
    try {
      const response = await fetch(JSON_URL + params + id, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
