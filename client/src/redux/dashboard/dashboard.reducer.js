import DashboardActionTypes from './dashboard.types.js';
import uuid from 'uuid/v4';

/*
{
	id: uuid(),
	dataGrid: {
		i: id
		x:
		y:
		w:
		h:
	}
	chartInfos: {
		...
	}
}


*/

const INITIAL_STATE = [];

const dashboardReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DashboardActionTypes.CREATE_CHART:
			const id = uuid();
			const newChart = {
					id: id,
					dataGrid: {
						i: id,
						x: 0,
						y: 0,
						w: 2,
						h: 2,
					},
					...action.payload,
			};
			return [...state, newChart];

		case DashboardActionTypes.DELETE_CHART:
			const chartIndex = action.payload;
			console.log([...state].splice(chartIndex, 1))
			return [...state].splice(chartIndex, 1);

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