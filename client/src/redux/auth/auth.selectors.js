import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectAccessToken = createSelector(
	[selectAuth],
	auth => auth.access.token
);

export const selectIsLoading = createSelector(
	[selectAuth],
	auth => auth.isLoading
);

export const selectRefreshToken = createSelector(
	[selectAuth],
	auth => auth.refresh.token
);

export const selectIsAccessTokenExpired = createSelector(
	[selectAuth],
	auth => {
		if (auth.access && auth.access.exp) {
			return (1000 * auth.access.exp - (new Date()).getTime() < 5000);
		}
		return true;
	}
);

export const selectIsRefreshTokenExpired = createSelector(
	[selectAuth],
	auth => {
		if (auth.refreshToken && auth.refreshToken.exp) {
			return (1000 * auth.refreshToken.exp - (new Date()).getTime() < 5000);
		}
		return true;
	}
);

export const selectIsAuthenticated = createSelector(
	[selectAuth],
	auth => auth.isAuthenticated,
);

