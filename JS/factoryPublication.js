
import {publicationSingle, publicationResumen} from "./post.js"

export class factoryPublication{
    chooseOptionPublication(type){
       if(type=="single"){
           return new publicationSingle();
   }
   if(type=="publication"){
                 return new publicationResumen();
   }
    }
}