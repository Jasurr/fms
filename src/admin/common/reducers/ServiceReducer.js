import {ADD_SERVICE_LIST, SERVICE_LIST} from "../const";

const INITIAL_STATE = {
    serviceList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SERVICE_LIST:
            return {
                ...state,
                serviceList: action.payload
            };
        case ADD_SERVICE_LIST:
            return {
                ...state,
                serviceList: [...state.serviceList, ...action.payload]
            };
        default:
            return state;
    }
}
