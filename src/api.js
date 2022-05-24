import axios from "axios";
import {baseUrl} from "./config";
import {clientDashboard} from "./config";
const headers = {
    'Accept': 'application/json,text/plain',
    'Content-Type': 'application/json;charset=UTF-8'
}
export const DecryptBillPayUrl = (q) => {
    return axios({
        url: baseUrl + '/Diner/DecryptBillPayUrl?q=' + q,
        method: 'get',
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in decrypt')
    })
}
export const GetOrderReceipt = (params) => {
    return axios({
        url: baseUrl + '/Diner/GetOrderReceipt',
        method: 'get',
        params,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in order reciept')
    })
}

export const UpdateOrderTip = (model) => {
    return axios({
        url: baseUrl + '/Diner/UpdateOrderTip',
        method: 'post',
        data: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })
}
export const UpdateOrderPickupTime = (model) => {
    return axios({
        url: baseUrl + '/Diner/UpdateOrderPickupTime',
        method: 'post',
        data: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update date')
    })
}
export const AddPaymentMethod = (model) => {
    return axios({
        url: baseUrl + `${clientDashboard}/AddPaymentMethod`,
        method: 'post',
        data: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })
}
export const PayOrder = (model) => {
    return axios({
        url: baseUrl + `${clientDashboard}/PayOrder`,
        method: 'post',
        data: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })
}
export const UpdateTransaction = (model) => {
    return axios({
        url: baseUrl + `${clientDashboard}/UpdateTransaction`,
        method: 'post',
        data: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })
}
export const SendEmailReceipt = (model) => {
    return axios({
        url: baseUrl + `${clientDashboard}/SendEmailReceipt`,
        method: 'post',
        data: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })
}
export const getAllPickUpTime = (RestaurantID) => {
    const params = {
        UserID: -292,
        RestaurantID
    }
    return axios({
        url: baseUrl + `${clientDashboard}/GetPickupTimes`,
        method: 'get',
        params,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in pick up times')
    })
}
export const getAllDeliveryTime = (RestaurantID) => {
    const params = {
        UserID: -292,
        RestaurantID
    }
    return axios({
        url: baseUrl + `${clientDashboard}/GetDeliveryTimes`,
        method: 'get',
        params,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in pick up times')
    })
}
export const GetPickupDateByMenu = (RestaurantID, MenuTypeID) => {
    const params = {
        UserID: -292,
        RestaurantID,
        ItemType: 'Food',
        MenuTypeID
    }
    return axios({
        url: baseUrl + `${clientDashboard}/GetPickupDateByMenu`,
        method: 'get',
        params,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in pick up times')
    })
}
export const GetPickupTimes_Event = (RestaurantID, MenuTypeID, SelectedDate) => {
    const params = {
        UserID: -292,
        RestaurantID,
        ItemType: 'Food',
        MenuTypeID,
        SelectedDate
    }
    return axios({
        url: baseUrl + `${clientDashboard}/GetPickupTimes_Event`,
        method: 'get',
        params,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in pick up times')
    })
}

export const GetRestaurantAllowance = (model) => {
    return axios({
        url: baseUrl + `${clientDashboard}/GetRestaurantAllowance`,
        method: 'GET',
        params: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })

}
export const GetRestaurantPreparationTime = (model) => {
    return axios({
        url: baseUrl + `${clientDashboard}/GetRestaurantPreparationTime`,
        method: 'GET',
        params: model,
        headers
    }).then(res => {
        return res
    }).catch(() => {
        return Promise.reject('error in update tip')
    })

}
