import {ADD_MESSAGE_LIST, MESSAGE_LIST} from "../const";

const INITIAL_STATE = {
    messageList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MESSAGE_LIST:
            return {
                ...state,
                messageList: action.payload
            };
        case ADD_MESSAGE_LIST:
            return {
                ...state,
                messageList: [...state.messageList, ...action.payload]
            };
        default:
            return state;
    }
}
