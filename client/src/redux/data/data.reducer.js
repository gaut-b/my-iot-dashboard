import DataActionTypes from './data.types';

const INITIAL_STATE = {
	data: []
};

const dataReducer = (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case DataActionTypes.INIT_DATA:
			return {
				...state,
				data: [...action.payload]
			};

		case DataActionTypes.ADD_LAST_DATA:
			return {
				...state,
				data: [...state.data, action.payload]
			};

		default:
			return state;
	}
};

export default dataReducer;