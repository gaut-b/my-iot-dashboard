import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer.js';
import dataReducer from './data/data.reducer.js';
import dashboardReducer from './dashboard/dashboard.reducer.js';

const rootReducer = combineReducers({
	auth: authReducer,
	dashboard: dashboardReducer,
	data: dataReducer,
})

export default rootReducer;