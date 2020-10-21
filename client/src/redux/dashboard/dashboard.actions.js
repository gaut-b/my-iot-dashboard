import DashboardActionTypes from './dashboard.types.js';

export const createGraph = (graphData) => ({
	type: DashboardActionTypes.CREATE_GRAPH,
	payload: graphData,
});

export const moveChart = (source, destination) => ({
	type: DashboardActionTypes.MOVE_CHART,
	payload: {source, destination},
})