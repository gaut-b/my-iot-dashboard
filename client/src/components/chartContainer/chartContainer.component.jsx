import React from 'react';
import { connect } from 'react-redux';
import { deleteChart } from '../../redux/dashboard/dashboard.actions';
import ChartTypes from '../chart/utils/chart.types.js';
import LineChart from '../lineChart/lineChart.component';
import Gauge from '../gaugeChart/gaugeChart.component';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './chartContainer.styles.scss';

const ChartContainer = ({ isEditing, chartInfos, data, chartIndex, deleteChart }) => {

	const graph = (chartInfos) => {
		switch (chartInfos.type) {
			case ChartTypes.LINE_CHART:
				return <LineChart data={data} chartInfos={chartInfos} />
			case ChartTypes.GAUGE:
				return <Gauge data={data} chartInfos={chartInfos} />
			default:
				return null;
		}
	}

	return (
		<Card className="ChartContainer">
		{(isEditing) ?
			<Card.Header>
				<Button variant='link' onClick={() => deleteChart(chartIndex)}>
					<FontAwesomeIcon icon={faTrashAlt} pull='right' size='xs' />
				</Button>
			</Card.Header> : null
		}
			<Card.Body>
				{ graph(chartInfos) }
			</Card.Body>
		</Card>
	);
};

const mapDispatchToProps = dispatch => ({
	deleteChart: (chartIndex) => dispatch(deleteChart(chartIndex)),
});

export default connect(null, mapDispatchToProps)(ChartContainer);