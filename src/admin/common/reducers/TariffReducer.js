import {ADD_TARIFF_LIST, TARIFF_LIST} from "../const";

const INITIAL_STATE = {
    tariffList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TARIFF_LIST:
            return {
                ...state,
                tariffList: action.payload
            };
        case ADD_TARIFF_LIST:
            return {
                ...state,
                tariffList: [...state.tariffList, ...action.payload]
            };
        default:
            return state;
    }
}
