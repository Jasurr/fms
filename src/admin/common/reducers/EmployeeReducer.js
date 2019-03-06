import {ADD_USER_LIST, USER_LIST} from "../const";

const INITIAL_STATE = {
    userList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LIST:
            return {
                ...state,
                userList: action.payload
            };
        case ADD_USER_LIST:
            return {
                ...state,
                userList: [...state.userList, ...action.payload]
            };
        default:
            return state;
    }
}
