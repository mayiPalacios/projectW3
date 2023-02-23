const { response } = require("express");

const JSON_URL = 'http://localhost:3000';

class fetch {

  constructor(url){
    this.url = url;
  }

 async getData(){
    try{
        const response = await fetch(`${JSON_URL}${this.url}`);
        const data = await response.json();
        return data;
    }catch(error){
        throw new Error(`${error.message}`);
    }
 };


  async getPost(){
   const request = await fetch(`${JSON_URL}${this.url}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:
   });
   const data = await response.json();




  }


}