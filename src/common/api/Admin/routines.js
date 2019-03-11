import {createRoutine} from 'redux-saga-routines'

export default {

    // ---- EXTRA PAYMENT ---- //
    postCreateExtraPayment: createRoutine('POST_CREATE_EXTRA_PAYMENT'),

    // ---- PARCEL ---- //
    getParcelList: createRoutine('GET_PARCEL_LIST'),
    getParcelUpdate: createRoutine('GET_PARCEL_UPDATE'),
    putParcelUpdate: createRoutine('PUT_PARCEL_UPDATE'),
    patchParcelUpdate: createRoutine('PATCH_PARCEL_UPDATE'),

    // ---- ORDER PRODUCT ---- //
    getOrderProductList: createRoutine('GET_ORDER_PRODUCT_LIST'),
    getOrderProductUpdate: createRoutine('GET_ORDER_PRODUCT_UPDATE'),
    putOrderProductUpdate: createRoutine('PUT_ORDER_PRODUCT_UPDATE'),
    patchOrderProductUpdate: createRoutine('PATCH_ORDER_PRODUCT_UPDATE'),

    orderProductCancel: createRoutine('PRODUCT_ORDER_CANCEL'),
    signinUser: createRoutine('SIGN_IN_USER'),
    signinAdmin: createRoutine('SIGN_IN_ADMIN'),
    loginUser: createRoutine('LOGIN_USER'),
    logoutUser: createRoutine('LOG_OUT_USER', undefined, false),

    getStatus: createRoutine('GET_ALL_STATUS'),
    buyProduct: createRoutine('BUY_PRODUCT'),

    getRegions: createRoutine('GET_REGIONS'),
    createDelivery: createRoutine('CREATE_DELIVERY'),
    scanList: createRoutine('SCAN_LIST'),
    tarifList: createRoutine('TARIF_LIST'),
    methodList: createRoutine('METHOD_LIST'),
    createInvoice: createRoutine('CREATE_INVOICE'),
    boxList: createRoutine('BOX_LIST'),
    invoiceList: createRoutine('INVOICE_LIST'),
    searchList: createRoutine('SEARCH_LIST'),
    deleteInvoice: createRoutine('DELETE_INVOICE'),
    updateInvoice: createRoutine('UPDATE_INVOICE'),
    updateStatus: createRoutine('UPDATE_STATUS'),
    notifications: createRoutine('NOTIFICATIONS'),
    calculate: createRoutine('CALCULATE'),
}
