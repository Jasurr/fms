import {ADD_METHOD_LIST, METHOD_LIST} from "../const";

const INITIAL_STATE = {
    methodList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case METHOD_LIST:
            return {
                ...state,
                methodList: action.payload
            };
        case ADD_METHOD_LIST:
            return {
                ...state,
                methodList: [...state.methodList, ...action.payload]
            };
        default:
            return state;
    }
}
