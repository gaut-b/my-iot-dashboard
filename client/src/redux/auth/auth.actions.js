import AuthTypes from './auth.types.js';

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
  return (dispatch, getState) => {
    dispatch(setUserLoading);

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch("/api/auth/user/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(setUserLoaded());
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch(setAuthentificationError());
          throw res.data;
        }
      })
  }
};

export const login = (email, password) => {
	return (dispatch, getState) => {
		let headers = {"Content-Type": "application/json"};
		let body = JSON.stringify({username:'test2', password:'test2'})

		return fetch("http://localhost:8000/login/", {headers, body, method: "POST"})
			.then(res => {
				if (res.status < 500) {
					return res.json().then( data => {
						return {status: res.status, data}
					})
				} else {
					console.log("Server error !")
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch(setLoginSuccessful(res.data));
					return res.data;
				} else if (res.status === 403 || res.status === 401) {
						dispatch(setAuthentificationError());
						throw res.data;
				} else {
					dispatch(setLoginFailed());
					throw res.data;
				}
			})
	}
};

export const refreshToken = (refreshToken) => {
    return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({refresh: refreshToken})
    dispatch(setIsRefreshingToken())
    return fetch("http://localhost:8000/token/refresh/", {headers, body, method: "POST"})
     .then(res => {
       if (res.status < 500) {
         return res.json().then( data => {
           return {status: res.status, data}
         })
       } else {
         console.log("Server error !")
         throw res;
       }
     })
     .then(res => {
       if (res.status === 200) {
         dispatch(setRefreshSuccessful(res.data));
         return res.data;
       } else if (res.status === 403 || res.status === 401) {
           dispatch(setAuthentificationError());
           throw res.data;
       } else {
         dispatch(setLoginFailed());
         throw res.data;
       }
     })
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