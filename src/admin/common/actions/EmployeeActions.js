import {ADD_USER_LIST, USER_LIST} from "../const";


export  const getUserList = (users) => {
    return {
        type: USER_LIST,
        payload: users
    }
};


export  const addUserList = (orders) => {
    return {
        type: ADD_USER_LIST,
        payload: orders
    }
};
