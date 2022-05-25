import Users from "./users";
import Articles from "./articles";
import Tags from "./tags";
export default (store) => ({
  users: new Users(store),
  articles: new Articles(store),
  tags: new Tags(store),
})
