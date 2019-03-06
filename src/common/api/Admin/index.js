export default api => {
    return {

        // Login
        signinUser: data => {
            return api.post('user/login', data)
        },
        signinAdmin: data => {
            return api.post('user/login', data)
        },
        loginUser: data => {
          return api.post('user/login', data)
        },
        regUser: data => {
            return api.post('user/register')
        },
        notifications: data => {
            return api.get('invoice/received/list')
        },

        getRegions: data => {
            return api.get('region/list', data)
        },
        createDelivery: data => {
          return api.post('service/delivery/create', data)
        },
        tarifList: data => {
            return api.get('invoice/tariff/list', data)
        },
        methodList: data => {
            return api.get('invoice/package/method/list', data)
        },
        deleteInvoice: data => {
          return api.delete('invoice/delete/' + data.id)
        },
        updateInvoice: data => {
            return api.put('invoice/update/' + data.id, data)
        },
        updateStatus: data => {
          return api.put('invoice/update/status/'+data.id, data)
        },
        createInvoice: data => {
            return api.post('invoice/create', data)
        },
        invoiceList: data => {
            return api.get('invoice/list', data)
        },
        boxList: data => {
            return api.get('invoice/box/list', data)
        },
        scanList: data => {
          return api.get(`invoice/detail/${data.serial_code}`, data)
        },
        buyProduct: data => {
          return api.post('manage/order/bought', data)
        },
        searchList: data => {
          return api.get(`invoice/list?search=${data.search}`)
        },
        getStatus: data => {
          return api.get('manage/status')
        },

        logoutUser: data => {
            return api.post('logout', data)
        },
        // ---- EXTRA PAYMENT ---- //
        postCreateExtraPayment: data => {
            return api.post('manage/create/extra-payment', data);
        },

        // ---- PARCEL ---- //
        getParcelList: data => {
            return api.get(`manage/get/parcel/list?status=${data.status}`);
        },
        getParcelUpdate: data => {
            return api.get(`manage/parcel/${data.id}/update`);
        },
        putParcelUpdate: data => {
            return api.put(`manage/parcel/${data.id}/update`, data);
        },
        patchParcelUpdate: data => {
            return api.patch(`manage/parcel/${data.id}/update`, data);
        },

        // ---- ORDER PRODUCT ---- //
        getOrderProductList: data => {
            return api.get(`manage/get/order-product/list?status=${data.status}`);
        },
        getOrderProductUpdate: data => {
            return api.get(`manage/order/product/${data.id}/update`);
        },
        putOrderProductUpdate: data => {
            return api.put(`manage/order/product/${data.id}/update`, data);
        },
        patchOrderProductUpdate: data => {
            return api.patch(`manage/order/product/${data.id}/update`, data);
        },
        orderProductCancel: data => {
            return api.post('manage/order/product/cancel', data)
        }
    };
};
