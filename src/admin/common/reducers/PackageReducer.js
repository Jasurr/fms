import {ADD_PACKAGE_LIST, PACKAGE_LIST} from "../const";

const INITIAL_STATE = {
    packageList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PACKAGE_LIST:
            return {
                ...state,
                packageList: action.payload
            };
        case ADD_PACKAGE_LIST:
            return {
                ...state,
                packageList: [...state.packageList, ...action.payload]
            };
        default:
            return state;
    }
}
