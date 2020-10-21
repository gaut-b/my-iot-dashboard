import DashboardActionTypes from './dashboard.types.js';
import uuid from 'uuid/v4';

const INITIAL_STATE = [];

const dashboardReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DashboardActionTypes.CREATE_GRAPH:
			const newChart = {
					id: uuid(),
					...action.payload
			};
			return [...state, newChart];

		case DashboardActionTypes.MOVE_CHART:
			const { source, destination } = action.payload;

			let newState = [...state];
			const [removed] = newState.splice(source.index, 1);
			newState.splice(destination.index, 0, removed);

			return newState;

		default:
			return state;
	}
};

export default dashboardReducer;