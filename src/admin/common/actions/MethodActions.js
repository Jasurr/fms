import {ADD_METHOD_LIST, METHOD_LIST} from "../const";


export  const getMethodList = (methods) => {
    return {
        type: METHOD_LIST,
        payload: methods
    }
};


export  const addMethodList = (methods) => {
    return {
        type: ADD_METHOD_LIST,
        payload: methods
    }
};
