import MenuType from "./menutype";
import Category from "./category";
import Profile from "./profile";
import PublicApi from "./public";
export default (store) => ({
  menuType: new MenuType(store),
  category: new Category(store),
  profile: new Profile(store),
  publicApi: new PublicApi(store),
})
