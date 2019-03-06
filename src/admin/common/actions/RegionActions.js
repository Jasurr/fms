import {ADD_REGION_LIST, REGION_LIST} from "../const";


export  const getRegionList = (regions) => {
    return {
        type: REGION_LIST,
        payload: regions
    }
};


export  const addRegionList = (regions) => {
    return {
        type: ADD_REGION_LIST,
        payload: regions
    }
};
