import { singlePost, summaryPublication, featuredPost } from "./post.js";

export class factoryPublication {
  chooseOptionPublication(type) {
    if (type == "single") {
      return new singlePost();
    }
    if (type == "publication") {
      return new summaryPublication();
    }
    if (type == "feature") {
      return new featuredPost();
    }
  }
}
