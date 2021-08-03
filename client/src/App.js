import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { selectIsAuthenticated, selectIsLoading } from './redux/auth/auth.selectors';

import PrivateRoute from './components/privateRoute/privateRoute.component.jsx';
import PublicRoute from './components/publicRoute/publicRoute.component';
import Homepage from './pages/homepage/homepage.component';
import LogInPage from './pages/logInPage/logInPage.component';
import SignUpPage from './pages/signUpPage/signUpPage.component';

import 'bootswatch/dist/lumen/bootstrap.css';
import './App.css';

const App = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isLoading = useSelector(selectIsLoading);
	console.log(isAuthenticated)
  return (
  	<Switch>
  		<PublicRoute restricted={true} exact path='/login' isAuthenticated={isAuthenticated} component={LogInPage} />
  		<PublicRoute restricted={true} exact path='/sign-up' isAuthenticated={isAuthenticated} component={SignUpPage} />
  		<PrivateRoute path='/' isAuthenticated={isAuthenticated} isLoading={isLoading} component={Homepage} />
  	</Switch>
  );
};

export default App;
