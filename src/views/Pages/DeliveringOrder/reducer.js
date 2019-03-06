import {Routines} from 'common/api';
// import history from './history'
export const showRow = (data) => {
    return {
        type: 'SHOW_ROW',
        data
    }
}
const initialState = {
    invoice_list: [],
    row: {},
    products: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case Routines.admin.invoiceList.SUCCESS:
            return {
                ...state,
                invoice_list: action.payload.response.results
            }
        case 'SHOW_ROW':
            const {
                to_be_paid,
                payment_method,
                package_list
            } = action.data
            let cash = false, card = false, transfer = false
            if (payment_method === 'Cash') {
                cash = true
                card = false
                transfer = false

            } else if (payment_method === 'Card') {
                card = true
                cash = false
                transfer = false
            } else if (payment_method === 'Transfer') {
                transfer = true
                cash = false
                card = false
            }
            let sender = false, receiver = false
            if (to_be_paid === 'Sender') {
                sender = true
                receiver = false
            } else if (to_be_paid === 'Receiver') {
                sender = false
                receiver = true
            }
            return {
                ...state,
                row: {
                    ...action.data,
                    payment_card: card,
                    payment_cash: cash,
                    payment_transfer: transfer,
                    to_be_paid_sender: sender,
                    to_be_paid_receiver: receiver,
                },
                products: package_list
            }
    }
    return state;
};
