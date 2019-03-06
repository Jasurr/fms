import {ADD_BOX_LIST, BOX_LIST} from "../const";
import {Routines} from 'common/api';


const INITIAL_STATE = {
    boxList: [],
    token: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOX_LIST:
            return {
                ...state,
                boxList: action.payload
            };
        case ADD_BOX_LIST:
            return {
                ...state,
                boxList: [...state.boxList, ...action.payload]
            };
        case Routines.admin.signinAdmin.SUCCESS:
            return {
                ...state,
                token: action.response.data.token
            }
        default:
            return state;
    }
}
