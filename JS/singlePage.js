import data from "./instance.js";
import { factoryPublication } from "./factoryPublication.js";

const id = new URLSearchParams(window.location.search).get('id');
let arraycomments= [];

document.addEventListener("DOMContentLoaded",()=>{
 makeContainerSinglePage()
})


const makeContainerSinglePage = async () => {
    try{
        const getDetails = await data.getDetails("?id="+id,"posts");
        const tags = await data.getDetails("","tags");
        const comments = await data.getDetails("","comments");
        const users = await data.getDetails("","users")
        const factoryGet = new factoryPublication();
        const domCreate = await factoryGet.chooseOptionPublication("publication");
        let arrayTags = [];
     /*   console.log(getDetails[0].tags);*/
         comments.forEach(e=>{
            if(e.postId == id){
                arraycomments.push(e);
            }
         })

        getDetails[0].tags.forEach(e=>{
            tags.forEach(element => {
                if(e==element.id){
                    arrayTags.push(element.name);
                }
         });
        })
      
      
        domCreate.createPublication(getDetails,arrayTags,arraycomments,users);
                 
    
    }catch(error){
        console.log(error);
    }
    

}


