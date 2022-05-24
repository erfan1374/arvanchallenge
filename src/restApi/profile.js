import apiBase from "./apiBase";

export default class Profile extends apiBase {
  constructor(store) {
    const path = "ClientDashboard";
    super(store, path);
  }

  GetRestaurantProfile(filter) {
    return this._request({
      action: "GetRestaurantProfile",
      method: "GET",
      params: filter,
    });
  }


}
