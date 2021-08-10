import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop'

import authReducer from './auth/auth.reducer.js';
import dataReducer from './data/data.reducer.js';
import dashboardReducer from './dashboard/dashboard.reducer.js';

const rootReducer = combineReducers({
	auth: authReducer,
	dashboard: dashboardReducer,
	data: dataReducer,
	notifications: notificationsReducer(),
})

export default rootReducer;