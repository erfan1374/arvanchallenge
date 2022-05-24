import Users from "./users";
export default (store) => ({
  users: new Users(store)
})
