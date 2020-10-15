import { selectAccessToken } from './auth.selectors.js';

export const withAuth = (headers={}) => {
	return (state) => ({
		...headers,
		'Authorization': `Bearer ${selectAccessToken(state)}`
	})
};