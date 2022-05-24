import apiBase from "./apiBase";

export default class MenuType extends apiBase {
    constructor(store) {
        const path = "v1/MenuType";
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

    create(model, showProgress) {
        return this._request({
            action: "Create",
            method: "POST",
            body: model,
            showProgress,
        });
    }

    update(model, id, showProgress) {
        return this._request({
            action: `Update/${id}`,
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
