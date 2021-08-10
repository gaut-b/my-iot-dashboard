import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardPage from '@pages/dashboardPage/DashboardPage';
import ParserPage from '@pages/parserPage/ParserPage';
import './Homepage.scss';

const HomepageRouter = () => {

	return (
		<>
		<Switch>
			<Route path='/dashboard' component={DashboardPage} />
			<Route path='/parsers' component={ParserPage} />
		</Switch>
		</>
	);
};

export default HomepageRouter;

