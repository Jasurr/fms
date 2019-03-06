import {ADD_FEEDBACK_LIST, FEEDBACK_LIST} from "../const";

const INITIAL_STATE = {
    feedbackList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FEEDBACK_LIST:
            return {
                ...state,
                feedbackList: action.payload
            };
        case ADD_FEEDBACK_LIST:
            return {
                ...state,
                feedbackList: [...state.feedbackList, ...action.payload]
            };
        default:
            return state;
    }
}
