import {ADD_PACKAGE_LIST, PACKAGE_LIST} from "../const";


export  const getPackageList = (packages) => {
    return {
        type: PACKAGE_LIST,
        payload: packages
    }
};


export  const addPackageList = (packages) => {
    return {
        type: ADD_PACKAGE_LIST,
        payload: packages
    }
};
