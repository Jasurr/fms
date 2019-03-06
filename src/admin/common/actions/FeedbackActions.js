import {ADD_FEEDBACK_LIST, FEEDBACK_LIST} from "../const";


export  const getFeedbackList = (feeedback) => {
    return {
        type: FEEDBACK_LIST,
        payload: feeedback
    }
};


export  const addFeedbackList = (feeedback) => {
    return {
        type: ADD_FEEDBACK_LIST,
        payload: feeedback
    }
};
