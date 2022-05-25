import apiBase from "./apiBase";

export default class Articles extends apiBase {
  constructor(store) {
    const path = "articles";
    super(store, path);
  }

  getAll() {
    return this._request({
      method: "GET"
    });
  }

  getBySlug(slug) {
    return this._request({
      action: `${slug}`,
      method: "GET",
    });
  }

  create(body) {
    return this._request({
      method: "POST",
      body
    });
  }

  update(body, slug) {
    return this._request({
      action: `${slug}`,
      method: "PUT",
      body
    });
  }

  delete(slug) {
    return this._request({
      action: `${slug}`,
      method: "DELETE",
    });
  }
}
