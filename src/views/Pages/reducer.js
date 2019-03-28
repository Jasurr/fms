import {Routines} from 'common/api';

export const addRow = (data) => {
    return {
        type: 'ADD_ROW',
        data,
    }
}
export const removeRow = (data) => {
    return {
        type: 'REMOVE_ROW',
        data
    }
}
export const fillTable = (data) => {
    return {
        type: 'FILL_DATA',
        data
    }
}
export const searchText = (data) => {
    return {
        type: 'Search_Text',
        data
    }
}
export const clearProducts = () => {
    return {
        type: 'CLEAR_DATA',
        data: [
            {
                id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
                title: '',
                length: '',
                width: '',
                height: '',
                weight: '',
                quantity: '',
                method: {},
                total_weight: '',
            }
        ],
        invoce_list: {
            INN: '',
            region: ''
        },
        summary: {}
    }
}
export const setSettings = (data) => {

    return {
        type: 'SET_SETTINGS',
        data
    }
}
const initialState = {
    regions: [],
    invoce_list: {},
    products: [
        {
            id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
            title: '',
            length: '',
            width: '',
            height: '',
            weight: '',
            quantity: '',
            total_weight: '',
        }
    ],
    tarifList: [],
    delivery: null,
    boxList: [],
    processing: false,
    notifications: [],
    settings: {
        is_weight: false,
        is_volume: false,
        is_default: true,
        tariff_summ: 6000
    },
    summary: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case Routines.admin.notifications.SUCCESS:
            return {
                ...state,
                notifications: action.payload.response.results
            }
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
        case Routines.admin.createInvoice.SUCCESS:
        case Routines.admin.scanList.SUCCESS:
            const {
                package_info,
                to_be_paid,
                payment_method,
                created_date,
            } = action.payload.response
            let package_list2 = action.payload.response.package ? action.payload.response.package : package_info
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
                invoce_list: {
                    ...action.payload.response,
                    payment_card: card,
                    payment_cash: cash,
                    payment_transfer: transfer,
                    to_be_paid_sender: sender,
                    to_be_paid_receiver: receiver,
                    // date: created_date,
                    // time: created_date,
                },
                products: package_list2
            }

        case  Routines.admin.putOrderProductUpdate.SUCCESS:
            return {
                ...state,
                edit: {...action.payload.response.results}
            };
        case Routines.admin.getStatus.SUCCESS
        :
            return {
                ...state,
                status: action.payload.response.data
            }
        case Routines.admin.calculate.SUCCESS:
            console.log('action.response ',action.payload.response)
            return {
                ...state,
                summary: action.payload.response
            }
        case 'Search_Text':
            let cash1 = false, card1 = false, transfer1 = false
            if (action.data.payment_method === 'Cash') {
                cash1 = true
                card1 = false
                transfer1 = false

            } else if (action.data.payment_method === 'Card') {
                card1 = true
                cash1 = false
                transfer1 = false
            } else if (action.data.payment_method === 'Transfer') {
                transfer1 = true
                cash1 = false
                card1 = false
            }
            let sender1 = false, receiver1 = false
            if (action.data.to_be_paid === 'Sender') {
                sender1 = true
                receiver1 = false
            } else if (action.data.to_be_paid === 'Receiver') {
                sender1 = false
                receiver1 = true
            }
            return {
                ...state,
                invoce_list: {
                    ...action.data,
                    payment_card: card1,
                    payment_cash: cash1,
                    payment_transfer: transfer1,
                    to_be_paid_sender: sender1,
                    to_be_paid_receiver: receiver1,
                    date: action.data.created_date,
                    time: action.data.created_date,
                },

                products: action.data.package_list
            }
        case 'SHOW_ROW':
            const {package_list} = action.data
            return {
                ...state,
                products: package_list
            }
        case 'ADD_ROW': {

            return {
                ...state,
                products: [
                    ...state.products,
                    action.data
                ]
            }
        }
        case 'REMOVE_ROW': {
            return {
                ...state,
                products: state.products.filter(q => q.id !== action.data.id)

            }
        }
        case 'FILL_DATA': {
            return {
                ...state,
                products: action.data
            }
        }
        case 'CLEAR_DATA':
            return {
                ...state,
                invoce_list: {},
                products: action.data,
                summary: action.summary
            }
        case Routines.admin.tarifList.SUCCESS:
            return {
                ...state,
                tarifList: action.payload.response
            }
        case Routines.admin.createDelivery.SUCCESS:
            return {
                ...state,
                delivery: action.payload.response
            }
        case Routines.admin.boxList.SUCCESS:
            return {
                ...state,
                boxList: action.payload.response
            }
        case 'SET_SETTINGS':
            return {
                ...state,
                settings: action.data
            }

    }

    return state;
};
