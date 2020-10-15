import DashboardActionTypes from './dashboard.types.js';
import uuid from 'uuid/v4';

const INITIAL_STATE = {}

const dashboardReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DashboardActionTypes.CREATE_GRAPH:
			return {
				...state,
				[uuid()]: {...action.payload},
			}
		default:
			return state;
	}
};

export default dashboardReducer;