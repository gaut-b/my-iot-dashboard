import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: ChildComponent, isAuthenticated, isLoading, ...rest}) => {
	return (
		<Route
			{...rest}
			render={ props => {
				if (isLoading) {
					return <div>Is Loading</div>
				} else if (!isAuthenticated) {
					return <Redirect to='login/' />
				} else {
					return <ChildComponent {...props} />
				}
			}}
		/>
	)
};

export default PrivateRoute;