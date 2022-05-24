import apiBase from "./apiBase";

export default class Category extends apiBase {
    constructor(store) {
        const path = "v1/Category";
        super(store, path);
    }

    list (filter, showProgress) {
        return this._request({
            action: "Get",
            method: "GET",
            params: filter,
            showProgress,
        });
    }
    GetCategoryWithFoodDrink (filter, showProgress) {
        return this._request({
            action: "GetCategoryWithFoodDrink",
            method: "GET",
            params: filter,
            showProgress,
        });
    }

    create(model, showProgress) {
        return this._request({
            action: "Create",
            method: "POST",
            body: model,
            showProgress,
        });
    }

    update(model, id,  showProgress) {
        return this._request({
            action: `Update/${id}`,
            method: "PUT",
            body: model,
            showProgress,
        });
    }

    updateAvailable(model, id,  showProgress) {
        return this._request({
            action: `UpdateAvailble/${id}`,
            method: "PUT",
            body: model,
            showProgress,
        });
    }

    delete(model, id, showProgress) {
        return this._request({
            action: `Delete/${id}`,
            method: "DELETE",
            body: model,
            showProgress,
        });
    }
}
