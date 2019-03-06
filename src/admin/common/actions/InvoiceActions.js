import {ADD_INVOICE_LIST, INVOICE_LIST} from "../const";


export  const getInvoiceList = (invoices) => {
    return {
        type: INVOICE_LIST,
        payload: invoices
    }
};


export  const addInvoiceList = (invoices) => {
    return {
        type: ADD_INVOICE_LIST,
        payload: invoices
    }
};
