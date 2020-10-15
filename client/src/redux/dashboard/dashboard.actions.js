import DashboardActionTypes from './dashboard.types.js';

export const createGraph = (graphData) => ({
	type: DashboardActionTypes.CREATE_GRAPH,
	payload: graphData,
});