import React from 'react';

import NavbarComponent from '@components/navbar/Navbar';
import HomepageRouter from './HomepageRouter'
import './Homepage.scss';

const Homepage = () => {

	return (
		<React.Fragment>
			<NavbarComponent />
			<div className="homepage">
				<HomepageRouter />
			</div>
		</React.Fragment>
	);
};

export default Homepage;

