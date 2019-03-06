import {Routines} from 'common/api';

const initialState = {
    regions: [],
    invoce_list: {},
    processing: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Routines.admin.getRegions.REQUEST:
        case Routines.admin.scanList.REQUEST:
            return {
                ...state,
                processing: true
            }
        case Routines.admin.getRegions.FULFILL:
        case Routines.admin.scanList.FULFILL:
            return {
                processing: false
            }
        case  Routines.admin.getRegions.SUCCESS:
            return {
                ...state,
                regions: action.payload.response
            }
        case Routines.admin.scanList.SUCCESS:
            const {INN, tariff, region, serial_code, box, sender_client_info,
                receiver_client_info, package_info, to_be_delivered,
                to_be_picked, to_be_paid, addition, payment_method, paid,
                delivery, status, total_price, final_price, created, width, height, length
            } = action.payload.response
            let cash = false, card = false, transfer = false
            if (payment_method === 'Cash') {
                cash = true
                card = false
                transfer = false

            } else if (payment_method === 'Card') {
                card = true
                cash = false
                transfer = false
            } else if ( payment_method === 'Transfer') {
                transfer = true
                cash = false
                card = false
            }
            let sender = false, receiver = false
            if (to_be_paid  === 'Sender') {
                sender = true
                receiver = false
            } else if (to_be_paid === 'Receiver') {
                sender = false
                receiver = true
            }

            return {
                ...state,
                invoce_list: {
                    INN,
                    region,
                    tariff,
                    serial_code,
                    box,
                    sender_client: sender_client_info[0],
                    receiver_client: receiver_client_info[0],
                    package: package_info[0],
                    to_be_picked,
                    paid,
                    delivery,
                    status,
                    total_price,
                    final_price,
                    created,
                    payment_card: card,
                    payment_cash: cash,
                    payment_transfer: transfer,
                    to_be_paid_sender: sender,
                    to_be_delivered: receiver,
                    width,
                    height,
                    length
                }
            }
        case Routines.admin.putOrderProductUpdate.SUCCESS: {
            return {
                ...state,
                edit: {...action.payload.response.results}
            };
        }
        case Routines.admin.getStatus.SUCCESS:
            return {
                ...state,
                status: action.payload.response.data
            }
        case Routines.admin.orderProductCancel.SUCCESS:
            const {request} = action.payload
            return {
                ...state,
                orderProductList: state.orderProductList.filter(p => p.id !== request.id)
            }
    }
    return state;
};
