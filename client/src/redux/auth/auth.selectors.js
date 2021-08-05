import { createSelector } from 'reselect';
import get from 'lodash.get';

export const selectAuth = state => state.auth;

export const selectAccessToken = createSelector(
	[selectAuth],
	auth => get(auth, 'access.token')
);

export const selectIsLoading = createSelector(
	[selectAuth],
	auth => get(auth, 'isLoading', false)
);

export const selectRefreshToken = createSelector(
	[selectAuth],
	auth => get(auth, 'refresh.token')
);

export const selectIsAccessTokenExpired = createSelector(
	[selectAuth],
	auth => {
		if (get(auth, 'access.exp')) {
			return (1000 * auth.access.exp - (new Date()).getTime() < 5000);
		}
		return true;
	}
);

export const selectIsRefreshTokenExpired = createSelector(
	[selectAuth],
	auth => {
		const exp = get(auth, 'refreshToken.exp');
		if (exp) {
			return (1000 * exp - (new Date()).getTime() < 5000);
		}
		return true;
	}
);

export const selectIsAuthenticated = createSelector(
	[selectAuth],
	auth => get(auth, 'isAuthenticated'),
);

