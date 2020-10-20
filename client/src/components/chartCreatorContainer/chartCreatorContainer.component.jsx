import React from 'react';
import LineChartForm from '../lineChartForm/lineChartForm.component';
import GaugeChartForm from '../gaugeChartForm/gaugeChartForm.component';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChartBar, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

import './chartCreatorContainer.styles.scss';

const ChartCreatorContainer = () => {

		const LineChartIcon = <FontAwesomeIcon icon={faChartLine} size="lg"/>;
		const GaugeIcon = <FontAwesomeIcon icon={faTachometerAlt} size="lg"/>;
		const BarChartIcon = <FontAwesomeIcon icon={faChartBar} size="lg"/>;

		return(
			<Container fluid>
				<Row>
					<Col>
						<Tabs defaultActiveKey="Line chart" id="uncontrolled-tab-example">
						  <Tab eventKey="Line chart" title={LineChartIcon}>
						    <LineChartForm />
						  </Tab>
						  <Tab eventKey="Gauge" title={GaugeIcon}>
						    <GaugeChartForm />
						  </Tab>
						  <Tab eventKey="Bar chart" title={BarChartIcon} disabled>
						    {null}
						  </Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		)
};

export default ChartCreatorContainer;