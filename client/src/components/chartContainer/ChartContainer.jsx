import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteChart } from '@redux/dashboard/dashboard.actions';

import ChartTypes from '@components/chart/utils/chart.types.js';
import LineChart from '@components/lineChart/LineChart';
import Gauge from '@components/gaugeChart/GaugeChart';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './ChartContainer.scss';

const ChartContainer = ({ isEditing, chartInfos, data, chartIndex }) => {

	const dispatch = useDispatch();

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

	const handleDeleteChart = () => dispatch(deleteChart(chartIndex))

	return (
		<Card className="ChartContainer">
		{(isEditing) ?
			<Card.Header>
				<Button variant='link' onClick={handleDeleteChart}>
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

export default ChartContainer;