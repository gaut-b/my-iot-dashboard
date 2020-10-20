import React from 'react';
import ChartTypes from '../chart/utils/chart.types.js';
import LineChart from '../lineChart/lineChart.component';
import Gauge from '../gaugeChart/gaugeChart.component';

import Card from 'react-bootstrap/Card';

import './chartContainer.styles.scss';

const ChartContainer = ({ chartInfos, data }) => {

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
			{ graph(chartInfos) }
		</Card>
	);
};

export default ChartContainer;