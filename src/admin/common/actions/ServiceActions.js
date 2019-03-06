import {ADD_SERVICE_LIST, SERVICE_LIST} from "../const";


export  const getServiceList = (service) => {
    return {
        type: SERVICE_LIST,
        payload: service
    }
};


export  const addServiceList = (service) => {
    return {
        type: ADD_SERVICE_LIST,
        payload: service
    }
};
