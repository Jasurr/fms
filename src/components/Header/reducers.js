import Routines from "common/api/routines";

let initialState = {
    searchText: '',
    processing: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Routines.admin.searchList.REQUEST:
            console.log('R', state.processing)

            return {
                ...state,
                processing: true
            }
        case Routines.admin.searchList.FULFILL:
            return {
                ...state,
                processing: false
            }
        case Routines.admin.searchList.SUCCESS:
            return {
                ...state,
                searchText: action.payload.response.results
            }

        default:
            return state;
    }
}