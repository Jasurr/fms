import {ADD_ADDITION_LIST, ADDITION_LIST} from "../const";


export  const getAdditionList = (additions) => {
    return {
        type: ADDITION_LIST,
        payload: additions
    }
};


export  const addAdditionList = (additions) => {
    return {
        type: ADD_ADDITION_LIST,
        payload: additions
    }
};
