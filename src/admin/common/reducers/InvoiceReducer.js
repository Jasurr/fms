import {ADD_INVOICE_LIST, INVOICE_LIST} from "../const";

const INITIAL_STATE = {
    invoiceList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVOICE_LIST:
            return {
                ...state,
                invoiceList: action.payload
            };
        case ADD_INVOICE_LIST:
            return {
                ...state,
                invoiceList: [...state.invoiceList, ...action.payload]
            };
        default:
            return state;
    }
}
