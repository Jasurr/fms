import {ADD_REGION_LIST, REGION_LIST} from "../const";

const INITIAL_STATE = {
    regionList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGION_LIST:
            return {
                ...state,
                regionList: action.payload
            };
        case ADD_REGION_LIST:
            return {
                ...state,
                regionList: [...state.regionList, ...action.payload]
            };
        default:
            return state;
    }
}
