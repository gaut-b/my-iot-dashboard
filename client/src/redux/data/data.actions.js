import DataActionTypes from './data.types';

export const initData = (data) => ({
	type: DataActionTypes.INIT_DATA,
	payload: data
});

export const addLastData = (data) => ({
	type: DataActionTypes.ADD_LAST_DATA,
	payload: data
});

