import React from 'react';
import LineChartForm from '../lineChartForm/lineChartForm.component';
import GaugeChartForm from '../gaugeChartForm/gaugeChartForm.component';
import Sidebar from '../sidebar/sidebar.component';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChartBar, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

import './chartCreatorContainer.styles.scss';

const ChartCreatorContainer = ({ isSidebarVisible, toggleSidebar }) => {

	const LineChartIcon = <FontAwesomeIcon icon={faChartLine} size="lg"/>;
	const GaugeIcon = <FontAwesomeIcon icon={faTachometerAlt} size="lg"/>;
	const BarChartIcon = <FontAwesomeIcon icon={faChartBar} size="lg"/>;

	return(
		<Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} >
			<Tabs defaultActiveKey="Line chart" id="uncontrolled-tab-example">
			  <Tab eventKey="Line chart" title={LineChartIcon}>
			  	<Container fluid>
			  		<LineChartForm />
			    </Container>
			  </Tab>
			  <Tab eventKey="Gauge" title={GaugeIcon}>
			    <GaugeChartForm />
			  </Tab>
			  <Tab eventKey="Bar chart" title={BarChartIcon} disabled>
			    {null}
			  </Tab>
			</Tabs>
		</Sidebar>
	);
};

export default ChartCreatorContainer;

