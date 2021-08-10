import AuthTypes from './auth.types.js';
import {notify} from 'reapop'

export const logout = () => ({type: AuthTypes.LOGOUT_SUCCESSFUL})

const setUserLoading = () => ({type: AuthTypes.USER_LOADING});

const setUserLoaded = () => ({type: AuthTypes.USER_LOADED});

const setAuthentificationError = () => ({type: AuthTypes.AUTHENTICATION_ERROR});

const setLoginSuccessful = (data) => ({
	type: AuthTypes.LOGIN_SUCCESSFUL,
	payload: data
});

const setLoginFailed = () => ({type: AuthTypes.LOGIN_FAILED});

const setIsRefreshingToken = () => ({ type: AuthTypes.REFRESH_TOKEN_REQUEST })

const setRefreshSuccessful = (data) => ({
  type: AuthTypes.REFRESH_TOKEN_SUCCESS,
  payload: data
});

export const loadUser = () => {
  return async (dispatch, getState) => {
    dispatch(setUserLoading);

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    const response = await fetch("/api/auth/user/", {headers, });
    const {status} = response;
    const data = await response.json();
    if (status === 200) {
      dispatch(setUserLoaded());
      return res.data;

    }
    dispatch(setAuthentificationError());
    dispatch(notify('Something went wrong', error))
    return;
  }
};

export const login = (username, password) => {
	return async (dispatch, getState) => {
		let headers = {"Content-Type": "application/json"};
		let body = JSON.stringify({username, password})

    try {
      const response = await fetch("http://localhost:8000/login/", {headers, body, method: "POST"})
      const {status} = response;
      const data = await response.json();
      if (status === 200) {
        dispatch(setLoginSuccessful(data));
        dispatch(notify('Login successfull', 'success'));
        return;
      }
      dispatch(notify(data, 'error'));
      return;
    } catch (err) {
      return;
    }
	}
};

export const refreshToken = (refreshToken) => {
    return async (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({refresh: refreshToken})
    dispatch(setIsRefreshingToken())
   
    const response = await fetch("http://localhost:8000/token/refresh/", {headers, body, method: "POST"})
    const {status} = response;
    const data = await response.json();

    if (status === 200) {
      dispatch(setRefreshSuccessful(res.data));
      return;
    }
    dispatch(setAuthentificationError());
    dispatch(notify('Something went wrong', error))
    return;
  }
};


// export const register = (username, firstName, lastName, password) => {
// 	return (dispatch, getState) => {
//     let headers = {"Content-Type": "application/json"};
//     let body = JSON.stringify({username, password});

//     return fetch("/api/auth/register/", {headers, body, method: "POST"})
//     	.then(res => {
//     	})
// 	}
// }