import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavbarComponent from '../../components/navbar/navbar.component';
import DashboardPage from '../dashboardPage/dashboardPage.component';

import './homepage.styles.scss';

const Homepage = () => {

	return (
		<React.Fragment>
			<Redirect exact from="/" to="dashboard" />
			<NavbarComponent />
			<div className="homepage">
				<Switch>
					<Route path='/dashboard' component={DashboardPage} />
				</Switch>
			</div>
		</React.Fragment>
	);
};

export default Homepage;

