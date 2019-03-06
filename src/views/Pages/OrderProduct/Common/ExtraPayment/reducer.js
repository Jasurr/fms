import {Routines} from 'common/api';

const initialState = {
    processing: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case  Routines.admin.postCreateExtraPayment.REQUEST:
            return {
                ...state,
                processing: true
            }
        case Routines.admin.postCreateExtraPayment.FULFILL:
            return {
                ...state,
                processing: false
            }

    }
    return state;
};
