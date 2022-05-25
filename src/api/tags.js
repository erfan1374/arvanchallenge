import apiBase from "./apiBase";

export default class Tags extends apiBase {
  constructor(store) {
    const path = "tags";
    super(store, path);
  }

  getAll() {
    return this._request({
      method: "GET"
    });
  }
}
