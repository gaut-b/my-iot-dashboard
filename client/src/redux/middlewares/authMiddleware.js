import AuthTypes from '../auth/auth.types';
import { selectAuth, selectRefreshToken, selectIsAccessTokenExpired } from '../auth/auth.selectors';

import { refreshToken } from '../auth/auth.actions';

let actionBuffer = [];
const {
	LOGIN_SUCCESSFUL,
	LOGOUT_SUCCESSFUL,
	REFRESH_TOKEN_REQUEST,
	REFRESH_TOKEN_SUCCESS
} = AuthTypes;

// Check if the accessToken is expired
// If it is, it's store the pending actions during the refresh action
const authMiddleware = (store) => next => action => {

	const state = store.getState();
	const auth = selectAuth(state);
	const isAccessTokenExpired = selectIsAccessTokenExpired(state);
	const token = selectRefreshToken(state);

	const {type: actionType} = action;
	const isLoginAction = actionType === LOGIN_SUCCESSFUL || actionType === LOGOUT_SUCCESSFUL;

	// If action is requesting a new token or logging in, we return the action to the next reducer
	if (actionType === REFRESH_TOKEN_REQUEST || isLoginAction) {
		return next(action);
	} else if (action.type === REFRESH_TOKEN_SUCCESS) {

		next(action)

		// Dispatching all stored actions
		if (actionBuffer.length > 0) {
			actionBuffer.forEach(next);
			actionBuffer = [];
		}
	} else if (isAccessTokenExpired) {
			// If the token has expired, storing the action
			actionBuffer.push(action);
			if (!auth.isRefreshingToken) {
				// And if no current refresh request, dispatching a refresh request
				store.dispatch(refreshToken(token));
			}
	}

	if (!isAccessTokenExpired && actionType !== REFRESH_TOKEN_SUCCESS) {
		return next(action);
	}
}

export default authMiddleware;