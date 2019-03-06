// ---- EXTRA PAYMENT ---- //
import postCreateExtraPayment from './ExtraPayment/postCreateExtraPayment'
// ---- PARCEL ---- //
import getParcelList from './Parcel/getParcelList'
import getParcelUpdate from './Parcel/getParcelUpdate'
import putParcelUpdate from './Parcel/putParcelUpdate'
import patchParcelUpdate from './Parcel/patchParcelUpdate'
// ---- ORDER PRODUCT ---- //
import getOrderProductList from './OrderProduct/getOrderProductList'
import getOrderProductUpdate from './OrderProduct/getOrderProductUpdate'
import putOrderProductUpdate from './OrderProduct/putOrderProductUpdate'
import patchOrderProductUpdate from './OrderProduct/patchOrderProductUpdate'
import orderProductCancel from "./OrderProduct/orderProductCancel";
import signinUser from './signinUser'
import logoutUser from "./logoutUser";
import getStatus from "./getStatus";
import buyProduct from "./ExtraPayment/buyProduct";
import loginUser from "./loginUser";
import getRegions from "./getRegions";
import createDelivery from "./createDelivery";
import scanList from "./scanList";
import tarifList from "./tarifList";
import methodList from "./methodList";
import createInvoice from "./createInvoice";
import boxList from "./boxList";
import invoiceList from "./invoiceList";
import searchList from "./searchList";
import deleteInvoice from "./deleteInvoice";
import updateInvoice from "./updateInvoice";
import updateStatus from "./updateStatus";
import signinAdmin from "./signinAdmin";
import notifications from "./notifications";

export default function sagas(api) {
    return [
        // ---- EXTRA PAYMENT ---- //
        postCreateExtraPayment(api),

        // ---- PARCEL ---- //
        getParcelList(api),
        getParcelUpdate(api),
        putParcelUpdate(api),
        patchParcelUpdate(api),

        // ---- ORDER PRODUCT ---- //
        getOrderProductList(api),
        getOrderProductUpdate(api),
        putOrderProductUpdate(api),
        patchOrderProductUpdate(api),
        orderProductCancel(api),

        signinUser(api),
        signinAdmin(api),
        logoutUser(api),

        getStatus(api),
        buyProduct(api),

        loginUser(api),

        getRegions(api),
        createDelivery(api),
        scanList(api),
        tarifList(api),
        methodList(api),
        createInvoice(api),
        boxList(api),
        invoiceList(api),
        searchList(api),
        deleteInvoice(api),
        updateInvoice(api),
        updateStatus(api),
        notifications(api),

    ]
}
