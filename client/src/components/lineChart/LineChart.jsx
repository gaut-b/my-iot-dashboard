import React from 'react';
import * as d3 from 'd3';

import Chart from '@components/chart/Chart';
import Line from '@components/chart/Line';
import Circles from '@components/chart/Circles';
import Axis from '@components/chart/Axis'
import ACCESSORS from '@components/chart/utils/accessors.js';
import { useChartDimensions } from '@components/chart/utils/useChartDimensions';

import './LineChart.scss';

const LineChart = ({ data, chartInfos }) => {

    const [ref, dimensions] = useChartDimensions();

    const { xData, yData } = chartInfos;

    const xAccessor = ACCESSORS[xData];
    const yAccessor = ACCESSORS[yData];

    let xScale;

    if (xData === 'time') {
      xScale = d3.scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])
    } else {
      xScale = d3.scaleLinear()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])
    }


    const yScale = d3.scaleLinear()
			.domain(d3.extent(data, yAccessor))
			.range([dimensions.boundedHeight, 0])
			.nice()

    const xAccessorScaled = d => xScale(xAccessor(d))
    const yAccessorScaled = d => yScale(yAccessor(d))
    const y0AccessorScaled = yScale(yScale.domain()[0])
    const keyAccessor = (d, i) => i
    const formatDate = d3.timeFormat("%d/%m/%y - %Hh%M")
    // const formatTick = {formatDate}
    // if (xData === 'time') formatTick.disabled = true;

    return (
    	<div className="lineGraph" ref={ref} style={{height: "100%"}}>
    		<Chart dimensions={dimensions} >
					<Line
						data={data}
						dimensions = {dimensions}
						xAccessor = {xAccessorScaled}
						yAccessor = {yAccessorScaled}
						y0Accessor = {y0AccessorScaled}
					/>
					<Circles
							data = {data}
							keyAccessor = {keyAccessor}
							xAccessor = {xAccessorScaled}
							yAccessor = {yAccessorScaled}
					/>
					{
						(xData === 'time')
							? <Axis
									dimension="x"
									label = {chartInfos.xLabel}
									dimensions = {dimensions}
									scale={xScale}
									formatTick={formatDate}
								/>
							: <Axis
									dimension="x"
									label = {chartInfos.xLabel}
									dimensions = {dimensions}
									scale={xScale}
								/>
					}
					<Axis
						dimension="y"
						label = {chartInfos.yLabel}
						dimensions = {dimensions}
						scale={yScale}
					/>
    		</Chart>
    	</div>
    );
};

export default LineChart;