import {ADD_BOX_LIST, BOX_LIST} from "../const";


export  const getBoxList = (box) => {
    return {
        type: BOX_LIST,
        payload: box
    }
};


export  const addBoxList = (box) => {
    return {
        type: ADD_BOX_LIST,
        payload: box
    }
};
