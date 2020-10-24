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
		case DashboardActionTypes.CREATE_CHART: {
			const id = uuid();
			const newChart = {
					id: id,
					...action.payload,
			};
			console.log([...state, newChart])
			return [...state, newChart];
		};

		case DashboardActionTypes.DELETE_CHART: {
			const chartIndex = action.payload;
			const newState = [...state];
			newState.splice(chartIndex, 1);

			return newState
		};

		case DashboardActionTypes.UPDATE_LAYOUT: {
			const newLayout = action.payload;
			const newState = [...state];

			newLayout.map((chartLayout) => {
				const chartIndex = state.findIndex(chart => chart.id === chartLayout.i);
				if (chartIndex !== -1) {
					newState[chartIndex].dataGrid = chartLayout;
				}
			});

			return newState;
		};

		default:
			return state;
	}
};

export default dashboardReducer;