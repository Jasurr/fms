import { Routines } from 'common/api';

const initialState = {
	parcelList: {
		new: [],
		delivering: [],
		arrived: [],
		finished: []
	},
	edit: {
		new: {},
		delivering: {},
		arrived: {},
		finished: {}
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Routines.admin.getParcelList.SUCCESS: {
			const { status } = action.payload.request;
			switch (status) {
				case 1:
					return {
						...state,
						parcelList: {
							...state.parcelList,
							new: action.payload.response.results
						}
					};
				case 2:
					return {
						...state,
						parcelList: {
							...state.parcelList,
							delivering: action.payload.response.results
						}
					};
				case 3:
					return {
						...state,
						parcelList: {
							...state.parcelList,
							arrived: action.payload.response.results
						}
					};
				case 4:
					return {
						...state,
						parcelList: {
							...state.parcelList,
							finished: action.payload.response.results
						}
					};
			}
		}
		case Routines.admin.putParcelUpdate.SUCCESS: {
			return {
				...state,
				edit: action.payload.response
			};
		}
	}
	return state;
};
