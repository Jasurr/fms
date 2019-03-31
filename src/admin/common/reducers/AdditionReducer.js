import {ADD_ADDITION_LIST, ADDITION_LIST} from "../const";

const INITIAL_STATE = {
    additionList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDITION_LIST:
            return {
                ...state,
                additionList: action.payload
            };
        case ADD_ADDITION_LIST:
            return {
                ...state,
                additionList: [...state.additionList, ...action.payload]
            };
        default:
            return state;
    }
}
