import DashboardActionTypes from './dashboard.types.js';

export const createChart = (graphData) => ({
	type: DashboardActionTypes.CREATE_CHART,
	payload: graphData,
});

export const deleteChart = (chartIndex) => ({
	type: DashboardActionTypes.DELETE_CHART,
	payload: chartIndex,
});

export const moveChart = (source, destination) => ({
	type: DashboardActionTypes.MOVE_CHART,
	payload: {source, destination},
});