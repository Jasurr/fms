import {ADD_MESSAGE_LIST, MESSAGE_LIST} from "../const";


export  const getMessageList = (messages) => {
    return {
        type: MESSAGE_LIST,
        payload: messages
    }
};


export  const addMessageList = (messages) => {
    return {
        type: ADD_MESSAGE_LIST,
        payload: messages
    }
};
