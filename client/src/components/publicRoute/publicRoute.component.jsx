import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated= false, restricted=false,...rest }) => {

	return (
		<Route {...rest} render={ props => (
			isAuthenticated && restricted ?
				<Redirect to='/' />
				: <Component {...props} />
		)} />
	)
};

export default PublicRoute;