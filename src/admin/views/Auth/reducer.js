import {Routines} from 'common/api';

const initialState = {
    processing: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case  Routines.admin.signinUser.REQUEST:
            return {
                ...state,
                processing: true
            }
        case  Routines.admin.signinUser.FULFILL:
            return {
                ...state,
                processing: false
            }
        case  Routines.admin.signinUser.SUCCESS:
            return {
                ...state
            }
    }
    return state;
};
