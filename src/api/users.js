import apiBase from "./apiBase";

export default class Users extends apiBase {
  constructor(store) {
    const path = "users";
    super(store, path);
  }

  login(body) {
    return this._request({
      action: "login",
      method: "POST",
      body
    });
  }

  register(body) {
    return this._request({
      method: "POST",
      body
    });
  }
}
