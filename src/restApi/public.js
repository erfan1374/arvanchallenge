import apiBase from "./apiBase";

export default class PublicApi extends apiBase {
  constructor(store) {
    const path = "PublicClient";
    super(store, path);
  }

  GetRestaurantInfo(filter) {
    return this._request({
      action: "GetRestaurantInfo",
      method: "GET",
      params: filter,
    });
  }

  GetRestaurantRestauranteurID(filter) {
    return this._request({
      action: "GetRestaurantRestauranteurID",
      method: "GET",
      params: filter,
    });
  }
}
