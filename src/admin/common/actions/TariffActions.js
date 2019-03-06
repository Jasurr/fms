import {ADD_TARIFF_LIST, TARIFF_LIST} from "../const";


export  const getTariffList = (tariffs) => {
    return {
        type: TARIFF_LIST,
        payload: tariffs
    }
};


export  const addTariffList = (tariffs) => {
    return {
        type: ADD_TARIFF_LIST,
        payload: tariffs
    }
};
