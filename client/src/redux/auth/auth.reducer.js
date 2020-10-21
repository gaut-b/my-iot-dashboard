import AuthTypes from './auth.types.js';
import jwtDecode from 'jwt-decode'

let access = null;
let refresh = null;

if (localStorage.getItem('access')) {
	access = {
		token: localStorage.getItem('access'),
		...jwtDecode(localStorage.getItem('access')),
	};
};

if (localStorage.getItem('refresh')) {
	refresh = {
		token: localStorage.getItem('refresh'),
		...jwtDecode(localStorage.getItem('refresh')),
	};
};

const INITIAL_STATE = {
	access,
	refresh,
	isAuthenticated: true, // Set to true for development purpose. Need to be false in production
	isRefreshingToken: false,
	isLoading: false,
	errors: {},
}

const authReducer = (state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case AuthTypes.USER_LOADING:
			return {...state, isLoading: true};

		case AuthTypes.USER_LOADED:
			return {...state, isLoading: false};

		case AuthTypes.LOGIN_SUCCESSFUL:
			localStorage.setItem('access', action.payload.access);
			localStorage.setItem('refresh', action.payload.refresh);
			return {
				...state,
				access: {
					token: action.payload.access,
					...jwtDecode(action.payload.access),

				},
				refresh: {
					token: action.payload.refresh,
					...jwtDecode(action.payload.refresh),

				},
				isAuthenticated: true,
				errors: null
			};

    case AuthTypes.LOGOUT_SUCCESSFUL:
      localStorage.removeItem("token");
      return {
      	...state,
      	errors: action.payload,
      	access: null,
      	refresh: null,
        isAuthenticated: false,
        isLoading: false
      };

    case AuthTypes.REFRESH_TOKEN_REQUEST:
    	return ({
    		...state,
    		isRefreshingToken: true,
    	});

    case AuthTypes.REFRESH_TOKEN_SUCCESS:

    	const accessToken = action.payload.access
    	localStorage.setItem('access', accessToken);

    	return ({
    		...state,
    		isRefreshingToken: false,
    		access: {
    			...state.access,
    			token: accessToken,
    			...jwtDecode(accessToken),
    		}
    	})
		default:
			return state;
	}
};

export default authReducer;