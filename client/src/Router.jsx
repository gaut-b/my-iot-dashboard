import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { selectIsAuthenticated, selectIsLoading } from './redux/auth/auth.selectors';

import PrivateRoute from '@components/privateRoute/PrivateRoute.jsx';
import PublicRoute from '@components/publicRoute/PublicRoute';
import Homepage from '@pages/homepage/Homepage';
import LogInPage from '@pages/logInPage/LogInPage';
import SignUpPage from '@pages/signUpPage/SignUpPage';

const Router = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isLoading = useSelector(selectIsLoading);

  return (
  	<Switch>
  		<PublicRoute restricted={true} exact path='/login' isAuthenticated={isAuthenticated} component={LogInPage} />
  		<PublicRoute restricted={true} exact path='/sign-up' isAuthenticated={isAuthenticated} component={SignUpPage} />
  		<PrivateRoute path='/' isAuthenticated={isAuthenticated} isLoading={isLoading} component={Homepage} />
  	</Switch>
  );
};

export default Router;
